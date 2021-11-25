import { readFile, writeFile } from "../file/util";

/**
 * json を読み込む
 */
export const readJson = <T>(fileName: string): T => {
  return JSON.parse(readFile(fileName));
};

/**
 * json を書き込む
 */
export const writeJson = <T>(fileName: string, content: T) => {
  writeFile(fileName, JSON.stringify(content, null, 2));
};
