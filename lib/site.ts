/**
 * Fonte di verità unica per tutto ciò che riguarda identità e URL.
 * canonical, hreflang, sitemap, robots e le immagini OG leggono tutti da qui.
 */

export const siteUrl = "https://francescodelmonaco.com";

export const site = {
    url: siteUrl,
    author: "Francesco Delmonaco",
    firstName: "Francesco",
    lastName: "Delmonaco",
    email: "francescodelmonaco1999@gmail.com",
    locality: "Brescia",
    country: "IT",
    github: "https://github.com/francescodelmonaco",
    linkedin: "https://linkedin.com/in/francescodelmonaco",
    cv: "/documents/cv-francesco-delmonaco.pdf",
} as const;
