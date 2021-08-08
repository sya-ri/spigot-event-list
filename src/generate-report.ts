import { EventSourceMap } from "./data-class";

const generateReport = (
  lastEventSources: EventSourceMap,
  eventSources: EventSourceMap
): string => {
  let result = "";
  const versions = getVersionsReport(lastEventSources, eventSources);
  if (versions) result += versions;
  return result;
};

const getVersionsReport = (
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

export default generateReport;
