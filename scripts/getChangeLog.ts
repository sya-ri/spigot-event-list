import EventSourceMap from "./EventSourceMap";

/**
 * 変更報告を取得する
 */
const getChangeLog = (
  lastEventSources: EventSourceMap,
  eventSources: EventSourceMap
): string => {
  let result = "";
  const versions = getVersionChangeLog(lastEventSources, eventSources);
  if (versions) result += versions;
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

export default getChangeLog;
