<h1 align="center">
  <a href="https://spigot-event-list.s7a.dev">
    <img src="public/logo.png" alt="spigot-event-list"/>
  </a>
</h1>

<p align="center">
  <a href="https://www.spigotmc.org">
    <img alt="Spigot" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Spigot&label=Spigot&color=orange" />
  </a>
  <a href="https://papermc.io/downloads/paper">
    <img alt="Paper" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Paper&label=Paper&color=lightgray" />
  </a>
  <a href="https://purpurmc.org">
    <img alt="Purpur" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Purpur&label=Purpur&color=blueviolet" />
  </a>
  <a href="https://www.spigotmc.org/wiki/bungeecord">
    <img alt="BungeeCord" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Bungee&label=Bungee&color=yellow" />
  </a>
  <a href="https://papermc.io/downloads/velocity">
    <img alt="Velocity" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Velocity&label=Velocity&color=lightgreen" />
  </a>
</p>

<br />
<br />

- A list of events for Minecraft plugins.
- Search by event name, bilingual descriptions, and related keywords, with platform and version filters.
- Compatible with the latest version and constantly adding new events.
- Compatible with multiple environments, total number of events exceeds 500.
  - Bukkit
  - Spigot
  - Paper
  - Purpur
  - BungeeCord
  - Velocity
- Support i18n.

## AI Skill

This repository includes a public skill for AI agents:

- `spigot-event-search`

It uses the public event search API and supports partial-match search over:

- event name
- description
- curated Japanese and English keywords
- Javadoc
- deprecated description
- Japanese and English queries

Install with GitHub CLI:

```bash
gh skill install sya-ri/spigot-event-list spigot-event-search
```

Install with `vercel-labs/skills`:

```bash
npx -y skills add sya-ri/spigot-event-list --skill spigot-event-search
```

## i18n

Edit the file below and create a [pull request](https://github.com/sya-ri/spigot-event-list/pulls).

- [src/i18n/config.ts](src/i18n/config.ts)
- [src/i18n/translation.ts](src/i18n/translation.ts)
- `data/events.json`
- `data/versions.json`
- `data/minecraft/{version}/events.json`
- `data/proxy/events.json`

## Description and keyword review

Descriptions and `keywords.ja` / `keywords.en` are edited directly in `data/**/events.json`. The Web app displays related keywords and an expandable Javadoc reference; both API endpoints expose the same metadata. See the [bilingual API reference](skills/spigot-event-search/references/api.md) and [review coverage and sources](docs/event-description-audit.md).

The downloader preserves editorial metadata only when the event identity and Javadoc evidence agree. Existing version-specific edits take priority. Missing summaries remain empty instead of copying raw English Javadoc into either language; the original Javadoc is still available for inspection. Annotation-wide defaults are limited to `@Experimental` and `@Beta`.

説明と検索語は `data/**/events.json` を直接編集します。Javadocの内容が異なる版へ説明を自動流用せず、未翻訳欄へ英語原文を自動挿入しません。Web上で説明とJavadocを見比べられます。

Run regression checks with `mise exec node@24 -- npm test`, followed by the TypeScript and lint checks documented in `AGENTS.md`.
