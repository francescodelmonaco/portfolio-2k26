"use client";

import { ReactNode } from "react";

interface InfiniteCarouselProps {
    children: ReactNode;
    speed?: number; // durata in secondi per un ciclo completo
}

export default function InfiniteCarousel({
    children,
    speed = 20
}: InfiniteCarouselProps) {
    return (
        <div className="relative overflow-hidden h-full">
            <div className="flex animate-infinite-scroll pause-animation">
                {/* Primo set di items */}
                <div className="flex gap-5 shrink-0">
                    {children}
                </div>
                {/* Duplicato per loop continuo */}
                <div className="flex gap-5 shrink-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
