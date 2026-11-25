import { resolve } from "node:path";
import { applyReviewedMetadata } from "./apply-reviewed-metadata.ts";
import { changedDescriptions } from "./changed-descriptions.ts";
import { writeReviewReport } from "./review-report.ts";

const [out, mode, ...extra] = process.argv.slice(2);
if (!out || (mode && mode !== "--apply") || extra.length)
  throw new Error("Usage: review-updates <output-directory> [--apply]");
const root = resolve(import.meta.dirname, "../../..");
const reviewed = await writeReviewReport(await changedDescriptions(root), resolve(out));
if (mode === "--apply") {
  const updated = await applyReviewedMetadata(root, reviewed);
  console.info("Applied verified event metadata to %d snapshots.", updated);
}
