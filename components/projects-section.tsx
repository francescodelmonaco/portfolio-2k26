import Image from "next/image";
import Link from "next/link";
import Card from "./ui/card";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
    return (
        <div className="flex flex-col gap-1 flex-1 min-h-0">
            <span className="text-xl font-bold">projects</span>

            <Card className="flex flex-col items-center justify-between gap-3 overflow-y-auto h-full">
                {
                    projects.map((project, id) => (
                        <Link
                            href={project.link || project.github || ""}
                            target="_blank"
                            className="bg-(--white)/10 hover:bg-(--white)/20 transition-all duration-300 p-5 rounded-lg w-full cursor-pointer hover:scale-102 hover:shadow-lg flex flex-col items-center justify-center"
                            key={id}
                        >
                            <div className="flex justify-between gap-5">
                                {project.screen && (
                                    <Image
                                        src={project.screen}
                                        alt={`${project.title} screenshot`}
                                        width={50}
                                        height={50}
                                        className="rounded object-cover w-1/3 h-50"
                                    />
                                )}

                                <div className={`${project.screen ? "w-2/3" : "w-full"} flex flex-col justify-between`}>
                                    <span className="text-2xl font-bold mb-2">{project.title}</span>

                                    <p className="text-gray-400 mb-2">{project.description}</p>

                                    <div className="flex gap-2 mb-2">
                                        {project.tech.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-(--white)/10 px-2 py-1 rounded-full text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Card>
        </div>
    )
}