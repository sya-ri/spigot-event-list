const EventSource = [
  "spigot",
  "paper",
  "purpur",
  "bungee",
  "velocity",
] as const;

type EventSource = (typeof EventSource)[number];

export default EventSource;
