import { memo } from "react";
import Card from "./ui/card";

const AboutSection = memo(function AboutSection({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col gap-3 flex-1 min-h-0 ${className}`}>
            {/* section label bar */}
            <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono tracking-[0.25em] uppercase text-(--gray)">01 / About</span>
                <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <Card className="flex flex-col justify-center gap-4 p-7">
                {/* identity */}
                <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.88] tracking-tight text-(--white)">
                    Francesco<br />
                    <span className="text-(--blue)">Delmonaco</span>
                </h1>
                <p className="text-[12px] md:text-[16px] font-mono tracking-[0.3em] uppercase text-(--gray)">
                    Full Stack Web Developer
                </p>

                {/* meta chips */}
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-mono px-3 py-1.5 rounded-full border border-white/8 text-(--gray) flex-wrap">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        Brescia, Italia 🇮🇹
                    </span>
                </div>
            </Card>
        </div>
    )
})

AboutSection.displayName = "AboutSection"
export default AboutSection