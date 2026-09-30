"use client";

import { useEffect, useRef } from "react";

/**
 * Lo stesso alone del ritratto (`.blob-glow`, token `--glow`) che segue il
 * puntatore. Il colore arriva da `light-dark()`, quindi il cambio di tema non
 * passa di qui.
 *
 * La posizione si scrive sul nodo via ref come `transform`, mai tramite stato:
 * niente ri-render per ogni `pointermove` e solo lavoro di composizione. Il
 * ritardo morbido è la `transition` CSS di `.cursor-glow`, non un loop rAF.
 * Visibilità e dispositivi touch sono gestiti in CSS (vedi `.cursor-glow`).
 */
export default function CursorGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            el.dataset.active = "";
        };
        const onLeave = () => delete el.dataset.active;
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return <div ref={ref} aria-hidden="true" className="cursor-glow blob-glow" />;
}
