"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { l: "About", id: "about" },
  { l: "Experience", id: "experience" },
  { l: "Projects", id: "projects" },
  { l: "Tech Stack", id: "skills" },
  { l: "Contact", id: "contact" },
];

export default function Nav() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [ind, setInd] = useState({ left: 0, width: 0, on: false });

  // scroll-spy: which section is in view + condense nav into a pill
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const y = window.scrollY + window.innerHeight * 0.35;
      let idx = -1;
      links.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) idx = i;
      });
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // slide the indicator under the active link (re-measure when nav morphs)
  useEffect(() => {
    const el = linkRefs.current[active];
    if (active >= 0 && el) setInd({ left: el.offsetLeft, width: el.offsetWidth, on: true });
    else setInd((p) => ({ ...p, on: false }));
  }, [active, scrolled]);

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-pill">
        <a className="nav-logo" href="#top">
          <span className="dot"></span> NCR
        </a>
        <div className="nav-spacer"></div>
        <span className="nav-sep"></span>
        <div className="nav-links">
          <span
            className="nav-indicator"
            style={{
              transform: `translateX(${ind.left}px)`,
              width: ind.width + "px",
              opacity: ind.on ? 1 : 0,
            }}
          ></span>
          {links.map((x, i) => (
            <a
              key={x.id}
              href={"#" + x.id}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className={active === i ? "active" : ""}
            >
              {x.l}
            </a>
          ))}
        </div>
        <span className="nav-sep"></span>
        <ThemeToggle />
      </div>
    </nav>
  );
}
