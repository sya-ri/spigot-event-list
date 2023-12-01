import axios, { AxiosRequestConfig } from "axios";
import Artifact from "./Artifact.js";
import artifactUrl from "./artifactUrl.js";
import { Stream } from "stream";
import { createWriteStream } from "fs";
import MultiProgress from "multi-progress";
import Buffer from "buffer";

const downloadArtifact = (
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

export default downloadArtifact;
