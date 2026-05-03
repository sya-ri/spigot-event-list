import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

type EventRecord = {
  name: string;
  source: string;
  javadoc?: string;
  description: {
    ja?: string;
    en?: string;
  };
};

type EventFile = {
  lang: string[];
  events: EventRecord[];
};

type DescriptionPair = {
  ja: string;
  en: string;
};

const descriptionOverrides = new Map<string, DescriptionPair>([
  [
    "EntityLungeEvent|paper",
    {
      ja: "生物エンティティが槍で突進しようとした時に呼び出される。",
      en: "Called when a living entity tries to lunge with a spear.",
    },
  ],
  [
    "EntityTargetBlockEvent|spigot",
    {
      ja: "クリーチャーがブロックをターゲットまたはターゲット解除した時に呼び出される。たとえば、銅ゴーレムが特定のチェストへ向かうかどうかを判断する時など。",
      en: "Called when a creature targets or untargets a block, for example when a copper golem decides whether to walk to a given chest.",
    },
  ],
  [
    "ItemCraftedEvent|paper",
    {
      ja: "プレイヤーがクラフトグリッドの結果スロットからクラフト済みアイテムを取り出した時に呼び出される。",
      en: "Called when a player picks up a crafted item from the result slot of a crafting grid.",
    },
  ],
  [
    "PlayerChannelUnregisterEvent|velocity",
    {
      ja: "クライアント（プレイヤー）が unregister チャンネルを通じてプラグインメッセージを送信した時に発生する。",
      en: "This event is fired when a client (player) sends a plugin message through the unregister channel.",
    },
  ],
  [
    "PlayerConfigurationEvent|bungee",
    {
      ja: "プレイヤーの設定フェーズ中、設定完了前の適切なタイミングで呼び出される。",
      en: "Called during the player's configuration phase before configuration completes.",
    },
  ],
  [
    "PlayerSwapWithEquipmentSlotEvent|paper",
    {
      ja: "プレイヤーがアイテムを装備スロットと入れ替えた時に呼び出される。",
      en: "Triggered when a player swaps an item with an equipment slot.",
    },
  ],
  [
    "PlayerToggleEntityAgeLockEvent|paper",
    {
      ja: "プレイヤーがアイテムを使ってエンティティの年齢ロックを切り替えた時に呼び出される。",
      en: "Called when a player toggles the age lock of an entity using an item.",
    },
  ],
  [
    "EntityTransformedEvent|paper",
    {
      ja: "エンティティが別のエンティティへ変化した時に発生する。",
      en: "Fired when an entity transforms into another entity.",
    },
  ],
  [
    "PlayerAchievementAwardedEvent|spigot",
    {
      ja: "プレイヤーが実績を獲得した時に呼び出される。",
      en: "Called when a player earns an achievement.",
    },
  ],
  [
    "PlayerInitialSpawnEvent|paper",
    {
      ja: "プレイヤーの初期スポーン地点が決定された時に呼び出される。",
      en: "Called when a player's initial spawn location is determined.",
    },
  ],
  [
    "PlayerLocaleChangeEvent|paper",
    {
      ja: "プレイヤーのロケールが変更された時に呼び出される。",
      en: "Called when the locale of the player is changed.",
    },
  ],
  [
    "EntityTeleportHinderedEvent|purpur",
    {
      ja: "エンティティのテレポートが妨げられた時に発生する。",
      en: "Fired when an entity is hindered from teleporting.",
    },
  ],
  [
    "MonsterEggSpawnEvent|purpur",
    {
      ja: "モンスターエッグによってエンティティがスポーンした時に呼び出される。",
      en: "Called when a monster egg spawns an entity.",
    },
  ],
  [
    "StructureGenerateEvent|purpur",
    {
      ja: "構造物が生成された時に呼び出される。",
      en: "Called when a structure is generated.",
    },
  ],
  [
    "StructureLocateEvent|paper",
    {
      ja: "構造物または地形要素の位置を特定する前に呼び出される。",
      en: "Called before a structure or feature is located.",
    },
  ],
  [
    "NetworkItemSerializeEvent|purpur",
    {
      ja: "アイテムがパケットへ書き込まれる直前に呼び出される。",
      en: "Called when an item is about to be written to a packet.",
    },
  ],
  [
    "PlayerPreviewChatEvent|purpur",
    {
      ja: "プレイヤーのチャットメッセージのプレビューが生成される時に呼び出される。",
      en: "Called when a preview of a player's chat message is generated.",
    },
  ],
  [
    "RegistryFreezeEvent|paper",
    {
      ja: "レジストリが凍結され、それ以上変更できなくなる直前に呼び出される。",
      en: "Called right before a registry is frozen, preventing further changes.",
    },
  ],
]);

const eventKey = (event: Pick<EventRecord, "name" | "source">) =>
  `${event.name}|${event.source}`;

const normalizeText = (text: string | undefined) =>
  (text ?? "").replace(/\s+/g, " ").trim();

const hasDescription = (description: EventRecord["description"] | undefined) =>
  Boolean(normalizeText(description?.ja) && normalizeText(description?.en));

const scoreDescription = (description: DescriptionPair) =>
  description.ja.length + description.en.length;

const walkEventFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return walkEventFiles(entryPath);
      }
      return entry.name === "events.json" ? [entryPath] : [];
    }),
  );
  return files.flat().sort();
};

export const fillMissingDescriptionsInData = async (dataRoot: string) => {
  const eventFiles = await walkEventFiles(dataRoot);
  const parsedFiles = await Promise.all(
    eventFiles.map(async (filePath) => ({
      filePath,
      data: JSON.parse(await readFile(filePath, "utf8")) as EventFile,
    })),
  );

  const canonicalDescriptions = new Map<string, DescriptionPair>();
  for (const override of descriptionOverrides.entries()) {
    canonicalDescriptions.set(override[0], override[1]);
  }
  for (const { data } of parsedFiles) {
    for (const event of data.events) {
      if (!hasDescription(event.description)) {
        continue;
      }
      const key = eventKey(event);
      const candidate = {
        ja: normalizeText(event.description.ja),
        en: normalizeText(event.description.en),
      };
      const current = canonicalDescriptions.get(key);
      if (!current || scoreDescription(candidate) > scoreDescription(current)) {
        canonicalDescriptions.set(key, candidate);
      }
    }
  }

  for (const { filePath, data } of parsedFiles) {
    let changed = false;
    for (const event of data.events) {
      const key = eventKey(event);
      const current = {
        ja: normalizeText(event.description?.ja),
        en: normalizeText(event.description?.en),
      };
      if (current.ja && current.en) {
        continue;
      }
      const canonical = canonicalDescriptions.get(key);
      if (canonical) {
        event.description = {
          ja: current.ja || canonical.ja,
          en: current.en || canonical.en,
        };
        changed = true;
        continue;
      }
      const javadoc = normalizeText(event.javadoc);
      if (!javadoc) {
        continue;
      }
      event.description = {
        ja: current.ja || javadoc,
        en: current.en || javadoc,
      };
      changed = true;
    }
    if (changed) {
      await writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
    }
  }
};
