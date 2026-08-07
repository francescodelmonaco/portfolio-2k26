import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import WorkSection from "@/components/work-section";
import StackSection from "@/components/stack-section";
import ContactSection from "@/components/contact-section";
import Reveal from "@/components/reveal";
import { projects } from "@/lib/data";
import { htmlLang, isLocale, defaultLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { site, siteUrl } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const active = isLocale(locale) ? locale : defaultLocale;
    const m = getMessages(active);

    const personId = `${siteUrl}/#person`;

    /*
     * Un solo @graph invece di cinque blocchi <script> separati, con riferimenti
     * incrociati via @id: ogni CreativeWork punta al nodo Person invece di
     * ridichiararlo.
     */
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": personId,
                name: site.author,
                jobTitle: m.hero.role,
                url: `${siteUrl}/${active}`,
                image: `${siteUrl}/img/foto-profilo.webp`,
                email: site.email,
                sameAs: [site.github, site.linkedin],
                address: {
                    "@type": "PostalAddress",
                    addressLocality: site.locality,
                    addressCountry: site.country,
                },
                knowsAbout: [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "Tailwind CSS",
                    "Node.js",
                    "Express",
                    "Laravel",
                    "PHP",
                    "PostgreSQL",
                    "MySQL",
                    "Supabase",
                ],
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: m.meta.siteName,
                url: `${siteUrl}/${active}`,
                description: m.meta.description,
                inLanguage: htmlLang[active],
                author: { "@id": personId },
            },
            ...projects.map((project) => ({
                "@type": "CreativeWork",
                name: project.title,
                description: m.work.items[project.slug].description,
                url: project.link ?? project.github,
                author: { "@id": personId },
                keywords: project.tech.join(", "),
                inLanguage: htmlLang[active],
            })),
        ],
    };

    return (
        <main id="main">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <HeroSection copy={m.hero} />

            <Reveal>
                <ServicesSection copy={m.services} />
            </Reveal>
            <Reveal>
                <WorkSection copy={m.work} />
            </Reveal>
            <Reveal>
                <StackSection copy={m.stack} />
            </Reveal>
            <Reveal>
                <ContactSection copy={m.contact} />
            </Reveal>
        </main>
    );
}
