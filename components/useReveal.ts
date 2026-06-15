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
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
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
