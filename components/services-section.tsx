import Image from "next/image";
import { Plus } from "lucide-react";
import Section from "./ui/section";
import Card from "./ui/card";
import ServiceRails from "./service-rails";
import type { Messages } from "@/lib/i18n/messages";

/** Accoppiamento posizionale con services.items di messages/{it,en}.ts: quell'array non ha slug su cui indicizzare. */
const illustrations = [1, 2, 3, 4, 5].map((n) => `/img/illustration-${n}.png`);

/**
 * Due fisarmoniche con lo stesso markup e lo stesso stato (`ServiceRails`, che
 * ricorda l'ultima aperta), entrambe pilotate da `.svc-rails` in globals.css:
 *
 * - da `lg` con mouse, cinque colonne affiancate col titolo verticale che si
 *   allargano in orizzontale;
 * - altrimenti (mobile, tablet, touch) cinque barre impilate col titolo che si
 *   aprono in verticale al tocco.
 *
 * Il titolo esiste due volte, come `<h3>` nella barra e come `<h3>` nel corpo:
 * il CSS ne mostra sempre uno solo con `display: none` sull'altro, quindi anche
 * lo screen reader ne trova uno. Quello verticale è `aria-hidden` perché è solo
 * decorazione della colonna chiusa.
 *
 * Illustrazioni: PNG trasparenti, niente riquadro di sfondo; decorative, da cui
 * `alt=""`.
 *
 * `tabIndex={0}` sul `<li>`: si apre anche col focus da tastiera. La card è la
 * stessa di Progetti, ma senza `.panel-interactive`: l'apertura è già il
 * segnale, un sollevamento sarebbe il secondo per la stessa cosa.
 */
export default function ServicesSection({ copy }: { copy: Messages["services"] }) {
    return (
        <Section id="services" heading={copy.heading} tone="alt">
            <ServiceRails>
                {copy.items.map((item, index) => (
                    <li key={item.title} tabIndex={0} className="min-w-0 rounded-(--radius-panel)">
                        <Card className="relative overflow-hidden p-2 lg:p-3">
                            <div
                                aria-hidden="true"
                                className="svc-title-v absolute inset-0 hidden flex-col items-center justify-between py-6"
                            >
                                <Plus size={18} strokeWidth={1.75} className="text-muted-foreground" />
                                <span className="rotate-180 font-display text-lg font-semibold tracking-[-0.02em] whitespace-nowrap [writing-mode:vertical-rl]">
                                    {item.title}
                                </span>
                            </div>

                            <div className="svc-bar flex items-center justify-between gap-4 px-3 py-2 lg:px-4">
                                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-balance">
                                    {item.title}
                                </h3>
                                <span
                                    aria-hidden="true"
                                    className="svc-bar-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                                >
                                    <Plus size={17} strokeWidth={2} />
                                </span>
                            </div>

                            <div className="svc-panel">
                                <div>
                                    <div className="svc-body flex flex-col sm:flex-row">
                                        <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-[45%] sm:self-stretch">
                                            <Image
                                                src={illustrations[index]}
                                                alt=""
                                                fill
                                                sizes="(min-width: 640px) 240px, 90vw"
                                                className="object-contain p-4"
                                            />
                                        </div>
                                        <div className="flex min-w-0 flex-1 flex-col justify-center px-3 pb-3 sm:px-4 sm:pt-4 md:px-5">
                                            <h3 className="svc-body-title mb-3 font-display text-xl font-semibold tracking-[-0.02em] text-balance">
                                                {item.title}
                                            </h3>
                                            <p className="max-w-[52ch] leading-relaxed text-pretty text-muted-foreground">
                                                {item.body}
                                            </p>
                                            <ul className="flex flex-wrap gap-2 pt-5">
                                                {item.tags.map((tag) => (
                                                    <li
                                                        key={tag}
                                                        className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                                                    >
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </li>
                ))}
            </ServiceRails>
        </Section>
    );
}
