import { EventType } from "~/types.js";

/**
 * 変更報告を取得する
 */
const getChangeLog = (sourceTypes: { [name: string]: EventType }): string => {
  return [getDescriptionReport(sourceTypes)]
    .filter((line) => line)
    .join("\n\n");
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
