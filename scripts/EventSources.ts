import axios from "axios";
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
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get<string>("https://ci.md-5.net/job/BungeeCord/lastBuild/")
        .then((response) => {
          const body = response.data;
          const match = body.match(
            "<title>BungeeCord (.*) \\[Jenkins\\]</title>"
          );
          if (match) {
            source.version = match.pop();
          }
        })
        .catch((reason) => console.error(reason)),
  },
  Paper: {
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["paper"],
    downloadUrl: "https://papermc.io/downloads#Paper-1.17",
    javadocUrl: "https://papermc.io/javadocs/paper/1.17/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://papermc.io/api/v2/projects/paper/versions/1.17.1/")
        .then((response) => {
          const json = response.data;
          source.version = "#" + json.builds.pop();
        })
        .catch((reason) => console.error(reason)),
  },
  Purpur: {
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["purpur"],
    downloadUrl: "https://purpur.pl3x.net/downloads/#1.17.1",
    javadocUrl: "https://purpur.pl3x.net/javadoc/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://api.pl3x.net/v2/purpur/1.17.1/")
        .then((response) => {
          const json = response.data;
          source.version = "#" + json.builds.latest;
        })
        .catch((reason) => console.error(reason)),
  },
  Spigot: {
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["bukkit", "spigot"],
    downloadUrl: "https://ci.md-5.net/job/Spigot/lastBuild",
    javadocUrl: "https://hub.spigotmc.org/javadocs/spigot/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get<string>(
          "https://hub.spigotmc.org/jenkins/view/All/job/Spigot-RSS/lastBuild/"
        )
        .then((response) => {
          const body = response.data;
          const match = body.match(
            "<title>Spigot-RSS (.*) \\[Jenkins\\]</title>"
          );
          if (match) {
            source.version = match.pop();
          }
        })
        .catch((reason) => console.error(reason)),
  },
  Waterfall: {
    allClasses: "allclasses.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["waterfall"],
    downloadUrl: "https://papermc.io/downloads#Waterfall",
    javadocUrl: "https://papermc.io/javadocs/waterfall/1.18/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://papermc.io/api/v2/projects/waterfall/versions/1.18/")
        .then((response) => {
          const json = response.data;
          source.version = "#" + json.builds.pop();
        })
        .catch((reason) => console.error(reason)),
  },
};

export default EventSources;
