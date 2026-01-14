import { memo } from "react";
import Image from "next/image"
import Card from "./ui/card";
import ProfileImage from "../public/img/foto-profilo.png";

const AboutSection = memo(function AboutSection() {
    return (
        <div className="flex flex-col gap-1 h-1/2">
            <span className="text-xl font-bold font-mono">about</span>

            <Card className="flex items-center justify-between flex-col lg:flex-row gap-10 lg:gap-2">
                <Image
                    src={ProfileImage}
                    alt="Foto profilo di Francesco Delmonaco"
                    width={100}
                    height={100}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full lg:w-1/2 rounded-lg h-full object-cover"
                />

                <div className="flex flex-col justify-center gap-10 text-center w-full lg:w-1/2">
                    <span className="text-4xl font-bold">Francesco Delmonaco</span>

                    <div className="flex flex-col gap-1 pb-5 lg:pb-0">
                        <p className="text-gray-400 font-mono">Full Stack Web Developer</p>
                        <p className="text-gray-400 font-mono">Based in Brescia 🇮🇹</p>
                    </div>
                </div>
            </Card>
        </div>
    )
})

AboutSection.displayName = "AboutSection"
export default AboutSection