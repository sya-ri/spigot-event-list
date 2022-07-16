import { EventType } from "spigot-event-list-common";
import EventSourceTags from "~/components/events/EventSourceTags";

export type EventListContentProps = {
  event: EventType;
};

export default function EventListContent(props: EventListContentProps) {
  return (
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
  );
}
