import { mkdir, rm } from "fs/promises";
import { zip } from "compressing";
import EventSource from "../EventSource";
import downloadArtifact from "../mvn/artifact-download";

/**
 * ファイルパスを取得する
 *
 * @param filename　ファイル名
 */
export const javadocPath = (filename: string) => `javadoc/${filename}`;

/**
 * Javadoc をダウンロードする
 */
const downloadJavadoc = (sources: { [name: string]: EventSource }) =>
  rm(javadocPath(""), { recursive: true, force: true })
    .then(() => mkdir(javadocPath("")))
    .then(() =>
      Promise.all(
        Object.entries(sources).map(([name, source]) =>
          downloadArtifact(
            source.artifact,
            javadocPath(""),
            source.repository,
            `${name}.jar`
          )
            .then(() =>
              zip.uncompress(javadocPath(`${name}.jar`), javadocPath(name))
            )
            .catch((err) => console.error(err))
        )
      )
    );

export default downloadJavadoc;
