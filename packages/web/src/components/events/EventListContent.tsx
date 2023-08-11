import { EventType, SourceName } from "spigot-event-list-common";
import EventSourceTags from "~/components/events/EventSourceTags";
import { filterSources, searchText } from "~/states";
import { createEffect, createSignal, Show } from "solid-js";
import { BiRegularLink } from "solid-icons/bi";

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
        class="p-1 mx-1 my-2 scroll-mt-40 md:scroll-mt-24"
        id={`${props.event.source}-${props.event.name}`}
      >
        <div class="flex flex-wrap justify-between gap-1">
          <div class="group flex items-center flex-row-reverse md:flex-row">
            <a
              href={`#${props.event.source}-${props.event.name}`}
              class="hidden group-hover:inline-block float-right mr-[-1.25rem] ml-0 pl-1 pr-0 md:float-left md:ml-[-1.25rem] md:mr-0 md:pr-1 md:pl-0"
            >
              <BiRegularLink class="h-4 w-4 fill-current" />
            </a>
            <a
              href={props.event.link}
              target="_blank"
              rel="noopener"
              class="hover:underline hover:cursor-pointer"
            >
              <p
                class={`font-medium ${props.event.abstract && "line-through"}`}
              >
                {props.event.name}
              </p>
            </a>
          </div>
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
