import SourceType from "../lib/SourceType";
import { Artifact } from "./mvn/artifact-download";

/**
 * イベントソース
 */
export default interface Source {
  artifact: Artifact;
  repository: string;
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  deprecateList: string;
  version?: string;
  updateVersion: (source: Source) => Promise<void>;
  downloadSources: SourceType[];
}
