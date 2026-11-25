import { useEffect, useState, useSyncExternalStore } from "react";
import { FiGithub, FiMoon, FiSun } from "react-icons/fi";
import type { SearchEventsResponse } from "@spigot-event-list/catalog/types/event";
import sources from "@spigot-event-list/catalog/types/source-type";
import type { Locale } from "../lib/locale";
import { translate } from "../lib/translation";
import { splitTags, joinTags, addTag, removeTag } from "../lib/event-source-tag";
import SearchBox from "./SearchBox";
import Results from "./Results";
import SiteFooter from "./SiteFooter";
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
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const narrow = matchMedia("(max-width: 700px)");
    const system = matchMedia("(prefers-color-scheme: dark)");
    const syncFilters = () => setFiltersOpen(!narrow.matches);
    const syncTheme = () =>
      setDark(
        document.documentElement.dataset.theme
          ? document.documentElement.dataset.theme === "dark"
          : system.matches,
      );
    syncFilters();
    syncTheme();
    narrow.addEventListener("change", syncFilters);
    system.addEventListener("change", syncTheme);
    return () => {
      narrow.removeEventListener("change", syncFilters);
      system.removeEventListener("change", syncTheme);
    };
  }, []);
  const toggleTheme = () => {
    const value = dark ? "light" : "dark";
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("theme", value);
    } catch {
      /* Use the theme for this visit. */
    }
    setDark(!dark);
  };
  const toggle = (source: (typeof sources)[number]) => {
    const next = tags.includes(source) ? removeTag(tags, source) : addTag(tags, source);
    update({ tags: next.length === sources.length ? null : joinTags(next) });
  };
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key);
  const ja = locale === "ja";
  const alternate = ja ? "en" : "ja";
  const filtered = Boolean(search || version !== "latest" || tags.length !== sources.length);
  return (
    <>
      <a className="skip" href="#results">
        {t("SkipToResults")}
      </a>
      <header className="mast">
        <div className="shell mast-inner">
          <a className="brand" href={"/" + locale}>
            <img src="/favicon-32x32.png" width="28" height="28" alt="" />
            Spigot Event List
          </a>
          <nav aria-label={ja ? "サイトメニュー" : "Site navigation"}>
            <a
              href={"/" + alternate + query}
              hrefLang={alternate}
              lang={alternate}
              onClick={() => {
                document.cookie =
                  "NEXT_LOCALE=" + alternate + "; Path=/; Max-Age=31536000; SameSite=Lax";
              }}
            >
              {ja ? "English" : "日本語"}
            </a>
            <button
              type="button"
              className="icon-button"
              onClick={toggleTheme}
              aria-label={t("ToggleTheme")}
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>
            <a
              className="icon-button"
              href="https://github.com/sya-ri/spigot-event-list"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
          </nav>
        </div>
      </header>
      <main className="shell">
        <div className="search-area">
          <h1>{ja ? "イベントを探す" : "Find a plugin event"}</h1>
          <SearchBox
            locale={locale}
            search={search}
            setSearch={(value) => update({ search: value || null })}
          />
          <details className="search-help">
            <summary>{ja ? "検索のヒント" : "Search syntax"}</summary>
            <p>
              {ja
                ? "複数の語は AND、いずれかの語は OR、フレーズは二重引用符で検索できます。"
                : "Use AND to require both terms, OR to match either, or quotes for a phrase."}{" "}
              <code>join OR login</code>
            </p>
          </details>
        </div>
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
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
