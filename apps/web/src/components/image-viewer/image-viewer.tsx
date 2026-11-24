"use client";

import { cn } from "@cozy/utils";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";

import { useViewer, viewer } from "./viewer-store";

export type ViewerImage = {
  id: string;
  /** The full-size image, loaded only once the viewer shows it. */
  src: StaticImageData;
  /** A small version for the filmstrip; pass the one the page already shows so it is not fetched twice. */
  thumb?: StaticImageData;
  alt: string;
  title: string;
  caption?: string;
};

type ImageViewerProps = {
  /** The set to page through, in order. */
  items: ViewerImage[];
  /** Short label shown above the counter, e.g. the project name. */
  context: string;
};

// How far a downward swipe has to travel (px) before it closes the viewer.
const SWIPE_TO_CLOSE = 110;
// A quicker flick closes from a shorter pull: average speed in px/ms, past a minimum distance in px.
const FLICK_SPEED = 0.11;
const FLICK_MIN = 40;

const FOCUSABLE = "button, a[href], [tabindex]:not([tabindex='-1'])";

const pad = (value: number) => String(value).padStart(2, "0");

/** Screenshots are captured at 2x, so half the pixel width is their real size; phones stop at 2.4 screens wide. */
const zoomWidth = (src: StaticImageData) =>
  `max(100%, min(${Math.round(src.width / 2)}px, 240vw))`;

const iconButton =
  "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-cozy-950 text-cozy-200 transition-colors hover:bg-cozy-900 hover:text-cozy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cozy-400";
const arrowButton =
  "absolute top-1/2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-cozy-900 text-cozy-200 transition-colors hover:border-cozy-700 hover:text-cozy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cozy-400 aria-disabled:cursor-default aria-disabled:opacity-30 aria-disabled:hover:border-cozy-900";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
      <path
        d={
          direction === "left"
            ? "M12.5 4.5L7 10l5.5 5.5"
            : "M7.5 4.5L13 10l-5.5 5.5"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SlideProps = {
  item: ViewerImage;
  active: boolean;
  onZoom: () => void;
  className?: string;
};

/** One image on the stage, contained in its box. Clicking it zooms in. */
function Slide({ item, active, onZoom, className }: SlideProps) {
  return (
    <button
      type="button"
      aria-label={`Zoom in on ${item.title}`}
      tabIndex={active ? 0 : -1}
      onClick={onZoom}
      className={cn(
        "relative block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cozy-400",
        className,
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        unoptimized
        loading={active ? "eager" : "lazy"}
        className="object-contain"
      />
    </button>
  );
}

/** Thumbnails of the set, on tablet and up. */
function Filmstrip({ items, index }: { items: ViewerImage[]; index: number }) {
  return (
    <div className="hidden shrink-0 items-end gap-2 md:flex">
      {items.map((item, position) => {
        const current = position === index;
        return (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.title} (${position + 1} of ${items.length})`}
            aria-current={current || undefined}
            onClick={() => viewer.go(item.id)}
            className={cn(
              "relative h-12 w-[72px] shrink-0 cursor-pointer overflow-hidden bg-cozy-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cozy-200",
              current
                ? "outline-2 outline-offset-2 outline-cozy-400"
                : "opacity-55 transition-opacity hover:opacity-90",
            )}
          >
            <Image
              src={item.thumb ?? item.src}
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Full-screen image viewer, adapted from the saunagh-web media viewer. Desktop pages with arrows, keys and a
 * filmstrip; touch screens swipe through a snapping row and swipe down to close. Clicking an image zooms it into a
 * pane that scrolls both ways. Opened by ViewerTrigger via viewer-store; render it once on a page that has triggers.
 *
 * Images are `unoptimized` on purpose: the site's host serves files as they are, so every `/_next/image` width is a
 * separate download of the same bytes. One plain URL per file lets fit, zoom and the filmstrip share a single fetch.
 */
export default function ImageViewer({ items, context }: ImageViewerProps) {
  const state = useViewer();
  const found = items.findIndex((candidate) => candidate.id === state.id);
  const index = Math.max(0, found);
  const open = state.open && found !== -1;
  const item = found === -1 ? undefined : items[found];
  const total = items.length;

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const zoomRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{
    x: number;
    y: number;
    at: number;
    vertical: boolean | null;
  } | null>(null);
  // The touch row jumps straight to the opened image, then glides when paged from the filmstrip or keys.
  const settled = useRef(false);
  const swipedIndex = useRef<number | null>(null);
  const scrollTarget = useRef<number | null>(null);
  const [drag, setDrag] = useState({ y: 0, held: false });
  // Zoom belongs to one image: paging or closing drops it without an effect.
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  const zoomed = open && item !== undefined && zoomedId === item.id;
  // Screen readers hear the new image when it changes while open; opening is already announced by the dialog's label.
  const [announced, setAnnounced] = useState<{
    id: string;
    announce: boolean;
  } | null>(null);
  if (!open && announced) setAnnounced(null);
  else if (open && item && announced?.id !== item.id)
    setAnnounced({ id: item.id, announce: announced !== null });
  if (!open && zoomedId) setZoomedId(null);

  // Leaving the page closes the viewer so it does not reopen on the next one.
  useEffect(() => viewer.close, []);

  // While open: no page scroll, focus starts on Close and returns to the trigger after.
  useEffect(() => {
    if (!open) return;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      settled.current = false;
      swipedIndex.current = null;
      scrollTarget.current = null;
      previous?.focus({ preventScroll: true });
    };
  }, [open]);

  // Zooming swaps the stage out from under a focused image; hand focus to the zoom button instead of losing it.
  useEffect(() => {
    if (open && !dialogRef.current?.contains(document.activeElement))
      zoomRef.current?.focus({ preventScroll: true });
  }, [open, zoomed]);

  // Keys page, zoom out and close; Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const step = (delta: number) => {
      const next = items[index + delta];
      if (next) viewer.go(next.id);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (zoomed) setZoomedId(null);
        else viewer.close();
      } else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = [
          ...dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
        ].filter(
          (element) => element.tabIndex >= 0 && element.getClientRects().length,
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        const current = document.activeElement;
        if (!dialog.contains(current)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && current === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && current === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, items, zoomed]);

  // Keep the swipe row on the current image when it changes from outside the row.
  useEffect(() => {
    // Zooming unmounts the row; it comes back at the start and should jump, not glide, to the image.
    if (zoomed) {
      settled.current = false;
      return;
    }
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!open || !track || !slide || !first || track.clientWidth === 0) return;
    // Native swiping already moved the track. Do not start a second scroll halfway through the gesture.
    if (settled.current && swipedIndex.current === index) {
      swipedIndex.current = null;
      return;
    }
    swipedIndex.current = null;
    const left = slide.offsetLeft - first.offsetLeft;
    if (Math.abs(track.scrollLeft - left) > 4) {
      scrollTarget.current = left;
      track.scrollTo({
        left,
        behavior: settled.current ? "smooth" : "instant",
      });
    }
    settled.current = true;
  }, [open, index, items, zoomed]);

  function onTrackScroll() {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    const second = track?.children[1] as HTMLElement | undefined;
    if (!open || !settled.current || !track || !first) return;
    // Filmstrip/key navigation can pass intermediate slides during a smooth scroll; keep its intended selection.
    if (scrollTarget.current !== null) {
      if (Math.abs(track.scrollLeft - scrollTarget.current) > 4) return;
      scrollTarget.current = null;
    }
    const step = second
      ? second.offsetLeft - first.offsetLeft
      : track.clientWidth;
    const next = items[Math.round(track.scrollLeft / step)];
    if (next && next.id !== state.id) {
      swipedIndex.current = items.indexOf(next);
      viewer.go(next.id);
    }
  }

  function onTouchStart(event: TouchEvent) {
    // A new gesture takes over from any in-flight programmatic scroll.
    scrollTarget.current = null;
    const point = event.touches[0];
    if (!point) return;
    touch.current = {
      x: point.clientX,
      y: point.clientY,
      at: event.timeStamp,
      vertical: null,
    };
  }

  function onTouchMove(event: TouchEvent) {
    const start = touch.current;
    const point = event.touches[0];
    if (!start || !point) return;
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    if (start.vertical === null && Math.hypot(dx, dy) > 8)
      start.vertical = Math.abs(dy) > Math.abs(dx);
    if (start.vertical) setDrag({ y: Math.max(0, dy), held: true });
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touch.current;
    touch.current = null;
    const speed = start ? drag.y / Math.max(1, event.timeStamp - start.at) : 0;
    if (
      drag.y > SWIPE_TO_CLOSE ||
      (drag.y > FLICK_MIN && speed > FLICK_SPEED)
    ) {
      // Stays where it was let go through the 200ms fade, then resets unseen.
      viewer.close();
      window.setTimeout(() => setDrag({ y: 0, held: true }), 200);
    } else if (drag.y) {
      setDrag({ y: 0, held: false });
    }
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={
        item ? `${item.title}, ${index + 1} of ${total}` : "Image viewer"
      }
      inert={!open}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col overflow-hidden bg-cozy-background text-cozy-100 transition-opacity duration-200 ease-out",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <p aria-live="polite" className="sr-only">
        {item && announced?.announce
          ? `${item.title}, ${index + 1} of ${total}`
          : ""}
      </p>
      {item && (
        <>
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-cozy-950 px-4 py-3 md:px-6 lg:px-8">
            <div className="flex min-w-0 flex-col gap-0.5 md:flex-row md:items-baseline md:gap-4">
              <p className="truncate text-xs uppercase tracking-[0.2em] text-cozy-500">
                {context}
              </p>
              <p className="font-montserrat text-sm font-medium text-cozy-300 tabular-nums">
                {pad(index + 1)} / {pad(total)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                ref={zoomRef}
                type="button"
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                aria-pressed={zoomed}
                onClick={() => setZoomedId(zoomed ? null : item.id)}
                className={iconButton}
              >
                <svg
                  viewBox="0 0 18 18"
                  className="size-[18px]"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d={
                      zoomed
                        ? "M12 12l3.5 3.5M6 8h4"
                        : "M12 12l3.5 3.5M6 8h4M8 6v4"
                    }
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={viewer.close}
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-cozy-100 text-cozy-background transition-colors hover:bg-cozy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cozy-400"
              >
                <svg
                  viewBox="0 0 18 18"
                  className="size-[18px]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 4.5l9 9M13.5 4.5l-9 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {zoomed ? (
            /* Zoomed: the image at reading size in a pane that scrolls both ways. */
            <div className="min-h-0 flex-1 overflow-auto overscroll-contain">
              <button
                type="button"
                aria-label={`Zoom out of ${item.title}`}
                onClick={() => setZoomedId(null)}
                style={{ width: zoomWidth(item.src) }}
                className="block cursor-zoom-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cozy-400"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  unoptimized
                  className="h-auto w-full"
                />
              </button>
            </div>
          ) : (
            <>
              {/* Desktop: one image at a time, arrows at the edges. */}
              <div className="relative hidden min-h-0 flex-1 items-center justify-center px-24 py-6 lg:flex">
                <button
                  type="button"
                  aria-label="Previous"
                  aria-disabled={index === 0}
                  onClick={() => {
                    const previous = items[index - 1];
                    if (previous) viewer.go(previous.id);
                  }}
                  className={cn(arrowButton, "left-8")}
                >
                  <Chevron direction="left" />
                </button>
                <Slide
                  key={item.id}
                  item={item}
                  active={open}
                  onZoom={() => setZoomedId(item.id)}
                  className="animate-viewer-in motion-reduce:animate-none"
                />
                <button
                  type="button"
                  aria-label="Next"
                  aria-disabled={index === total - 1}
                  onClick={() => {
                    const next = items[index + 1];
                    if (next) viewer.go(next.id);
                  }}
                  className={cn(arrowButton, "right-8")}
                >
                  <Chevron direction="right" />
                </button>
              </div>

              {/* Touch: a snapping row (the next image peeks in on phones); swipe down to close. */}
              <div
                ref={trackRef}
                onScroll={onTrackScroll}
                onWheel={() => {
                  scrollTarget.current = null;
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={() => {
                  setDrag({ y: 0, held: false });
                  touch.current = null;
                }}
                style={
                  drag.y
                    ? {
                        translate: `0 ${drag.y}px`,
                        opacity: Math.max(0, 1 - drag.y / 600),
                      }
                    : undefined
                }
                className={cn(
                  "relative flex min-h-0 flex-1 snap-x snap-mandatory scroll-pl-4 gap-2 overflow-x-auto overscroll-x-contain py-4 pl-4 [scrollbar-width:none] [touch-action:pan-x] md:scroll-pl-0 md:gap-0 md:pl-0 lg:hidden [&::-webkit-scrollbar]:hidden",
                  !drag.held &&
                    "transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-opacity motion-reduce:duration-150",
                )}
              >
                {items.map((slide, position) => (
                  <div
                    key={slide.id}
                    className="w-[calc(100vw-48px)] shrink-0 snap-start md:w-full md:px-16"
                  >
                    <Slide
                      item={slide}
                      active={open && position === index}
                      onZoom={() => setZoomedId(slide.id)}
                    />
                  </div>
                ))}
                {/* Lets the last slide snap to the left edge on phones. */}
                <div aria-hidden="true" className="w-6 shrink-0 md:hidden" />
              </div>
            </>
          )}

          <div className="flex shrink-0 items-end justify-between gap-6 border-t border-cozy-950 px-4 pt-4 md:px-6 md:pb-6 lg:px-8">
            <div
              key={item.id}
              className="flex min-w-0 animate-viewer-in flex-col gap-1 motion-reduce:animate-none"
            >
              <p className="text-sm font-semibold text-cozy-50">{item.title}</p>
              {item.caption && (
                <p className="max-w-[600px] text-sm text-cozy-300">
                  {item.caption}
                </p>
              )}
            </div>
            <Filmstrip items={items} index={index} />
          </div>

          <div className="flex shrink-0 items-center gap-3 px-4 pt-4 pb-5 md:hidden">
            <div className="relative h-0.5 flex-1 bg-cozy-950">
              <div
                className="absolute top-0 h-0.5 bg-cozy-400 transition-[left] duration-300 ease-out"
                style={{
                  left: `${(index / total) * 100}%`,
                  width: `${100 / total}%`,
                }}
              />
            </div>
            <p className="shrink-0 font-montserrat text-xs text-cozy-500">
              {zoomed ? "Tap to zoom out" : "Tap to zoom, swipe down to close"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
