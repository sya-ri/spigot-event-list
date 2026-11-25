import { createAsyncCache } from "@spigot-event-list/catalog/async-cache";
import type { EventDataDependencies } from "@spigot-event-list/catalog/event-data";

export interface Assets {
  fetch(request: Request): Promise<Response>;
}
type Dataset = Awaited<ReturnType<EventDataDependencies["readLatestServerEvents"]>>;
type Manifest = { versions: string[]; latest: string | null };

// Only resolved JSON can be shared by different Worker requests.
export function assetCatalog(
  assets: Assets,
  origin: string,
  snapshots = new Map<string, unknown>(),
): EventDataDependencies {
  const withinRequest = createAsyncCache(60_000);
  const read = <T>(key: string) =>
    withinRequest(key, async () => {
      if (snapshots.has(key)) {
        const value = snapshots.get(key) as T;
        snapshots.delete(key);
        snapshots.set(key, value);
        return value;
      }
      const response = await assets.fetch(
        new Request(new URL("/_catalog/" + key + ".json", origin)),
      );
      if (!response.ok) throw new Error("Missing catalog asset: " + key);
      const value = (await response.json()) as T;
      snapshots.set(key, value);
      if (snapshots.size > 16) snapshots.delete(snapshots.keys().next().value!);
      return value;
    });
  return {
    getLatestMinecraftVersion: async () => (await read<Manifest>("manifest")).latest,
    getServerVersionsDesc: async () => (await read<Manifest>("manifest")).versions,
    readLatestServerEvents: () => read<Dataset>("latest"),
    readProxyEvents: () => read<Dataset>("proxy"),
    readServerEvents: (version) => read<Dataset>(version),
  };
}
