import React, { unstable_ViewTransition as ViewTransition } from "react";

export const metadata = {
  title: "Ghana Passport Tracking",
  description: "A showcase of my work and projects.",
};

const Page = () => {
  return (
    <ViewTransition>
      <main className="relative flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 min-h-screen flex-col gap-3 mx-auto mt-[60px] md:mt-[120px]">
        <div className="absolute top-16 -right-12 h-full">
          <div className="hidden lg:flex flex-col gap-[14px] w-6 h-20 sticky top-24">
            <div className="h-1 w-full bg-cozy-800 rounded-full"></div>
            <div className="h-1 w-full bg-cozy-950 rounded-full"></div>
            <div className="h-1 w-full bg-cozy-950 rounded-full"></div>
            <div className="h-1 w-full bg-cozy-950 rounded-full"></div>
            <div className="h-1 w-full bg-cozy-950 rounded-full"></div>
          </div>
        </div>
        <ViewTransition name="passport-title">
          <h1 className="font-bold text-2xl lg:text-3xl text-cozy-50 pt-2">
            Passport Tracking System for Ghana
          </h1>
        </ViewTransition>
        <div className="w-full aspect-[880/282] bg-cozy-950"></div>
        <section>
          <h2 className="text-lg font-semibold">Introduction</h2>
          <p>
            The Passport Tracking System for Ghana is an integrated, end-to-end
            solution designed to ensure secure, efficient, and transparent
            delivery of passports to citizens across the country.
          </p>
        </section>
        <section className="relative flex flex-col gap-3">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
            <div className="flex items-center justify-center bg-cozy-950 border border-cozy-800 rounded-lg p-4">
              <p className="text-center text-cozy-50 max-w-[400px] px-4">
                I’m still confirming whether I can share the details of this
                section due to NDA restrictions — stay tuned!
              </p>
            </div>
          </div>
          <section className="relative flex flex-col gap-3 blur-2xl z-10">
            <section className="flex flex-col gap-1.5">
              <h2 className="text-lg font-semibold">
                What were the objectives?
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ul className="list-disc list-inside pl-2.5 py-2.5 space-y-1 tracking-wide">
                  {[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
                    "Lorem ipsum dolor sit amet, consectetur",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor wubba ",
                  ].map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex w-full h-full min-h-[150px] bg-cozy-950"></div>
              </div>
            </section>
            <section className="flex flex-col gap-1.5">
              <h2 className="text-lg font-semibold">Initial Phase</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error &quot;Kaishh...
                Seniormost DevTools user, I greet oo🙏🏾&quot; accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nih.
              </p>
            </section>
            <section className="flex flex-col gap-1.5">
              <h2 className="text-lg font-semibold">My Contributions</h2>
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <p>Brief overview of what I built include:</p>
                  <ul className="list-disc list-inside pl-2.5 pb-2.5 space-y-1 tracking-wide">
                    {[
                      "t laboriosam, nisi ut aliquid exea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nih.",
                      "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
                    ].map((item, index) => (
                      <li key={index} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full h-full min-h-[150px] bg-cozy-950"></div>
              </div>
            </section>
          </section>
        </section>
      </main>
    </ViewTransition>
  );
};

export default Page;
