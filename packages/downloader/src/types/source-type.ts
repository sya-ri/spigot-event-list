const SourceType = [
  "spigot",
  "paper",
  "purpur",
  "bungee",
  "waterfall",
  "velocity",
] as const;

type SourceType = (typeof SourceType)[number];

export default SourceType;
