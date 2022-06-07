import SourceName from "../scripts/SourceName";
import { Artifact } from "./mvn/artifact-download";

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
  updateVersion: (source: EventSource) => Promise<void>;
  downloadSources: SourceName[];
}
