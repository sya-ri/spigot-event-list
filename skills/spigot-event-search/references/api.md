# API Reference

Endpoint:

```text
GET https://spigot-event-list.s7a.dev/api/search/events
```

## Query parameters

- `q` required
  - Partial-match search text
  - Japanese and English queries are both supported
  - Searches event name, descriptions, Javadoc, and deprecation descriptions
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
