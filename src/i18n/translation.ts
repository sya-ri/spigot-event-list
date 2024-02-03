type Message = {
  SearchByNameOrDescription: string;
  AddNewLanguage: string;
  IncompleteEvents: string;
};

export const messages: Record<string, Message> = {
  en: {
    SearchByNameOrDescription: "Search by name or description",
    AddNewLanguage: "Add new language",
    IncompleteEvents: "%size% event descriptions are not written.",
  },
  ja: {
    SearchByNameOrDescription: "イベント名・説明文で検索",
    AddNewLanguage: "翻訳を追加する",
    IncompleteEvents: "%size%個のイベント説明文が書かれていません。",
  },
};

export const translate = (locale: string | undefined, key: keyof Message) => {
  return messages[locale ?? "en"][key];
};
