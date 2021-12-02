import EventSourceMap from "./EventSourceMap";
import eventSources from "./EventSources";
import EventTypeMap from "./EventTypeMap";

/**
 * 変更報告を取得する
 */
const getChangeLog = (
  lastEventSources: EventSourceMap,
  eventSources: EventSourceMap,
  eventMap: EventTypeMap
): string => {
  let result = "";
  const versions = getVersionChangeLog(lastEventSources, eventSources);
  if (versions) result += versions;
  const descriptions = getDescriptionReport(eventMap);
  if (descriptions) result += descriptions;
  return result;
};

/**
 * バージョンに関する変更報告を取得する
 */
const getVersionChangeLog = (
  lastEventSources: EventSourceMap,
  eventSources: EventSourceMap
): string | null => {
  let result = "";
  let changeCount = 0;
  result += "### バージョン\n\n";
  Object.keys(eventSources).forEach((name) => {
    const lastVersion = lastEventSources[name].version;
    const version = eventSources[name].version;
    if (lastVersion != version) {
      result += `- **${name}**: \`${lastVersion}\` → \`${version}\`\n\n`;
      changeCount++;
    }
  });
  if (changeCount != 0) {
    return result;
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
