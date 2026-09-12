import type EventType from "../../packages/downloader/src/types/event-type";

type QueryTerm = { normalized: string };
type QueryClause = { terms: QueryTerm[] };

const normalize = (value: string | null | undefined) =>
  (value ?? "").replace(/\s+/g, " ").trim().toLocaleLowerCase();

const englishStopWords = new Set([
  "a",
  "an",
  "and",
  "at",
  "by",
  "for",
  "from",
  "in",
  "into",
  "is",
  "of",
  "on",
  "the",
  "to",
  "when",
]);

const normalizeJapaneseQueryEnding = (value: string) => {
  const suffixes = [
    "されていたとき",
    "されていた時",
    "していたとき",
    "していた時",
    "されたとき",
    "された時",
    "するとき",
    "する時",
    "したとき",
    "した時",
    "である",
    "でした",
    "だった",
    "されていた",
    "していた",
    "された",
    "している",
    "される",
    "します",
    "する",
    "した",
    "です",
    "だ",
  ];
  for (const suffix of suffixes) {
    if (value.endsWith(suffix) && value.length > suffix.length + 1) {
      return value.slice(0, -suffix.length);
    }
  }
  return value;
};

const normalizeQueryTerm = (value: string) => {
  const normalized = normalize(value);
  if (englishStopWords.has(normalized)) {
    return "";
  }
  if (/^[a-z]+ies$/.test(normalized)) {
    return `${normalized.slice(0, -3)}y`;
  }
  if (/^[a-z]+(?:ches|shes|xes|zes|ses)$/.test(normalized)) {
    return normalized.slice(0, -2);
  }
  if (/^[a-z]{4,}s$/.test(normalized)) {
    return normalized.slice(0, -1);
  }
  return normalizeJapaneseQueryEnding(normalized);
};

// Whitespace and AND require every term; OR starts an alternative clause.
export const parseQuery = (value: string): QueryClause[] => {
  const clauses: QueryClause[] = [];
  let terms: QueryTerm[] = [];
  for (const match of value.matchAll(/"([^"]+)"|'([^']+)'|[^\s]+/g)) {
    const quoted = match[1] !== undefined || match[2] !== undefined;
    const token = match[1] ?? match[2] ?? match[0];
    if (!quoted && token.toUpperCase() === "OR") {
      if (terms.length) clauses.push({ terms });
      terms = [];
      continue;
    }
    if (!quoted && token.toUpperCase() === "AND") continue;
    const normalized = quoted ? normalize(token) : normalizeQueryTerm(token);
    if (normalized) terms.push({ normalized });
  }
  if (terms.length) clauses.push({ terms });
  return clauses;
};

const localizedValues = (value: Record<string, string> | undefined) =>
  Object.values(value ?? {});

const normalizedEvents = new WeakMap<
  EventType,
  {
    name: string;
    description: string[];
    javadoc: string;
    deprecateDescription: string[];
  }
>();

const normalizedEvent = (event: EventType) => {
  let value = normalizedEvents.get(event);
  if (!value) {
    value = {
      name: normalize(event.name),
      description: localizedValues(event.description).map(normalize),
      javadoc: normalize(event.javadoc),
      deprecateDescription: localizedValues(event.deprecateDescription).map(
        normalize,
      ),
    };
    normalizedEvents.set(event, value);
  }
  return value;
};

const matchTermScore = (
  event: ReturnType<typeof normalizedEvent>,
  term: QueryTerm,
) => {
  const lowerName = event.name;
  if (lowerName === term.normalized) {
    return 500;
  }
  if (lowerName.includes(term.normalized)) {
    return 350;
  }

  const descriptionMatches = event.description.filter((value) =>
    value.includes(term.normalized),
  ).length;
  if (descriptionMatches > 0) {
    return 220 + descriptionMatches * 10;
  }

  if (event.javadoc.includes(term.normalized)) {
    return 120;
  }

  const deprecateMatches = event.deprecateDescription.filter((value) =>
    value.includes(term.normalized),
  ).length;
  if (deprecateMatches > 0) {
    return 70 + deprecateMatches * 5;
  }

  return 0;
};

export const scoreEvent = (event: EventType, clauses: QueryClause[]) => {
  const normalized = normalizedEvent(event);
  let totalScore = 0;

  for (const clause of clauses) {
    const termScores = clause.terms.map((term) =>
      matchTermScore(normalized, term),
    );
    if (termScores.some((score) => score === 0)) {
      continue;
    }
    totalScore +=
      termScores.reduce((total, score) => total + score, 0) +
      clause.terms.length * 25;
  }

  return totalScore;
};
