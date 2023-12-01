import { For } from "solid-js";
import EventSourceTag from "~/components/events/EventSourceTag";
import { sourceNames } from "~/types";

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
