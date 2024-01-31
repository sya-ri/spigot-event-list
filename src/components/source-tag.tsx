import { FC } from "react";
import clsx from "clsx";
import EventSource from "@/types/event-source";

export type SourceTagProps = {
  source: EventSource;
};

const SourceTag: FC<SourceTagProps> = ({ source }) => {
  return (
    <div
      className={clsx(
        "rounded-lg px-1.5 text-sm my-auto font-mono",
        source == "spigot" && "bg-orange-300 text-orange-900",
        source == "paper" && "bg-gray-300 text-gray-900",
        source == "purpur" && "bg-purple-300 text-purple-900",
        source == "bungee" && "bg-yellow-300 text-yellow-900",
        source == "waterfall" && "bg-cyan-300 text-cyan-900",
        source == "velocity" && "bg-teal-300 text-teal-900",
      )}
    >
      {source}
    </div>
  );
};

export default SourceTag;
