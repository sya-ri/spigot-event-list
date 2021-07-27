import { RequestPromise } from "request-promise";

export class Event {
  name: string;
  link: string;
  source: string;
  description: string;
  deprecate?: boolean;
  deprecateDescription: string;
}

export class EventSource {
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version?: string;
  updateVersion: (source: EventSource) => RequestPromise;
  downloadSources: string[];
}

export interface EventsYamlType {
  versions: {
    [name: string]: string;
  };
  events: Event[];
}
