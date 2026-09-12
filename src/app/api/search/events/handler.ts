import { NextRequest, NextResponse } from "next/server";
import EventSource from "@/types/event-source";
import type { SearchEventsResponse } from "@/types/event";
import {
  eventDataDependencies,
  readEventData,
  localizeEvent,
  compareEvents,
  type EventDataDependencies,
} from "@/libs/event-data";
import { parseQuery, scoreEvent } from "@/libs/event-search";

const integerParam = (
  value: string | null,
  fallback: number,
  min: number,
  max: number,
) => {
  const parsed = Number(value ?? fallback);
  return Number.isSafeInteger(parsed)
    ? Math.min(Math.max(parsed, min), max)
    : fallback;
};

export const createSearchEventsHandler =
  (dependencies: EventDataDependencies) => async (request: NextRequest) => {
    const params = request.nextUrl.searchParams;
    const rawQuery = params.get("q") ?? "";
    const clauses = parseQuery(rawQuery);
    const version = params.get("version") || "latest";
    const data = await readEventData(version, dependencies);
    if (!data)
      return new NextResponse(`Unsupported version: ${version}`, {
        status: 404,
      });
    const lang = params.get("lang") ?? "ja";
    if (!data.lang.includes(lang))
      return new NextResponse(`Unsupported lang: ${lang}`, { status: 400 });
    const sourceParam = params.get("source");
    const sources =
      sourceParam === null
        ? [...EventSource]
        : sourceParam.split(",").map((value) => value.trim());
    const limit = integerParam(params.get("limit"), 20, 1, 100);
    const offset = integerParam(
      params.get("offset"),
      0,
      0,
      Number.MAX_SAFE_INTEGER,
    );
    const browsing = rawQuery.trim().length === 0;
    const matches = data.events
      .filter((event) => sources.includes(event.source))
      .map((event) => ({
        event,
        score: browsing ? 1 : scoreEvent(event, clauses),
      }))
      .filter(({ score }) => score > 0)
      .sort(
        (left, right) =>
          right.score - left.score || compareEvents(left.event, right.event),
      );
    const events = matches.slice(offset, offset + limit).map(({ event }) => ({
      ...localizeEvent(event, lang),
      version,
      javadoc: event.javadoc,
    }));
    const result: SearchEventsResponse = {
      query: rawQuery,
      version,
      count: events.length,
      total: matches.length,
      offset,
      nextOffset:
        offset + events.length < matches.length ? offset + events.length : null,
      events,
    };
    return NextResponse.json(result);
  };

export const searchEvents = createSearchEventsHandler(eventDataDependencies);
