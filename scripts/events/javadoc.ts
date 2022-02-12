import { zip } from "compressing";
import downloadArtifact from "mvn-artifact-download";
import Sources from "../Sources";
import { createDirectory, deleteDirectory } from "../file/util";

/**
 * ファイルパスを取得する
 *
 * @param filename　ファイル名
 */
export const javadocPath = (filename: string) => `javadoc/${filename}`;

/**
 * ファイルを解凍する
 *
 * @param filename ファイル名
 * @param destination 保存先
 */
const unzip = (filename: string, destination: string) =>
  zip.uncompress(filename, destination);

/**
 * Javadoc をダウンロードする
 */
const downloadJavadoc = () => {
  deleteDirectory(javadocPath(""));
  createDirectory(javadocPath(""));
  return Promise.all(
    Object.entries(Sources).map(([name, source]) =>
      downloadArtifact(
        source.artifact,
        javadocPath(""),
        source.repository,
        `${name}.jar`
      )
        .then(() => unzip(javadocPath(`${name}.jar`), javadocPath(name)))
        .catch((err) => console.error(err))
    )
  );
};

export default downloadJavadoc;
