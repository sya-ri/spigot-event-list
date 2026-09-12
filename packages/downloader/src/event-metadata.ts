import type EventType from "./types/event-type";

export const hasLocalizedDescription = (
  value: string | undefined,
  lang: string,
) =>
  Boolean(
    value?.trim() &&
    (lang !== "ja" || /[\u3040-\u30ff\u3400-\u9fff]/.test(value)),
  );

// Whitespace differences from Javadoc HTML must not discard an editorial review.
// Without a class summary, reuse metadata only for the same reference URL.
const normalizedJavadoc = (event: EventType) => {
  let text = event.javadoc?.replace(/\s+/g, "") ?? "";
  // Older snapshots included the same deprecation notice twice in the summary.
  // Removing those notices during extraction must preserve the reviewed summary.
  if (event.deprecate && text.startsWith("Deprecated.")) {
    const reason = event.deprecateDescription?.en?.replace(/\s+/g, "");
    if (reason) {
      text = text.slice("Deprecated.".length);
      while (text.startsWith(reason)) text = text.slice(reason.length);
    }
  }
  return text;
};

export const eventEvidenceKey = (event: EventType) =>
  JSON.stringify([
    event.source,
    event.href,
    normalizedJavadoc(event) || event.link,
  ]);

export const reuseEventMetadata = (
  event: EventType,
  previous?: EventType,
): EventType => {
  if (!previous || eventEvidenceKey(event) !== eventEvidenceKey(previous))
    return event;
  return {
    ...event,
    description: Object.fromEntries(
      [
        ...new Set([
          ...Object.keys(event.description),
          ...Object.keys(previous.description),
        ]),
      ].map((lang) => [
        lang,
        hasLocalizedDescription(previous.description[lang], lang)
          ? previous.description[lang]
          : (event.description[lang] ?? ""),
      ]),
    ),
    keywords: previous.keywords ?? event.keywords,
  };
};
