import { For } from "solid-js";
import { sourceNames } from "spigot-event-list-common";
import EventSourceTag from "~/components/events/EventSourceTag";

export default function HeaderTagsFilter() {
  return (
    <div class="flex flex-wrap justify-center gap-2">
      <For each={sourceNames}>
        {(source, index) => (
          <EventSourceTag data-index={index} source={source} />
        )}
      </For>
    </div>
  );
}
