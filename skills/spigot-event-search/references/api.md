# API Reference

Endpoint:

```text
GET https://spigot-event-list.s7a.dev/api/search/events
```

## Query parameters

- `q` required
  - Partial-match search text
  - Queries in supported dataset languages are supported
  - Searches event name, descriptions, Javadoc, and deprecation descriptions
  - Supports `OR` and `AND`
  - Whitespace-separated terms are treated as `AND`
  - Quoted phrases such as `"block break"` are supported
- `version` optional
  - `latest` or a fixed Minecraft version such as `1.21.11`
  - Default: `latest`
- `source` optional
  - Comma-separated list from `spigot,paper,purpur,bungee,velocity`
- `limit` optional
  - Integer from `1` to `100`
  - Default: `20`

## Example

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=login&source=velocity,bungee&limit=5'
```

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=chat%20OR%20login&version=latest'
```

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%22block%20break%22%20paper'
```

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=join%20OR%20login%20OR%20connect'
```

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%E5%8F%82%E5%8A%A0%20OR%20%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%20OR%20join%20OR%20login'
```

## Response

```json
{
  "query": "login",
  "version": "latest",
  "count": 2,
  "events": [
    {
      "version": "latest",
      "name": "LoginEvent",
      "source": "velocity",
      "link": "https://...",
      "description": {
        "ja": "...",
        "en": "..."
      },
      "deprecateDescription": {
        "ja": "...",
        "en": "..."
      },
      "javadoc": "..."
    }
  ]
}
```

## Notes

- `latest` returns the latest merged dataset.
- Fixed versions include the selected Minecraft server data plus the latest proxy data.
- Results are sorted by relevance, then by name and source.
- `A B` means `A AND B`.
- `A OR B` means either term may match.
- `A OR B OR C` is useful when you want to try several likely candidate words.
- Mixing a supported non-English language with English in the same OR query is allowed when it improves recall.
- If the user's language is not supported by the dataset, use English-only query expansion.
