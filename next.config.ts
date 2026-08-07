import type { NextConfig } from "next";

/*
 * `experimental.optimizeCss` (critters) è stato rimosso deliberatamente.
 *
 * Critters mette inline solo il CSS i cui selettori compaiono nell'HTML
 * renderizzato dal server e rimanda il resto. Tutto ciò che applica uno script
 * di tema pre-paint è per definizione assente da quell'HTML, quindi le regole
 * del tema arriverebbero con il foglio di stile differito: un lampo della
 * palette sbagliata. Inoltre il suo parser è precedente alle registrazioni
 * `@property --tw-*` di Tailwind v4, e il pacchetto è archiviato a monte.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
