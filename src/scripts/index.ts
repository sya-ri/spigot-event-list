import { writeFile } from "fs/promises";
import axios from "axios";
import EventSource from "./EventSource.js";
import { getLatestEvents } from "./events/events.js";
import { downloadJavadoc } from "./events/javadoc.js";
import { updateVersions } from "./events/versions.js";
import getChangeLog from "./getChangeLog.js";
import getLastSources from "./getLastSources.js";
import { getLastEvents, writeEvents } from "./json/events.js";
import { writeVersions } from "./json/versions.js";

const sources: { [name: string]: EventSource } = {
  Bungee: {
    artifact: {
      groupId: "net.md-5",
      artifactId: "bungeecord-api",
      version: "1.20-R0.1",
      classifier: "javadoc",
      isSnapShot: true,
    },
    repository: "https://oss.sonatype.org/content/repositories/snapshots/",
    allClasses: "allclasses.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["bungee"],
    downloadUrl: "https://ci.md-5.net/job/BungeeCord/lastBuild",
    javadocUrl: "https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get<string>("https://ci.md-5.net/job/BungeeCord/lastBuild/", {
          headers: {
            "Accept-Encoding": "gzip,deflate,compress",
          },
        })
        .then((response) => {
          const body = response.data;
          const match = body.match(
            "<title>BungeeCord (.*) \\[Jenkins\\]</title>",
          );
          if (match) {
            source.version =
              source.artifact.version.split("-")[0] + " - " + match.pop();
          }
        })
        .catch((reason) => console.error(reason)),
  },
  Paper: {
    artifact: {
      groupId: "io.papermc.paper",
      artifactId: "paper-api",
      version: "1.20.2-R0.1",
      classifier: "javadoc",
      isSnapShot: true,
    },
    repository: "https://repo.papermc.io/repository/maven-public/",
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["paper"],
    downloadUrl: "https://papermc.io/downloads/paper",
    javadocUrl: "https://jd.papermc.io/paper/1.20/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://api.papermc.io/v2/projects/paper/versions/1.19.3/")
        .then((response) => {
          const json = response.data;
          source.version =
            source.artifact.version.split("-")[0] + " - #" + json.builds.pop();
        })
        .catch((reason) => console.error(reason)),
  },
  Purpur: {
    artifact: {
      groupId: "org.purpurmc.purpur",
      artifactId: "purpur-api",
      version: "1.20.2-R0.1",
      classifier: "javadoc",
      isSnapShot: true,
    },
    repository: "https://repo.purpurmc.org/snapshots/",
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["purpur"],
    downloadUrl: "https://purpurmc.org/downloads",
    javadocUrl: "https://purpurmc.org/javadoc/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://api.purpurmc.org/v2/purpur/1.20")
        .then((response) => {
          const json = response.data;
          source.version =
            source.artifact.version.split("-")[0] + " - #" + json.builds.latest;
        })
        .catch((reason) => console.error(reason)),
  },
  Spigot: {
    artifact: {
      groupId: "org.spigotmc",
      artifactId: "spigot-api",
      version: "1.20.2-R0.1",
      classifier: "javadoc",
      isSnapShot: true,
    },
    repository:
      "https://hub.spigotmc.org/nexus/content/repositories/snapshots/",
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["bukkit", "spigot"],
    downloadUrl: "",
    javadocUrl: "https://hub.spigotmc.org/javadocs/spigot/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get<string>(
          "https://hub.spigotmc.org/jenkins/job/Spigot-RSS/lastBuild/",
          {
            headers: {
              "Accept-Encoding": "gzip,deflate,compress",
            },
          },
        )
        .then((response) => {
          const body = response.data;
          const match = body.match(
            "<title>Spigot-RSS (.*) \\[Jenkins\\]</title>",
          );
          if (match) {
            source.version =
              source.artifact.version.split("-")[0] + " - " + match.pop();
          }
        })
        .catch((reason) => console.error(reason)),
  },
  Velocity: {
    artifact: {
      groupId: "com.velocitypowered",
      artifactId: "velocity-api",
      version: "", // latest
      classifier: "javadoc",
      isSnapShot: true,
    },
    repository: "https://repo.papermc.io/repository/maven-public/",
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["velocity"],
    downloadUrl: "https://papermc.io/downloads#Velocity",
    javadocUrl: "https://jd.papermc.io/velocity/3.0.0/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://api.papermc.io/v2/projects/velocity/")
        .then((response) => {
          const json = response.data;
          return json.versions.pop();
        })
        .then((latestVersion: string) => {
          source.artifact.version = latestVersion.split("-SNAPSHOT")[0];
          return axios
            .get(
              `https://api.papermc.io/v2/projects/velocity/versions/${latestVersion}/`,
            )
            .then((response) => {
              const json = response.data;
              source.version =
                source.artifact.version + " - #" + json.builds.pop();
            })
            .catch((reason) => console.error(reason));
        })
        .catch((reason) => console.error(reason)),
  },
  Waterfall: {
    artifact: {
      groupId: "io.github.waterfallmc",
      artifactId: "waterfall-api",
      version: "1.20-R0.1",
      classifier: "javadoc",
      isSnapShot: true,
    },
    repository: "https://repo.papermc.io/repository/maven-public/",
    allClasses: "allclasses.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["waterfall"],
    downloadUrl: "https://papermc.io/downloads#Waterfall",
    javadocUrl: "https://jd.papermc.io/waterfall/1.20/",
    updateVersion: (source: EventSource): Promise<void> =>
      axios
        .get("https://api.papermc.io/v2/projects/waterfall/versions/1.19/")
        .then((response) => {
          const json = response.data;
          source.version =
            source.artifact.version.split("-")[0] + " - #" + json.builds.pop();
        })
        .catch((reason) => console.error(reason)),
  },
};

const index = async () => {
  const lastEvents = await getLastEvents();
  const lastSources = await getLastSources(sources);
  const versions = await updateVersions(sources);
  await downloadJavadoc(sources);
  const events = await getLatestEvents(sources, lastEvents);
  await writeEvents(events);
  await writeVersions(versions);
  await writeFile("data/report.md", getChangeLog(lastSources, sources, events));
};

index();