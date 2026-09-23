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

Edit descriptions and `keywords.ja` / `keywords.en` directly in `data/**/events.json`.
Use each version's Javadoc to choose accurate summaries, synonyms, and search phrases in both languages; leave unverified summaries empty.
The downloader's preservation rules are in [Description Editing](../AGENTS.md#description-editing), and [review coverage](event-description-audit.md) records checked sources.
The [API reference](../skills/spigot-event-search/references/api.md) explains how search uses these fields.

Run regression checks with `mise exec node@24 -- npm test`, followed by the TypeScript and lint checks documented in [AGENTS.md](../AGENTS.md).
