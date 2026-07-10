import { Metadata } from "next";
import React, { ViewTransition } from "react";

export const metadata: Metadata = {
  title: "CozyCode",
  description:
    "A desktop-first, provider-agnostic coding agent with a shared TypeScript core and terminal UI.",
  keywords: [
    "Brian Newton",
    "CozyBrian",
    "CozyCode",
    "coding agent",
    "Electron",
    "TypeScript",
    "AI",
  ],
  openGraph: {
    title: "CozyCode | Brian Newton",
    description:
      "A desktop-first, provider-agnostic coding agent with a shared TypeScript core and terminal UI.",
    url: "https://www.cozybrian.dev/CozyCode",
    locale: "en_US",
    type: "website",
  },
};

export default function CozyCodePage() {
  return (
    <ViewTransition>
      <main className="flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 min-h-screen flex-col gap-10 mx-auto mt-[60px] md:mt-[120px] pb-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-cozy-500">
              A coding agent that works where you do.
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-cozy-50">
              CozyCode
            </h1>
          </div>
          <p className="text-sm md:text-base text-cozy-300 leading-7 max-w-[680px]">
            CozyCode is a desktop-first coding-agent harness with a shared,
            headless TypeScript core. It can read and edit files, search a
            codebase, and run shell commands while keeping risky actions behind
            a configurable permission gate.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/CozyBrian/cozycode"
              target="_blank"
              rel="noreferrer"
              className="bg-cozy-950 inline-flex items-center justify-center h-10 px-4 text-sm text-cozy-airBlue rounded-lg hover:text-cozy-300 hover:-translate-y-0.5 transition"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/CozyBrian/cozycode#develop"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-10 px-4 text-sm text-cozy-200 border border-cozy-900 rounded-lg hover:border-cozy-700 hover:text-cozy-50 transition"
            >
              Run locally
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "One Shared Core",
              description:
                "A UI-agnostic session engine emits typed events and approval requests, so the desktop app and TUI share the same agent behavior.",
            },
            {
              title: "Desktop & Terminal",
              description:
                "Use the Electron desktop app for a native workspace or the OpenCode-inspired Ink TUI directly from the terminal.",
            },
            {
              title: "Provider Agnostic",
              description:
                "Connect any OpenAI-compatible API, manage provider settings, and authenticate with supported OAuth flows.",
            },
            {
              title: "Intentional Permissions",
              description:
                "Control every tool with allow, ask, or deny rules, and approve individual actions once or for the active session.",
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
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-cozy-50">Architecture</h2>
          <div className="bg-cozy-950 border border-cozy-900 p-4">
            <pre className="text-xs text-cozy-200 leading-6 overflow-x-auto">
              <code>{`packages/protocol  Shared event, message, and config types
packages/core      Agent loop, tools, permissions, and sessions
apps/desktop       Electron app with a React renderer
apps/tui           Ink terminal UI using the core directly`}</code>
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-cozy-50">Quick start</h2>
          <div className="bg-cozy-950 border border-cozy-900 p-4">
            <pre className="text-xs text-cozy-200 leading-6 overflow-x-auto">
              <code>{`bun install
node apps/desktop/node_modules/electron/install.js
bun run dev

# Or run the terminal UI in a workspace
bun run tui path/to/repo`}</code>
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-cozy-50">Agent tools</h2>
          <p className="text-sm text-cozy-400 leading-6 max-w-[680px]">
            The agent has focused tools for reading, writing, and editing files,
            searching a project, and running shell commands. The tool loop is
            built on Vercel AI SDK and its model connection is configured from
            the app&apos;s provider settings.
          </p>
        </section>
      </main>
    </ViewTransition>
  );
}
