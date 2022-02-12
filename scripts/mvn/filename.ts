import util from 'util';

export interface Artifact {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
}

function getVersion(artifact: Artifact): string {
  let suffix = '';
  if (artifact.isSnapShot) {
    if (artifact.snapShotVersion != null) {
      suffix = `-${artifact.snapShotVersion}`;
    } else {
      suffix = '-SNAPSHOT';
    }
  }
  const version = artifact.version;
  return `${version}${suffix}`;
}

export default function filename(artifact: Artifact) {
  const extension = artifact.extension || 'jar';
  let version = getVersion(artifact);

  if (artifact.classifier) {
    return util.format(
      '%s-%s-%s.%s',
      artifact.artifactId,
      version,
      artifact.classifier,
      extension
    );
  }
  return util.format('%s-%s.%s', artifact.artifactId, version, extension);
}
