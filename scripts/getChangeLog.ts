import EventType from "../lib/EventType";
import SourceMap from "./SourceMap";
import SourceTypeMap from "./SourceTypeMap";

/**
 * 変更報告を取得する
 */
const getChangeLog = (
  lastSourceMap: SourceMap,
  sourceMap: SourceMap,
  sourceTypeMap: SourceTypeMap
): string => {
  return [
    getVersionChangeLog(lastSourceMap, sourceMap),
    getDescriptionReport(sourceTypeMap),
  ]
    .filter((line) => line)
    .join("\n\n");
};

/**
 * バージョンに関する変更報告を取得する
 */
const getVersionChangeLog = (
  lastSourceMap: SourceMap,
  sourceMap: SourceMap
): string | null => {
  const versions = Object.keys(sourceMap)
    .map((name) => {
      const lastVersion = lastSourceMap[name].version;
      const version = sourceMap[name].version;
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
const getDescriptionReport = (sourceTypeMap: SourceTypeMap): string | null => {
  const noDescription = (type: EventType) =>
    !type.description.length ||
    (type.deprecate && !type.deprecateDescription?.length);

  const noDescriptions = Object.values(sourceTypeMap)
    .filter((type) => noDescription(type))
    .map((type) => `- ${type.name} (${type.source})`);
  if (noDescriptions.length) {
    return "### 説明が書かれていないイベント\n\n" + noDescriptions.join("\n");
  } else {
    return null;
  }
};

export default getChangeLog;
