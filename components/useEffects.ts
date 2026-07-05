"use client";

import { useEffect } from "react";

/* dvdrod-style interactions: custom cursor + magnetic elements.
   Mirrors the prototype's effects.js; runs once on mount, cleans up on unmount.
   Disabled automatically on coarse pointers and reduced-motion. */
export function useEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const noMotion = () => document.body.classList.contains("no-motion");

    // --- cursor elements ---
    const dot = document.createElement("div");
    dot.className = "cur-dot";
    const ring = document.createElement("div");
    ring.className = "cur-ring";
    const label = document.createElement("span");
    label.className = "cur-label";
    ring.appendChild(label);
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onDown = () => ring.classList.add("down");
    const onUp = () => ring.classList.remove("down");
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const onLeave = () => {
      dot.style.opacity = ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = ring.style.opacity = "1";
    };
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // --- hover state (grow / label) ---
    const interactive = "a, button, [data-cursor]";
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest(interactive);
      if (!t) return;
      const l = t.getAttribute("data-cursor");
      if (l) {
        label.textContent = l;
        ring.classList.add("labeled");
        scale = 1;
      } else {
        ring.classList.add("on");
        scale = 1.7;
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest(interactive);
      if (!t) return;
      ring.classList.remove("on", "labeled");
      scale = 1;
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // --- magnetic pull ---
    const magSel = ".btn, .social, .theme-toggle, .nav-cta, .nav-logo, .top-link, .mail";
    let magEl: HTMLElement | null = null;
    const onMagMove = (e: MouseEvent) => {
      if (noMotion()) {
        if (magEl) {
          magEl.style.transform = "";
          magEl = null;
        }
        return;
      }
      const t = (e.target as Element | null)?.closest(magSel) as HTMLElement | null;
      if (t !== magEl && magEl) magEl.style.transform = "";
      magEl = t;
      if (t) {
        const r = t.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.4;
        t.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    window.addEventListener("mousemove", onMagMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousemove", onMagMove);
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
}
