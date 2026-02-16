import React, { ViewTransition } from "react";

import WritingsSection from "./(components)/writings-section";

export default function Home() {
  return (
    <ViewTransition>
      <main className="flex w-full lg:w-[880px] px-4 lg:px-0 min-h-[calc(100vh-(120px+137px+80px))] flex-col items-center gap-12 mx-auto mt-[60px] md:mt-[120px]">
        <section className="w-full flex flex-col gap-3 tracking-wide pt-10 lg:pt-3.5 lg:pb-0">
          <h1 className="text-[32px] font-bold text-cozy-50 leading-[44px]">
            My Blog
          </h1>
          <div className="flex flex-col gap-4 w-full lg:w-[480px]">
            <p className="font-montserrat font-medium text-sm text-cozy-200 tracking-wide">
              Thoughts, experiments, and lessons from my journey. Expect deep
              dives into code, design, and the occasional side project.
            </p>
          </div>
        </section>
        <WritingsSection />
      </main>
    </ViewTransition>
  );
}
