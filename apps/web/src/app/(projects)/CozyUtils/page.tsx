import { Metadata } from "next";
import React, { ViewTransition } from "react";

export const metadata: Metadata = {
  title: "CozyUtils",
  description:
    "A small, cross-platform CLI focused on asset automation and Git message workflows.",
  keywords: [
    "Brian Newton",
    "CozyBrian",
    "CozyUtils",
    "CLI",
    "Rust",
    "SVG",
    "Git",
  ],
  openGraph: {
    title: "CozyUtils | Brian Newton",
    description:
      "A small, cross-platform CLI focused on asset automation and Git message workflows.",
    url: "https://www.cozybrian.dev/CozyUtils",
    locale: "en_US",
    type: "website",
  },
};

export default function CozyUtilsPage() {
  return (
    <ViewTransition>
      <main className="flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 min-h-screen flex-col gap-10 mx-auto mt-[60px] md:mt-[120px] pb-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
              Small, cross-platform CLI for builders.
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-cozy-50">
              CozyUtils
            </h1>
          </div>
          <p className="text-sm md:text-base text-cozy-300 leading-7 max-w-[680px]">
            CozyUtils is a utility package designed to streamline the tedious
            and repetitive tasks I find myself doing on almost every project. It
            streamlines asset workflows and helps generate Git commit and PR
            messages.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/CozyBrian/cozyutils-rust"
              target="_blank"
              rel="noreferrer"
              className="bg-cozy-950 inline-flex items-center justify-center h-10 px-4 text-sm text-cozy-airBlue rounded-lg hover:text-cozy-300 hover:-translate-y-0.5 transition"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/CozyBrian/cozyutils-rust#build--install"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-10 px-4 text-sm text-cozy-200 border border-cozy-900 rounded-lg hover:border-cozy-700 hover:text-cozy-50 transition"
            >
              Install & Build
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            [
              {
                title: "SVG to TSX",
                description:
                  "Convert SVGs into React components, normalize attributes, and generate a clean export index.",
              },
              {
                title: "Image Export Index",
                description:
                  "Scan a directory and emit named exports for image assets in a single index file.",
              },
              {
                title: "Commit & PR Messages",
                description:
                  "Generate commit and PR messages from git diffs using Gemini models, with clipboard support.",
              },
              {
                title: "Cross-platform Builds",
                description:
                  "Target macOS (Intel/Apple Silicon), Linux, and Windows with size-focused release builds.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 p-4 border border-cozy-950 bg-cozy-980"
              >
                <h2 className="text-lg font-semibold text-cozy-50">
                  {item.title}
                </h2>
                <p className="text-sm text-cozy-400 leading-6">
                  {item.description}
                </p>
              </div>
            ))
          }
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-cozy-50">Quick install</h2>
          <div className="bg-cozy-950 border border-cozy-900 p-4">
            <pre className="text-xs text-cozy-200 leading-6 overflow-x-auto">
              <code>{`./install.sh

cargo build --release
# binary: target/release/cozyutils`}</code>
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-cozy-50">Usage</h2>
          <div className="bg-cozy-950 border border-cozy-900 p-4">
            <pre className="text-xs text-cozy-200 leading-6 overflow-x-auto">
              <code>{`./cozyutils -svg2tsx ./icons --dry-run
./cozyutils -img2export ./icons ./index.ts
./cozyutils -prmsg --base=origin/dev --clipboard`}</code>
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-cozy-50">Commands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "-svg2tsx <directory> [--ext=.svg] [--dry-run] [--force] [--no-move]",
              "-img2export <directory> <output_file> [--ext=.svg,.png] [--dry-run]",
              "-cmsg [--out=path] [--model=gemini-3-flash-preview] [--clipboard] [--clipboard-only] [--commit]",
              "-prmsg [--base=origin/dev] [--out=path] [--model=gemini-3-flash-preview] [--clipboard] [--clipboard-only] [--setup]",
            ].map((command) => (
              <div
                key={command}
                className="border border-cozy-950 p-3 text-xs text-cozy-300"
              >
                <code>{command}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-cozy-50">
            Gemini API key setup
          </h2>
          <p className="text-sm text-cozy-400 leading-6 max-w-[680px]">
            The PR and commit message commands read the API key from the
            `GEMINI_API_KEY` environment variable, or from
            `~/.cozyutils/config.json`. You can create the config with:
          </p>
          <div className="bg-cozy-950 border border-cozy-900 p-4">
            <pre className="text-xs text-cozy-200 leading-6 overflow-x-auto">
              <code>{`./cozyutils -prmsg --setup --key=YOUR_KEY`}</code>
            </pre>
          </div>
        </section>

      </main>
    </ViewTransition>
  );
}
