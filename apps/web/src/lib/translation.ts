import { Locale } from "./locale";

type Message = {
  Search: string;
  ClearSearch: string;
  Filters: string;
  LoadingEvents: string;
  LoadFailed: string;
  VersionsFailed: string;
  Retry: string;
  NoEvents: string;
  NoSources: string;
  ResetFilters: string;
  LoadMore: string;
  Language: string;
  ToggleTheme: string;
  SkipToResults: string;

  SearchByNameOrDescription: string;
  AddNewLanguage: string;
  IncompleteEvents: string;
  Latest: string;
  MinecraftVersion: string;
  Version: string;
  AiSkillTitle: string;
};

export const messages: Record<Locale, Message> = {
  en: {
    Search: "Search",
    ClearSearch: "Clear search",
    Filters: "Filters",
    LoadingEvents: "Loading events…",
    LoadFailed: "Unable to load events. Please try again.",
    VersionsFailed: "Unable to load the version list.",
    Retry: "Try again",
    NoEvents: "No events match your search. Try different words or filters.",
    NoSources: "Select at least one platform to see events.",
    ResetFilters: "Reset filters",
    LoadMore: "Load more",
    Language: "Change language",
    ToggleTheme: "Switch theme",
    SkipToResults: "Skip to results",

    SearchByNameOrDescription: "Search by name, description, or keyword",
    AddNewLanguage: "Contribute a translation",
    IncompleteEvents: "%size% event descriptions are not written.",
    Latest: "latest",
    MinecraftVersion: "Minecraft version",
    Version: "Version",
    AiSkillTitle: "Agent skill",
  },
  ja: {
    Search: "検索",
    ClearSearch: "検索をクリア",
    Filters: "絞り込み",
    LoadingEvents: "イベントを読み込み中…",
    LoadFailed: "イベントを読み込めませんでした。もう一度お試しください。",
    VersionsFailed: "バージョン一覧を読み込めませんでした。",
    Retry: "再試行",
    NoEvents: "一致するイベントがありません。検索語や絞り込み条件を変えてみてください。",
    NoSources: "イベントを表示するプラットフォームを選択してください。",
    ResetFilters: "絞り込みをリセット",
    LoadMore: "さらに表示",
    Language: "言語を変更",
    ToggleTheme: "テーマを切り替え",
    SkipToResults: "検索結果へ移動",

    SearchByNameOrDescription: "イベント名・説明文・キーワードで検索",
    AddNewLanguage: "翻訳に参加",
    IncompleteEvents: "%size%個のイベント説明文が書かれていません。",
    Latest: "最新",
    MinecraftVersion: "Minecraft バージョン",
    Version: "バージョン",
    AiSkillTitle: "AI スキル",
  },
};

export const translate = (locale: Locale, key: keyof Message) => {
  return messages[locale][key];
};
