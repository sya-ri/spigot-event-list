import Source from "./Source";
import SourceMap from "./SourceMap";
import Sources from "./Sources";
import { readVersions } from "./json/versions";

/**
 * 前回使った SourceMap を取得する
 */
const getLastSourceMap = (): SourceMap => {
  const lastVersions = readVersions();
  return Object.entries(Sources).reduce((map, [name, source]) => {
    map[name] = {
      ...source,
      version: lastVersions[name],
    } as Source;
    return map;
  }, {} as SourceMap);
};

export default getLastSourceMap;
