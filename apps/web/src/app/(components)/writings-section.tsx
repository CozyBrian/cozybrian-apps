"use client";

import { AnimatedBackground } from "@cozy/ui";
import Link from "next/link";
import React from "react";

const placeholderWritings = [
  {
    id: 1,
    title: "Async Generators in JavaScript: Taming the Data Flood",
    description:
      "A deep dive into using async generators for handling large data streams efficiently",
    date: "Aug 05",
  },
  {
    id: 2,
    title: "Understanding React's Concurrent Mode",
    description:
      "Exploring the benefits and challenges of React's concurrent rendering capabilities",
    date: "Jul 20",
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js",
    description:
      "Best practices for creating robust and scalable APIs using Node.js and Express",
    date: "Jun 15",
  },
];

const WritingsSection = () => {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide font-semibold">Writings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-1.5">
          <AnimatedBackground enableHover className="bg-cozy-950">
            {placeholderWritings.map((writing) => (
              <Link
                href={`/blog/${writing.id}`}
                key={writing.id}
                data-id={`card-${writing.id}`}
                className="w-full flex text-sm"
              >
                <div className="flex flex-1 flex-row py-2.5 px-2 gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="font-medium text-cozy-100">
                      {writing.title}
                    </h3>
                    <p className="text-xs text-cozy-400">
                      {writing.description}
                    </p>
                  </div>
                  <small className="text-xs font-bold text-cozy-400/80 font-montserrat">
                    {writing.date}
                  </small>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </div>
      <a
        href={process.env.NEXT_PUBLIC_BLOG_URL || "http://localhost:3001"}
        className="text-sm font-medium text-cozy-300 hover:text-cozy-100 transition-colors"
      >
        View more
      </a>
    </section>
  );
};

export default WritingsSection;
