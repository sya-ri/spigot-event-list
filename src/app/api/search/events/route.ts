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

type QueryTerm = {
  normalized: string;
};

type QueryClause = {
  terms: QueryTerm[];
};

const normalize = (value: string | null | undefined) =>
  (value ?? "").replace(/\s+/g, " ").trim().toLocaleLowerCase();

const tokenizeQuery = (value: string) =>
  Array.from(
    value.matchAll(/"([^"]+)"|'([^']+)'|\bAND\b|\bOR\b|[^\s]+/gi),
    (match) => match[1] ?? match[2] ?? match[0] ?? "",
  ).filter((token) => token.length > 0);

const parseQuery = (value: string): QueryClause[] => {
  const clauses: QueryClause[] = [];
  let currentTerms: QueryTerm[] = [];

  for (const token of tokenizeQuery(value)) {
    const upper = token.toUpperCase();
    if (upper === "OR") {
      if (currentTerms.length > 0) {
        clauses.push({ terms: currentTerms });
        currentTerms = [];
      }
      continue;
    }
    if (upper === "AND") {
      continue;
    }
    const normalized = normalize(token);
    if (!normalized) {
      continue;
    }
    currentTerms.push({
      normalized,
    });
  }

  if (currentTerms.length > 0) {
    clauses.push({ terms: currentTerms });
  }

  return clauses;
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

const localizedValues = (value: Record<string, string> | undefined) =>
  Object.values(value ?? {});

const matchTermScore = (event: EventType, term: QueryTerm) => {
  const lowerName = normalize(event.name);
  if (lowerName === term.normalized) {
    return 500;
  }
  if (lowerName.includes(term.normalized)) {
    return 350;
  }

  const descriptionMatches = localizedValues(event.description)
    .map((value) => normalize(value))
    .filter((value) => value.includes(term.normalized)).length;
  if (descriptionMatches > 0) {
    return 220 + descriptionMatches * 10;
  }

  if (normalize(event.javadoc).includes(term.normalized)) {
    return 120;
  }

  const deprecateMatches = localizedValues(event.deprecateDescription)
    .map((value) => normalize(value))
    .filter((value) => value.includes(term.normalized)).length;
  if (deprecateMatches > 0) {
    return 70 + deprecateMatches * 5;
  }

  return 0;
};

const scoreEvent = (event: EventType, clauses: QueryClause[]) => {
  let bestScore = 0;

  for (const clause of clauses) {
    const termScores = clause.terms.map((term) => matchTermScore(event, term));
    if (termScores.some((score) => score === 0)) {
      continue;
    }
    const clauseScore =
      termScores.reduce((total, score) => total + score, 0) +
      clause.terms.length * 25;
    if (clauseScore > bestScore) {
      bestScore = clauseScore;
    }
  }

  return bestScore;
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
  const rawQuery = request.nextUrl.searchParams.get("q") ?? "";
  const clauses = parseQuery(rawQuery);
  if (clauses.length === 0) {
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
    query: rawQuery,
    version,
    count: matches.length,
    events: matches,
  });
};
