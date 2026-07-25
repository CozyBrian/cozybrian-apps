import Image from "next/image";
import { ViewTransition } from "react";

import { CozyplayIcon } from "@/assets/images/products";

import type { Metadata } from "next";

const description =
  "Turn Macs on the same local network into one synchronized speaker system with Cozyplay.";

export const metadata: Metadata = {
  title: "Cozyplay",
  description,
  keywords: [
    "Brian Newton",
    "CozyBrian",
    "Cozyplay",
    "macOS",
    "multi-room audio",
    "synchronized audio",
    "SwiftUI",
    "Bonjour",
  ],
  alternates: {
    canonical: "/Cozyplay",
  },
  openGraph: {
    title: "Cozyplay | Brian Newton",
    description,
    url: "https://www.cozybrian.dev/Cozyplay",
    siteName: "Brian Newton",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cozyplay | Brian Newton",
    description,
  },
};

const features = [
  {
    title: "Every Mac, one timeline",
    description:
      "The host and every companion render against the same buffered clock, with subtle drift correction during long sessions.",
  },
  {
    title: "Nearby by default",
    description:
      "Bonjour finds parties on the local network automatically. Pick a host and join without addresses, accounts, or setup codes.",
  },
  {
    title: "Control every speaker",
    description:
      "Rename, mute, adjust volume, and fine-tune sync for each connected Mac from the host's speaker rack.",
  },
  {
    title: "Native and local",
    description:
      "Cozyplay is built in SwiftUI with Apple frameworks and has no cloud backend, helper drivers, or third-party runtime dependencies.",
  },
];

export default function CozyplayPage() {
  return (
    <ViewTransition>
      <main className="flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 min-h-screen flex-col gap-14 mx-auto mt-[60px] md:mt-[120px] pb-16">
        <section className="relative overflow-hidden border border-cozy-900 bg-cozy-980 px-5 py-8 md:px-10 md:py-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-cozy-900/70"
          />
          <div
            aria-hidden="true"
            className="absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-cozy-800/60"
          />

          <div className="relative grid items-center gap-10 md:grid-cols-[1fr_240px]">
            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
                  Native synchronized audio for macOS
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-cozy-50 md:text-5xl">
                  Cozyplay
                </h1>
                <p className="max-w-[580px] text-base leading-7 text-cozy-300 md:text-lg">
                  Turn the Macs around you into one speaker system. One Mac
                  hosts whatever it is playing, nearby Macs join, and Cozyplay
                  keeps every output on the same timeline.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#build-from-source"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-cozy-950 px-4 text-sm text-cozy-airBlue transition hover:-translate-y-0.5 hover:text-cozy-200"
                >
                  Build from source
                </a>
                <a
                  href="https://github.com/CozyBrian/cozyplay"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-cozy-900 px-4 text-sm text-cozy-200 transition hover:border-cozy-700 hover:text-cozy-50"
                >
                  View on GitHub
                </a>
              </div>

              <p className="text-xs text-cozy-500">
                Active development software for Apple silicon Macs running macOS
                14.4 or later.
              </p>
            </div>

            <div className="relative mx-auto flex h-52 w-52 items-center justify-center md:h-60 md:w-60">
              <Image
                src={CozyplayIcon}
                alt="Cozyplay app icon"
                priority
                className="relative h-full w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
              The signal path
            </p>
            <h2 className="text-2xl font-semibold text-cozy-50">
              From one Mac to the whole room
            </h2>
          </div>

          <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <div className="flex h-full flex-col gap-2 border border-cozy-950 bg-cozy-980 p-4">
              <span className="text-[11px] uppercase tracking-[0.18em] text-cozy-airBlue">
                01 / Host
              </span>
              <h3 className="font-medium text-cozy-100">Capture any audio</h3>
              <p className="text-xs leading-5 text-cozy-400">
                A Core Audio process tap captures the system output and places
                it on a shared delayed timeline.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="rotate-90 text-center text-cozy-600 md:rotate-0"
            >
              &rarr;
            </span>
            <div className="flex h-full flex-col gap-2 border border-cozy-950 bg-cozy-980 p-4">
              <span className="text-[11px] uppercase tracking-[0.18em] text-cozy-airBlue">
                02 / Network
              </span>
              <h3 className="font-medium text-cozy-100">Stream it locally</h3>
              <p className="text-xs leading-5 text-cozy-400">
                Timestamped audio travels directly over the local network. No
                account, internet connection, or cloud relay is involved.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="rotate-90 text-center text-cozy-600 md:rotate-0"
            >
              &rarr;
            </span>
            <div className="flex h-full flex-col gap-2 border border-cozy-950 bg-cozy-980 p-4">
              <span className="text-[11px] uppercase tracking-[0.18em] text-cozy-airBlue">
                03 / Speakers
              </span>
              <h3 className="font-medium text-cozy-100">Play in sync</h3>
              <p className="text-xs leading-5 text-cozy-400">
                Each Mac translates the host clock and renders its audio at the
                same target time.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col gap-2 border border-cozy-950 bg-cozy-980 p-4"
            >
              <h2 className="text-lg font-semibold text-cozy-50">
                {feature.title}
              </h2>
              <p className="text-sm leading-6 text-cozy-400">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3 border border-cozy-950 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
              Private by design
            </p>
            <h2 className="text-xl font-semibold text-cozy-50">
              Your audio stays in the room
            </h2>
            <p className="text-sm leading-6 text-cozy-400">
              Cozyplay communicates directly with Macs that join the advertised
              local party. It has no analytics, advertising, user accounts, or
              remote API, and it does not write captured audio to disk.
            </p>
          </div>

          <div className="flex flex-col gap-3 border border-cozy-950 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
              Built for the Mac
            </p>
            <h2 className="text-xl font-semibold text-cozy-50">
              A native hi-fi console
            </h2>
            <p className="text-sm leading-6 text-cozy-400">
              The SwiftUI interface uses a receiver-style rail, live level
              meter, and speaker rack, with native Liquid Glass on macOS 26 and
              system material on earlier supported versions.
            </p>
          </div>
        </section>

        <section
          id="build-from-source"
          className="scroll-mt-24 border border-cozy-900 bg-cozy-980 p-5 md:p-7"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
                Build from source
              </p>
              <h2 className="text-2xl font-semibold text-cozy-50">
                Try Cozyplay before the public release
              </h2>
              <p className="text-sm leading-6 text-cozy-400">
                You will need an Apple silicon Mac, macOS 14.4 or later, Xcode
                26, and XcodeGen. Select your development team in Xcode before
                running so macOS can retain the required audio-capture
                permission.
              </p>
              <a
                href="https://github.com/CozyBrian/cozyplay#build-and-run"
                target="_blank"
                rel="noreferrer"
                className="w-fit text-sm text-cozy-airBlue transition-colors hover:text-cozy-200"
              >
                Read the complete build guide &rarr;
              </a>
            </div>

            <pre className="overflow-x-auto border border-cozy-900 bg-cozy-950 p-4 text-xs leading-6 text-cozy-200">
              <code>{`brew install xcodegen
xcodegen generate
open cozyplay.xcodeproj`}</code>
            </pre>
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
