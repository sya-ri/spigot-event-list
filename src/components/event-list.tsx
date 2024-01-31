import events from "@data/events.json";
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

type EventListProps = {
  tags: EventSource[];
};

const EventList: FC<EventListProps> = ({ tags }) => {
  return (
    <div className="flex flex-col gap-4">
      {events
        .filter((event) => tags.includes(event.source as EventSource))
        .map((event) => (
          <div key={event.href}>
            <div className="flex justify-between">
              <Link
                className={clsx(
                  "text-lg link-primary",
                  event.abstract && "line-through",
                )}
                href={event.link}
                target="_blank"
              >
                {event.name}
              </Link>
              <div className="flex gap-2">
                {availableInSpigot(event.source) && (
                  <SelectableSourceTag source="spigot" />
                )}
                {availableInPaper(event.source) && (
                  <SelectableSourceTag source="paper" />
                )}
                {availableInPurpur(event.source) && (
                  <SelectableSourceTag source="purpur" />
                )}
                {availableInBungee(event.source) && (
                  <SelectableSourceTag source="bungee" />
                )}
                {availableInWaterfall(event.source) && (
                  <SelectableSourceTag source="waterfall" />
                )}
                {availableInVelocity(event.source) && (
                  <SelectableSourceTag source="velocity" />
                )}
              </div>
            </div>
            <div className="mt-1">{event.description}</div>
          </div>
        ))}
    </div>
  );
};

export default EventList;
