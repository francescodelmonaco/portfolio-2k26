import Link from "next/link";

import "./globals.css";
import ThemeScript from "@/components/theme/theme-script";
import { fontVariables } from "@/lib/fonts";
import { defaultLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

/**
 * Intercetta ogni 404, incluso `/fr`: `dynamicParams = false` fa sì che
 * app/[locale]/layout.tsx chiami notFound() per un segmento di lingua
 * sconosciuto, e un boundary non può salvare proprio il layout sotto cui vive:
 * deve stare in un segmento genitore. Dato che app/[locale]/layout.tsx *è* il
 * root layout, questo file è quel genitore, ed è il motivo per cui si porta
 * dietro il proprio guscio di documento.
 *
 * Di conseguenza rende sempre nella lingua di default: a questo punto non c'è
 * nessun segmento di lingua affidabile da leggere.
 */
export default function NotFound() {
    const m = getMessages(defaultLocale);

    return (
        <html lang={defaultLocale} suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body className={`${fontVariables} antialiased`}>
                <main className="mx-auto flex w-full max-w-5xl flex-col items-start px-6 py-28 md:py-40">
                    <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                        404
                    </p>
                    <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                        {m.notFound.title}
                    </h1>
                    <p className="mt-4 max-w-[46ch] leading-relaxed text-muted-foreground">
                        {m.notFound.body}
                    </p>
                    <Link
                        href={`/${defaultLocale}`}
                        className="mt-8 rounded-full border border-border px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 hover:border-border-strong hover:text-primary"
                    >
                        {m.notFound.back}
                    </Link>
                </main>
            </body>
        </html>
    );
}
