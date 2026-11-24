import Image from "next/image";
import React, { ViewTransition } from "react";

import {
  GhanaCoatOfArms,
  PassportCourierPickup,
  PassportCourierPickupThumb,
  PassportDashboardOverview,
  PassportDashboardOverviewThumb,
} from "@/assets/images/works/ghana-passport";
import ImageViewer, {
  type ViewerImage,
} from "@/components/image-viewer/image-viewer";
import ViewerTrigger from "@/components/image-viewer/viewer-trigger";

import type { Metadata } from "next";

const title = "Passport Tracking System for Ghana";
const description =
  "A case study of Ghana's Passport Tracking System: the web portal and mobile app I led development of, tracking every passport from printing to delivery.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Brian Newton",
    "CozyBrian",
    "Passport Tracking System",
    "Ghana",
    "Ministry of Foreign Affairs",
    "Case study",
    "Web portal",
    "Mobile app",
  ],
  alternates: {
    canonical: "/works/ghana-passport-tracking",
  },
  openGraph: {
    title: `${title} | Brian Newton`,
    description,
    url: "https://www.cozybrian.dev/works/ghana-passport-tracking",
    siteName: "Brian Newton",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Brian Newton`,
    description,
  },
};

const screenshots: ViewerImage[] = [
  {
    id: "dashboard-overview",
    src: PassportDashboardOverview,
    thumb: PassportDashboardOverviewThumb,
    alt: "Overview dashboard showing pickup, delivery and SLA metrics",
    title: "Overview dashboard",
    caption: "Pickup, delivery and SLA metrics across couriers and regions.",
  },
  {
    id: "courier-pickup",
    src: PassportCourierPickup,
    thumb: PassportCourierPickupThumb,
    alt: "Web portal sign-in screen beside the pending courier pickup view",
    title: "Sign-in and pending courier pickup",
    caption:
      "The web portal's sign-in screen beside the pending courier pickup view.",
  },
];

const Page = () => {
  return (
    <ViewTransition>
      <main className="flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 min-h-screen flex-col gap-3 mx-auto mt-[60px] md:mt-[120px]">
        <div className="flex flex-col gap-1 pt-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
            Case study
          </p>
          <ViewTransition name="passport-title">
            <h1 className="font-bold text-3xl text-cozy-50">{title}</h1>
          </ViewTransition>
        </div>
        <div className="relative flex w-full h-[220px] md:h-auto md:aspect-[880/282] items-center justify-center overflow-hidden bg-cozy-950">
          <div
            aria-hidden="true"
            className="absolute size-[620px] rounded-full border border-cozy-900"
          />
          <div
            aria-hidden="true"
            className="absolute size-[430px] rounded-full border border-cozy-800/70"
          />
          <div
            aria-hidden="true"
            className="absolute size-[260px] rounded-full border border-cozy-700/60"
          />
          <div className="relative size-28 md:size-36 rounded-full bg-cozy-50 p-4 md:p-5">
            <Image
              src={GhanaCoatOfArms}
              alt="Coat of arms of Ghana"
              className="w-full h-full object-contain"
              unoptimized
              priority
            />
          </div>
        </div>
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
            <ViewerTrigger
              item="dashboard-overview"
              label="View larger: Overview dashboard"
              className="flex w-full h-full min-h-[150px] items-center justify-center bg-cozy-950"
            >
              <Image
                src={PassportDashboardOverviewThumb}
                alt="Overview dashboard showing pickup, delivery and SLA metrics"
                unoptimized
                className="w-full h-auto"
              />
            </ViewerTrigger>
          </div>
        </section>
        <section className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold">Initial Phase</h2>
          <p>
            This phase consisted of several internal meetings, and external
            meetings with the parties involved, to work out exactly what was
            expected of the system. It was at this stage that we discussed and
            settled on the technologies and architecture of the system, and
            development started shortly after.
          </p>
          <p>
            My team and I took a very hands-on approach. We left the comfort of
            our workstations at the office and went on site to courier offices
            and Ministry of Foreign Affairs offices to observe the primary users
            of the system and take their feedback. It was a very interesting
            experience: we were implementing features and fixing bugs on the fly
            as our users requested them. By observing our users, we could
            identify pain points we might have glossed over and address them
            immediately.
          </p>
        </section>
        <section className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold">My Contributions</h2>
          <p>
            I led the development of both the web portal and the mobile app for
            the Passport Tracking System. These platforms serve everyone
            involved, from applicants at the entry point, through delivery
            agents and administrative personnel, all the way to the Minister of
            Foreign Affairs.
          </p>
          <div className="flex flex-col-reverse md:grid md:grid-cols-2  gap-5">
            <div>
              <p>A brief overview of what I built:</p>
              <ul className="list-disc list-inside pl-2.5 pb-2.5 space-y-1 tracking-wide">
                {[
                  "A dashboard providing insights, metrics, and other operational tools for managing passports throughout their lifecycle, from issuance to delivery.",
                  "A secure admin panel for the Ministry to monitor overall system activity, generate reports, and view system metrics.",
                  "A mobile app that supports various functions across courier and ministry offices.",
                ].map((item, index) => (
                  <li key={index} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ViewerTrigger
              item="courier-pickup"
              label="View larger: Sign-in and pending courier pickup"
              className="flex w-full h-full min-h-[150px] items-center justify-center bg-cozy-950"
            >
              <Image
                src={PassportCourierPickupThumb}
                alt="Web portal sign-in screen beside the pending courier pickup view"
                unoptimized
                className="w-full h-auto"
              />
            </ViewerTrigger>
          </div>
        </section>
        <section className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold">Where It Stands</h2>
          <p>
            The Passport Tracking System is live and delivering on what it
            promised: passports are tracked from printing through to delivery. I
            have since moved on from the project, and it continues to run today.
          </p>
          <p>
            What stayed with me most is the time we spent on site. Sitting with
            the people who used the system every day, and fixing things as they
            ran into them, shaped it in ways that planning alone would not have.
          </p>
        </section>
        <ImageViewer items={screenshots} context="Passport Tracking System" />
      </main>
    </ViewTransition>
  );
};

export default Page;
