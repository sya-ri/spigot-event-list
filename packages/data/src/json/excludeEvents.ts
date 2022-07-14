import { readFile } from "fs/promises";

/**
 * 除外するイベント一覧を取得する
 */
export const readExcludeEvents = (): Promise<string[]> => {
  return readFile("excludeEvents.json", "utf8").then((text) =>
    JSON.parse(text)
  );
};
