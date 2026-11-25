import { defineConfig } from "vite-plus";
import "@astrojs/compiler-rs";

const ignorePatterns = [
  "CLAUDE.md",
  "data/**",
  "docs/*.html",
  "pnpm-lock.yaml",
  "spigot-javadoc/**",
  "apps/downloader/javadoc/**",
  "apps/web/public/**",
  "**/dist/**",
  "**/.astro/**",
  "**/.wrangler/**",
  "**/.cloudflare/**",
];

export default defineConfig({
  fmt: { astro: true, ignorePatterns },
  lint: { categories: { correctness: "error" }, ignorePatterns },
});
