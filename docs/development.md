# Development and event descriptions

The [website](https://spigot-event-list.s7a.dev) is ready to use without a local installation.
This guide is for contributors changing the web app or its event data.

## Run locally

From the repository root, install the versions of Node.js and pnpm listed in `mise.toml` and start Astro:

```sh
mise install
pnpm install --frozen-lockfile
pnpm dev
```

The development server runs the same API handlers as the production Worker and reads the repository snapshots. Run `pnpm build` followed by `pnpm preview` to exercise the Cloudflare runtime with the generated assets.

| Workspace          | Responsibility                                                                       |
| ------------------ | ------------------------------------------------------------------------------------ |
| `apps/web`         | English and Japanese HTML, React search controls, offline service worker             |
| `apps/api`         | Public HTTP routes, language negotiation and the Workers deployment                  |
| `apps/downloader`  | Discover source releases and update the versioned datasets                           |
| `packages/catalog` | Event types, snapshot selection, ranking and localization shared by the applications |

The build writes the initial 50 events into each language page and packages the snapshots as Workers Static Assets. API requests read snapshots through the Worker's `ASSETS` binding.

## Event datasets

Server event history lives in `data/minecraft/{version}/events.json`.
`data/events.json` is the latest merged dataset, and `data/proxy/events.json` contains the latest proxy events; proxy history is not maintained.
The [downloader workflow](../AGENTS.md#downloader-usage) covers latest, selected-version, and all-version refreshes.
Latest refreshes also retain a fixed server snapshot when all server sources agree on the Minecraft version, so that version remains searchable after the sources advance.
The downloader uses official reference URLs when the public Javadoc title identifies the same source and exact Minecraft version. Paper has versioned official URLs; Spigot and Purpur publish moving latest URLs. Historical or unavailable official pages fall back to the separate `spigot-javadoc` mirror. Downloading event data extracts Javadoc locally but does not publish that mirror; check its public pages separately before claiming reference-link availability.
Official-link checks happen during generation, not on each search request. When Spigot or Purpur advances, regenerate the preceding fixed version and publish its mirror before dropping that version's official reference links. Stored links do not automatically revalidate themselves, and official pages can update builds within the same Minecraft version.
Refreshes change tracked data, so select the intended versions and review the resulting diff.

## i18n

Edit the file below and create a [pull request](https://github.com/sya-ri/spigot-event-list/pulls).

- [apps/web/src/lib/locale.ts](../apps/web/src/lib/locale.ts)
- [apps/web/src/lib/translation.ts](../apps/web/src/lib/translation.ts)
- `data/events.json`
- `data/versions.json`
- `data/minecraft/{version}/events.json`
- `data/proxy/events.json`

## Description and keyword review

Edit descriptions and `keywords.ja` / `keywords.en` directly in `data/**/events.json`.
Use each version's Javadoc to choose accurate summaries, synonyms, and search phrases in both languages; leave unverified summaries empty.
The downloader's preservation rules are in [Description Editing](../AGENTS.md#description-editing), and [review coverage](event-description-audit.md) records checked sources.
The [API reference](../skills/spigot-event-search/references/api.md) explains how search uses these fields.

Run regression checks with `pnpm test`, followed by the TypeScript and lint checks documented in [AGENTS.md](../AGENTS.md).
