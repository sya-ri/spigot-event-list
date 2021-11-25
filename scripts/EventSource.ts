import { RequestPromise } from "request-promise";
import EventSourceType from "../src/EventSourceType";

/**
 * イベントソース
 */
export default interface EventSource {
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version?: string;
  updateVersion: (source: EventSource) => RequestPromise;
  downloadSources: EventSourceType[];
}
