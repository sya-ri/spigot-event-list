import axios from "axios";

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
  versions: string[];
};

const fetchVersionFromPaperApi = async (name: string): Promise<string> => {
  const response = await axios.get<PaperApiVersions>(
    `https://api.papermc.io/v2/projects/${name}/`,
  );
  const json = response.data;
  return json.versions.pop();
};

const fetchBuildNumberFromPaperApi = async (
  name: string,
  version: string,
): Promise<number> => {
  const response = await axios.get<PaperApiVersion>(
    `https://api.papermc.io/v2/projects/${name}/versions/${version}/`,
  );
  const json = response.data;
  return json.builds.pop();
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
  return json.versions.pop();
};

const fetchBuildNumberFromPurpurApi = async (
  name: string,
  version: string,
): Promise<number> => {
  const response = await axios.get<PurpurApiVersion>(
    `https://api.purpurmc.org/v2/${name}/${version}/`,
  );
  const json = response.data;
  return parseInt(json.builds.latest);
};

export const bungeeBuildNumber = async () => {
  return fetchBuildNumberFromJenkins(
    "https://ci.md-5.net/job/BungeeCord/lastBuild/api/json/",
  );
};

export const paperVersion = async () => {
  return fetchVersionFromPaperApi("paper");
};

export const paperBuildNumber = async (version: string) => {
  return fetchBuildNumberFromPaperApi("paper", version);
};

export const purpurVersion = async () => {
  return fetchVersionFromPurpurApi("purpur");
};

export const purpurBuildNumber = async (version: string) => {
  return fetchBuildNumberFromPurpurApi("purpur", version);
};

export const spigotBuildNumber = async () => {
  return fetchBuildNumberFromJenkins(
    "https://hub.spigotmc.org/jenkins/job/Spigot-RSS/lastBuild/api/json/",
  );
};

export const velocityVersion = async () => {
  return fetchVersionFromPaperApi("velocity");
};

export const velocityBuildNumber = async (version: string) => {
  return fetchBuildNumberFromPaperApi("velocity", version);
};

export const waterfallVersion = async () => {
  return fetchVersionFromPaperApi("waterfall");
};

export const waterfallBuildNumber = async (version: string) => {
  return fetchBuildNumberFromPaperApi("waterfall", version);
};
