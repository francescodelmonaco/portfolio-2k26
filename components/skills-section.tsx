import { memo, useMemo } from "react";
import Card from "./ui/card";
import InfiniteCarousel from "./ui/infinite-carousel";
import SkillIcon from "./ui/skill-icon";
import { skills } from "@/lib/data";

const SkillsSection = memo(function SkillsSection() {
    const memoizedSkills = useMemo(() => skills, []);

    return (
        <div className="flex flex-col gap-1 max-h-1/7">
            <span className="text-xl font-bold font-mono">skills</span>

            <Card className="px-0">
                <InfiniteCarousel speed={20}>
                    {
                        memoizedSkills.map((skill, id) => (
                            <div
                                key={id}
                                className="h-15 lg:h-full flex items-center justify-center"
                            >
                                <SkillIcon
                                    name={skill.name}
                                    icon={skill.icon}
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        ))
                    }
                </InfiniteCarousel>
            </Card>
        </div>
    )
})

SkillsSection.displayName = "SkillsSection"
export default SkillsSection