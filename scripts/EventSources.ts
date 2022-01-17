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
    downloadUrl: "https://papermc.io/downloads#Paper-1.18",
    javadocUrl: "https://papermc.io/javadocs/paper/1.18/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://papermc.io/api/v2/projects/paper/versions/1.18.1/")
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
    downloadUrl: "https://purpurmc.org/downloads?v=1.18.1",
    javadocUrl: "https://purpurmc.org/javadoc/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://api.purpurmc.org/v2/purpur/1.18.1")
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
          "https://hub.spigotmc.org/jenkins/job/Spigot-RSS/lastBuild/"
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
  Velocity: {
    allClasses: "allclasses.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["velocity"],
    downloadUrl: "https://velocitypowered.com/downloads",
    javadocUrl: "https://jd.velocitypowered.com/3.0.0/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://papermc.io/api/v2/projects/velocity/")
        .then((response) => {
          const json = response.data;
          return json.versions.pop();
        })
        .then((latestVersion) =>
          axios
            .get(
              `https://papermc.io/api/v2/projects/velocity/versions/${latestVersion}/`
            )
            .then((response) => {
              const json = response.data;
              source.version = "#" + json.builds.pop();
            })
            .catch((reason) => console.error(reason))
        )
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
