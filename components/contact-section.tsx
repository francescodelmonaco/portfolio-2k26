import { ArrowUpRight, FileUser, Github, Linkedin, Mail } from "lucide-react";
import Section from "./ui/section";
import { site } from "@/lib/site";
import type { Messages } from "@/lib/i18n/messages";

/** `external` governa target="_blank": su un mailto: la nuova scheda è sbagliata. */
export default function ContactSection({ copy }: { copy: Messages["contact"] }) {
    const rows = [
        { ...copy.email, Icon: Mail, href: `mailto:${site.email}`, value: site.email, external: false },
        {
            ...copy.github,
            Icon: Github,
            href: site.github,
            value: "@francescodelmonaco",
            external: true,
        },
        {
            ...copy.linkedin,
            Icon: Linkedin,
            href: site.linkedin,
            value: "in/francescodelmonaco",
            external: true,
        },
        { ...copy.cv, Icon: FileUser, href: site.cv, value: "PDF", external: true },
    ];

    return (
        <Section id="contact" heading={copy.heading}>
            {/* il `min-w-0` su ogni elemento è portante: le tracce della griglia
                partono da min-width:auto, il che lascia che l'indirizzo email,
                che non si può spezzare, allarghi tutta la colonna oltre il
                viewport */}
            <ul className="grid gap-4 sm:grid-cols-2 md:gap-5">
                {rows.map((row) => (
                    <li key={row.label} className="min-w-0">
                        <a
                            href={row.href}
                            {...(row.external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            className="panel panel-interactive group flex h-full items-center gap-4 p-5 md:p-6"
                        >
                            <span
                                aria-hidden="true"
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-primary-strong group-hover:text-primary-strong-foreground"
                            >
                                <row.Icon size={20} strokeWidth={1.75} />
                            </span>

                            <span className="min-w-0 flex-1">
                                <span className="font-display text-base font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-primary">
                                    {row.label}
                                </span>
                                <span className="mt-1 block truncate font-mono text-xs text-muted-foreground">
                                    {row.value}
                                </span>
                            </span>

                            <ArrowUpRight
                                aria-hidden="true"
                                size={17}
                                strokeWidth={2}
                                className="shrink-0 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
