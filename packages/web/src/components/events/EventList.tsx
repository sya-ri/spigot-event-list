import { getEvents } from "spigot-event-list-data";
import { For } from "solid-js";
import EventListContent from "./EventListContent";

const events = getEvents();

export default function EventList() {
  return (
    <div class="md:max-w-lg md:mx-auto">
      <For each={events}>
        {(event, index) => (
          <EventListContent data-index={index()} event={event} />
        )}
      </For>
    </div>
  );
}
