<!--

自動生成です。直接編集しないでください。

-->
# paper

## イベント一覧
### `paper` [AnvilDamagedEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/AnvilDamagedEvent.html)
使用したことで金床が損傷する時に呼び出される。
### `paper` [AsyncTabCompleteEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/AsyncTabCompleteEvent.html)
タブ補完を行う時に呼び出される。非同期で処理される。このイベントが結果を返す時、標準のタブ補完処理は発生しない。ただし、 [TabCompleteEvent](README.md#bukkit-tabcompleteevent) は非同期の結果と共に呼び出される。
### `paper` [BeaconEffectEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/BeaconEffectEvent.html)
ビーコンの効果がプレイヤーに適用される時に呼び出される。
### `paper` [BellRingEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BellRingEvent.html)
ベルが鳴る時に呼び出される。
### `paper` [BlockDestroyEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/BlockDestroyEvent.html)
サーバーがブロックを破棄する時に呼び出される。
### `paper` [BlockFailedDispenseEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BlockFailedDispenseEvent.html)
ディスペンサーにアイテムが存在せず、射出されなかった時に呼び出される。
### `paper` [BlockPreDispenseEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BlockPreDispenseEvent.html)
ディスペンサーからアイテムが射出される時に呼び出される。[BlockDispenseEvent](README.md#bukkit-blockdispenseevent) の前に呼び出されるので、ディスペンサーのアイテム消費もキャンセルできる。
### `paper` [CreeperIgniteEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/CreeperIgniteEvent.html)
クリーパーの点火状態が切り替わる時に呼び出される。
### `paper` [DragonEggFormEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/DragonEggFormEvent.html)
エンダードラゴンが討伐され、卵が設置される時に呼び出される。
### `paper` [EnderDragonFireballHitEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonFireballHitEvent.html)
エンダードラゴンが放った火球が衝突し、AreaEffectCloud が発生する時に呼び出される。
### `paper` [EnderDragonFlameEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonFlameEvent.html)
エンダードラゴンが炎を吐き、AreaEffectCloud が発生する時に呼び出される。
### `paper` [EnderDragonShootFireballEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonShootFireballEvent.html)
エンダードラゴンが火球を放つ時に呼び出される。
### `paper` [EndermanAttackPlayerEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EndermanAttackPlayerEvent.html)
エンダーマンがプレイヤーを攻撃するか決定する時に呼び出される。
### `paper` [EndermanEscapeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EndermanEscapeEvent.html)
エンダーマンが逃げた時に呼び出される。
### `paper` [EntityAddToWorldEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityAddToWorldEvent.html)
何らかの理由でワールドにエンティティが増えた時に呼び出される。
### `paper` [EntityJumpEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityJumpEvent.html)
エンティティがジャンプする時に呼び出される。
### `paper` [EntityKnockbackByEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityKnockbackByEntityEvent.html)
エンティティによってエンティティがノックバックする時に呼び出される。
### `paper` [EntityLoadCrossbowEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/entity/EntityLoadCrossbowEvent.html)
エンティティがアイテムをクロスボウに装填する時に呼び出される。
### `paper` [EntityMoveEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/entity/EntityMoveEvent.html)
エンティティが移動する時に呼び出される。
### `paper` [EntityPathfindEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityPathfindEvent.html)
エンティティが目的の場所への移動を開始する時に呼び出される。
### `paper` [EntityRemoveFromWorldEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityRemoveFromWorldEvent.html)
何らかの理由でワールドからエンティティが削除される時に呼び出される。
### `paper` [EntityTeleportEndGatewayEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityTeleportEndGatewayEvent.html)
エンティティがエンドゲートウェイでテレポートする時に呼び出される。
### `paper` [EntityTransformedEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityTransformedEvent.html)
`@Deprecated` Bukkit に追加された [EntityTransformEvent](README.md#bukkit-entitytransformevent) を使う。

エンティティが別のエンティティに置きかわる時に呼び出される。
### `paper` [EntityZapEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityZapEvent.html)
エンティティに落雷が当たった時に呼び出される。
### `paper` [ExperienceOrbMergeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ExperienceOrbMergeEvent.html)
経験値オーブが合わさる時に呼び出される。
### `paper` [FillProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/FillProfileEvent.html)
プロファイルプロパティが追加された時に呼び出される。
### `paper` [GS4QueryEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/GS4QueryEvent.html)
GS4クエリプロトコルがクエリされた時に呼び出される。
### `paper` [IllegalPacketEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/IllegalPacketEvent.html)
`@Deprecated` 使われていない。

不正なパケットが送られた時に呼び出される。
### `paper` [LookupProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/LookupProfileEvent.html)
Mojang API を用いてプロファイルが検索された時に呼び出される。
### `paper` [LootableInventoryReplenishEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/loottable/LootableInventoryReplenishEvent.html)
LootTable によってアイテムが補充される時に呼び出される。
### `paper` [PaperServerListPingEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/PaperServerListPingEvent.html)
サーバーリストの表示内容を送る要求を受けた時に呼び出される。[ServerListPingEvent](README.md#bukkit-serverlistpingevent) よりも扱える情報が多い。
### `paper` [PhantomPreSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PhantomPreSpawnEvent.html)
ファントムがスポーンする時に呼び出される。
### `paper` [PlayerAdvancementCriterionGrantEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerAdvancementCriterionGrantEvent.html)
プレイヤーが進捗の条件を達成した時に呼び出される。
### `paper` [PlayerArmorChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerArmorChangeEvent.html)
プレイヤーの鎧が変更された時に呼び出される。
### `paper` [PlayerAttackEntityCooldownResetEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerAttackEntityCooldownResetEvent.html)
プレイヤーの攻撃クールダウンがリセットする時に呼び出される。
### `paper` [PlayerChangeBeaconEffectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerChangeBeaconEffectEvent.html)
プレイヤーがビーコンの効果を変更する時に呼び出される。
### `paper` [PlayerChunkLoadEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/packet/PlayerChunkLoadEvent.html)
プレイヤーがチャンクロードパケットを受け取った時に呼び出される。行いたい処理がパケットやクライアントに関する場合でのみ使うイベントになる。
### `paper` [PlayerChunkUnloadEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/packet/PlayerChunkUnloadEvent.html)
プレイヤーがチャンクアンロードパケットを受け取った時に呼び出される。行いたい処理がパケットやクライアントに関する場合でのみ使うイベントになる。
### `paper` [PlayerClientOptionsChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerClientOptionsChangeEvent.html)
プレイヤーがクライアント設定を変更した時に呼び出される。
### `paper` [PlayerConnectionCloseEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerConnectionCloseEvent.html)
プレイヤーがサーバーから切断された時に呼び出される。
### `paper` [PlayerElytraBoostEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerElytraBoostEvent.html)
プレイヤーが花火を使いエリトラ飛行のブーストをする時に呼び出される。
### `paper` [PlayerFlowerPotManipulateEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerFlowerPotManipulateEvent.html)
プレイヤーが植木鉢にアイテムを置いたり、植木鉢からアイテムを取り出したりする時に呼び出される。
### `paper` [PlayerHandshakeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerHandshakeEvent.html)
プレイヤーとサーバーがハンドシェイクする時に呼び出される。
### `paper` [PlayerInitialSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerInitialSpawnEvent.html)
`@Deprecated` Spigot に追加された [PlayerSpawnLocationEvent](README.md#spigot-playerspawnlocationevent) を使う。

プレイヤーがサーバーに参加した後、スポーンしようとしている時に呼び出される。
### `paper` [PlayerItemCooldownEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerItemCooldownEvent.html)
プレイヤーのアイテムクールダウンが変更される時に呼び出される。
### `paper` [PlayerJumpEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerJumpEvent.html)
プレイヤーがジャンプする時に呼び出される。
### `paper` [PlayerLaunchProjectileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerLaunchProjectileEvent.html)
プレイヤーが Projectile を発射する時に呼び出される。
### `paper` [PlayerLecternPageChangeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerLecternPageChangeEvent.html)
プレイヤーが書見台に置かれた本のページを変更する時に呼び出される。
### `paper` [PlayerLocaleChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerLocaleChangeEvent.html)
`@Deprecated` Bukkit に追加された [PlayerLocaleChangeEvent](README.md#bukkit-playerlocalechangeevent) を使う。

プレイヤーが言語設定を変更した時に呼び出される。
### `paper` [PlayerLoomPatternSelectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerLoomPatternSelectEvent.html)
プレイヤーが機織り機の旗模様を変更する時に呼び出される。
### `paper` [PlayerNaturallySpawnCreaturesEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PlayerNaturallySpawnCreaturesEvent.html)
モンスターをスポーンさせるチャンクを計算する時に呼び出される。
### `paper` [PlayerPickupExperienceEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerPickupExperienceEvent.html)
プレイヤーが地面から経験値オーブを拾う時に呼び出される。
### `paper` [PlayerPostRespawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerPostRespawnEvent.html)
プレイヤーがリスポーンした後に呼び出される。
### `paper` [PlayerReadyArrowEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerReadyArrowEvent.html)
プレイヤーが弓を発射し、使用する矢を選ぶ時に呼び出される。
### `paper` [PlayerRecipeBookClickEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerRecipeBookClickEvent.html)
プレイヤーがレシピブックのレシビをクリックする時に呼び出される。
### `paper` [PlayerShearBlockEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/PlayerShearBlockEvent.html)
プレイヤーがブロックに対してハサミを使用する時に呼び出される。以下に例を示す。
- カボチャを彫ったカボチャに変える時。
- 蜂の巣からハニカムを回収する時。
### `paper` [PlayerStartSpectatingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerStartSpectatingEntityEvent.html)
プレイヤーがスペクテイターモードでエンティティ視点を開始する時に呼び出される。
### `paper` [PlayerStonecutterRecipeSelectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerStonecutterRecipeSelectEvent.html)
プレイヤーが石切台のレシピを選択する時に呼び出される。
### `paper` [PlayerStopSpectatingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerStopSpectatingEntityEvent.html)
プレイヤーがスペクテイターモードでエンティティ視点を終了する時に呼び出される。
### `paper` [PlayerTeleportEndGatewayEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerTeleportEndGatewayEvent.html)
プレイヤーがエンドゲートウェイを用いてテレポートする時に呼び出される。
### `paper` [PlayerTradeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerTradeEvent.html)
プレイヤーが村人や行商人と交易をする時に呼び出される。
### `paper` [PlayerUseUnknownEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerUseUnknownEntityEvent.html)
不明。
### `paper` [PreCreatureSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PreCreatureSpawnEvent.html)
生き物がスポーンする時に呼び出される。このイベントの目的はサーバーのパフォーマンスを向上させることであるため、[CreatureSpawnEvent](README.md#bukkit-creaturespawnevent) が呼び出される全ての状況で呼び出されるわけではない。
### `paper` [PreFillProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/PreFillProfileEvent.html)
不完全なプロファイルプロパティの追加を要求している時に呼び出される。
### `paper` [PreLookupProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/PreLookupProfileEvent.html)
Mojang API を用いてプロファイルを検索する時に呼び出される。
### `paper` [PreSpawnerSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PreSpawnerSpawnEvent.html)
エンティティがスポナーによってスポーンする前に呼び出される。[SpawnerSpawnEvent](README.md#bukkit-spawnerspawnevent) よりも前に呼び出される。
### `paper` [PrepareGrindstoneEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/inventory/PrepareGrindstoneEvent.html)
`@Deprecated` このイベントを直接使用せず、[PrepareResultEvent](README.md#paper-prepareresultevent) を使うことが推奨されている。

砥石の使用準備が出来た時に呼び出される。完成アイテムが表示される毎に発生する。
### `paper` [PrepareResultEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/inventory/PrepareResultEvent.html)
結果スロットを含むインベントリにアイテムが配置された時に呼び出される。
### `paper` [ProfileWhitelistVerifyEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/ProfileWhitelistVerifyEvent.html)
プレイヤーがホワイトリストに登録されているか確認する時に呼び出される。
### `paper` [ProjectileCollideEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ProjectileCollideEvent.html)
Projectile がエンティティと衝突する時に呼び出される。キャンセルすると Projectile は飛び続ける。
### `paper` [ServerExceptionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerExceptionEvent.html)
回復可能な状況で例外が発生した時に呼び出される。
### `paper` [ServerResourcesReloadedEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/server/ServerResourcesReloadedEvent.html)
データパックなどのリソースがリロードされた時に呼び出される。カスタムレシピを再登録するために使用することを目的としている。
### `paper` [ServerTickEndEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerTickEndEvent.html)
メインループのチェックが終了した時に呼び出される。
### `paper` [ServerTickStartEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerTickStartEvent.html)
メインループのチェックが開始した時に呼び出される。
### `paper` [SkeletonHorseTrapEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SkeletonHorseTrapEvent.html)
プレイヤーがスケルトンホースに近づき、落雷が発生する時に呼び出される。
### `paper` [SlimeChangeDirectionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeChangeDirectionEvent.html)
スライムが向きを変えようと決めた時に呼び出される。
### `paper` [SlimePathfindEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimePathfindEvent.html)
スライムが移動を開始しようと決めた時に呼び出される。
### `paper` [SlimeSwimEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeSwimEvent.html)
スライムが水や溶岩にいる状態でジャンプしようと決めた時に呼び出される。
### `paper` [SlimeTargetLivingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeTargetLivingEntityEvent.html)
スライムがエンティティを標的として移動を開始しようと決めた時に呼び出される。
### `paper` [SlimeWanderEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeWanderEvent.html)
スライムがランダムに移動することを決めた時に呼び出される。
### `paper` [StructureLocateEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/world/StructureLocateEvent.html)
建造物が見つかる時に呼び出される。以下に例を示す。
- /locate コマンドを実行した時
- エンダーアイを使用した時
- 宝の地図が開かれた時
### `paper` [TNTPrimeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/TNTPrimeEvent.html)
TNT に着火する時に呼び出される。
### `paper` [TargetHitEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/TargetHitEvent.html)
ターゲットブロックに Projectile が当たる時に呼び出される。
### `paper` [ThrownEggHatchEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ThrownEggHatchEvent.html)
投げられた卵が孵化するかの確認をする時に呼び出される。
### `paper` [TurtleGoHomeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleGoHomeEvent.html)
カメが家に帰ることを決めた時に呼び出される。
### `paper` [TurtleLayEggEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleLayEggEvent.html)
カメの卵が孵化する時に呼び出される。
### `paper` [TurtleStartDiggingEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleStartDiggingEvent.html)
カメが産卵のために掘り始めた時に呼び出される。
### `paper` [WhitelistToggleEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/WhitelistToggleEvent.html)
ホワイトリストが切り替わった時に呼び出される。
### `paper` [WitchConsumePotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchConsumePotionEvent.html)
ウィッチがポーションを自分自身で消費する時に呼び出される。
### `paper` [WitchReadyPotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchReadyPotionEvent.html)
ウィッチのポーションの準備が出来る時に呼び出される。
### `paper` [WitchThrowPotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchThrowPotionEvent.html)
ウィッチがポーションを投げる時に呼び出される。
### `paper` [WorldGameRuleChangeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/world/WorldGameRuleChangeEvent.html)
ワールドのゲームルールが変更される時に呼び出される。

[<< 戻る](README.md)