import type { CheerioAPI } from "cheerio";

export const extractJavadocText = (
  $: CheerioAPI,
  descriptionSelector: string,
) => {
  const description = $(descriptionSelector).clone();
  description
    .find(".deprecation-block, .deprecationBlock, .block:has(.deprecatedLabel)")
    .remove();
  const summary = description.find(".block").first();
  summary.find("p, li, br").before(" ").after(" ");
  return summary.text().replace(/\s+/g, " ").trim();
};
