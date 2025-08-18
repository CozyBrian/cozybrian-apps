"use client";
import { cn } from "@cozy/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";

import { MDXHeader } from "@/types";

const TableOfContents = ({ data }: { data: MDXHeader[] }) => {
  const [isHover, setisHover] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!data.length) return;

    let ticking = false;
    const OFFSET = 100; // pixels

    const updateActiveHeader = () => {
      const y = window.scrollY + OFFSET;
      let current = data[0]?.id ?? null;

      for (let i = data.length - 1; i >= 0; i--) {
        const el = document.getElementById(`#${data[i]!.id}`);
        if (!el) continue;
        const top = el.offsetTop;
        if (y >= top) {
          current = data[i]!.id;
          break;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveHeader();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [data]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      onMouseLeave={() => setisHover(false)}
      className="w-full gap-[14px] sticky top-24"
    >
      <motion.div
        onMouseEnter={() => setisHover(true)}
        animate={{ opacity: isHover ? 0 : 1 }}
        className="absolute top-0 flex flex-col place-self-end p-3 gap-3 z-20"
      >
        {data.map((heading) => (
          <div
            key={heading.id}
            className={cn(
              "shrink-0 h-0.5 w-5 rounded-full transition-colors duration-150",
              activeId === `${heading.id}` ? "bg-cozy-500" : "bg-cozy-900",
            )}
          ></div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {isHover && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15 }}
            onMouseLeave={() => setisHover(false)}
            className="absolute top-0 w-full p-3 bg-cozy-background rounded-xl border border-cozy-950 z-10"
          >
            <div className="flex flex-col gap-2">
              {data.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, `#${heading.id}`)}
                  className={cn(
                    "text-sm hover:text-cozy-100 transition-colors",
                    "hover:text-cozy-400 text-cozy-500",
                    activeId === heading.id && "text-cozy-100",
                    heading.level === 3 && "ml-4",
                  )}
                >
                  {heading.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TableOfContents;
