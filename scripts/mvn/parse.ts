export interface Artifact {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
}

export default function parseFileName(name: string): Artifact {
  const parts = name.split(":");
  if (parts.length >= 3) {
    const artifact: Artifact = {
      groupId: parts[0],
      artifactId: parts[1],
      version: parts[parts.length - 1],
    };
    if (parts.length > 3) {
      artifact.extension = parts[2];
    }
    if (parts.length > 4) {
      artifact.classifier = parts[3];
    }
    if (artifact.version.endsWith("-SNAPSHOT")) {
      artifact.isSnapShot = true;
      artifact.version = artifact.version.substr(
        0,
        artifact.version.indexOf("-SNAPSHOT")
      );
    }
    return artifact;
  }
  throw new Error("not a maven package name. try <group>:<artifact>:<version>");
}
