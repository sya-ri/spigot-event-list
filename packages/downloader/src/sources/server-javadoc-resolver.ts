import {
  resolveArtifactBuildNumber,
  resolveArtifactUrl,
  resolveLatestArtifactVersion,
  type Artifact,
} from "../maven";
import SourceType from "../types/source-type";

export type JavadocLocation =
  | {
      kind: "artifact";
      artifact: Artifact;
      repository: string;
    }
  | {
      kind: "remote";
      rootUrl: string;
    };

export type ResolvedServerJavadoc = {
  sourceName: "Paper" | "Purpur" | "Spigot";
  minecraftVersion: string;
  versionLabel: string;
  location: JavadocLocation;
  javadocUrl: string;
  downloadPageUrl: string;
  allClasses: string;
  downloadSources: SourceType[];
  buildNumber: number | null;
  resolvedUrl: string;
};

const compareVersions = (left: string, right: string) => {
  const leftParts = left.split(".").map((value) => parseInt(value, 10));
  const rightParts = right.split(".").map((value) => parseInt(value, 10));
  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index++) {
    const diff = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
};

const gteVersion = (left: string, right: string) =>
  compareVersions(left, right) >= 0;

const artifactLocation = (
  artifact: Artifact,
  repository: string,
): JavadocLocation => ({
  kind: "artifact",
  artifact,
  repository,
});

const remoteLocation = (rootUrl: string): JavadocLocation => ({
  kind: "remote",
  rootUrl,
});

const resolveLocationBuildNumber = async (location: JavadocLocation) => {
  if (location.kind !== "artifact") {
    return null;
  }
  return resolveArtifactBuildNumber(location.artifact, location.repository);
};

const resolveLocationUrl = async (location: JavadocLocation) => {
  if (location.kind !== "artifact") {
    return location.rootUrl;
  }
  return resolveArtifactUrl(location.artifact, location.repository);
};

export const createPaperLocation = (version: string): JavadocLocation => {
  if (version === "1.7.10") {
    return artifactLocation(
      {
        groupId: "org.github.paperspigot",
        artifactId: "paperspigot-api",
        version: `${version}-R0.1`,
        classifier: "javadoc",
        isSnapShot: true,
      },
      "https://repo.papermc.io/repository/maven-public/",
    );
  }
  if (gteVersion(version, "1.17")) {
    if (gteVersion(version, "26.1")) {
      return artifactLocation(
        {
          groupId: "io.papermc.paper",
          artifactId: "paper-api",
          version: `${version}.build`,
          classifier: "javadoc",
        },
        "https://repo.papermc.io/repository/maven-public/",
      );
    }
    return artifactLocation(
      {
        groupId: "io.papermc.paper",
        artifactId: "paper-api",
        version: `${version}-R0.1`,
        classifier: "javadoc",
        isSnapShot: true,
      },
      "https://repo.papermc.io/repository/maven-public/",
    );
  }
  return artifactLocation(
    {
      groupId: "com.destroystokyo.paper",
      artifactId: "paper-api",
      version: `${version}-R0.1`,
      classifier: "javadoc",
      isSnapShot: true,
    },
    "https://repo.papermc.io/repository/maven-public/",
  );
};

export const createPurpurLocation = (version: string): JavadocLocation => {
  if (gteVersion(version, "1.16.5")) {
    return artifactLocation(
      {
        groupId: "org.purpurmc.purpur",
        artifactId: "purpur-api",
        version: `${version}-R0.1`,
        classifier: "javadoc",
        isSnapShot: true,
      },
      "https://repo.purpurmc.org/snapshots/",
    );
  }
  return remoteLocation(
    `https://repo.purpurmc.org/javadoc/snapshots/org/purpurmc/purpur/purpur-api/${version}-R0.1-SNAPSHOT/.cache/unpack/`,
  );
};

export const createPurpurReleaseLocation = (version: string): JavadocLocation =>
  artifactLocation(
    {
      groupId: "org.purpurmc.purpur",
      artifactId: "purpur-api",
      version,
      classifier: "javadoc",
    },
    "https://repo.purpurmc.org/snapshots/",
  );

export const createSpigotLocation = (version: string): JavadocLocation =>
  artifactLocation(
    {
      groupId: "org.spigotmc",
      artifactId: "spigot-api",
      version: `${version}-R0.1`,
      classifier: "javadoc",
      isSnapShot: true,
    },
    "https://hub.spigotmc.org/nexus/content/repositories/snapshots/",
  );

export const resolvePaperJavadoc = async (
  version: string,
): Promise<ResolvedServerJavadoc> => {
  const location = await (async (): Promise<JavadocLocation> => {
    if (gteVersion(version, "26.1")) {
      const repository = "https://repo.papermc.io/repository/maven-public/";
      const resolvedVersion = await resolveLatestArtifactVersion(
        {
          groupId: "io.papermc.paper",
          artifactId: "paper-api",
        },
        repository,
        `${version}.build.`,
      );
      return artifactLocation(
        {
          groupId: "io.papermc.paper",
          artifactId: "paper-api",
          version: resolvedVersion,
          classifier: "javadoc",
        },
        repository,
      );
    }
    return createPaperLocation(version);
  })();
  const [resolvedUrl, buildNumber] = await Promise.all([
    resolveLocationUrl(location),
    resolveLocationBuildNumber(location),
  ]);
  return {
    sourceName: "Paper",
    minecraftVersion: version,
    versionLabel: version,
    location,
    javadocUrl: `https://jd.papermc.io/paper/${version}/`,
    downloadPageUrl: "https://papermc.io/downloads/paper",
    allClasses: "allclasses-index.html",
    downloadSources: ["paper"],
    buildNumber,
    resolvedUrl,
  };
};

export const resolvePurpurJavadoc = async (
  version: string,
  buildNumber: number,
): Promise<ResolvedServerJavadoc> => {
  const location = await (async (): Promise<JavadocLocation> => {
    if (gteVersion(version, "26.1.2")) {
      const repository = "https://repo.purpurmc.org/snapshots/";
      const resolvedVersion = await resolveLatestArtifactVersion(
        {
          groupId: "org.purpurmc.purpur",
          artifactId: "purpur-api",
        },
        repository,
        `${version}.build.`,
      );
      return createPurpurReleaseLocation(resolvedVersion);
    }
    return createPurpurLocation(version);
  })();
  const resolvedUrl = await resolveLocationUrl(location);
  return {
    sourceName: "Purpur",
    minecraftVersion: version,
    versionLabel: version,
    location,
    javadocUrl:
      location.kind === "remote"
        ? location.rootUrl
        : "https://purpurmc.org/javadoc/",
    downloadPageUrl: `https://purpurmc.org/download/purpur/${version}`,
    allClasses: "allclasses-index.html",
    downloadSources: ["purpur"],
    buildNumber,
    resolvedUrl,
  };
};

export const resolvePurpurLatestJavadoc = async (
  minecraftVersion: string,
  releaseVersion: string,
  buildNumber: number,
): Promise<ResolvedServerJavadoc> => {
  const location = createPurpurReleaseLocation(releaseVersion);
  const resolvedUrl = await resolveLocationUrl(location);
  return {
    sourceName: "Purpur",
    minecraftVersion,
    versionLabel: releaseVersion.replace(/\.build\.\d+-stable$/, ""),
    location,
    javadocUrl: "https://purpurmc.org/javadoc/",
    downloadPageUrl: `https://purpurmc.org/download/purpur/${minecraftVersion}`,
    allClasses: "allclasses-index.html",
    downloadSources: ["purpur"],
    buildNumber,
    resolvedUrl,
  };
};

export const resolveSpigotJavadoc = async (
  version: string,
): Promise<ResolvedServerJavadoc> => {
  const location = createSpigotLocation(version);
  const [resolvedUrl, buildNumber] = await Promise.all([
    resolveLocationUrl(location),
    resolveLocationBuildNumber(location),
  ]);
  return {
    sourceName: "Spigot",
    minecraftVersion: version,
    versionLabel: version,
    location,
    javadocUrl: "https://hub.spigotmc.org/javadocs/spigot/",
    downloadPageUrl:
      "https://hub.spigotmc.org/nexus/service/rest/repository/browse/public/org/spigotmc/spigot-api/",
    allClasses: "allclasses-index.html",
    downloadSources: ["spigot"],
    buildNumber,
    resolvedUrl,
  };
};
