import { EventType } from "spigot-event-list-common";
import EventSource from "./EventSource";

/**
 * 変更報告を取得する
 */
const getChangeLog = (
  lastSources: { [name: string]: EventSource },
  sources: { [name: string]: EventSource },
  sourceTypes: { [name: string]: EventType }
): string => {
  return [
    getVersionChangeLog(lastSources, sources),
    getDescriptionReport(sourceTypes),
  ]
    .filter((line) => line)
    .join("\n\n");
};

/**
 * バージョンに関する変更報告を取得する
 */
const getVersionChangeLog = (
  lastSources: { [name: string]: EventSource },
  sources: { [name: string]: EventSource }
): string | null => {
  const versions = Object.keys(sources)
    .map((name) => {
      const lastVersion = lastSources[name].version;
      const version = sources[name].version;
      return [name, lastVersion, version];
    })
    .filter(([, lastVersion, version]) => lastVersion != version)
    .map(
      ([name, lastVersion, version]) =>
        `- **${name}**: \`${lastVersion}\` → \`${version}\``
    );
  if (versions.length) {
    return "### バージョン\n\n" + versions.join("\n");
  } else {
    return null;
  }
};

/**
 * 説明文に関するレポートを取得する
 */
const getDescriptionReport = (sources: {
  [name: string]: EventType;
}): string | null => {
  const noDescription = (type: EventType) =>
    !type.description.length ||
    (type.deprecate && !type.deprecateDescription?.length);

  const noDescriptions = Object.values(sources)
    .filter((type) => noDescription(type))
    .map((type) => `- ${type.name} (${type.source})`);
  if (noDescriptions.length) {
    return "### 説明が書かれていないイベント\n\n" + noDescriptions.join("\n");
  } else {
    return null;
  }
};

export default getChangeLog;
