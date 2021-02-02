export class Event {
  name: string;
  link: string;
  source: string;
  description: string;
  deprecated: boolean | null;
  deprecateMessage: string;
}

export class EventSource {
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecated: string;
  version: string;
}
