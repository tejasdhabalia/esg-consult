"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { pillars } from "@/lib/service-pillars";

/** How long each slide holds, in milliseconds. */
const SLIDE_DURATION = 7000;

/**
 * Auto-advancing carousel for the three service areas.
 *
 * Auto-advance is a hostile pattern if done carelessly, so this one:
 *   - pauses on hover, on keyboard focus, and when the browser tab is hidden
 *   - does not auto-advance at all when the visitor has asked for reduced
 *     motion in their operating system
 *   - carries working previous and next buttons and clickable dots
 *   - announces slide changes to screen readers
 *
 * All slide content comes from src/lib/service-pillars.ts. To change what a
 * slide says, edit the pillar there rather than this file.
 */
export default function ServiceCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const regionRef = useRef<HTMLDivElement | null>(null);

  const slideCount = pillars.length;

  const goTo = useCallback(
    (index: number) => setActive(((index % slideCount) + slideCount) % slideCount),
    [slideCount],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const previous = useCallback(() => goTo(active - 1), [active, goTo]);

  // Respect the operating system's reduced motion setting.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Stop advancing while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // The timer itself.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(next, SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion, next]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  }

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="What we do"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {pillars.map((pillar, index) => (
            <div
              key={pillar.route}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideCount}: ${pillar.title}`}
              aria-hidden={index !== active}
            >
              <div className="grid md:grid-cols-2">
                <div className="p-10 md:p-14">
                  <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                    {`0${index + 1} / 0${slideCount}`}
                  </div>

                  <h3 className="mt-5 text-2xl md:text-3xl font-semibold text-slate-900">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 text-slate-600 leading-relaxed">{pillar.summary}</p>

                  <Link
                    href={pillar.route}
                    tabIndex={index === active ? 0 : -1}
                    className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
                  >
                    {`Explore ${pillar.label.toLowerCase()}`}
                  </Link>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 p-10 md:border-l md:border-t-0 md:p-14">
                  <div className="text-sm font-semibold text-slate-900">What that covers</div>

                  <ul className="mt-5 space-y-3">
                    {pillar.lines.map((line) => (
                      <li key={line.route} className="flex gap-3 text-sm text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {line.live ? (
                          <Link
                            href={line.route}
                            tabIndex={index === active ? 0 : -1}
                            className="hover:text-indigo-700 hover:underline"
                          >
                            {line.label}
                          </Link>
                        ) : (
                          <span>{line.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          {pillars.map((pillar, index) => (
            <button
              key={pillar.route}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${pillar.title}`}
              aria-current={index === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-10 bg-indigo-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            →
          </button>
        </div>
      </div>

      {/* Screen reader announcement of the current slide. */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`${pillars[active].title}. Slide ${active + 1} of ${slideCount}.`}
      </div>
    </div>
  );
}
