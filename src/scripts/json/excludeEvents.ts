import { readFile } from "fs/promises";

/**
 * 除外するイベント一覧を取得する
 */
export const readExcludeEvents = async (): Promise<string[]> => {
  const text = await readFile("excludeEvents.json", "utf8");
  return JSON.parse(text);
};
