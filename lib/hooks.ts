import { useMemo, useCallback, useRef } from 'react';
import { skills, projects } from './data';

/**
 * Hook ottimizzato per skills con memoizzazione
 * Previene re-render inutili quando le props restano uguali
 */
export const useOptimizedSkills = () => {
    return useMemo(() => skills, []);
};

/**
 * Hook ottimizzato per projects con memoizzazione
 * Previene re-render inutili quando le props restano uguali
 */
export const useOptimizedProjects = () => {
    return useMemo(() => projects, []);
};

/**
 * Hook per generare e memoizzare gli schemi JSON-LD dei progetti
 * Riduce il numero di stringificarioni necessarie
 */
export const useProjectSchemas = (projectList = projects) => {
    return useMemo(() =>
        projectList.map((project) => ({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "url": project.link || project.github,
            "author": {
                "@type": "Person",
                "name": "Francesco Delmonaco"
            },
            "keywords": project.tech.join(", "),
            "programmingLanguage": project.tech,
            "applicationCategory": "WebApplication"
        })),
        [projectList]
    );
};

/**
 * Hook per generare i contatti con memoizzazione
 */
export const useContactsData = () => {
    return useMemo(() => [
        {
            link: "https://github.com/francescodelmonaco",
            label: "GitHub"
        },
        {
            link: "https://linkedin.com/in/francescodelmonaco",
            label: "LinkedIn"
        },
        {
            link: "/documents/cv-francesco-delmonaco.pdf",
            label: "CV"
        },
        {
            link: "mailto:francescodelmonaco1999@gmail.com",
            label: "Email"
        }
    ], []);
};

/**
 * Hook per debounce con useCallback
 * Utile per ottimizzare event handlers frequenti
 */
export const useDebounce = (callback: (...args: any[]) => void, delay: number = 300) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
};
