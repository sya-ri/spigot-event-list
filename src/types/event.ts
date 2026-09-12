import type EventSource from "./event-source";

export type EventResponse = {
  name: string;
  description: string;
  keywords: Record<string, string[]>;
  javadoc?: string;
  link: string;
  abstract?: true;
  source: EventSource;
  deprecate?: string;
  deprecateDescription?: string;
};

export type SearchEventResponse = EventResponse & {
  version: string;
};

export type SearchEventsResponse = {
  query: string;
  version: string;
  count: number;
  total: number;
  offset: number;
  nextOffset: number | null;
  events: SearchEventResponse[];
};
