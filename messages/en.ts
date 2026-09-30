import type { ProjectSlug, SkillGroup } from "@/lib/data";
import type { Messages } from "./it";

const projectCopy: Record<ProjectSlug, { description: string }> = {
    "alberi-di-vita": {
        description:
            "Full rebuild of the public site, with a CMS and an internal admin tool for the non-profit. Analysis, full-stack development and release.",
    },
    goalcrew: {
        description:
            "An iOS app for football leagues among friends: free-form teams, automatic standings, call-ups and a shared kitty, joined with an invite code.",
    },
    "pocket-garage": {
        description:
            "A PWA for keeping track of your vehicles: deadlines, servicing, refuelling, insurance and road tax.",
    },
};

const skillGroupNames: Record<SkillGroup, string> = {
    frontend: "Frontend",
    backend: "Backend",
    data: "Data and infrastructure",
    mobile: "Mobile",
};

/*
 * L'annotazione `: Messages` è tutto il punto: una chiave mancante, o uno slug
 * di progetto aggiunto a lib/data.ts senza traduzione, fa fallire la build qui.
 */
export const en: Messages = {
    meta: {
        title: "Francesco Delmonaco - Full stack developer",
        description:
            "Full stack developer based in Brescia, Italy. I build custom business software, web applications, platforms and start-up demos, handling the whole process from analysis to release.",
        siteName: "Francesco Delmonaco",
        keywords: [
            "Francesco Delmonaco",
            "web developer",
            "full stack developer",
            "custom business software",
            "web applications",
            "PWA",
            "start-up demo",
            "Next.js",
            "React",
            "Supabase",
            "Brescia",
        ],
        ogTagline: "Business software, web applications and start-up demos",
    },

    nav: {
        skipToContent: "Skip to content",
        home: "Back to top",
        it: "IT",
        en: "EN",
        switchTo: {
            it: "Switch to Italian",
            en: "Switch to English",
        },
    },

    theme: {
        group: "Theme",
        light: "Light",
        system: "Auto",
        dark: "Dark",
    },

    hero: {
        role: "Full stack developer",
        location: "Brescia, Italy",
        portraitAlt: "Francesco Delmonaco",
    },

    services: {
        heading: "What I do",
        items: [
            {
                title: "Custom business software",
                body: "Records, workflows and reporting for teams that have outgrown the spreadsheet. Built around the process you already run, not a generic template.",
                tags: ["Records", "Workflows", "Reports and dashboards"],
            },
            {
                title: "Web apps and PWAs",
                body: "Installable from the browser and usable offline. One codebase for desktop, tablet and phone.",
                tags: ["Installable", "Offline", "Any device"],
            },
            {
                title: "Platforms and websites",
                body: "Marketing sites with a CMS you can update yourself, private areas, integrations with the services you already use.",
                tags: ["CMS", "Private areas", "Integrations"],
            },
            {
                title: "Start-up demos",
                body: "From a clickable prototype to a working MVP, to validate an idea or take it in front of an investor.",
                tags: ["Prototype", "MVP", "Investor pitch"],
            },
            {
                title: "Mobile apps",
                body: "Native and cross-platform apps for iOS and Android, from interface design through to store release.",
                tags: ["iOS", "Android", "Store release"],
            },
        ],
    },

    work: {
        heading: "Work",
        kind: {
            fullstack: "Frontend + Backend",
            frontend: "Frontend",
            mobile: "Mobile",
        },
        visit: "Open the project in a new tab",
        items: projectCopy,
    },

    stack: {
        heading: "Stack",
        groups: skillGroupNames,
    },

    contact: {
        heading: "Contact",
        email: { label: "Email" },
        github: { label: "GitHub" },
        linkedin: { label: "LinkedIn" },
        cv: { label: "Résumé" },
    },

    notFound: {
        title: "Page not found",
        body: "The address you opened doesn't exist, or doesn't exist any more.",
        back: "Back to the home page",
    },
};
