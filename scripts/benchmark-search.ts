import { createVersionsHandler } from "../apps/api/src/versions";
import { createDataPaths } from "@spigot-event-list/catalog/data-paths";
import { createSearchEventsHandler } from "../apps/api/src/search";
import { performance } from "node:perf_hooks";

const dataPaths = createDataPaths("data", { cacheTtlMs: 60_000 });
const searchEvents = createSearchEventsHandler(dataPaths);
const versionsResponse = createVersionsHandler(dataPaths);
async function measure() {
  for (const q of ["player", "join OR login OR connect", "チャット OR chat"]) {
    const samples: number[] = [];
    let bytes = 0;
    for (let i = 0; i < 25; i++) {
      const start = performance.now();
      const response = await searchEvents(
        new Request(
          `http://localhost/api/search/events?q=${encodeURIComponent(q)}&lang=ja&limit=50`,
        ),
      );
      bytes = Buffer.byteLength(await response.text());
      samples.push(performance.now() - start);
    }
    samples.sort((a, b) => a - b);
    console.log(JSON.stringify({ q, medianMs: samples[12], p95Ms: samples[23], bytes }));
  }
  const start = performance.now();
  for (let i = 0; i < 25; i++) await (await versionsResponse()).text();
  console.log(JSON.stringify({ versionsMeanMs: (performance.now() - start) / 25 }));
}
void measure();
