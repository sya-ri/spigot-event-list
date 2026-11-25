import type EventType from "./types/event-type";
import type { SearchEventsResponse } from "./types/event";
import { parseQuery, scoreEvent } from "./event-search";
import { compareEvents, localizeEvent } from "./event-data";

export function searchPage(
  eventsIn: EventType[],
  rawQuery: string,
  version: string,
  lang: string,
  sources: readonly string[],
  limit: number,
  offset: number,
): SearchEventsResponse {
  const clauses = parseQuery(rawQuery);
  const browsing = rawQuery.trim().length === 0;
  const matches = eventsIn
    .filter((event) => sources.includes(event.source))
    .map((event) => ({
      event,
      score: browsing ? 1 : scoreEvent(event, clauses),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || compareEvents(left.event, right.event));
  const events = matches.slice(offset, offset + limit).map(({ event }) => ({
    ...localizeEvent(event, lang),
    version,
  }));
  return {
    query: rawQuery,
    version,
    count: events.length,
    total: matches.length,
    offset,
    nextOffset: offset + events.length < matches.length ? offset + events.length : null,
    events,
  };
}
