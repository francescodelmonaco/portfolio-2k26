import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/*
 * `proxy.ts`, non `middleware.ts`: in Next 16 la convenzione del file
 * middleware è deprecata (PROXY_FILENAME = 'proxy'). La semantica del matcher
 * è identica.
 */

function fromAcceptLanguage(header: string | null): Locale | null {
    if (!header) return null;

    const ranked = header
        .split(",")
        .map((part) => {
            const [tag, ...params] = part.trim().split(";");
            const q = params.find((p) => p.startsWith("q="));
            return { tag: tag.toLowerCase(), q: q ? Number.parseFloat(q.slice(2)) : 1 };
        })
        .sort((a, b) => b.q - a.q);

    for (const { tag } of ranked) {
        const base = tag.split("-")[0];
        if (isLocale(base)) return base;
    }
    return null;
}

export default function proxy(request: NextRequest) {
    /*
     * Il cookie batte Accept-Language di proposito: chi è passato
     * esplicitamente all'inglese verrebbe altrimenti rispedito all'italiano a
     * ogni visita, perché il suo browser continua a dire it-IT. La scelta
     * esplicita conta più dell'euristica.
     *
     * Il cookie lo scrive lo switcher lato client, mai qui: un Set-Cookie su un
     * redirect renderebbe la risposta non cacheabile dalla CDN.
     */
    const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale =
        (cookie && isLocale(cookie) ? cookie : null) ??
        fromAcceptLanguage(request.headers.get("accept-language")) ??
        defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    // 307, mai 308: la destinazione dipende dal visitatore, quindi un redirect
    // permanente verrebbe messo in cache inchiodando una sola lingua per tutti.
    return NextResponse.redirect(url, 307);
}

/*
 * Solo la root nuda. Ogni URL reale è già /it/… o /en/… grazie a
 * dynamicParams = false, quindi non c'è nessuna lista di esclusioni da
 * sbagliare e nessuna invocazione del proxy su _next, immagini, sitemap.xml o
 * robots.txt.
 */
export const config = { matcher: ["/"] };
