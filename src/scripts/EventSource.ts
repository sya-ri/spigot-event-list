import Artifact from "./mvn/Artifact.js";
import { SourceName } from "~/types.js";

/**
 * イベントソース
 */
export default interface EventSource {
  artifact: Artifact;
  repository: string;
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version?: string;
  // eslint-disable-next-line no-unused-vars
  updateVersion: (source: EventSource) => Promise<void>;
  downloadSources: SourceName[];
}
