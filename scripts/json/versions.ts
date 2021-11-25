import { readJson, writeJson } from "./util";

/**
 * versions.json の中身
 */
export type Versions = { [name: string]: string };

/**
 * ファイル名
 */
const FileName = "versions.json";

/**
 * バージョン情報を json から読み込む
 */
export const readVersions = (): Versions => {
  return readJson<Versions>(FileName);
};

/**
 * バージョン情報を json に書き込む
 */
export const writeVersions = (versions: Versions) => {
  writeJson(FileName, versions);
};
