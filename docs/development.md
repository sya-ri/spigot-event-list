# Development and event descriptions

The [website](https://spigot-event-list.s7a.dev) is ready to use without a local installation.
This guide is for contributors changing the web app or its event data.

## Run locally

From the repository root, install dependencies with Node.js 24 and start the development server:

```sh
mise exec node@24 -- npm ci
mise exec node@24 -- npm run dev
```

Open the local URL printed by Next.js. See [package.json](../package.json) for build, test, lint, and typecheck commands.

## Event datasets

Server event history lives in `data/minecraft/{version}/events.json`.
`data/events.json` is the latest merged dataset, and `data/proxy/events.json` contains the latest proxy events; proxy history is not maintained.
The [downloader workflow](../AGENTS.md#downloader-usage) covers latest-only, selected-version, and all-version refreshes.
Refreshes change tracked data, so select the intended versions and review the resulting diff.

## i18n

Edit the file below and create a [pull request](https://github.com/sya-ri/spigot-event-list/pulls).

- [src/i18n/config.ts](../src/i18n/config.ts)
- [src/i18n/translation.ts](../src/i18n/translation.ts)
- `data/events.json`
- `data/versions.json`
- `data/minecraft/{version}/events.json`
- `data/proxy/events.json`

## Description and keyword review

Descriptions and `keywords.ja` / `keywords.en` are edited directly in `data/**/events.json`. Keywords improve matching in the API and Web search and are included in both API responses. The Web app shows descriptions and expandable Javadoc references; keyword lists are not displayed. See the [bilingual API reference](../skills/spigot-event-search/references/api.md) and [review coverage and sources](event-description-audit.md).

The downloader preserves editorial metadata only when the event identity and Javadoc evidence agree. Existing version-specific edits take priority. Missing summaries remain empty instead of copying raw English Javadoc into either language; the original Javadoc is still available for inspection. Annotation-wide defaults are limited to `@Experimental` and `@Beta`.

Choose related keywords from the event's documented actions, subjects, and conditions. Include useful synonyms and search phrases in both Japanese and English, while preserving differences between versions.

Run regression checks with `mise exec node@24 -- npm test`, followed by the TypeScript and lint checks documented in [AGENTS.md](../AGENTS.md).
