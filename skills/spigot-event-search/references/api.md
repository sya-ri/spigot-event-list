# API Reference

`GET https://spigot-event-list.s7a.dev/api/search/events`

## Query parameters

- `q`: optional partial-match search across event names, all description languages, Javadoc and deprecation descriptions. Omitted or blank queries browse all events.
  - Whitespace and `AND` require all terms. `OR` separates alternatives.
  - Quoted phrases stay contiguous; quoted operators are literal text.
  - A nonempty query containing only ignored words/operators returns zero matches.
- `version`: `latest` (default) or a value from `GET /api/versions`.
  - The current `latestMinecraftVersion` is an explicit alias for the latest merged data, only while those values agree.
  - Historical versions combine their server events with the latest proxy events.
- `source`: comma-separated values from `spigot,paper,purpur,bungee,velocity`. Omitted selects all; an explicitly empty value selects none. Unknown values do not match.
- `lang`: response description language, `ja` (default) or `en`. Search still covers all dataset languages.
- `limit`: page size, 1–100 (default 20).
- `offset`: nonnegative integer starting position (default 0).

Integer pagination values are clamped to their bounds; malformed/non-integer values use the defaults.

## Example

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=login&source=velocity,bungee&lang=en&limit=5'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=chat%20OR%20login&version=latest'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%22block%20break%22'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=player&limit=50&offset=100'
```

## Response

Descriptions are localized strings. `count` is the size of this page; `total` counts all matching events before pagination. Request the same query, filters and limit with `offset=nextOffset` to continue. A null `nextOffset` marks the end.

```json
{
  "query": "login",
  "version": "latest",
  "count": 1,
  "total": 1,
  "offset": 0,
  "nextOffset": null,
  "events": [
    {
      "version": "latest",
      "name": "LoginEvent",
      "source": "velocity",
      "link": "https://example.com/LoginEvent.html",
      "description": "Localized description",
      "deprecateDescription": "Optional localized deprecation description",
      "javadoc": "Optional original Javadoc text"
    }
  ]
}
```

Results sort by relevance, then name, source and link. Browsing uses name, source and link order. An offset beyond the result set returns an empty page with the original total.

Unsupported versions return HTTP 404; unsupported languages return HTTP 400. These errors use plain-text bodies. Other failures can return HTTP 500; check the HTTP status before decoding JSON.

## Related endpoints and freshness

- `GET /api/versions` returns `latest`, `latestMinecraftVersion` (string or null) and accepted `versions`.
- `GET /api/versions/{version}/events?lang=ja` returns a localized array of all events for that version.
- Web server data reads are cached for at most 60 seconds after each successful load, with a bounded cache. Failed loads are retried on the next request. Downloader reads remain uncached.

## Search guidance

- Use `A B` or `A AND B` when both conditions should match.
- Use `A OR B` for alternatives or synonyms.
- Mix Japanese and English alternatives when helpful, for example `参加 OR ログイン OR join OR login`.
- Use English expansion for languages absent from the dataset.
