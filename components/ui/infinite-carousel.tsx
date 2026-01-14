"use client";

import { ReactNode, memo } from "react";

interface InfiniteCarouselProps {
    children: ReactNode;
    speed?: number; // durata in secondi per un ciclo completo
}

const InfiniteCarousel = memo(function InfiniteCarousel({
    children,
    speed = 20
}: InfiniteCarouselProps) {
    return (
        <div className="relative overflow-hidden h-full flex items-center">
            <div className="flex animate-infinite-scroll pause-animation h-full gap-5">
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
})

InfiniteCarousel.displayName = "InfiniteCarousel"
export default InfiniteCarousel
