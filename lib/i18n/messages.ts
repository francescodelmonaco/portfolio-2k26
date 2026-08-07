import { it } from "@/messages/it";
import { en } from "@/messages/en";
import type { Locale } from "./config";

const dictionaries = { it, en };

/**
 * Solo lato server, per convenzione.
 *
 * Non importare mai questo file, né niente sotto messages/, da un file
 * "use client". Le foglie client (LocaleSwitcher, ThemeToggle) ricevono come
 * prop stringhe già risolte. Rompere questa regola trascina entrambi i dizionari
 * nel bundle client e vanifica in silenzio il motivo per cui non si è usata una
 * libreria i18n.
 */
export function getMessages(locale: Locale) {
    return dictionaries[locale];
}

export type { Messages } from "@/messages/it";
