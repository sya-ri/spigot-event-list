export const Locale = ["en", "ja"] as const;

export type Locale = (typeof Locale)[number];

export const i18nConfig = {
  locales: ["default", ...Locale],
  defaultLocale: "default",
  prefixDefault: true,
};
