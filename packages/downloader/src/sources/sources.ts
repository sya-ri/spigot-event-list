import SourceType from "../types/source-type";
import {
  createPaperLocation,
  createPurpurReleaseLocation,
  createSpigotLocation,
  type JavadocLocation,
} from "./server-javadoc-resolver";
import {
  bungeeBuildNumber,
  bungeeVersion,
  paperBuildNumber,
  paperVersion,
  purpurReleaseBuildNumber,
  purpurReleaseVersion,
  purpurVersion,
  spigotBuildNumber,
  spigotVersion,
  velocityBuildNumber,
  velocityVersion,
} from "./source-version";

const normalizeBungeeVersionLabel = (version: string) =>
  version.replace(/-R0\.\d+$/, "");
const normalizePurpurVersionLabel = (version: string) =>
  version.replace(/\.build\.\d+-stable$/, "");

export type Source = {
  location: JavadocLocation;
  versionLabel: string;
  javadocUrl: string;
  downloadUrl: string;
  allClasses: string;
  buildNumber: number | null;
  downloadSources: SourceType[];
};

export const getSources = async (): Promise<Record<string, Source>> => ({
  Bungee: await bungeeVersion().then(async (version) => ({
    location: {
      kind: "artifact",
      artifact: {
        groupId: "net.md-5",
        artifactId: "bungeecord-api",
        version: version.split("-SNAPSHOT")[0],
        classifier: "javadoc",
        isSnapShot: true,
      },
      repository: "https://central.sonatype.com/repository/maven-snapshots/",
    },
    versionLabel: normalizeBungeeVersionLabel(version.split("-SNAPSHOT")[0]),
    allClasses: "allclasses-index.html",
    downloadSources: ["bungee"],
    downloadUrl: "https://ci.md-5.net/job/BungeeCord/lastBuild",
    javadocUrl: "https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/",
    buildNumber: await bungeeBuildNumber(),
  })),
  Paper: await paperVersion().then(async (version) => ({
    location: createPaperLocation(version),
    versionLabel: version,
    allClasses: "allclasses-index.html",
    downloadSources: ["paper"],
    downloadUrl: "https://papermc.io/downloads/paper",
    javadocUrl: `https://jd.papermc.io/paper/${version}/`,
    buildNumber: await paperBuildNumber(version),
  })),
  Purpur: await Promise.all([purpurVersion(), purpurReleaseVersion()]).then(
    async ([minecraftVersion, releaseVersion]) => ({
      location: createPurpurReleaseLocation(releaseVersion),
      versionLabel: normalizePurpurVersionLabel(releaseVersion),
      allClasses: "allclasses-index.html",
      downloadSources: ["purpur"],
      downloadUrl: `https://purpurmc.org/download/purpur/${minecraftVersion}`,
      javadocUrl: "https://purpurmc.org/javadoc/",
      buildNumber: purpurReleaseBuildNumber(releaseVersion),
    }),
  ),
  Spigot: await spigotVersion().then(async (version) => ({
    location: createSpigotLocation(version),
    versionLabel: version,
    allClasses: "allclasses-index.html",
    downloadSources: ["spigot"],
    downloadUrl: "",
    javadocUrl: "https://hub.spigotmc.org/javadocs/spigot/",
    buildNumber: await spigotBuildNumber(),
  })),
  Velocity: await velocityVersion().then(async (version) => ({
    location: {
      kind: "artifact",
      artifact: {
        groupId: "com.velocitypowered",
        artifactId: "velocity-api",
        version: version.split("-SNAPSHOT")[0],
        classifier: "javadoc",
        isSnapShot: true,
      },
      repository: "https://repo.papermc.io/repository/maven-public/",
    },
    versionLabel: version,
    allClasses: "allclasses-index.html",
    downloadSources: ["velocity"],
    downloadUrl: "https://papermc.io/downloads/velocity",
    javadocUrl: `https://jd.papermc.io/velocity/${version}/`,
    buildNumber: await velocityBuildNumber(version),
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
  } else if (href.startsWith("com/velocitypowered")) {
    return "velocity";
  } else {
    return null;
  }
};
