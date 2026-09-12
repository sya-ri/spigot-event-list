import { NextRequest, NextResponse } from "next/server";
import {
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
  resolveServerVersion,
} from "@/libs/data-paths";
import EventSource from "@/types/event-source";
import { parseQuery, scoreEvent } from "@/libs/search-events";
import { toEventResponse, EventResponse } from "@/libs/event-response";

type SearchEventResponse = EventResponse & { version: string };

type SearchEventsDependencies = {
  getLatestMinecraftVersion: typeof getLatestMinecraftVersion;
  getServerVersionsDesc: typeof getServerVersionsDesc;
  readLatestServerEvents: typeof readLatestServerEvents;
  readProxyEvents: typeof readProxyEvents;
  readServerEvents: typeof readServerEvents;
};

const splitSources = (value: string | null) =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is EventSource =>
      (EventSource as readonly string[]).includes(item),
    );

const parseLimit = (value: string | null) => {
  const parsed = Number.parseInt(value ?? "", 10);
  if (Number.isNaN(parsed)) {
    return 20;
  }
  return Math.min(Math.max(parsed, 1), 100);
};

const readEventsForVersion = async (
  version: string,
  dependencies: SearchEventsDependencies,
) => {
  if (version === "latest") {
    return dependencies.readLatestServerEvents();
  }
  const [serverData, proxyData] = await Promise.all([
    dependencies.readServerEvents(version),
    dependencies.readProxyEvents(),
  ]);
  return {
    lang: serverData.lang,
    events: [...serverData.events, ...proxyData.events],
  };
};

export const createSearchEventsHandler =
  (dependencies: SearchEventsDependencies) => async (request: NextRequest) => {
    const rawQuery = request.nextUrl.searchParams.get("q") ?? "";
    const clauses = parseQuery(rawQuery);
    if (clauses.length === 0) {
      return new NextResponse("Missing query: q", { status: 400 });
    }

    const version = request.nextUrl.searchParams.get("version") ?? "latest";
    const [availableVersions, latestMinecraftVersion] = await Promise.all([
      dependencies.getServerVersionsDesc(),
      dependencies.getLatestMinecraftVersion(),
    ]);
    const versionResolution = resolveServerVersion(
      version,
      availableVersions,
      latestMinecraftVersion,
    );
    if (!versionResolution) {
      return new NextResponse(`Unsupported version: ${version}`, {
        status: 404,
      });
    }

    const sources = splitSources(request.nextUrl.searchParams.get("source"));
    const limit = parseLimit(request.nextUrl.searchParams.get("limit"));
    const offsetValue = Number(
      request.nextUrl.searchParams.get("offset") ?? "0",
    );
    const offset =
      Number.isSafeInteger(offsetValue) && offsetValue > 0 ? offsetValue : 0;
    const data = await readEventsForVersion(
      versionResolution.resolvedVersion,
      dependencies,
    );
    const lang = request.nextUrl.searchParams.get("lang") ?? "ja";
    if (!data.lang.includes(lang)) {
      return new NextResponse(`Unsupported lang: ${lang}`, {
        status: 400,
      });
    }

    const matches = data.events
      .filter((event) =>
        sources.length === 0
          ? true
          : sources.includes(event.source as EventSource),
      )
      .map((event) => ({
        event,
        score: scoreEvent(event, clauses),
      }))
      .filter(({ score }) => score > 0)
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }
        const nameComparison = left.event.name.localeCompare(right.event.name);
        if (nameComparison !== 0) {
          return nameComparison;
        }
        return left.event.source.localeCompare(right.event.source);
      });
    const events = matches
      .slice(offset, offset + limit)
      .map(({ event }): SearchEventResponse => ({
        version,
        ...toEventResponse(event, lang),
      }));

    return NextResponse.json({
      query: rawQuery,
      version,
      count: events.length,
      total: matches.length,
      offset,
      events,
    });
  };

export const searchEvents = createSearchEventsHandler({
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
});
