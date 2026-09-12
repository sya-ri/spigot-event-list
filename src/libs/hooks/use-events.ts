import useSWRInfinite from "swr/infinite";
import type EventSource from "@/types/event-source";
import type { Locale } from "@/i18n/config";
import type { SearchEventsResponse } from "@/types/event";
import { fetchJson } from "@/libs/fetch-json";

const PAGE_SIZE = 50;

const useEvents = (
  locale: Locale,
  version: string,
  search: string,
  tags: EventSource[],
) => {
  const enabled = Boolean(version && tags.length);
  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite<SearchEventsResponse, Error>(
      (index, previous: SearchEventsResponse | null) => {
        if (!enabled || (previous && previous.nextOffset === null)) return null;
        const params = new URLSearchParams({
          q: search.trim(),
          version,
          source: tags.join(","),
          lang: locale,
          limit: String(PAGE_SIZE),
          offset: String(index * PAGE_SIZE),
        });
        return `/api/search/events?${params}`;
      },
      fetchJson<SearchEventsResponse>,
      {
        revalidateFirstPage: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      },
    );
  return {
    events: enabled ? (data?.flatMap((page) => page.events) ?? []) : [],
    total: enabled ? data?.[0]?.total : 0,
    error: enabled ? error : undefined,
    isLoading: enabled && isLoading,
    isLoadingMore:
      enabled &&
      !error &&
      (isValidating || Boolean(data && size > data.length)),
    hasMore: enabled && data?.[data.length - 1]?.nextOffset != null,
    loadMore: () => setSize(size + 1),
    retry: () => mutate(),
  };
};

export default useEvents;
