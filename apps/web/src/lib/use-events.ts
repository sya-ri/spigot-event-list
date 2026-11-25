import useSWRInfinite from "swr/infinite";
import { useCallback } from "react";
import type EventSource from "@spigot-event-list/catalog/types/source-type";
import type { Locale } from "./locale";
import type { SearchEventsResponse } from "@spigot-event-list/catalog/types/event";
import { fetchJson } from "./fetch-json";

const PAGE_SIZE = 50;

const useEvents = (
  locale: Locale,
  version: string,
  search: string,
  tags: EventSource[],
  initial?: SearchEventsResponse,
) => {
  const enabled = Boolean(version && tags.length);
  const { data, error, isLoading, isValidating, size, setSize, mutate } = useSWRInfinite<
    SearchEventsResponse,
    Error
  >(
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
      fallbackData: initial ? [initial] : undefined,
      revalidateOnMount: initial ? false : undefined,
      keepPreviousData: false,
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    },
  );
  const isLoadingMore = enabled && !error && (isValidating || Boolean(data && size > data.length));
  const hasMore = enabled && data?.[data.length - 1]?.nextOffset != null;
  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore && !error) {
      void setSize((current) => current + 1).catch(() => {});
    }
  }, [error, hasMore, isLoadingMore, setSize]);

  return {
    events: enabled ? (data?.flatMap((page) => page.events) ?? []) : [],
    total: enabled ? data?.[0]?.total : 0,
    error: enabled ? error : undefined,
    isLoading: enabled && isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    retry: () => mutate(),
  };
};

export default useEvents;
