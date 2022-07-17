import { EventType, SourceName } from "spigot-event-list-common";
import EventSourceTags from "~/components/events/EventSourceTags";
import { filterSources, searchText } from "~/states";
import { createEffect, createSignal, Show } from "solid-js";

export type EventListContentProps = {
  event: EventType;
};

export default function EventListContent(props: EventListContentProps) {
  const [show, setShow] = createSignal(false);

  createEffect(() => {
    function matchSearchText(name: string) {
      const search = searchText();
      return !search || name.match(new RegExp(search, "i"));
    }
    function matchSource(source: SourceName) {
      return filterSources[source];
    }

    setShow(
      matchSearchText(props.event.name) && matchSource(props.event.source)
    );
  });

  return (
    <Show when={show()}>
      <div class="my-4">
        <div class="flex justify-between">
          <a
            href={props.event.link}
            target="_blank"
            rel="noopener"
            class="hover:underline hover:cursor-pointer"
          >
            <p class={`font-medium ${props.event.abstract && "line-through"}`}>
              {props.event.name}
            </p>
          </a>
          <EventSourceTags source={props.event.source} />
        </div>
        <p class="font-normal mx-4 my-1">{props.event.description}</p>
      </div>
    </Show>
  );
}
