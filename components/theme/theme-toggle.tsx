"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { syncThemeColorMeta } from "@/lib/theme-color";

export type ThemePref = "light" | "system" | "dark";

const PREFS = [
    { value: "light", Icon: Sun },
    { value: "system", Icon: Monitor },
    { value: "dark", Icon: Moon },
] as const satisfies ReadonlyArray<{ value: ThemePref; Icon: typeof Sun }>;

/*
 * La fonte di verità è `<html data-theme-pref>`, scritto dallo script pre-paint
 * prima che React esista. Leggerlo con useSyncExternalStore invece di
 * rispecchiarlo in uno useState è ciò che tiene questo componente libero dal
 * flag `mounted` di cui ha bisogno chiunque usi next-themes: lo snapshot lato
 * server è "system", quello lato client è quanto lo script ha già deciso, e
 * React riconcilia i due senza avvisi di hydration.
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
    listeners.add(onStoreChange);
    return () => {
        listeners.delete(onStoreChange);
    };
}

function readPref(): ThemePref {
    const value = document.documentElement.dataset.themePref;
    return value === "light" || value === "dark" ? value : "system";
}

function readServerPref(): ThemePref {
    return "system";
}

function readStoredPref(): ThemePref {
    try {
        const raw = localStorage.getItem("theme");
        return raw === "light" || raw === "dark" ? raw : "system";
    } catch {
        return "system";
    }
}

function resolve(pref: ThemePref) {
    return pref === "dark" ||
        (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
}

function apply(pref: ThemePref) {
    const root = document.documentElement;
    const theme = resolve(pref);
    root.dataset.theme = theme;
    root.dataset.themePref = pref;
    root.style.colorScheme = theme;
    // La cornice del browser su mobile segue il tema risolto, non il sistema.
    syncThemeColorMeta(theme);
    try {
        localStorage.setItem("theme", pref);
    } catch {
        /* navigazione privata: semplicemente la scelta non verrà ricordata */
    }
    for (const listener of listeners) listener();
}

/**
 * Tre segmenti a icona: sole / schermo / luna. È il glifo dello schermo a
 * rendere leggibile "segui il sistema": una mezzaluna direbbe solo "scuro".
 *
 * La pillola attiva viene riempita da `[data-theme-pref]` in globals.css,
 * quindi il primo paint è già corretto. Qui lo stato React serve solo a tenere
 * onesto `aria-checked`, ed è il motivo per cui non c'è nessun flag `mounted`.
 */
export default function ThemeToggle({
    labels,
}: {
    labels: { group: string; light: string; system: string; dark: string };
}) {
    const pref = useSyncExternalStore(subscribe, readPref, readServerPref);

    /*
     * Lo switcher di lingua cambia il parametro `[locale]` sul root layout,
     * quindi in quella transizione lato client React rimonta <html> e cancella
     * data-theme/data-theme-pref/color-scheme impostati dallo script pre-paint,
     * che non viene rieseguito perché non è una navigazione completa.
     * useLayoutEffect (non useEffect) risincronizza da localStorage prima che il
     * browser dipinga il frame rimontato, così il tema scelto sopravvive al
     * cambio di lingua.
     */
    useLayoutEffect(() => {
        if (!document.documentElement.dataset.theme) apply(readStoredPref());
        // Anche il meta theme-color vive in <head> e non sopravvive garantito al
        // rimontaggio del documento: lo si riscrive comunque.
        else syncThemeColorMeta(resolve(readPref()));
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        // Segui il sistema operativo solo finché l'utente lo sta davvero chiedendo.
        const onChange = () => {
            if (readPref() === "system") apply("system");
        };
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    return (
        <div
            role="radiogroup"
            aria-label={labels.group}
            className="flex items-center gap-0.5 rounded-full bg-muted p-0.5"
        >
            {PREFS.map(({ value, Icon }) => (
                <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={pref === value}
                    aria-label={labels[value]}
                    title={labels[value]}
                    data-pref={value}
                    onClick={() => apply(value)}
                    className="cursor-pointer rounded-full p-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                    <Icon aria-hidden="true" size={14} strokeWidth={1.75} />
                </button>
            ))}
        </div>
    );
}
