import { RequestPromise } from "request-promise";

export interface Event {
  name: string;
  link: string;
  source: string;
  description: string;
  deprecate?: boolean;
  deprecateDescription: string;
}

export interface EventSource {
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version?: string;
  updateVersion: (source: EventSource) => RequestPromise;
  downloadSources: string[];
}

export interface DataYamlType {
  versions: {
    [name: string]: string;
  };
  events: Event[];
  excludeEvents: string[];
}
