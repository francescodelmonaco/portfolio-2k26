"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/*
 * Un solo observer a livello di modulo condiviso da tutte le istanze, invece di
 * uno per elemento. Ogni voce smette di osservarsi alla prima intersezione:
 * rianimare quando il lettore risale è il tic da template, e rende le pagine
 * lunghe irrequiete.
 *
 * Lo stato nascosto vero e proprio vive in globals.css, protetto sia da
 * `prefers-reduced-motion: no-preference` sia dalla classe `.js`: così se
 * questo componente non si carica il contenuto non resta mai invisibile.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
    if (observer) return observer;
    observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                (entry.target as HTMLElement).dataset.reveal = "shown";
                observer?.unobserve(entry.target);
            }
        },
        { threshold: 0.1, rootMargin: "0px 0px -12% 0px" },
    );
    return observer;
}

/**
 * `children` arriva da un Server Component e resta renderizzato lato server:
 * avvolgere qui una sezione non la trasforma in un componente client.
 */
export default function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    /** sfalsamento, in ms. Resta sotto i ~5 passi o l'ultimo elemento atterra quando il lettore è già andato oltre. */
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const io = getObserver();
        io.observe(element);
        return () => io.unobserve(element);
    }, []);

    return (
        <div
            ref={ref}
            data-reveal=""
            className={className}
            style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
        >
            {children}
        </div>
    );
}
