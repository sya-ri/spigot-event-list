import EventSource from "./EventSource";
import { readVersions } from "./json/versions";

/**
 * 前回使った Sources を取得する
 */
const getLastSources = (sources: {
  [name: string]: EventSource;
}): Promise<{ [name: string]: EventSource }> => {
  return readVersions().then((lastVersions) =>
    Object.entries(sources).reduce((map, [name, source]) => {
      map[name] = {
        ...source,
        version: lastVersions[name],
      };
      return map;
    }, {} as { [name: string]: EventSource })
  );
};

export default getLastSources;
