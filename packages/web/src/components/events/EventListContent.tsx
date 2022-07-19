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
    function matchSearchText(name: string, description: string) {
      const search = searchText();
      return (
        !search ||
        name.match(new RegExp(search, "i")) ||
        description.match(new RegExp(search, "i"))
      );
    }
    function matchSource(source: SourceName) {
      return filterSources[source];
    }

    setShow(
      matchSearchText(props.event.name, props.event.description) &&
        matchSource(props.event.source)
    );
  });

  return (
    <Show when={show()}>
      <div
        class="p-1 mx-1 my-2 cursor-pointer scroll-mt-40 md:scroll-mt-24"
        id={`${props.event.source}-${props.event.name}`}
        onClick={() => {
          window.location.hash = `#${props.event.source}-${props.event.name}`;
        }}
      >
        <div class="flex flex-wrap justify-between gap-1">
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
          <div class="ml-auto mr-0">
            <EventSourceTags source={props.event.source} />
          </div>
        </div>
        <p class="font-normal mx-4 my-1 break-all whitespace-pre-wrap">
          {props.event.description}
        </p>
      </div>
    </Show>
  );
}
