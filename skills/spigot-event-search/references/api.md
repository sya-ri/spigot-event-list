# Event search API / イベント検索API

`GET https://spigot-event-list.s7a.dev/api/search/events`

## Parameters / パラメーター

| Parameter | Behavior / 動作                                                                                                                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `q`       | Optional. Searches names, Japanese and English descriptions, keywords, Javadoc, and deprecation notes. Omitted or blank queries browse all events. 任意。イベント名・日英の説明とキーワード・Javadoc・非推奨理由を検索します。省略・空白の場合は全イベントを一覧します。 |
| `version` | `latest` (default) or a supported Minecraft version from `GET /api/versions`. 省略時は最新版。使用可能な版はバージョン一覧APIで確認できます。                                                                                                                            |
| `source`  | Comma-separated `spigot,paper,purpur,bungee,velocity`. Omitted selects all; explicitly empty selects none. Unknown values do not match. カンマ区切りで絞り込みます。省略時は全対象、空文字を指定すると対象なしとなり、不明な値は一致しません。                           |
| `lang`    | `ja` (default) or `en`. Selects the response description language; searches always use both languages. 説明の表示言語であり、検索対象の言語は制限しません。                                                                                                              |
| `limit`   | Page size, 1–100; default 20. 1ページの件数。                                                                                                                                                                                                                            |
| `offset`  | Nonnegative integer starting position; default 0. 取得開始位置。                                                                                                                                                                                                         |

Integer pagination values are clamped to their bounds; malformed/non-integer values use the defaults. Whitespace and `AND` require all terms in the same event. `OR` separates alternatives; `AND` has higher precedence. Quoted phrases match a contiguous phrase within a field or keyword, and quoted operators are literal text. Full-width Latin characters are normalized; matching is case-insensitive. Common English stop words are ignored outside quotes, and simple plural/Japanese ending normalization is supported. A nonempty query containing only ignored words/operators returns zero matches.

ページ指定の整数は範囲内に補正し、不正な値や整数以外は既定値を使います。空白と `AND` は同じイベント内ですべての語に一致する条件、`OR` はいずれかに一致する条件です。`AND` を先に評価します。引用符で囲むと、1つの説明欄やキーワード内の連続したフレーズを検索し、演算子も文字列として扱います。全角英数字と大文字・小文字の違いを吸収し、引用符の外では一般的な英語の機能語を除外します。簡単な英語の複数形・日本語の語尾も補正します。空ではない検索語が除外語や演算子だけの場合、一致件数は0件です。

## Examples / 例

```bash
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=mining&lang=en'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%E9%9B%A2%E5%B8%AD&source=purpur&lang=ja'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=%22block%20break%22&source=spigot'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?q=chat%20OR%20login&version=1.21.11'
curl -fsSL 'https://spigot-event-list.s7a.dev/api/search/events?limit=50&offset=100'
```

## Response / レスポンス

The following illustrates one result for `q=mining&lang=en&limit=1`. `total` is the full number of matches; `count` is the number returned on this page. `description` and `deprecateDescription` are strings in the requested language. `keywords` contains both languages. Optional Javadoc and deprecation fields are omitted when unavailable. Counts are illustrative and change as the dataset changes.

以下は1件取得したレスポンスの例です。`total` は全一致件数、`count` は現在のページの件数です。`description` と `deprecateDescription` は指定言語の文字列、`keywords` は日英の配列を持つオブジェクトです。Javadocや非推奨情報が存在しない場合、それらのフィールドは省略されます。件数は説明用の例であり、データ更新により変わります。

```json
{
  "query": "mining",
  "version": "latest",
  "count": 1,
  "total": 4,
  "offset": 0,
  "nextOffset": 1,
  "events": [
    {
      "version": "latest",
      "name": "BlockBreakEvent",
      "source": "spigot",
      "link": "https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockBreakEvent.html",
      "description": "Called when a block is broken by a player.",
      "keywords": {
        "ja": [
          "ブロック破壊",
          "採掘",
          "掘る",
          "掘削",
          "壊す",
          "ブロックを壊す",
          "プレイヤーによる破壊",
          "採鉱",
          "経験値ドロップ"
        ],
        "en": [
          "block break",
          "mining",
          "dig",
          "excavation",
          "digging",
          "break blocks",
          "player block breaking",
          "mine block",
          "experience drops"
        ]
      }
    }
  ]
}
```

Request the same query, filters and limit with `offset=nextOffset` to continue. A null `nextOffset` marks the end. The Web app loads pages with “Load more,” so results are not truncated to 100 events. Keywords are used for matching and returned by the API, but are not displayed on event cards.

続きは検索語・絞り込み・件数を維持して `offset=nextOffset` で取得します。`nextOffset` が `null` なら最終ページです。Webでは「さらに表示」で続きのページを読み込めるため、100件で打ち切られません。キーワードは検索条件に使いAPIでも返しますが、イベントの画面表示には含めません。

- Results rank exact names, partial names, keywords, descriptions, Javadoc, and deprecation notes, then break ties by name, source and link. Browsing uses name, source and link order.
- An offset beyond the result set returns an empty page with the original total.
- Unsupported versions return HTTP 404; unsupported languages return HTTP 400. These errors use plain-text bodies. Other failures can return HTTP 500; check the HTTP status before decoding JSON.
- `GET /api/versions/{version}/events?lang=ja` exposes the same event fields without the per-event `version` field and returns an array without pagination.
- Web server data reads are cached for at most 60 seconds after each successful load, with a bounded cache. Failed loads are retried on the next request. Downloader reads remain uncached.

結果はイベント名・キーワード・説明・Javadoc・非推奨理由の順に関連度を評価し、同点なら名前・ソース・リンク順で並べます。通常のイベント一覧APIもキーワードとJavadocを返します。説明の根拠は `link` から確認でき、WebではJavadoc本文を展開して比較できます。

## Version discovery / バージョンの選択

`GET /api/versions` returns the `latest` alias, `latestMinecraftVersion`, and accepted versions. The current `latestMinecraftVersion` is an explicit alias for the latest merged dataset; the response retains the requested version. After latest advances, the previous version uses its fixed snapshot if available, or returns `404 Unsupported version`. Fixed server snapshots include the latest proxy data. `latestMinecraftVersion` is `null` while Paper, Purpur and Spigot disagree on the current stable Minecraft version.

`GET /api/versions` で使用可能な版を確認できます。現在の `latestMinecraftVersion` を明示した場合も最新の統合データを読み込み、応答には指定した版を保持します。最新版が進んだ後は、その版の保存済みデータがあれば読み込み、なければ404になります。過去版のサーバーデータにも最新のプロキシデータを含みます。Paper・Purpur・Spigotの安定版が一致していない間、`latestMinecraftVersion` は `null` です。

## Search guidance

- Use `A B` or `A AND B` when both conditions should match.
- Use `A OR B` for alternatives or synonyms.
- Mix Japanese and English alternatives when helpful, for example `参加 OR ログイン OR join OR login`.
- Use English expansion for languages absent from the dataset.
