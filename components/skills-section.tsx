import { memo, useMemo } from "react";
import Card from "./ui/card";
import InfiniteCarousel from "./ui/infinite-carousel";
import SkillIcon from "./ui/skill-icon";
import { skills } from "@/lib/data";

const SkillsSection = memo(function SkillsSection({ className = "" }: { className?: string }) {
    const memoizedSkills = useMemo(() => skills, []);

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {/* section label */}
            <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono tracking-[0.25em] uppercase text-(--gray)">02 / Skills</span>
                <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <Card className="px-0 py-4 overflow-hidden">
                <InfiniteCarousel speed={22}>
                    {memoizedSkills.map((skill, id) => (
                        <div
                            key={id}
                            className="flex flex-col items-center gap-2 px-1 md:px-3"
                        >
                            <SkillIcon
                                name={skill.name}
                                icon={skill.icon}
                                className="h-full w-10 md:w-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <span className="text-[12px] font-mono tracking-widest uppercase text-(--gray) whitespace-nowrap">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </InfiniteCarousel>
            </Card>
        </div>
    )
})

SkillsSection.displayName = "SkillsSection"
export default SkillsSection