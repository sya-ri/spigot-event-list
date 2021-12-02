import EventSourceMap from "./EventSourceMap";
import EventTypeMap from "./EventTypeMap";

/**
 * 変更報告を取得する
 */
const getChangeLog = (
  lastEventSources: EventSourceMap,
  eventSources: EventSourceMap,
  eventMap: EventTypeMap
): string => {
  return [
    getVersionChangeLog(lastEventSources, eventSources),
    getDescriptionReport(eventMap),
  ]
    .filter((line) => line)
    .join("\n\n");
};

/**
 * バージョンに関する変更報告を取得する
 */
const getVersionChangeLog = (
  lastEventSources: EventSourceMap,
  eventSources: EventSourceMap
): string | null => {
  const versions = Object.keys(eventSources)
    .map((name) => {
      const lastVersion = lastEventSources[name].version;
      const version = eventSources[name].version;
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
const getDescriptionReport = (eventMap: EventTypeMap): string | null => {
  const noDescriptions = Object.values(eventMap)
    .filter(
      (event) =>
        !event.description.length ||
        (event.deprecate && !event.deprecateDescription?.length)
    )
    .map((event) => `- ${event.name} (${event.source})`);
  if (noDescriptions.length) {
    return "### 説明が書かれていないイベント\n\n" + noDescriptions.join("\n");
  } else {
    return null;
  }
};

export default getChangeLog;
