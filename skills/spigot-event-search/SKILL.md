---
name: spigot-event-search
description: Search Minecraft, proxy, and plugin events by event name, description, or Javadoc text in Japanese or English using the public Spigot Event List search API. Use when the user wants to find candidate events, narrow by Minecraft version or source, or look up events from partial text.
license: MIT
---

# Spigot Event Search

Use this skill when a user wants to find events from partial text rather than browse the full list.

## What this skill does

- Accepts Japanese or English search terms directly
- Performs partial-match search for both Japanese and English text
- Searches event `name`
- Searches `description.en` and `description.ja`
- Searches `javadoc`
- Searches `deprecateDescription.en` and `deprecateDescription.ja`
- Supports `latest` or a fixed Minecraft version such as `1.21.11`
- Supports source filtering for `spigot`, `paper`, `purpur`, `bungee`, `velocity`

## API

Base URL:

```text
https://spigot-event-list.s7a.dev/api/search/events
```

Read [references/api.md](references/api.md) for the full request and response format.

## Workflow

1. Build a query from the user's partial text.
   Japanese search text is valid as-is.
2. Use `version=latest` unless the user asks for a specific version.
3. Add `source=` when the user names a platform such as Paper or Velocity.
4. Call the API with `curl`.
5. Summarize the best matches first.
6. Include event name, source, version, and link in the result.

## Commands

Basic:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=block%20break'
```

Japanese query:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%E3%83%81%E3%83%A3%E3%83%83%E3%83%88'
```

Specific version:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%E3%83%81%E3%83%A3%E3%83%83%E3%83%88&version=1.21.11'
```

Specific sources:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=login&source=spigot,paper&limit=10'
```

## Response handling

- Prefer exact or near-exact name matches over description-only matches.
- If multiple sources define the same event name, group by name and list available sources.
- If the user searches in Japanese, answer in Japanese.
- If the API returns zero matches, suggest broader Japanese or English search terms.
