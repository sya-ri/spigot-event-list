import { format } from "util";
import MultiProgress from "multi-progress";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import { fetchStream } from "./http";
import { fetchMavenSnapshot, fetchMavenVersions } from "./maven-metadata";

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

const artifactPath = (artifact: Artifact) => groupPath(artifact) + "/" + fileName(artifact);

const latestSnapShotVersion = async (
  artifact: Artifact,
  basePath: string,
  config?: RequestInit,
) => {
  const metadataUrl = basePath + groupPath(artifact) + "/maven-metadata.xml";
  return fetchMavenSnapshot(metadataUrl, config);
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
  config?: RequestInit,
) => {
  const metadataUrl =
    basePath +
    [artifact.groupId.replace(/\./g, "/"), artifact.artifactId, "maven-metadata.xml"].join("/");
  const versions = await fetchMavenVersions(metadataUrl, config);
  const latestVersion = versions
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
  config?: RequestInit,
) => {
  if (artifact.isSnapShot) {
    const { snapshotVersion } = await latestSnapShotVersion(artifact, basePath, config);
    return basePath + artifactPath({ snapShotVersion: snapshotVersion, ...artifact });
  }
  return basePath + artifactPath(artifact);
};

export const resolveArtifactBuildNumber = async (
  artifact: Artifact,
  basePath: string,
  config?: RequestInit,
) => {
  if (!artifact.isSnapShot) {
    const matched = artifact.version.match(/\.build\.(\d+)(?:-|$)/);
    return matched ? Number.parseInt(matched[1], 10) : null;
  }
  const { buildNumber } = await latestSnapShotVersion(artifact, basePath, config);
  return buildNumber;
};

export const downloadArtifact = (
  multiProgress: MultiProgress,
  name: string,
  artifact: Artifact,
  destination: string,
  repository: string,
  config?: RequestInit,
) =>
  resolveArtifactUrl(artifact, repository, config).then((url) =>
    fetchStream(url, config).then(({ contentLength: headerValue, stream }) => {
      const contentLength = Number.parseInt(String(headerValue ?? ""), 10);
      const bar =
        Number.isFinite(contentLength) && contentLength > 0
          ? multiProgress.newBar(
              `  ${name.padEnd(10, " ")} ${artifact.version.padStart(12, " ")} [:bar] :percent`,
              {
                complete: "=",
                incomplete: " ",
                width: 20,
                total: contentLength,
              },
            )
          : null;
      if (bar) stream.on("data", (chunk: Buffer) => bar.tick(chunk.length));
      return pipeline(stream, createWriteStream(destination));
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
    return format("%s-%s-%s.%s", artifact.artifactId, version, artifact.classifier, extension);
  }
  return format("%s-%s.%s", artifact.artifactId, version, extension);
};
