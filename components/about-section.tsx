import Image from "next/image"
import Card from "./ui/card";
import ProfileImage from "../public/img/foto-profilo.png";

export default function AboutSection() {
    return (
        <div className="flex flex-col gap-1 h-1/2">
            <span className="text-xl font-bold">about</span>

            <Card className="flex items-center justify-between gap-2">
                <Image
                    src={ProfileImage}
                    alt="Foto profilo di Francesco Delmonaco"
                    width={100}
                    height={100}
                    className="w-1/2 rounded-lg h-full object-cover"
                />

                <div className="flex flex-col justify-center gap-10 text-center w-1/2">
                    <span className="text-4xl font-bold">Francesco Delmonaco</span>

                    <div className="flex flex-col gap-1">
                        <p className="text-gray-400">Full Stack Web Developer</p>
                        <p className="text-gray-400">Based in Brescia 🇮🇹</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}