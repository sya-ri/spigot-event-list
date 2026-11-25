import { useSyncExternalStore } from "react";
import { FiSliders, FiX } from "react-icons/fi";
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
  const allPlatforms = tags.length === sources.length;
  const selected = allPlatforms ? [] : tags;
  const toggle = (source: (typeof sources)[number]) => {
    const next = selected.includes(source) ? removeTag(selected, source) : addTag(selected, source);
    update({ tags: next.length && next.length < sources.length ? joinTags(next) : null });
  };
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key);
  const ja = locale === "ja";
  const hasFilters = version !== "latest" || !allPlatforms;
  return (
    <>
      <div className="search-tools">
        <SearchBox
          locale={locale}
          search={search}
          setSearch={(value) => update({ search: value.trim() || null })}
        />
        <button
          type="button"
          className="filter-toggle"
          popoverTarget="event-filters"
          aria-label={t("Filters")}
        >
          <FiSliders aria-hidden="true" />
          <span>{t("Filters")}</span>
        </button>
        <div
          id="event-filters"
          className="filter-menu"
          popover="auto"
          role="group"
          aria-label={t("Filters")}
        >
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
                <input type="checkbox" checked={selected.includes(s)} onChange={() => toggle(s)} />
                <span className="source-dot" data-source={s} aria-hidden="true" />
                {sourceNames[s]}
              </label>
            ))}
          </fieldset>
          {hasFilters && (
            <button className="text-button" onClick={() => update({ version: null, tags: null })}>
              {t("ResetFilters")}
            </button>
          )}
        </div>
      </div>
      {(version !== "latest" || selected.length > 0) && (
        <ul className="active-filters" aria-label={t("Filters")}>
          {version !== "latest" && (
            <li>
              <button
                type="button"
                onClick={() => update({ version: null })}
                aria-label={t("RemoveFilter").replace("%filter%", "Minecraft " + version)}
              >
                Minecraft {version}
                <FiX aria-hidden="true" />
              </button>
            </li>
          )}
          {selected.map((s) => (
            <li key={s}>
              <button
                type="button"
                data-source={s}
                onClick={() => toggle(s)}
                aria-label={t("RemoveFilter").replace("%filter%", sourceNames[s])}
              >
                <span className="source-dot" aria-hidden="true" />
                {sourceNames[s]}
                <FiX aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Results
        key={JSON.stringify([search, version, tags])}
        locale={locale}
        version={version}
        search={search}
        tags={tags}
        initial={!search && !hasFilters ? initial : undefined}
        toggle={toggle}
        reset={reset}
      />
    </>
  );
}
