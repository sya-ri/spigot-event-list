<!--

自動生成です。直接編集しないでください。

-->
# Spigot Event List
Bukkit, Spigot, Paper のイベント一覧です。

https://papermc.io/javadocs/paper/1.16/ を元に作成しています。

## 環境毎のイベント一覧
- [bukkit](only-bukkit.md)
- [paper](only-paper.md)
- [spigot](only-spigot.md)

## イベント一覧
### `paper` [AnvilDamagedEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/AnvilDamagedEvent.html)
使用したことで金床が損傷する際に呼び出される。
### `bukkit` [AreaEffectCloudApplyEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/AreaEffectCloudApplyEvent.html)
AreaEffectCloud の効果が付与される際に呼び出される。5ティック毎に1回発生する。
### `bukkit` [ArrowBodyCountChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ArrowBodyCountChangeEvent.html)
矢がエンティティの本体に入る・存在する際に呼び出される。
### `bukkit` [AsyncPlayerChatEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/AsyncPlayerChatEvent.html)
プレイヤーがチャットした際に呼び出される。非同期でも同期でも呼び出されることがある。
### `bukkit` [AsyncPlayerPreLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/AsyncPlayerPreLoginEvent.html)
プレイヤーがログインしようとしている際に呼び出される。非同期で処理される。
### `paper` [AsyncTabCompleteEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/AsyncTabCompleteEvent.html)
タブ補完を行う際に呼び出される。非同期で処理される。このイベントが結果を返す時、標準のタブ補完処理は発生しない。ただし、 [TabCompleteEvent](README.md#bukkit-tabcompleteevent) は非同期の結果と共に呼び出される。
### `bukkit` [BatToggleSleepEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/BatToggleSleepEvent.html)
コウモリが眠ったり起きたりする際に呼び出される。
### `paper` [BeaconEffectEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/BeaconEffectEvent.html)
ビーコンの効果がプレイヤーに適用される際に呼び出される。
### `paper` [BellRingEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BellRingEvent.html)
ベルが鳴る際に呼び出される。
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
### `paper` [BlockDestroyEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/BlockDestroyEvent.html)
サーバーがブロックを破棄する際に呼び出される。
### `bukkit` [BlockDispenseArmorEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDispenseArmorEvent.html)
ディスペンサーから装備可能なアイテムが射出され、エンティティに装備される際に呼び出される。
### `bukkit` [BlockDispenseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDispenseEvent.html)
ディスペンサーからアイテムが射出される際に呼び出される。
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
### `paper` [BlockFailedDispenseEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BlockFailedDispenseEvent.html)
ディスペンサーにアイテムが存在せず、射出されなかった際に呼び出される。
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

### `bukkit` [BlockMultiPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockMultiPlaceEvent.html)

### `bukkit` [BlockPhysicsEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPhysicsEvent.html)

### `bukkit` [BlockPistonEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonEvent.html)

### `bukkit` [BlockPistonExtendEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonExtendEvent.html)

### `bukkit` [BlockPistonRetractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonRetractEvent.html)

### `bukkit` [BlockPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPlaceEvent.html)

### `paper` [BlockPreDispenseEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/BlockPreDispenseEvent.html)

### `bukkit` [BlockRedstoneEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockRedstoneEvent.html)

### `bukkit` [BlockShearEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockShearEntityEvent.html)

### `bukkit` [BlockSpreadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockSpreadEvent.html)

### `bukkit` [BrewEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/BrewEvent.html)

### `bukkit` [BrewingStandFuelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/BrewingStandFuelEvent.html)

### `bukkit` [BroadcastMessageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/BroadcastMessageEvent.html)

### `bukkit` [CauldronLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/CauldronLevelChangeEvent.html)

### `bukkit` [ChunkEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkEvent.html)

### `bukkit` [ChunkLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkLoadEvent.html)

### `bukkit` [ChunkPopulateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkPopulateEvent.html)

### `bukkit` [ChunkUnloadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkUnloadEvent.html)

### `bukkit` [ConversationAbandonedEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/conversations/ConversationAbandonedEvent.html)

### `bukkit` [CraftItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/CraftItemEvent.html)

### `bukkit` [CreatureSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/CreatureSpawnEvent.html)

### `paper` [CreeperIgniteEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/CreeperIgniteEvent.html)

### `bukkit` [CreeperPowerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/CreeperPowerEvent.html)

### `bukkit` [EnchantItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/enchantment/EnchantItemEvent.html)

### `bukkit` [EnderDragonChangePhaseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EnderDragonChangePhaseEvent.html)

### `paper` [EnderDragonFireballHitEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonFireballHitEvent.html)

### `paper` [EnderDragonFlameEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonFlameEvent.html)

### `paper` [EnderDragonShootFireballEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EnderDragonShootFireballEvent.html)

### `paper` [EndermanAttackPlayerEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EndermanAttackPlayerEvent.html)

### `paper` [EndermanEscapeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EndermanEscapeEvent.html)

### `paper` [EntityAddToWorldEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityAddToWorldEvent.html)

### `bukkit` [EntityAirChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityAirChangeEvent.html)

### `bukkit` [EntityBlockFormEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/EntityBlockFormEvent.html)

### `bukkit` [EntityBreakDoorEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityBreakDoorEvent.html)

### `bukkit` [EntityBreedEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityBreedEvent.html)

### `bukkit` [EntityChangeBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityChangeBlockEvent.html)

### `bukkit` [EntityCombustByBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustByBlockEvent.html)

### `bukkit` [EntityCombustByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustByEntityEvent.html)

### `bukkit` [EntityCombustEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustEvent.html)

### `bukkit` [EntityCreatePortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCreatePortalEvent.html)

### `bukkit` [EntityDamageByBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageByBlockEvent.html)

### `bukkit` [EntityDamageByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageByEntityEvent.html)

### `bukkit` [EntityDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageEvent.html)

### `bukkit` [EntityDeathEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDeathEvent.html)

### `spigot` [EntityDismountEvent](https://papermc.io/javadocs/paper/1.16/org/spigotmc/event/entity/EntityDismountEvent.html)

### `bukkit` [EntityDropItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDropItemEvent.html)

### `bukkit` [EntityEnterBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEnterBlockEvent.html)

### `bukkit` [EntityEnterLoveModeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEnterLoveModeEvent.html)

### `bukkit` [EntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEvent.html)

### `bukkit` [EntityExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityExplodeEvent.html)

### `bukkit` [EntityInteractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityInteractEvent.html)

### `paper` [EntityJumpEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityJumpEvent.html)

### `paper` [EntityKnockbackByEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityKnockbackByEntityEvent.html)

### `paper` [EntityLoadCrossbowEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/entity/EntityLoadCrossbowEvent.html)

### `spigot` [EntityMountEvent](https://papermc.io/javadocs/paper/1.16/org/spigotmc/event/entity/EntityMountEvent.html)

### `paper` [EntityMoveEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/entity/EntityMoveEvent.html)

### `paper` [EntityPathfindEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityPathfindEvent.html)

### `bukkit` [EntityPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPickupItemEvent.html)

### `bukkit` [EntityPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPlaceEvent.html)

### `bukkit` [EntityPortalEnterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalEnterEvent.html)

### `bukkit` [EntityPortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalEvent.html)

### `bukkit` [EntityPortalExitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalExitEvent.html)

### `bukkit` [EntityPoseChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPoseChangeEvent.html)

### `bukkit` [EntityPotionEffectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPotionEffectEvent.html)

### `bukkit` [EntityRegainHealthEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityRegainHealthEvent.html)

### `paper` [EntityRemoveFromWorldEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityRemoveFromWorldEvent.html)

### `bukkit` [EntityResurrectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityResurrectEvent.html)

### `bukkit` [EntityShootBowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityShootBowEvent.html)

### `bukkit` [EntitySpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntitySpawnEvent.html)

### `bukkit` [EntitySpellCastEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntitySpellCastEvent.html)

### `bukkit` [EntityTameEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTameEvent.html)

### `bukkit` [EntityTargetEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTargetEvent.html)

### `bukkit` [EntityTargetLivingEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTargetLivingEntityEvent.html)

### `paper` [EntityTeleportEndGatewayEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityTeleportEndGatewayEvent.html)

### `bukkit` [EntityTeleportEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTeleportEvent.html)

### `bukkit` [EntityToggleGlideEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityToggleGlideEvent.html)

### `bukkit` [EntityToggleSwimEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityToggleSwimEvent.html)

### `bukkit` [EntityTransformEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTransformEvent.html)

### `paper` [EntityTransformedEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityTransformedEvent.html)

### `bukkit` [EntityUnleashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityUnleashEvent.html)

### `paper` [EntityZapEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/EntityZapEvent.html)

### `bukkit` [Event](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/Event.html)

### `bukkit` [ExpBottleEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ExpBottleEvent.html)

### `paper` [ExperienceOrbMergeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ExperienceOrbMergeEvent.html)

### `bukkit` [ExplosionPrimeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ExplosionPrimeEvent.html)

### `paper` [FillProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/FillProfileEvent.html)

### `bukkit` [FireworkExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/FireworkExplodeEvent.html)

### `bukkit` [FluidLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/FluidLevelChangeEvent.html)

### `bukkit` [FoodLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/FoodLevelChangeEvent.html)

### `bukkit` [FurnaceBurnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceBurnEvent.html)

### `bukkit` [FurnaceExtractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceExtractEvent.html)

### `bukkit` [FurnaceSmeltEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceSmeltEvent.html)

### `paper` [GS4QueryEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/GS4QueryEvent.html)

### `bukkit` [HangingBreakByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingBreakByEntityEvent.html)

### `bukkit` [HangingBreakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingBreakEvent.html)

### `bukkit` [HangingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingEvent.html)

### `bukkit` [HangingPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingPlaceEvent.html)

### `bukkit` [HorseJumpEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/HorseJumpEvent.html)

### `paper` [IllegalPacketEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/IllegalPacketEvent.html)

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

### `paper` [LookupProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/LookupProfileEvent.html)

### `bukkit` [LootGenerateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/LootGenerateEvent.html)

### `paper` [LootableInventoryReplenishEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/loottable/LootableInventoryReplenishEvent.html)

### `bukkit` [MapInitializeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/MapInitializeEvent.html)

### `bukkit` [MoistureChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/MoistureChangeEvent.html)

### `bukkit` [NotePlayEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/NotePlayEvent.html)

### `paper` [PaperServerListPingEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/PaperServerListPingEvent.html)

### `paper` [PhantomPreSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PhantomPreSpawnEvent.html)

### `bukkit` [PigZapEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PigZapEvent.html)

### `bukkit` [PigZombieAngerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PigZombieAngerEvent.html)

### `paper` [PlayerAdvancementCriterionGrantEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerAdvancementCriterionGrantEvent.html)

### `bukkit` [PlayerAdvancementDoneEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerAdvancementDoneEvent.html)

### `bukkit` [PlayerAnimationEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerAnimationEvent.html)

### `paper` [PlayerArmorChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerArmorChangeEvent.html)

### `bukkit` [PlayerArmorStandManipulateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerArmorStandManipulateEvent.html)

### `paper` [PlayerAttackEntityCooldownResetEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerAttackEntityCooldownResetEvent.html)

### `bukkit` [PlayerAttemptPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerAttemptPickupItemEvent.html)

### `bukkit` [PlayerBedEnterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBedEnterEvent.html)

### `bukkit` [PlayerBedLeaveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBedLeaveEvent.html)

### `bukkit` [PlayerBucketEmptyEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBucketEmptyEvent.html)

### `bukkit` [PlayerBucketEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBucketEvent.html)

### `bukkit` [PlayerBucketFillEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerBucketFillEvent.html)

### `paper` [PlayerChangeBeaconEffectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerChangeBeaconEffectEvent.html)

### `bukkit` [PlayerChangedMainHandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChangedMainHandEvent.html)

### `bukkit` [PlayerChangedWorldEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChangedWorldEvent.html)

### `bukkit` [PlayerChannelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChannelEvent.html)

### `bukkit` [PlayerChatEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChatEvent.html)

### `bukkit` [PlayerChatTabCompleteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChatTabCompleteEvent.html)

### `paper` [PlayerChunkLoadEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/packet/PlayerChunkLoadEvent.html)

### `paper` [PlayerChunkUnloadEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/packet/PlayerChunkUnloadEvent.html)

### `paper` [PlayerClientOptionsChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerClientOptionsChangeEvent.html)

### `bukkit` [PlayerCommandPreprocessEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerCommandPreprocessEvent.html)

### `bukkit` [PlayerCommandSendEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerCommandSendEvent.html)

### `paper` [PlayerConnectionCloseEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerConnectionCloseEvent.html)

### `bukkit` [PlayerDeathEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PlayerDeathEvent.html)

### `bukkit` [PlayerDropItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerDropItemEvent.html)

### `bukkit` [PlayerEditBookEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerEditBookEvent.html)

### `bukkit` [PlayerEggThrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerEggThrowEvent.html)

### `paper` [PlayerElytraBoostEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerElytraBoostEvent.html)

### `bukkit` [PlayerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerEvent.html)

### `bukkit` [PlayerExpChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerExpChangeEvent.html)

### `bukkit` [PlayerFishEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerFishEvent.html)

### `paper` [PlayerFlowerPotManipulateEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerFlowerPotManipulateEvent.html)

### `bukkit` [PlayerGameModeChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerGameModeChangeEvent.html)

### `paper` [PlayerHandshakeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerHandshakeEvent.html)

### `bukkit` [PlayerHarvestBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerHarvestBlockEvent.html)

### `paper` [PlayerInitialSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerInitialSpawnEvent.html)

### `bukkit` [PlayerInteractAtEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerInteractAtEntityEvent.html)

### `bukkit` [PlayerInteractEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerInteractEntityEvent.html)

### `bukkit` [PlayerInteractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerInteractEvent.html)

### `bukkit` [PlayerItemBreakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemBreakEvent.html)

### `bukkit` [PlayerItemConsumeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemConsumeEvent.html)

### `paper` [PlayerItemCooldownEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerItemCooldownEvent.html)

### `bukkit` [PlayerItemDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemDamageEvent.html)

### `bukkit` [PlayerItemHeldEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemHeldEvent.html)

### `bukkit` [PlayerItemMendEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerItemMendEvent.html)

### `bukkit` [PlayerJoinEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerJoinEvent.html)

### `paper` [PlayerJumpEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerJumpEvent.html)

### `bukkit` [PlayerKickEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerKickEvent.html)

### `paper` [PlayerLaunchProjectileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerLaunchProjectileEvent.html)

### `bukkit` [PlayerLeashEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PlayerLeashEntityEvent.html)

### `paper` [PlayerLecternPageChangeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerLecternPageChangeEvent.html)

### `bukkit` [PlayerLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerLevelChangeEvent.html)

### `paper` [PlayerLocaleChangeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerLocaleChangeEvent.html)

### `bukkit` [PlayerLocaleChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerLocaleChangeEvent.html)

### `bukkit` [PlayerLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerLoginEvent.html)

### `paper` [PlayerLoomPatternSelectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerLoomPatternSelectEvent.html)

### `bukkit` [PlayerMoveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerMoveEvent.html)

### `paper` [PlayerNaturallySpawnCreaturesEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PlayerNaturallySpawnCreaturesEvent.html)

### `bukkit` [PlayerPickupArrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPickupArrowEvent.html)

### `paper` [PlayerPickupExperienceEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerPickupExperienceEvent.html)

### `bukkit` [PlayerPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPickupItemEvent.html)

### `bukkit` [PlayerPortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPortalEvent.html)

### `paper` [PlayerPostRespawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerPostRespawnEvent.html)

### `bukkit` [PlayerPreLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPreLoginEvent.html)

### `bukkit` [PlayerQuitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerQuitEvent.html)

### `paper` [PlayerReadyArrowEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerReadyArrowEvent.html)

### `paper` [PlayerRecipeBookClickEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerRecipeBookClickEvent.html)

### `bukkit` [PlayerRecipeDiscoverEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRecipeDiscoverEvent.html)

### `bukkit` [PlayerRegisterChannelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRegisterChannelEvent.html)

### `bukkit` [PlayerResourcePackStatusEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerResourcePackStatusEvent.html)

### `bukkit` [PlayerRespawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRespawnEvent.html)

### `bukkit` [PlayerRiptideEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerRiptideEvent.html)

### `paper` [PlayerShearBlockEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/PlayerShearBlockEvent.html)

### `bukkit` [PlayerShearEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerShearEntityEvent.html)

### `spigot` [PlayerSpawnLocationEvent](https://papermc.io/javadocs/paper/1.16/org/spigotmc/event/player/PlayerSpawnLocationEvent.html)

### `paper` [PlayerStartSpectatingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerStartSpectatingEntityEvent.html)

### `bukkit` [PlayerStatisticIncrementEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerStatisticIncrementEvent.html)

### `paper` [PlayerStonecutterRecipeSelectEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerStonecutterRecipeSelectEvent.html)

### `paper` [PlayerStopSpectatingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerStopSpectatingEntityEvent.html)

### `bukkit` [PlayerSwapHandItemsEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerSwapHandItemsEvent.html)

### `bukkit` [PlayerTakeLecternBookEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerTakeLecternBookEvent.html)

### `paper` [PlayerTeleportEndGatewayEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerTeleportEndGatewayEvent.html)

### `bukkit` [PlayerTeleportEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerTeleportEvent.html)

### `bukkit` [PlayerToggleFlightEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerToggleFlightEvent.html)

### `bukkit` [PlayerToggleSneakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerToggleSneakEvent.html)

### `bukkit` [PlayerToggleSprintEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerToggleSprintEvent.html)

### `paper` [PlayerTradeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/player/PlayerTradeEvent.html)

### `bukkit` [PlayerUnleashEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerUnleashEntityEvent.html)

### `bukkit` [PlayerUnregisterChannelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerUnregisterChannelEvent.html)

### `paper` [PlayerUseUnknownEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/player/PlayerUseUnknownEntityEvent.html)

### `bukkit` [PlayerVelocityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerVelocityEvent.html)

### `bukkit` [PluginDisableEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginDisableEvent.html)

### `bukkit` [PluginEnableEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginEnableEvent.html)

### `bukkit` [PluginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginEvent.html)

### `bukkit` [PortalCreateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/PortalCreateEvent.html)

### `bukkit` [PotionSplashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PotionSplashEvent.html)

### `paper` [PreCreatureSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PreCreatureSpawnEvent.html)

### `paper` [PreFillProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/PreFillProfileEvent.html)

### `paper` [PreLookupProfileEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/PreLookupProfileEvent.html)

### `paper` [PreSpawnerSpawnEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/PreSpawnerSpawnEvent.html)

### `bukkit` [PrepareAnvilEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareAnvilEvent.html)

### `paper` [PrepareGrindstoneEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/inventory/PrepareGrindstoneEvent.html)

### `bukkit` [PrepareItemCraftEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareItemCraftEvent.html)

### `bukkit` [PrepareItemEnchantEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/enchantment/PrepareItemEnchantEvent.html)

### `paper` [PrepareResultEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/inventory/PrepareResultEvent.html)

### `bukkit` [PrepareSmithingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareSmithingEvent.html)

### `paper` [ProfileWhitelistVerifyEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/profile/ProfileWhitelistVerifyEvent.html)

### `paper` [ProjectileCollideEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ProjectileCollideEvent.html)

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

### `paper` [ServerExceptionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerExceptionEvent.html)

### `bukkit` [ServerListPingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerListPingEvent.html)

### `bukkit` [ServerLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerLoadEvent.html)

### `paper` [ServerResourcesReloadedEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/server/ServerResourcesReloadedEvent.html)

### `paper` [ServerTickEndEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerTickEndEvent.html)

### `paper` [ServerTickStartEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/ServerTickStartEvent.html)

### `bukkit` [ServiceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceEvent.html)

### `bukkit` [ServiceRegisterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceRegisterEvent.html)

### `bukkit` [ServiceUnregisterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceUnregisterEvent.html)

### `bukkit` [SheepDyeWoolEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SheepDyeWoolEvent.html)

### `bukkit` [SheepRegrowWoolEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SheepRegrowWoolEvent.html)

### `bukkit` [SignChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/SignChangeEvent.html)

### `paper` [SkeletonHorseTrapEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SkeletonHorseTrapEvent.html)

### `paper` [SlimeChangeDirectionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeChangeDirectionEvent.html)

### `paper` [SlimePathfindEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimePathfindEvent.html)

### `bukkit` [SlimeSplitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SlimeSplitEvent.html)

### `paper` [SlimeSwimEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeSwimEvent.html)

### `paper` [SlimeTargetLivingEntityEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeTargetLivingEntityEvent.html)

### `paper` [SlimeWanderEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/SlimeWanderEvent.html)

### `bukkit` [SpawnChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/SpawnChangeEvent.html)

### `bukkit` [SpawnerSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SpawnerSpawnEvent.html)

### `bukkit` [SpongeAbsorbEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/SpongeAbsorbEvent.html)

### `bukkit` [StriderTemperatureChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/StriderTemperatureChangeEvent.html)

### `bukkit` [StructureGrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/StructureGrowEvent.html)

### `paper` [StructureLocateEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/world/StructureLocateEvent.html)

### `paper` [TNTPrimeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/block/TNTPrimeEvent.html)

### `bukkit` [TabCompleteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/TabCompleteEvent.html)

### `paper` [TargetHitEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/block/TargetHitEvent.html)

### `paper` [ThrownEggHatchEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/ThrownEggHatchEvent.html)

### `bukkit` [ThunderChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/ThunderChangeEvent.html)

### `bukkit` [TimeSkipEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/TimeSkipEvent.html)

### `bukkit` [TradeSelectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/TradeSelectEvent.html)

### `paper` [TurtleGoHomeEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleGoHomeEvent.html)

### `paper` [TurtleLayEggEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleLayEggEvent.html)

### `paper` [TurtleStartDiggingEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/TurtleStartDiggingEvent.html)

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

### `paper` [WhitelistToggleEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/server/WhitelistToggleEvent.html)

### `paper` [WitchConsumePotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchConsumePotionEvent.html)

### `paper` [WitchReadyPotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchReadyPotionEvent.html)

### `paper` [WitchThrowPotionEvent](https://papermc.io/javadocs/paper/1.16/com/destroystokyo/paper/event/entity/WitchThrowPotionEvent.html)

### `bukkit` [WorldEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldEvent.html)

### `paper` [WorldGameRuleChangeEvent](https://papermc.io/javadocs/paper/1.16/io/papermc/paper/event/world/WorldGameRuleChangeEvent.html)

### `bukkit` [WorldInitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldInitEvent.html)

### `bukkit` [WorldLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldLoadEvent.html)

### `bukkit` [WorldSaveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldSaveEvent.html)

### `bukkit` [WorldUnloadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldUnloadEvent.html)

