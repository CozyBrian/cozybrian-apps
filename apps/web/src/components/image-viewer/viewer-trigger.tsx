"use client";

import { cn } from "@cozy/utils";

import { viewer } from "./viewer-store";

import type { ReactNode } from "react";

type ViewerTriggerProps = {
  /** Id of the image to open on (one of the items given to <ImageViewer />). */
  item: string;
  label: string;
  className?: string;
  children?: ReactNode;
};

/** A button that opens the image viewer on one image (mount <ImageViewer /> on the page). */
export default function ViewerTrigger({
  item,
  label,
  className,
  children,
}: ViewerTriggerProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={() => viewer.open(item)}
      className={cn(
        "group relative cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cozy-400",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute right-2 bottom-2 flex size-8 items-center justify-center bg-cozy-background/80 text-cozy-200 opacity-80 transition-opacity group-hover:opacity-100"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none">
          <path
            d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
