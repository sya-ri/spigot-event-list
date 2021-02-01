<!--

自動生成です。直接編集しないでください。

-->
# bukkit

## イベント一覧
### `bukkit` [AreaEffectCloudApplyEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/AreaEffectCloudApplyEvent.html)
AreaEffectCloud の効果が付与される際に呼び出される。5ティック毎に1回発生する。
### `bukkit` [ArrowBodyCountChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ArrowBodyCountChangeEvent.html)
矢がエンティティの本体に入る・存在する際に呼び出される。
### `bukkit` [AsyncPlayerChatEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/AsyncPlayerChatEvent.html)
プレイヤーがチャットした際に呼び出される。非同期でも同期でも呼び出されることがある。
### `bukkit` [AsyncPlayerPreLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/AsyncPlayerPreLoginEvent.html)
プレイヤーがログインしようとしている際に呼び出される。非同期で処理される。
### `bukkit` [BatToggleSleepEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/BatToggleSleepEvent.html)
コウモリが眠ったり起きたりする際に呼び出される。
### `bukkit` [BlockBreakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockBreakEvent.html)
プレイヤーがブロックを破壊する際に呼び出される。
### `bukkit` [BlockBurnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockBurnEvent.html)
ブロックが燃え尽きて破壊される際に呼び出される。
### `bukkit` [BlockCanBuildEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockCanBuildEvent.html)
ブロックを設置しようとした際に呼び出される。設置可能かどうかを確認する。
### `bukkit` [BlockCookEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockCookEvent.html)
アイテムがブロックを用いて調理される際に呼び出される。
### `bukkit` [BlockDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDamageEvent.html)
プレイヤーがブロックを損傷させる際に呼び出される。
### `bukkit` [BlockDispenseArmorEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDispenseArmorEvent.html)
ディスペンサーから装備可能なアイテムが射出され、エンティティに装備される際に呼び出される。
### `bukkit` [BlockDispenseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDispenseEvent.html)
ディスペンサーからアイテムが射出される際に呼び出される。このイベントをキャンセルしてもアイテムが減るバグが存在するので [BlockPreDispenseEvent](README.md#paper-blockpredispenseevent) を使うことを推奨する。
### `bukkit` [BlockDropItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDropItemEvent.html)
プレイヤーによって破壊されたブロックがアイテムとしてドロップする際に呼び出される。
### `bukkit` [BlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockEvent.html)
ブロック関連のイベントを表す。
### `bukkit` [BlockExpEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockExpEvent.html)
ブロックが経験値を落とす際に呼び出される。
### `bukkit` [BlockExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockExplodeEvent.html)
ブロックが爆発する際に呼び出される。
### `bukkit` [BlockFadeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFadeEvent.html)
自然にブロックが溶けたり消滅したりする際に呼び出される。例を以下に示す。
- 光源によって雪や氷が溶ける時。
- 燃料ブロックを破壊することなく、時間の経過によって火が消える時。
- 水不足によってサンゴが死んだサンゴに変わる時。
- カメが孵化し、カメの卵が破裂する時。
### `bukkit` [BlockFertilizeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFertilizeEvent.html)
プレイヤーが骨粉を使用し、ブロックに変更が生じる際に呼び出される。[StructureGrowEvent](README.md#bukkit-structuregrowevent) の後に呼び出される。
### `bukkit` [BlockFormEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFormEvent.html)
自然にブロックが形成される際に呼び出される。[BlockSpreadEvent](#bukkit-blockspreadevent) とは違い、ランダムに形成されないブロックに対して呼び出される。以下に例を示す。
- 吹雪により雪が積もる時。
- 雪に覆われたバイオームで氷が形成される時。
- 水との接触による黒曜石や丸石の形成される時。
- コンクリートパウダーと水の混合によるコンクリートが成形される時。
### `bukkit` [BlockFromToEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFromToEvent.html)
ブロックの変更が起こる際に呼び出される。液体が流れる時とドラゴンの卵がテレポートする時のみ呼び出される。
### `bukkit` [BlockGrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockGrowEvent.html)
自然に作物等が成長する際に呼び出される。以下に例を示す。
- 小麦
- サトウキビ
- サボテン
- スイカ
- かぼちゃ
- カメの卵
### `bukkit` [BlockIgniteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockIgniteEvent.html)
ブロックが点火された際に呼び出される。
### `bukkit` [BlockMultiPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockMultiPlaceEvent.html)
プレイヤーがマルチブロックを設置する際に呼び出される。
### `bukkit` [BlockPhysicsEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPhysicsEvent.html)
ブロックの落下確認をする際に呼び出される。高頻度で呼び出されるので処理には注意が必要。
### `bukkit` [BlockPistonEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonEvent.html)
ピストンが動作する際に呼び出される。
### `bukkit` [BlockPistonExtendEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonExtendEvent.html)
ピストンが伸びる際に呼び出される。
### `bukkit` [BlockPistonRetractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonRetractEvent.html)
ピストンが縮む際に呼び出される。
### `bukkit` [BlockPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPlaceEvent.html)
プレイヤーがブロックを設置する際に呼び出される。
### `bukkit` [BlockRedstoneEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockRedstoneEvent.html)
レッドストーンの強さが変化する際に呼び出される。
### `bukkit` [BlockShearEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockShearEntityEvent.html)
ディスペンサーが羊の毛も刈る際に呼び出される。
### `bukkit` [BlockSpreadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockSpreadEvent.html)
ブロックが拡散する際に呼び出される。[BlockFormEvent](#bukkit-blockformevent) とは違い、ランダムに形成されるブロックに対して呼び出される。以下に例を示す。
- キノコが増える時。
- 火が燃え広がる時。
### `bukkit` [BrewEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/BrewEvent.html)
醸造が完了する際に呼び出される。
### `bukkit` [BrewingStandFuelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/BrewingStandFuelEvent.html)
燃料としてアイテムが醸造台に使用される際に呼び出される。
### `bukkit` [BroadcastMessageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/BroadcastMessageEvent.html)
サーバーにブロードキャストメッセージが送信された際に呼び出される。メッセージが非同期で送信された場合、イベントも非同期で呼び出される。
### `bukkit` [CauldronLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/CauldronLevelChangeEvent.html)
大釜の水が増えたり減ったりした際に呼び出される。
### `bukkit` [ChunkEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkEvent.html)
チャンク関連のイベントを表す
### `bukkit` [ChunkLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkLoadEvent.html)
チャンクが読み込まれた際に呼び出される。
### `bukkit` [ChunkPopulateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkPopulateEvent.html)
新しいチャンクが作られた際に呼び出される。
### `bukkit` [ChunkUnloadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkUnloadEvent.html)
チャンクの読み込みが停止された際に呼び出される。
### `bukkit` [ConversationAbandonedEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/conversations/ConversationAbandonedEvent.html)
不明。
### `bukkit` [CraftItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/CraftItemEvent.html)
アイテムをクラフトする際に呼び出される。
### `bukkit` [CreatureSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/CreatureSpawnEvent.html)
生き物がスポーンする際に呼び出される。
### `bukkit` [CreeperPowerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/CreeperPowerEvent.html)
クリーパーが雷撃を受ける際に呼び出される。
### `bukkit` [EnchantItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/enchantment/EnchantItemEvent.html)
アイテムにエンチャントした際に呼び出される。
### `bukkit` [EnderDragonChangePhaseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EnderDragonChangePhaseEvent.html)
エンダードラゴンの攻撃フェーズが変わった際に呼び出される。
### `bukkit` [EntityAirChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityAirChangeEvent.html)
エンティティの残り酸素量が変化する際に呼び出される。
### `bukkit` [EntityBlockFormEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/EntityBlockFormEvent.html)
エンティティによってブロックが形成される際に呼び出される。以下に例を示す。
- スノーゴーレムによって雪が形成された時。
- 氷渡りのエンチャントによって氷が形成された時。
### `bukkit` [EntityBreakDoorEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityBreakDoorEvent.html)
エンティティによってドアが破壊される際に呼び出される。
### `bukkit` [EntityBreedEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityBreedEvent.html)
エンティティが繁殖する際に呼び出される。
### `bukkit` [EntityChangeBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityChangeBlockEvent.html)
エンティティがブロックを変化させる際に呼び出される。適したイベントが見当たらない際に呼び出される。
### `bukkit` [EntityCombustByBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustByBlockEvent.html)
ブロックによってエンティティが炎上する際に呼び出される。
### `bukkit` [EntityCombustByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustByEntityEvent.html)
エンティティによってエンティティが炎上する際に呼び出される。
### `bukkit` [EntityCombustEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustEvent.html)
エンティティが炎上する際に呼び出される。
### `bukkit` [EntityCreatePortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCreatePortalEvent.html)
エンティティがポータルを作成する際に呼び出される。[PortalCreateEvent](README.md#bukkit-portalcreateevent) を使うことが推奨されている。
### `bukkit` [EntityDamageByBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageByBlockEvent.html)
ブロックによってエンティティがダメージを受ける際に呼び出される。
### `bukkit` [EntityDamageByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageByEntityEvent.html)
エンティティによってエンティティがダメージを受ける際に呼び出される。
### `bukkit` [EntityDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageEvent.html)
エンティティがダメージを受ける際に呼び出される。
### `bukkit` [EntityDeathEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDeathEvent.html)
エンティティが死ぬ際に呼び出される。
### `bukkit` [EntityDropItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDropItemEvent.html)
エンティティがアイテムをドロップする際に呼び出される。
### `bukkit` [EntityEnterBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEnterBlockEvent.html)
エンティティがブロックの中に入る際に呼び出される。ミツバチが巣箱に入る際に呼び出される。シルバーフィッシュが石に入る際には呼び出されず、[EntityChangeBlockEvent](README.md##bukkit-entitychangeblockevent) が呼び出される。
### `bukkit` [EntityEnterLoveModeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEnterLoveModeEvent.html)
エンティティが発情する際に呼び出される。このイベントをキャンセルしても使用したアイテムは消費されてしまう。
### `bukkit` [EntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEvent.html)
エンティティに関するイベントを表す。
### `bukkit` [EntityExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityExplodeEvent.html)

### `bukkit` [EntityInteractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityInteractEvent.html)

### `bukkit` [EntityPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPickupItemEvent.html)

### `bukkit` [EntityPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPlaceEvent.html)

### `bukkit` [EntityPortalEnterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalEnterEvent.html)

### `bukkit` [EntityPortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalEvent.html)

### `bukkit` [EntityPortalExitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalExitEvent.html)

### `bukkit` [EntityPoseChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPoseChangeEvent.html)

### `bukkit` [EntityPotionEffectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPotionEffectEvent.html)

### `bukkit` [EntityRegainHealthEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityRegainHealthEvent.html)

### `bukkit` [EntityResurrectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityResurrectEvent.html)

### `bukkit` [EntityShootBowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityShootBowEvent.html)

### `bukkit` [EntitySpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntitySpawnEvent.html)

### `bukkit` [EntitySpellCastEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntitySpellCastEvent.html)

### `bukkit` [EntityTameEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTameEvent.html)

### `bukkit` [EntityTargetEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTargetEvent.html)

### `bukkit` [EntityTargetLivingEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTargetLivingEntityEvent.html)

### `bukkit` [EntityTeleportEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTeleportEvent.html)

### `bukkit` [EntityToggleGlideEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityToggleGlideEvent.html)

### `bukkit` [EntityToggleSwimEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityToggleSwimEvent.html)

### `bukkit` [EntityTransformEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTransformEvent.html)

### `bukkit` [EntityUnleashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityUnleashEvent.html)

### `bukkit` [Event](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/Event.html)

### `bukkit` [ExpBottleEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ExpBottleEvent.html)

### `bukkit` [ExplosionPrimeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ExplosionPrimeEvent.html)

### `bukkit` [FireworkExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/FireworkExplodeEvent.html)

### `bukkit` [FluidLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/FluidLevelChangeEvent.html)

### `bukkit` [FoodLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/FoodLevelChangeEvent.html)

### `bukkit` [FurnaceBurnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceBurnEvent.html)

### `bukkit` [FurnaceExtractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceExtractEvent.html)

### `bukkit` [FurnaceSmeltEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceSmeltEvent.html)

### `bukkit` [HangingBreakByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingBreakByEntityEvent.html)

### `bukkit` [HangingBreakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingBreakEvent.html)

### `bukkit` [HangingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingEvent.html)

### `bukkit` [HangingPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingPlaceEvent.html)

### `bukkit` [HorseJumpEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/HorseJumpEvent.html)

### `bukkit` [InventoryClickEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryClickEvent.html)

### `bukkit` [InventoryCloseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryCloseEvent.html)

### `bukkit` [InventoryCreativeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryCreativeEvent.html)

### `bukkit` [InventoryDragEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryDragEvent.html)

### `bukkit` [InventoryEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryEvent.html)

### `bukkit` [InventoryInteractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryInteractEvent.html)

### `bukkit` [InventoryMoveItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryMoveItemEvent.html)

### `bukkit` [InventoryOpenEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryOpenEvent.html)

### `bukkit` [InventoryPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryPickupItemEvent.html)

### `bukkit` [ItemDespawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ItemDespawnEvent.html)

### `bukkit` [ItemMergeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ItemMergeEvent.html)

### `bukkit` [ItemSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ItemSpawnEvent.html)

### `bukkit` [LeavesDecayEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/LeavesDecayEvent.html)

### `bukkit` [LightningStrikeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/LightningStrikeEvent.html)

### `bukkit` [LingeringPotionSplashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/LingeringPotionSplashEvent.html)

### `bukkit` [LootGenerateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/LootGenerateEvent.html)

### `bukkit` [MapInitializeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/MapInitializeEvent.html)

### `bukkit` [MoistureChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/MoistureChangeEvent.html)

### `bukkit` [NotePlayEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/NotePlayEvent.html)

### `bukkit` [PigZapEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PigZapEvent.html)

### `bukkit` [PigZombieAngerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PigZombieAngerEvent.html)

### `bukkit` [PlayerAdvancementDoneEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerAdvancementDoneEvent.html)

### `bukkit` [PlayerAnimationEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerAnimationEvent.html)

### `bukkit` [PlayerArmorStandManipulateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerArmorStandManipulateEvent.html)

### `bukkit` [PlayerAttemptPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerAttemptPickupItemEvent.html)

### `bukkit` [PlayerBedEnterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBedEnterEvent.html)

### `bukkit` [PlayerBedLeaveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBedLeaveEvent.html)

### `bukkit` [PlayerBucketEmptyEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBucketEmptyEvent.html)

### `bukkit` [PlayerBucketEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBucketEvent.html)

### `bukkit` [PlayerBucketFillEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBucketFillEvent.html)

### `bukkit` [PlayerChangedMainHandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChangedMainHandEvent.html)

### `bukkit` [PlayerChangedWorldEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChangedWorldEvent.html)

### `bukkit` [PlayerChannelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChannelEvent.html)

### `bukkit` [PlayerChatEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChatEvent.html)

### `bukkit` [PlayerChatTabCompleteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChatTabCompleteEvent.html)

### `bukkit` [PlayerCommandPreprocessEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerCommandPreprocessEvent.html)

### `bukkit` [PlayerCommandSendEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerCommandSendEvent.html)

### `bukkit` [PlayerDeathEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PlayerDeathEvent.html)

### `bukkit` [PlayerDropItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerDropItemEvent.html)

### `bukkit` [PlayerEditBookEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerEditBookEvent.html)

### `bukkit` [PlayerEggThrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerEggThrowEvent.html)

### `bukkit` [PlayerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerEvent.html)

### `bukkit` [PlayerExpChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerExpChangeEvent.html)

### `bukkit` [PlayerFishEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerFishEvent.html)

### `bukkit` [PlayerGameModeChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerGameModeChangeEvent.html)

### `bukkit` [PlayerHarvestBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerHarvestBlockEvent.html)

### `bukkit` [PlayerInteractAtEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerInteractAtEntityEvent.html)

### `bukkit` [PlayerInteractEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerInteractEntityEvent.html)

### `bukkit` [PlayerInteractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerInteractEvent.html)

### `bukkit` [PlayerItemBreakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemBreakEvent.html)

### `bukkit` [PlayerItemConsumeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemConsumeEvent.html)

### `bukkit` [PlayerItemDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemDamageEvent.html)

### `bukkit` [PlayerItemHeldEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemHeldEvent.html)

### `bukkit` [PlayerItemMendEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemMendEvent.html)

### `bukkit` [PlayerJoinEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerJoinEvent.html)

### `bukkit` [PlayerKickEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerKickEvent.html)

### `bukkit` [PlayerLeashEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PlayerLeashEntityEvent.html)

### `bukkit` [PlayerLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerLevelChangeEvent.html)

### `bukkit` [PlayerLocaleChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerLocaleChangeEvent.html)

### `bukkit` [PlayerLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerLoginEvent.html)

### `bukkit` [PlayerMoveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerMoveEvent.html)

### `bukkit` [PlayerPickupArrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPickupArrowEvent.html)

### `bukkit` [PlayerPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPickupItemEvent.html)

### `bukkit` [PlayerPortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPortalEvent.html)

### `bukkit` [PlayerPreLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPreLoginEvent.html)

### `bukkit` [PlayerQuitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerQuitEvent.html)

### `bukkit` [PlayerRecipeDiscoverEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRecipeDiscoverEvent.html)

### `bukkit` [PlayerRegisterChannelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRegisterChannelEvent.html)

### `bukkit` [PlayerResourcePackStatusEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerResourcePackStatusEvent.html)

### `bukkit` [PlayerRespawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRespawnEvent.html)

### `bukkit` [PlayerRiptideEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRiptideEvent.html)

### `bukkit` [PlayerShearEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerShearEntityEvent.html)

### `bukkit` [PlayerStatisticIncrementEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerStatisticIncrementEvent.html)

### `bukkit` [PlayerSwapHandItemsEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerSwapHandItemsEvent.html)

### `bukkit` [PlayerTakeLecternBookEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerTakeLecternBookEvent.html)

### `bukkit` [PlayerTeleportEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerTeleportEvent.html)

### `bukkit` [PlayerToggleFlightEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerToggleFlightEvent.html)

### `bukkit` [PlayerToggleSneakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerToggleSneakEvent.html)

### `bukkit` [PlayerToggleSprintEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerToggleSprintEvent.html)

### `bukkit` [PlayerUnleashEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerUnleashEntityEvent.html)

### `bukkit` [PlayerUnregisterChannelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerUnregisterChannelEvent.html)

### `bukkit` [PlayerVelocityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerVelocityEvent.html)

### `bukkit` [PluginDisableEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginDisableEvent.html)

### `bukkit` [PluginEnableEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginEnableEvent.html)

### `bukkit` [PluginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginEvent.html)

### `bukkit` [PortalCreateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/PortalCreateEvent.html)

### `bukkit` [PotionSplashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PotionSplashEvent.html)

### `bukkit` [PrepareAnvilEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareAnvilEvent.html)

### `bukkit` [PrepareItemCraftEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareItemCraftEvent.html)
クラフトの準備が出来た際に呼び出される。材料を並べ、完成アイテムが表示される毎に発生する。
### `bukkit` [PrepareItemEnchantEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/enchantment/PrepareItemEnchantEvent.html)

### `bukkit` [PrepareSmithingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareSmithingEvent.html)

### `bukkit` [ProjectileHitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ProjectileHitEvent.html)

### `bukkit` [ProjectileLaunchEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ProjectileLaunchEvent.html)

### `bukkit` [RaidEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidEvent.html)

### `bukkit` [RaidFinishEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidFinishEvent.html)

### `bukkit` [RaidSpawnWaveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidSpawnWaveEvent.html)

### `bukkit` [RaidStopEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidStopEvent.html)

### `bukkit` [RaidTriggerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidTriggerEvent.html)

### `bukkit` [RemoteServerCommandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/RemoteServerCommandEvent.html)

### `bukkit` [ServerCommandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerCommandEvent.html)

### `bukkit` [ServerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerEvent.html)

### `bukkit` [ServerListPingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerListPingEvent.html)

### `bukkit` [ServerLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerLoadEvent.html)

### `bukkit` [ServiceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceEvent.html)

### `bukkit` [ServiceRegisterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceRegisterEvent.html)

### `bukkit` [ServiceUnregisterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceUnregisterEvent.html)

### `bukkit` [SheepDyeWoolEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SheepDyeWoolEvent.html)

### `bukkit` [SheepRegrowWoolEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SheepRegrowWoolEvent.html)

### `bukkit` [SignChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/SignChangeEvent.html)

### `bukkit` [SlimeSplitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SlimeSplitEvent.html)

### `bukkit` [SpawnChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/SpawnChangeEvent.html)

### `bukkit` [SpawnerSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SpawnerSpawnEvent.html)

### `bukkit` [SpongeAbsorbEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/SpongeAbsorbEvent.html)

### `bukkit` [StriderTemperatureChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/StriderTemperatureChangeEvent.html)

### `bukkit` [StructureGrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/StructureGrowEvent.html)

### `bukkit` [TabCompleteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/TabCompleteEvent.html)

### `bukkit` [ThunderChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/ThunderChangeEvent.html)

### `bukkit` [TimeSkipEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/TimeSkipEvent.html)

### `bukkit` [TradeSelectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/TradeSelectEvent.html)

### `bukkit` [UnknownCommandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/command/UnknownCommandEvent.html)

### `bukkit` [VehicleBlockCollisionEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleBlockCollisionEvent.html)

### `bukkit` [VehicleCollisionEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleCollisionEvent.html)

### `bukkit` [VehicleCreateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleCreateEvent.html)

### `bukkit` [VehicleDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleDamageEvent.html)

### `bukkit` [VehicleDestroyEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleDestroyEvent.html)

### `bukkit` [VehicleEnterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleEnterEvent.html)

### `bukkit` [VehicleEntityCollisionEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleEntityCollisionEvent.html)

### `bukkit` [VehicleEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleEvent.html)

### `bukkit` [VehicleExitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleExitEvent.html)

### `bukkit` [VehicleMoveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleMoveEvent.html)

### `bukkit` [VehicleUpdateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleUpdateEvent.html)

### `bukkit` [VillagerAcquireTradeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/VillagerAcquireTradeEvent.html)

### `bukkit` [VillagerCareerChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/VillagerCareerChangeEvent.html)

### `bukkit` [VillagerReplenishTradeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/VillagerReplenishTradeEvent.html)

### `bukkit` [WeatherChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/WeatherChangeEvent.html)

### `bukkit` [WeatherEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/WeatherEvent.html)

### `bukkit` [WorldEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldEvent.html)

### `bukkit` [WorldInitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldInitEvent.html)

### `bukkit` [WorldLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldLoadEvent.html)

### `bukkit` [WorldSaveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldSaveEvent.html)

### `bukkit` [WorldUnloadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldUnloadEvent.html)


[<< 戻る](README.md)