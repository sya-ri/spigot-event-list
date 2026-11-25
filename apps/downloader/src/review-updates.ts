import { resolve } from "node:path";
import { changedDescriptions } from "./changed-descriptions";
import { writeReviewReport } from "./review-report";

const out = process.argv[2];
if (!out) throw new Error("Provide the review output directory.");
const root = resolve(import.meta.dirname, "../../..");
await writeReviewReport(await changedDescriptions(root), resolve(out));
