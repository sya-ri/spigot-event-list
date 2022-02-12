import { Artifact } from "mvn-artifact-download";
import SourceType from "../lib/SourceType";

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
