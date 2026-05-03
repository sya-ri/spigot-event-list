import { NextRequest, NextResponse } from "next/server";
import {
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
} from "@/libs/data-paths";
import EventSource from "@/types/event-source";
import EventType from "../../../../../packages/downloader/src/types/event-type";

type SearchEventResponse = {
  version: string;
  name: string;
  source: EventSource;
  link: string;
  abstract?: true;
  deprecate?: string;
  description: Record<string, string>;
  deprecateDescription?: Record<string, string>;
  javadoc?: string;
};

const normalize = (value: string | null | undefined) =>
  (value ?? "").replace(/\s+/g, " ").trim().toLocaleLowerCase();

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

const searchableTexts = (event: EventType) => [
  event.name,
  event.description.en,
  event.description.ja,
  event.javadoc,
  event.deprecateDescription?.en,
  event.deprecateDescription?.ja,
];

const scoreEvent = (event: EventType, query: string) => {
  const lowerName = normalize(event.name);
  if (lowerName === query) {
    return 400;
  }
  if (lowerName.includes(query)) {
    return 300;
  }

  const descriptionMatches = [event.description.en, event.description.ja]
    .map((value) => normalize(value))
    .filter((value) => value.includes(query)).length;
  if (descriptionMatches > 0) {
    return 200 + descriptionMatches;
  }

  if (normalize(event.javadoc).includes(query)) {
    return 100;
  }

  const deprecateMatches = [
    event.deprecateDescription?.en,
    event.deprecateDescription?.ja,
  ]
    .map((value) => normalize(value))
    .filter((value) => value.includes(query)).length;
  if (deprecateMatches > 0) {
    return 50 + deprecateMatches;
  }

  return 0;
};

const readEventsForVersion = async (version: string) => {
  if (version === "latest") {
    return readLatestServerEvents();
  }
  const [serverData, proxyData] = await Promise.all([
    readServerEvents(version),
    readProxyEvents(),
  ]);
  return {
    lang: serverData.lang,
    events: [...serverData.events, ...proxyData.events],
  };
};

export const GET = async (request: NextRequest) => {
  const query = normalize(request.nextUrl.searchParams.get("q"));
  if (!query) {
    return new NextResponse("Missing query: q", { status: 400 });
  }

  const version = request.nextUrl.searchParams.get("version") ?? "latest";
  const availableVersions = await getServerVersionsDesc();
  if (version !== "latest" && !availableVersions.includes(version)) {
    return new NextResponse(`Unsupported version: ${version}`, {
      status: 404,
    });
  }

  const sources = splitSources(request.nextUrl.searchParams.get("source"));
  const limit = parseLimit(request.nextUrl.searchParams.get("limit"));
  const data = await readEventsForVersion(version);

  const matches = data.events
    .filter((event) =>
      sources.length === 0 ? true : sources.includes(event.source as EventSource),
    )
    .map((event) => ({
      event,
      score: searchableTexts(event).some((value) => normalize(value).includes(query))
        ? scoreEvent(event, query)
        : 0,
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
    })
    .slice(0, limit)
    .map(
      ({ event }): SearchEventResponse => ({
        version,
        name: event.name,
        source: event.source as EventSource,
        link: event.link,
        abstract: event.abstract,
        deprecate: event.deprecate,
        description: event.description,
        deprecateDescription: event.deprecateDescription,
        javadoc: event.javadoc,
      }),
    );

  return NextResponse.json({
    query: request.nextUrl.searchParams.get("q"),
    version,
    count: matches.length,
    events: matches,
  });
};
