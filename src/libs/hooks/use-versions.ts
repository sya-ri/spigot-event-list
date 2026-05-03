import useSWRImmutable from "swr/immutable";

type VersionsResponse = {
  latest: string;
  latestMinecraftVersion: string;
  versions: string[];
};

const useVersions = () => {
  const { data } = useSWRImmutable("versions", () =>
    fetch("/api/versions").then(
      (response) => response.json() as Promise<VersionsResponse>,
    ),
  );
  return {
    versions: data?.versions,
    latestVersion: data?.latest,
    latestMinecraftVersion: data?.latestMinecraftVersion,
  };
};

export default useVersions;
