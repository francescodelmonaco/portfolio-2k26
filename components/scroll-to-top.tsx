"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const THRESHOLD = 400;

/**
 * Stesso vetro dell'header (`.nav-glass`), in un riquadro ancorato in basso a
 * destra.
 *
 * `scrollTo({ top: 0 })` viene chiamato senza `behavior`, quindi eredita lo
 * `scroll-behavior: smooth` impostato su `html` in globals.css, che a sua volta
 * è già protetto da `prefers-reduced-motion`: per lo scroll in sé qui non serve
 * altra gestione delle animazioni ridotte.
 *
 * L'avanzamento è il bordo stesso del riquadro: un `<rect>` con
 * `pathLength="100"`, così `stroke-dashoffset` è direttamente la percentuale
 * mancante. Il tratto parte dall'angolo in alto a sinistra e gira in senso
 * orario. Viene scritto sul nodo via ref invece che tramite stato, per non
 * ri-renderizzare a ogni evento di scroll. Niente `animation-timeline:
 * scroll()`: Firefox non lo supporta ancora.
 */
export default function ScrollToTop({ label }: { label: string }) {
    const [visible, setVisible] = useState(false);
    const progressRef = useRef<SVGRectElement>(null);

    useEffect(() => {
        const onScroll = () => {
            const { scrollY, innerHeight } = window;
            const max = document.documentElement.scrollHeight - innerHeight;
            const progress = max > 0 ? Math.min(scrollY / max, 1) : 0;
            progressRef.current?.setAttribute("stroke-dashoffset", String(100 - progress * 100));
            setVisible(scrollY > THRESHOLD);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            aria-label={label}
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            title={label}
            className={`nav-glass fixed right-3 bottom-3 z-50 flex size-12 cursor-pointer items-center justify-center text-muted-foreground transition duration-300 ease-out hover:text-foreground motion-reduce:transition-none md:right-6 md:bottom-6 ${
                visible
                    ? "opacity-100 motion-safe:translate-y-0"
                    : "pointer-events-none opacity-0 motion-safe:translate-y-2"
            }`}
        >
            <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 fill-none">
                <rect x="0.5" y="0.5" width="47" height="47" strokeWidth="1" className="stroke-border-strong" />
                <rect
                    ref={progressRef}
                    x="1"
                    y="1"
                    width="46"
                    height="46"
                    strokeWidth="2"
                    pathLength={100}
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    className="stroke-primary"
                />
            </svg>
            <ArrowUp aria-hidden="true" size={20} strokeWidth={1.75} />
        </button>
    );
}
