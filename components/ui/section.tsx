interface SectionProps {
    id: string;
    heading: string;
    /**
     * `alt` rende la sezione come una lastra rientrata e molto arrotondata nel
     * tono di superficie secondario. Alternalo con `base` così che due sezioni
     * vicine non condividano mai il tono: ora che le righe sottili non ci sono
     * più, è quello scalino di colore a separare una sezione dall'altra.
     */
    tone?: "base" | "alt";
    children: React.ReactNode;
}

/**
 * I due toni condividono la stessa gronda esterna e la stessa misura interna,
 * così il bordo sinistro di ogni titolo resta allineato lungo tutta la pagina,
 * a prescindere dalla fascia.
 *
 * Nessuna etichetta sopra al titolo, di proposito: una piccola dicitura
 * spaziata sopra ogni titolo è il modo più rapido di far sembrare una pagina
 * uscita da un template.
 */
export default function Section({ id, heading, tone = "base", children }: SectionProps) {
    const body = (
        <div className="mx-auto w-full max-w-5xl p-8 md:p-10 lg:p-12">
            <h2 className="max-w-[54ch] font-display text-3xl font-semibold tracking-[-0.03em] text-balance md:text-4xl">
                {heading}
            </h2>

            <div className="mt-10 md:mt-14">{children}</div>
        </div>
    );

    if (tone === "alt") {
        return (
            <section id={id} className="px-3 md:px-20 md:py-20">
                <div className="mx-auto max-w-5xl rounded-3xl bg-surface-alt">{body}</div>
            </section>
        );
    }

    return (
        <section id={id} className="px-3 md:px-20">
            {body}
        </section>
    );
}
