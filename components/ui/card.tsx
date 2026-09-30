import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Il guscio delle card di Progetti e Servizi. Esportato anche come stringa per
 * chi deve rendere la card come un altro elemento (il `<Link>` dei progetti).
 *
 * Il padding è 12px: i media dentro usano `rounded-lg` (16px), cioè raggio del
 * pannello 28px meno il padding, così le curve restano concentriche.
 */
export const cardClass = "panel group flex h-full flex-col p-3";

export default function Card({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn(cardClass, className)} {...props} />;
}
