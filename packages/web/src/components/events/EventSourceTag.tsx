import { SourceName } from "spigot-event-list-common";

export type EventSourceTagProps = {
  source: SourceName;
};

export default function EventSourceTag(props: EventSourceTagProps) {
  const colors = {
    bukkit: ["bg-blue-100", "text-blue-800"],
    bungee: ["bg-yellow-100", "text-yellow-800"],
    paper: ["bg-gray-100", "text-gray-800"],
    purpur: ["bg-purple-100", "text-purple-800"],
    spigot: ["bg-orange-100", "text-orange-800"],
    velocity: ["bg-teal-100", "text-teal-800"],
    waterfall: ["bg-cyan-100", "text-cyan-800"],
  };

  return (
    <span class={`flex items-center rounded-lg h-5 ${colors[props.source][0]}`}>
      <p class={`text-xs font-medium px-2 ${colors[props.source][1]}`}>
        {props.source}
      </p>
    </span>
  );
}
