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
import React, { FC } from "react";
import SelectableSourceTag from "@/components/selectable-source-tag";
import EventSource from "@/types/event-source";
import { FiAlertTriangle } from "react-icons/fi";
import useEvents from "@/libs/hooks/use-events";

type EventListProps = {
  tags: EventSource[];
  setTags: (value: EventSource[]) => void;
  search: string;
};

const EventList: FC<EventListProps> = ({ tags, setTags, search }) => {
  const { events } = useEvents();
  return (
    <div className="flex flex-col gap-4">
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
                    "font-bold link-hover text-lg link-primary",
                    event.abstract && "line-through",
                  )}
                  href={event.link}
                  target="_blank"
                >
                  {event.name}
                </Link>
                <div className="flex gap-2 mr-0 ml-auto">
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
                <div className="flex items-center gap-2 text-error mt-1">
                  <FiAlertTriangle />
                  {event.deprecateDescription}
                </div>
              )}
              <div className="mt-1">{event.description}</div>
            </div>
          ))}
    </div>
  );
};

export default EventList;
