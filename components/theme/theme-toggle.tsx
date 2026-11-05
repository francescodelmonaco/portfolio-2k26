"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

import { syncThemeColorMeta } from "@/lib/theme-color";

type Theme = "light" | "dark";

/*
 * La fonte di verità è `<html data-theme>`, scritto dallo script pre-paint
 * prima che React esista. Leggerlo con useSyncExternalStore invece di
 * rispecchiarlo in uno useState è ciò che tiene questo componente libero dal
 * flag `mounted`: lo snapshot lato server è "light", quello lato client è
 * quanto lo script ha già deciso, e React riconcilia i due senza avvisi di
 * hydration. Lo stato serve solo all'aria-label: l'emoji visibile la sceglie
 * la variante `dark:` in CSS, quindi il primo paint è già corretto.
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
    listeners.add(onStoreChange);
    return () => {
        listeners.delete(onStoreChange);
    };
}

function readTheme(): Theme {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function readServerTheme(): Theme {
    return "light";
}

/** null finché il visitatore non ha scelto: in quel caso decide il sistema. */
function readStored(): Theme | null {
    try {
        const raw = localStorage.getItem("theme");
        return raw === "light" || raw === "dark" ? raw : null;
    } catch {
        return null;
    }
}

function systemTheme(): Theme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: Theme, persist: boolean) {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    // La cornice del browser su mobile segue il tema risolto, non il sistema.
    syncThemeColorMeta(theme);
    if (persist) {
        try {
            localStorage.setItem("theme", theme);
        } catch {
            /* navigazione privata: semplicemente la scelta non verrà ricordata */
        }
    }
    for (const listener of listeners) listener();
}

/*
 * === TRANSIZIONE A PIXEL ===
 * Il cambio di tema passa per una View Transition: il browser fotografa la
 * pagina prima e dopo, e la foto nuova (`::view-transition-new(root)`) viene
 * scoperta da una mask-image SVG a pixel, lo stesso gesto del contorno del
 * ritratto. Ogni pixel si accende con uno sfarfallio a un ritardo che cresce con
 * la distanza dal bottone, deformata da un'onda angolare (macchia d'olio, non
 * cerchio) e da un rumore per pixel (bordo sfaldato, non netto).
 */
const CELL = 24; // px: metà più fine costerebbe 4× i nodi dell'SVG
const SPREAD = 650; // ms dal primo all'ultimo pixel
const FLICKER = 160; // ms di sfarfallio del singolo pixel
const STEPS = 40; // ritardi quantizzati in classi, per tenere corto l'SVG

function pixelMask(ox: number, oy: number) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const reach = Math.hypot(Math.max(ox, w - ox), Math.max(oy, h - oy));
    const phase = Math.random() * Math.PI * 2;
    let cells = "";
    for (let y = 0; y < h; y += CELL) {
        for (let x = 0; x < w; x += CELL) {
            const dx = x + CELL / 2 - ox;
            const dy = y + CELL / 2 - oy;
            const blob = 1 + 0.12 * Math.sin(3 * Math.atan2(dy, dx) + phase);
            const t = (Math.hypot(dx, dy) / reach) * blob * 0.78 + Math.random() * 0.22;
            const step = Math.min(STEPS - 1, Math.floor(t * STEPS));
            cells += `<use href='#p' x='${x}' y='${y}' class='d${step}'/>`;
        }
    }
    let delays = "";
    for (let i = 0; i < STEPS; i++) delays += `.d${i}{animation-delay:${Math.round((i * SPREAD) / STEPS)}ms}`;
    // Solo apici singoli dentro l'SVG: quelli doppi chiuderebbero url("…").
    const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><style>` +
        `use{opacity:0;animation:p ${FLICKER}ms step-end both}` +
        `@keyframes p{0%{opacity:0}30%{opacity:1}55%{opacity:0}75%,100%{opacity:1}}${delays}</style>` +
        `<defs><rect id='p' width='${CELL}' height='${CELL}'/></defs>${cells}</svg>`;
    return `url("data:image/svg+xml,${svg.replace(/[#%<>]/g, encodeURIComponent)}")`;
}

function switchTheme(theme: Theme, origin: HTMLElement) {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motion || !document.startViewTransition) return apply(theme, true);

    const box = origin.getBoundingClientRect();
    const mask = pixelMask(box.left + box.width / 2, box.top + box.height / 2);
    const transition = document.startViewTransition(() => apply(theme, true));
    // L'animazione porta la maschera e insieme tiene viva la transizione fino
    // all'ultimo pixel; il fade di default è spento in globals.css.
    transition.ready.then(() => {
        document.documentElement.animate(
            { maskImage: [mask, mask] },
            { duration: SPREAD + FLICKER, pseudoElement: "::view-transition-new(root)" },
        );
    });
}

/**
 * Un solo bottone che alterna chiaro e scuro, gemello dello switcher di
 * lingua: come quello mostra la destinazione, non lo stato attuale — in
 * chiaro la luna, in scuro il sole. Finché non si clicca, il tema iniziale
 * segue il sistema operativo.
 */
export default function ThemeToggle({
    labels,
}: {
    labels: { switchTo: Record<Theme, string> };
}) {
    const theme = useSyncExternalStore(subscribe, readTheme, readServerTheme);
    const target: Theme = theme === "dark" ? "light" : "dark";

    /*
     * Lo switcher di lingua cambia il parametro `[locale]` sul root layout,
     * quindi in quella transizione lato client React rimonta <html> e cancella
     * data-theme/color-scheme impostati dallo script pre-paint, che non viene
     * rieseguito perché non è una navigazione completa. useLayoutEffect (non
     * useEffect) risincronizza prima che il browser dipinga il frame
     * rimontato, così il tema scelto sopravvive al cambio di lingua.
     */
    useLayoutEffect(() => {
        if (!document.documentElement.dataset.theme) apply(readStored() ?? systemTheme(), false);
        // Anche il meta theme-color vive in <head> e non sopravvive garantito al
        // rimontaggio del documento: lo si riscrive comunque.
        else syncThemeColorMeta(readTheme());
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        // Segui il sistema operativo solo finché il visitatore non ha scelto.
        const onChange = () => {
            if (!readStored()) apply(systemTheme(), false);
        };
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    return (
        <button
            type="button"
            onClick={(event) => switchTheme(target, event.currentTarget)}
            title={labels.switchTo[target]}
            aria-label={labels.switchTo[target]}
            className="nav-link flex cursor-pointer items-center border-l border-border px-3"
        >
            <span aria-hidden="true" className="text-sm leading-none dark:hidden">
                🌙
            </span>
            <span aria-hidden="true" className="hidden text-sm leading-none dark:inline">
                ☀️
            </span>
        </button>
    );
}
