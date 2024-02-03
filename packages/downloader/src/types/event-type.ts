import SourceType from "./source-type";

type EventType = {
  description: Record<string, string>;
  abstract?: true;
  href: string;
  javadoc?: string;
  link: string;
  name: string;
  source: SourceType;
  deprecate?: true;
  deprecateDescription?: Record<string, string>;
};

export default EventType;
