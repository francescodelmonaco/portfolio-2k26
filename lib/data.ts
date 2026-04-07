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

// projects images
import scoreBoardScreen from '../public/screen/score-board-screen.png';
import pocketGarageScreen from '../public/screen/pocket-garage-screen.png';

export const skills: { name: string, icon: string }[] = [
    { name: 'React', icon: reactIcon },
    { name: 'Next.js', icon: nextIcon },
    { name: 'JavaScript', icon: javascriptIcon },
    { name: 'TypeScript', icon: typescriptIcon },
    { name: 'Tailwind', icon: tailwindIcon },
    { name: 'Node.js', icon: nodeIcon },
    { name: 'Express', icon: expressIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'PostgreSQL', icon: postgresqlIcon },
    { name: 'Supabase', icon: supabaseIcon },
];

export const projects = [
    {
        title: 'Alberi di Vita OdV',
        description: 'Ristrutturazione completa del sito vetrina per l\'organizzazione non profit, focalizzata sulla modernizzazione dell\'immagine web e sulla chiarezza informativa. Sviluppo frontend fully responsive (mobile-first) con deploy ottimizzato su Vercel.',
        tech: ['Next.js', 'Tailwind'],
        link: 'https://alberi-di-vita-odv.vercel.app/',
        type: 'Frontend'
    },
    {
        title: 'Score Board',
        description: 'PWA completa per la gestione di statistiche, giocatori e flussi di cassa di squadre sportive amatoriali.',
        tech: ['Next.js', 'Tailwind', 'Supabase'],
        link: 'https://score-board-gray.vercel.app/',
        type: 'Frontend + Backend',
        // screen: scoreBoardScreen
    },
    {
        title: 'Pocket Garage',
        description: 'Gestionale completo per il monitoraggio di veicoli: scadenze, manutenzioni, rifornimenti, assicurazioni e bolli.',
        tech: ['Next.js', 'Tailwind', 'Supabase', 'Shadcn'],
        link: 'https://pocket-garage.vercel.app/',
        type: 'Frontend + Backend',
        // screen: pocketGarageScreen
    },
    {
        title: 'Convenzioni Poliambulanza',
        description: 'PWA sviluppata per semplificare la ricerca delle attività convenzionate con l\'Istituto Ospedaliero Poliambulanza di Brescia. Applicazione web progressiva ottimizzata per mobile.',
        tech: ['React', 'Tailwind', 'Supabase'],
        link: 'https://pa-conventions.vercel.app/',
        type: 'Frontend + Backend'
    },
    {
        title: 'Kick Shop',
        description: 'E-commerce completo per la vendita di prodotti calcistici con gestione carrello/preferiti, visualizzazione in griglia o lista e simulazione di pagamento con Stripe.',
        tech: ['React', 'Node.js', 'Express', 'MySQL'],
        github: 'https://github.com/francescodelmonaco/kick-shop',
        type: 'Frontend + Backend'
    },
];