import { EventSource } from "./data-class";

const generateReport = (
  eventSources: { [name: string]: EventSource },
  lastEventSources: { [name: string]: EventSource }
): string => {
  let result = "";
  const versions = getVersionsReport(eventSources, lastEventSources);
  if (versions) result += versions;
  return result;
};

const getVersionsReport = (
  eventSources: { [name: string]: EventSource },
  lastEventSources: { [name: string]: EventSource }
): string | null => {
  let result = "";
  let changeCount = 0;
  result += "### バージョン\n";
  Object.keys(eventSources).forEach((name) => {
    const version = eventSources[name].version;
    const lastVersion = lastEventSources[name].version;
    if (version != lastVersion) {
      result += `- **${name}**: \`${lastVersion}\` → \`${version}\`\n`;
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
