import Image from "next/image";
import Card from "./ui/card";
import InfiniteCarousel from "./ui/infinite-carousel";
import { skills } from "@/lib/data";

export default function SkillsSection() {
    return (
        <div className="flex flex-col gap-1 h-1/4">
            <span className="text-xl font-bold">skills</span>

            <Card className="px-0">
                <InfiniteCarousel speed={20}>
                    {
                        skills.map((skill, id) => (
                            <div
                                key={id}
                                className="min-h-full"
                            >
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    width={80}
                                    height={80}
                                    className="h-full"
                                />
                            </div>
                        ))
                    }
                </InfiniteCarousel>
            </Card>
        </div>
    )
}