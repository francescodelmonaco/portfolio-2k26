import Image from "next/image";
import Card from "./ui/card";
import InfiniteCarousel from "./ui/infinite-carousel";
import { skills } from "@/lib/data";

export default function SkillsSection() {
    return (
        <div className="flex flex-col gap-1 max-h-1/7">
            <span className="text-xl font-bold">skills</span>

            <Card className="px-0">
                <InfiniteCarousel speed={20}>
                    {
                        skills.map((skill, id) => (
                            <div
                                key={id}
                                className="h-15 lg:h-full flex items-center justify-center"
                            >
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    width={20}
                                    height={20}
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        ))
                    }
                </InfiniteCarousel>
            </Card>
        </div>
    )
}