import requestPromise, { RequestPromise } from "request-promise";
import EventSource from "./EventSource";
import EventSourceMap from "./EventSourceMap";

/**
 * イベントリストのダウンロード元
 */
const EventSources: EventSourceMap = {
  Bungee: {
    allClasses: "allclasses.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["bungee"],
    downloadUrl: "https://ci.md-5.net/job/BungeeCord/lastBuild",
    javadocUrl: "https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/",
    updateVersion: (source: EventSource): RequestPromise =>
      requestPromise(
        "https://ci.md-5.net/job/BungeeCord/lastBuild/",
        (e, response, body: string) => {
          const match = body.match(
            "<title>BungeeCord (.*) \\[Jenkins\\]</title>"
          );
          if (match) {
            source.version = match.pop();
          }
        }
      ),
  },
  Paper: {
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["bukkit", "spigot", "paper"],
    downloadUrl: "https://papermc.io/downloads#Paper-1.17",
    javadocUrl: "https://papermc.io/javadocs/paper/1.17/",
    updateVersion: (source: EventSource): RequestPromise =>
      requestPromise(
        "https://papermc.io/api/v2/projects/paper/versions/1.17.1/",
        (e, response, body) => {
          const json = JSON.parse(body);
          source.version = "#" + json.builds.pop();
        }
      ),
  },
  Purpur: {
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["purpur"],
    downloadUrl: "https://purpur.pl3x.net/downloads/#1.17.1",
    javadocUrl: "https://purpur.pl3x.net/javadoc/",
    updateVersion: (source: EventSource): RequestPromise =>
      requestPromise(
        "https://api.pl3x.net/v2/purpur/1.17.1/",
        (e, response, body) => {
          const json = JSON.parse(body);
          source.version = "#" + json.builds.latest;
        }
      ),
  },
  Waterfall: {
    allClasses: "allclasses.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["waterfall"],
    downloadUrl: "https://papermc.io/downloads#Waterfall",
    javadocUrl: "https://papermc.io/javadocs/waterfall/1.18/",
    updateVersion: (source: EventSource): RequestPromise =>
      requestPromise(
        "https://papermc.io/api/v2/projects/waterfall/versions/1.18/",
        (e, response, body) => {
          const json = JSON.parse(body);
          source.version = "#" + json.builds.pop();
        }
      ),
  },
};

export default EventSources;
