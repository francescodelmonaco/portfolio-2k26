// components
import Silk from "../components/Silk";

//sections
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ContactsSection from "@/components/contacts-section";
import ProjectsSection from "@/components/projects-section";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Francesco Delmonaco",
    "jobTitle": "Full Stack Web Developer",
    "url": "https://francescodelmonaco.dev",
    "sameAs": [
      "https://github.com/francescodelmonaco",
      "https://linkedin.com/in/francescodelmonaco"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brescia",
      "addressCountry": "IT"
    },
    "email": "francescodelmonaco1999@gmail.com",
    "knowsAbout": [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MySQL",
      "PostgreSQL",
      "Supabase"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Francesco Delmonaco Portfolio",
    "url": "https://francescodelmonaco.dev",
    "description": "Portfolio personale di Francesco Delmonaco, Full Stack Web Developer specializzato in React, Next.js e tecnologie web moderne",
    "author": {
      "@type": "Person",
      "name": "Francesco Delmonaco"
    },
    "inLanguage": "it-IT"
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* wallpaper */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={1}
          color="#050647"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="flex min-h-screen lg:h-dvh items-center justify-center text-(--white) font-sans">
        <main className="flex flex-col lg:flex-row min-h-screen lg:h-dvh w-full p-5 lg:p-20 justify-between gap-5">
          {/* left column */}
          <section className="flex flex-col justify-between w-full lg:w-1/2 min-h-full gap-5 sm:gap-10">
            <AboutSection />
            <SkillsSection />
            <ContactsSection />
          </section>

          {/* right column */}
          <section className="flex flex-col justify-between w-full lg:w-1/2 min-h-full">
            <ProjectsSection />
          </section>
        </main>
      </div>
    </div>
  );
}
