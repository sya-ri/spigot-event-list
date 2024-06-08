import { Artifact } from "../maven";
import SourceType from "../types/source-type";
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
} from "./source-version";

export type Source = {
  artifact: Artifact;
  repository: string;
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  buildNumber: number;
  downloadSources: SourceType[];
};

export const getSources = async (): Promise<Record<string, Source>> => ({
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
    downloadSources: ["paper"],
    downloadUrl: "https://papermc.io/downloads/paper",
    javadocUrl: `https://jd.papermc.io/paper/${version}/`,
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
    downloadSources: ["spigot"],
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
    downloadSources: ["waterfall"],
    downloadUrl: "https://papermc.io/downloads#Waterfall",
    javadocUrl: `https://jd.papermc.io/waterfall/${version}/`,
    buildNumber: await waterfallBuildNumber(version),
  })),
});

export const getSourceType = (href: string): SourceType | null => {
  if (href.startsWith("org/bukkit")) {
    return "spigot";
  } else if (href.startsWith("org/spigotmc")) {
    return "spigot";
  } else if (href.startsWith("com/destroystokyo/paper")) {
    return "paper";
  } else if (href.startsWith("io/papermc/paper")) {
    return "paper";
  } else if (href.startsWith("org/purpurmc/purpur")) {
    return "purpur";
  } else if (href.startsWith("net/md_5/bungee/api")) {
    return "bungee";
  } else if (href.startsWith("io/github/waterfallmc/waterfall")) {
    return "waterfall";
  } else if (href.startsWith("com/velocitypowered")) {
    return "velocity";
  } else {
    return null;
  }
};

const dropPatchVersion = (version: string): string => {
  return version.split(".").slice(0, 2).join(".");
};
