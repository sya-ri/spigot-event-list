# Event search API / イベント検索API

`GET https://spigot-event-list.s7a.dev/api/search/events`

## Parameters / パラメーター

| Parameter | Behavior / 動作                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `q`       | Required. Searches names, Japanese and English descriptions, keywords, Javadoc, and deprecation notes. 必須。イベント名・日英の説明とキーワード・Javadoc・非推奨理由を検索します。 |
| `version` | `latest` (default) or a supported Minecraft version. 省略時は最新版。                                                                                                              |
| `source`  | Comma-separated `spigot,paper,purpur,bungee,velocity`. カンマ区切りで絞り込みます。                                                                                                |
| `lang`    | `ja` (default) or `en`. Selects the response description language; searches always use both languages. 説明の表示言語であり、検索対象の言語は制限しません。                        |
| `limit`   | Page size, 1–100; default 20. 1ページの件数。                                                                                                                                      |
| `offset`  | Number of matching events to skip; default 0. 取得開始位置。                                                                                                                       |

Whitespace and `AND` require all terms in the same event. `OR` separates alternatives; `AND` has higher precedence. Quoted phrases match a contiguous phrase within a field or keyword. Full-width Latin characters are normalized; matching is case-insensitive. Common English stop words are ignored outside quotes, and simple plural/Japanese ending normalization is supported.

空白と `AND` は同じイベント内ですべての語に一致する条件、`OR` はいずれかに一致する条件です。`AND` を先に評価します。引用符で囲むと、1つの説明欄やキーワード内の連続したフレーズを検索します。全角英数字と大文字・小文字の違いを吸収し、引用符の外では一般的な英語の機能語を除外します。簡単な英語の複数形・日本語の語尾も補正します。

## Examples / 例

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=mining&lang=en'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%E9%9B%A2%E5%B8%AD&source=purpur&lang=ja'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%22block%20break%22&source=spigot'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=chat%20OR%20login&version=1.21.11'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=Event&limit=100&offset=100'
```

## Response / レスポンス

The following illustrates one result for `q=mining&lang=en&limit=1`. `total` is the full number of matches; `count` is the number returned on this page. `description` and `deprecateDescription` are strings in the requested language. `keywords` contains both languages. Optional Javadoc and deprecation fields are omitted when unavailable.

以下は1件取得したレスポンスの例です。`total` は全一致件数、`count` は現在のページの件数です。`description` と `deprecateDescription` は指定言語の文字列、`keywords` は日英の配列を持つオブジェクトです。Javadocや非推奨情報が存在しない場合、それらのフィールドは省略されます。

```json
{
  "query": "mining",
  "version": "latest",
  "count": 1,
  "total": 4,
  "offset": 0,
  "events": [
    {
      "version": "latest",
      "name": "BlockBreakEvent",
      "source": "spigot",
      "link": "https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockBreakEvent.html",
      "description": "Called when a block is broken by a player.",
      "keywords": {
        "ja": ["ブロック破壊", "採掘", "掘る"],
        "en": ["block break", "mining", "dig"]
      }
    }
  ]
}
```

Example counts are illustrative and change as the dataset changes. To read every match, increase `offset` by the number returned until it reaches `total`. The Web app follows the same pages, so its results are not truncated to 100 events.

件数は説明用の例であり、データ更新により変わります。全件を取得する場合、取得した件数ずつ `offset` を進め、`total` に達するまで取得します。Webも同じページを取得するため、100件で打ち切られません。

- `latest` uses the merged latest server and proxy dataset. Fixed versions combine that server version with the latest proxy events.
- Results rank exact names, partial names, keywords, descriptions, Javadoc, and deprecation notes, then break ties by name and source.
- `GET /api/versions/{version}/events?lang=ja` exposes the same event fields without the per-event `version` field and returns an array without pagination.
- Missing/empty meaningful query or unsupported `lang`: HTTP 400. Unsupported `version`: HTTP 404.
- Empty or unrecognized source filters mean no source restriction. Invalid offsets fall back to zero. Existing `limit` values are clamped to 1–100.

最新はサーバー・プロキシの統合データ、固定バージョンは該当サーバー版と最新プロキシを組み合わせます。通常のイベント一覧APIもキーワードとJavadocを返します。説明の根拠は `link` から確認でき、WebではJavadoc本文を展開して比較できます。

## Version discovery / バージョンの選択

`GET /api/versions` returns the `latest` alias, `latestMinecraftVersion`, and accepted versions. The current `latestMinecraftVersion` is an explicit alias for the latest merged dataset; the response retains the requested version. After latest advances, the previous version uses its fixed snapshot if available, or returns `404 Unsupported version`. Fixed server snapshots include the latest proxy data. `latestMinecraftVersion` is `null` while Paper, Purpur and Spigot disagree on the current stable Minecraft version.

`GET /api/versions` で使用可能な版を確認できます。現在の `latestMinecraftVersion` を明示した場合も最新の統合データを読み込み、応答には指定した版を保持します。最新版が進んだ後は、その版の保存済みデータがあれば読み込み、なければ404になります。過去版のサーバーデータにも最新のプロキシデータを含みます。Paper・Purpur・Spigotの安定版が一致していない間、`latestMinecraftVersion` は `null` です。
