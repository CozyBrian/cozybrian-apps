import ProjectsSection from "./(components)/projects-section";
import WorkSection from "./(components)/work-section";
import WritingsSection from "./(components)/writings-section";

export default function Home() {
  return (
    <main className="flex w-full lg:w-[880px] px-4 lg:px-0 lg:min-h-[calc(100vh-(120px+137px+80px))] flex-col items-center gap-12 mx-auto mt-[60px] md:mt-[120px]">
      <section className="w-full flex flex-col gap-8 tracking-wide pt-10 pb-10 lg:pt-3.5 lg:pb-0">
        <div className="flex flex-col items-start">
          <h1 className="text-[32px] font-bold text-cozy-50 leading-[44px]">
            Brian Newton
          </h1>
          <p className="text-xs text-cozy-400 font-montserrat tracking-wider">
            Software Engineer, Earth.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-[480px]">
          <p className="font-montserrat font-medium text-sm text-cozy-200 tracking-wide">
            I write software for the web and mobile, build tools that solve
            real-world problems, and enjoy exploring ideas that sit at the edge
            of creativity and code.{" "}
          </p>
          <div className="flex flex-row gap-2.5">
            {[
              { label: "GitHub", href: "https://github.com/CozyBrian" },
              { label: "X", href: "https://x.com/cozybrian_" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/brian-newton-b6b8231b8",
              },
              {
                label: "Resume",
                href: "https://drive.google.com/file/d/1ZPDHpEuS3aX2O650Inn8gVU-IyEZR49-/view?usp=sharing",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                className="text-xs font-montserrat text-cozy-600 hover:text-cozy-400 transition-colors"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <WorkSection />
      <ProjectsSection />
      <WritingsSection />
    </main>
  );
}
