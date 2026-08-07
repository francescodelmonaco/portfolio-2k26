import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "./ui/section";
import { projects, skills, type Project } from "@/lib/data";
import type { Messages } from "@/lib/i18n/messages";

/** Solo le tecnologie presenti anche nello stack hanno un marchio da mostrare. */
const skillByName = new Map(skills.map((skill) => [skill.name, skill]));

/*
 * Una pila sfalsata a ventaglio: rotazione alternata, sovrapposizione tra
 * vicine su desktop, ogni card uno scalino di z sopra la precedente. Si indicizza
 * per posizione, quindi questi tre array devono restare della stessa lunghezza.
 */
const CARD_TILT = ["lg:-rotate-3", "lg:rotate-2", "lg:-rotate-2"];
const CARD_OFFSET = ["", "lg:-ml-10 lg:mt-6", "lg:-ml-10"];
const CARD_Z = ["z-10", "z-20", "z-30"];

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
            className="flex w-max items-center gap-2 rounded-full bg-muted px-3 py-1.5"
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

const CARD_CLASS = "panel group flex h-full flex-col p-3";

/**
 * Su un Project sia `link` sia `github` sono opzionali, quindi una card può
 * legittimamente non avere dove andare. In quel caso rende come pannello
 * semplice: un <a href="#"> che apre una nuova scheda su se stesso è peggio di
 * nessun link, e `.panel-interactive` prometterebbe un'affordance inesistente.
 */
function CardShell({ project, copy, children }: { project: Project; copy: Messages["work"]; children: ReactNode }) {
    const href = project.link ?? project.github;

    if (!href) return <div className={CARD_CLASS}>{children}</div>;

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} - ${copy.visit}`}
            className={`${CARD_CLASS} panel-interactive`}
        >
            {children}
        </Link>
    );
}

/**
 * L'hover raddrizza la card, la ingrandisce e ne alza lo z-index, così sembra
 * estratta dalla pila.
 *
 * Lo screenshot sta dentro il padding della card con un raggio minore, per
 * tenere le due curve concentriche (raggio pannello 28px − 12px di padding =
 * 16px).
 */
export default function WorkSection({ copy }: { copy: Messages["work"] }) {
    return (
        <Section id="work" heading={copy.heading}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-0">
                {projects.map((project, index) => (
                    <article
                        key={project.slug}
                        className={`relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-40 hover:scale-110 lg:hover:rotate-0 ${CARD_TILT[index % CARD_TILT.length]} ${CARD_OFFSET[index % CARD_OFFSET.length]} ${CARD_Z[index % CARD_Z.length]}`}
                    >
                        <CardShell project={project} copy={copy}>
                            {project.screen && (
                                <div className="overflow-hidden rounded-lg bg-muted">
                                    <Image
                                        src={project.screen}
                                        alt=""
                                        sizes="(max-width: 1024px) 100vw, 32rem"
                                        priority={index < 2}
                                        className="aspect-4/3 w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                                    />
                                </div>
                            )}

                            <div className="flex flex-1 flex-col px-4 pt-6 pb-4 md:px-5">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="min-w-0">
                                        <h3 className="font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-primary">
                                            {project.title}
                                        </h3>
                                        <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                                            {copy.kind[project.kind]}
                                        </p>
                                    </div>
                                    <span
                                        aria-hidden="true"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-primary-strong group-hover:text-primary-strong-foreground"
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
