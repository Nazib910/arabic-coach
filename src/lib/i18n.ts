export type Locale = "bn" | "en";

export const DEFAULT_LOCALE: Locale = "bn";
export const LOCALE_STORAGE_KEY = "arabic-coach-locale-v1";

export function isLocale(value: unknown): value is Locale {
  return value === "bn" || value === "en";
}

export function pick<T>(locale: Locale, values: { bn: T; en: T }): T {
  return values[locale];
}

export function bengaliNumber(value: number | string, locale: Locale) {
  return locale === "bn" ? String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]) : String(value);
}

export const commonText = {
  language: { bn: "ভাষা", en: "Language" },
  bangla: { bn: "বাংলা", en: "বাংলা" },
  english: { bn: "English", en: "English" },
} as const;
