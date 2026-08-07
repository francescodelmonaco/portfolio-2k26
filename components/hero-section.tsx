import Image from "next/image";
import type { Messages } from "@/lib/i18n/messages";

/**
 * L'unico punto in cui il progetto grafico osa: il nome in corpo molto grande
 * nel carattere display con tracking stretto, il cognome che porta l'unico
 * colore di accento, accanto al ritratto a blob organico con il suo alone.
 *
 * Il generoso padding superiore serve a scavalcare la nav flottante, che è
 * `fixed` e quindi non occupa spazio proprio.
 */
export default function HeroSection({ copy }: { copy: Messages["hero"] }) {
    return (
        <section className="px-3 md:px-6">
            <div className="mx-auto w-full max-w-5xl px-5 pt-28 pb-14 md:px-8 md:pt-40 md:pb-20">
                <div className="flex flex-col-reverse items-center gap-10 text-center md:flex-row md:items-center md:justify-between md:gap-12 md:text-left">
                    <div className="min-w-0">
                        <h1 className="font-display text-[clamp(2.75rem,9vw,5.25rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
                            Francesco
                            <br />
                            <span className="text-primary-strong">Delmonaco</span>
                        </h1>
                        <p className="mt-5 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                            {copy.role}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
                            <span className="panel-soft inline-flex items-center rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                                {copy.location}
                            </span>
                        </div>
                    </div>

                    <div className="relative w-48 shrink-0 sm:w-56 md:w-64">
                        {/* alone di accento, dietro al blob e leggermente più grande */}
                        <div
                            aria-hidden="true"
                            className="blob absolute inset-0 scale-115 bg-glow blur-2xl"
                        />
                        <div className="blob relative overflow-hidden border border-border">
                            <Image
                                src="/img/foto-profilo.webp"
                                alt={copy.portraitAlt}
                                width={512}
                                height={512}
                                priority
                                fetchPriority="high"
                                className="aspect-square w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
