import useSWRImmutable from "swr/immutable";
import EventSource from "@/types/event-source";
import { Locale } from "@/i18n/config";

type Event = {
  name: string;
  description: string;
  link: string;
  abstract?: true;
  source: EventSource;
  deprecate?: string;
  deprecateDescription?: string;
};

type SearchEventsResponse = {
  events: Event[];
};

const useEvents = (
  locale: Locale,
  version: string,
  search: string,
  tags: EventSource[],
) => {
  const normalizedSearch = search.trim();
  const source = tags.join(",");
  const { data: events } = useSWRImmutable(
    version ? ["events", locale, version, normalizedSearch, source] : null,
    async ([, locale, version, search, source]) => {
      if (search) {
        const params = new URLSearchParams({
          q: search,
          version,
          source,
          lang: locale,
          limit: "100",
        });
        const response = await fetch(`/api/search/events?${params}`);
        const data = (await response.json()) as SearchEventsResponse;
        return data.events;
      }
      return fetch(
        `/api/versions/${encodeURIComponent(version)}/events?lang=${locale}`,
      ).then((response) => response.json() as Promise<Event[]>);
    },
  );
  return { events };
};

export default useEvents;
