import { filterSources, setFilterSources } from "~/states";
import { SourceName } from "~/types";

export type EventSourceTagProps = {
  source: SourceName;
};

export default function EventSourceTag(props: EventSourceTagProps) {
  const colors = {
    bukkit: "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-blue-800",
    bungee:
      "bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-300 text-yellow-800",
    paper: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800",
    purpur:
      "bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-800",
    spigot:
      "bg-orange-100 hover:bg-orange-200 active:bg-orange-300 text-orange-800",
    velocity: "bg-teal-100 hover:bg-teal-200 active:bg-teal-300 text-teal-800",
    waterfall: "bg-cyan-100 hover:bg-cyan-200 active:bg-cyan-300 text-cyan-800",
  };

  return (
    <span
      class={`flex items-center rounded-lg h-5 cursor-pointer dark:opacity-70 ${
        colors[props.source]
      }`}
      onClick={() =>
        setFilterSources(props.source, !filterSources[props.source])
      }
    >
      <p
        class={`text-xs font-medium px-2 select-none ${
          !filterSources[props.source] && "line-through"
        }`}
      >
        {props.source}
      </p>
    </span>
  );
}
