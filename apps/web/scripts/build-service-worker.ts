import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import ts from "typescript";

export async function buildServiceWorker(output: string) {
  const paths = (await readdir(join(output, "_astro"))).sort().map((file) => "/_astro/" + file);
  const urls = [
    "/en",
    "/ja",
    "/manifest.json",
    "/favicon.ico",
    "/mark.svg",
    "/icon-192x192.png",
    "/icon-512x512.png",
    ...paths,
  ];
  const hash = createHash("sha256");
  const source = await readFile("src/service-worker.ts", "utf8");
  hash.update(source);
  for (const url of urls) {
    const file = ["/en", "/ja"].includes(url) ? url + "/index.html" : url;
    hash.update(await readFile(join(output, file)));
  }
  const service = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
  const constants =
    "const cacheId = " +
    JSON.stringify("events-" + hash.digest("hex").slice(0, 16)) +
    ", precacheUrls = " +
    JSON.stringify(urls) +
    ";\n";
  await writeFile(join(output, "sw.js"), constants + service);
}
