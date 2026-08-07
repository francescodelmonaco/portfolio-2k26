import { StaticImageData } from 'next/image';

// icone frontend
import javascriptIcon from '../public/icons/javascript.svg';
import typescriptIcon from '../public/icons/typescript.svg';
import reactIcon from '../public/icons/react.svg';
import nextIcon from '../public/icons/next.svg';
import tailwindIcon from '../public/icons/tailwind.svg';

// icone backend
import nodeIcon from '../public/icons/node.svg';
import expressLightIcon from '../public/icons/expressjs-light.svg';
import expressDarkIcon from '../public/icons/expressjs-dark.svg';
import mysqlIcon from '../public/icons/mysql.svg';
import supabaseIcon from '../public/icons/supabase.svg';
import postgresqlIcon from '../public/icons/postgresql.svg';
import laravelIcon from '../public/icons/laravel.svg';
import phpLightIcon from '../public/icons/php-light.svg';
import phpDarkIcon from '../public/icons/php-dark.svg';

// icone mobile
import expoIcon from '../public/icons/expo.svg';

// immagini dei progetti
import scoreBoardScreen from '../public/screen/score-board-screen.webp';
import pocketGarageScreen from '../public/screen/pocket-garage-screen.webp';
import alberiDiVitaScreen from '../public/screen/alberi-di-vita-screen.webp';

/*
 * Questo file è volutamente indipendente dalla lingua: contiene solo struttura,
 * asset e link. Ogni stringa che il lettore vede vive in messages/{it,en}.ts,
 * indicizzata dagli slug qui sotto: il che significa che aggiungere un progetto
 * qui è un errore di compilazione finché non sono scritte entrambe le
 * traduzioni.
 */

export type ProjectSlug = 'alberi-di-vita' | 'score-board' | 'pocket-garage';

export type ProjectKind = 'fullstack' | 'frontend';

export type SkillGroup = 'frontend' | 'backend' | 'data' | 'mobile';

export interface Project {
    slug: ProjectSlug;
    /** nome proprio: non si traduce mai */
    title: string;
    tech: string[];
    kind: ProjectKind;
    link?: string;
    github?: string;
    screen?: StaticImageData;
}

export interface Skill {
    name: string;
    icon: StaticImageData;
    group: SkillGroup;
    /** sostituisce l'`icon` chiara quando il tema risolto è scuro */
    iconDark?: StaticImageData;
}

export const skills: Skill[] = [
    { name: 'React', icon: reactIcon, group: 'frontend' },
    { name: 'Next.js', icon: nextIcon, group: 'frontend' },
    { name: 'TypeScript', icon: typescriptIcon, group: 'frontend' },
    { name: 'JavaScript', icon: javascriptIcon, group: 'frontend' },
    { name: 'Tailwind', icon: tailwindIcon, group: 'frontend' },
    { name: 'Node.js', icon: nodeIcon, group: 'backend' },
    { name: 'Express', icon: expressLightIcon, iconDark: expressDarkIcon, group: 'backend' },
    { name: 'Laravel', icon: laravelIcon, group: 'backend' },
    { name: 'PHP', icon: phpLightIcon, iconDark: phpDarkIcon, group: 'backend' },
    { name: 'PostgreSQL', icon: postgresqlIcon, group: 'data' },
    { name: 'MySQL', icon: mysqlIcon, group: 'data' },
    { name: 'Supabase', icon: supabaseIcon, group: 'data' },
    { name: 'Expo', icon: expoIcon, group: 'mobile' },
];

export const skillGroups: SkillGroup[] = ['frontend', 'backend', 'data', 'mobile'];

export const projects: Project[] = [
    {
        slug: 'alberi-di-vita',
        title: 'Alberi di Vita OdV',
        tech: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
        link: 'https://alberi-di-vita-odv.vercel.app/',
        kind: 'fullstack',
        screen: alberiDiVitaScreen,
    },
    {
        slug: 'score-board',
        title: 'Score Board',
        tech: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
        link: 'https://score-board-gray.vercel.app/',
        kind: 'fullstack',
        screen: scoreBoardScreen,
    },
    {
        slug: 'pocket-garage',
        title: 'Pocket Garage',
        tech: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
        link: 'https://pocket-garage.vercel.app/',
        kind: 'fullstack',
        screen: pocketGarageScreen,
    },
];
