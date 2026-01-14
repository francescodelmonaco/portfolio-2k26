import { skills, projects } from "../lib/data";

import Image from "next/image";
import Link from "next/link";

// components
import Silk from "../components/Silk";
import Card from "../components/ui/card";
import InfiniteCarousel from "../components/ui/infinite-carousel";
import ContactCard from "@/components/ui/contact-card";

// images
import ProfileImage from "../public/img/foto-profilo.png";

import { Github, Linkedin, FileUser, Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 z-[-1]">
        <Silk
          speed={5}
          scale={1}
          color="#050647"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="flex min-h-screen items-center justify-center text-(--white) font-sans">
        <main className="flex h-dvh w-full p-20 justify-between gap-5">
          {/* left column */}
          <section className="flex flex-col justify-between gap-3 w-1/2 min-h-full">
            {/* about */}
            <div className="flex flex-col gap-1 h-1/2">
              <span className="text-xl font-bold">about</span>

              <Card className="flex items-center justify-between gap-2">
                <Image
                  src={ProfileImage}
                  alt="Foto profilo di Francesco Delmonaco"
                  width={100}
                  height={100}
                  className="w-1/2 rounded-lg h-full object-cover"
                />

                <div className="flex flex-col justify-center gap-10 text-center w-1/2">
                  <span className="text-4xl font-bold">Francesco Delmonaco</span>

                  <div className="flex flex-col gap-1">
                    <p className="text-gray-400">Full Stack Web Developer</p>
                    <p className="text-gray-400">Based in Brescia 🇮🇹</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* skills */}
            <div className="flex flex-col gap-1 h-1/4">
              <span className="text-xl font-bold">skills</span>

              <Card className="px-0">
                <InfiniteCarousel speed={20}>
                  {
                    skills.map((skill, id) => (
                      <div
                        key={id}
                        className="min-h-full"
                      >
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={80}
                          height={80}
                          className="h-full"
                        />
                      </div>
                    ))
                  }
                </InfiniteCarousel>
              </Card>
            </div>

            {/* contacts */}
            <div className="flex flex-col gap-1 h-1/4">
              <span className="text-xl font-bold">contacts</span>

              <Card className="flex items-center justify-between gap-3">
                <ContactCard 
                link="https://github.com/francescodelmonaco" 
                children={<Github className="w-10 h-10" />} 
                />
                <ContactCard 
                link="https://linkedin.com/in/francescodelmonaco" 
                children={<Linkedin className="w-10 h-10" />} 
                />
                <ContactCard 
                link="/documents/cv-francesco-delmonaco.pdf" 
                children={<FileUser className="w-10 h-10" />} 
                />
                <ContactCard 
                link="mailto:francescodelmonaco1999@gmail.com" 
                children={<Mail className="w-10 h-10" />} 
                />
              </Card>
            </div>
          </section>

          {/* right column */}
          <section className="flex flex-col justify-between gap-5 w-1/2 min-h-full">
            {/* projects */}
            <div className="flex flex-col gap-1 flex-1 min-h-0">
              <span className="text-xl font-bold">projects</span>

              <Card className="flex flex-col items-center justify-between gap-3 overflow-y-auto h-full">
                  {
                    projects.map((project, id) => (
                        <Link
                          href="https://github.com/francescodelmonaco"
                          target="_blank"
                          className="bg-(--white)/10 hover:bg-(--white)/20 transition-all duration-300 p-5 rounded-lg w-full cursor-pointer hover:scale-102 hover:shadow-lg flex flex-col items-center justify-center"
                          key={id}
                        >
                      <div className="flex justify-between gap-5">
                        {project.screen && (
                          <Image
                            src={project.screen}
                            alt={`${project.title} screenshot`}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover w-1/3 h-50"
                          />
                        )}

                        <div className="w-2/3 flex flex-col justify-between">
                        <span className="text-2xl font-bold mb-2">{project.title}</span>

                        <p className="text-gray-400 mb-2">{project.description}</p>
                        
                        <div className="flex gap-2 mb-2">
                          {project.tech.map((tech, index) => (
                            <span
                            key={index}
                            className="bg-(--white)/10 px-2 py-1 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          </div>
                        </div>
                      </div>
                </Link>
                    ))
                  }
              </Card>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
