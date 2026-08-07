import type { ProjectSlug, SkillGroup } from "@/lib/data";

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
    "score-board": {
        description:
            "PWA per la gestione di squadre sportive amatoriali: statistiche, rose giocatori e movimenti di cassa in un unico posto.",
    },
    "pocket-garage": {
        description:
            "PWA per tenere sotto controllo i propri veicoli: scadenze, manutenzioni, rifornimenti, assicurazioni e bolli.",
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
            "Sviluppatore full stack a Brescia. Realizzo gestionali su misura, applicazioni web, piattaforme e demo per start-up, seguendo l'intero processo dall'analisi al rilascio.",
        siteName: "Francesco Delmonaco",
        keywords: [
            "Francesco Delmonaco",
            "sviluppatore web",
            "full stack developer",
            "gestionali su misura",
            "applicazioni web",
            "PWA",
            "demo start-up",
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
        group: "Tema",
        light: "Chiaro",
        system: "Auto",
        dark: "Scuro",
    },

    hero: {
        role: "Sviluppatore full stack",
        location: "Brescia, Italia",
        portraitAlt: "Francesco Delmonaco",
    },

    services: {
        heading: "Servizi",
        items: [
            {
                title: "Gestionali su misura",
                body: "Anagrafiche, flussi di lavoro e reportistica per chi ha superato il foglio di calcolo. Costruiti attorno al processo che usi già, non su un modello generico.",
            },
            {
                title: "Applicazioni web e PWA",
                body: "Installabili dal browser e utilizzabili anche senza connessione. Una sola base di codice per computer, tablet e telefono.",
            },
            {
                title: "Piattaforme e siti",
                body: "Siti vetrina con un CMS che aggiorni da solo, aree riservate, integrazioni con i servizi che usi già.",
            },
            {
                title: "Demo per start-up",
                body: "Dal prototipo navigabile all'MVP funzionante, per validare un'idea o portarla davanti a un investitore.",
            },
            {
                title: "App mobile",
                body: "App native e cross-platform per iOS e Android, dalla progettazione dell'interfaccia alla pubblicazione sugli store.",
            },
        ],
    },

    work: {
        heading: "Progetti",
        kind: {
            fullstack: "Frontend + Backend",
            frontend: "Frontend",
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
