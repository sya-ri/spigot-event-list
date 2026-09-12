import useSWRImmutable from "swr/immutable";
import EventSource from "@/types/event-source";
import { Locale } from "@/i18n/config";
import type { EventResponse } from "@/libs/event-response";

type SearchEventsResponse = {
  events: EventResponse[];
  total: number;
};

const useEvents = (
  locale: Locale,
  version: string,
  search: string,
  tags: EventSource[],
) => {
  const normalizedSearch = search.trim();
  const source = tags.join(",");
  const { data: events, error } = useSWRImmutable(
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
        const events: EventResponse[] = [];
        let total = 0;
        do {
          params.set("offset", String(events.length));
          const response = await fetch(`/api/search/events?${params}`);
          if (!response.ok) throw new Error(await response.text());
          const data = (await response.json()) as SearchEventsResponse;
          events.push(...data.events);
          total = data.total;
          if (data.events.length === 0) break;
        } while (events.length < total);
        return events;
      }
      const response = await fetch(
        `/api/versions/${encodeURIComponent(version)}/events?lang=${locale}`,
      );
      if (!response.ok) throw new Error(await response.text());
      return response.json() as Promise<EventResponse[]>;
    },
  );
  return { events, error };
};

export default useEvents;
