import Link from "next/link";
import React from "react";

const placeholderProjects = [
  {
    id: 1,
    title: "NowPlayr",
    description:
      "The beautiful, sleek, open-source music preview for macOS. Your music, at a glance.",
  },
  {
    id: 2,
    title: "Netwkr",
    description:
      "A powerful tool for managing and visualizing your network connections.",
  },
  {
    id: 3,
    title: "WUT",
    description:
      "An innovative platform for sharing and discovering new web technologies.",
  },
];

const ProjectsSection = () => {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide">Side Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {placeholderProjects.map((project) => (
          <Link
            href={`/${project.title}`}
            target="_blank"
            key={project.id}
            className="flex-1 flex flex-col gap-1 p-2.5 text-sm border border-cozy-950 hover:bg-cozy-950 transition-colors duration-300"
          >
            <h3 className="font-bold text-cozy-100">{project.title}</h3>
            <p className="text-xs text-cozy-400">{project.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
