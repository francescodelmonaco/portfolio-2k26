import { StaticImageData } from 'next/image';

// frontend icons
import javascriptIcon from '../public/icons/javascript.svg';
import typescriptIcon from '../public/icons/typescript.svg';
import reactIcon from '../public/icons/react.svg';
import nextIcon from '../public/icons/next.svg';
import tailwindIcon from '../public/icons/tailwind.svg';

// backend icons
import nodeIcon from '../public/icons/node.svg';
import expressIcon from '../public/icons/express.svg';
import mysqlIcon from '../public/icons/mysql.svg';
import supabaseIcon from '../public/icons/supabase.svg';
import postgresqlIcon from '../public/icons/postgresql.svg';
import laravelIcon from '../public/icons/laravel.svg';
import phpIcon from '../public/icons/php.svg';

// projects images
import scoreBoardScreen from '../public/screen/score-board-screen.webp';
import pocketGarageScreen from '../public/screen/pocket-garage-screen.webp';
import alberiDiVitaScreen from '../public/screen/alberi-di-vita-screen.webp';

export interface Project {
    title: string;
    description: string;
    tech: string[];
    link?: string;
    github?: string;
    type: string;
    screen?: StaticImageData;
};

export interface Skill {
    name: string;
    icon: string;
}

export const skills: Skill[] = [
    { name: 'React', icon: reactIcon },
    { name: 'Next.js', icon: nextIcon },
    { name: 'JavaScript', icon: javascriptIcon },
    { name: 'TypeScript', icon: typescriptIcon },
    { name: 'Tailwind', icon: tailwindIcon },
    { name: 'Node.js', icon: nodeIcon },
    { name: 'Express', icon: expressIcon },
    { name: 'Laravel', icon: laravelIcon },
    { name: 'PHP', icon: phpIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'PostgreSQL', icon: postgresqlIcon },
    { name: 'Supabase', icon: supabaseIcon },
];

export const projects: Project[] = [
    {
        title: 'Alberi di Vita OdV',
        description: 'Ristrutturazione completa del sito vetrina + CMS + gestionale per l\'organizzazione non profit. Sviluppo full-stack con deploy su Vercel.',
        tech: ['Next.js', 'TypeScript', 'Shadcn', 'Supabase'],
        link: 'https://alberi-di-vita-odv.vercel.app/',
        type: 'Frontend + Backend',
        screen: alberiDiVitaScreen
    },
    {
        title: 'Score Board',
        description: 'PWA completa per la gestione di statistiche, giocatori e flussi di cassa di squadre sportive amatoriali.',
        tech: ['Next.js', 'Tailwind', 'Supabase'],
        link: 'https://score-board-gray.vercel.app/',
        type: 'Frontend + Backend',
        screen: scoreBoardScreen
    },
    {
        title: 'Pocket Garage',
        description: 'PWA per il monitoraggio di veicoli: scadenze, manutenzioni, rifornimenti, assicurazioni e bolli.',
        tech: ['Next.js', 'Tailwind', 'Shadcn', 'Supabase'],
        link: 'https://pocket-garage.vercel.app/',
        type: 'Frontend + Backend',
        screen: pocketGarageScreen
    },
    /* {
        title: 'Convenzioni Poliambulanza',
        description: 'PWA sviluppata per semplificare la ricerca delle attività convenzionate con l\'Istituto Ospedaliero Poliambulanza di Brescia. Applicazione web progressiva ottimizzata per mobile.',
        tech: ['React', 'Tailwind', 'Supabase'],
        link: 'https://pa-conventions.vercel.app/',
        type: 'Frontend + Backend'
    } */
];