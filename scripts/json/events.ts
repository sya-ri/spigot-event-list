import EventType from "../../src/EventType";
import EventTypeMap from "../EventTypeMap";
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
export const writeEventMap = (eventMap: EventTypeMap) => {
  const events = Object.values(eventMap)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(
      (value): EventType => ({
        deprecate: value.deprecate,
        deprecateDescription: value.deprecate
          ? value.deprecateDescription
          : undefined,
        description: value.description,
        link: value.link,
        name: value.name,
        source: value.source,
      })
    );
  writeEvents(events);
};
