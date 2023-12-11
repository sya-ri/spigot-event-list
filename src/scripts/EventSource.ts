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
  buildNumber: number;
  downloadSources: SourceName[];
}
