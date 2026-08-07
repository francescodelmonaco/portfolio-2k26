import { ClipboardList, Globe, MonitorSmartphone, Rocket, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import Section from "./ui/section";
import type { Messages } from "@/lib/i18n/messages";

/** Accoppiamento posizionale con services.items di messages/{it,en}.ts: quell'array non ha slug su cui indicizzare. */
const icons = [ClipboardList, MonitorSmartphone, Globe, Rocket, Smartphone];

/**
 * Griglia a due colonne; cinque elementi non si dividono in modo pari, quindi
 * l'ultima card occupa entrambe le colonne invece di lasciarsi accanto una
 * cella vuota.
 *
 * `.panel`, mai `.panel-interactive`: qui non c'è niente di cliccabile, e un
 * sollevamento in hover promette un'affordance che non esiste.
 */
export default function ServicesSection({ copy }: { copy: Messages["services"] }) {
    return (
        <Section id="services" heading={copy.heading} tone="alt">
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {copy.items.map((item, index) => {
                    const Icon = icons[index];
                    const isLast = index === copy.items.length - 1;
                    return (
                        <li
                            key={item.title}
                            className={cn("panel p-7 md:p-8", isLast && "sm:col-span-2")}
                        >
                            <div className="flex flex-col items-start gap-4 lg:flex-row lg:gap-5">
                                <span
                                    aria-hidden="true"
                                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground"
                                >
                                    <Icon size={28} strokeWidth={1.75} />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-balance">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
                                        {item.body}
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
}
