import { format } from "util";
import Artifact from "./Artifact";

const getVersion = (artifact: Artifact): string => {
  let suffix = "";
  if (artifact.isSnapShot) {
    if (artifact.snapShotVersion != null) {
      suffix = `-${artifact.snapShotVersion}`;
    } else {
      suffix = "-SNAPSHOT";
    }
  }
  const version = artifact.version;
  return `${version}${suffix}`;
};

const fileName = (artifact: Artifact) => {
  const extension = artifact.extension || "jar";
  const version = getVersion(artifact);
  if (artifact.classifier) {
    return format(
      "%s-%s-%s.%s",
      artifact.artifactId,
      version,
      artifact.classifier,
      extension
    );
  }
  return format("%s-%s.%s", artifact.artifactId, version, extension);
};

export default fileName;
