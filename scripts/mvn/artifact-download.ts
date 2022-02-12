import fs from "fs";
import path from "path";
import axios, { AxiosRequestConfig } from "axios";
import artifactUrl from "./artifact-url";
import getFilename from "./filename";
import parseName from "./parse";

export interface Artifact {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
}

const download = async (
  artifact: Artifact | string,
  destination?: string,
  repository?: string,
  filename?: string,
  config?: AxiosRequestConfig
) => {
  destination = destination || process.cwd();
  const artifactShape =
    typeof artifact === "string" ? parseName(artifact) : artifact;

  const url = await artifactUrl(artifactShape, repository, config);

  const destFile = path.join(
    destination || process.cwd(),
    filename || getFilename(artifactShape)
  );
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    ...config,
  });
  if (response.status !== 200) {
    throw new Error(`Unable to fetch ${url}. Status ${response.status}`);
  }
  fs.writeFileSync(destFile, response.data);
  return destFile;
};

export default download;
