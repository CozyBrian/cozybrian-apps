import Link from "next/link";
import React from "react";

const placeholderProjects = [
  {
    id: 1,
    title: "NowPlayr",
    comingsoon: false,
    description:
      "The beautiful, sleek, open-source music preview for macOS. Your music, at a glance.",
  },
  {
    id: 2,
    title: "CozyUtils",
    comingsoon: false,
    description:
      "A small, cross-platform CLI for asset automation and Git message workflows.",
  },
  {
    id: 3,
    title: "Netwkr",
    comingsoon: true,
    description:
      "A tool for keeping track of your network data usage, with a focus on simplicity and ease of use.",
  },
];

const ProjectsSection = () => {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide font-semibold">
        Side Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {placeholderProjects.map((project) => {
          const El = project.comingsoon ? "div" : Link;
          return (
            <El
              href={`/${project.title}`}
              key={project.id}
              className="relative flex-1 flex flex-col group gap-1 p-2.5 text-sm border border-cozy-950 hover:bg-cozy-950 transition-colors duration-300"
            >
              {project.comingsoon && (
                <span className="absolute top-2 right-2 text-xs text-cozy-50/60 group-hover:text-cozy-50 hover:animate-pulse duration-300">
                  Coming Soon
                </span>
              )}
              <h3 className="font-medium text-cozy-100">{project.title}</h3>
              <p className="text-xs text-cozy-400">{project.description}</p>
            </El>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
