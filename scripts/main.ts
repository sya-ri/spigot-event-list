import SourceTypeMap from "./SourceTypeMap";
import Sources from "./Sources";
import { updateDeprecate } from "./events/deprecate";
import { updateEvents } from "./events/events";
import { excludeEvents } from "./events/exclude";
import downloadJavadoc from "./events/javadoc";
import { updateVersions } from "./events/versions";
import { writeFile } from "./file/util";
import getChangeLog from "./getChangeLog";
import getLastSourceMap from "./getLastSourceMap";
import { readEvents, writeEventMap } from "./json/events";
import { writeVersions } from "./json/versions";

const main = async () => {
  const lastEvents = readEvents();
  const lastEventMap = lastEvents.reduce((map, value) => {
    map[value.name + value.source] = value;
    delete value.deprecate;
    return map;
  }, {} as SourceTypeMap);
  const lastSourceMap = getLastSourceMap();
  const versions = await updateVersions();
  await downloadJavadoc();
  const eventMap = updateEvents(lastEventMap);
  excludeEvents(eventMap);
  await updateDeprecate(eventMap);
  writeEventMap(eventMap);
  writeVersions(versions);
  writeFile("report.md", getChangeLog(lastSourceMap, Sources, eventMap));
};

main().then(() => console.log("* 更新が終了しました"));
