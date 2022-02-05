import EventSourceType from "../lib/EventSourceType";

/**
 * イベントソース
 */
export default interface EventSource {
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version?: string;
  updateVersion: (source: EventSource) => Promise<void>;
  downloadSources: EventSourceType[];
}
