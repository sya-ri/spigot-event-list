import type EventType from "../../packages/downloader/src/types/event-type";

type QueryTerm = {
  normalized: string;
};

type QueryClause = {
  terms: QueryTerm[];
};

const normalize = (value: string | null | undefined) =>
  (value ?? "").normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();

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

const tokenizeQuery = (value: string) =>
  Array.from(
    value.matchAll(/"([^"]+)"|'([^']+)'|\bAND\b|\bOR\b|[^\s]+/gi),
    (match) => ({
      value: match[1] ?? match[2] ?? match[0] ?? "",
      quoted: match[1] !== undefined || match[2] !== undefined,
    }),
  ).filter((token) => token.value.length > 0);

export const parseQuery = (value: string): QueryClause[] => {
  const clauses: QueryClause[] = [];
  let currentTerms: QueryTerm[] = [];

  for (const token of tokenizeQuery(value.normalize("NFKC"))) {
    const upper = token.value.toUpperCase();
    if (!token.quoted && upper === "OR") {
      if (currentTerms.length > 0) {
        clauses.push({ terms: currentTerms });
        currentTerms = [];
      }
      continue;
    }
    if (!token.quoted && upper === "AND") {
      continue;
    }
    const normalized = token.quoted
      ? normalize(token.value)
      : normalizeQueryTerm(token.value);
    if (!normalized) {
      continue;
    }
    currentTerms.push({ normalized });
  }

  if (currentTerms.length > 0) {
    clauses.push({ terms: currentTerms });
  }

  return clauses;
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

  const keywords = Object.values(event.keywords ?? {})
    .flat()
    .map(normalize);
  if (keywords.some((keyword) => keyword === term.normalized)) return 320;
  if (keywords.some((keyword) => keyword.includes(term.normalized))) return 280;

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

export const scoreEvent = (event: EventType, clauses: QueryClause[]) => {
  let totalScore = 0;

  for (const clause of clauses) {
    const termScores = clause.terms.map((term) => matchTermScore(event, term));
    if (termScores.some((score) => score === 0)) {
      continue;
    }
    totalScore +=
      termScores.reduce((total, score) => total + score, 0) +
      clause.terms.length * 25;
  }

  return totalScore;
};
