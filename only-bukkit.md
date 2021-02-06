<!--

自動生成です。直接編集しないでください。

-->
# bukkit

## イベント一覧
### `bukkit` [AreaEffectCloudApplyEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/AreaEffectCloudApplyEvent.html)
AreaEffectCloud の効果が付与される時に呼び出される。5ティック毎に1回発生する。
### `bukkit` [ArrowBodyCountChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ArrowBodyCountChangeEvent.html)
矢がエンティティの本体に入る・存在する時に呼び出される。
### `bukkit` [AsyncPlayerChatEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/AsyncPlayerChatEvent.html)
プレイヤーがチャットした時に呼び出される。非同期でも同期でも呼び出されることがある。
### `bukkit` [AsyncPlayerPreLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/AsyncPlayerPreLoginEvent.html)
プレイヤーがログインしようとしている時に呼び出される。非同期で処理される。
### `bukkit` [BatToggleSleepEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/BatToggleSleepEvent.html)
コウモリが眠ったり起きたりする時に呼び出される。
### `bukkit` [BlockBreakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockBreakEvent.html)
プレイヤーがブロックを破壊する時に呼び出される。
### `bukkit` [BlockBurnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockBurnEvent.html)
ブロックが燃え尽きて破壊される時に呼び出される。
### `bukkit` [BlockCanBuildEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockCanBuildEvent.html)
ブロックを設置しようとした時に呼び出される。設置可能かどうかを確認する。
### `bukkit` [BlockCookEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockCookEvent.html)
アイテムがブロックを用いて調理される時に呼び出される。
### `bukkit` [BlockDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDamageEvent.html)
プレイヤーがブロックを損傷させる時に呼び出される。
### `bukkit` [BlockDispenseArmorEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDispenseArmorEvent.html)
ディスペンサーから装備可能なアイテムが射出され、エンティティに装備される時に呼び出される。
### `bukkit` [BlockDispenseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDispenseEvent.html)
ディスペンサーからアイテムが射出される時に呼び出される。このイベントをキャンセルしても射出されたアイテムは減る。[BlockPreDispenseEvent](README.md#paper-blockpredispenseevent) を使うことでアイテムの消費もキャンセルできる。
### `bukkit` [BlockDropItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockDropItemEvent.html)
プレイヤーによって破壊されたブロックがアイテムとしてドロップする時に呼び出される。
### `bukkit` [BlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockEvent.html)
ブロックに関するイベントであることを表す。
### `bukkit` [BlockExpEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockExpEvent.html)
ブロックが経験値を落とす時に呼び出される。
### `bukkit` [BlockExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockExplodeEvent.html)
ブロックが爆発する時に呼び出される。
### `bukkit` [BlockFadeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFadeEvent.html)
自然にブロックが溶けたり消滅したりする時に呼び出される。以下に例を示す。
- 光源によって雪や氷が溶ける時。
- 燃料ブロックを破壊することなく、時間の経過によって火が消える時。
- 水不足によってサンゴが死んだサンゴに変わる時。
- カメが孵化し、カメの卵が破裂する時。
### `bukkit` [BlockFertilizeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFertilizeEvent.html)
プレイヤーが骨粉を使用し、ブロックに変更が生じる時に呼び出される。[StructureGrowEvent](README.md#bukkit-structuregrowevent) の後に呼び出される。
### `bukkit` [BlockFormEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFormEvent.html)
自然にブロックが形成される時に呼び出される。[BlockSpreadEvent](#bukkit-blockspreadevent) とは違い、ランダムに形成されないブロックに対して呼び出される。以下に例を示す。
- 吹雪により雪が積もる時。
- 雪に覆われたバイオームで氷が形成される時。
- 水との接触による黒曜石や丸石の形成される時。
- コンクリートパウダーと水の混合によるコンクリートが成形される時。
### `bukkit` [BlockFromToEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockFromToEvent.html)
ブロックの変更が起こる時に呼び出される。液体が流れる時とドラゴンの卵がテレポートする時のみ呼び出される。
### `bukkit` [BlockGrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockGrowEvent.html)
自然に作物等が成長する時に呼び出される。以下に例を示す。
- 小麦
- サトウキビ
- サボテン
- スイカ
- かぼちゃ
- カメの卵
### `bukkit` [BlockIgniteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockIgniteEvent.html)
ブロックが点火された時に呼び出される。
### `bukkit` [BlockMultiPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockMultiPlaceEvent.html)
プレイヤーがマルチブロックを設置する時に呼び出される。
### `bukkit` [BlockPhysicsEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPhysicsEvent.html)
ブロックの落下確認をする時に呼び出される。高頻度で呼び出されるので処理には注意が必要。
### `bukkit` [BlockPistonEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonEvent.html)
ピストンが動作する時に呼び出される。
### `bukkit` [BlockPistonExtendEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonExtendEvent.html)
ピストンが伸びる時に呼び出される。
### `bukkit` [BlockPistonRetractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPistonRetractEvent.html)
ピストンが縮む時に呼び出される。
### `bukkit` [BlockPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockPlaceEvent.html)
プレイヤーがブロックを設置する時に呼び出される。
### `bukkit` [BlockRedstoneEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockRedstoneEvent.html)
レッドストーンの強さが変化する時に呼び出される。
### `bukkit` [BlockShearEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockShearEntityEvent.html)
ディスペンサーが羊の毛も刈る時に呼び出される。
### `bukkit` [BlockSpreadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/BlockSpreadEvent.html)
ブロックが拡散する時に呼び出される。[BlockFormEvent](#bukkit-blockformevent) とは違い、ランダムに形成されるブロックに対して呼び出される。以下に例を示す。
- キノコが増える時。
- 火が燃え広がる時。
### `bukkit` [BrewEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/BrewEvent.html)
醸造が完了する時に呼び出される。
### `bukkit` [BrewingStandFuelEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/BrewingStandFuelEvent.html)
燃料としてアイテムが醸造台に使用される時に呼び出される。
### `bukkit` [BroadcastMessageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/BroadcastMessageEvent.html)
サーバーにブロードキャストメッセージが送信された時に呼び出される。メッセージが非同期で送信された場合、イベントも非同期で呼び出される。
### `bukkit` [CauldronLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/CauldronLevelChangeEvent.html)
大釜の水が増えたり減ったりした時に呼び出される。
### `bukkit` [ChunkEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkEvent.html)
チャンクに関するイベントであることを表す
### `bukkit` [ChunkLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkLoadEvent.html)
チャンクが読み込まれた時に呼び出される。
### `bukkit` [ChunkPopulateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkPopulateEvent.html)
新しいチャンクが作られた時に呼び出される。
### `bukkit` [ChunkUnloadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/ChunkUnloadEvent.html)
チャンクの読み込みが停止された時に呼び出される。
### `bukkit` [ConversationAbandonedEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/conversations/ConversationAbandonedEvent.html)
不明。
### `bukkit` [CraftItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/CraftItemEvent.html)
アイテムをクラフトする時に呼び出される。
### `bukkit` [CreatureSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/CreatureSpawnEvent.html)
生き物がスポーンする時に呼び出される。
### `bukkit` [CreeperPowerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/CreeperPowerEvent.html)
クリーパーが雷撃を受ける時に呼び出される。
### `bukkit` [EnchantItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/enchantment/EnchantItemEvent.html)
アイテムにエンチャントした時に呼び出される。
### `bukkit` [EnderDragonChangePhaseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EnderDragonChangePhaseEvent.html)
エンダードラゴンの攻撃フェーズが変わった時に呼び出される。
### `bukkit` [EntityAirChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityAirChangeEvent.html)
エンティティの残り酸素量が変化する時に呼び出される。
### `bukkit` [EntityBlockFormEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/EntityBlockFormEvent.html)
エンティティによってブロックが形成される時に呼び出される。以下に例を示す。
- スノーゴーレムによって雪が形成された時。
- 氷渡りのエンチャントによって氷が形成された時。
### `bukkit` [EntityBreakDoorEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityBreakDoorEvent.html)
エンティティによってドアが破壊される時に呼び出される。
### `bukkit` [EntityBreedEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityBreedEvent.html)
エンティティが繁殖する時に呼び出される。
### `bukkit` [EntityChangeBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityChangeBlockEvent.html)
エンティティがブロックを変化させる時に呼び出される。適したイベントが見当たらない時に呼び出される。
### `bukkit` [EntityCombustByBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustByBlockEvent.html)
ブロックによってエンティティが炎上する時に呼び出される。
### `bukkit` [EntityCombustByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustByEntityEvent.html)
エンティティによってエンティティが炎上する時に呼び出される。
### `bukkit` [EntityCombustEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCombustEvent.html)
エンティティが炎上する時に呼び出される。
### `bukkit` [EntityCreatePortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityCreatePortalEvent.html)
`@Deprecated` ワールドに関するイベントとして定義された [PortalCreateEvent](README.md#bukkit-portalcreateevent) を使う。

エンティティがポータルを作成する時に呼び出される。
### `bukkit` [EntityDamageByBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageByBlockEvent.html)
ブロックによってエンティティがダメージを受ける時に呼び出される。
### `bukkit` [EntityDamageByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageByEntityEvent.html)
エンティティによってエンティティがダメージを受ける時に呼び出される。
### `bukkit` [EntityDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDamageEvent.html)
エンティティがダメージを受ける時に呼び出される。
### `bukkit` [EntityDeathEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDeathEvent.html)
エンティティが死ぬ時に呼び出される。
### `bukkit` [EntityDropItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityDropItemEvent.html)
エンティティがアイテムをドロップする時に呼び出される。
### `bukkit` [EntityEnterBlockEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEnterBlockEvent.html)
エンティティがブロックの中に入る時に呼び出される。以下に例を示す。
- ミツバチが巣箱に入る時。

しかし、以下の場合は呼び出されない。
- シルバーフィッシュが石に入る時。[EntityChangeBlockEvent](README.md#bukkit-entitychangeblockevent) が呼び出される。
### `bukkit` [EntityEnterLoveModeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEnterLoveModeEvent.html)
エンティティが発情する時に呼び出される。このイベントをキャンセルしても使用したアイテムは消費されてしまう。
### `bukkit` [EntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityEvent.html)
エンティティに関するイベントであることを表す。
### `bukkit` [EntityExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityExplodeEvent.html)
エンティティが爆発する時に呼び出される。
### `bukkit` [EntityInteractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityInteractEvent.html)
エンティティ同士が押し合う時に呼び出される。
### `bukkit` [EntityPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPickupItemEvent.html)
エンティティが地面からアイテムを拾う時に呼び出される。
### `bukkit` [EntityPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPlaceEvent.html)
`@Deprecated` 仮実装中。

エンティティが設置された時に呼び出される。このイベントは現在、アーマースタンド・ボート・トロッコ・エンドクリスタルでのみ呼び出される。
### `bukkit` [EntityPortalEnterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalEnterEvent.html)
エンティティがポータルに接触した時に呼び出される。
### `bukkit` [EntityPortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalEvent.html)
プレイヤー以外のエンティティがポータルでテレポートする時に呼び出される。プレイヤーの場合 [PlayerPortalEvent](README.md#bukkit-playerportalevent) が呼び出される。
### `bukkit` [EntityPortalExitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPortalExitEvent.html)
エンティティがポータルを出る時に呼び出される。
### `bukkit` [EntityPoseChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPoseChangeEvent.html)
エンティティのポーズが変わった時に呼び出される。
### `bukkit` [EntityPotionEffectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityPotionEffectEvent.html)
エンティティのポーション効果が変更された時に呼び出される。
### `bukkit` [EntityRegainHealthEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityRegainHealthEvent.html)
エンティティが体力を回復する時に呼び出される。
### `bukkit` [EntityResurrectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityResurrectEvent.html)
エンティティが死亡し、復活できる時に呼び出される。トーテムを装備していない場合、キャンセルされた状態で呼び出される。
### `bukkit` [EntityShootBowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityShootBowEvent.html)
エンティティが弓で矢を放つ時に呼び出される。
### `bukkit` [EntitySpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntitySpawnEvent.html)
エンティティがスポーンする時に呼び出される。
### `bukkit` [EntitySpellCastEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntitySpellCastEvent.html)
エヴォーカーやイリュージョナーが呪文を唱える時に呼び出される。
### `bukkit` [EntityTameEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTameEvent.html)
エンティティを飼い慣らす時に呼び出される。
### `bukkit` [EntityTargetEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTargetEvent.html)
生き物が別のエンティティをターゲットする時、ターゲットを解除する時に呼び出される。
### `bukkit` [EntityTargetLivingEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTargetLivingEntityEvent.html)
[EntityTargetEvent](README.md#bukkit-entitytargetevent) において LivingEntity をターゲットとする時に呼び出される。
### `bukkit` [EntityTeleportEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTeleportEvent.html)
プレイヤーではないエンティティがテレポートする時に呼び出される。
### `bukkit` [EntityToggleGlideEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityToggleGlideEvent.html)
エンティティの滑空状態が切り替わる時に呼び出される。
### `bukkit` [EntityToggleSwimEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityToggleSwimEvent.html)
エンティティの泳ぎ状態が切り替わる時に呼び出される。
### `bukkit` [EntityTransformEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityTransformEvent.html)
エンティティが別のエンティティに置きかわる時に呼び出される。
### `bukkit` [EntityUnleashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/EntityUnleashEvent.html)
エンティティからリードが外される時に呼び出される。
### `bukkit` [Event](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/Event.html)
イベントを表す。
### `bukkit` [ExpBottleEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ExpBottleEvent.html)
経験値ボトルから経験値が出る時に呼び出される。
### `bukkit` [ExplosionPrimeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ExplosionPrimeEvent.html)
エンティティが爆発する時に呼び出される。
### `bukkit` [FireworkExplodeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/FireworkExplodeEvent.html)
花火が爆発する時に呼び出される。
### `bukkit` [FluidLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/FluidLevelChangeEvent.html)
隣接したブロックによって液面が変化する時に呼び出される。
### `bukkit` [FoodLevelChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/FoodLevelChangeEvent.html)
空腹度が変化する時に呼び出される。
### `bukkit` [FurnaceBurnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceBurnEvent.html)
かまど内でアイテムが燃料として使用される時に呼び出される。
### `bukkit` [FurnaceExtractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceExtractEvent.html)
プレイヤーがかまどからアイテムを取り出す時に呼び出される。
### `bukkit` [FurnaceSmeltEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/FurnaceSmeltEvent.html)
かまど内でアイテムが精錬される時に呼び出される。
### `bukkit` [HangingBreakByEntityEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingBreakByEntityEvent.html)
エンティティによって壁掛けエンティティが破壊される時に呼び出される。
### `bukkit` [HangingBreakEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingBreakEvent.html)
壁掛けエンティティが破壊される時に呼び出される。
### `bukkit` [HangingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingEvent.html)
壁掛けエンティティに関するイベントであることを表す。壁掛けエンティティの例を以下に示す。
- 絵画
- 額縁
- 柵に繋がれたリード
### `bukkit` [HangingPlaceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/hanging/HangingPlaceEvent.html)
壁掛けエンティティが設置される時に呼び出される。
### `bukkit` [HorseJumpEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/HorseJumpEvent.html)
馬がジャンプする時に呼び出される。
### `bukkit` [InventoryClickEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryClickEvent.html)
インベントリを開いた状態で画面をクリックする時に呼び出される。
### `bukkit` [InventoryCloseEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryCloseEvent.html)
インベントリを閉じる時に呼び出される。
### `bukkit` [InventoryCreativeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryCreativeEvent.html)
クリエイティブモードのプレイヤーがインベントリの操作をした時に呼び出される。呼び出される例を以下に示す。
- インベントリにアイテムを置いた時
- アイテムを拾った時
- インベントリからアイテムをドロップした時
### `bukkit` [InventoryDragEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryDragEvent.html)
インベントリ内でアイテムをドラッグした時に呼び出される。
### `bukkit` [InventoryEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryEvent.html)
インベントリに関するイベントであることを表す。
### `bukkit` [InventoryInteractEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryInteractEvent.html)
プレイヤーとインベントリが相互に作用するイベント表す。
### `bukkit` [InventoryMoveItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryMoveItemEvent.html)
エンティティやホッパー等のブロックがインベントリ内のアイテムを別のインベントリに移動させる時に呼び出される。
### `bukkit` [InventoryOpenEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryOpenEvent.html)
インベントリを開く時に呼び出される。
### `bukkit` [InventoryPickupItemEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/InventoryPickupItemEvent.html)
ホッパーが落ちているアイテムを拾う時に呼び出される。
### `bukkit` [ItemDespawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ItemDespawnEvent.html)
時間によってアイテムが消滅する時に呼び出される。
### `bukkit` [ItemMergeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ItemMergeEvent.html)
同じアイテムが合わさる時に呼び出される。
### `bukkit` [ItemSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ItemSpawnEvent.html)
アイテムがワールドにスポーンする時に呼び出される。
### `bukkit` [LeavesDecayEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/LeavesDecayEvent.html)
葉が自然に壊れる時に呼び出される。
### `bukkit` [LightningStrikeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/LightningStrikeEvent.html)
雷が落ちる時に呼び出される。
### `bukkit` [LingeringPotionSplashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/LingeringPotionSplashEvent.html)
残留ポーションが割れる時に呼び出される。
### `bukkit` [LootGenerateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/LootGenerateEvent.html)
LootTable によってアイテムが生成される時に呼び出される。
### `bukkit` [MapInitializeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/MapInitializeEvent.html)
マップが初期化された時に呼び出される。
### `bukkit` [MoistureChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/MoistureChangeEvent.html)
耕地の水分レベルが変化する時に呼び出される。
### `bukkit` [NotePlayEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/NotePlayEvent.html)
音符ブロックが音を鳴らす時に呼び出される。
### `bukkit` [PigZapEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PigZapEvent.html)
豚が雷に打たれた時に呼び出される。
### `bukkit` [PigZombieAngerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PigZombieAngerEvent.html)
ゾンビ豚が怒る時に呼び出される。
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
`@Deprecated` チャットの遅延が発生するので [AsyncPlayerChatEvent](README.md#bukkit-asyncplayerchatevent) を使う。


### `bukkit` [PlayerChatTabCompleteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerChatTabCompleteEvent.html)
`@Deprecated` クライアントの変更により実行されなくなった。


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
`@Deprecated` Bukkit に追加された [EntityPickupItemEvent](README.md#bukkit-entitypickupitemevent) を使う。


### `bukkit` [PlayerPortalEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPortalEvent.html)

### `bukkit` [PlayerPreLoginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/player/PlayerPreLoginEvent.html)
`@Deprecated` 非同期で処理をする為に [AsyncPlayerPreLoginEvent](README.md#bukkit-asyncplayerpreloginevent) を使う。


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
プラグインが無効になった時に呼び出される。
### `bukkit` [PluginEnableEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginEnableEvent.html)
プラグインが有効になった時に呼び出される。
### `bukkit` [PluginEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/PluginEvent.html)
プラグインに関するイベントであることを表す。
### `bukkit` [PortalCreateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/PortalCreateEvent.html)
ポータルが作成される時に呼び出される。
### `bukkit` [PotionSplashEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/PotionSplashEvent.html)
ポーションが割れる時に呼び出される。
### `bukkit` [PrepareAnvilEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareAnvilEvent.html)
金床の使用準備が出来た時に呼び出される。完成アイテムが表示される毎に発生する。
### `bukkit` [PrepareItemCraftEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareItemCraftEvent.html)
クラフトの準備が出来た時に呼び出される。材料を並べ、完成アイテムが表示される毎に発生する。
### `bukkit` [PrepareItemEnchantEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/enchantment/PrepareItemEnchantEvent.html)
エンチャントの準備が出来た時に呼び出される。完成アイテムが表示される毎に発生する。
### `bukkit` [PrepareSmithingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/PrepareSmithingEvent.html)
鍛治台の使用準備が出来た時に呼び出される。完成アイテムが表示される毎に発生する。
### `bukkit` [ProjectileHitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ProjectileHitEvent.html)
Projectile がエンティティに当たる時に呼び出される。
### `bukkit` [ProjectileLaunchEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/ProjectileLaunchEvent.html)
Projectile が発射される時に呼び出される。
### `bukkit` [RaidEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidEvent.html)
レイドに関するイベントであることを表す。
### `bukkit` [RaidFinishEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidFinishEvent.html)
レイドが終わった時に呼び出される。
### `bukkit` [RaidSpawnWaveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidSpawnWaveEvent.html)
レイドのウェーブが進んだ時に呼び出される。
### `bukkit` [RaidStopEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidStopEvent.html)
レイドが終了した時に呼び出される。
### `bukkit` [RaidTriggerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/raid/RaidTriggerEvent.html)
レイドが始まる時に呼び出される。
### `bukkit` [RemoteServerCommandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/RemoteServerCommandEvent.html)
RCON を介してコマンド入力を受け取った時に呼び出される。
### `bukkit` [ServerCommandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerCommandEvent.html)
プレイヤー以外がコマンドを実行する時に呼び出される。
### `bukkit` [ServerEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerEvent.html)
サーバーに関するイベントであることを表す。
### `bukkit` [ServerListPingEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerListPingEvent.html)
サーバーリストの表示内容を送る要求を受けた時に呼び出される。[PaperServerListPingEvent](README.md#paper-paperserverlistpingevent) を使うことでより詳細の情報を扱うことができる。
### `bukkit` [ServerLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServerLoadEvent.html)
サーバーが起動した時、リロードが完了した時に呼び出される。
### `bukkit` [ServiceEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceEvent.html)
サービスに関するイベントであることを表す。
### `bukkit` [ServiceRegisterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceRegisterEvent.html)
サービスが登録された時に呼び出される。
### `bukkit` [ServiceUnregisterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/ServiceUnregisterEvent.html)
サービスの登録が解除された時に呼び出される。
### `bukkit` [SheepDyeWoolEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SheepDyeWoolEvent.html)
羊が染色された時に呼び出される。
### `bukkit` [SheepRegrowWoolEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SheepRegrowWoolEvent.html)
羊の毛が生えた時に呼び出される。
### `bukkit` [SignChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/SignChangeEvent.html)
プレイヤーによって看板の内容が変わる時に呼び出される。
### `bukkit` [SlimeSplitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SlimeSplitEvent.html)
スライムが死ぬことで分裂した時に呼び出される。
### `bukkit` [SpawnChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/SpawnChangeEvent.html)
ワールドのスポーン位置が変更された時に呼び出される。
### `bukkit` [SpawnerSpawnEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/SpawnerSpawnEvent.html)
エンティティがスポナーによってスポーンする時に呼び出される。
### `bukkit` [SpongeAbsorbEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/block/SpongeAbsorbEvent.html)
スポンジが水を吸収する時に呼び出される。
### `bukkit` [StriderTemperatureChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/StriderTemperatureChangeEvent.html)
ストライダーの体温が変化した時に呼び出される。
### `bukkit` [StructureGrowEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/StructureGrowEvent.html)
植物が成長する時に呼び出される。以下に例を示す。
- 苗木が木に成長する時
- キノコが巨大キノコに成長する時
### `bukkit` [TabCompleteEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/server/TabCompleteEvent.html)
プレイヤーやコンソールがコマンドをタブ補完する時に呼び出される。クライアントの変更により、プレイヤーの場合、コマンド自体では呼び出されず、コマンド引数の場合にのみ呼び出される。
### `bukkit` [ThunderChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/ThunderChangeEvent.html)
天気が雷雨に変わる時に呼び出される。
### `bukkit` [TimeSkipEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/TimeSkipEvent.html)
時間がスキップされる時に呼び出される。
### `bukkit` [TradeSelectEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/inventory/TradeSelectEvent.html)
取引画面のサイドバーで別の取引をクリックする時に呼び出される。
### `bukkit` [UnknownCommandEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/command/UnknownCommandEvent.html)
定義されていないコマンドをプレイヤーが実行した時に呼び出される。
### `bukkit` [VehicleBlockCollisionEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleBlockCollisionEvent.html)
乗り物がブロックに衝突した時に呼び出される。
### `bukkit` [VehicleCollisionEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleCollisionEvent.html)
乗り物が衝突した時に呼び出される。
### `bukkit` [VehicleCreateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleCreateEvent.html)
乗り物が作成される時に呼び出される。
### `bukkit` [VehicleDamageEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleDamageEvent.html)
乗り物がダメージを受ける時に呼び出される。
### `bukkit` [VehicleDestroyEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleDestroyEvent.html)
乗り物が破壊される時に呼び出される。
### `bukkit` [VehicleEnterEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleEnterEvent.html)
エンティティが乗り物に乗る時に呼び出される。
### `bukkit` [VehicleEntityCollisionEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleEntityCollisionEvent.html)
乗り物がエンティティと衝突した時に呼び出される。
### `bukkit` [VehicleEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleEvent.html)
乗り物に関するイベントであることを表す。
### `bukkit` [VehicleExitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleExitEvent.html)
エンティティが乗り物から降りる時に呼び出される。
### `bukkit` [VehicleMoveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleMoveEvent.html)
乗り物が動く時に呼び出される。
### `bukkit` [VehicleUpdateEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/vehicle/VehicleUpdateEvent.html)
乗り物が更新された時に呼び出される。
### `bukkit` [VillagerAcquireTradeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/VillagerAcquireTradeEvent.html)
村人が新たな交易品を獲得する時に呼び出される。
### `bukkit` [VillagerCareerChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/VillagerCareerChangeEvent.html)
村人の職業が変わる時に呼び出される。
### `bukkit` [VillagerReplenishTradeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/entity/VillagerReplenishTradeEvent.html)
村人が交易品を補充する時に呼び出される。
### `bukkit` [WeatherChangeEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/WeatherChangeEvent.html)
天気が変わる時に呼び出される。
### `bukkit` [WeatherEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/weather/WeatherEvent.html)
天気に関するイベントであることを表す。
### `bukkit` [WorldEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldEvent.html)
ワールドに関するイベントであることを表す。
### `bukkit` [WorldInitEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldInitEvent.html)
ワールドが初期化される時に呼び出される。
### `bukkit` [WorldLoadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldLoadEvent.html)
ワールドをロードした時に呼び出される。
### `bukkit` [WorldSaveEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldSaveEvent.html)
ワールドが保存された時に呼び出される。
### `bukkit` [WorldUnloadEvent](https://papermc.io/javadocs/paper/1.16/org/bukkit/event/world/WorldUnloadEvent.html)
ワールドをアンロードするに呼び出される。

[<< 戻る](README.md)