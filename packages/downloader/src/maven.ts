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

const latestSnapShotVersion = async (
  artifact: Artifact,
  basePath: string,
  config?: AxiosRequestConfig,
) => {
  const metadataUrl = basePath + groupPath(artifact) + "/maven-metadata.xml";
  const response = await axios.get<string>(metadataUrl, {
    responseType: "text",
    ...config,
  });
  if (response.status !== 200) {
    throw new Error(
      `Unable to fetch ${metadataUrl}. Status ${response.status}`,
    );
  }
  const xml = (await promisify(parseString)(response.data)) as any;
  const snapshot = xml.metadata.versioning[0].snapshot[0];
  return snapshot.timestamp[0] + "-" + snapshot.buildNumber[0];
};

const artifactUrl = async (
  artifact: Artifact,
  basePath: string,
  config?: AxiosRequestConfig,
) => {
  if (artifact.isSnapShot) {
    const snapShotVersion = await latestSnapShotVersion(
      artifact,
      basePath,
      config,
    );
    return basePath + artifactPath({ snapShotVersion, ...artifact });
  }
  return basePath + artifactPath(artifact);
};

export const downloadArtifact = (
  multiProgress: MultiProgress,
  name: string,
  artifact: Artifact,
  destination: string,
  repository: string,
  config?: AxiosRequestConfig,
) =>
  artifactUrl(artifact, repository, config).then((url) =>
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
            `  ${name.padEnd(10, " ")} [:bar] :percent`,
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
