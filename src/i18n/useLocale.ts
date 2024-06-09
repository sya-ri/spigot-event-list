import { useCurrentLocale } from "next-i18n-router/client";
import { i18nConfig, Locale } from "@/i18n/config";

const useLocale = (): Locale => {
  const locale = useCurrentLocale(i18nConfig);
  if (locale && Locale.includes(locale as Locale)) return locale as Locale;
  return "en";
};

export default useLocale;
