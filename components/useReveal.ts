"use client";

import { useEffect } from "react";

/* rAF/scroll-based reveal — bulletproof replacement for IntersectionObserver
   (which proved flaky on clean loads in the prototype). Adds `.in` to any
   `.reveal` element once it enters the viewport. */
export function useReveal() {
  useEffect(() => {
    if (document.body.classList.contains("no-motion")) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const reveal = () => {
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        // reveal anything whose top has entered the viewport — this also
        // catches elements at the very bottom edge (e.g. the hero marquee on
        // tall, full-height screens) that the old 0.92 margin missed.
        if (r.top < vh && r.bottom > 0) el.classList.add("in");
      });
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(reveal));
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, []);
}
