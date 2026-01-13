export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--white) text-(--black) font-sans">
      <main className="flex min-h-dvh w-full p-20 justify-between gap-5">
        {/* left column */}
        <section className="flex flex-col justify-between w-1/2 min-h-full">
          <div className="flex flex-col gap-1 h-1/2">
            <span className="text-xl font-bold">about</span>

            <div className="glass p-5 rounded-2xl h-full">
              <span>Francesco</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 h-1/7">
            <span className="text-xl font-bold">skills</span>

            <div className="glass p-5 rounded-2xl h-full">
              <span>Francesco</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 h-1/3">
            <span className="text-xl font-bold">contacts</span>

            <div className="glass p-5 rounded-2xl h-full">
              <span>Francesco</span>
            </div>
          </div>
        </section>

        {/* right column */}
        <section className="flex flex-col justify-between gap-5 w-1/2 min-h-full">
          <div className="flex flex-col gap-1 h-full">
            <span className="text-xl font-bold">projects</span>

            <div className="glass p-5 rounded-2xl h-full">
              <span>Francesco</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
