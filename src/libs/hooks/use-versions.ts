import useSWRImmutable from "swr/immutable";

type VersionsResponse = {
  latest: string;
  versions: string[];
};

const useVersions = () => {
  const { data } = useSWRImmutable("versions", () =>
    fetch("/api/versions").then(
      (response) => response.json() as Promise<VersionsResponse>,
    ),
  );
  return { versions: data?.versions, latestVersion: data?.latest };
};

export default useVersions;
