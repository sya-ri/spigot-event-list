import { For } from "solid-js";
import EventSourceTag from "~/components/events/EventSourceTag";
import { SourceName } from "~/types";

export type EventSourceTagsProps = {
  source: SourceName;
};

export default function EventSourceTags(props: EventSourceTagsProps) {
  function getSourceTags(source: SourceName): SourceName[] {
    switch (source) {
      case "bukkit":
        return ["bukkit", "spigot", "paper", "purpur"];
      case "spigot":
        return ["spigot", "paper", "purpur"];
      case "paper":
        return ["paper", "purpur"];
      case "purpur":
        return ["purpur"];
      case "bungee":
        return ["bungee", "waterfall"];
      case "waterfall":
        return ["waterfall"];
      case "velocity":
        return ["velocity"];
    }
  }

  return (
    <div class="flex gap-1">
      <For each={getSourceTags(props.source)}>
        {(source) => <EventSourceTag source={source} />}
      </For>
    </div>
  );
}
