export const locales = ["it", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export const isLocale = (value: string): value is Locale =>
    (locales as readonly string[]).includes(value);

/** Tag BCP-47, per <html lang> e hreflang. */
export const htmlLang: Record<Locale, string> = {
    it: "it-IT",
    en: "en-GB",
};

/** Open Graph vuole gli underscore. */
export const ogLocale: Record<Locale, string> = {
    it: "it_IT",
    en: "en_GB",
};

export const LOCALE_COOKIE = "NEXT_LOCALE";
