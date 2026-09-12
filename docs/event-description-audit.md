# イベント説明・検索語の照合記録 / Event description and keyword review

2026-09-12。基準コミット: ba746f82b9（最新master取り込み後）。

50ファイル、18,036件を対象に、パッケージを含む592種類のイベントについて日本語・英語の説明と保存済みJavadocを読み比べました。意味の異なる履歴Javadoc 76パターンも比較し、版固有の条件を分けています。148種類・3,956件の説明を修正し、全件に日英の関連キーワードを追加しました。重複して掲載される同じイベントも件数に含みます。

Reviewed the Japanese and English descriptions against the stored Javadoc for all 592 source/package identities across 50 files and 18,036 records. Compared 76 additional historical Javadoc variants, preserving version-specific conditions. Updated descriptions for 148 identities (3,956 records) and added Japanese and English keywords to every record. Counts include repeated events across version snapshots.

短い定型的な説明は、内容が正しければ原文と同じ表現も残しています。長い原文の丸写し、HTML・Javadoc記法の混入、日本語欄の英語、意味や発火条件のずれを修正しました。Javadoc本文自体は参照資料として保持し、説明欄と区別します。

Short, accurate definitions may retain conventional wording shared with Javadoc. Long copied passages, markup in summaries, untranslated Japanese fields, and semantic or timing mismatches were corrected. Raw Javadoc remains separate reference material.

## 主な訂正 / Notable corrections

| Event                       | Correction / 訂正                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ProxyPreShutdownEvent       | 接続開始ではなく、新規接続受付停止後・プレイヤー切断前。After new connections stop, before players disconnect.           |
| RegionizedServerInitEvent   | 銅ゴーレムの運搬ではなく、初期化後・リージョン並列ティック開始前。Server initialization, before parallel region ticking. |
| BlockSpreadEvent            | 自然形成との区別が逆転していた説明を修正。Corrected the distinction from BlockFormEvent.                                 |
| EntityExhaustionEvent       | 通常の満腹度ではなく隠し満腹度。Saturation rather than food level.                                                       |
| TurtleLayEggEvent           | 孵化ではなく産卵。Egg laying rather than hatching.                                                                       |
| WitchReadyPotionEvent       | 醸造ではなく、手に持って使うポーションの準備。Readying a potion to hold and use.                                         |
| PlayerPurchaseEvent         | 独立した商人GUI。村人との取引は PlayerTradeEvent。Standalone merchant GUI, distinct from PlayerTradeEvent.               |
| PlayerAFKEvent              | 離席だけでなく復帰も対象。Both entering and leaving AFK.                                                                 |
| PlayerPickItemEvent         | 旧版のインベントリ→ホットバー制約と新版の対象を区別。Retained historical hotbar and creative-mode restrictions.          |
| VillagerReplenishTradeEvent | 旧版の最大使用回数増加と新版の補充を区別。Maximum-use increases in older versions versus restocking.                     |

## 補足資料 / Supplemental evidence

Minecraft-skills MCPでPaperの型・メソッドを確認し、本文が必要な場合は元のJavadocを参照しました。search_paper_events は本リポジトリの公開APIを参照するため、説明の独立した検証根拠には使用していません。下記はクラス概要がない、または解釈を補う必要があったイベントの公式Javadoc・保存版・ソースパッチです。新たなJavadoc全文を全18,036件についてダウンロードしたという意味ではありません。

Used minecraft-skills MCP for versioned Paper type/member references. Since its event-search tool calls this repository's public API, it was not used as independent evidence. The targeted references below supplement stored class Javadoc with methods and source patches; this review does not claim to have downloaded fresh Javadoc for every historical record.

- AbstractRespawnEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AbstractRespawnEvent.html)
- ArrowBodyCountChangeEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ArrowBodyCountChangeEvent.html)
- AsyncChatCommandDecorateEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AsyncChatCommandDecorateEvent.html)
- BlockExplodeEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockExplodeEvent.html)
- BlockPreDispenseEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BlockPreDispenseEvent.html)
- CauldronLevelChangeEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/CauldronLevelChangeEvent.html)
- CreeperIgniteEvent: [reference](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/CreeperIgniteEvent.html)
- EndermanEscapeEvent: [reference](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EndermanEscapeEvent.html)
- EntityInteractEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityInteractEvent.html)
- IllegalPacketEvent: [reference](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/IllegalPacketEvent.html)
- ItemMergeEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ItemMergeEvent.html)
- LingeringPotionSplashEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/LingeringPotionSplashEvent.html)
- LootableInventoryReplenishEvent: [reference](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/loottable/LootableInventoryReplenishEvent.html)
- PlayerAFKEvent: [reference](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/PlayerAFKEvent.html)
- PlayerArmSwingEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerArmSwingEvent.html)
- PlayerBedFailEnterEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerBedFailEnterEvent.html)
- PlayerLecternPageChangeEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerLecternPageChangeEvent.html)
- PlayerSetSpawnerTypeWithEggEvent: [reference](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/PlayerSetSpawnerTypeWithEggEvent.html)
- PlayerSetTrialSpawnerTypeWithEggEvent: [reference](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/PlayerSetTrialSpawnerTypeWithEggEvent.html)
- PlayerStonecutterRecipeSelectEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerStonecutterRecipeSelectEvent.html)
- PrepareItemCraftEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/PrepareItemCraftEvent.html)
- RidableSpacebarEvent: [reference](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/RidableSpacebarEvent.html)
- ServerTickStartEvent: [reference](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/ServerTickStartEvent.html)
- VillagerCareerChangeEvent: [reference](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/VillagerCareerChangeEvent.html)
- WitchReadyPotionEvent: [reference](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/WitchReadyPotionEvent.html)
- WorldBorderEvent: [reference](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/border/WorldBorderEvent.html)
- PlayerInitialSpawnEvent: [reference](https://spigot-javadoc.s7a.dev/paper/1.10.2/com/destroystokyo/paper/event/player/PlayerInitialSpawnEvent.html)
- PlayerFeedAnimalEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.14.1/net/pl3x/purpur/event/PlayerFeedAnimalEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/61d0e22b1f902e942c541572fda46918f1935b48/patches/api/0003-PlayerFeedAnimalEvent.patch)
- PlayerSetSpawnerTypeWithEggEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.14.3/net/pl3x/purpur/event/PlayerSetSpawnerTypeWithEggEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/6ea93ffa528c0a88f1d587639c9bc1ef4375a642/patches/api/0014-Implement-PlayerSetSpawnerTypeWithEggEvent.patch)
- LootableInventoryFirstFillEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/block/LootableInventoryFirstFillEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/af7f8f2bb56a90e217d584804922ea1a7ed31b74/patches/api/0023-Add-LootableInventoryFirstFillEvent.patch)
- MonsterEggSpawnEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/entity/MonsterEggSpawnEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/af7f8f2bb56a90e217d584804922ea1a7ed31b74/patches/api/0024-Add-MonsterEggSpawnEvent.patch)
- PlayerAFKEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/PlayerAFKEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/af7f8f2bb56a90e217d584804922ea1a7ed31b74/patches/api/0013-Implement-AFK-API.patch)
- PlayerItemCooldownEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/player/PlayerItemCooldownEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/3fd5ba28135d8e52c446e0997a3c715f34825dc8/patches/api/0034-PlayerItemCooldownEvent.patch)
- RidableSpacebarEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/entity/RidableSpacebarEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/3fd5ba28135d8e52c446e0997a3c715f34825dc8/patches/api/0005-Ridables.patch)
- DragonEggPlaceEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.16.1/net/pl3x/purpur/event/block/DragonEggPlaceEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/2b4fe114201c3a4f1208461eb24b310634f98663/patches/api/0031-DragonEggPlaceEvent.patch)
- StructureGenerateEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.16.4/net/pl3x/purpur/event/world/StructureGenerateEvent.html), [source patch](https://github.com/PurpurMC/Purpur/blob/22b876a304d23e418cc07649ae932c6c045c20ff/patches/api/0039-Add-StructureGenerateEvent.patch)
- MonsterEggSpawnEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.16.5/org/purpurmc/purpur/event/entity/MonsterEggSpawnEvent.html)
- StructureGenerateEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.16.5/org/purpurmc/purpur/event/world/StructureGenerateEvent.html)
- PlayerPreviewChatEvent: [reference](https://spigot-javadoc.s7a.dev/purpur/1.19/org/purpurmc/purpur/event/player/PlayerPreviewChatEvent.html)

LootableInventoryFirstFillEvent は、1.14.4・1.15・1.15.1の標準補充処理では生成されるだけで通知されません。1.15.2では callEvent() が追加されています。各版の実装を確認して説明を分けました。

The standard fill path only constructs LootableInventoryFirstFillEvent in 1.14.4, 1.15 and 1.15.1; 1.15.2 dispatches it with callEvent(). Descriptions distinguish those versions.

- [1.14.4 server patch](https://github.com/PurpurMC/Purpur/blob/af7f8f2bb56a90e217d584804922ea1a7ed31b74/patches/server/0076-Add-LootableInventoryFirstFillEvent.patch)
- [1.15 server patch](https://github.com/PurpurMC/Purpur/blob/3984c3706f2b35e02d98ba27edadbf1e5d199341/patches/server/0075-Add-LootableInventoryFirstFillEvent.patch)
- [1.15.1 server patch](https://github.com/PurpurMC/Purpur/blob/ab2c6c147e3afe0071617975eec9ab23d2a7be90/patches/server/0075-Add-LootableInventoryFirstFillEvent.patch)
- [1.15.2 server patch](https://github.com/PurpurMC/Purpur/blob/3fd5ba28135d8e52c446e0997a3c715f34825dc8/patches/server/0080-Add-LootableInventoryFirstFillEvent.patch)

その他の空欄は [PlayerFeedAnimalEvent の呼び出し箇所](https://github.com/PurpurMC/Purpur/blob/61d0e22b1f902e942c541572fda46918f1935b48/patches/server/0004-PlayerFeedAnimalEvent.patch)、[DragonEggPlaceEvent の呼び出し箇所](https://github.com/PurpurMC/Purpur/blob/2b4fe114201c3a4f1208461eb24b310634f98663/patches/server/0118-DragonEggPlaceEvent.patch)、PlayerItemCooldownEvent のクラスJavadocで確認しました。The remaining blank descriptions were verified from those call sites and the cooldown class Javadoc.

最新masterの取り込み時に追加された EntityCollideWithEntityEvent、EntityConstructEvent、SulfurCubeSwallowItemEvent も、一覧内のリンク先のPaper 26.2公式Javadocと照合しました。The three events added during upstream integration were also reviewed against their official Paper 26.2 Javadoc.

## 確認済み一覧 / Reviewed identities

説明の原本は各 events.json です。この一覧は確認対象の索引であり、説明の上書きテーブルではありません。各イベントのリンクは、調査開始時の代表的な参照先です。古い版は各データ内の link を使用してください。

The events.json files remain the source of truth. This is a review index, not an override table. Links identify representative references; use each dataset record's link for its exact version.

| Source   | Event / Reference                                                                                                                                                          | 説明修正 / Updated |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| paper    | [AbstractChatEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AbstractChatEvent.html)                                                                 | Reviewed           |
| paper    | [AbstractRespawnEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AbstractRespawnEvent.html)                                                           | Reviewed           |
| paper    | [AnvilDamagedEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/block/AnvilDamagedEvent.html)                                                           | Reviewed           |
| purpur   | [AnvilTakeResultEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/inventory/AnvilTakeResultEvent.html)                                                         | Reviewed           |
| purpur   | [AnvilUpdateResultEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/inventory/AnvilUpdateResultEvent.html)                                                     | Yes                |
| spigot   | [AreaEffectCloudApplyEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/AreaEffectCloudApplyEvent.html)                                               | Reviewed           |
| spigot   | [ArrowBodyCountChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ArrowBodyCountChangeEvent.html)                                               | Yes                |
| paper    | [AsyncChatCommandDecorateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AsyncChatCommandDecorateEvent.html)                                         | Reviewed           |
| paper    | [AsyncChatDecorateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AsyncChatDecorateEvent.html)                                                       | Reviewed           |
| paper    | [AsyncChatEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AsyncChatEvent.html)                                                                       | Yes                |
| bungee   | [AsyncEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/AsyncEvent.html)                                                           | Yes                |
| spigot   | [AsyncPlayerChatEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/AsyncPlayerChatEvent.html)                                                         | Yes                |
| spigot   | [AsyncPlayerChatPreviewEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/AsyncPlayerChatPreviewEvent.html)                                           | Reviewed           |
| paper    | [AsyncPlayerConnectionConfigureEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/connection/configuration/AsyncPlayerConnectionConfigureEvent.html)           | Reviewed           |
| spigot   | [AsyncPlayerPreLoginEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/AsyncPlayerPreLoginEvent.html)                                                 | Yes                |
| paper    | [AsyncPlayerSendCommandsEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/brigadier/AsyncPlayerSendCommandsEvent.html)                                 | Yes                |
| paper    | [AsyncPlayerSendSuggestionsEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/brigadier/AsyncPlayerSendSuggestionsEvent.html)                           | Reviewed           |
| paper    | [AsyncPlayerSpawnLocationEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/AsyncPlayerSpawnLocationEvent.html)                                         | Yes                |
| paper    | [AsyncServerDataFixerRemoveBlockEntityEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/server/AsyncServerDataFixerRemoveBlockEntityEvent.html)               | Yes                |
| spigot   | [AsyncStructureGenerateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/AsyncStructureGenerateEvent.html)                                            | Yes                |
| spigot   | [AsyncStructureSpawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/AsyncStructureSpawnEvent.html)                                                  | Reviewed           |
| paper    | [AsyncTabCompleteEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/AsyncTabCompleteEvent.html)                                                  | Reviewed           |
| spigot   | [BatToggleSleepEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/BatToggleSleepEvent.html)                                                           | Reviewed           |
| paper    | [BeaconActivatedEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BeaconActivatedEvent.html)                                                            | Reviewed           |
| paper    | [BeaconDeactivatedEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BeaconDeactivatedEvent.html)                                                        | Reviewed           |
| paper    | [BeaconEffectEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/block/BeaconEffectEvent.html)                                                           | Reviewed           |
| purpur   | [BeeFoundFlowerEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/BeeFoundFlowerEvent.html)                                                              | Reviewed           |
| purpur   | [BeeStartedPollinatingEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/BeeStartedPollinatingEvent.html)                                                | Reviewed           |
| purpur   | [BeeStopPollinatingEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/BeeStopPollinatingEvent.html)                                                      | Reviewed           |
| spigot   | [BellResonateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BellResonateEvent.html)                                                                | Yes                |
| paper    | [BellRevealRaiderEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BellRevealRaiderEvent.html)                                                          | Yes                |
| paper    | [BellRingEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BellRingEvent.html)                                                                          | Reviewed           |
| spigot   | [BellRingEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BellRingEvent.html)                                                                        | Reviewed           |
| paper    | [BlockBreakBlockEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BlockBreakBlockEvent.html)                                                            | Reviewed           |
| spigot   | [BlockBreakEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockBreakEvent.html)                                                                    | Reviewed           |
| paper    | [BlockBreakProgressUpdateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BlockBreakProgressUpdateEvent.html)                                          | Reviewed           |
| spigot   | [BlockBrushEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockBrushEvent.html)                                                                    | Reviewed           |
| spigot   | [BlockBurnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockBurnEvent.html)                                                                      | Reviewed           |
| spigot   | [BlockCanBuildEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockCanBuildEvent.html)                                                              | Yes                |
| spigot   | [BlockCookEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockCookEvent.html)                                                                      | Reviewed           |
| spigot   | [BlockDamageAbortEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockDamageAbortEvent.html)                                                        | Reviewed           |
| spigot   | [BlockDamageEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockDamageEvent.html)                                                                  | Yes                |
| paper    | [BlockDestroyEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/block/BlockDestroyEvent.html)                                                           | Yes                |
| spigot   | [BlockDispenseArmorEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockDispenseArmorEvent.html)                                                    | Yes                |
| spigot   | [BlockDispenseEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockDispenseEvent.html)                                                              | Yes                |
| spigot   | [BlockDispenseLootEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockDispenseLootEvent.html)                                                      | Yes                |
| spigot   | [BlockDropItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockDropItemEvent.html)                                                              | Reviewed           |
| spigot   | [BlockEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockEvent.html)                                                                              | Reviewed           |
| spigot   | [BlockExpEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockExpEvent.html)                                                                        | Reviewed           |
| spigot   | [BlockExplodeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockExplodeEvent.html)                                                                | Yes                |
| spigot   | [BlockFadeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockFadeEvent.html)                                                                      | Reviewed           |
| paper    | [BlockFailedDispenseEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BlockFailedDispenseEvent.html)                                                    | Reviewed           |
| spigot   | [BlockFertilizeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockFertilizeEvent.html)                                                            | Reviewed           |
| spigot   | [BlockFormEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockFormEvent.html)                                                                      | Reviewed           |
| spigot   | [BlockFromToEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockFromToEvent.html)                                                                  | Yes                |
| spigot   | [BlockGrowEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockGrowEvent.html)                                                                      | Reviewed           |
| spigot   | [BlockIgniteEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockIgniteEvent.html)                                                                  | Reviewed           |
| paper    | [BlockLockCheckEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BlockLockCheckEvent.html)                                                              | Yes                |
| spigot   | [BlockMultiPlaceEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockMultiPlaceEvent.html)                                                          | Reviewed           |
| spigot   | [BlockPhysicsEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockPhysicsEvent.html)                                                                | Yes                |
| spigot   | [BlockPistonEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockPistonEvent.html)                                                                  | Reviewed           |
| spigot   | [BlockPistonExtendEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockPistonExtendEvent.html)                                                      | Reviewed           |
| spigot   | [BlockPistonRetractEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockPistonRetractEvent.html)                                                    | Reviewed           |
| spigot   | [BlockPlaceEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockPlaceEvent.html)                                                                    | Yes                |
| paper    | [BlockPreDispenseEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/BlockPreDispenseEvent.html)                                                          | Yes                |
| spigot   | [BlockReceiveGameEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockReceiveGameEvent.html)                                                        | Reviewed           |
| spigot   | [BlockRedstoneEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockRedstoneEvent.html)                                                              | Reviewed           |
| spigot   | [BlockShearEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockShearEntityEvent.html)                                                        | Yes                |
| spigot   | [BlockSpreadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BlockSpreadEvent.html)                                                                  | Yes                |
| spigot   | [BrewEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/BrewEvent.html)                                                                            | Reviewed           |
| spigot   | [BrewingStandFuelEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/BrewingStandFuelEvent.html)                                                    | Reviewed           |
| spigot   | [BrewingStartEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/BrewingStartEvent.html)                                                                | Reviewed           |
| spigot   | [BroadcastMessageEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/BroadcastMessageEvent.html)                                                       | Reviewed           |
| spigot   | [CampfireStartEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/CampfireStartEvent.html)                                                              | Reviewed           |
| paper    | [CartographyItemEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/CartographyItemEvent.html)                                                           | Reviewed           |
| spigot   | [CauldronLevelChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/CauldronLevelChangeEvent.html)                                                  | Yes                |
| bungee   | [ChatEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ChatEvent.html)                                                             | Reviewed           |
| paper    | [ChatEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/ChatEvent.html)                                                                                 | Reviewed           |
| spigot   | [ChunkEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/ChunkEvent.html)                                                                              | Reviewed           |
| spigot   | [ChunkLoadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/ChunkLoadEvent.html)                                                                      | Reviewed           |
| spigot   | [ChunkPopulateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/ChunkPopulateEvent.html)                                                              | Yes                |
| spigot   | [ChunkUnloadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/ChunkUnloadEvent.html)                                                                  | Reviewed           |
| bungee   | [ClientConnectEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ClientConnectEvent.html)                                           | Reviewed           |
| paper    | [ClientTickEndEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/packet/ClientTickEndEvent.html)                                                               | Reviewed           |
| velocity | [CommandExecuteEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/command/CommandExecuteEvent.html)                                        | Reviewed           |
| paper    | [CommandRegisteredEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/brigadier/CommandRegisteredEvent.html)                                             | Reviewed           |
| paper    | [CompostItemEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/CompostItemEvent.html)                                                                    | Reviewed           |
| velocity | [ConnectionHandshakeEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/connection/ConnectionHandshakeEvent.html)                           | Reviewed           |
| velocity | [CookieReceiveEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/CookieReceiveEvent.html)                                           | Reviewed           |
| velocity | [CookieRequestEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/CookieRequestEvent.html)                                           | Reviewed           |
| velocity | [CookieStoreEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/CookieStoreEvent.html)                                               | Reviewed           |
| spigot   | [CrafterCraftEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/CrafterCraftEvent.html)                                                                | Reviewed           |
| spigot   | [CraftItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/CraftItemEvent.html)                                                                  | Reviewed           |
| spigot   | [CreatureSpawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/CreatureSpawnEvent.html)                                                             | Reviewed           |
| paper    | [CreeperIgniteEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/CreeperIgniteEvent.html)                                                        | Reviewed           |
| spigot   | [CreeperPowerEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/CreeperPowerEvent.html)                                                               | Reviewed           |
| spigot   | [CubeMobSplitEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/CubeMobSplitEvent.html)                                                               | Yes                |
| bungee   | [CustomClickEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/CustomClickEvent.html)                                               | Yes                |
| velocity | [DisconnectEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/connection/DisconnectEvent.html)                                             | Reviewed           |
| paper    | [DragonEggFormEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/DragonEggFormEvent.html)                                                                | Yes                |
| paper    | [ElderGuardianAppearanceEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/ElderGuardianAppearanceEvent.html)                                           | Reviewed           |
| spigot   | [EnchantItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/enchantment/EnchantItemEvent.html)                                                            | Reviewed           |
| spigot   | [EnderDragonChangePhaseEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EnderDragonChangePhaseEvent.html)                                           | Yes                |
| paper    | [EnderDragonFireballHitEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EnderDragonFireballHitEvent.html)                                      | Yes                |
| paper    | [EnderDragonFlameEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EnderDragonFlameEvent.html)                                                  | Reviewed           |
| paper    | [EnderDragonShootFireballEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EnderDragonShootFireballEvent.html)                                  | Reviewed           |
| paper    | [EndermanAttackPlayerEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EndermanAttackPlayerEvent.html)                                          | Yes                |
| paper    | [EndermanEscapeEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EndermanEscapeEvent.html)                                                      | Yes                |
| spigot   | [EntitiesLoadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/EntitiesLoadEvent.html)                                                                | Yes                |
| spigot   | [EntitiesUnloadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/EntitiesUnloadEvent.html)                                                            | Yes                |
| paper    | [EntityAddToWorldEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EntityAddToWorldEvent.html)                                                  | Yes                |
| spigot   | [EntityAirChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityAirChangeEvent.html)                                                         | Reviewed           |
| paper    | [EntityAttemptSmashAttackEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityAttemptSmashAttackEvent.html)                                         | Reviewed           |
| paper    | [EntityAttemptSpinAttackEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityAttemptSpinAttackEvent.html)                                           | Reviewed           |
| spigot   | [EntityBlockFormEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/EntityBlockFormEvent.html)                                                          | Yes                |
| spigot   | [EntityBreakDoorEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityBreakDoorEvent.html)                                                         | Reviewed           |
| spigot   | [EntityBreedEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityBreedEvent.html)                                                                 | Reviewed           |
| spigot   | [EntityChangeBlockEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityChangeBlockEvent.html)                                                     | Yes                |
| spigot   | [EntityCombustByBlockEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityCombustByBlockEvent.html)                                               | Reviewed           |
| spigot   | [EntityCombustByEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityCombustByEntityEvent.html)                                             | Reviewed           |
| spigot   | [EntityCombustEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityCombustEvent.html)                                                             | Yes                |
| paper    | [EntityCompostItemEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityCompostItemEvent.html)                                                       | Reviewed           |
| spigot   | [EntityCreatePortalEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityCreatePortalEvent.html)                                                   | Reviewed           |
| spigot   | [EntityDamageByBlockEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDamageByBlockEvent.html)                                                 | Reviewed           |
| spigot   | [EntityDamageByEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDamageByEntityEvent.html)                                               | Reviewed           |
| spigot   | [EntityDamageEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDamageEvent.html)                                                               | Yes                |
| paper    | [EntityDamageItemEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityDamageItemEvent.html)                                                         | Yes                |
| spigot   | [EntityDeathEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDeathEvent.html)                                                                 | Reviewed           |
| spigot   | [EntityDismountEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDismountEvent.html)                                                           | Yes                |
| spigot   | [EntityDropItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDropItemEvent.html)                                                           | Reviewed           |
| paper    | [EntityDyeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityDyeEvent.html)                                                                       | Yes                |
| paper    | [EntityEffectTickEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityEffectTickEvent.html)                                                         | Yes                |
| spigot   | [EntityEnterBlockEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityEnterBlockEvent.html)                                                       | Yes                |
| spigot   | [EntityEnterLoveModeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityEnterLoveModeEvent.html)                                                 | Yes                |
| paper    | [EntityEquipmentChangedEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityEquipmentChangedEvent.html)                                             | Yes                |
| spigot   | [EntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityEvent.html)                                                                           | Reviewed           |
| spigot   | [EntityExhaustionEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityExhaustionEvent.html)                                                       | Yes                |
| spigot   | [EntityExplodeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityExplodeEvent.html)                                                             | Reviewed           |
| paper    | [EntityFertilizeEggEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityFertilizeEggEvent.html)                                                     | Yes                |
| paper    | [EntityIgniteEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityIgniteEvent.html)                                                                 | Yes                |
| paper    | [EntityInsideBlockEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityInsideBlockEvent.html)                                                       | Yes                |
| spigot   | [EntityInteractEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityInteractEvent.html)                                                           | Yes                |
| paper    | [EntityJumpEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EntityJumpEvent.html)                                                              | Reviewed           |
| paper    | [EntityKnockbackByEntityEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EntityKnockbackByEntityEvent.html)                                    | Reviewed           |
| spigot   | [EntityKnockbackByEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityKnockbackByEntityEvent.html)                                         | Reviewed           |
| paper    | [EntityKnockbackEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityKnockbackEvent.html)                                                           | Reviewed           |
| spigot   | [EntityKnockbackEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityKnockbackEvent.html)                                                         | Reviewed           |
| paper    | [EntityLoadCrossbowEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityLoadCrossbowEvent.html)                                                     | Reviewed           |
| paper    | [EntityLungeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityLungeEvent.html)                                                                   | Reviewed           |
| spigot   | [EntityMountEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityMountEvent.html)                                                                 | Reviewed           |
| paper    | [EntityMoveEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityMoveEvent.html)                                                                     | Yes                |
| paper    | [EntityPathfindEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EntityPathfindEvent.html)                                                      | Yes                |
| spigot   | [EntityPickupItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityPickupItemEvent.html)                                                       | Reviewed           |
| spigot   | [EntityPlaceEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityPlaceEvent.html)                                                                 | Yes                |
| spigot   | [EntityPortalEnterEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityPortalEnterEvent.html)                                                     | Reviewed           |
| spigot   | [EntityPortalEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityPortalEvent.html)                                                               | Reviewed           |
| spigot   | [EntityPortalExitEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityPortalExitEvent.html)                                                       | Reviewed           |
| paper    | [EntityPortalReadyEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityPortalReadyEvent.html)                                                       | Reviewed           |
| spigot   | [EntityPoseChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityPoseChangeEvent.html)                                                       | Reviewed           |
| spigot   | [EntityPotionEffectEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityPotionEffectEvent.html)                                                   | Reviewed           |
| paper    | [EntityPushedByEntityAttackEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityPushedByEntityAttackEvent.html)                                     | Reviewed           |
| spigot   | [EntityRegainHealthEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityRegainHealthEvent.html)                                                   | Yes                |
| spigot   | [EntityRemoveEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityRemoveEvent.html)                                                               | Yes                |
| paper    | [EntityRemoveFromWorldEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EntityRemoveFromWorldEvent.html)                                        | Reviewed           |
| spigot   | [EntityResurrectEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityResurrectEvent.html)                                                         | Reviewed           |
| spigot   | [EntityShootBowEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityShootBowEvent.html)                                                           | Reviewed           |
| spigot   | [EntitySpawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntitySpawnEvent.html)                                                                 | Reviewed           |
| spigot   | [EntitySpellCastEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntitySpellCastEvent.html)                                                         | Reviewed           |
| spigot   | [EntityTameEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityTameEvent.html)                                                                   | Reviewed           |
| spigot   | [EntityTargetBlockEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityTargetBlockEvent.html)                                                     | Reviewed           |
| spigot   | [EntityTargetEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityTargetEvent.html)                                                               | Reviewed           |
| spigot   | [EntityTargetLivingEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityTargetLivingEntityEvent.html)                                       | Reviewed           |
| paper    | [EntityTeleportEndGatewayEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EntityTeleportEndGatewayEvent.html)                                  | Reviewed           |
| spigot   | [EntityTeleportEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityTeleportEvent.html)                                                           | Reviewed           |
| spigot   | [EntityToggleGlideEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityToggleGlideEvent.html)                                                     | Reviewed           |
| paper    | [EntityToggleSitEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityToggleSitEvent.html)                                                           | Reviewed           |
| spigot   | [EntityToggleSwimEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityToggleSwimEvent.html)                                                       | Reviewed           |
| spigot   | [EntityTransformEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityTransformEvent.html)                                                         | Reviewed           |
| spigot   | [EntityUnleashEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityUnleashEvent.html)                                                             | Reviewed           |
| paper    | [EntityZapEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/EntityZapEvent.html)                                                                | Reviewed           |
| bungee   | [Event](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/plugin/Event.html)                                                                    | Reviewed           |
| spigot   | [Event](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/Event.html)                                                                                              | Yes                |
| purpur   | [ExecuteCommandEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/ExecuteCommandEvent.html)                                                                     | Reviewed           |
| spigot   | [ExpBottleEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ExpBottleEvent.html)                                                                     | Reviewed           |
| paper    | [ExperienceOrbMergeEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/ExperienceOrbMergeEvent.html)                                              | Reviewed           |
| spigot   | [ExplosionPrimeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ExplosionPrimeEvent.html)                                                           | Yes                |
| paper    | [FillProfileEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/profile/FillProfileEvent.html)                                                           | Reviewed           |
| spigot   | [FireworkExplodeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/FireworkExplodeEvent.html)                                                         | Reviewed           |
| paper    | [FishHookStateChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/FishHookStateChangeEvent.html)                                                   | Reviewed           |
| spigot   | [FluidLevelChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/FluidLevelChangeEvent.html)                                                        | Reviewed           |
| spigot   | [FoodLevelChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/FoodLevelChangeEvent.html)                                                         | Reviewed           |
| spigot   | [FurnaceBurnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/FurnaceBurnEvent.html)                                                              | Reviewed           |
| spigot   | [FurnaceExtractEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/FurnaceExtractEvent.html)                                                        | Reviewed           |
| spigot   | [FurnaceSmeltEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/FurnaceSmeltEvent.html)                                                            | Reviewed           |
| spigot   | [FurnaceStartSmeltEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/FurnaceStartSmeltEvent.html)                                                  | Reviewed           |
| velocity | [GameProfileRequestEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/GameProfileRequestEvent.html)                                 | Reviewed           |
| spigot   | [GenericGameEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/GenericGameEvent.html)                                                                  | Reviewed           |
| purpur   | [GoatRamEntityEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/GoatRamEntityEvent.html)                                                                | Reviewed           |
| purpur   | [GrindstoneTakeResultEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/inventory/GrindstoneTakeResultEvent.html)                                               | Reviewed           |
| paper    | [GS4QueryEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/GS4QueryEvent.html)                                                                  | Reviewed           |
| spigot   | [HangingBreakByEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/hanging/HangingBreakByEntityEvent.html)                                              | Reviewed           |
| spigot   | [HangingBreakEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/hanging/HangingBreakEvent.html)                                                              | Reviewed           |
| spigot   | [HangingEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/hanging/HangingEvent.html)                                                                        | Reviewed           |
| spigot   | [HangingPlaceEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/hanging/HangingPlaceEvent.html)                                                              | Reviewed           |
| spigot   | [HopperInventorySearchEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/HopperInventorySearchEvent.html)                                          | Reviewed           |
| spigot   | [HorseJumpEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/HorseJumpEvent.html)                                                                     | Reviewed           |
| paper    | [IllegalPacketEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/IllegalPacketEvent.html)                                                        | Reviewed           |
| spigot   | [InventoryBlockStartEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/InventoryBlockStartEvent.html)                                                  | Reviewed           |
| spigot   | [InventoryClickEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryClickEvent.html)                                                        | Yes                |
| spigot   | [InventoryCloseEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryCloseEvent.html)                                                        | Reviewed           |
| spigot   | [InventoryCreativeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryCreativeEvent.html)                                                  | Yes                |
| spigot   | [InventoryDragEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryDragEvent.html)                                                          | Yes                |
| spigot   | [InventoryEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryEvent.html)                                                                  | Reviewed           |
| spigot   | [InventoryInteractEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryInteractEvent.html)                                                  | Reviewed           |
| spigot   | [InventoryMoveItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryMoveItemEvent.html)                                                  | Reviewed           |
| spigot   | [InventoryOpenEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryOpenEvent.html)                                                          | Reviewed           |
| spigot   | [InventoryPickupItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/InventoryPickupItemEvent.html)                                              | Yes                |
| paper    | [ItemCraftedEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/inventory/ItemCraftedEvent.html)                                                                | Reviewed           |
| spigot   | [ItemDespawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ItemDespawnEvent.html)                                                                 | Reviewed           |
| spigot   | [ItemMergeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ItemMergeEvent.html)                                                                     | Reviewed           |
| spigot   | [ItemSpawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ItemSpawnEvent.html)                                                                     | Reviewed           |
| paper    | [ItemTransportingEntityValidateTargetEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/ItemTransportingEntityValidateTargetEvent.html)                 | Yes                |
| velocity | [KickedFromServerEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/KickedFromServerEvent.html)                                     | Reviewed           |
| spigot   | [LeavesDecayEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/LeavesDecayEvent.html)                                                                  | Reviewed           |
| spigot   | [LightningStrikeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/weather/LightningStrikeEvent.html)                                                        | Reviewed           |
| spigot   | [LingeringPotionSplashEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/LingeringPotionSplashEvent.html)                                             | Yes                |
| velocity | [ListenerBoundEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/ListenerBoundEvent.html)                                            | Reviewed           |
| velocity | [ListenerCloseEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/ListenerCloseEvent.html)                                            | Yes                |
| purpur   | [LlamaJoinCaravanEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/LlamaJoinCaravanEvent.html)                                                          | Reviewed           |
| purpur   | [LlamaLeaveCaravanEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/LlamaLeaveCaravanEvent.html)                                                        | Reviewed           |
| bungee   | [LoginEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/LoginEvent.html)                                                           | Reviewed           |
| velocity | [LoginEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/connection/LoginEvent.html)                                                       | Yes                |
| paper    | [LookupProfileEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/profile/LookupProfileEvent.html)                                                       | Reviewed           |
| paper    | [LootableInventoryReplenishEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/loottable/LootableInventoryReplenishEvent.html)                                 | Reviewed           |
| spigot   | [LootGenerateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/LootGenerateEvent.html)                                                                | Yes                |
| spigot   | [MapInitializeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/MapInitializeEvent.html)                                                             | Reviewed           |
| spigot   | [MoistureChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/MoistureChangeEvent.html)                                                            | Reviewed           |
| spigot   | [NotePlayEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/NotePlayEvent.html)                                                                        | Reviewed           |
| paper    | [PaperServerListPingEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/PaperServerListPingEvent.html)                                            | Reviewed           |
| bungee   | [PermissionCheckEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/PermissionCheckEvent.html)                                       | Reviewed           |
| velocity | [PermissionsSetupEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/permission/PermissionsSetupEvent.html)                                 | Reviewed           |
| paper    | [PhantomPreSpawnEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/PhantomPreSpawnEvent.html)                                                    | Yes                |
| spigot   | [PiglinBarterEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/PiglinBarterEvent.html)                                                               | Reviewed           |
| spigot   | [PigZapEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/PigZapEvent.html)                                                                           | Reviewed           |
| spigot   | [PigZombieAngerEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/PigZombieAngerEvent.html)                                                           | Reviewed           |
| paper    | [PlayerAdvancementCriterionGrantEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerAdvancementCriterionGrantEvent.html)                    | Reviewed           |
| spigot   | [PlayerAdvancementDoneEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerAdvancementDoneEvent.html)                                             | Reviewed           |
| purpur   | [PlayerAFKEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/PlayerAFKEvent.html)                                                                               | Yes                |
| spigot   | [PlayerAnimationEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerAnimationEvent.html)                                                         | Reviewed           |
| paper    | [PlayerArmorChangeEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerArmorChangeEvent.html)                                                | Reviewed           |
| spigot   | [PlayerArmorStandManipulateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerArmorStandManipulateEvent.html)                                   | Reviewed           |
| paper    | [PlayerArmSwingEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerArmSwingEvent.html)                                                             | Reviewed           |
| paper    | [PlayerAttackEntityCooldownResetEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerAttackEntityCooldownResetEvent.html)                    | Yes                |
| velocity | [PlayerAvailableCommandsEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/command/PlayerAvailableCommandsEvent.html)                      | Reviewed           |
| spigot   | [PlayerBedEnterEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerBedEnterEvent.html)                                                           | Reviewed           |
| paper    | [PlayerBedFailEnterEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerBedFailEnterEvent.html)                                                     | Reviewed           |
| spigot   | [PlayerBedLeaveEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerBedLeaveEvent.html)                                                           | Reviewed           |
| purpur   | [PlayerBookTooLargeEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/player/PlayerBookTooLargeEvent.html)                                                      | Reviewed           |
| spigot   | [PlayerBucketEmptyEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerBucketEmptyEvent.html)                                                     | Reviewed           |
| spigot   | [PlayerBucketEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerBucketEntityEvent.html)                                                   | Yes                |
| spigot   | [PlayerBucketEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerBucketEvent.html)                                                               | Reviewed           |
| spigot   | [PlayerBucketFillEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerBucketFillEvent.html)                                                       | Reviewed           |
| spigot   | [PlayerBucketFishEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerBucketFishEvent.html)                                                       | Reviewed           |
| paper    | [PlayerChangeBeaconEffectEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerChangeBeaconEffectEvent.html)                                         | Reviewed           |
| spigot   | [PlayerChangedMainHandEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerChangedMainHandEvent.html)                                             | Reviewed           |
| spigot   | [PlayerChangedWorldEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerChangedWorldEvent.html)                                                   | Reviewed           |
| spigot   | [PlayerChannelEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerChannelEvent.html)                                                             | Reviewed           |
| velocity | [PlayerChannelRegisterEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerChannelRegisterEvent.html)                           | Yes                |
| velocity | [PlayerChannelUnregisterEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerChannelUnregisterEvent.html)                       | Reviewed           |
| spigot   | [PlayerChatEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerChatEvent.html)                                                                   | Yes                |
| velocity | [PlayerChatEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerChatEvent.html)                                                 | Reviewed           |
| spigot   | [PlayerChatTabCompleteEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerChatTabCompleteEvent.html)                                             | Reviewed           |
| velocity | [PlayerChooseInitialServerEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerChooseInitialServerEvent.html)                   | Reviewed           |
| paper    | [PlayerChunkLoadEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/packet/PlayerChunkLoadEvent.html)                                                           | Yes                |
| paper    | [PlayerChunkUnloadEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/packet/PlayerChunkUnloadEvent.html)                                                       | Reviewed           |
| velocity | [PlayerClientBrandEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerClientBrandEvent.html)                                   | Reviewed           |
| paper    | [PlayerClientLoadedWorldEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerClientLoadedWorldEvent.html)                                           | Yes                |
| paper    | [PlayerClientOptionsChangeEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerClientOptionsChangeEvent.html)                                | Reviewed           |
| paper    | [PlayerCodeOfConductSendEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/connection/configuration/PlayerCodeOfConductSendEvent.html)                         | Yes                |
| spigot   | [PlayerCommandPreprocessEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerCommandPreprocessEvent.html)                                         | Reviewed           |
| spigot   | [PlayerCommandSendEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerCommandSendEvent.html)                                                     | Reviewed           |
| bungee   | [PlayerConfigurationEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/PlayerConfigurationEvent.html)                               | Reviewed           |
| velocity | [PlayerConfigurationEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/configuration/PlayerConfigurationEvent.html)                 | Reviewed           |
| paper    | [PlayerConnectionCloseEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerConnectionCloseEvent.html)                                        | Reviewed           |
| paper    | [PlayerConnectionInitialConfigureEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/connection/configuration/PlayerConnectionInitialConfigureEvent.html)       | Reviewed           |
| paper    | [PlayerConnectionReconfigureEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/connection/configuration/PlayerConnectionReconfigureEvent.html)                 | Yes                |
| paper    | [PlayerConnectionValidateLoginEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/connection/PlayerConnectionValidateLoginEvent.html)                           | Reviewed           |
| paper    | [PlayerCustomClickEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerCustomClickEvent.html)                                                       | Reviewed           |
| spigot   | [PlayerCustomClickEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerCustomClickEvent.html)                                                     | Reviewed           |
| spigot   | [PlayerDeathEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/PlayerDeathEvent.html)                                                                 | Reviewed           |
| paper    | [PlayerDeepSleepEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerDeepSleepEvent.html)                                                           | Yes                |
| bungee   | [PlayerDisconnectEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/PlayerDisconnectEvent.html)                                     | Reviewed           |
| spigot   | [PlayerDropItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerDropItemEvent.html)                                                           | Reviewed           |
| spigot   | [PlayerEditBookEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerEditBookEvent.html)                                                           | Reviewed           |
| spigot   | [PlayerEggThrowEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerEggThrowEvent.html)                                                           | Reviewed           |
| paper    | [PlayerElytraBoostEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerElytraBoostEvent.html)                                                | Reviewed           |
| velocity | [PlayerEnterConfigurationEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/configuration/PlayerEnterConfigurationEvent.html)       | Yes                |
| velocity | [PlayerEnteredConfigurationEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/configuration/PlayerEnteredConfigurationEvent.html)   | Reviewed           |
| spigot   | [PlayerEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerEvent.html)                                                                           | Reviewed           |
| spigot   | [PlayerExpChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerExpChangeEvent.html)                                                         | Reviewed           |
| spigot   | [PlayerExpCooldownChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerExpCooldownChangeEvent.html)                                         | Reviewed           |
| paper    | [PlayerFailMoveEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerFailMoveEvent.html)                                                             | Reviewed           |
| velocity | [PlayerFinishConfigurationEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/configuration/PlayerFinishConfigurationEvent.html)     | Reviewed           |
| velocity | [PlayerFinishedConfigurationEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/configuration/PlayerFinishedConfigurationEvent.html) | Reviewed           |
| spigot   | [PlayerFishEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerFishEvent.html)                                                                   | Reviewed           |
| paper    | [PlayerFlowerPotManipulateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerFlowerPotManipulateEvent.html)                                       | Reviewed           |
| spigot   | [PlayerGameModeChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerGameModeChangeEvent.html)                                               | Reviewed           |
| bungee   | [PlayerHandshakeEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/PlayerHandshakeEvent.html)                                       | Reviewed           |
| paper    | [PlayerHandshakeEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerHandshakeEvent.html)                                                    | Reviewed           |
| spigot   | [PlayerHarvestBlockEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerHarvestBlockEvent.html)                                                   | Yes                |
| spigot   | [PlayerHideEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerHideEntityEvent.html)                                                       | Reviewed           |
| spigot   | [PlayerInputEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerInputEvent.html)                                                                 | Reviewed           |
| paper    | [PlayerInsertLecternBookEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerInsertLecternBookEvent.html)                                           | Reviewed           |
| spigot   | [PlayerInteractAtEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerInteractAtEntityEvent.html)                                           | Yes                |
| spigot   | [PlayerInteractEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerInteractEntityEvent.html)                                               | Reviewed           |
| spigot   | [PlayerInteractEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerInteractEvent.html)                                                           | Yes                |
| paper    | [PlayerInventorySlotChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerInventorySlotChangeEvent.html)                                       | Reviewed           |
| spigot   | [PlayerItemBreakEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerItemBreakEvent.html)                                                         | Reviewed           |
| spigot   | [PlayerItemConsumeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerItemConsumeEvent.html)                                                     | Yes                |
| paper    | [PlayerItemCooldownEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerItemCooldownEvent.html)                                                     | Yes                |
| spigot   | [PlayerItemDamageEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerItemDamageEvent.html)                                                       | Reviewed           |
| paper    | [PlayerItemFrameChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerItemFrameChangeEvent.html)                                               | Reviewed           |
| paper    | [PlayerItemGroupCooldownEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerItemGroupCooldownEvent.html)                                           | Reviewed           |
| spigot   | [PlayerItemHeldEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerItemHeldEvent.html)                                                           | Reviewed           |
| spigot   | [PlayerItemMendEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerItemMendEvent.html)                                                           | Reviewed           |
| spigot   | [PlayerJoinEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerJoinEvent.html)                                                                   | Reviewed           |
| paper    | [PlayerJumpEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerJumpEvent.html)                                                              | Reviewed           |
| spigot   | [PlayerKickEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerKickEvent.html)                                                                   | Reviewed           |
| paper    | [PlayerLaunchProjectileEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerLaunchProjectileEvent.html)                                      | Yes                |
| spigot   | [PlayerLeashEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/PlayerLeashEntityEvent.html)                                                     | Reviewed           |
| paper    | [PlayerLecternPageChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerLecternPageChangeEvent.html)                                           | Reviewed           |
| spigot   | [PlayerLevelChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerLevelChangeEvent.html)                                                     | Reviewed           |
| spigot   | [PlayerLinksSendEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerLinksSendEvent.html)                                                         | Reviewed           |
| spigot   | [PlayerLocaleChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerLocaleChangeEvent.html)                                                   | Reviewed           |
| spigot   | [PlayerLoginEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerLoginEvent.html)                                                                 | Yes                |
| paper    | [PlayerLoomPatternSelectEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerLoomPatternSelectEvent.html)                                           | Reviewed           |
| paper    | [PlayerMapFilledEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerMapFilledEvent.html)                                                           | Yes                |
| velocity | [PlayerModInfoEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerModInfoEvent.html)                                           | Reviewed           |
| spigot   | [PlayerMoveEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerMoveEvent.html)                                                                   | Reviewed           |
| paper    | [PlayerNameEntityEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerNameEntityEvent.html)                                                         | Reviewed           |
| paper    | [PlayerNaturallySpawnCreaturesEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/PlayerNaturallySpawnCreaturesEvent.html)                        | Reviewed           |
| paper    | [PlayerOpenSignEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerOpenSignEvent.html)                                                             | Reviewed           |
| paper    | [PlayerPickBlockEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerPickBlockEvent.html)                                                           | Yes                |
| paper    | [PlayerPickEntityEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerPickEntityEvent.html)                                                         | Yes                |
| paper    | [PlayerPickItemEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerPickItemEvent.html)                                                             | Yes                |
| spigot   | [PlayerPickupArrowEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerPickupArrowEvent.html)                                                     | Reviewed           |
| paper    | [PlayerPickupExperienceEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerPickupExperienceEvent.html)                                      | Reviewed           |
| spigot   | [PlayerPickupItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerPickupItemEvent.html)                                                       | Reviewed           |
| spigot   | [PlayerPortalEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerPortalEvent.html)                                                               | Reviewed           |
| paper    | [PlayerPostRespawnEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerPostRespawnEvent.html)                                                | Reviewed           |
| spigot   | [PlayerPreLoginEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerPreLoginEvent.html)                                                           | Reviewed           |
| paper    | [PlayerPurchaseEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerPurchaseEvent.html)                                                             | Yes                |
| spigot   | [PlayerQuitEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerQuitEvent.html)                                                                   | Reviewed           |
| paper    | [PlayerReadyArrowEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerReadyArrowEvent.html)                                                  | Yes                |
| paper    | [PlayerRecipeBookClickEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerRecipeBookClickEvent.html)                                        | Yes                |
| spigot   | [PlayerRecipeBookClickEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerRecipeBookClickEvent.html)                                             | Yes                |
| spigot   | [PlayerRecipeBookSettingsChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerRecipeBookSettingsChangeEvent.html)                           | Reviewed           |
| spigot   | [PlayerRecipeDiscoverEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerRecipeDiscoverEvent.html)                                               | Reviewed           |
| spigot   | [PlayerRegisterChannelEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerRegisterChannelEvent.html)                                             | Reviewed           |
| spigot   | [PlayerResourcePackStatusEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerResourcePackStatusEvent.html)                                       | Reviewed           |
| velocity | [PlayerResourcePackStatusEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerResourcePackStatusEvent.html)                     | Reviewed           |
| spigot   | [PlayerRespawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerRespawnEvent.html)                                                             | Reviewed           |
| spigot   | [PlayerRiptideEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerRiptideEvent.html)                                                             | Reviewed           |
| paper    | [PlayerServerFullCheckEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerServerFullCheckEvent.html)                                               | Yes                |
| purpur   | [PlayerSetSpawnerTypeWithEggEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/PlayerSetSpawnerTypeWithEggEvent.html)                                           | Reviewed           |
| paper    | [PlayerSetSpawnEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerSetSpawnEvent.html)                                                      | Reviewed           |
| velocity | [PlayerSettingsChangedEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/PlayerSettingsChangedEvent.html)                           | Reviewed           |
| purpur   | [PlayerSetTrialSpawnerTypeWithEggEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/PlayerSetTrialSpawnerTypeWithEggEvent.html)                                 | Reviewed           |
| paper    | [PlayerShearBlockEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/PlayerShearBlockEvent.html)                                                          | Reviewed           |
| spigot   | [PlayerShearEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerShearEntityEvent.html)                                                     | Reviewed           |
| paper    | [PlayerShieldDisableEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerShieldDisableEvent.html)                                                   | Reviewed           |
| spigot   | [PlayerShowEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerShowEntityEvent.html)                                                       | Reviewed           |
| paper    | [PlayerSignCommandPreprocessEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerSignCommandPreprocessEvent.html)                                   | Reviewed           |
| spigot   | [PlayerSignOpenEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerSignOpenEvent.html)                                                           | Reviewed           |
| spigot   | [PlayerSpawnChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerSpawnChangeEvent.html)                                                     | Reviewed           |
| spigot   | [PlayerSpawnLocationEvent](https://hub.spigotmc.org/javadocs/spigot/org/spigotmc/event/player/PlayerSpawnLocationEvent.html)                                               | Reviewed           |
| paper    | [PlayerStartSpectatingEntityEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerStartSpectatingEntityEvent.html)                            | Reviewed           |
| spigot   | [PlayerStatisticIncrementEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerStatisticIncrementEvent.html)                                       | Reviewed           |
| paper    | [PlayerStonecutterRecipeSelectEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerStonecutterRecipeSelectEvent.html)                               | Reviewed           |
| paper    | [PlayerStopSpectatingEntityEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerStopSpectatingEntityEvent.html)                              | Reviewed           |
| paper    | [PlayerStopUsingItemEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerStopUsingItemEvent.html)                                                   | Reviewed           |
| spigot   | [PlayerSwapHandItemsEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerSwapHandItemsEvent.html)                                                 | Reviewed           |
| paper    | [PlayerSwapWithEquipmentSlotEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerSwapWithEquipmentSlotEvent.html)                                   | Reviewed           |
| spigot   | [PlayerTakeLecternBookEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerTakeLecternBookEvent.html)                                             | Reviewed           |
| paper    | [PlayerTeleportEndGatewayEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerTeleportEndGatewayEvent.html)                                  | Reviewed           |
| spigot   | [PlayerTeleportEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerTeleportEvent.html)                                                           | Reviewed           |
| paper    | [PlayerToggleEntityAgeLockEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerToggleEntityAgeLockEvent.html)                                       | Reviewed           |
| spigot   | [PlayerToggleFlightEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerToggleFlightEvent.html)                                                   | Reviewed           |
| spigot   | [PlayerToggleSneakEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerToggleSneakEvent.html)                                                     | Reviewed           |
| spigot   | [PlayerToggleSprintEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerToggleSprintEvent.html)                                                   | Reviewed           |
| paper    | [PlayerTrackEntityEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerTrackEntityEvent.html)                                                       | Yes                |
| paper    | [PlayerTradeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerTradeEvent.html)                                                                   | Reviewed           |
| spigot   | [PlayerUnleashEntityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerUnleashEntityEvent.html)                                                 | Yes                |
| spigot   | [PlayerUnregisterChannelEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerUnregisterChannelEvent.html)                                         | Reviewed           |
| paper    | [PlayerUntrackEntityEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PlayerUntrackEntityEvent.html)                                                   | Reviewed           |
| paper    | [PlayerUseUnknownEntityEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/player/PlayerUseUnknownEntityEvent.html)                                      | Yes                |
| spigot   | [PlayerVelocityEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/player/PlayerVelocityEvent.html)                                                           | Yes                |
| spigot   | [PluginDisableEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/PluginDisableEvent.html)                                                             | Reviewed           |
| spigot   | [PluginEnableEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/PluginEnableEvent.html)                                                               | Reviewed           |
| spigot   | [PluginEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/PluginEvent.html)                                                                           | Reviewed           |
| bungee   | [PluginMessageEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/PluginMessageEvent.html)                                           | Yes                |
| velocity | [PluginMessageEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/connection/PluginMessageEvent.html)                                       | Reviewed           |
| spigot   | [PortalCreateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/PortalCreateEvent.html)                                                                | Reviewed           |
| velocity | [PostCommandInvocationEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/command/PostCommandInvocationEvent.html)                          | Yes                |
| bungee   | [PostLoginEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/PostLoginEvent.html)                                                   | Reviewed           |
| velocity | [PostLoginEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/connection/PostLoginEvent.html)                                               | Reviewed           |
| spigot   | [PotionSplashEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/PotionSplashEvent.html)                                                               | Reviewed           |
| purpur   | [PreBlockExplodeEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/PreBlockExplodeEvent.html)                                                                   | Reviewed           |
| paper    | [PreCreatureSpawnEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/PreCreatureSpawnEvent.html)                                                  | Yes                |
| purpur   | [PreEntityExplodeEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/PreEntityExplodeEvent.html)                                                          | Reviewed           |
| paper    | [PreFillProfileEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/profile/PreFillProfileEvent.html)                                                     | Reviewed           |
| bungee   | [PreLoginEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/PreLoginEvent.html)                                                     | Reviewed           |
| velocity | [PreLoginEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/connection/PreLoginEvent.html)                                                 | Reviewed           |
| paper    | [PreLookupProfileEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/profile/PreLookupProfileEvent.html)                                                 | Yes                |
| spigot   | [PrepareAnvilEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/PrepareAnvilEvent.html)                                                            | Reviewed           |
| paper    | [PrepareGrindstoneEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/inventory/PrepareGrindstoneEvent.html)                                             | Reviewed           |
| spigot   | [PrepareGrindstoneEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/PrepareGrindstoneEvent.html)                                                  | Reviewed           |
| spigot   | [PrepareInventoryResultEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/PrepareInventoryResultEvent.html)                                        | Yes                |
| spigot   | [PrepareItemCraftEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/PrepareItemCraftEvent.html)                                                    | Reviewed           |
| spigot   | [PrepareItemEnchantEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/enchantment/PrepareItemEnchantEvent.html)                                              | Yes                |
| paper    | [PrepareResultEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/inventory/PrepareResultEvent.html)                                                     | Reviewed           |
| spigot   | [PrepareSmithingEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/PrepareSmithingEvent.html)                                                      | Yes                |
| paper    | [PrePlayerAttackEntityEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/player/PrePlayerAttackEntityEvent.html)                                               | Reviewed           |
| paper    | [PreSpawnerSpawnEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/PreSpawnerSpawnEvent.html)                                                    | Reviewed           |
| velocity | [PreTransferEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/connection/PreTransferEvent.html)                                           | Reviewed           |
| paper    | [ProfileWhitelistVerifyEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/profile/ProfileWhitelistVerifyEvent.html)                                     | Reviewed           |
| paper    | [ProjectileCollideEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/ProjectileCollideEvent.html)                                                | Reviewed           |
| spigot   | [ProjectileHitEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ProjectileHitEvent.html)                                                             | Yes                |
| spigot   | [ProjectileLaunchEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/ProjectileLaunchEvent.html)                                                       | Reviewed           |
| velocity | [ProxyInitializeEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/ProxyInitializeEvent.html)                                        | Reviewed           |
| bungee   | [ProxyPingEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ProxyPingEvent.html)                                                   | Reviewed           |
| velocity | [ProxyPingEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/ProxyPingEvent.html)                                                    | Yes                |
| velocity | [ProxyPreShutdownEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/ProxyPreShutdownEvent.html)                                      | Yes                |
| velocity | [ProxyQueryEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/query/ProxyQueryEvent.html)                                                  | Reviewed           |
| bungee   | [ProxyReloadEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ProxyReloadEvent.html)                                               | Reviewed           |
| velocity | [ProxyReloadEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/ProxyReloadEvent.html)                                                | Reviewed           |
| velocity | [ProxyShutdownEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/ProxyShutdownEvent.html)                                            | Reviewed           |
| paper    | [PufferFishStateChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/PufferFishStateChangeEvent.html)                                               | Yes                |
| spigot   | [RaidEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/raid/RaidEvent.html)                                                                                 | Reviewed           |
| spigot   | [RaidFinishEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/raid/RaidFinishEvent.html)                                                                     | Reviewed           |
| spigot   | [RaidSpawnWaveEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/raid/RaidSpawnWaveEvent.html)                                                               | Reviewed           |
| spigot   | [RaidStopEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/raid/RaidStopEvent.html)                                                                         | Reviewed           |
| spigot   | [RaidTriggerEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/raid/RaidTriggerEvent.html)                                                                   | Reviewed           |
| paper    | [RegionizedServerInitEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/threadedregions/RegionizedServerInitEvent.html)                                              | Yes                |
| paper    | [RegistryComposeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/registry/event/RegistryComposeEvent.html)                                                         | Reviewed           |
| paper    | [RegistryEntryAddEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/registry/event/RegistryEntryAddEvent.html)                                                       | Reviewed           |
| paper    | [RegistryEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/registry/event/RegistryEvent.html)                                                                       | Reviewed           |
| spigot   | [RemoteServerCommandEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/RemoteServerCommandEvent.html)                                                 | Reviewed           |
| velocity | [ResultedEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/ResultedEvent.html)                                                            | Reviewed           |
| purpur   | [RidableMoveEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/RidableMoveEvent.html)                                                                    | Reviewed           |
| purpur   | [RidableSpacebarEvent](https://purpurmc.org/javadoc/org/purpurmc/purpur/event/entity/RidableSpacebarEvent.html)                                                            | Reviewed           |
| spigot   | [SculkBloomEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/SculkBloomEvent.html)                                                                    | Reviewed           |
| spigot   | [ServerCommandEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/ServerCommandEvent.html)                                                             | Yes                |
| bungee   | [ServerConnectedEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ServerConnectedEvent.html)                                       | Yes                |
| velocity | [ServerConnectedEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/ServerConnectedEvent.html)                                       | Reviewed           |
| bungee   | [ServerConnectEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ServerConnectEvent.html)                                           | Reviewed           |
| bungee   | [ServerDisconnectEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ServerDisconnectEvent.html)                                     | Reviewed           |
| spigot   | [ServerEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/ServerEvent.html)                                                                           | Reviewed           |
| paper    | [ServerExceptionEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/ServerExceptionEvent.html)                                                    | Reviewed           |
| bungee   | [ServerKickEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ServerKickEvent.html)                                                 | Reviewed           |
| spigot   | [ServerListPingEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/ServerListPingEvent.html)                                                           | Reviewed           |
| spigot   | [ServerLoadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/ServerLoadEvent.html)                                                                   | Reviewed           |
| velocity | [ServerLoginPluginMessageEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/ServerLoginPluginMessageEvent.html)                     | Reviewed           |
| velocity | [ServerPostConnectEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/ServerPostConnectEvent.html)                                   | Reviewed           |
| velocity | [ServerPreConnectEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/ServerPreConnectEvent.html)                                     | Reviewed           |
| velocity | [ServerRegisteredEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/server/ServerRegisteredEvent.html)                               | Reviewed           |
| velocity | [ServerResourcePackRemoveEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/ServerResourcePackRemoveEvent.html)                     | Reviewed           |
| velocity | [ServerResourcePackSendEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/ServerResourcePackSendEvent.html)                         | Reviewed           |
| paper    | [ServerResourcesReloadedEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/server/ServerResourcesReloadedEvent.html)                                           | Reviewed           |
| bungee   | [ServerSwitchEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/ServerSwitchEvent.html)                                             | Reviewed           |
| paper    | [ServerTickEndEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/ServerTickEndEvent.html)                                                        | Yes                |
| paper    | [ServerTickStartEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/ServerTickStartEvent.html)                                                    | Yes                |
| velocity | [ServerUnregisteredEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/proxy/server/ServerUnregisteredEvent.html)                           | Reviewed           |
| spigot   | [ServiceEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/ServiceEvent.html)                                                                         | Reviewed           |
| spigot   | [ServiceRegisterEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/ServiceRegisterEvent.html)                                                         | Reviewed           |
| spigot   | [ServiceUnregisterEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/ServiceUnregisterEvent.html)                                                     | Reviewed           |
| bungee   | [SettingsChangedEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/SettingsChangedEvent.html)                                       | Reviewed           |
| spigot   | [SheepDyeWoolEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/SheepDyeWoolEvent.html)                                                               | Reviewed           |
| spigot   | [SheepRegrowWoolEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/SheepRegrowWoolEvent.html)                                                         | Reviewed           |
| paper    | [ShulkerDuplicateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/ShulkerDuplicateEvent.html)                                                         | Reviewed           |
| spigot   | [SignChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/SignChangeEvent.html)                                                                    | Reviewed           |
| paper    | [SkeletonHorseTrapEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/SkeletonHorseTrapEvent.html)                                                | Reviewed           |
| paper    | [SlimeChangeDirectionEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/SlimeChangeDirectionEvent.html)                                          | Reviewed           |
| paper    | [SlimePathfindEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/SlimePathfindEvent.html)                                                        | Reviewed           |
| spigot   | [SlimeSplitEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/SlimeSplitEvent.html)                                                                   | Reviewed           |
| paper    | [SlimeSwimEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/SlimeSwimEvent.html)                                                                | Reviewed           |
| paper    | [SlimeTargetLivingEntityEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/SlimeTargetLivingEntityEvent.html)                                    | Reviewed           |
| paper    | [SlimeWanderEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/SlimeWanderEvent.html)                                                            | Reviewed           |
| spigot   | [SmithItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/SmithItemEvent.html)                                                                  | Yes                |
| spigot   | [SpawnChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/SpawnChangeEvent.html)                                                                  | Reviewed           |
| spigot   | [SpawnerSpawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/SpawnerSpawnEvent.html)                                                               | Reviewed           |
| spigot   | [SpongeAbsorbEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/SpongeAbsorbEvent.html)                                                                | Reviewed           |
| spigot   | [StriderTemperatureChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/StriderTemperatureChangeEvent.html)                                       | Reviewed           |
| spigot   | [StructureGrowEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/StructureGrowEvent.html)                                                              | Yes                |
| paper    | [StructuresLocateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/StructuresLocateEvent.html)                                                          | Yes                |
| bungee   | [TabCompleteEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/TabCompleteEvent.html)                                               | Reviewed           |
| spigot   | [TabCompleteEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/server/TabCompleteEvent.html)                                                                 | Yes                |
| velocity | [TabCompleteEvent](https://jd.papermc.io/velocity/3.6.0-SNAPSHOT/com/velocitypowered/api/event/player/TabCompleteEvent.html)                                               | Yes                |
| bungee   | [TabCompleteResponseEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/TabCompleteResponseEvent.html)                               | Reviewed           |
| paper    | [TameableDeathMessageEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/TameableDeathMessageEvent.html)                                                 | Reviewed           |
| bungee   | [TargetedEvent](https://ci.md-5.net/job/BungeeCord/ws/api/target/apidocs/net/md_5/bungee/api/event/TargetedEvent.html)                                                     | Reviewed           |
| paper    | [TargetHitEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/TargetHitEvent.html)                                                                        | Reviewed           |
| paper    | [ThrownEggHatchEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/ThrownEggHatchEvent.html)                                                      | Reviewed           |
| spigot   | [ThunderChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/weather/ThunderChangeEvent.html)                                                            | Yes                |
| spigot   | [TimeSkipEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/TimeSkipEvent.html)                                                                        | Reviewed           |
| paper    | [TNTPrimeEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/block/TNTPrimeEvent.html)                                                                   | Reviewed           |
| spigot   | [TNTPrimeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/TNTPrimeEvent.html)                                                                        | Reviewed           |
| spigot   | [TradeSelectEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/inventory/TradeSelectEvent.html)                                                              | Reviewed           |
| spigot   | [TrialSpawnerSpawnEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/TrialSpawnerSpawnEvent.html)                                                     | Reviewed           |
| paper    | [TurtleGoHomeEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/TurtleGoHomeEvent.html)                                                          | Reviewed           |
| paper    | [TurtleLayEggEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/TurtleLayEggEvent.html)                                                          | Yes                |
| paper    | [TurtleStartDiggingEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/TurtleStartDiggingEvent.html)                                              | Reviewed           |
| paper    | [UncheckedSignChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/packet/UncheckedSignChangeEvent.html)                                                   | Reviewed           |
| paper    | [VaultChangeStateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/block/VaultChangeStateEvent.html)                                                          | Reviewed           |
| spigot   | [VaultDisplayItemEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/block/VaultDisplayItemEvent.html)                                                        | Reviewed           |
| spigot   | [VehicleBlockCollisionEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleBlockCollisionEvent.html)                                            | Reviewed           |
| spigot   | [VehicleCollisionEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleCollisionEvent.html)                                                      | Reviewed           |
| spigot   | [VehicleCreateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleCreateEvent.html)                                                            | Reviewed           |
| spigot   | [VehicleDamageEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleDamageEvent.html)                                                            | Reviewed           |
| spigot   | [VehicleDestroyEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleDestroyEvent.html)                                                          | Reviewed           |
| spigot   | [VehicleEnterEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleEnterEvent.html)                                                              | Reviewed           |
| spigot   | [VehicleEntityCollisionEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleEntityCollisionEvent.html)                                          | Reviewed           |
| spigot   | [VehicleEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleEvent.html)                                                                        | Reviewed           |
| spigot   | [VehicleExitEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleExitEvent.html)                                                                | Reviewed           |
| spigot   | [VehicleMoveEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleMoveEvent.html)                                                                | Reviewed           |
| spigot   | [VehicleUpdateEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/vehicle/VehicleUpdateEvent.html)                                                            | Reviewed           |
| spigot   | [VillagerAcquireTradeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/VillagerAcquireTradeEvent.html)                                               | Reviewed           |
| spigot   | [VillagerCareerChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/VillagerCareerChangeEvent.html)                                               | Reviewed           |
| spigot   | [VillagerReplenishTradeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/VillagerReplenishTradeEvent.html)                                           | Yes                |
| spigot   | [VillagerReputationChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/VillagerReputationChangeEvent.html)                                       | Reviewed           |
| paper    | [WardenAngerChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/WardenAngerChangeEvent.html)                                                       | Reviewed           |
| paper    | [WaterBottleSplashEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/WaterBottleSplashEvent.html)                                                       | Reviewed           |
| spigot   | [WeatherChangeEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/weather/WeatherChangeEvent.html)                                                            | Reviewed           |
| spigot   | [WeatherEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/weather/WeatherEvent.html)                                                                        | Reviewed           |
| paper    | [WhitelistStateUpdateEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/server/WhitelistStateUpdateEvent.html)                                                 | Reviewed           |
| paper    | [WhitelistToggleEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/server/WhitelistToggleEvent.html)                                                    | Reviewed           |
| paper    | [WitchConsumePotionEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/WitchConsumePotionEvent.html)                                              | Reviewed           |
| paper    | [WitchReadyPotionEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/WitchReadyPotionEvent.html)                                                  | Yes                |
| paper    | [WitchThrowPotionEvent](https://jd.papermc.io/paper/26.2/com/destroystokyo/paper/event/entity/WitchThrowPotionEvent.html)                                                  | Reviewed           |
| paper    | [WorldBorderBoundsChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/border/WorldBorderBoundsChangeEvent.html)                                     | Reviewed           |
| paper    | [WorldBorderBoundsChangeFinishEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/border/WorldBorderBoundsChangeFinishEvent.html)                         | Reviewed           |
| paper    | [WorldBorderCenterChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/border/WorldBorderCenterChangeEvent.html)                                     | Reviewed           |
| paper    | [WorldBorderEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/border/WorldBorderEvent.html)                                                             | Reviewed           |
| paper    | [WorldDifficultyChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/WorldDifficultyChangeEvent.html)                                                | Reviewed           |
| spigot   | [WorldEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/WorldEvent.html)                                                                              | Reviewed           |
| paper    | [WorldGameRuleChangeEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/world/WorldGameRuleChangeEvent.html)                                                    | Reviewed           |
| spigot   | [WorldInitEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/WorldInitEvent.html)                                                                      | Reviewed           |
| spigot   | [WorldLoadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/WorldLoadEvent.html)                                                                      | Reviewed           |
| spigot   | [WorldSaveEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/WorldSaveEvent.html)                                                                      | Reviewed           |
| spigot   | [WorldUnloadEvent](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/world/WorldUnloadEvent.html)                                                                  | Yes                |
| spigot   | [EntityDismountEvent](https://spigot-javadoc.s7a.dev/spigot/1.10.2/org/spigotmc/event/entity/EntityDismountEvent.html)                                                     | Yes                |
| spigot   | [EntityMountEvent](https://spigot-javadoc.s7a.dev/spigot/1.10.2/org/spigotmc/event/entity/EntityMountEvent.html)                                                           | Reviewed           |
| spigot   | [PlayerAchievementAwardedEvent](https://spigot-javadoc.s7a.dev/spigot/1.10.2/org/bukkit/event/player/PlayerAchievementAwardedEvent.html)                                   | Reviewed           |
| paper    | [PlayerInitialSpawnEvent](https://spigot-javadoc.s7a.dev/paper/1.10.2/com/destroystokyo/paper/event/player/PlayerInitialSpawnEvent.html)                                   | Reviewed           |
| spigot   | [PlayerInventoryEvent](https://spigot-javadoc.s7a.dev/spigot/1.10.2/org/bukkit/event/player/PlayerInventoryEvent.html)                                                     | Yes                |
| paper    | [PlayerLocaleChangeEvent](https://spigot-javadoc.s7a.dev/paper/1.10.2/com/destroystokyo/paper/event/player/PlayerLocaleChangeEvent.html)                                   | Reviewed           |
| paper    | [EntityTransformedEvent](https://spigot-javadoc.s7a.dev/paper/1.13/com/destroystokyo/paper/event/entity/EntityTransformedEvent.html)                                       | Reviewed           |
| purpur   | [PlayerFeedAnimalEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.1/net/pl3x/purpur/event/PlayerFeedAnimalEvent.html)                                                     | Yes                |
| purpur   | [BlockTickEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.2/net/pl3x/purpur/event/block/BlockTickEvent.html)                                                             | Yes                |
| purpur   | [ExecuteCommandEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.2/net/pl3x/purpur/event/ExecuteCommandEvent.html)                                                         | Reviewed           |
| purpur   | [FluidTickEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.2/net/pl3x/purpur/event/block/FluidTickEvent.html)                                                             | Yes                |
| purpur   | [ChunkTooLargeEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.3/net/pl3x/purpur/event/ChunkTooLargeEvent.html)                                                           | Yes                |
| purpur   | [PlayerSetSpawnerTypeWithEggEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.3/net/pl3x/purpur/event/PlayerSetSpawnerTypeWithEggEvent.html)                               | Reviewed           |
| purpur   | [EntityJumpEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/entity/EntityJumpEvent.html)                                                          | Yes                |
| purpur   | [LlamaJoinCaravanEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/entity/LlamaJoinCaravanEvent.html)                                              | Reviewed           |
| purpur   | [LlamaLeaveCaravanEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/entity/LlamaLeaveCaravanEvent.html)                                            | Reviewed           |
| purpur   | [LootableInventoryFirstFillEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/block/LootableInventoryFirstFillEvent.html)                           | Yes                |
| purpur   | [MonsterEggSpawnEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/entity/MonsterEggSpawnEvent.html)                                                | Reviewed           |
| purpur   | [PlayerAFKEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/PlayerAFKEvent.html)                                                                   | Yes                |
| purpur   | [ThrownEggHatchEvent](https://spigot-javadoc.s7a.dev/purpur/1.14.4/net/pl3x/purpur/event/entity/ThrownEggHatchEvent.html)                                                  | Yes                |
| purpur   | [EntityPortalReadyEvent](https://spigot-javadoc.s7a.dev/purpur/1.15.1/net/pl3x/purpur/event/entity/EntityPortalReadyEvent.html)                                            | Yes                |
| purpur   | [AnvilTakeResultEvent](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/inventory/AnvilTakeResultEvent.html)                                             | Reviewed           |
| purpur   | [AnvilUpdateResultEvent](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/inventory/AnvilUpdateResultEvent.html)                                         | Yes                |
| purpur   | [EntityMoveEvent](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/entity/EntityMoveEvent.html)                                                          | Yes                |
| purpur   | [PlayerItemCooldownEvent](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/player/PlayerItemCooldownEvent.html)                                          | Yes                |
| purpur   | [PrepareGrindstoneEvent](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/inventory/PrepareGrindstoneEvent.html)                                         | Yes                |
| purpur   | [RidableSpacebarEvent](https://spigot-javadoc.s7a.dev/purpur/1.15.2/net/pl3x/purpur/event/entity/RidableSpacebarEvent.html)                                                | Reviewed           |
| purpur   | [DragonEggPlaceEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.1/net/pl3x/purpur/event/block/DragonEggPlaceEvent.html)                                                   | Yes                |
| purpur   | [EntityTeleportHinderedEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.4/net/pl3x/purpur/event/entity/EntityTeleportHinderedEvent.html)                                  | Reviewed           |
| purpur   | [PlayerBookTooLargeEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.4/net/pl3x/purpur/event/player/PlayerBookTooLargeEvent.html)                                          | Reviewed           |
| purpur   | [RidableMoveEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.4/net/pl3x/purpur/event/entity/RidableMoveEvent.html)                                                        | Reviewed           |
| purpur   | [StructureGenerateEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.4/net/pl3x/purpur/event/world/StructureGenerateEvent.html)                                             | Reviewed           |
| purpur   | [EntityTeleportHinderedEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.5/org/purpurmc/purpur/event/entity/EntityTeleportHinderedEvent.html)                              | Reviewed           |
| purpur   | [MonsterEggSpawnEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.5/org/purpurmc/purpur/event/entity/MonsterEggSpawnEvent.html)                                            | Reviewed           |
| purpur   | [StructureGenerateEvent](https://spigot-javadoc.s7a.dev/purpur/1.16.5/org/purpurmc/purpur/event/world/StructureGenerateEvent.html)                                         | Reviewed           |
| paper    | [StructureLocateEvent](https://spigot-javadoc.s7a.dev/paper/1.16.5/io/papermc/paper/event/world/StructureLocateEvent.html)                                                 | Reviewed           |
| purpur   | [PlayerPreviewChatEvent](https://spigot-javadoc.s7a.dev/purpur/1.19/org/purpurmc/purpur/event/player/PlayerPreviewChatEvent.html)                                          | Reviewed           |
| purpur   | [NetworkItemSerializeEvent](https://spigot-javadoc.s7a.dev/purpur/1.19.2/org/purpurmc/purpur/event/packet/NetworkItemSerializeEvent.html)                                  | Yes                |
| paper    | [RegistryFreezeEvent](https://spigot-javadoc.s7a.dev/paper/1.21/io/papermc/paper/registry/event/RegistryFreezeEvent.html)                                                  | Reviewed           |
| paper    | [EntityCollideWithEntityEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityCollideWithEntityEvent.html)                                           | Yes                |
| paper    | [EntityConstructEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/EntityConstructEvent.html)                                                           | Yes                |
| paper    | [SulfurCubeSwallowItemEvent](https://jd.papermc.io/paper/26.2/io/papermc/paper/event/entity/SulfurCubeSwallowItemEvent.html)                                               | Yes                |
