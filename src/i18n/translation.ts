import { Locale } from "@/i18n/config";

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
  ShowingEvents: string;
  Language: string;
  ToggleTheme: string;
  AiSkillCopyFailed: string;
  AiSkillCopy: string;
  SkipToResults: string;

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
  CompareJavadoc: string;
  OpenJavadoc: string;
  NoJavadoc: string;
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
    ShowingEvents: "Showing %shown% of %total% events.",
    Language: "Change language",
    ToggleTheme: "Switch theme",
    AiSkillCopyFailed: "Could not copy. Select and copy the command below.",
    AiSkillCopy: "Copy command",
    SkipToResults: "Skip to results",

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
    CompareJavadoc: "Compare with Javadoc",
    OpenJavadoc: "Open reference documentation",
    NoJavadoc:
      "No class summary is available. See the reference documentation or source for details.",
  },
  ja: {
    Search: "検索",
    ClearSearch: "検索をクリア",
    Filters: "絞り込み",
    LoadingEvents: "イベントを読み込み中…",
    LoadFailed: "イベントを読み込めませんでした。もう一度お試しください。",
    VersionsFailed: "バージョン一覧を読み込めませんでした。",
    Retry: "再試行",
    NoEvents:
      "一致するイベントがありません。検索語や絞り込み条件を変えてみてください。",
    NoSources: "イベントを表示するプラットフォームを選択してください。",
    ResetFilters: "絞り込みをリセット",
    LoadMore: "さらに表示",
    ShowingEvents: "%total%件中%shown%件を表示しています。",
    Language: "言語を変更",
    ToggleTheme: "テーマを切り替え",
    AiSkillCopyFailed:
      "コピーできませんでした。下のコマンドを選択してコピーしてください。",
    AiSkillCopy: "コマンドをコピー",
    SkipToResults: "検索結果へ移動",

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
    CompareJavadoc: "Javadoc と見比べる",
    OpenJavadoc: "参照ドキュメントを開く",
    NoJavadoc:
      "クラスの概要文はありません。参照ドキュメントやソースで詳細を確認できます。",
  },
};

export const translate = (locale: Locale, key: keyof Message) => {
  return messages[locale][key];
};
