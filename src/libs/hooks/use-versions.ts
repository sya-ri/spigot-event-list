import useSWRImmutable from "swr/immutable";
import { fetchJson } from "@/libs/fetch-json";

type VersionsResponse = {
  latest: string;
  latestMinecraftVersion: string | null;
  versions: string[];
};

const useVersions = () => {
  const { data, error, mutate } = useSWRImmutable<VersionsResponse, Error>(
    "/api/versions",
    fetchJson,
    { shouldRetryOnError: false },
  );
  return {
    versions: data?.versions,
    latestVersion: data?.latest,
    latestMinecraftVersion: data?.latestMinecraftVersion,
    error,
    retry: () => mutate(),
  };
};

export default useVersions;
