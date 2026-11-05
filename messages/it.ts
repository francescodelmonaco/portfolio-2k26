import type { ProjectSlug, ServiceArea, SkillGroup } from "@/lib/data";

/*
 * Fonte di verità per ogni stringa della pagina.
 * `Messages` deriva da questo oggetto, quindi messages/en.ts non compila se
 * manca una chiave, o lo slug di un progetto.
 *
 * NOTA: qui niente `as const`, di proposito. Con quello ogni valore si
 * restringe a un literal di stringa e il file inglese smette di soddisfare il
 * tipo.
 */

const projectCopy: Record<ProjectSlug, { description: string }> = {
    "alberi-di-vita": {
        description:
            "Ristrutturazione completa del sito vetrina, con CMS e gestionale interno per l'organizzazione non profit. Analisi, sviluppo full-stack e rilascio.",
    },
    goalcrew: {
        description:
            "App iOS per campionati di calcio tra amici: squadre libere, classifica automatica, convocazioni e cassa condivise tramite codice di invito.",
    },
    "pocket-garage": {
        description:
            "PWA per tenere sotto controllo i propri veicoli: scadenze, manutenzioni, rifornimenti, assicurazioni e bolli.",
    },
};

/** `intro` solo per le celle larghe del bento (vedi components/services-section.tsx). */
export type ServiceAreaCopy = {
    title: string;
    intro?: string;
    items: { title: string; body: string }[];
};

const serviceCopy: Record<ServiceArea, ServiceAreaCopy> = {
    ai: {
        title: "Intelligenza artificiale",
        // solo le due celle larghe hanno una frase d'apertura: riempie la larghezza in più
        intro: "Sistemi costruiti sui tuoi dati e sui tuoi processi, dal prototipo alla messa in produzione.",
        items: [
            {
                title: "Sistemi RAG",
                body: "Assistenti che rispondono a partire dai tuoi documenti e database, citando le fonti.",
            },
            {
                title: "Agenti AI",
                body: "Usano strumenti e API e portano a termine compiti in più passaggi, al posto tuo.",
            },
            {
                title: "AI nei prodotti esistenti",
                body: "Ricerca in linguaggio naturale, riassunti ed estrazione di dati nel software che hai già.",
            },
            {
                title: "Chatbot e assistenti AI",
                body: "Per il sito o per uso interno, con regole chiare su cosa possono dire e cosa no.",
            },
        ],
    },
    data: {
        title: "Gestionali e dati",
        items: [
            {
                title: "Gestionali su misura",
                body: "Anagrafiche, flussi di lavoro e report costruiti attorno al tuo processo.",
            },
            {
                title: "Dashboard e report",
                body: "I numeri sparsi nei fogli di calcolo, in un'unica vista aggiornata.",
            },
            {
                title: "Backend e database",
                body: "API, modelli dati e permessi su AWS o Google Cloud, pensati per reggere la crescita.",
            },
            {
                title: "Automazioni",
                body: "Notifiche, sincronizzazioni e documenti che si generano da soli.",
            },
        ],
    },
    web: {
        title: "Siti e piattaforme",
        intro: "Dalla pagina singola alla piattaforma con area riservata, collegata ai servizi che usi già.",
        items: [
            {
                title: "Siti vetrina",
                body: "Veloci, curati e trovabili sui motori di ricerca.",
            },
            {
                title: "Landing page",
                body: "Una pagina sola, costruita attorno a un obiettivo.",
            },
            {
                title: "CMS e aree riservate",
                body: "Contenuti che aggiorni da solo, accessi diversi per ruoli diversi.",
            },
            {
                title: "Integrazioni API",
                body: "Pagamenti, CRM, email e fatturazione collegati fra loro.",
            },
        ],
    },
    apps: {
        title: "App e MVP",
        items: [
            {
                title: "App mobile",
                body: "iOS e Android, dall'interfaccia alla pubblicazione sugli store.",
            },
            {
                title: "Applicazioni web e PWA",
                body: "Installabili dal browser e utilizzabili anche senza connessione.",
            },
            {
                title: "MVP per start-up",
                body: "Dal prototipo navigabile al prodotto da mostrare a un investitore.",
            },
        ],
    },
};

const skillGroupNames: Record<SkillGroup, string> = {
    frontend: "Frontend",
    backend: "Backend",
    data: "Dati e infrastruttura",
    mobile: "Mobile",
};

export const it = {
    meta: {
        title: "Francesco Delmonaco - Sviluppatore full stack",
        description:
            "Sviluppatore full stack a Brescia. Realizzo gestionali su misura, applicazioni web, sistemi RAG e integrazioni AI, seguendo l'intero processo dall'analisi al rilascio.",
        siteName: "Francesco Delmonaco",
        keywords: [
            "Francesco Delmonaco",
            "sviluppatore web",
            "full stack developer",
            "gestionali su misura",
            "applicazioni web",
            "PWA",
            "demo start-up",
            "sistemi RAG",
            "integrazione AI",
            "agenti AI",
            "Next.js",
            "React",
            "Supabase",
            "Brescia",
        ],
        ogTagline: "Gestionali, applicazioni web e demo per start-up",
    },

    nav: {
        skipToContent: "Vai al contenuto",
        home: "Torna all'inizio",
        it: "IT",
        en: "EN",
        // le uniche stringhe che esplicitano l'azione; la bandiera e il codice
        // accanto sono entrambi aria-hidden
        switchTo: {
            it: "Passa all'italiano",
            en: "Passa all'inglese",
        },
    },

    theme: {
        switchTo: {
            light: "Passa al tema chiaro",
            dark: "Passa al tema scuro",
        },
    },

    hero: {
        role: "Sviluppatore full stack",
        location: "Brescia, Italia",
        portraitAlt: "Francesco Delmonaco",
    },

    services: {
        heading: "Servizi",
        /*
         * Quattro aree, una cella ciascuna del bento in
         * components/services-section.tsx. Posizione e larghezza della cella
         * le decide l'area (`serviceAreas` in lib/data.ts): l'AI è la più larga
         * perché è il lavoro più impegnativo. `body` è una riga sola: la
         * cella deve leggersi a colpo d'occhio. L'ordine qui non conta: lo
         * decide `serviceAreas`.
         */
        areas: serviceCopy,
        /* Dopo il numero di voci nella CTA delle celle chiuse su mobile: "4 servizi" */
        itemsLabel: "servizi",
    },

    work: {
        heading: "Progetti",
        kind: {
            fullstack: "Frontend + Backend",
            frontend: "Frontend",
            mobile: "Mobile",
        },
        visit: "Apri il progetto in una nuova scheda",
        items: projectCopy,
    },

    stack: {
        heading: "Stack",
        groups: skillGroupNames,
    },

    contact: {
        heading: "Contatti",
        email: { label: "Email" },
        github: { label: "GitHub" },
        linkedin: { label: "LinkedIn" },
        cv: { label: "Curriculum" },
    },

    notFound: {
        title: "Pagina non trovata",
        body: "L'indirizzo che hai aperto non esiste, o non esiste più.",
        back: "Torna alla home",
    },
};

export type Messages = typeof it;
