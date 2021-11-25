import EventTypeMap from "../EventTypeMap";
import { readExcludeEvents } from "../json/excludeEvents";

/**
 * excludeEvents.json で指定されたイベントを除外する
 */
export const excludeEvents = (eventMap: EventTypeMap) => {
  const excludeEvents = readExcludeEvents();
  excludeEvents.forEach((eventName) => {
    delete eventMap[eventName];
  });
};
