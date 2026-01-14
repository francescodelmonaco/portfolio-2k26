// components
import Silk from "../components/Silk";

//sections
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ContactsSection from "@/components/contacts-section";
import ProjectsSection from "@/components/projects-section";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
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
          <section className="flex flex-col justify-between w-full lg:w-1/2 min-h-full gap-5 lg:gap-0">
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
