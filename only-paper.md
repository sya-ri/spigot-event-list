<!--

自動生成です。直接編集しないでください。

-->
# paper

## イベント一覧
### `paper` [AnvilDamagedEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/AnvilDamagedEvent.html)
使用したことで金床が損傷する際に呼び出される。
### `paper` [AsyncTabCompleteEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/AsyncTabCompleteEvent.html)
タブ補完を行う際に呼び出される。非同期で処理される。このイベントが結果を返す時、標準のタブ補完処理は発生しない。ただし、 [TabCompleteEvent](README.md#bukkit-tabcompleteevent) は非同期の結果と共に呼び出される。
### `paper` [BeaconEffectEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/BeaconEffectEvent.html)
ビーコンの効果がプレイヤーに適用される際に呼び出される。
### `paper` [BellRingEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BellRingEvent.html)
ベルが鳴る際に呼び出される。
### `paper` [BlockDestroyEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/BlockDestroyEvent.html)
サーバーがブロックを破棄する際に呼び出される。
### `paper` [BlockFailedDispenseEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BlockFailedDispenseEvent.html)
ディスペンサーにアイテムが存在せず、射出されなかった際に呼び出される。
### `paper` [BlockPreDispenseEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BlockPreDispenseEvent.html)
ディスペンサーからアイテムが射出される際に呼び出される。[BlockDispenseEvent](README.md#bukkit-blockdispenseevent) の前に呼び出されるので、ディスペンサーのアイテム消費もキャンセルできる。
### `paper` [CreeperIgniteEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/CreeperIgniteEvent.html)
クリーパーの点火状態が切り替わる際に呼び出される。
### `paper` [DragonEggFormEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/DragonEggFormEvent.html)
エンダードラゴンが討伐され、卵が設置される際に呼び出される。
### `paper` [EnderDragonFireballHitEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonFireballHitEvent.html)
エンダードラゴンが放った火球が衝突し、AreaEffectCloud が発生する際に呼び出される。
### `paper` [EnderDragonFlameEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonFlameEvent.html)
エンダードラゴンが炎を吐き、AreaEffectCloud が発生する際に呼び出される。
### `paper` [EnderDragonShootFireballEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonShootFireballEvent.html)
エンダードラゴンが火球を放つ際に呼び出される。
### `paper` [EndermanAttackPlayerEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EndermanAttackPlayerEvent.html)
エンダーマンがプレイヤーを攻撃するか決定する際に呼び出される。
### `paper` [EndermanEscapeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EndermanEscapeEvent.html)
エンダーマンが逃げた際に呼び出される。
### `paper` [EntityAddToWorldEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityAddToWorldEvent.html)
何らかの理由でワールドにエンティティが増えた際に呼び出される。
### `paper` [EntityJumpEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityJumpEvent.html)
エンティティがジャンプする際に呼び出される。
### `paper` [EntityKnockbackByEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityKnockbackByEntityEvent.html)
エンティティによってエンティティがノックバックする際に呼び出される。
### `paper` [EntityLoadCrossbowEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/entity/EntityLoadCrossbowEvent.html)
エンティティがアイテムをクロスボウに装填する際に呼び出される。
### `paper` [EntityMoveEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/entity/EntityMoveEvent.html)
エンティティが移動する際に呼び出される。
### `paper` [EntityPathfindEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityPathfindEvent.html)
エンティティが目的の場所への移動を開始する際に呼び出される。
### `paper` [EntityRemoveFromWorldEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityRemoveFromWorldEvent.html)
何らかの理由でワールドからエンティティが削除される際に呼び出される。
### `paper` [EntityTeleportEndGatewayEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityTeleportEndGatewayEvent.html)
エンティティがエンドゲートウェイでテレポートする際に呼び出される。
### `paper` [EntityTransformedEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityTransformedEvent.html)
`@Deprecated` Bukkit に追加された [EntityTransformEvent](README.md#bukkit-entitytransformevent) を使う。

エンティティが別のエンティティに置きかわる際に呼び出される。
### `paper` [EntityZapEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityZapEvent.html)
エンティティに落雷が当たった際に呼び出される。
### `paper` [ExperienceOrbMergeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ExperienceOrbMergeEvent.html)
経験値オーブが合わさる際に呼び出される。
### `paper` [FillProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/FillProfileEvent.html)
プロファイルプロパティが追加された際に呼び出される。
### `paper` [GS4QueryEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/GS4QueryEvent.html)
GS4クエリプロトコルがクエリされた際に呼び出される。
### `paper` [IllegalPacketEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/IllegalPacketEvent.html)
`@Deprecated` 使われていない。

不正なパケットが送られた際に呼び出される。
### `paper` [LookupProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/LookupProfileEvent.html)

### `paper` [LootableInventoryReplenishEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/loottable/LootableInventoryReplenishEvent.html)

### `paper` [PaperServerListPingEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/PaperServerListPingEvent.html)

### `paper` [PhantomPreSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PhantomPreSpawnEvent.html)

### `paper` [PlayerAdvancementCriterionGrantEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerAdvancementCriterionGrantEvent.html)

### `paper` [PlayerArmorChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerArmorChangeEvent.html)

### `paper` [PlayerAttackEntityCooldownResetEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerAttackEntityCooldownResetEvent.html)

### `paper` [PlayerChangeBeaconEffectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerChangeBeaconEffectEvent.html)

### `paper` [PlayerChunkLoadEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/packet/PlayerChunkLoadEvent.html)

### `paper` [PlayerChunkUnloadEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/packet/PlayerChunkUnloadEvent.html)

### `paper` [PlayerClientOptionsChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerClientOptionsChangeEvent.html)

### `paper` [PlayerConnectionCloseEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerConnectionCloseEvent.html)

### `paper` [PlayerElytraBoostEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerElytraBoostEvent.html)

### `paper` [PlayerFlowerPotManipulateEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerFlowerPotManipulateEvent.html)

### `paper` [PlayerHandshakeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerHandshakeEvent.html)

### `paper` [PlayerInitialSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerInitialSpawnEvent.html)
`@Deprecated` Spigot に追加された [PlayerSpawnLocationEvent](README.md#spigot-playerspawnlocationevent) を使う。


### `paper` [PlayerItemCooldownEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerItemCooldownEvent.html)

### `paper` [PlayerJumpEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerJumpEvent.html)

### `paper` [PlayerLaunchProjectileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerLaunchProjectileEvent.html)

### `paper` [PlayerLecternPageChangeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerLecternPageChangeEvent.html)

### `paper` [PlayerLocaleChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerLocaleChangeEvent.html)
`@Deprecated` Bukkit に追加された [PlayerLocaleChangeEvent](README.md#bukkit-playerlocalechangeevent) を使う。


### `paper` [PlayerLoomPatternSelectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerLoomPatternSelectEvent.html)

### `paper` [PlayerNaturallySpawnCreaturesEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PlayerNaturallySpawnCreaturesEvent.html)

### `paper` [PlayerPickupExperienceEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerPickupExperienceEvent.html)

### `paper` [PlayerPostRespawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerPostRespawnEvent.html)

### `paper` [PlayerReadyArrowEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerReadyArrowEvent.html)

### `paper` [PlayerRecipeBookClickEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerRecipeBookClickEvent.html)

### `paper` [PlayerShearBlockEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/PlayerShearBlockEvent.html)

### `paper` [PlayerStartSpectatingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerStartSpectatingEntityEvent.html)

### `paper` [PlayerStonecutterRecipeSelectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerStonecutterRecipeSelectEvent.html)

### `paper` [PlayerStopSpectatingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerStopSpectatingEntityEvent.html)

### `paper` [PlayerTeleportEndGatewayEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerTeleportEndGatewayEvent.html)

### `paper` [PlayerTradeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerTradeEvent.html)

### `paper` [PlayerUseUnknownEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerUseUnknownEntityEvent.html)

### `paper` [PreCreatureSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PreCreatureSpawnEvent.html)

### `paper` [PreFillProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/PreFillProfileEvent.html)

### `paper` [PreLookupProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/PreLookupProfileEvent.html)

### `paper` [PreSpawnerSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PreSpawnerSpawnEvent.html)

### `paper` [PrepareGrindstoneEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/inventory/PrepareGrindstoneEvent.html)
`@Deprecated` 


### `paper` [PrepareResultEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/inventory/PrepareResultEvent.html)

### `paper` [ProfileWhitelistVerifyEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/ProfileWhitelistVerifyEvent.html)

### `paper` [ProjectileCollideEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ProjectileCollideEvent.html)

### `paper` [ServerExceptionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerExceptionEvent.html)

### `paper` [ServerResourcesReloadedEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/server/ServerResourcesReloadedEvent.html)

### `paper` [ServerTickEndEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerTickEndEvent.html)

### `paper` [ServerTickStartEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerTickStartEvent.html)

### `paper` [SkeletonHorseTrapEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SkeletonHorseTrapEvent.html)

### `paper` [SlimeChangeDirectionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeChangeDirectionEvent.html)

### `paper` [SlimePathfindEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimePathfindEvent.html)

### `paper` [SlimeSwimEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeSwimEvent.html)

### `paper` [SlimeTargetLivingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeTargetLivingEntityEvent.html)

### `paper` [SlimeWanderEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeWanderEvent.html)

### `paper` [StructureLocateEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/world/StructureLocateEvent.html)

### `paper` [TNTPrimeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/TNTPrimeEvent.html)

### `paper` [TargetHitEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/TargetHitEvent.html)

### `paper` [ThrownEggHatchEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ThrownEggHatchEvent.html)

### `paper` [TurtleGoHomeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleGoHomeEvent.html)

### `paper` [TurtleLayEggEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleLayEggEvent.html)

### `paper` [TurtleStartDiggingEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleStartDiggingEvent.html)

### `paper` [WhitelistToggleEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/WhitelistToggleEvent.html)

### `paper` [WitchConsumePotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchConsumePotionEvent.html)

### `paper` [WitchReadyPotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchReadyPotionEvent.html)

### `paper` [WitchThrowPotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchThrowPotionEvent.html)

### `paper` [WorldGameRuleChangeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/world/WorldGameRuleChangeEvent.html)


[<< 戻る](README.md)