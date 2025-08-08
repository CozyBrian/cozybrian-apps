"use client";

import { cn } from "@cozy/utils";
import { motion, AnimatePresence, Transition } from "framer-motion";
import {
  useRef,
  useState,
  useEffect,
  ReactElement,
  Children,
  cloneElement,
  useId,
} from "react";

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ "data-id": string }>[]
    | ReactElement<{ "data-id": string }>;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
  defaultValue?: string;
  onValueChange?: (newId: string | null) => void;
};

export function AnimatedBackground({
  children,
  className,
  transition,
  enableHover = false,
  defaultValue,
  onValueChange,
}: AnimatedBackgroundProps) {
  const uniqueId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);
  const [rect, setRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current || activeId === null) {
      setRect(null);
      return;
    }

    const target = containerRef.current.querySelector(
      `[data-id="${activeId}"]`,
    ) as HTMLElement | null;

    if (target) {
      setRect({
        top: target.offsetTop,
        left: target.offsetLeft,
        width: target.offsetWidth,
        height: target.offsetHeight,
      });
    } else {
      setRect(null);
    }
  }, [activeId, children]);

  const handleSetActive = (id: string | null) => {
    setActiveId(id);
    onValueChange?.(id);
  };

  return (
    <div className="relative" ref={containerRef}>
      <AnimatePresence>
        {rect && (
          <motion.div
            layoutId={`background-${uniqueId}`}
            className={cn("absolute pointer-events-none", className)}
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              transition || { type: "spring", damping: 25, stiffness: 300 }
            }
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col">
        {Children.map(children, (child) => {
          const id = child.props["data-id"];
          const interactionProps = enableHover
            ? {
                onMouseEnter: () => handleSetActive(id),
                onMouseLeave: () => handleSetActive(null),
              }
            : {
                onClick: () => handleSetActive(id),
              };

          return cloneElement(child, {
            ...(interactionProps as Partial<typeof child.props>),
          });
        })}
      </div>
    </div>
  );
}
