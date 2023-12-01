import { readFile, writeFile } from "fs/promises";

/**
 * バージョン情報を json から読み込む
 */
export const readVersions = async (): Promise<{ [name: string]: string }> => {
  const text = await readFile("versions.json", "utf8");
  return JSON.parse(text);
};

/**
 * バージョン情報を json に書き込む
 */
export const writeVersions = (versions: { [name: string]: string }) => {
  return writeFile("versions.json", JSON.stringify(versions, null, 2));
};
