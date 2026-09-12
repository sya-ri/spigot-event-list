import type EventType from "../../packages/downloader/src/types/event-type";

export const toEventResponse = (event: EventType, lang: string) => ({
  name: event.name,
  source: event.source,
  description: event.description[lang] ?? "",
  keywords: event.keywords ?? {},
  link: event.link,
  javadoc: event.javadoc,
  abstract: event.abstract,
  deprecate: event.deprecate,
  deprecateDescription: event.deprecateDescription?.[lang],
});

export type EventResponse = ReturnType<typeof toEventResponse>;
