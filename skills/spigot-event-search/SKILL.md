---
name: spigot-event-search
description: Search Minecraft, proxy, and plugin events by event name, description, or Javadoc text using the public Spigot Event List search API. Supports partial-match search with AND and OR conditions. Use when the user wants to find candidate events, narrow by Minecraft version or source, or look up events from partial text.
license: MIT
---

# Spigot Event Search

Use this skill when a user wants to find events from partial text rather than browse the full list.

## What this skill does

- Accepts search terms in supported dataset languages
- Performs partial-match search across all supported description languages
- Supports `AND` and `OR` search
- Treats whitespace-separated terms as `AND`
- Supports quoted phrases such as `"block break"`
- Searches event `name`
- Searches all supported `description.*` fields
- Searches `javadoc`
- Searches all supported `deprecateDescription.*` fields
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
   Search text in supported dataset languages is valid as-is.
   Use `OR` when the user wants alternatives.
   Use `AND` or plain whitespace when the user wants all terms to match.
   Use quotes for exact phrases.
   When expanding likely synonyms or candidate terms, include the user's language when that language is supported by the dataset.
   If the user's language is not supported by the dataset, use English candidate terms only.
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

AND query:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=chat%20login'
```

OR query:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=chat%20OR%20login'
```

OR query with candidate terms:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=join%20OR%20login%20OR%20connect'
```

Supported-language OR query with candidate terms:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%E5%8F%82%E5%8A%A0%20OR%20%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%20OR%20join%20OR%20login'
```

Quoted phrase:

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%22block%20break%22%20paper'
```

Supported-language query:

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
- If the user searches in a supported non-English language, answer in that language.
- If the API returns zero matches, retry with a broader query.
- Prefer `OR` when the user is exploring alternatives.
- Prefer `OR` with multiple likely candidate words when the user knows the meaning but not the exact event name.
- Mixing a supported non-English language with English in the same OR query is allowed when it improves recall.
- If the user's language is not supported by the dataset, use English-only query expansion.
- Prefer `AND` when the user gives multiple conditions that should all hold.
