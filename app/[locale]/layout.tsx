import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "../globals.css";
import ThemeScript from "@/components/theme/theme-script";
import ScrollToTop from "@/components/scroll-to-top";
import SiteHeader from "@/components/site-header";
import Footer from "@/components/footer";
import { fontVariables } from "@/lib/fonts";
import { defaultLocale, isLocale, locales, ogLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { site, siteUrl } from "@/lib/site";
import { THEME_COLORS } from "@/lib/theme-color";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

/**
 * Senza questo, /fr verrebbe renderizzato server-side su richiesta e servirebbe
 * contenuto italiano a un URL inventato, che Google può indicizzare. Con
 * questo, /fr è un 404 vero.
 */
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const active: Locale = isLocale(locale) ? locale : defaultLocale;
    const m = getMessages(active);

    /*
     * Per entrambe le lingue si restituisce lo stesso oggetto `languages`: così
     * si soddisfano in un colpo solo tutte e quattro le regole hreflang
     * (autoreferenziale, reciproco, x-default presente e canonical per lingua).
     */
    const languages: Record<string, string> = {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])),
        "x-default": `${siteUrl}/${defaultLocale}`,
    };

    return {
        metadataBase: new URL(siteUrl),
        title: { default: m.meta.title, template: `%s | ${m.meta.siteName}` },
        description: m.meta.description,
        keywords: m.meta.keywords,
        authors: [{ name: site.author, url: siteUrl }],
        creator: site.author,
        publisher: site.author,
        formatDetection: { email: false, address: false, telephone: false },
        alternates: { canonical: `${siteUrl}/${active}`, languages },
        openGraph: {
            type: "website",
            url: `${siteUrl}/${active}`,
            locale: ogLocale[active],
            alternateLocale: locales.filter((l) => l !== active).map((l) => ogLocale[l]),
            title: m.meta.title,
            description: m.meta.description,
            siteName: m.meta.siteName,
            // Nessuna chiave `images`, di proposito: dichiararla qui
            // oscurerebbe del tutto la convenzione del file
            // opengraph-image.tsx.
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        icons: {
            icon: [
                { url: "/favicon/favicon.svg", type: "image/svg+xml" },
                { url: "/favicon/favicon.ico", sizes: "any" },
            ],
            shortcut: "/favicon/favicon.ico",
            apple: "/favicon/apple-touch-icon.png",
        },
        manifest: "/favicon/site.webmanifest",
        category: "technology",
    };
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light dark",
    // Deve seguire --background in globals.css, altrimenti su mobile la
    // cornice del browser e il canvas della pagina si scostano di una sfumatura.
    // Questa coppia copre solo il caso senza JavaScript: con JS attivo vince il
    // meta senza `media` che lo script pre-paint mette in testa a <head>, perché
    // solo quello sa della preferenza esplicita salvata (vedi lib/theme-color.ts).
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
        { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    ],
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const m = getMessages(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body className={`${fontVariables} antialiased`}>
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase"
                >
                    {m.nav.skipToContent}
                </a>

                <SiteHeader locale={locale} nav={m.nav} theme={m.theme} />
                {children}
                <Footer />
                <ScrollToTop label={m.nav.home} />

                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
