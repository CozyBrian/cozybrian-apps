import React from "react";

export const metadata = {
  title: "Ghana Passport Tracking",
  description: "A showcase of my work and projects.",
};

const Page = () => {
  return (
    <main className="flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 min-h-screen flex-col gap-3 mx-auto mt-[60px] md:mt-[120px]">
      <h1 className="font-bold text-3xl text-cozy-50 pt-2">
        Passport Tracking System for Ghana
      </h1>
      <div className="w-full h-[220px] md:h-auto md:aspect-[880/282] bg-cozy-950"></div>
      <section>
        <h2 className="text-lg font-semibold">Introduction</h2>
        <p>
          The Passport Tracking System for Ghana is an integrated, end-to-end
          solution designed to ensure secure, efficient, and transparent
          delivery of passports to citizens across the country.
        </p>
      </section>
      <section className="flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold">What were the objectives?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ul className="list-disc list-inside pl-2.5 py-2.5 space-y-1 tracking-wide">
            {[
              "Guarantee 100% chain-of-custody from printing to delivery",
              "Eliminate loss, fraud, and data leakage",
              "Provide real-time tracking for applicants and couriers",
              "Improve delivery speed, accuracy, and accountability",
              "Empower the Ministry of Foreign Affairs with full oversight and data-driven governance",
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
          This consisted of several internal meetings and external meetings with
          the parties involved to figure out what exactly was to be expected of
          the system. It was at this stage where we discussed and settled on the
          technologies and architecture of the system and then development
          started shortly after. My team and I took a very hands on approach
          which involved leaving the comfort of our workstations at the office
          to go on site to courier offices and MFA offices to observe and take
          feed back from our primary users of the system. this was a very
          interesting experience where we were implementing features and fixing
          bugs on the fly as our users requesting them. by observing our users
          we could identify pain-points that we my have glossed over and then
          immediately address them.
        </p>
      </section>
      <section className="flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold">My Contributions</h2>
        <p>
          I led the development of both the web portal and the mobile app for
          the Passport Tracking System. These platforms served from the entry
          point that is the applicants all the way through delivery agents, and
          administrative personnel to the Minister of Foreign Affairs.
        </p>
        <div className="flex flex-col-reverse md:grid md:grid-cols-2  gap-5">
          <div>
            <p>Brief overview of what I built include:</p>
            <ul className="list-disc list-inside pl-2.5 pb-2.5 space-y-1 tracking-wide">
              {[
                "A dashboard for providing insights, metrics, and various other operational tools for managing passports throughout its lifecycle from issuance to delivery.",
                "A secure admin panel for the Ministry to monitor overall system activity, generate reports, and view system metrics.",
                "A mobile app for facilitating various functions across courier and ministry offices.",
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
    </main>
  );
};

export default Page;
