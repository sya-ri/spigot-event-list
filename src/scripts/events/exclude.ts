import { readExcludeEvents } from "../json/excludeEvents.js";
import { EventType } from "~/types";

/**
 * excludeEvents.json で指定されたイベントを除外する
 */
export const excludeEvents = (sources: { [name: string]: EventType }) =>
  readExcludeEvents().then((events) => {
    events.forEach((eventName) => {
      delete sources[eventName];
    });
  });
