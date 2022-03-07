import EventType from "../../lib/EventType";
import SourceTypeMap from "../SourceTypeMap";
import { readJson, writeJson } from "./util";

/**
 * events.json の中身
 */
export type Events = EventType[];

/**
 * ファイル名
 */
const FileName = "events.json";

/**
 * イベント一覧を json から取得する
 */
export const readEvents = (): Events => {
  return readJson(FileName);
};

/**
 * イベント一覧を json に出力する
 */
export const writeEvents = (events: Events) => {
  writeJson(FileName, events);
};

/**
 * イベント一覧を整形し json に出力する
 */
export const writeEventMap = (sourceTypeMap: SourceTypeMap) => {
  const events = Object.values(sourceTypeMap)
    .sort((a, b) => (a.name + a.source).localeCompare(b.name + b.source))
    .map(
      (value): EventType => ({
        deprecate: value.deprecate,
        deprecateDescription: value.deprecate
          ? value.deprecateDescription
          : undefined,
        description: value.description,
        href: value.href,
        javadoc: value.javadoc,
        link: value.link,
        name: value.name,
        source: value.source,
      })
    );
  writeEvents(events);
};
