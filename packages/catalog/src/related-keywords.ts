import { eventNameWords, normalizeSearchText } from "./search-text";
import type EventType from "./types/event-type";

const asciiWord = /[a-z\d_]/u;
export const minimumRelatedKeywords = 4;

function containsTerm(text: string, term: string) {
  const checkStart = asciiWord.test(term[0]);
  const checkEnd = asciiWord.test(term[term.length - 1]);
  for (let at = text.indexOf(term); at !== -1; at = text.indexOf(term, at + 1)) {
    const before = text[at - 1] ?? "";
    const after = text[at + term.length] ?? "";
    if ((!checkStart || !asciiWord.test(before)) && (!checkEnd || !asciiWord.test(after))) {
      return true;
    }
  }
  return false;
}

export function relatedKeywords(
  event: Pick<EventType, "name" | "description">,
  candidates: string[],
) {
  const name = normalizeSearchText(event.name);
  const searchableText = [
    eventNameWords(event.name),
    ...Object.values(event.description).map(normalizeSearchText),
  ];
  const seen = new Set<string>();
  return candidates
    .map((keyword) => keyword.trim())
    .filter((keyword) => {
      const term = normalizeSearchText(keyword);
      if (
        !term ||
        seen.has(term) ||
        name.includes(term) ||
        searchableText.some((text) => containsTerm(text, term))
      ) {
        return false;
      }
      seen.add(term);
      return true;
    });
}
