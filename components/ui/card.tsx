import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * La cella delle card di Progetti. Esportata anche come stringa per chi deve
 * rendere la card come un altro elemento (il `<Link>` dei progetti).
 *
 * Nessun bordo proprio: le celle vivono in una griglia `gap-px` sopra
 * `bg-border`, che disegna una linea sola fra due vicine.
 */
export const cardClass = "panel group flex h-full flex-col";

export default function Card({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn(cardClass, className)} {...props} />;
}
