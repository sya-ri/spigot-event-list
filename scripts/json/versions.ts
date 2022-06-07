import { readFile, writeFile } from "fs/promises";

/**
 * バージョン情報を json から読み込む
 */
export const readVersions = (): Promise<{ [name: string]: string }> => {
  return readFile("versions.json", "utf8").then((text) => JSON.parse(text));
};

/**
 * バージョン情報を json に書き込む
 */
export const writeVersions = (versions: { [name: string]: string }) => {
  return writeFile("versions.json", JSON.stringify(versions, null, 2));
};
