import Image from "next/image";
import Section from "./ui/section";
import { skillGroups, skills } from "@/lib/data";
import type { Messages } from "@/lib/i18n/messages";

/**
 * Chip statiche raggruppate per ruolo. Non un marquee: un ciclo in autoplay non
 * ha una via d'uscita per chi riduce le animazioni (WCAG 2.2.2) e annuncia ogni
 * tecnologia due volte.
 *
 * I marchi con variante `iconDark` rendono entrambe le immagini e lasciano
 * scegliere alla variante `dark:` (pilotata da `[data-theme]`, vedi
 * globals.css): non serve JS.
 */
export default function StackSection({ copy }: { copy: Messages["stack"] }) {
    return (
        <Section id="stack" heading={copy.heading} tone="alt">
            <div className="flex flex-col gap-10">
                {skillGroups.map((group) => (
                    <div
                        key={group}
                        className="grid gap-4 md:grid-cols-[minmax(0,13rem)_1fr] md:items-center md:gap-10"
                    >
                        <h3 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                            {copy.groups[group]}
                        </h3>

                        <ul className="flex flex-wrap gap-2.5">
                            {skills
                                .filter((skill) => skill.group === group)
                                .map((skill) => (
                                    <li
                                        key={skill.name}
                                        className="panel-soft flex items-center gap-2.5 rounded-full py-2 pr-4 pl-3"
                                    >
                                        {skill.iconDark ? (
                                            <>
                                                <Image
                                                    src={skill.icon}
                                                    alt=""
                                                    width={20}
                                                    height={20}
                                                    className="h-5 w-5 object-contain dark:hidden"
                                                />
                                                <Image
                                                    src={skill.iconDark}
                                                    alt=""
                                                    width={20}
                                                    height={20}
                                                    className="hidden h-5 w-5 object-contain dark:block"
                                                />
                                            </>
                                        ) : (
                                            <Image
                                                src={skill.icon}
                                                alt=""
                                                width={20}
                                                height={20}
                                                className="h-5 w-5 object-contain"
                                            />
                                        )}
                                        <span className="text-sm">{skill.name}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
