import { RequestPromise } from "request-promise";

export default interface EventSource {
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version?: string;
  updateVersion: (source: EventSource) => RequestPromise;
  downloadSources: string[];
}
