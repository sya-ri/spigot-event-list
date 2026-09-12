import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import EventSource from "@/types/event-source";
import { joinTags, splitTags } from "@/libs/event-source-tag";

export const useEventFilters = () => {
  const params = useSearchParams();
  const search = params.get("search") ?? "";
  const version = params.get("version") || "latest";
  const tagParam = params.get("tags");
  const tags = useMemo(() => splitTags(tagParam), [tagParam]);
  const update = useCallback((changes: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(changes)) {
      if (value === null) url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    }
    if (url.href !== window.location.href) {
      window.history.pushState(null, "", url.pathname + url.search + url.hash);
    }
  }, []);
  const setSearch = useCallback(
    (value: string) => update({ search: value.trim() || null }),
    [update],
  );
  const setTags = useCallback(
    (value: EventSource[]) =>
      update({
        tags: value.length === EventSource.length ? null : joinTags(value),
      }),
    [update],
  );
  const setVersion = useCallback(
    (value: string) => update({ version: value === "latest" ? null : value }),
    [update],
  );
  const reset = useCallback(
    () => update({ search: null, tags: null, version: null }),
    [update],
  );
  return { search, version, tags, setSearch, setTags, setVersion, reset };
};
