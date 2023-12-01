import { For } from "solid-js";
import EventListContent from "./EventListContent";
import events from "../../../events.json";
import { EventType } from "~/types";

export default function EventList() {
  return (
    <div class="max-w-xl mx-auto">
      <For each={events as EventType[]}>
        {(event, index) => (
          <EventListContent data-index={index()} event={event} />
        )}
      </For>
    </div>
  );
}
