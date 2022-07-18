import { getEvents } from "spigot-event-list-data";
import { For } from "solid-js";
import EventListContent from "./EventListContent";

export default function EventList() {
  const events = getEvents();
  return (
    <div class="h-[calc(100vh-182px)] md:h-[calc(100vh-142px)] max-w-xl mx-auto">
      <For each={events}>
        {(event, index) => (
          <EventListContent data-index={index()} event={event} />
        )}
      </For>
    </div>
  );
}
