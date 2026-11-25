import { useEffect, useState, useSyncExternalStore } from "react";
import type { SearchEventsResponse } from "@spigot-event-list/catalog/types/event";
import sources from "@spigot-event-list/catalog/types/source-type";
import type { Locale } from "../lib/locale";
import { translate } from "../lib/translation";
import { splitTags, joinTags, addTag, removeTag } from "../lib/event-source-tag";
import SearchBox from "./SearchBox";
import Results from "./Results";
import { sourceNames } from "../lib/source-names";

const subscribe = (listener: () => void) => {
  window.addEventListener("popstate", listener);
  window.addEventListener("filterschange", listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener("filterschange", listener);
  };
};
function update(changes: Record<string, string | null>) {
  const url = new URL(location.href);
  for (const [key, value] of Object.entries(changes)) {
    if (value === null) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  if (url.href === location.href) return;
  history.pushState(null, "", url);
  window.dispatchEvent(new Event("filterschange"));
}
const reset = () => update({ search: null, version: null, tags: null });

type Props = { locale: Locale; versions: string[]; initial: SearchEventsResponse };
export default function Explorer({ locale, versions, initial }: Props) {
  const query = useSyncExternalStore(
    subscribe,
    () => location.search,
    () => "",
  );
  const params = new URLSearchParams(query);
  const search = params.get("search") ?? "";
  const version = params.get("version") || "latest";
  const tags = splitTags(params.get("tags"));
  const [filtersOpen, setFiltersOpen] = useState(true);
  useEffect(() => {
    const narrow = matchMedia("(max-width: 700px)");
    const syncFilters = () => setFiltersOpen(!narrow.matches);
    syncFilters();
    narrow.addEventListener("change", syncFilters);
    return () => narrow.removeEventListener("change", syncFilters);
  }, []);
  const toggle = (source: (typeof sources)[number]) => {
    const next = tags.includes(source) ? removeTag(tags, source) : addTag(tags, source);
    update({ tags: next.length === sources.length ? null : joinTags(next) });
  };
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key);
  const ja = locale === "ja";
  const filtered = Boolean(search || version !== "latest" || tags.length !== sources.length);
  return (
    <>
      <SearchBox
        locale={locale}
        search={search}
        setSearch={(value) => update({ search: value.trim() || null })}
      />
      <div className="index-layout">
        <details
          className="filters"
          open={filtersOpen}
          onToggle={(e) => setFiltersOpen(e.currentTarget.open)}
        >
          <summary>{t("Filters")}</summary>
          <div className="filter-body">
            <label htmlFor="version">{t("MinecraftVersion")}</label>
            <select
              id="version"
              value={version}
              onChange={(e) =>
                update({ version: e.target.value === "latest" ? null : e.target.value })
              }
            >
              {Array.from(new Set([...versions, version])).map((v) => (
                <option key={v} value={v}>
                  {v === "latest" ? t("Latest") : v}
                </option>
              ))}
            </select>
            <fieldset>
              <legend>{ja ? "プラットフォーム" : "Platforms"}</legend>
              {sources.map((s) => (
                <label className="source-choice" key={s}>
                  <input type="checkbox" checked={tags.includes(s)} onChange={() => toggle(s)} />
                  <span className="source-dot" data-source={s} aria-hidden="true" />
                  {sourceNames[s]}
                </label>
              ))}
            </fieldset>
            {filtered && (
              <button className="text-button" onClick={reset}>
                {t("ResetFilters")}
              </button>
            )}
          </div>
        </details>
        <Results
          key={JSON.stringify([search, version, tags])}
          locale={locale}
          version={version}
          search={search}
          tags={tags}
          initial={!filtered ? initial : undefined}
          toggle={toggle}
          reset={reset}
        />
      </div>
    </>
  );
}
