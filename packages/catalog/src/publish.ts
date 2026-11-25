import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { createDataPaths } from "./data-paths.ts";

export async function publishCatalog(dataRoot: string, target: string) {
  const data = createDataPaths(dataRoot);
  await mkdir(target, { recursive: true });
  const save = (name: string, value: unknown) =>
    writeFile(join(target, name + ".json"), JSON.stringify(value));
  const versions = await data.getServerVersionsDesc();
  const latest = await data.getLatestMinecraftVersion();
  await save("manifest", { versions, latest });
  await save("latest", await data.readLatestServerEvents());
  await save("proxy", await data.readProxyEvents());
  for (const version of versions) await save(version, await data.readServerEvents(version));
}
