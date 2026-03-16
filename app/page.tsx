// components
import Silk from "../components/Silk";
import Footer from "@/components/footer";

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
          speed={4}
          scale={1}
          color="#030215"
          noiseIntensity={1.2}
          rotation={0}
        />
      </div>
      {/* grain overlay for texture */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }}
      />

      <div className="flex flex-col min-h-screen lg:h-dvh items-center justify-between text-(--white) font-sans">
        <main className="flex flex-col lg:flex-row w-full flex-1 justify-between gap-4 p-4 lg:p-8 overflow-auto pb-4">
          {/* left column */}
          <section className="flex flex-col w-full lg:w-1/2 min-h-full lg:h-full gap-4">
            <AboutSection className="lg:grow-2" />
            <SkillsSection className="lg:flex-1 lg:min-h-0" />
            <ContactsSection className="lg:flex-1 lg:min-h-0" />
          </section>

          {/* right column */}
          <section className="flex flex-col w-full lg:w-1/2 min-h-full">
            <ProjectsSection />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
