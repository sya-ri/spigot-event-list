type Message = {
  SearchByName: string;
  AddNewLanguage: string;
};

export const messages: Record<string, Message> = {
  ja: {
    SearchByName: "イベント名・説明文で検索",
    AddNewLanguage: "翻訳を追加する",
  },
};

export const translate = (locale: string | undefined, key: keyof Message) => {
  return messages[locale ?? "ja"][key];
};
