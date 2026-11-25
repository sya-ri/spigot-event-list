import OpenAI from "openai";
import { mkdir, writeFile, appendFile, rename } from "node:fs/promises";
import { join } from "node:path";
import {
  decisionModel,
  languages,
  reviewEvent,
  writingModel,
  type Finding,
  type ReviewTarget,
} from "./description-review";

export async function writeReviewReport(targets: ReviewTarget[], out: string) {
  await mkdir(out, { recursive: true });
  const key = process.env.OPENAI_API_KEY;
  if (!key && targets.some((t) => t.event.javadoc?.trim()))
    throw new Error("Set OPENAI_API_KEY to review descriptions.");
  const client = key ? new OpenAI({ apiKey: key, timeout: 90000, maxRetries: 3 }) : undefined;
  const counts: Record<Finding["status"], number> = {
    supported: 0,
    verified_suggestion: 0,
    needs_review: 0,
  };
  const rowsFile = join(out, "findings.jsonl");
  const summaryFile = join(out, "summary.json");
  await writeFile(rowsFile, "");
  let completed = 0;
  async function saveProgress() {
    const summary = { decisionModel, writingModel, events: targets.length, completed, counts };
    await writeFile(summaryFile + ".tmp", JSON.stringify(summary, null, 2) + "\n");
    await rename(summaryFile + ".tmp", summaryFile);
  }
  await saveProgress();
  for (let i = 0; i < targets.length; i += 6) {
    const group = targets.slice(i, i + 6);
    const results = await Promise.allSettled(group.map((t) => reviewEvent(t.event, client)));
    for (const [index, result] of results.entries()) {
      if (result.status !== "fulfilled") continue;
      const target = group[index];
      await appendFile(rowsFile, JSON.stringify({ ...target, findings: result.value }) + "\n");
      for (const lang of languages) counts[result.value[lang].status]++;
      completed++;
    }
    await saveProgress();
    const failure = results.find((r) => r.status === "rejected");
    if (failure) {
      if (failure.reason instanceof OpenAI.APIError)
        throw new Error(
          `OpenAI request failed (HTTP ${failure.reason.status ?? "unavailable"}, request ID ${failure.reason.requestID ?? "unavailable"}).`,
        );
      throw failure.reason;
    }
    if (completed % 60 === 0) console.info("Reviewed %d of %d events", completed, targets.length);
  }
  const summary = `Reviewed ${completed} events in English and Japanese. ${counts.supported} descriptions supported, ${counts.verified_suggestion} verified suggestions, ${counts.needs_review} need review.`;
  console.info(summary);
  if (process.env.GITHUB_STEP_SUMMARY)
    await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
}
