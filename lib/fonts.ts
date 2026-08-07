import { Bricolage_Grotesque, DM_Sans, DM_Mono } from "next/font/google";

/*
 * Condivisi dai due gusci di documento: app/[locale]/layout.tsx e la
 * app/not-found.tsx di root, che possiede il proprio <html>/<body> e altrimenti
 * duplicherebbe tutti e tre i loader.
 */

export const display = Bricolage_Grotesque({
    variable: "--font-display",
    subsets: ["latin"],
    display: "swap",
});

export const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    display: "swap",
});

// DM Mono non ha un taglio variabile: qui i pesi statici sono l'unica opzione.
export const dmMono = DM_Mono({
    variable: "--font-dm-mono",
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    display: "swap",
});

/** Le tre variabili dei font, per il className del <body> di un guscio di documento. */
export const fontVariables = `${display.variable} ${dmSans.variable} ${dmMono.variable}`;
