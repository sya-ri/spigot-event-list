import { getEvents } from "spigot-event-list-data";
import { For } from "solid-js";
import EventListContent from "./EventListContent";

export default function EventList() {
  const events = getEvents();
  return (
    <div class="h-[calc(100vh-134px)] md:h-[calc(100vh-174px)] max-w-xl mx-auto">
      <For each={events}>
        {(event, index) => (
          <EventListContent data-index={index()} event={event} />
        )}
      </For>
    </div>
  );
}
