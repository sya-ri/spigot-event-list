import axios from "axios";
import { load } from "cheerio";

const PAPERMC_HEADERS = {
  headers: {
    "User-Agent":
      "spigot-event-list-downloader/0.1.0 (https://github.com/sya-ri/spigot-event-list)",
  },
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

const stableMinecraftVersion = (value: string) =>
  /^\d+(\.\d+){1,2}$/.test(value);

const sortVersionsAsc = (versions: string[]) =>
  [...versions].sort((left, right) => compareVersions(left, right));

const fetchVersionFromPom = async (url: string): Promise<string> => {
  const response = await axios.get<string>(url);
  const $ = load(response.data);
  return $("version").first().text();
};

type JenkinsApi = {
  id: string;
};

const fetchBuildNumberFromJenkins = async (url: string): Promise<number> => {
  const response = await axios.get<JenkinsApi>(url);
  const json = response.data;
  return parseInt(json.id);
};

type PaperApiVersion = {
  project_id: string;
  project_name: string;
  version: string;
  builds: number[];
};

type PaperApiVersions = {
  project_id: string;
  project_name: string;
  version_groups: string[];
  versions: Record<string, string[]>;
};

const fetchVersionFromPaperApi = async (name: string): Promise<string> => {
  const response = await axios.get<PaperApiVersions>(
    `https://fill.papermc.io/v3/projects/${name}`,
    PAPERMC_HEADERS,
  );
  const json = response.data;
  return (
    sortVersionsAsc(
      Object.values(json.versions).flat().filter(stableMinecraftVersion),
    ).pop() ?? ""
  );
};

const fetchBuildNumberFromPaperApi = async (
  name: string,
  version: string,
): Promise<number> => {
  const response = await axios.get<PaperApiVersion>(
    `https://fill.papermc.io/v3/projects/${name}/versions/${version}`,
    PAPERMC_HEADERS,
  );
  const json = response.data;
  return json.builds.shift() ?? 0;
};

const fetchVersionsFromPaperApi = async (name: string): Promise<string[]> => {
  const response = await axios.get<PaperApiVersions>(
    `https://fill.papermc.io/v3/projects/${name}`,
    PAPERMC_HEADERS,
  );
  return sortVersionsAsc(
    Object.values(response.data.versions).flat().filter(stableMinecraftVersion),
  );
};

type PurpurApiVersions = {
  project: string;
  versions: string[];
};

type PurpurApiVersion = {
  project: string;
  version: string;
  builds: {
    latest: string;
    all: string[];
  };
};

const fetchVersionFromPurpurApi = async (name: string): Promise<string> => {
  const response = await axios.get<PurpurApiVersions>(
    `https://api.purpurmc.org/v2/${name}/`,
  );
  const json = response.data;
  return (
    sortVersionsAsc(json.versions.filter(stableMinecraftVersion)).pop() ?? ""
  );
};

const fetchBuildNumberFromPurpurApi = async (
  name: string,
  version: string,
): Promise<number> => {
  const response = await axios.get<PurpurApiVersion>(
    `https://api.purpurmc.org/v2/${name}/${version}/`,
  );
  const json = response.data;
  return parseInt(json.builds.all.pop() ?? "0");
};

const fetchVersionsFromPurpurApi = async (name: string): Promise<string[]> => {
  const response = await axios.get<PurpurApiVersions>(
    `https://api.purpurmc.org/v2/${name}/`,
  );
  return sortVersionsAsc(response.data.versions.filter(stableMinecraftVersion));
};

const fetchSpigotVersions = async (): Promise<string[]> => {
  const response = await axios.get<string>(
    "https://hub.spigotmc.org/nexus/content/repositories/snapshots/org/spigotmc/spigot-api/maven-metadata.xml",
  );
  const matches = response.data.match(/<version>([^<]+)<\/version>/g) ?? [];
  return sortVersionsAsc(
    matches
      .map((value) => value.replace("</version>", "").replace("<version>", ""))
      .filter((value) => value.endsWith("-R0.1-SNAPSHOT"))
      .map((value) => value.replace(/-R0\.1-SNAPSHOT$/, ""))
      .filter(stableMinecraftVersion),
  );
};

const fetchVersionsFromMavenMetadata = async (
  url: string,
  predicate: (version: string) => boolean,
) => {
  const response = await axios.get<string>(url);
  const matches = response.data.match(/<version>([^<]+)<\/version>/g) ?? [];
  return Array.from(
    new Set(
      matches
        .map((value) =>
          value.replace("</version>", "").replace("<version>", ""),
        )
        .filter(predicate),
    ),
  ).sort((left, right) =>
    left.localeCompare(right, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
};

export const bungeeVersion = async () => {
  return fetchVersionFromPom(
    "https://github.com/SpigotMC/BungeeCord/raw/master/pom.xml",
  );
};

export const bungeeBuildNumber = async () => {
  return fetchBuildNumberFromJenkins(
    "https://ci.md-5.net/job/BungeeCord/lastBuild/api/json/",
  );
};

export const bungeeVersions = async () =>
  fetchVersionsFromMavenMetadata(
    "https://repo1.maven.org/maven2/net/md-5/bungeecord-api/maven-metadata.xml",
    (value) => !value.includes("-SNAPSHOT"),
  );

type SpigotBuildData = {
  minecraftVersion: string;
  spigotVersion: string;
};

export const spigotVersion = async (): Promise<string> => {
  const response = await axios.get<SpigotBuildData>(
    "https://hub.spigotmc.org/stash/projects/SPIGOT/repos/builddata/raw/info.json",
  );
  return response.data.minecraftVersion;
};

export const paperVersion = async () => {
  return fetchVersionFromPaperApi("paper");
};

export const paperVersions = async () => {
  return fetchVersionsFromPaperApi("paper");
};

export const paperBuildNumber = async (version: string) => {
  return fetchBuildNumberFromPaperApi("paper", version);
};

export const purpurVersion = async () => {
  return fetchVersionFromPurpurApi("purpur");
};

export const purpurVersions = async () => {
  return fetchVersionsFromPurpurApi("purpur");
};

export const purpurBuildNumber = async (version: string) => {
  return fetchBuildNumberFromPurpurApi("purpur", version);
};

export const spigotBuildNumber = async () => {
  return fetchBuildNumberFromJenkins(
    "https://hub.spigotmc.org/jenkins/job/Spigot-RSS/lastBuild/api/json/",
  );
};

export const spigotVersions = async () => {
  return fetchSpigotVersions();
};

export const velocityVersion = async () => {
  return fetchVersionFromPaperApi("velocity");
};

export const velocityBuildNumber = async (version: string) => {
  return fetchBuildNumberFromPaperApi("velocity", version);
};

export const velocityVersions = async () =>
  fetchVersionsFromMavenMetadata(
    "https://repo.papermc.io/repository/maven-public/com/velocitypowered/velocity-api/maven-metadata.xml",
    (value) => !value.includes("-SNAPSHOT"),
  );
