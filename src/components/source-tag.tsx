import { FC } from "react";
import clsx from "clsx";

type SourceTagProps = {
  name: string;
  className: string;
};

const SourceTag: FC<SourceTagProps> = ({ name, className }) => {
  return (
    <div
      className={clsx("rounded-lg px-1.5 text-sm my-auto font-mono", className)}
    >
      {name}
    </div>
  );
};

export const SpigotSourceTag = () => {
  return <SourceTag name="spigot" className="bg-orange-300 text-orange-900" />;
};

export const PaperSourceTag = () => {
  return <SourceTag name="paper" className="bg-gray-300 text-gray-900" />;
};

export const PurpurSourceTag = () => {
  return <SourceTag name="purpur" className="bg-purple-300 text-purple-900" />;
};

export const BungeeSourceTag = () => {
  return <SourceTag name="bungee" className="bg-yellow-300 text-yellow-900" />;
};

export const WaterfallSourceTag = () => {
  return <SourceTag name="waterfall" className="bg-cyan-300 text-cyan-900" />;
};

export const VelocitySourceTag = () => {
  return <SourceTag name="velocity" className="bg-teal-300 text-teal-900" />;
};
