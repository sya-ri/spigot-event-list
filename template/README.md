# Spigot Event List
Bukkit, Spigot, Paper, Purpur, Yatopia のイベント一覧です。
イベントについて簡単な説明が書かれていますが、詳しい内容は Javadoc を参照してください。
不明点や指摘については Issue や PullRequest にお願いします。

## 参考にしている Javadoc
{{#each javadoc_links}}
- {{javadocUrl}} [`{{version}}`]({{downloadUrl}})
{{/each}}

## 環境毎のイベント一覧
{{#each only_links}}
- [{{name}}]({{link}})
{{/each}}
  
## その他
- [非推奨イベント一覧]({{deprecate_link}})

## イベント一覧
{{#each list}}
### `{{source}}` [{{name}}]({{link}})
{{#if deprecate}}
`@Deprecated` {{deprecateDescription}}

{{/if}}
{{description}}
{{/each}}
