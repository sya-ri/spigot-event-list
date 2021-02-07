<!--

自動生成です。直接編集しないでください。

-->
# 非推奨イベント

## イベント一覧
### `bukkit` [EntityCreatePortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCreatePortalEvent.html)
`@Deprecated` ワールドに関するイベントとして定義された [PortalCreateEvent](README.md#bukkit-portalcreateevent) を使う。

エンティティがポータルを作成する時に呼び出される。
### `bukkit` [EntityPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPlaceEvent.html)
`@Deprecated` 仮実装中。

エンティティが設置された時に呼び出される。このイベントは現在、アーマースタンド・ボート・トロッコ・エンドクリスタルでのみ呼び出される。
### `paper` [EntityTransformedEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityTransformedEvent.html)
`@Deprecated` Bukkit に追加された [EntityTransformEvent](README.md#bukkit-entitytransformevent) を使う。

エンティティが別のエンティティに置きかわる時に呼び出される。
### `paper` [IllegalPacketEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/IllegalPacketEvent.html)
`@Deprecated` 使われていない。

不正なパケットが送られた時に呼び出される。
### `bukkit` [PlayerChatEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChatEvent.html)
`@Deprecated` チャットの遅延が発生するので [AsyncPlayerChatEvent](README.md#bukkit-asyncplayerchatevent) を使う。

プレイヤーがチャットする時に呼び出される。
### `bukkit` [PlayerChatTabCompleteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChatTabCompleteEvent.html)
`@Deprecated` クライアントの変更により実行されなくなった。

プレイヤーがチャットメッセージでタブ補完をする時に呼び出される。
### `paper` [PlayerInitialSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerInitialSpawnEvent.html)
`@Deprecated` Spigot に追加された [PlayerSpawnLocationEvent](README.md#spigot-playerspawnlocationevent) を使う。

プレイヤーがサーバーに参加した後、スポーンしようとしている時に呼び出される。
### `paper` [PlayerLocaleChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerLocaleChangeEvent.html)
`@Deprecated` Bukkit に追加された [PlayerLocaleChangeEvent](README.md#bukkit-playerlocalechangeevent) を使う。

プレイヤーが言語設定を変更した時に呼び出される。
### `bukkit` [PlayerPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPickupItemEvent.html)
`@Deprecated` Bukkit に追加された [EntityPickupItemEvent](README.md#bukkit-entitypickupitemevent) を使う。


### `bukkit` [PlayerPreLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPreLoginEvent.html)
`@Deprecated` 非同期で処理をする為に [AsyncPlayerPreLoginEvent](README.md#bukkit-asyncplayerpreloginevent) を使う。


### `paper` [PrepareGrindstoneEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/inventory/PrepareGrindstoneEvent.html)
`@Deprecated` 

砥石の使用準備が出来た時に呼び出される。完成アイテムが表示される毎に発生する。

[<< 戻る](README.md)