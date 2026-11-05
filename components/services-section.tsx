import { BrainCircuit, Database, Globe, Plus, Smartphone } from "lucide-react";
import Section from "./ui/section";
import { serviceAreas, type ServiceArea } from "@/lib/data";
import type { Messages } from "@/lib/i18n/messages";

/*
 * Larghezza, griglia interna e icona per area. Le due celle larghe stanno in
 * diagonale (AI in alto a sinistra, Siti in basso a destra), così il bento ha
 * un ritmo 2+1 / 1+2 invece di due righe uguali. A `md` la griglia ha due
 * colonne e le celle larghe la occupano tutta: AI, poi Gestionali e App
 * affiancate, poi Siti.
 *
 * Le celle larghe vanno alle aree con quattro voci, che lì stanno su 2×2: con
 * la frase d'apertura (`intro`) arrivano all'altezza della cella stretta
 * accanto, che le impila in colonna. Una cella larga con tre voci su una riga
 * sola resterebbe mezza vuota.
 */
const NEUTRAL = { bg: "bg-surface", ink: "", icon: "border-border-strong text-muted-foreground" };

/*
 * `tone`: le due celle larghe, in diagonale, sono colorate e con due colori
 * diversi (AI sulla velatura d'accento, Siti sul giallo di --warm-wash); le due
 * strette sull'altra diagonale restano neutre. I fondi sono utility e non
 * `.panel`: la regola `.panel` non è in un layer e vincerebbe.
 */
const CELL: Record<
    ServiceArea,
    { span: string; list: string; Icon: typeof Globe; tone: { bg: string; ink: string; icon: string } }
> = {
    ai: {
        span: "md:col-span-2",
        list: "svc-list-wide",
        Icon: BrainCircuit,
        tone: { bg: "bg-accent-wash", ink: "text-primary", icon: "border-primary text-primary" },
    },
    data: { span: "", list: "svc-list-narrow", Icon: Database, tone: NEUTRAL },
    apps: { span: "", list: "svc-list-narrow", Icon: Smartphone, tone: NEUTRAL },
    web: {
        span: "md:col-span-2",
        list: "svc-list-wide",
        Icon: Globe,
        tone: { bg: "bg-warm-wash", ink: "text-warm-ink", icon: "border-warm-ink text-warm-ink" },
    },
};

/**
 * Un bento per area. Su mobile ogni cella è un `<details>` chiuso: si vede
 * solo il titolo con la CTA "N servizi +", e il tocco apre l'elenco. Nessun
 * JS, resta tutto Server Component. Da `md` il contenuto è sempre visibile
 * (`.svc-details` in globals.css) e il `<summary>` non reagisce al click. La gerarchia la dà la cella,
 * non il corpo delle parole: l'AI, il lavoro più impegnativo, prende la cella
 * larga in alto ed è sulla velatura d'accento.
 *
 * Le celle con `intro` spingono le voci in fondo (`justify-between` sul blocco
 * del contenuto, che occupa l'altezza rimasta), così
 * l'ultima riga si allinea a quella della cella stretta accanto; le strette
 * restano allineate in alto, e l'eventuale spazio in più finisce sotto.
 *
 * Le celle sono `gap-px` sopra `bg-border` come in Progetti e Contatti, quindi
 * fra due vicine c'è una linea sola. Dentro la cella le voci sono divise da
 * linee tratteggiate (`.svc-list` in globals.css): continue fra le aree,
 * tratteggiate fra i servizi di un'area.
 */
export default function ServicesSection({ copy }: { copy: Messages["services"] }) {
    return (
        <Section id="services" heading={copy.heading} tone="alt">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                {serviceAreas.map((area) => {
                    const { span, list, Icon, tone } = CELL[area];
                    const { title, intro, items } = copy.areas[area];

                    return (
                        <article key={area} className={`flex min-w-0 flex-col p-6 md:p-8 ${span} ${tone.bg}`}>
                            <details className="svc-details group flex flex-1 flex-col">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 md:pointer-events-none md:cursor-auto [&::-webkit-details-marker]:hidden">
                                    <div className="min-w-0">
                                        <h3
                                            className={`font-display text-2xl leading-[0.9] font-bold tracking-[-0.01em] text-balance uppercase font-stretch-condensed md:text-3xl ${tone.ink}`}
                                        >
                                            {title}
                                        </h3>
                                        {/* La CTA del tocco: solo su mobile, dove la cella parte chiusa */}
                                        <p className="hud-label mt-3 flex items-center gap-2 text-muted-foreground md:hidden">
                                            {items.length} {copy.itemsLabel}
                                            <Plus
                                                aria-hidden="true"
                                                size={14}
                                                strokeWidth={2}
                                                className="group-open:rotate-45 motion-safe:transition-transform"
                                            />
                                        </p>
                                    </div>
                                    <span
                                        aria-hidden="true"
                                        className={`flex size-10 shrink-0 items-center justify-center border ${tone.icon}`}
                                    >
                                        <Icon size={18} strokeWidth={1.75} />
                                    </span>
                                </summary>

                                <div
                                    className={`flex flex-1 flex-col justify-between gap-10 ${intro ? "mt-5" : "mt-10"}`}
                                >
                                    {intro && (
                                        <p className="max-w-[40ch] font-display text-lg leading-snug tracking-[-0.015em] text-pretty md:text-2xl">
                                            {intro}
                                        </p>
                                    )}

                                    <ul className={`svc-list ${list}`}>
                                        {items.map((item) => (
                                            <li key={item.title} className="min-w-0">
                                                <h4 className="font-display text-lg font-semibold tracking-[-0.02em] text-balance">
                                                    {item.title}
                                                </h4>
                                                <p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground">
                                                    {item.body}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </article>
                    );
                })}
            </div>
        </Section>
    );
}
