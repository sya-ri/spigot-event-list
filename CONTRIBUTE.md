# Contribute

## コマンド

### イベント内容の更新
#### Javadoc の内容を適応
```shell
npm run download
```

#### events.yaml の変更を適応
```shell
npm run generate
```

### 依存関係の更新
```shell
npm run ncu:update
```

## コミットメッセージテンプレート

### バージョンの更新
```
Bump versions
* Dependency
<name> <last_version> -> <version>

* EventSource
<name> v<last_version> -> v<version>
```

#### イベントの説明を追加
```
イベントの説明を追加
- <event_name>
```

#### イベントの説明を変更
```
イベントの説明を変更
- <event_name>
<description>

```
