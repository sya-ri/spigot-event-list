import { useEffect, useRef } from "react";
import type EventSource from "@spigot-event-list/catalog/types/source-type";
import type { SearchEventsResponse } from "@spigot-event-list/catalog/types/event";
import {
  availableInBungee,
  availableInPaper,
  availableInPurpur,
  availableInSpigot,
  availableInVelocity,
} from "../lib/available-in";
import { translate } from "../lib/translation";
import type { Locale } from "../lib/locale";
import useEvents from "../lib/use-events";
import { sourceNames } from "../lib/source-names";

const compatible = {
  spigot: availableInSpigot,
  paper: availableInPaper,
  purpur: availableInPurpur,
  bungee: availableInBungee,
  velocity: availableInVelocity,
};
const platforms = Object.keys(compatible) as EventSource[];
type Props = {
  locale: Locale;
  version: string;
  search: string;
  tags: EventSource[];
  initial?: SearchEventsResponse;
  toggle: (source: EventSource) => void;
  reset: () => void;
};
export default function Results({ locale, version, search, tags, initial, toggle, reset }: Props) {
  const { events, total, error, isLoading, isLoadingMore, hasMore, loadMore, retry } = useEvents(
    locale,
    version,
    search,
    tags,
    initial,
  );
  const sentinel = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const button = sentinel.current;
    if (!button || !hasMore || error || isLoadingMore || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((item) => item.isIntersecting)) {
          observer.disconnect();
          loadMore();
        }
      },
      { rootMargin: "180px" },
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, [hasMore, error, isLoadingMore, loadMore]);
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key);
  const incomplete = events.filter((e) => !e.description || e.deprecateDescription === "");
  return (
    <section id="results" tabIndex={-1} aria-label={locale === "ja" ? "検索結果" : "Results"}>
      <div className="result-bar" role="status">
        {total !== undefined
          ? t("ShowingEvents")
              .replace("%shown%", events.length.toLocaleString(locale))
              .replace("%total%", total.toLocaleString(locale))
          : isLoading
            ? t("LoadingEvents")
            : t("Search")}
      </div>
      {incomplete.length > 0 && (
        <details className="missing">
          <summary>{t("IncompleteEvents").replace("%size%", String(incomplete.length))}</summary>
          <ul>
            {incomplete.map((e) => (
              <li key={e.link + e.source}>
                <a href={e.link}>{e.name}</a>
              </li>
            ))}
          </ul>
        </details>
      )}
      {events.map((e) => (
        <article key={e.source + e.link} className="event">
          <h2>
            <a href={e.link} target="_blank" rel="noopener noreferrer">
              {e.name}
            </a>
          </h2>
          {e.description && <p>{e.description}</p>}
          <div className="event-meta">
            {platforms
              .filter((s) => compatible[s](e.source))
              .map((s) => (
                <button
                  key={s}
                  className="platform"
                  aria-pressed={tags.includes(s)}
                  onClick={() => toggle(s)}
                >
                  {sourceNames[s]}
                </button>
              ))}
            {e.abstract && <span>abstract</span>}
            {e.deprecate && <span className="deprecated">{e.deprecate}</span>}
          </div>
          {e.deprecateDescription && <p className="deprecated">{e.deprecateDescription}</p>}
          {e.javadoc && (
            <details className="javadoc">
              <summary>Javadoc</summary>
              <p>{e.javadoc}</p>
            </details>
          )}
        </article>
      ))}
      {error && (
        <div role="alert">
          <p>{t("LoadFailed")}</p>
          <button className="action" onClick={() => void retry()}>
            {t("Retry")}
          </button>{" "}
          <button className="text-button" onClick={reset}>
            {t("ResetFilters")}
          </button>
        </div>
      )}
      {!error && !isLoading && !events.length && (
        <div className="empty">
          <p>{t(tags.length ? "NoEvents" : "NoSources")}</p>
          <button className="action" onClick={reset}>
            {t("ResetFilters")}
          </button>
        </div>
      )}
      {hasMore && !error && (
        <button
          type="button"
          className="action more"
          disabled={isLoadingMore}
          ref={sentinel}
          onClick={loadMore}
        >
          {t(isLoadingMore ? "LoadingEvents" : "LoadMore")}
        </button>
      )}
    </section>
  );
}
