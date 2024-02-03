import SourceType from "./source-type";

type EventType = {
  description: string;
  abstract?: true;
  href: string;
  javadoc?: string;
  link: string;
  name: string;
  source: SourceType;
  deprecate?: true;
  deprecateDescription?: string;
};

export default EventType;
