import { memo } from "react";
import Image from "next/image";
import Card from "./ui/card";

const AboutSection = memo(function AboutSection({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col gap-3 flex-1 min-h-0 ${className}`}>
            {/* section label bar */}
            <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono tracking-[0.25em] uppercase text-(--gray)">01 / About</span>
                <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <Card className="flex flex-col justify-center p-7">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Left: text content (2/3) */}
                    <div className="flex flex-col gap-4 w-full md:w-2/3 min-w-0 order-2 md:order-1">
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
                    </div>

                    {/* Right: profile photo (1/3) */}
                    <div className="w-full md:w-1/3 min-w-0 flex justify-center items-center order-1 md:order-2">
                        <div className="relative w-36 h-36 md:w-full md:h-auto md:aspect-square md:max-w-45">
                            {/* ambient glow */}
                            <div
                                className="absolute inset-0 bg-linear-to-br from-blue-500/35 to-violet-500/20 blur-2xl scale-110"
                                style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                            />
                            {/* gradient border ring */}
                            <div
                                className="relative p-0.5 blob-border"
                                style={{
                                    background: "linear-gradient(135deg, rgba(28,78,239,0.7) 0%, rgba(139,92,246,0.5) 50%, rgba(28,78,239,0.3) 100%)",
                                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                                }}
                            >
                                <div
                                    className="overflow-hidden w-full h-full"
                                    style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                                >
                                    <Image
                                        src="/img/foto-profilo.webp"
                                        alt="Francesco Delmonaco"
                                        width={176}
                                        height={176}
                                        className="w-full h-full object-cover"
                                        priority
                                        fetchPriority="high"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
})

AboutSection.displayName = "AboutSection"
export default AboutSection