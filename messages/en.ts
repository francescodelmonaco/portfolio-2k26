import type { ProjectSlug, ServiceArea, SkillGroup } from "@/lib/data";
import type { Messages, ServiceAreaCopy } from "./it";

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

const serviceCopy: Record<ServiceArea, ServiceAreaCopy> = {
    ai: {
        title: "Artificial intelligence",
        intro: "Systems built on your own data and processes, from prototype to production.",
        items: [
            {
                title: "RAG systems",
                body: "Assistants that answer from your own documents and databases, citing their sources.",
            },
            {
                title: "AI agents",
                body: "They call tools and APIs and finish multi-step tasks on your behalf.",
            },
            {
                title: "AI in existing products",
                body: "Natural-language search, summaries and data extraction inside the software you already have.",
            },
            {
                title: "Chatbots and AI assistants",
                body: "For your site or for internal use, with clear rules on what they can and cannot say.",
            },
        ],
    },
    data: {
        title: "Business software and data",
        items: [
            {
                title: "Custom business software",
                body: "Records, workflows and reports built around the way you work.",
            },
            {
                title: "Dashboards and reports",
                body: "Numbers scattered across spreadsheets, in one up-to-date view.",
            },
            {
                title: "Backend and databases",
                body: "APIs, data models and permissions on AWS or Google Cloud, designed to handle growth.",
            },
            {
                title: "Automation",
                body: "Notifications, syncing and documents that generate themselves.",
            },
        ],
    },
    web: {
        title: "Websites and platforms",
        intro: "From a single page to a platform with private areas, connected to the services you already use.",
        items: [
            {
                title: "Marketing sites",
                body: "Fast, polished and easy to find on search engines.",
            },
            {
                title: "Landing pages",
                body: "A single page built around one goal.",
            },
            {
                title: "CMS and private areas",
                body: "Content you update yourself, different access for different roles.",
            },
            {
                title: "API integrations",
                body: "Payments, CRM, email and invoicing connected to each other.",
            },
        ],
    },
    apps: {
        title: "Apps and MVPs",
        items: [
            {
                title: "Mobile apps",
                body: "iOS and Android, from interface design to store release.",
            },
            {
                title: "Web apps and PWAs",
                body: "Installable from the browser and usable offline.",
            },
            {
                title: "Start-up MVPs",
                body: "From a clickable prototype to a product you can show an investor.",
            },
        ],
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
            "Full stack developer based in Brescia, Italy. I build custom business software, web applications, RAG systems and AI integrations, handling the whole process from analysis to release.",
        siteName: "Francesco Delmonaco",
        keywords: [
            "Francesco Delmonaco",
            "web developer",
            "full stack developer",
            "custom business software",
            "web applications",
            "PWA",
            "start-up demo",
            "RAG systems",
            "AI integration",
            "AI agents",
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
        switchTo: {
            light: "Switch to light theme",
            dark: "Switch to dark theme",
        },
    },

    hero: {
        role: "Full stack developer",
        location: "Brescia, Italy",
        portraitAlt: "Francesco Delmonaco",
    },

    services: {
        heading: "What I do",
        areas: serviceCopy,
        itemsLabel: "services",
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
