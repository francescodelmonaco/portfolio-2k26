import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
        <div className="flex flex-col gap-3 flex-1 h-full min-h-0 overflow-hidden">
            {/* JSON-LD */}
            {projectSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            {/* section label */}
            <div className="flex items-center gap-3 shrink-0">
                <span className="text-[12px] font-mono tracking-[0.25em] uppercase text-(--gray)">04 / Projects</span>
                <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <Card className="flex flex-col gap-6 overflow-y-auto projects-scroll h-full p-4 lg:p-6">
                {memoizedProjects.map((project, id) => (
                    <Link
                        href={project.link || project.github || ""}
                        target="_blank"
                        className="group relative glass-panel rounded-lg p-5 w-full cursor-pointer flex flex-col gap-5 overflow-hidden transition-all duration-500 hover:border-white/15 hover:bg-white/3 hover:-translate-y-1 hover:shadow-xl shrink-0"
                        key={id}
                    >
                        {(project as any).screen && (
                            <div className="relative w-full h-48 sm:h-56 rounded-[0.5rem] overflow-hidden border border-white/4 bg-[#050508] shrink-0 group-hover:border-white/1 transition-all duration-500 z-10 shadow-lg">
                                <Image
                                    src={(project as any).screen}
                                    alt={`${project.title} screenshot`}
                                    fill
                                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-1200 ease-out"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={id < 2}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none mix-blend-multiply group-hover:opacity-30 transition-opacity duration-500" />
                            </div>
                        )}

                        <div className="flex flex-col gap-4 relative z-20">
                            {/* header row */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    {/* large number */}
                                    <span
                                        className="font-display text-5xl font-bold leading-none select-none shrink-0 transition-colors duration-500 group-hover:text-white/9"
                                        style={{ color: 'rgba(255,255,255,0.06)' }}
                                    >
                                        {String(id + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <h3 className="font-display text-lg font-semibold text-(--white) group-hover:text-(--blue) transition-colors leading-tight">
                                            {project.title}
                                        </h3>
                                        <span className="text-[12px] font-mono tracking-widest uppercase text-(--gray) opacity-60">
                                            {project.type}
                                        </span>
                                    </div>
                                </div>
                                <ArrowUpRight
                                    className="shrink-0 mt-1 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    style={{ color: 'var(--blue)' }}
                                    size={18}
                                />
                            </div>

                            {/* description */}
                            <p className="text-[16px] font-sans leading-[1.7] text-(--gray) group-hover:text-(--gray)/90 transition-colors">
                                {project.description}
                            </p>

                            {/* tech stack */}
                            <div className="flex gap-1.5 flex-wrap">
                                {project.tech.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="text-[12px] font-mono px-2.5 py-1 rounded-full border border-white/7 text-(--gray) transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/3"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </Card>
        </div>
    )
})

ProjectsSection.displayName = "ProjectsSection"
export default ProjectsSection