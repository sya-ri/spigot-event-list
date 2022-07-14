import { promisify } from "util";
import axios, { AxiosRequestConfig } from "axios";
import { parseString } from "xml2js";
import Artifact from "./Artifact";
import fileName from "./fileName";

const groupPath = (artifact: Artifact) =>
  [
    artifact.groupId.replace(/\./g, "/"),
    artifact.artifactId,
    artifact.version + (artifact.isSnapShot ? "-SNAPSHOT" : ""),
  ].join("/");

const artifactPath = (artifact: Artifact) =>
  groupPath(artifact) + "/" + fileName(artifact);

const latestSnapShotVersion = (
  artifact: Artifact,
  basePath: string,
  config?: AxiosRequestConfig
) => {
  const metadataUrl = basePath + groupPath(artifact) + "/maven-metadata.xml";
  return axios
    .get<string>(metadataUrl, {
      responseType: "text",
      ...config,
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          `Unable to fetch ${metadataUrl}. Status ${response.status}`
        );
      }
      return promisify(parseString)(response.data);
    })
    .then((xml: any) => {
      const snapshot = xml.metadata.versioning[0].snapshot[0];
      return snapshot.timestamp[0] + "-" + snapshot.buildNumber[0];
    });
};

const artifactUrl = async (
  artifact: Artifact,
  basePath: string,
  config?: AxiosRequestConfig
) => {
  if (artifact.isSnapShot) {
    const snapShotVersion = await latestSnapShotVersion(
      artifact,
      basePath,
      config
    );
    return basePath + artifactPath({ snapShotVersion, ...artifact });
  }
  return basePath + artifactPath(artifact);
};

export default artifactUrl;
