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
import {
  BungeeSourceTag,
  PaperSourceTag,
  PurpurSourceTag,
  SpigotSourceTag,
  VelocitySourceTag,
  WaterfallSourceTag,
} from "@/components/source-tag";
import React from "react";

const EventList = () => {
  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
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
              {availableInSpigot(event.source) && <SpigotSourceTag />}
              {availableInPaper(event.source) && <PaperSourceTag />}
              {availableInPurpur(event.source) && <PurpurSourceTag />}
              {availableInBungee(event.source) && <BungeeSourceTag />}
              {availableInWaterfall(event.source) && <WaterfallSourceTag />}
              {availableInVelocity(event.source) && <VelocitySourceTag />}
            </div>
          </div>
          <div className="mt-1">{event.description}</div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
