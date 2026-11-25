import { useEffect, useRef } from "react";
import { BiTestTube } from "react-icons/bi";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";
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
  const { events, error, isLoading, isLoadingMore, hasMore, loadMore, retry } = useEvents(
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
      {isLoading && !events.length && <p role="status">{t("LoadingEvents")}</p>}
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
            <a
              translate="no"
              href={e.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-description={e.abstract ? t("AbstractEvent") : undefined}
            >
              {e.abstract ? <s>{e.name}</s> : e.name}
            </a>
          </h2>
          <div className="event-meta">
            {platforms
              .filter((s) => compatible[s](e.source))
              .map((s) => (
                <button
                  key={s}
                  className="platform"
                  data-source={s}
                  translate="no"
                  aria-pressed={tags.length < platforms.length && tags.includes(s)}
                  onClick={() => toggle(s)}
                >
                  {sourceNames[s]}
                </button>
              ))}
          </div>
          {e.description && <p>{e.description}</p>}
          {e.javadoc && (
            <blockquote cite={e.link} lang="en">
              <p>{e.javadoc}</p>
            </blockquote>
          )}
          {(e.deprecate || e.deprecateDescription) && (
            <div className="event-notice" data-annotation={e.deprecate} role="note">
              {e.deprecate === "@Deprecated" ? (
                <FiAlertTriangle aria-hidden="true" />
              ) : e.deprecate === "@Experimental" ? (
                <BiTestTube aria-hidden="true" />
              ) : (
                <FiInfo aria-hidden="true" />
              )}
              <div>
                {e.deprecate && <strong translate="no">{e.deprecate}</strong>}
                {e.deprecateDescription && <p>{e.deprecateDescription}</p>}
              </div>
            </div>
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
