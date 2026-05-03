import {
  discoverSourceReleases,
  ReleaseDiscovery,
  toSourceFromRelease,
} from "./discover-source-releases";
import { getSources } from "./sources/sources";
import { mkdir, readFile, writeFile } from "fs/promises";
import downloadLatestEvents from "./download-latest-events";
import EventType from "./types/event-type";
import { Source } from "./sources/sources";
import path from "path";
import {
  createDataPaths,
  hasCompleteServerSources,
} from "../../../src/libs/data-paths";
import { fillMissingDescriptionsInData } from "./fill-missing-descriptions";

const PROXY_SOURCE_NAMES = ["Bungee", "Velocity"] as const;
const PROXY_EVENT_SOURCES = ["bungee", "velocity"] as const;
const { latestDataPath, minecraftVersionDataPath, proxyDataPath } =
  createDataPaths(path.resolve(process.cwd(), "../../data"));

const parseOptions = (argv: string[]) => {
  const versions: string[] = [];
  for (let index = 0; index < argv.length; index++) {
    if (argv[index] === "--version") {
      const version = argv[index + 1];
      if (!version || version.startsWith("--")) {
        throw new Error("--version requires a value");
      }
      versions.push(version);
      index += 1;
    }
  }
  const uniqueVersions = Array.from(new Set(versions));
  const allVersions = argv.includes("--all");
  if (allVersions && uniqueVersions.length > 0) {
    throw new Error("--all and --version cannot be used together");
  }
  return {
    allVersions,
    versions: uniqueVersions,
  };
};

const index = async () => {
  const options = parseOptions(process.argv.slice(2));
  const discoveredReleases = await discoverSourceReleases(options);
  printDiscoveredReleases(discoveredReleases);
  if (options.allVersions) {
    await downloadCompleteServerVersions(discoveredReleases);
  } else if (options.versions.length > 0) {
    await downloadSelectedServerVersions(discoveredReleases);
  }
  if (options.versions.length === 0) {
    const latestServer = await downloadLatestServerSnapshot(discoveredReleases);
    const sources = await getSources();
    const proxySources = pickSources(sources, PROXY_SOURCE_NAMES);
    const [lang, events] = await downloadLatestEvents(proxySources);
    await writeProxyEvents(lang, filterEvents(events, PROXY_EVENT_SOURCES));
    await writeProxyVersions(proxySources);
    await writeLatestEvents(latestServer?.lang ?? lang, {
      ...(latestServer?.events ?? {}),
      ...filterEvents(events, PROXY_EVENT_SOURCES),
    });
    await writeLatestVersions({
      ...(latestServer?.versions ?? {}),
      ...toLatestVersionMap(proxySources),
    });
  }
  await fillMissingDescriptionsInData(
    path.resolve(process.cwd(), "../../data"),
  );
};

const downloadCompleteServerVersions = async (
  releases: Awaited<ReturnType<typeof discoverSourceReleases>>,
) => {
  const releasesByVersion = groupCompleteReleasesByMinecraftVersion(releases);
  for (const [version, versionReleases] of Array.from(
    releasesByVersion.entries(),
  )) {
    await downloadVersionedServerEvents(version, versionReleases);
  }
};

const downloadSelectedServerVersions = async (
  releases: Awaited<ReturnType<typeof discoverSourceReleases>>,
) => {
  const releasesByVersion = groupReleasesByMinecraftVersion(releases);
  for (const [version, versionReleases] of Array.from(
    releasesByVersion.entries(),
  )) {
    await downloadVersionedServerEvents(version, versionReleases);
  }
};

const downloadVersionedServerEvents = async (
  version: string,
  versionReleases: ReleaseDiscovery[],
) => {
  console.info(`Download historical server events: ${version}`);
  const sources: Record<string, Source> = Object.fromEntries(
    versionReleases.map((release: ReleaseDiscovery) => [
      release.sourceName,
      toSourceFromRelease(release),
    ]),
  );
  const [lang, events] = await downloadLatestEvents(sources);
  await writeEvents(
    version,
    lang,
    await mergeExistingVersionEvents(version, events),
  );
  await writeVersions(version, toVersionMapFromReleases(versionReleases));
};

const mergeExistingVersionEvents = async (
  version: string,
  events: Record<string, EventType>,
) => {
  const existing = await readExistingVersionEvents(version);
  if (existing == null) {
    return events;
  }
  return Object.fromEntries(
    Object.entries(events).map(([key, event]) => {
      const previous = existing[key];
      if (!previous) {
        return [key, event];
      }
      return [
        key,
        {
          ...event,
          description: {
            ja: normalizeText(event.description.ja) || previous.description.ja,
            en: normalizeText(event.description.en) || previous.description.en,
          },
          deprecateDescription: event.deprecate
            ? {
                ja:
                  normalizeText(event.deprecateDescription?.ja) ||
                  previous.deprecateDescription?.ja ||
                  "",
                en:
                  normalizeText(event.deprecateDescription?.en) ||
                  previous.deprecateDescription?.en ||
                  "",
              }
            : undefined,
        } satisfies EventType,
      ];
    }),
  );
};

const readExistingVersionEvents = async (version: string) => {
  const text = await readFile(
    minecraftVersionDataPath(version, "events.json"),
    "utf8",
  ).catch(() => null);
  if (text == null) {
    return null;
  }
  const data = JSON.parse(text) as { events: EventType[] };
  return Object.fromEntries(
    data.events.map((event) => [event.name + event.source, event]),
  );
};

const normalizeText = (value: string | undefined) =>
  (value ?? "").replace(/\s+/g, " ").trim();

const downloadLatestServerSnapshot = async (
  releases: Awaited<ReturnType<typeof discoverSourceReleases>>,
) => {
  const latestReleases = Object.values(releases)
    .map((sourceReleases) => sourceReleases[sourceReleases.length - 1])
    .filter((release): release is ReleaseDiscovery => release != null);
  if (latestReleases.length === 0) {
    return null;
  }
  console.info("Download latest server events");
  const sources: Record<string, Source> = Object.fromEntries(
    latestReleases.map((release: ReleaseDiscovery) => [
      release.sourceName,
      toSourceFromRelease(release),
    ]),
  );
  const [lang, events] = await downloadLatestEvents(sources);
  return {
    lang,
    events,
    versions: toLatestVersionMap(sources),
  };
};

const printDiscoveredReleases = (
  releases: Awaited<ReturnType<typeof discoverSourceReleases>>,
) => {
  Object.entries(releases).forEach(([name, sourceReleases]) => {
    const first = sourceReleases[0];
    const last = sourceReleases[sourceReleases.length - 1];
    if (!first || !last) {
      return;
    }
    console.info(
      [
        `${name}: ${sourceReleases.length} version(s)`,
        `range=${first.minecraftVersion}..${last.minecraftVersion}`,
        `latestSource=${last.resolvedUrl}`,
      ].join(" | "),
    );
  });
};

const writeEvents = (
  version: string,
  lang: string[],
  sources: Record<string, EventType>,
) => {
  const events = normalizeEvents(sources);
  return writeVersionedJson(
    version,
    "events.json",
    JSON.stringify(
      {
        lang,
        events,
      },
      null,
      2,
    ),
  );
};

const writeVersions = (version: string, versions: Record<string, string>) =>
  writeVersionedJson(
    version,
    "versions.json",
    JSON.stringify(versions, null, 2),
  );

const writeLatestEvents = (
  lang: string[],
  sources: Record<string, EventType>,
) =>
  writeFile(
    latestDataPath("events.json"),
    JSON.stringify(
      {
        lang,
        events: normalizeEvents(sources),
      },
      null,
      2,
    ),
  );

const writeLatestVersions = (versions: Record<string, string>) =>
  writeFile(latestDataPath("versions.json"), JSON.stringify(versions, null, 2));

const writeProxyEvents = async (
  lang: string[],
  sources: Record<string, EventType>,
) => {
  await mkdir(proxyDataPath(""), { recursive: true });
  return writeFile(
    proxyDataPath("events.json"),
    JSON.stringify(
      {
        lang,
        events: normalizeEvents(sources),
      },
      null,
      2,
    ),
  );
};

const writeProxyVersions = async (versions: Record<string, Source>) => {
  await mkdir(proxyDataPath(""), { recursive: true });
  return writeFile(
    proxyDataPath("versions.json"),
    JSON.stringify(toLatestVersionMap(versions), null, 2),
  );
};

const writeVersionedJson = async (
  version: string,
  filename: string,
  body: string,
) => {
  await mkdir(minecraftVersionDataPath(version), { recursive: true });
  return writeFile(minecraftVersionDataPath(version, filename), body);
};

const normalizeEvents = (sources: Record<string, EventType>) =>
  Object.values(sources)
    .sort((a, b) => (a.name + a.source).localeCompare(b.name + b.source))
    .map(
      (value): EventType => ({
        deprecate: value.deprecate,
        deprecateDescription: value.deprecate
          ? value.deprecateDescription
          : undefined,
        description: value.description,
        abstract: value.abstract,
        href: value.href,
        javadoc: value.javadoc?.replace(/\n/g, "")?.replace(/\s+/g, " "),
        link: value.link,
        name: value.name,
        source: value.source,
      }),
    );

const toLatestVersionMap = (sources: Record<string, Source>) =>
  Object.fromEntries(
    Object.entries(sources).map(([name, source]) => [
      name,
      source.buildNumber == null
        ? source.versionLabel
        : `${source.versionLabel} - #${source.buildNumber}`,
    ]),
  );

const pickSources = (
  sources: Record<string, Source>,
  names: readonly string[],
): Record<string, Source> =>
  Object.fromEntries(
    names.filter((name) => sources[name]).map((name) => [name, sources[name]]),
  );

const filterEvents = (
  events: Record<string, EventType>,
  sourceTypes: readonly string[],
) =>
  Object.fromEntries(
    Object.entries(events).filter(([, event]) =>
      sourceTypes.includes(event.source),
    ),
  );

const groupReleasesByMinecraftVersion = (
  releases: Awaited<ReturnType<typeof discoverSourceReleases>>,
) => {
  const versions = new Map<string, ReleaseDiscovery[]>();
  Object.values(releases)
    .flat()
    .sort(compareMinecraftVersionsAsc)
    .forEach((release) => {
      const current = versions.get(release.minecraftVersion) ?? [];
      current.push(release);
      versions.set(release.minecraftVersion, current);
    });
  return versions;
};

const groupCompleteReleasesByMinecraftVersion = (
  releases: Awaited<ReturnType<typeof discoverSourceReleases>>,
) => {
  const grouped = groupReleasesByMinecraftVersion(releases);
  return new Map(
    Array.from(grouped.entries()).filter(([version, versionReleases]) =>
      hasCompleteServerSources(
        version,
        Object.fromEntries(
          versionReleases.map((release) => [release.sourceName, "present"]),
        ),
      ),
    ),
  );
};

const compareMinecraftVersionsAsc = (
  left: ReleaseDiscovery,
  right: ReleaseDiscovery,
) => compareVersionStrings(left.minecraftVersion, right.minecraftVersion);

const compareVersionStrings = (left: string, right: string) => {
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

const toVersionMapFromReleases = (releases: ReleaseDiscovery[]) =>
  Object.fromEntries(
    releases.map((release) => [
      release.sourceName,
      release.buildNumber == null ? "" : `#${release.buildNumber}`,
    ]),
  );

index();
