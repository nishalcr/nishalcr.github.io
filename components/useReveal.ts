"use client";

import { useEffect } from "react";

/* rAF/scroll-based reveal — bulletproof replacement for IntersectionObserver
   (which proved flaky on clean loads in the prototype). Adds `.in` to any
   `.reveal` element once it enters the viewport. */
export function useReveal() {
  useEffect(() => {
    // Skip all scroll work when motion is unwanted: just show everything.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.body.classList.contains("no-motion")) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    let ticking = false;
    const reveal = () => {
      ticking = false;
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        // reveal anything whose top has entered the viewport — this also
        // catches elements at the very bottom edge (e.g. the hero marquee on
        // tall, full-height screens) that the old 0.92 margin missed.
        if (r.top < vh && r.bottom > 0) el.classList.add("in");
      });
    };
    // Coalesce scroll/resize bursts into one rAF-timed pass.
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(reveal);
      }
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(reveal));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
