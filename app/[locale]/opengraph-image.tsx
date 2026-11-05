import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { site, siteUrl } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Francesco Delmonaco - Full stack developer";

/**
 * Con generateStaticParams e senza export `runtime`, entrambi i PNG vengono
 * prerenderizzati a build time: costo zero per richiesta.
 *
 * Dichiarare `openGraph.images` in layout.tsx oscurerebbe questa convenzione
 * di file del tutto e in silenzio, per questo lì non viene dichiarata.
 */
/*
 * Satori non legge woff2 né font variabili: si chiedono a Google Fonts istanze
 * statiche TTF, ristrette con `text=` ai soli caratteri disegnati. Sono gli
 * stessi tre font di lib/fonts.ts, così la card parla la tipografia del sito.
 */
async function googleFont(family: string, axes: string, text: string) {
    const css = await fetch(
        `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) throw new Error(`Font ${family} non disponibile per l'immagine OG`);
    return fetch(url).then((r) => r.arrayBuffer());
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const active = isLocale(locale) ? locale : defaultLocale;
    const m = getMessages(active);

    const ink = "#12121A";
    const muted = "#5C5C6A";
    const line = "#E6E5E0";
    const accent = "#0729EF";

    const domain = siteUrl.replace("https://", "").toUpperCase();
    const [display, sans, mono] = await Promise.all([
        // come l'<h1> dell'hero: semibold a larghezza piena
        googleFont("Bricolage+Grotesque", "opsz,wght@96,600", site.firstName + site.lastName),
        googleFont("DM+Sans", "wght@400", m.meta.ogTagline + m.hero.role + m.hero.location + "·"),
        // come `.hud-label`
        googleFont("DM+Mono", "wght@500", domain),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#FCFCFB",
                    color: ink,
                    padding: 72,
                    fontFamily: "DM Sans",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        fontFamily: "DM Mono",
                        fontSize: 22,
                        letterSpacing: 4,
                        color: muted,
                    }}
                >
                    {domain}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            fontFamily: "Bricolage Grotesque",
                            fontSize: 96,
                            fontWeight: 600,
                            letterSpacing: -4,
                            lineHeight: 1,
                        }}
                    >
                        {site.firstName}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontFamily: "Bricolage Grotesque",
                            fontSize: 96,
                            fontWeight: 600,
                            letterSpacing: -4,
                            lineHeight: 1,
                            color: accent,
                        }}
                    >
                        {site.lastName}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            marginTop: 28,
                            fontSize: 30,
                            color: muted,
                            maxWidth: 820,
                        }}
                    >
                        {m.meta.ogTagline}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        borderTop: `1px solid ${line}`,
                        paddingTop: 28,
                        fontSize: 24,
                        color: muted,
                    }}
                >
                    <div style={{ display: "flex", color: ink }}>{m.hero.role}</div>
                    <div style={{ display: "flex" }}>·</div>
                    <div style={{ display: "flex" }}>{m.hero.location}</div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: "Bricolage Grotesque", data: display, weight: 600 },
                { name: "DM Sans", data: sans, weight: 400 },
                { name: "DM Mono", data: mono, weight: 500 },
            ],
        },
    );
}
