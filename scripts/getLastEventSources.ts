import EventSource from "./EventSource";
import EventSourceMap from "./EventSourceMap";
import EventSources from "./EventSources";
import { readVersions } from "./json/versions";

/**
 * 前回使った EventSourceMap を取得する
 */
const getLastEventSources = (): EventSourceMap => {
  const lastVersions = readVersions();
  return Object.entries(EventSources).reduce((map, [name, source]) => {
    map[name] = {
      ...source,
      version: lastVersions[name],
    } as EventSource;
    return map;
  }, {} as EventSourceMap);
};

export default getLastEventSources;
