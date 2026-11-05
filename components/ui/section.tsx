interface SectionProps {
    id: string;
    heading: string;
    /**
     * `alt` riempie la sezione col tono di superficie secondario. Alternalo con
     * `base` così che due sezioni vicine non condividano mai il tono: insieme
     * alla riga in fondo, è quello scalino di colore a separarle.
     */
    tone?: "base" | "alt";
    children: React.ReactNode;
}

/**
 * Ogni sezione è una fascia a tutta larghezza della colonna incorniciata, chiusa
 * da una riga. I due toni condividono lo stesso padding, così il bordo sinistro
 * di ogni titolo resta allineato lungo tutta la pagina.
 *
 * Il titolo è nella stessa voce dei titoli delle aree dei servizi:
 * maiuscolo, grassetto, condensato (asse `wdth` di Bricolage, vedi
 * lib/fonts.ts). È la firma tipografica della pagina.
 *
 * Nessuna etichetta sopra al titolo, di proposito: una piccola dicitura
 * spaziata sopra ogni titolo è il modo più rapido di far sembrare una pagina
 * uscita da un template.
 */
export default function Section({ id, heading, tone = "base", children }: SectionProps) {
    return (
        <section id={id} className={`border-b border-border ${tone === "alt" ? "bg-surface-alt" : ""}`}>
            <div className="px-5 py-14 md:px-10 md:py-20">
                <h2 className="font-display text-4xl leading-[0.9] font-bold tracking-[-0.01em] uppercase font-stretch-condensed md:text-6xl">
                    {heading}
                </h2>

                <div className="mt-10 md:mt-14">{children}</div>
            </div>
        </section>
    );
}
