import Image from "next/image";
import type { CSSProperties } from "react";
import type { Messages } from "@/lib/i18n/messages";

/*
 * Contorno a pixel del ritratto, ricavato dentro la foto: il bordo della foto
 * (fondo blu e soggetto, giacca compresa) è diviso in una griglia di pixel da
 * U px su tre anelli, e alcuni pixel sono buchi. Dall'esterno verso l'interno
 * i buchi si diradano, così il bordo si sfalda senza aggiungere colore fuori
 * dalla foto. Nell'anello esterno alcuni buchi ogni tanto si riempiono
 * (classe `n`), nei due interni alcuni pixel ogni tanto si bucano (`f`).
 *
 * È una `mask-image`: un SVG generato qui e messo inline come data URI, quindi
 * i buchi sono trasparenti davvero (si vede il fondo, alone del cursore
 * compreso) e `next/image` resta intatto. L'SVG non ha dimensioni: con
 * `mask-size: 100% 100%` le sue unità sono px della cella, quindi la griglia
 * resta esatta a qualunque misura. Lati destro e basso stanno in un `<svg>`
 * annidato a x/y 100% con coordinate negative, ancorati al bordo opposto.
 * Le animazioni vivono nello `<style>` dell'SVG, solo `opacity`, e si fermano
 * con prefers-reduced-motion. Pseudo-casuale ma deterministico.
 */
const rand = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
};
const U = 12;
// ponytail: 48 pixel per lato coprono lati fino a 48 × 12px = 576px, oltre il bordo resta intero in fondo
const SLOTS = 48;
// per anello, dall'esterno: [soglia buco fisso, soglia pixel pieno fisso]; sopra la seconda il pixel lampeggia
const RINGS = [
    [0.5, 0.75],
    [0.2, 0.8],
    [0.05, 0.9],
];
const edge = (side: number, at: (d: number, i: number) => [number, number]) =>
    RINGS.flatMap(([hole, full], d) =>
        Array.from({ length: SLOTS }, (_, i) => {
            const seed = side * 1000 + d * 100 + i;
            const r = rand(seed);
            if (r >= hole && r < full) return "";
            const [x, y] = at(d, i);
            // durata e ritardo da due classi a caso fra otto, così nessun gruppo lampeggia in sincrono
            const blink = r < hole ? "" : ` class="${d ? "f" : "n"} d${Math.floor(rand(seed + 7) * 8)} l${Math.floor(rand(seed + 13) * 8)}"`;
            return `<use href="#p" x="${x}" y="${y}"${blink}/>`;
        }),
    ).join("");
const range = Array.from({ length: 8 }, (_, k) => k);
const svg =
    `<svg xmlns="http://www.w3.org/2000/svg"><style>` +
    `.n,.f{animation:n 6s ease-in-out infinite}.f{animation-name:f;opacity:0}` +
    range.map((k) => `.d${k}{animation-duration:${4 + k * 0.8}s}.l${k}{animation-delay:-${k * 1.3}s}`).join("") +
    `@keyframes n{0%,35%,85%,100%{opacity:1}50%,70%{opacity:0}}@keyframes f{0%,35%,85%,100%{opacity:0}50%,70%{opacity:1}}` +
    `@media (prefers-reduced-motion:reduce){.n,.f{animation:none}}</style>` +
    `<defs><rect id="p" width="${U}" height="${U}"/></defs><mask id="m"><rect width="100%" height="100%" fill="#fff"/>` +
    edge(0, (d, i) => [i * U, d * U]) +
    edge(1, (d, i) => [d * U, i * U]) +
    `<svg x="100%" overflow="visible">${edge(2, (d, i) => [-(d + 1) * U, i * U])}</svg>` +
    `<svg y="100%" overflow="visible">${edge(3, (d, i) => [i * U, -(d + 1) * U])}</svg>` +
    `</mask><rect width="100%" height="100%" fill="#fff" mask="url(#m)"/></svg>`;
// apici singoli dentro l'SVG: quelli doppi chiuderebbero la stringa di `url("…")`
const mask: CSSProperties = {
    maskImage: `url("data:image/svg+xml,${svg.replace(/"/g, "'").replace(/[#%<>]/g, encodeURIComponent)}")`,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
};

/**
 * Il ruolo come etichetta, poi il nome: è lui il titolo della pagina. In
 * minuscolo a larghezza piena e a corpo misurato, non nel maiuscolo condensato
 * dei titoli di sezione, che a questa scala urlava. Il cognome porta l'accento.
 *
 * Il ritratto è la versione scontornata (fondo trasparente, bordo bianco
 * sfumato) sopra `bg-primary`: il fondo è blu pieno in chiaro e blu schiarito in dark,
 * lo stesso colore dell'accento. L'originale col fondo blu cotto dentro
 * (foto-profilo.webp) resta per il JSON-LD, dove serve un'immagine opaca.
 *
 * Due celle della stessa griglia della pagina: testo a sinistra, ritratto a
 * destra, senza righe intorno: il contorno lo fanno i pixel. Su mobile il
 * ritratto sale sopra al testo, quadrato e a misura contenuta (non a tutta
 * larghezza, che in cima pesava troppo), e il testo è centrato sotto.
 */
export default function HeroSection({ copy }: { copy: Messages["hero"] }) {
    return (
        <section className="border-b border-border">
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
                <div className="flex min-w-0 flex-col items-center justify-end px-5 pt-8 pb-12 text-center md:items-start md:px-10 md:py-20 md:text-left">
                    <p className="hud-label text-muted-foreground">{copy.role}</p>
                    <h1 className="mt-5 font-display text-[clamp(2.75rem,6.4vw,5rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
                        Francesco
                        <br />
                        <span className="text-primary">Delmonaco</span>
                    </h1>
                    <p className="hud-label mt-8 w-max border border-border-strong px-3 py-2 text-muted-foreground">
                        {copy.location}
                    </p>
                </div>

                {/* `fill`: da `md` il ritratto riempie tutta l'altezza della cella, qualunque sia quella del testo accanto */}
                <div className="relative order-first mx-auto mt-12 aspect-square w-72 max-w-[calc(100%-2.5rem)] md:order-none md:mx-0 md:mt-0 md:aspect-auto md:min-h-88 md:w-auto md:max-w-none">
                    <div className="absolute inset-0 bg-primary" style={mask}>
                        <Image
                            src="/img/foto-profilo-cutout.webp"
                            alt={copy.portraitAlt}
                            fill
                            priority
                            fetchPriority="high"
                            sizes="(min-width: 768px) 22rem, 18rem"
                            className="object-cover object-[center_30%]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
