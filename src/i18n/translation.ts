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
  Keywords: string;
  CompareJavadoc: string;
  OpenJavadoc: string;
  NoJavadoc: string;
  SearchError: string;
};

export const messages: Record<Locale, Message> = {
  en: {
    SearchByNameOrDescription: "Search by name, description, or keyword",
    AddNewLanguage: "Add new language",
    IncompleteEvents: "%size% event descriptions are not written.",
    SearchResultsCount: "%size% events found.",
    Latest: "latest",
    MinecraftVersion: "Minecraft version",
    Version: "Version",
    AiSkillTitle: "Event search skill for agents",
    AiSkillClose: "Close",
    AiSkillCopied: "Copied",
    Keywords: "Related keywords",
    CompareJavadoc: "Compare with Javadoc",
    OpenJavadoc: "Open reference documentation",
    NoJavadoc:
      "No class summary is available. See the reference documentation or source for details.",
    SearchError:
      "Could not load events. Check your search terms and try again.",
  },
  ja: {
    SearchByNameOrDescription: "イベント名・説明文・キーワードで検索",
    AddNewLanguage: "翻訳を追加する",
    IncompleteEvents: "%size%個のイベント説明文が書かれていません。",
    SearchResultsCount: "%size%件ヒットしました。",
    Latest: "最新",
    MinecraftVersion: "Minecraft バージョン",
    Version: "バージョン",
    AiSkillTitle: "エージェント向けイベント検索スキル",
    AiSkillClose: "閉じる",
    AiSkillCopied: "コピー済み",
    Keywords: "関連キーワード",
    CompareJavadoc: "Javadoc と見比べる",
    OpenJavadoc: "参照ドキュメントを開く",
    NoJavadoc:
      "クラスの概要文はありません。参照ドキュメントやソースで詳細を確認できます。",
    SearchError:
      "イベントを取得できませんでした。検索語を確認して再度お試しください。",
  },
};

export const translate = (locale: Locale, key: keyof Message) => {
  return messages[locale][key];
};
