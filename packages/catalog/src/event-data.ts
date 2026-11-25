import type EventType from "./types/event-type";
import type { EventResponse } from "./types/event";
import { resolveServerVersion } from "./resolve-version";

export interface EventSnapshot {
  lang: string[];
  events: EventType[];
}

export interface EventDataDependencies {
  getLatestMinecraftVersion(): Promise<string | null>;
  getServerVersionsDesc(): Promise<string[]>;
  readLatestServerEvents(): Promise<EventSnapshot>;
  readProxyEvents(): Promise<EventSnapshot>;
  readServerEvents(version: string): Promise<EventSnapshot>;
}

export const readEventData = async (version: string, dependencies: EventDataDependencies) => {
  const [versions, latest] = await Promise.all([
    dependencies.getServerVersionsDesc(),
    dependencies.getLatestMinecraftVersion(),
  ]);
  const resolution = resolveServerVersion(version, versions, latest);
  if (!resolution) return null;
  if (resolution.resolvedVersion === "latest") return dependencies.readLatestServerEvents();
  const [server, proxy] = await Promise.all([
    dependencies.readServerEvents(resolution.resolvedVersion),
    dependencies.readProxyEvents(),
  ]);
  return { lang: server.lang, events: [...server.events, ...proxy.events] };
};

export const localizeEvent = (event: EventType, lang: string): EventResponse => ({
  name: event.name,
  description: event.description[lang] ?? "",
  keywords: event.keywords ?? {},
  javadoc: event.javadoc,
  link: event.link,
  abstract: event.abstract,
  source: event.source,
  deprecate: event.deprecate,
  deprecateDescription: event.deprecateDescription?.[lang],
});

export const compareEvents = (left: EventType, right: EventType) =>
  left.name.localeCompare(right.name) ||
  left.source.localeCompare(right.source) ||
  left.link.localeCompare(right.link);
