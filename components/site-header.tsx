import LocaleSwitcher from "./locale-switcher";
import ThemeToggle from "./theme/theme-toggle";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

/**
 * Una pillola flottante staccata dal bordo superiore, non una barra a tutta
 * larghezza incollata in cima.
 *
 * È cornice, non contenuto: per questo è montata nel layout e non nella pagina,
 * e per questo riceve come prop stringhe già risolte: le due foglie client qui
 * sotto non importano mai il dizionario.
 *
 * `fixed` e non `sticky`, così galleggia davvero sopra il contenuto; il padding
 * superiore corrispondente lo porta la hero. La sfocatura vive in `.nav-pill`
 * ed è confinata a questo unico elemento fixed.
 *
 * Nessun link al nome o al brand: questa pillola contiene solo impostazioni
 * (lingua + tema), quindi è ancorata a destra invece di partire da un titolo
 * allineato a sinistra.
 */
export default function SiteHeader({
    locale,
    nav,
    theme,
}: {
    locale: Locale;
    nav: Messages["nav"];
    theme: Messages["theme"];
}) {
    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-end px-3 pt-3 md:px-6 md:pt-5">
            <div className="nav-pill pointer-events-auto flex w-max max-w-full items-center gap-1 rounded-full py-1.5 px-1.5">
                <LocaleSwitcher
                    current={locale}
                    labels={{ it: nav.it, en: nav.en, switchTo: nav.switchTo }}
                />
                <span className="h-4 w-px bg-border" aria-hidden="true" />
                <ThemeToggle labels={theme} />
            </div>
        </header>
    );
}
