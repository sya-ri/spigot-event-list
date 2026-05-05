import { Locale } from "@/i18n/config";

type Message = {
  SearchByNameOrDescription: string;
  AddNewLanguage: string;
  IncompleteEvents: string;
  SearchResultsCount: string;
  Latest: string;
  MinecraftVersion: string;
  Version: string;
  AiSkillTitle: string;
  AiSkillClose: string;
  AiSkillCopied: string;
};

export const messages: Record<Locale, Message> = {
  en: {
    SearchByNameOrDescription: "Search by name or description",
    AddNewLanguage: "Add new language",
    IncompleteEvents: "%size% event descriptions are not written.",
    SearchResultsCount: "%size% events found.",
    Latest: "latest",
    MinecraftVersion: "Minecraft version",
    Version: "Version",
    AiSkillTitle: "Event search skill for agents",
    AiSkillClose: "Close",
    AiSkillCopied: "Copied",
  },
  ja: {
    SearchByNameOrDescription: "イベント名・説明文で検索",
    AddNewLanguage: "翻訳を追加する",
    IncompleteEvents: "%size%個のイベント説明文が書かれていません。",
    SearchResultsCount: "%size%件ヒットしました。",
    Latest: "最新",
    MinecraftVersion: "Minecraft バージョン",
    Version: "バージョン",
    AiSkillTitle: "エージェント向けイベント検索スキル",
    AiSkillClose: "閉じる",
    AiSkillCopied: "コピー済み",
  },
};

export const translate = (locale: Locale, key: keyof Message) => {
  return messages[locale][key];
};
