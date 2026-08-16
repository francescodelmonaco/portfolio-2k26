/**
 * I due valori di `--background` in globals.css, l'unico posto da cui li legge
 * anche il resto dell'app: la cornice del browser su mobile (la status bar iOS,
 * la barra degli indirizzi Android) deve dipingersi dello stesso colore del
 * canvas, altrimenti si vede uno scalino in cima alla pagina.
 *
 * Le due voci `media` di `viewport.themeColor` da sole seguono solo il sistema
 * operativo: con una preferenza esplicita salvata in localStorage la cornice
 * resterebbe del tema opposto. Per questo lo script pre-paint e ThemeToggle
 * mantengono un <meta name="theme-color"> senza `media`, inserito in testa a
 * <head> — il browser usa il primo meta il cui media combacia, quindi stando
 * davanti vince sempre sulla coppia emessa da Next, che resta come fallback per
 * il caso senza JavaScript.
 */
export const THEME_COLORS = {
    light: "#F1F1F5",
    dark: "#08080E",
} as const;

/** Attributo marcatore del meta gestito a runtime, così non se ne creano due. */
export const THEME_COLOR_META_ATTR = "data-theme-color";

export function syncThemeColorMeta(theme: "light" | "dark") {
    const head = document.head;
    let meta = head.querySelector<HTMLMetaElement>(`meta[${THEME_COLOR_META_ATTR}]`);
    if (!meta) {
        meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.setAttribute(THEME_COLOR_META_ATTR, "");
        head.insertBefore(meta, head.firstChild);
    }
    meta.content = THEME_COLORS[theme];
}
