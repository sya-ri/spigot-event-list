"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  availableInBungee,
  availableInPaper,
  availableInPurpur,
  availableInSpigot,
  availableInVelocity,
  availableInWaterfall,
} from "@/libs/available-in";
import React, { FC, useEffect, useState } from "react";
import SelectableSourceTag from "@/components/selectable-source-tag";
import EventSource from "@/types/event-source";
import useEvents from "@/libs/hooks/use-events";
import { useCurrentLocale } from "next-i18n-router/client";
import { i18nConfig } from "@/i18n/config";
import { isEmpty } from "remeda/dist/es";
import { isDefined } from "remeda";
import { translate } from "@/i18n/translation";
import { FiAlertTriangle } from "react-icons/fi";

type EventListProps = {
  tags: EventSource[];
  setTags: (value: EventSource[]) => void;
  search: string;
};

const EventList: FC<EventListProps> = ({ tags, setTags, search }) => {
  const currentLocale = useCurrentLocale(i18nConfig);
  const { events } = useEvents(currentLocale);
  const [incompleteEvents, setIncompleteEvents] =
    useState<ReturnType<typeof useEvents>["events"]>();
  useEffect(() => {
    if (events) {
      setIncompleteEvents(
        events.filter(
          (event) =>
            isEmpty(event.description) ||
            (isDefined(event.deprecateDescription) &&
              isEmpty(event.deprecateDescription)),
        ),
      );
    }
  }, [events]);
  return (
    <div className="flex flex-col gap-4">
      {incompleteEvents && incompleteEvents.length !== 0 && (
        <div className="bg-warning text-warning-content rounded-lg">
          <div className="collapse collapse-arrow w-full">
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="flex items-center gap-8 w-full">
                <FiAlertTriangle />
                {translate(currentLocale, "IncompleteEvents").replace(
                  "%size%",
                  incompleteEvents.length.toLocaleString(),
                )}
              </div>
            </div>
            <div className="collapse-content">
              <ul className="w-fit mx-auto sm:mx-12">
                {incompleteEvents.map((event) => (
                  <li key={event.link}>
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
          </div>
        </div>
      )}
      {events &&
        events
          .filter(
            (event) =>
              tags.includes(event.source as EventSource) &&
              (event.name.match(new RegExp(search, "i")) ||
                event.description.match(new RegExp(search, "i"))),
          )
          .map((event) => (
            <div key={event.link}>
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
                  {availableInWaterfall(event.source) && (
                    <SelectableSourceTag
                      source="waterfall"
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
              <div className="mt-1 break-all">{event.description}</div>
            </div>
          ))}
    </div>
  );
};

export default EventList;
