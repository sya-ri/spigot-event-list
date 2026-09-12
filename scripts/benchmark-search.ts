import { performance } from "node:perf_hooks";
import { NextRequest } from "next/server";
import { searchEvents } from "../src/app/api/search/events/handler";
import { versionsResponse } from "../src/app/api/versions/handler";

async function measure() {
  for (const q of ["player", "join OR login OR connect", "チャット OR chat"]) {
    const samples: number[] = [];
    let bytes = 0;
    for (let i = 0; i < 25; i++) {
      const start = performance.now();
      const response = await searchEvents(
        new NextRequest(
          `http://localhost/api/search/events?q=${encodeURIComponent(q)}&lang=ja&limit=50`,
        ),
      );
      bytes = Buffer.byteLength(await response.text());
      samples.push(performance.now() - start);
    }
    samples.sort((a, b) => a - b);
    console.log(
      JSON.stringify({ q, medianMs: samples[12], p95Ms: samples[23], bytes }),
    );
  }
  const start = performance.now();
  for (let i = 0; i < 25; i++) await (await versionsResponse()).text();
  console.log(
    JSON.stringify({ versionsMeanMs: (performance.now() - start) / 25 }),
  );
}
void measure();
