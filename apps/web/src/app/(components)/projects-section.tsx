import Link from "next/link";
import React from "react";

const projects = [
  {
    id: 1,
    title: "NowPlayr",
    href: "/NowPlayr",
    description:
      "The beautiful, sleek, open-source music preview for macOS. Your music, at a glance.",
  },
  {
    id: 2,
    title: "CozyUtils",
    href: "/CozyUtils",
    description:
      "A small, cross-platform CLI for asset automation and Git message workflows.",
  },
  {
    id: 3,
    title: "CozyCode",
    href: "/CozyCode",
    description:
      "A desktop-first, provider-agnostic coding agent with a shared TypeScript core and terminal UI.",
  },
  {
    id: 4,
    title: "Cozyplay",
    href: "/Cozyplay",
    description:
      "Turn Macs on the same local network into one synchronized speaker system.",
  },
];

const ProjectsSection = () => {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide font-semibold">
        Side Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {projects.map((project) => (
          <Link
            href={project.href}
            key={project.id}
            className="relative flex-1 flex flex-col group gap-1 p-2.5 text-sm border border-cozy-950 hover:bg-cozy-950 transition-colors duration-300"
          >
            <h3 className="font-medium text-cozy-100">{project.title}</h3>
            <p className="text-xs text-cozy-400">{project.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
