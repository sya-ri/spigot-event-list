export type SourceName =
    | "bukkit"
    | "spigot"
    | "paper"
    | "purpur"
    | "bungee"
    | "waterfall"
    | "velocity";

export const sourceNames: SourceName[] = [
  "bukkit",
  "spigot",
  "paper",
  "purpur",
  "bungee",
  "waterfall",
  "velocity",
];

/**
 * イベントデータの定義
 */
export interface EventType {
  name: string;
  link: string;
  source: SourceName;
  href: string;
  javadoc?: string;
  abstract?: boolean;
  description: string;
  deprecate?: boolean;
  deprecateDescription?: string;
}

