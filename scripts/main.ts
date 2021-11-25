import { updateDeprecate } from "./events/deprecate";
import { downloadEventMap } from "./events/download";
import { excludeEvents } from "./events/exclude";
import { updateVersions } from "./events/versions";
import EventSources from "./EventSources";
import EventTypeMap from "./EventTypeMap";
import { writeFile } from "./file/util";
import getChangeLog from "./getChangeLog";
import getLastEventSources from "./getLastEventSources";
import { readEvents, writeEventMap } from "./json/events";
import { writeVersions } from "./json/versions";

const main = async () => {
  const lastEvents = readEvents();
  const lastEventMap = lastEvents.reduce((map, value) => {
    map[value.name + value.source] = value;
    delete value.deprecate;
    return map;
  }, {} as EventTypeMap);
  const lastEventSources = getLastEventSources();
  const eventMap = await downloadEventMap(lastEventMap);
  const versions = await updateVersions();
  excludeEvents(eventMap);
  await updateDeprecate(eventMap);
  writeEventMap(eventMap);
  writeVersions(versions);
  writeFile("report.md", getChangeLog(lastEventSources, EventSources));
};

main().then(() => console.log("* 更新が終了しました"));
