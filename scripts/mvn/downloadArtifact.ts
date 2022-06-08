import { writeFile } from "fs/promises";
import axios, { AxiosRequestConfig } from "axios";
import Artifact from "./Artifact";
import artifactUrl from "./artifactUrl";
import ArrayBufferView = NodeJS.ArrayBufferView;

const downloadArtifact = (
  artifact: Artifact,
  destination: string,
  repository: string,
  config?: AxiosRequestConfig
) =>
  artifactUrl(artifact, repository, config).then((url) =>
    axios
      .get<ArrayBufferView>(url, {
        responseType: "arraybuffer",
        ...config,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Unable to fetch ${url}. Status ${response.status}`);
        }
        return writeFile(destination, response.data);
      })
  );

export default downloadArtifact;
