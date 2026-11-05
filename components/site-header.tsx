import LocaleSwitcher from "./locale-switcher";
import ThemeToggle from "./theme/theme-toggle";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

/**
 * Una barra a tutta larghezza alta 3rem, divisa in celle da righe verticali:
 * monogramma e nome a sinistra, ancore alle sezioni al centro (da `md`), lingua e tema a
 * destra. L'interno ha la stessa larghezza e la stessa cornice `border-x`
 * della colonna, così le verticali della pagina proseguono fin qui.
 *
 * È cornice, non contenuto: per questo è montata nel layout e non nella pagina,
 * e per questo riceve come prop stringhe già risolte: le due foglie client qui
 * sotto non importano mai il dizionario.
 *
 * `sticky` e non `fixed`: occupa il proprio spazio, quindi la hero non deve
 * più compensarne l'altezza con un padding; `scroll-padding-top` in
 * globals.css tiene le ancore fuori da sotto la barra. La sfocatura vive in
 * `.nav-glass`.
 */
export default function SiteHeader({
    locale,
    nav,
    theme,
    sections,
}: {
    locale: Locale;
    nav: Messages["nav"];
    theme: Messages["theme"];
    /** le etichette delle ancore: sono i titoli delle sezioni stesse */
    sections: { id: string; label: string }[];
}) {
    return (
        <header className="nav-glass sticky top-0 z-50 border-b border-border">
            <div className="mx-auto flex h-12 max-w-frame items-stretch justify-between border-x border-border">
                <a
                    href="#main"
                    aria-label="Francesco Delmonaco"
                    className="group flex items-stretch border-r border-border"
                >
                    {/* il monogramma: l'unico pieno d'accento della barra */}
                    <span
                        aria-hidden="true"
                        className="flex w-12 items-center justify-center bg-primary font-display text-lg font-bold text-primary-foreground uppercase font-stretch-condensed"
                    >
                        FD
                    </span>
                    {/* sotto `sm` il nome intero più lingua e tema non stanno in 360px: resta il monogramma */}
                    <span
                        aria-hidden="true"
                        className="hidden items-center px-4 font-display text-[15px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary sm:flex md:px-5"
                    >
                        Francesco Delmonaco
                    </span>
                </a>

                <nav className="hidden flex-1 items-stretch md:flex">
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="hud-label nav-link flex items-center px-4 text-muted-foreground"
                        >
                            {section.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-stretch">
                    <LocaleSwitcher
                        current={locale}
                        labels={{ it: nav.it, en: nav.en, switchTo: nav.switchTo }}
                    />
                    <ThemeToggle labels={theme} />
                </div>
            </div>
        </header>
    );
}
