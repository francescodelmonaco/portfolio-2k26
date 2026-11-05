import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "./ui/section";
import Card, { cardClass } from "./ui/card";
import { projects, skills, type Project } from "@/lib/data";
import type { Messages } from "@/lib/i18n/messages";

/** Solo le tecnologie presenti anche nello stack hanno un marchio da mostrare. */
const skillByName = new Map(skills.map((skill) => [skill.name, skill]));

/**
 * Un unico gruppo etichettato invece di una lista: i marchi sono decorativi, e
 * lo stack si legge meglio annunciato come una frase sola che come una lista di
 * un elemento solo.
 */
function TechMarks({ tech }: { tech: string[] }) {
    return (
        <div
            role="img"
            aria-label={tech.join(", ")}
            className="flex w-max items-center gap-2 border border-border px-2.5 py-1.5"
        >
            {tech
                .map((name) => skillByName.get(name))
                .filter((skill) => skill !== undefined)
                .map((skill) =>
                    skill.iconDark ? (
                        <Fragment key={skill.name}>
                            <Image
                                aria-hidden="true"
                                src={skill.icon}
                                alt=""
                                width={16}
                                height={16}
                                className="h-4 w-4 shrink-0 object-contain dark:hidden"
                            />
                            <Image
                                aria-hidden="true"
                                src={skill.iconDark}
                                alt=""
                                width={16}
                                height={16}
                                className="hidden h-4 w-4 shrink-0 object-contain dark:block"
                            />
                        </Fragment>
                    ) : (
                        <Image
                            key={skill.name}
                            aria-hidden="true"
                            src={skill.icon}
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 shrink-0 object-contain"
                        />
                    ),
                )}
        </div>
    );
}

/**
 * Su un Project sia `link` sia `github` sono opzionali, quindi una card può
 * legittimamente non avere dove andare. In quel caso rende come pannello
 * semplice: un <a href="#"> che apre una nuova scheda su se stesso è peggio di
 * nessun link, e `.panel-interactive` prometterebbe un'affordance inesistente.
 */
function CardShell({ project, copy, children }: { project: Project; copy: Messages["work"]; children: ReactNode }) {
    const href = project.link ?? project.github;

    if (!href) return <Card>{children}</Card>;

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} - ${copy.visit}`}
            className={`${cardClass} panel-interactive`}
        >
            {children}
        </Link>
    );
}

/**
 * Tre celle di una griglia `gap-px` sopra `bg-border`: le righe fra le card
 * sono lo sfondo che traspare, quindi una sola linea fra due vicine. In hover
 * la barra d'accento di `.panel-interactive` si stende sul bordo superiore.
 *
 * Lo screenshot occupa la cella da bordo a bordo, chiuso da una riga sotto. Il
 * riquadro è 3:2 come gli screenshot sorgente (1440×960): `object-cover` +
 * `object-top` ritaglia dal basso quelli con un rapporto diverso.
 */
export default function WorkSection({ copy }: { copy: Messages["work"] }) {
    return (
        <Section id="work" heading={copy.heading}>
            <div className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-3">
                {projects.map((project, index) => (
                    <article key={project.slug} className="min-w-0">
                        <CardShell project={project} copy={copy}>
                            {project.screen && (
                                <div className="overflow-hidden border-b border-border bg-muted">
                                    <Image
                                        src={project.screen}
                                        alt=""
                                        sizes="(max-width: 1024px) 100vw, 24rem"
                                        priority={index < 2}
                                        className="aspect-3/2 w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.03]"
                                    />
                                </div>
                            )}

                            <div className="flex flex-1 flex-col p-5 md:p-6">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="min-w-0">
                                        <h3 className="font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-primary">
                                            {project.title}
                                        </h3>
                                        <p className="hud-label mt-1.5 text-muted-foreground">
                                            {copy.kind[project.kind]}
                                        </p>
                                    </div>
                                    <span
                                        aria-hidden="true"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-border-strong text-muted-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                                    >
                                        <ArrowUpRight size={17} strokeWidth={2} />
                                    </span>
                                </div>

                                <p className="mt-4 max-w-[60ch] leading-relaxed text-pretty text-muted-foreground">
                                    {copy.items[project.slug].description}
                                </p>

                                <div className="mt-auto pt-5">
                                    <TechMarks tech={project.tech} />
                                </div>
                            </div>
                        </CardShell>
                    </article>
                ))}
            </div>
        </Section>
    );
}
