import SourceTypeMap from "../SourceTypeMap";
import { readExcludeEvents } from "../json/excludeEvents";

/**
 * excludeEvents.json で指定されたイベントを除外する
 */
export const excludeEvents = (sourceTypeMap: SourceTypeMap) => {
  const excludeEvents = readExcludeEvents();
  excludeEvents.forEach((eventName) => {
    delete sourceTypeMap[eventName];
  });
};
