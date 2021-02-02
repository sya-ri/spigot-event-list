# Spigot Event List
Bukkit, Spigot, Paper のイベント一覧です。

## 参考にしている Javadoc
{{#each javadoc_links}}
- {{javadocUrl}} [`{{version}}`]({{downloadUrl}})
{{/each}}

## 環境毎のイベント一覧
{{#each only_links}}
- [{{name}}]({{link}})
{{/each}}

## イベント一覧
{{#each list}}
### `{{source}}` [{{name}}]({{link}})
{{#if deprecated}}
`@Deprecated` {{deprecateMessage}}

{{/if}}
{{description}}
{{/each}}
