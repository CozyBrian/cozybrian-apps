"use client";
import { cn } from "@cozy/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { CozyMinecraft } from "@/assets/images";

const scrollThreshold = 80;
const Header = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const screen = useWindowSize();
  const isMobile = screen.width <= 768;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > scrollThreshold && !isScrolled) {
      setIsScrolled(true);
    } else if (latest < scrollThreshold && isScrolled) {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      initial={{ height: isMobile ? 60 : 120 }}
      animate={{
        height: isMobile ? 60 : scrollY.get() > scrollThreshold ? 60 : 120,
      }}
      transition={{ duration: 0.1 }}
      className={cn(
        "fixed top-0 left-0 flex items-center justify-center h-[120px] z-30",
        "bg-opacity-20 bg-tesla-900 w-full border-b duration-100",
        isScrolled ? "border-cozy-900" : "border-transparent",
      )}
    >
      <div className="w-full px-4 lg:px-0 lg:w-[880px] h-full flex flex-row items-center justify-between z-50">
        <Link href="/" className="w-fit h-11">
          <Image src={CozyMinecraft} className="h-full w-[72px]" alt="Logo" />
        </Link>
        <div className="flex flex-row items-center gap-5">
          <Link
            href="/"
            className="text-sm font-montserrat text-cozy-400 hover:text-cozy-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_BLOG_URL || "localhost:3001"}
            className="text-sm font-montserrat text-cozy-400 hover:text-cozy-300 transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>
      <div
        style={{
          maskImage: `linear-gradient(to bottom, white 0%, white 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, white 0%, white 100%)`,
          maskClip: `content-box`,
          WebkitMaskClip: `content-box`,
          backdropFilter: `blur(12px)`,
        }}
        className={cn(
          "absolute ",
          isMobile ? "inset-[-1px] p-[1px]" : "inset-[-18px] p-[18px]",
        )}
      ></div>
    </motion.header>
  );
};

export default Header;
