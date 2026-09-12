"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  availableInBungee,
  availableInPaper,
  availableInPurpur,
  availableInSpigot,
  availableInVelocity,
} from "@/libs/available-in";
import React, { FC, useMemo } from "react";
import SelectableSourceTag from "@/components/selectable-source-tag";
import EventSource from "@/types/event-source";
import useEvents from "@/libs/hooks/use-events";
import { isDefined, isEmpty } from "remeda";
import { translate } from "@/i18n/translation";
import { FiAlertTriangle } from "react-icons/fi";
import { Locale } from "@/i18n/config";

type EventListProps = {
  tags: EventSource[];
  setTags: (value: EventSource[]) => void;
  search: string;
  locale: Locale;
  version: string;
  resetFilters: () => void;
};

const EventList: FC<EventListProps> = ({
  tags,
  setTags,
  search,
  locale,
  version,
  resetFilters,
}) => {
  const {
    events,
    total,
    error,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    retry,
  } = useEvents(locale, version, search, tags);
  const incompleteEvents = useMemo(
    () =>
      events?.filter(
        (event) =>
          isEmpty(event.description) ||
          (isDefined(event.deprecateDescription) &&
            isEmpty(event.deprecateDescription)),
      ),
    [events],
  );
  return (
    <div className="flex flex-col gap-4">
      {isLoading && (
        <p role="status" className="text-center py-8">
          {translate(locale, "LoadingEvents")}
        </p>
      )}
      {total !== undefined && (
        <p role="status" className="text-sm text-base-content/70">
          {translate(locale, "ShowingEvents")
            .replace("%shown%", events.length.toLocaleString(locale))
            .replace("%total%", total.toLocaleString(locale))}
        </p>
      )}
      {!isLoading && !error && events.length === 0 && (
        <div className="text-center py-8 space-y-3">
          <p>{translate(locale, tags.length ? "NoEvents" : "NoSources")}</p>
          <button type="button" className="btn btn-sm" onClick={resetFilters}>
            {translate(locale, "ResetFilters")}
          </button>
        </div>
      )}

      {incompleteEvents && incompleteEvents.length !== 0 && (
        <div className="bg-warning text-warning-content rounded-lg">
          <details className="collapse collapse-arrow w-full">
            <summary className="collapse-title">
              <div className="flex items-center gap-8 w-full">
                <FiAlertTriangle />
                {translate(locale, "IncompleteEvents").replace(
                  "%size%",
                  incompleteEvents.length.toLocaleString(),
                )}
              </div>
            </summary>
            <div className="collapse-content">
              <ul className="mx-auto sm:mx-12 max-h-96 overflow-y-scroll">
                {incompleteEvents.map((event) => (
                  <li key={`${event.source}:${event.name}:${event.link}`}>
                    <Link
                      href={event.link}
                      className="link-hover"
                      target="_blank"
                    >
                      {event.source} {event.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      )}
      {events.map((event) => (
        <div key={`${event.source}:${event.name}:${event.link}`}>
          <div className="flex flex-wrap gap-1 justify-between">
            <Link
              className={clsx(
                "font-bold link-hover sm:text-lg link-primary break-all",
                event.abstract && "line-through",
              )}
              href={event.link}
              target="_blank"
            >
              {event.name}
            </Link>
            <div className="flex gap-2 mr-0 ml-auto flex-wrap justify-end">
              {availableInSpigot(event.source) && (
                <SelectableSourceTag
                  source="spigot"
                  tags={tags}
                  setTags={setTags}
                />
              )}
              {availableInPaper(event.source) && (
                <SelectableSourceTag
                  source="paper"
                  tags={tags}
                  setTags={setTags}
                />
              )}
              {availableInPurpur(event.source) && (
                <SelectableSourceTag
                  source="purpur"
                  tags={tags}
                  setTags={setTags}
                />
              )}
              {availableInBungee(event.source) && (
                <SelectableSourceTag
                  source="bungee"
                  tags={tags}
                  setTags={setTags}
                />
              )}
              {availableInVelocity(event.source) && (
                <SelectableSourceTag
                  source="velocity"
                  tags={tags}
                  setTags={setTags}
                />
              )}
            </div>
          </div>
          {event.deprecate && (
            <div className="flex items-center gap-2 text-error mt-1 flex-wrap break-all">
              <div>{event.deprecate}</div>
              <div>{event.deprecateDescription}</div>
            </div>
          )}
          <div className="mt-1 break-words">{event.description}</div>
        </div>
      ))}
      {error && (
        <div role="alert" className="text-center py-4 space-y-3">
          <p>{translate(locale, "LoadFailed")}</p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => void retry()}
            >
              {translate(locale, "Retry")}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={resetFilters}
            >
              {translate(locale, "ResetFilters")}
            </button>
          </div>
        </div>
      )}
      {hasMore && !error && (
        <button
          type="button"
          className="btn btn-outline self-center"
          disabled={isLoadingMore}
          onClick={() => void loadMore()}
        >
          {translate(locale, isLoadingMore ? "LoadingEvents" : "LoadMore")}
        </button>
      )}
    </div>
  );
};

export default EventList;
