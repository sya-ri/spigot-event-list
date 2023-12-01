import EventSource from "./EventSource.js";
import { readVersions } from "./json/versions.js";

/**
 * 前回使った Sources を取得する
 */
const getLastSources = async (sources: {
  [name: string]: EventSource;
}): Promise<{ [name: string]: EventSource }> => {
  let lastVersions = await readVersions();
  return Object.entries(sources).reduce(
    (map, [name, source]) => {
      map[name] = {
        ...source,
        version: lastVersions[name],
      };
      return map;
    },
    {} as { [name: string]: EventSource },
  );
};

export default getLastSources;
