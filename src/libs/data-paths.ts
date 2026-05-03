import { readdir, readFile } from "fs/promises";
import path from "path";
import EventType from "../../packages/downloader/src/types/event-type";

const SERVER_SOURCES = ["spigot", "paper", "purpur"] as const;
const SERVER_VERSION_SOURCES = ["Spigot", "Paper", "Purpur"] as const;

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

const stableMinecraftVersion = (value: string) =>
  /^\d+(\.\d+){1,2}$/.test(value);

export const createDataPaths = (rootPath: string) => {
  const dataPath = (...parts: string[]) => path.join(rootPath, ...parts);
  const minecraftDataPath = (...parts: string[]) =>
    path.join(rootPath, "minecraft", ...parts);

  const getServerVersionsDesc = async () =>
    (await readdir(minecraftDataPath(""), { withFileTypes: true }))
      .filter(
        (entry) => entry.isDirectory() && stableMinecraftVersion(entry.name),
      )
      .map((entry) => entry.name)
      .sort((left, right) => compareVersions(right, left));

  const readServerEvents = async (version: string) => {
    const text = await readFile(
      minecraftDataPath(version, "events.json"),
      "utf8",
    );
    return JSON.parse(text) as {
      lang: string[];
      events: EventType[];
    };
  };

  const readServerVersions = async (version: string) => {
    const text = await readFile(
      minecraftDataPath(version, "versions.json"),
      "utf8",
    );
    return JSON.parse(text) as Record<string, string>;
  };

  const hasCompleteServerSources = (versions: Record<string, string>) =>
    SERVER_VERSION_SOURCES.every((source) => source in versions);

  const getLatestServerVersion = async () => {
    const versions = await getServerVersionsDesc();
    const supported: string[] = [];
    for (const version of versions) {
      try {
        const versionMap = await readServerVersions(version);
        if (hasCompleteServerSources(versionMap)) {
          supported.push(version);
        }
      } catch {}
    }
    const latestVersion = supported.sort(compareVersions).pop();
    if (!latestVersion) {
      throw new Error("No complete server version directories found in data/");
    }
    return latestVersion;
  };

  const readLatestServerEvents = async (): Promise<{
    lang: string[];
    events: EventType[];
  }> => {
    try {
      const text = await readFile(dataPath("events.json"), "utf8");
      return JSON.parse(text) as {
        lang: string[];
        events: EventType[];
      };
    } catch {}
    const coveredSources = new Set<string>();
    const events: EventType[] = [];
    let lang: string[] | null = null;
    for (const version of await getServerVersionsDesc()) {
      const data = await readServerEvents(version);
      if (!lang) {
        lang = data.lang;
      }
      for (const source of SERVER_SOURCES) {
        if (coveredSources.has(source)) {
          continue;
        }
        const sourceEvents = data.events.filter(
          (event) => event.source === source,
        );
        if (sourceEvents.length > 0) {
          coveredSources.add(source);
          events.push(...sourceEvents);
        }
      }
      if (SERVER_SOURCES.every((source) => coveredSources.has(source))) {
        break;
      }
    }
    if (!lang) {
      throw new Error("No server events found in data/");
    }
    return { lang, events };
  };

  const readProxyEvents = async () => {
    const text = await readFile(dataPath("proxy", "events.json"), "utf8");
    return JSON.parse(text) as {
      lang: string[];
      events: EventType[];
    };
  };

  const readLatestServerVersions = async () => {
    const text = await readFile(dataPath("versions.json"), "utf8");
    return JSON.parse(text) as Record<string, string>;
  };

  const proxyDataPath = (...parts: string[]) => dataPath("proxy", ...parts);
  const minecraftVersionDataPath = (...parts: string[]) =>
    minecraftDataPath(...parts);
  const latestDataPath = (...parts: string[]) => dataPath(...parts);

  return {
    getLatestServerVersion,
    getServerVersionsDesc: async () => {
      const versions = await getServerVersionsDesc();
      const supported: string[] = [];
      for (const version of versions) {
        try {
          const versionMap = await readServerVersions(version);
          if (hasCompleteServerSources(versionMap)) {
            supported.push(version);
          }
        } catch {}
      }
      return supported;
    },
    readServerEvents,
    readServerVersions,
    readLatestServerEvents,
    readLatestServerVersions,
    readProxyEvents,
    proxyDataPath,
    minecraftVersionDataPath,
    latestDataPath,
  };
};

const appDataPaths = createDataPaths(path.join(process.cwd(), "data"));

export const getLatestServerVersion = appDataPaths.getLatestServerVersion;
export const getServerVersionsDesc = appDataPaths.getServerVersionsDesc;
export const readServerEvents = appDataPaths.readServerEvents;
export const readServerVersions = appDataPaths.readServerVersions;
export const readLatestServerEvents = appDataPaths.readLatestServerEvents;
export const readLatestServerVersions = appDataPaths.readLatestServerVersions;
export const readProxyEvents = appDataPaths.readProxyEvents;
