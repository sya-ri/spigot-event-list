import { readJson } from "./util";

/**
 * excludeEvents.json の中身
 */
export type ExcludeEvents = string[];

/**
 * ファイル名
 */
const FileName = "excludeEvents.json";

/**
 * 除外するイベント一覧を取得する
 */
export const readExcludeEvents = (): ExcludeEvents => {
  return readJson<ExcludeEvents>(FileName);
};
