import { tgz } from "compressing";
import { createWriteStream } from "fs";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import EventType from "./types/event-type";
import { fetchStream } from "./http";

const LEGACY_PURPUR_PACKAGE_PREFIXES = [
  "net.pl3x.purpur",
  "org.purpurmc.purpur",
] as const;

const LEGACY_PURPUR_FILE_PATTERN =
  /src\/main\/java\/((?:net\/pl3x\/purpur|org\/purpurmc\/purpur)\/.+Event)\.java$/;

type LegacyPurpurEvent = {
  event: EventType;
  htmlPath: string;
  packageName: string;
  sourcePath: string;
};

const stripPatchPrefix = (value: string) => value.replace(/^[ab]\//, "");

const normalizeDocLine = (line: string) =>
  line.replace(/^\s*\*\s?/, "").trimEnd();

const extractClassJavadoc = (source: string) => {
  const classDeclarationIndex = source.search(
    /(?:public\s+)?(?:abstract\s+)?class\s+\w+Event\b/,
  );
  if (classDeclarationIndex < 0) {
    return "";
  }
  const beforeClass = source.slice(0, classDeclarationIndex);
  const matched = beforeClass.match(/\/\*\*([\s\S]*?)\*\/\s*$/);
  if (!matched) {
    return "";
  }
  return matched[1]
    .split("\n")
    .map(normalizeDocLine)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("@"))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

const createLegacyPurpurHtml = ({
  event,
  packageName,
  sourceUrl,
}: {
  event: EventType;
  packageName: string;
  sourceUrl: string;
}) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${event.name}</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.6;
        margin: 2rem auto;
        max-width: 56rem;
        padding: 0 1rem;
      }
      code {
        background: #f4f4f5;
        border-radius: 0.25rem;
        padding: 0.1rem 0.3rem;
      }
    </style>
  </head>
  <body>
    <p>Package <code>${packageName}</code></p>
    <h1>${event.name}</h1>
    ${
      event.javadoc
        ? `<p>${event.javadoc}</p>`
        : "<p>No class Javadoc was available in the legacy Purpur patch source.</p>"
    }
    <p><a href="${sourceUrl}">View source patch</a></p>
  </body>
</html>
`;

const parseLegacyPurpurPatch = async (
  patchPath: string,
): Promise<LegacyPurpurEvent[]> => {
  const text = await readFile(patchPath, "utf8");
  const lines = text.split("\n");
  const events: LegacyPurpurEvent[] = [];

  let currentSourcePath: string | null = null;
  let currentTargetPath: string | null = null;
  let currentPatchFilePath: string | null = null;
  let collecting = false;
  let collectedLines: string[] = [];

  const flushCollected = () => {
    if (!collecting || !currentTargetPath || !currentPatchFilePath) {
      collectedLines = [];
      collecting = false;
      return;
    }
    const source = collectedLines.join("\n").trim();
    const packageMatched = source.match(/^package\s+([a-zA-Z0-9_.]+);/m);
    const classMatched = source.match(
      /(?:public\s+)?(?:abstract\s+)?class\s+(\w+Event)\b/,
    );
    if (!packageMatched || !classMatched) {
      collectedLines = [];
      collecting = false;
      return;
    }
    const packageName = packageMatched[1];
    if (
      !LEGACY_PURPUR_PACKAGE_PREFIXES.some((prefix) =>
        packageName.startsWith(prefix),
      )
    ) {
      collectedLines = [];
      collecting = false;
      return;
    }
    const href = `${packageName.replace(/\./g, "/")}/${classMatched[1]}.html`;
    events.push({
      event: {
        description: {
          ja: "",
          en: "",
        },
        href,
        javadoc: extractClassJavadoc(source),
        link: "",
        name: classMatched[1],
        source: "purpur",
      },
      htmlPath: href,
      packageName,
      sourcePath: currentPatchFilePath,
    });
    collectedLines = [];
    collecting = false;
  };

  for (const line of lines) {
    if (line.startsWith("diff --git ")) {
      flushCollected();
      currentSourcePath = null;
      currentTargetPath = null;
      currentPatchFilePath = null;
      continue;
    }
    if (line.startsWith("--- ")) {
      currentSourcePath = stripPatchPrefix(line.slice(4).trim());
      continue;
    }
    if (line.startsWith("+++ ")) {
      currentTargetPath = stripPatchPrefix(line.slice(4).trim());
      currentPatchFilePath = patchPath;
      continue;
    }
    if (line.startsWith("@@ ")) {
      const targetPath = currentTargetPath ?? currentSourcePath;
      if (!targetPath) {
        continue;
      }
      collecting = LEGACY_PURPUR_FILE_PATTERN.test(targetPath);
      if (!collecting) {
        continue;
      }
      continue;
    }
    if (!collecting) {
      continue;
    }
    if (line.startsWith("diff --git ")) {
      flushCollected();
      continue;
    }
    if (line.startsWith("+") && !line.startsWith("+++ ")) {
      collectedLines.push(line.slice(1));
    }
  }
  flushCollected();
  return events;
};

const downloadArchive = async (url: string, destination: string) => {
  const { stream } = await fetchStream(url);
  await new Promise<void>((resolve, reject) => {
    const output = createWriteStream(destination);
    stream.pipe(output);
    output.on("close", () => resolve());
    output.on("error", reject);
    stream.on("error", reject);
  });
};

const listPatchFiles = async (rootPath: string) => {
  const patchDirectory = path.join(rootPath, "patches", "api");
  const entries = await readdir(patchDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".patch"))
    .map((entry) => path.join(patchDirectory, entry.name))
    .sort();
};

export const loadLegacyPurpurEvents = async ({
  buildCommit,
  linkBase,
  mirrorDirectory,
}: {
  buildCommit: string;
  linkBase: string;
  mirrorDirectory: string;
}) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "purpur-legacy-"));
  try {
    const archivePath = path.join(tempRoot, "purpur.tar.gz");
    await downloadArchive(
      `https://codeload.github.com/PurpurMC/Purpur/tar.gz/${buildCommit}`,
      archivePath,
    );
    await tgz.uncompress(archivePath, tempRoot);
    const extractedRoot = path.join(tempRoot, `Purpur-${buildCommit}`);
    const patchFiles = await listPatchFiles(extractedRoot);
    const legacyEvents = (
      await Promise.all(
        patchFiles.map((patchPath) => parseLegacyPurpurPatch(patchPath)),
      )
    )
      .flat()
      .filter(
        (entry, index, self) =>
          self.findIndex(
            (candidate) => candidate.event.href === entry.event.href,
          ) === index,
      );

    await mkdir(mirrorDirectory, { recursive: true });
    for (const entry of legacyEvents) {
      entry.event.link = `${linkBase}${entry.event.href}`;
      const sourceUrl = `https://github.com/PurpurMC/Purpur/blob/${buildCommit}/${path
        .relative(extractedRoot, entry.sourcePath)
        .replace(/\\/g, "/")}`;
      const destination = path.join(mirrorDirectory, entry.htmlPath);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(
        destination,
        createLegacyPurpurHtml({
          event: entry.event,
          packageName: entry.packageName,
          sourceUrl,
        }),
      );
    }

    return Object.fromEntries(
      legacyEvents.map((entry) => [
        entry.event.name + entry.event.source,
        entry.event,
      ]),
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
};
