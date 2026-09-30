"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const THRESHOLD = 400;

/**
 * Stesso trattamento a pillola flottante di `SiteHeader` (`.nav-pill`:
 * sfocatura, bordo, ombra a strati), solo circolare e ancorato in basso a
 * destra invece che in alto.
 *
 * `scrollTo({ top: 0 })` viene chiamato senza `behavior`, quindi eredita lo
 * `scroll-behavior: smooth` impostato su `html` in globals.css, che a sua volta
 * è già protetto da `prefers-reduced-motion`: per lo scroll in sé qui non serve
 * altra gestione delle animazioni ridotte.
 *
 * L'anello di avanzamento usa `pathLength="100"`, così `stroke-dashoffset` è
 * direttamente la percentuale mancante. Viene scritto sul nodo via ref invece
 * che tramite stato, per non ri-renderizzare a ogni evento di scroll. Niente
 * `animation-timeline: scroll()`: Firefox non lo supporta ancora.
 */
export default function ScrollToTop({ label }: { label: string }) {
    const [visible, setVisible] = useState(false);
    const progressRef = useRef<SVGCircleElement>(null);

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
            className={`nav-pill fixed right-3 bottom-3 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition duration-300 ease-out hover:text-foreground motion-reduce:transition-none md:right-6 md:bottom-6 ${
                visible
                    ? "opacity-100 motion-safe:translate-y-0"
                    : "pointer-events-none opacity-0 motion-safe:translate-y-2"
            }`}
        >
            <svg aria-hidden="true" viewBox="0 0 56 56" className="absolute inset-0 -rotate-90 fill-none">
                <circle cx="28" cy="28" r="25" strokeWidth="2" className="stroke-border" />
                <circle
                    ref={progressRef}
                    cx="28"
                    cy="28"
                    r="25"
                    strokeWidth="2"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    className="stroke-primary"
                />
            </svg>
            <ArrowUp aria-hidden="true" size={22} strokeWidth={1.75} />
        </button>
    );
}
