import { EventType } from "spigot-event-list-common";
import { readExcludeEvents } from "../json/excludeEvents";

/**
 * excludeEvents.json で指定されたイベントを除外する
 */
export const excludeEvents = (sources: { [name: string]: EventType }) =>
  readExcludeEvents().then((events) => {
    events.forEach((eventName) => {
      delete sources[eventName];
    });
  });
