import {
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
  resolveServerVersion,
} from "./data-paths";
import type EventType from "../../packages/downloader/src/types/event-type";
import type { EventResponse } from "../types/event";

export const eventDataDependencies = {
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
};

export type EventDataDependencies = typeof eventDataDependencies;

export const readEventData = async (
  version: string,
  dependencies: EventDataDependencies,
) => {
  const [versions, latest] = await Promise.all([
    dependencies.getServerVersionsDesc(),
    dependencies.getLatestMinecraftVersion(),
  ]);
  const resolution = resolveServerVersion(version, versions, latest);
  if (!resolution) return null;
  if (resolution.resolvedVersion === "latest")
    return dependencies.readLatestServerEvents();
  const [server, proxy] = await Promise.all([
    dependencies.readServerEvents(resolution.resolvedVersion),
    dependencies.readProxyEvents(),
  ]);
  return { lang: server.lang, events: [...server.events, ...proxy.events] };
};

export const localizeEvent = (
  event: EventType,
  lang: string,
): EventResponse => ({
  name: event.name,
  description: event.description[lang] ?? "",
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
