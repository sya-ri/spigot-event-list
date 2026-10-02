import assert from "node:assert/strict";
import { test } from "node:test";
import { getServerJavadocLinkBases } from "./server-javadoc-links";

const releases = [
  {
    sourceName: "Spigot" as const,
    minecraftVersion: "26.3",
    javadocUrl: "https://hub.spigotmc.org/javadocs/spigot/",
    downloadSources: ["spigot" as const],
  },
  {
    sourceName: "Paper" as const,
    minecraftVersion: "26.3",
    javadocUrl: "https://jd.papermc.io/paper/26.3/",
    downloadSources: ["paper" as const],
  },
  {
    sourceName: "Purpur" as const,
    minecraftVersion: "26.3",
    javadocUrl: "https://purpurmc.org/javadoc/",
    downloadSources: ["purpur" as const],
  },
];

const titles = new Map([
  [releases[0].javadocUrl, "Overview (Spigot-API 26.3-R0.1-SNAPSHOT API)"],
  [releases[1].javadocUrl, "Overview (paper-api 26.3.build.142-beta API)"],
  [
    releases[2].javadocUrl,
    "Overview (purpur-api 26.3.build.2642-experimental API)",
  ],
]);
const readIndex = async (url: string) => `<title>${titles.get(url)}</title>`;

test("26.3 reference links use matching official Javadoc for all server sources", async () => {
  assert.deepEqual(await getServerJavadocLinkBases(releases, readIndex), {
    spigot: releases[0].javadocUrl,
    paper: releases[1].javadocUrl,
    purpur: releases[2].javadocUrl,
  });
});

test("historical 26.2 keeps Spigot/Purpur mirrors and uses versioned official Paper", async () => {
  const historical = releases.map((release) => ({
    ...release,
    minecraftVersion: "26.2",
    javadocUrl: release.javadocUrl.replace("/26.3/", "/26.2/"),
  }));
  const links = await getServerJavadocLinkBases(historical, async (url) =>
    url.includes("/paper/26.2/")
      ? "<title>Overview (paper-api 26.2.build.129-stable API)</title>"
      : readIndex(url),
  );
  assert.deepEqual(links, {
    spigot: "https://spigot-javadoc.s7a.dev/spigot/26.2/",
    paper: "https://jd.papermc.io/paper/26.2/",
    purpur: "https://spigot-javadoc.s7a.dev/purpur/26.2/",
  });
});

test("does not bind fixed snapshots to official docs after their latest version advances", async () => {
  const links = await getServerJavadocLinkBases(releases, async (url) =>
    (await readIndex(url)).replace(/26\.3/g, "26.4"),
  );
  assert.deepEqual(links, {
    spigot: "https://spigot-javadoc.s7a.dev/spigot/26.3/",
    paper: "https://spigot-javadoc.s7a.dev/paper/26.3/",
    purpur: "https://spigot-javadoc.s7a.dev/purpur/26.3/",
  });
});

test("unavailable, empty, wrong-source or different patch docs do not qualify as official references", async () => {
  for (const response of [
    "",
    "<title>404 Not Found</title>",
    "<title>Overview (paper-api 26.3.build.142-beta API)</title>",
    "<title>Overview (Spigot-API 26.3.1-R0.1-SNAPSHOT API)</title>",
    null,
  ]) {
    const links = await getServerJavadocLinkBases([releases[0]], async () => {
      if (response === null) throw new Error("HTTP 404");
      return response;
    });
    assert.equal(links.spigot, "https://spigot-javadoc.s7a.dev/spigot/26.3/");
  }
});
