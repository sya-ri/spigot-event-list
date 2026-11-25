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
The downloader uses official reference URLs when the public Javadoc title identifies the same source and exact Minecraft version. Paper has versioned official URLs; Spigot and Purpur publish moving latest URLs. Historical or unavailable official pages fall back to the separate [Javadoc mirror](https://github.com/sya-ri/spigot-javadoc).
Historical downloads write mirror files to the ignored `spigot-javadoc/docs/{source}/{version}/` directory. To publish them, copy the generated version directories into a checkout of the mirror and follow its publishing instructions.
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
Use each version's Javadoc to choose accurate summaries and related search terms in both languages. Include at least four useful aliases, synonyms, or short phrases per language that add vocabulary beyond the event name and descriptions. Leave unverified summaries empty.
The downloader's preservation rules are in [Description Editing](../AGENTS.md#description-editing). It can fill missing descriptions and keywords from another snapshot with the same source, event path and Javadoc evidence.
The [API reference](../skills/spigot-event-search/references/api.md) explains how search uses these fields.

Run regression checks with `pnpm test`, followed by the TypeScript and lint checks documented in [AGENTS.md](../AGENTS.md).

After a refresh, the update workflow reviews additions and changes to class Javadoc or localized descriptions. It uses the repository Actions secret `OPENAI_API_KEY` to verify the bilingual descriptions and supplement sparse keyword lists. It removes terms already present in the event name or descriptions, applies verified metadata to the affected snapshots, and runs the dataset tests before committing.

The workflow leaves the published data at the previous revision if an event needs human review. Download the `description-review` artifact to see the findings, supporting quotations, and verified keywords.

To review a local refresh before committing, run `pnpm --filter @spigot-event-list/downloader run review-updates <output-directory>`. Add `--apply` after the output directory to write verified results to the event data.
