"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/config";

const FLAGS: Record<Locale, string> = {
    it: "🇮🇹",
    en: "🇬🇧",
};

/*
 * A livello di modulo di proposito: scrivere document.cookie dentro il corpo
 * del componente è una mutazione globale che il React Compiler si rifiuta di
 * compilare.
 */
function remember(target: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
}

function swapLocaleSegment(pathname: string, target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
}

/**
 * Con esattamente due lingue, un unico link che mostra la lingua di *arrivo*
 * batte un controllo a due segmenti: dimezza la larghezza dentro una pillola
 * flottante e non lascia ambiguità su cosa faccia il clic.
 *
 * La bandiera è accompagnata dal codice lingua e non porta mai il significato
 * da sola: una bandiera nomina un paese, non una lingua, e 🇬🇧 per "inglese" è
 * la versione classica di quell'errore.
 *
 * Resta un vero <a href>, non un button che chiama router.replace(): è questo
 * che permette a Googlebot di trovare l'alternativa attraverso l'anchor, a Next
 * di precaricare l'altra lingua in hover, e al cmd-click di funzionare. Solo la
 * scrittura del cookie richiede JS.
 *
 * scroll={false} conta su una pagina lunga: senza, cambiare lingua a metà
 * pagina teletrasporta il lettore in cima.
 */
export default function LocaleSwitcher({
    current,
    labels,
}: {
    current: Locale;
    labels: { switchTo: Record<Locale, string> } & Record<Locale, string>;
}) {
    const pathname = usePathname();
    const target = locales.find((locale) => locale !== current) ?? current;

    return (
        <Link
            href={swapLocaleSegment(pathname, target)}
            hrefLang={target}
            scroll={false}
            onClick={() => remember(target)}
            title={labels.switchTo[target]}
            aria-label={labels.switchTo[target]}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
        >
            <span aria-hidden="true" className="text-sm leading-none">
                {FLAGS[target]}
            </span>
            <span aria-hidden="true" className="font-mono text-[11px] tracking-[0.14em]">
                {labels[target]}
            </span>
        </Link>
    );
}
