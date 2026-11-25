import type SourceType from "./source-type.ts";

type EventType = {
  description: Record<string, string>;
  keywords?: Record<string, string[]>;
  abstract?: true;
  href: string;
  javadoc?: string;
  link: string;
  name: string;
  source: SourceType;
  sourceName?: string;
  deprecate?: string;
  deprecateDescription?: Record<string, string>;
};

export type { EventType as default };
