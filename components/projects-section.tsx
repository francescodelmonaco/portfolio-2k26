import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "./ui/card";
import { projects } from "@/lib/data";

const ProjectsSection = memo(function ProjectsSection() {
    const projectSchemas = useMemo(() =>
        projects.map((project) => ({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "url": project.link || project.github,
            "author": {
                "@type": "Person",
                "name": "Francesco Delmonaco"
            },
            "keywords": project.tech.join(", "),
            "programmingLanguage": project.tech,
            "applicationCategory": "WebApplication"
        })),
        []
    );

    const memoizedProjects = useMemo(() => projects, []);

    return (
        <div className="flex flex-col gap-1 flex-1 min-h-0">
            {/* JSON-LD Structured Data for Projects */}
            {projectSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <span className="text-xl font-bold font-mono">projects</span>

            <Card className="flex flex-col items-center justify-between gap-3 overflow-y-auto h-full">
                {
                    memoizedProjects.map((project, id) => (
                        <Link
                            href={project.link || project.github || ""}
                            target="_blank"
                            className="bg-(--white)/10 hover:bg-(--white)/20 transition-all duration-300 p-5 rounded-lg w-full cursor-pointer hover:scale-102 hover:shadow-lg flex flex-col items-center justify-center xl:h-70"
                            key={id}
                        >
                            <div className="flex justify-between gap-5 w-full">
                                {project.screen && (
                                    <Image
                                        src={project.screen}
                                        alt={`${project.title} screenshot`}
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                        className="rounded object-cover w-1/3 h-50 hidden lg:block"
                                    />
                                )}

                                <div className={`${project.screen ? "lg:w-2/3" : "w-full"} flex flex-col justify-between gap-2 lg:gap-0`}>
                                    <span className="text-2xl font-bold mb-2">{project.title}</span>

                                    <p className="text-gray-400 font-mono mb-2">{project.description}</p>

                                    <div className="flex gap-2 mb-2 flex-wrap">
                                        {project.tech.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-(--white)/10 px-2 py-1 rounded-full text-xs font-mono"
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
})

ProjectsSection.displayName = "ProjectsSection"
export default ProjectsSection