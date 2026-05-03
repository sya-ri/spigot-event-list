import axios, { AxiosRequestConfig } from "axios";
import { format, promisify } from "util";
import { parseString } from "xml2js";
import MultiProgress from "multi-progress";
import { Stream } from "stream";
import { createWriteStream } from "fs";

export type Artifact = {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
};

const groupPath = (artifact: Artifact) =>
  [
    artifact.groupId.replace(/\./g, "/"),
    artifact.artifactId,
    artifact.version + (artifact.isSnapShot ? "-SNAPSHOT" : ""),
  ].join("/");

const artifactPath = (artifact: Artifact) =>
  groupPath(artifact) + "/" + fileName(artifact);

const parseMetadata = async (
  metadataUrl: string,
  config?: AxiosRequestConfig,
) => {
  const response = await axios.get<string>(metadataUrl, {
    responseType: "text",
    ...config,
  });
  if (response.status !== 200) {
    throw new Error(
      `Unable to fetch ${metadataUrl}. Status ${response.status}`,
    );
  }
  return (await promisify(parseString)(response.data)) as any;
};

const latestSnapShotVersion = async (
  artifact: Artifact,
  basePath: string,
  config?: AxiosRequestConfig,
) => {
  const metadataUrl = basePath + groupPath(artifact) + "/maven-metadata.xml";
  const xml = await parseMetadata(metadataUrl, config);
  const snapshot = xml.metadata.versioning[0].snapshot[0];
  return {
    snapshotVersion: snapshot.timestamp[0] + "-" + snapshot.buildNumber[0],
    buildNumber: parseInt(snapshot.buildNumber[0], 10),
  };
};

const compareReleaseVersions = (left: string, right: string) =>
  left.localeCompare(right, undefined, {
    numeric: true,
    sensitivity: "base",
  });

export const resolveLatestArtifactVersion = async (
  artifact: Pick<Artifact, "groupId" | "artifactId">,
  basePath: string,
  prefix: string,
  config?: AxiosRequestConfig,
) => {
  const metadataUrl =
    basePath +
    [
      artifact.groupId.replace(/\./g, "/"),
      artifact.artifactId,
      "maven-metadata.xml",
    ].join("/");
  const xml = await parseMetadata(metadataUrl, config);
  const versions = (xml.metadata.versioning?.[0]?.versions?.[0]?.version ??
    []) as string[];
  const latestVersion = versions
    .map((value) => String(value))
    .filter((value) => value.startsWith(prefix))
    .sort(compareReleaseVersions)
    .pop();
  if (!latestVersion) {
    throw new Error(`Unable to find artifact version with prefix ${prefix}`);
  }
  return latestVersion;
};

export const resolveArtifactUrl = async (
  artifact: Artifact,
  basePath: string,
  config?: AxiosRequestConfig,
) => {
  if (artifact.isSnapShot) {
    const { snapshotVersion } = await latestSnapShotVersion(
      artifact,
      basePath,
      config,
    );
    return (
      basePath + artifactPath({ snapShotVersion: snapshotVersion, ...artifact })
    );
  }
  return basePath + artifactPath(artifact);
};

export const resolveArtifactBuildNumber = async (
  artifact: Artifact,
  basePath: string,
  config?: AxiosRequestConfig,
) => {
  if (!artifact.isSnapShot) {
    const matched = artifact.version.match(/\.build\.(\d+)(?:-|$)/);
    return matched ? parseInt(matched[1], 10) : null;
  }
  const { buildNumber } = await latestSnapShotVersion(
    artifact,
    basePath,
    config,
  );
  return buildNumber;
};

export const downloadArtifact = (
  multiProgress: MultiProgress,
  name: string,
  artifact: Artifact,
  destination: string,
  repository: string,
  config?: AxiosRequestConfig,
) =>
  resolveArtifactUrl(artifact, repository, config).then((url) =>
    axios
      .get<Stream>(url, {
        responseType: "stream",
        ...config,
      })
      .then(({ status, headers, data }) => {
        if (status !== 200) {
          throw new Error(`Unable to fetch ${url}. Status ${status}`);
        }
        const contentLength = parseInt(headers["content-length"] || "");
        if (Number.isNaN(contentLength)) {
          throw new Error(
            `Unable to fetch ${url}. Content-Length: ${headers["content-length"]}`,
          );
        }
        return new Promise<void>((resolve, reject) => {
          const bar = multiProgress.newBar(
            `  ${name.padEnd(10, " ")} ${artifact.version.padStart(12, " ")} [:bar] :percent`,
            {
              complete: "=",
              incomplete: " ",
              width: 20,
              total: contentLength,
            },
          );
          data.pipe(createWriteStream(destination));
          data.on("data", (chunk: Buffer) => bar.tick(chunk.length));
          data.on("end", () => resolve());
          data.on("error", () => reject());
        });
      }),
  );

const getVersion = (artifact: Artifact): string => {
  let suffix = "";
  if (artifact.isSnapShot) {
    if (artifact.snapShotVersion != null) {
      suffix = `-${artifact.snapShotVersion}`;
    } else {
      suffix = "-SNAPSHOT";
    }
  }
  const version = artifact.version;
  return `${version}${suffix}`;
};

const fileName = (artifact: Artifact) => {
  const extension = artifact.extension || "jar";
  const version = getVersion(artifact);
  if (artifact.classifier) {
    return format(
      "%s-%s-%s.%s",
      artifact.artifactId,
      version,
      artifact.classifier,
      extension,
    );
  }
  return format("%s-%s.%s", artifact.artifactId, version, extension);
};
