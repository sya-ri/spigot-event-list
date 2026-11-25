import OpenAI from "openai";
import { mkdir, writeFile, appendFile, rename } from "node:fs/promises";
import { join } from "node:path";
import {
  decisionModel,
  languages,
  reviewEvent,
  writingModel,
  type Finding,
  type Language,
  type ReviewTarget,
} from "./description-review";
import { reviewKeywords } from "./keyword-review";

export type ReviewedEvent = ReviewTarget & {
  findings: Record<Language, Finding>;
  keywords: Record<Language, string[]> | null;
};

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
  const reviewed: ReviewedEvent[] = [];
  let keywordListsVerified = 0;
  await writeFile(rowsFile, "");
  let completed = 0;
  async function saveProgress() {
    const summary = {
      decisionModel,
      writingModel,
      events: targets.length,
      completed,
      counts,
      keywordListsVerified,
    };
    await writeFile(summaryFile + ".tmp", JSON.stringify(summary, null, 2) + "\n");
    await rename(summaryFile + ".tmp", summaryFile);
  }
  await saveProgress();
  for (let i = 0; i < targets.length; i += 6) {
    const group = targets.slice(i, i + 6);
    const results = await Promise.allSettled(
      group.map(async (target): Promise<ReviewedEvent> => {
        const findings = await reviewEvent(target.event, client);
        const keywords =
          client && languages.every((lang) => findings[lang].description)
            ? await reviewKeywords(target.event, client)
            : null;
        return { ...target, findings, keywords };
      }),
    );
    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      reviewed.push(result.value);
      await appendFile(rowsFile, JSON.stringify(result.value) + "\n");
      for (const lang of languages) counts[result.value.findings[lang].status]++;
      if (result.value.keywords) keywordListsVerified++;
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
  const summary = `Reviewed ${completed} events in English and Japanese. ${counts.supported} descriptions supported, ${counts.verified_suggestion} verified suggestions, ${counts.needs_review} need review. Verified bilingual keyword lists for ${keywordListsVerified} events.`;
  console.info(summary);
  if (process.env.GITHUB_STEP_SUMMARY)
    await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
  return reviewed;
}
