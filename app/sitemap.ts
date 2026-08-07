import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

/*
 * Deve restare nella root di app/: la route sitemap generata chiama questo
 * handler senza argomenti, quindi una copia sotto [locale] non potrebbe mai
 * leggere il parametro. Un unico file emette entrambe le lingue.
 */
const languages: Record<string, string> = {
    ...Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}`])),
    "x-default": `${siteUrl}/${defaultLocale}`,
};

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return locales.map((locale) => ({
        url: `${siteUrl}/${locale}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 1,
        alternates: { languages },
    }));
}
