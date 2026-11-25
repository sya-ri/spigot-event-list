const SourceType = ["spigot", "paper", "purpur", "bungee", "velocity"] as const;

type SourceType = (typeof SourceType)[number];

export default SourceType;
