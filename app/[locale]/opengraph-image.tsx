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
    const accent = "#1C4EEF";

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
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        fontSize: 22,
                        letterSpacing: 4,
                        textTransform: "uppercase",
                        color: muted,
                    }}
                >
                    {siteUrl.replace("https://", "")}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 96,
                            fontWeight: 700,
                            letterSpacing: -4,
                            lineHeight: 1,
                        }}
                    >
                        {site.firstName}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 96,
                            fontWeight: 700,
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
        { ...size },
    );
}
