import { writeFile } from "fs/promises";
import EventSource from "./EventSource.js";
import { getLatestEvents } from "./events/events.js";
import { downloadJavadoc } from "./events/javadoc.js";
import getChangeLog from "./getChangeLog.js";
import { getLastEvents, writeEvents } from "./json/events.js";
import { writeVersions } from "./json/versions.js";
import {
  bungeeBuildNumber,
  bungeeVersion,
  paperBuildNumber,
  paperVersion,
  purpurBuildNumber,
  purpurVersion,
  spigotBuildNumber,
  spigotVersion,
  velocityBuildNumber,
  velocityVersion,
  waterfallBuildNumber,
  waterfallVersion,
} from "./sources.js";

const dropPatchVersion = (version: string): string => {
  return version.split(".").slice(0, 2).join(".");
};

const index = async () => {
  const sources: Record<string, EventSource> = {
    Bungee: await bungeeVersion().then(async (version) => ({
      artifact: {
        groupId: "net.md-5",
        artifactId: "bungeecord-api",
        version: version.split("-SNAPSHOT")[0],
        classifier: "javadoc",
        isSnapShot: true,
      },
      repository: "https://oss.sonatype.org/content/repositories/snapshots/",
      allClasses: "allclasses-index.html",
      deprecateList: "deprecated-list.html",
      downloadSources: ["bungee"],
      downloadUrl: "https://ci.md-5.net/job/BungeeCord/lastBuild",
      javadocUrl: "https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/",
      buildNumber: await bungeeBuildNumber(),
    })),
    Paper: await paperVersion().then(async (version) => ({
      artifact: {
        groupId: "io.papermc.paper",
        artifactId: "paper-api",
        version: `${version}-R0.1`,
        classifier: "javadoc",
        isSnapShot: true,
      },
      repository: "https://repo.papermc.io/repository/maven-public/",
      allClasses: "allclasses-index.html",
      deprecateList: "deprecated-list.html",
      downloadSources: ["paper"],
      downloadUrl: "https://papermc.io/downloads/paper",
      javadocUrl: `https://jd.papermc.io/paper/${dropPatchVersion(version)}/`,
      buildNumber: await paperBuildNumber(version),
    })),
    Purpur: await purpurVersion().then(async (version) => ({
      artifact: {
        groupId: "org.purpurmc.purpur",
        artifactId: "purpur-api",
        version: `${version}-R0.1`,
        classifier: "javadoc",
        isSnapShot: true,
      },
      repository: "https://repo.purpurmc.org/snapshots/",
      allClasses: "allclasses-index.html",
      deprecateList: "deprecated-list.html",
      downloadSources: ["purpur"],
      downloadUrl: "https://purpurmc.org/downloads",
      javadocUrl: "https://purpurmc.org/javadoc/",
      buildNumber: await purpurBuildNumber(version),
    })),
    Spigot: await spigotVersion().then(async (version) => ({
      artifact: {
        groupId: "org.spigotmc",
        artifactId: "spigot-api",
        version: `${version}-R0.1`,
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
      buildNumber: await spigotBuildNumber(),
    })),
    Velocity: await velocityVersion().then(async (version) => ({
      artifact: {
        groupId: "com.velocitypowered",
        artifactId: "velocity-api",
        version: version.split("-SNAPSHOT")[0],
        classifier: "javadoc",
        isSnapShot: true,
      },
      repository: "https://repo.papermc.io/repository/maven-public/",
      allClasses: "allclasses-index.html",
      deprecateList: "deprecated-list.html",
      downloadSources: ["velocity"],
      downloadUrl: "https://papermc.io/downloads#Velocity",
      javadocUrl: "https://jd.papermc.io/velocity/3.0.0/",
      buildNumber: await velocityBuildNumber(version),
    })),
    Waterfall: await waterfallVersion().then(async (version) => ({
      artifact: {
        groupId: "io.github.waterfallmc",
        artifactId: "waterfall-api",
        version: `${version}-R0.1`,
        classifier: "javadoc",
        isSnapShot: true,
      },
      repository: "https://repo.papermc.io/repository/maven-public/",
      allClasses: "allclasses-index.html",
      deprecateList: "deprecated-list.html",
      downloadSources: ["waterfall"],
      downloadUrl: "https://papermc.io/downloads#Waterfall",
      javadocUrl: `https://jd.papermc.io/waterfall/${version}/`,
      buildNumber: await waterfallBuildNumber(version),
    })),
  };

  const lastEvents = await getLastEvents();
  await downloadJavadoc(sources);
  const events = await getLatestEvents(sources, lastEvents);
  await writeEvents(events);
  await writeVersions(
    Object.fromEntries(
      Object.entries(sources).map(([name, source]) => [
        name,
        source.artifact.version.split("-")[0] + " - #" + source.buildNumber,
      ]),
    ),
  );
  await writeFile("data/report.md", getChangeLog(events));
};

index();
