import Image from "next/image";
import Silk from "../components/Silk";
import Card from "../components/ui/card";
import InfiniteCarousel from "../components/ui/infinite-carousel";
import { skills } from "../lib/data";

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
        <main className="flex min-h-dvh w-full p-20 justify-between gap-5">
          {/* left column */}
          <section className="flex flex-col justify-between w-1/2 min-h-full">
            {/* about */}
            <div className="flex flex-col gap-1 h-1/2">
              <span className="text-xl font-bold">about</span>

              <Card>
                <span>Francesco</span>
              </Card>
            </div>

            {/* skills */}
            <div className="flex flex-col gap-1 h-1/7">
              <span className="text-xl font-bold">skills</span>

              <Card className="px-0">
                <InfiniteCarousel speed={20}>
                  {skills.map((skill, id) => (
                    <div
                      key={id}
                      className="flex flex-col items-center gap-2 min-w-[80px] self-center"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={60}
                        height={60}
                      />
                      <span className="text-xs text-center font-sans">{skill.name}</span>
                    </div>
                  ))}
                </InfiniteCarousel>
              </Card>
            </div>

            {/* contacts */}
            <div className="flex flex-col gap-1 h-1/3">
              <span className="text-xl font-bold">contacts</span>

              <Card>
                <span>Francesco</span>
              </Card>
            </div>
          </section>

          {/* right column */}
          <section className="flex flex-col justify-between gap-5 w-1/2 min-h-full">
            {/* projects */}
            <div className="flex flex-col gap-1 h-full">
              <span className="text-xl font-bold">projects</span>

              <Card>
                <span>Francesco</span>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
