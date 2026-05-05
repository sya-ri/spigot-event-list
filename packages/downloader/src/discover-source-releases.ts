import { Source } from "./sources/sources";
import { loadLegacyPurpurEvents } from "./purpur-patch-events";
import {
  type JavadocLocation,
  resolvePaperJavadoc,
  resolvePurpurLatestJavadoc,
  resolvePurpurJavadoc,
  resolveSpigotJavadoc,
} from "./sources/server-javadoc-resolver";
import {
  paperVersion,
  paperVersions,
  purpurBuildCommit,
  purpurBuildNumber,
  purpurReleaseBuildNumber,
  purpurReleaseVersion,
  purpurVersion,
  purpurVersions,
  spigotVersion,
  spigotVersions,
} from "./sources/source-version";
import EventType from "./types/event-type";
import SourceType from "./types/source-type";

type ReleaseEventSupplementParams = {
  linkBaseBySourceType: Partial<Record<SourceType, string>>;
  mirrorDirectoryBySourceName: Partial<Record<string, string>>;
};

export type ReleaseDiscovery = {
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
  loadSupplementalEvents?: (
    params: ReleaseEventSupplementParams,
  ) => Promise<Record<string, EventType>>;
};

type DiscoverOptions = {
  allVersions: boolean;
  versions: string[];
};

const compareVersions = (left: string, right: string) =>
  left.localeCompare(right, undefined, {
    numeric: true,
    sensitivity: "base",
  });

const compactReleases = (releases: Array<ReleaseDiscovery | null>) =>
  releases.filter((value): value is ReleaseDiscovery => value != null);

const selectVersions = async (
  allVersions: boolean,
  explicitVersions: string[],
  latestVersion: () => Promise<string>,
  allVersionList: () => Promise<string[]>,
) => {
  if (explicitVersions.length > 0) {
    return explicitVersions;
  }
  return allVersions ? await allVersionList() : [await latestVersion()];
};

const discoverLatestResolvable = async (
  versions: string[],
  resolver: (version: string) => Promise<ReleaseDiscovery>,
) => {
  for (const version of [...versions].reverse()) {
    try {
      return [await resolver(version)];
    } catch {}
  }
  return [];
};

const discoverPaperReleases = async (
  options: DiscoverOptions,
): Promise<ReleaseDiscovery[]> => {
  if (!options.allVersions && options.versions.length === 0) {
    return discoverLatestResolvable(await paperVersions(), resolvePaperJavadoc);
  }
  const versions = await selectVersions(
    options.allVersions,
    options.versions,
    paperVersion,
    paperVersions,
  );
  return compactReleases(
    await Promise.all(
      versions.map(async (version): Promise<ReleaseDiscovery | null> => {
        try {
          return await resolvePaperJavadoc(version);
        } catch {
          return null;
        }
      }),
    ),
  );
};

const discoverPurpurReleases = async (
  options: DiscoverOptions,
): Promise<ReleaseDiscovery[]> => {
  if (!options.allVersions && options.versions.length === 0) {
    return [
      await Promise.all([purpurVersion(), purpurReleaseVersion()]).then(
        async ([version, releaseVersion]) =>
          resolvePurpurLatestJavadoc(
            version,
            releaseVersion,
            purpurReleaseBuildNumber(releaseVersion),
          ),
      ),
    ];
  }
  return compactReleases(
    await Promise.all(
      (
        await selectVersions(
          options.allVersions,
          options.versions,
          purpurVersion,
          purpurVersions,
        )
      ).map(async (version): Promise<ReleaseDiscovery | null> => {
        try {
          const buildNumber = await purpurBuildNumber(version);
          return await resolvePurpurJavadoc(version, buildNumber).then(
            withPurpurSupplementalEvents,
          );
        } catch {
          return null;
        }
      }),
    ),
  );
};

const discoverSpigotReleases = async (
  options: DiscoverOptions,
): Promise<ReleaseDiscovery[]> => {
  if (!options.allVersions && options.versions.length === 0) {
    return discoverLatestResolvable(
      await spigotVersions(),
      resolveSpigotJavadoc,
    );
  }
  const versions = await selectVersions(
    options.allVersions,
    options.versions,
    spigotVersion,
    spigotVersions,
  );
  return compactReleases(
    await Promise.all(
      versions.map(async (version): Promise<ReleaseDiscovery | null> => {
        try {
          return await resolveSpigotJavadoc(version);
        } catch {
          return null;
        }
      }),
    ),
  );
};

export const discoverSourceReleases = async (options: DiscoverOptions) => {
  const [paper, purpur, spigot] = await Promise.all([
    discoverPaperReleases(options),
    discoverPurpurReleases(options),
    discoverSpigotReleases(options),
  ]);
  return {
    Paper: paper,
    Purpur: purpur,
    Spigot: spigot,
  };
};

const withPurpurSupplementalEvents = async (
  release: ReleaseDiscovery,
): Promise<ReleaseDiscovery> => {
  if (
    release.sourceName !== "Purpur" ||
    release.buildNumber == null ||
    compareVersions(release.minecraftVersion, "1.16.5") >= 0
  ) {
    return release;
  }
  const buildCommit = await purpurBuildCommit(
    release.minecraftVersion,
    release.buildNumber,
  );
  return {
    ...release,
    loadSupplementalEvents: async ({
      linkBaseBySourceType,
      mirrorDirectoryBySourceName,
    }) => {
      const linkBase = linkBaseBySourceType.purpur;
      const mirrorDirectory = mirrorDirectoryBySourceName.Purpur;
      if (!linkBase || !mirrorDirectory) {
        return {};
      }
      return loadLegacyPurpurEvents({
        buildCommit,
        linkBase,
        mirrorDirectory,
      });
    },
  };
};

export const toSourceFromRelease = (release: ReleaseDiscovery): Source => ({
  location: release.location,
  versionLabel: release.versionLabel,
  javadocUrl: release.javadocUrl,
  downloadUrl: release.downloadPageUrl,
  allClasses: release.allClasses,
  buildNumber: release.buildNumber ?? 0,
  downloadSources: release.downloadSources,
});
