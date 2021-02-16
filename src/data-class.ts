export class Event {
  name: string;
  link: string;
  source: string;
  description: string;
  deprecate: boolean | null;
  deprecateDescription: string;
}

export class EventSource {
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version: string;
  downloadSources: string[];
}
