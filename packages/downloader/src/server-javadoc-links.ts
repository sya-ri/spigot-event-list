import { load } from "cheerio";
import type { ReleaseDiscovery } from "./discover-source-releases";
import { fetchText } from "./http";
import type SourceType from "./types/source-type";

const artifactNames = {
  Paper: "paper-api",
  Spigot: "Spigot-API",
  Purpur: "purpur-api",
};

// Spigot and Purpur publish moving latest URLs. Check their actual document version
// at generation time; release/build API metadata alone does not bind those pages.
export const getServerJavadocLinkBases = async (
  releases: Pick<
    ReleaseDiscovery,
    "sourceName" | "minecraftVersion" | "downloadSources" | "javadocUrl"
  >[],
  readIndex: (url: string) => Promise<string> = (url) =>
    fetchText(url, { signal: AbortSignal.timeout(10_000) }),
): Promise<Partial<Record<SourceType, string>>> => {
  const entries = await Promise.all(
    releases.map(async (release) => {
      let officialMatches = false;
      try {
        const title = load(await readIndex(release.javadocUrl))("title").text();
        const match = title.match(
          /\((paper-api|purpur-api|Spigot-API) (\d+(?:\.\d+)*)(?=[ .-])/,
        );
        officialMatches =
          match?.[1] === artifactNames[release.sourceName] &&
          match?.[2] === release.minecraftVersion;
      } catch {
        // An unavailable or unidentifiable official page is not version evidence.
      }
      return release.downloadSources.map((source) => [
        source,
        officialMatches
          ? release.javadocUrl
          : `https://spigot-javadoc.s7a.dev/${source}/${release.minecraftVersion}/`,
      ]);
    }),
  );
  return Object.fromEntries(entries.flat());
};
