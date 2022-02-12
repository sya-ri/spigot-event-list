import axios, { AxiosRequestConfig } from "axios";
import filename from "./filename";
import parseXmlString from "./parseXmlString";

export interface Artifact {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
}

function groupPath(artifact: Artifact): string {
  return [
    artifact.groupId.replace(/\./g, "/"),
    artifact.artifactId,
    artifact.version + (artifact.isSnapShot ? "-SNAPSHOT" : ""),
  ].join("/");
}

function artifactPath(artifact: Artifact): string {
  return groupPath(artifact) + "/" + filename(artifact);
}

async function latestSnapShotVersion(
  artifact: Artifact,
  basepath: string,
  config?: AxiosRequestConfig
) {
  const metadataUrl = basepath + groupPath(artifact) + "/maven-metadata.xml";
  const response = await axios.get(metadataUrl, {
    responseType: "text",
    ...config,
  });
  if (response.status !== 200) {
    throw new Error(
      `Unable to fetch ${metadataUrl}. Status ${response.status}`
    );
  }
  const body: string = await response.data;
  const xml: any = await parseXmlString(body);
  const snapshot = xml.metadata.versioning[0].snapshot[0];
  return snapshot.timestamp[0] + "-" + snapshot.buildNumber[0];
}

export default (async function artifactUrl(
  artifact: Artifact,
  basePath?: string,
  config?: AxiosRequestConfig
) {
  const prefix = basePath || "https://repo1.maven.org/maven2/";
  if (artifact.isSnapShot) {
    const snapShotVersion = await latestSnapShotVersion(
      artifact,
      prefix,
      config
    );
    return prefix + artifactPath({ snapShotVersion, ...artifact });
  } else {
    return prefix + artifactPath(artifact);
  }
});
