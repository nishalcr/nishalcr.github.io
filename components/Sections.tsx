"use client";

import { Fragment } from "react";
import { PORTFOLIO as PD } from "@/lib/data";

/* Render **bold** spans as real React nodes — safe (no dangerouslySetInnerHTML),
   and lets content in data.ts stay plain text. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>About</h2>
          <div className="section-num">01 / 05</div>
        </div>
        <div className="about-grid">
          <div>
            <p className="about-lead reveal word-rise">
              {PD.about.lead.split(" ").map((w, i) => (
                <Fragment key={i}>
                  <span className="w" style={{ transitionDelay: i * 0.03 + "s" }}>
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
            <div className="about-body" style={{ marginTop: 36 }}>
              {PD.about.body.map((p, i) => (
                <p key={i} className={"reveal d" + (i + 1)}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
          </div>
          <div className="reveal d2">
            <div className="eyebrow no-rule" style={{ marginBottom: 18 }}>
              Education
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PD.education.map((e, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 16,
                    paddingTop: 14,
                    borderTop: "1px solid var(--line-soft)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, color: "var(--text)" }}>{e.deg}</div>
                    <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 3 }}>{e.school}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--ghost)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.when}
                    {e.extra ? ` · ${e.extra}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="exp" id="experience">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Experience</h2>
          <div className="section-num">02 / 05</div>
        </div>
        <div className="timeline">
          {PD.experience.map((job, i) => (
            <div className="job reveal" key={i}>
              <div className="job-meta">
                <div className="role-co">
                  {String(i + 1).padStart(2, "0")} / {PD.experience.length.toString().padStart(2, "0")}
                </div>
                <div className="when">{job.when}</div>
                <div className="loc">{job.loc}</div>
              </div>
              <div>
                <h3>
                  {job.role} <span className="at">@ {job.company}</span>
                </h3>
                <ul>
                  {job.points.map((pt, j) => (
                    <li key={j}>
                      <RichText text={pt} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Projects</h2>
          <div className="section-num">03 / 05</div>
        </div>
        <div className="proj-list">
          {PD.projects.map((pr, i) => {
            // A live demo is the headline link when present; the repo otherwise.
            // Either field enables the link — keeps the data.ts contract honest.
            const href = pr.demo ?? pr.repo;
            const isDemo = Boolean(pr.demo);
            const linkLabel = isDemo ? "Live demo" : "GitHub";
            const linkAria = isDemo
              ? `${pr.title} — open live demo`
              : `${pr.title} — view source on GitHub`;
            return (
            <div className="proj reveal" key={i}>
              <div className="proj-idx">/{String(i + 1).padStart(2, "0")}</div>
              <div className="proj-main">
                <h3>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" data-cursor={linkLabel}>
                      {pr.title}
                    </a>
                  ) : (
                    pr.title
                  )}
                </h3>
                <span className="yr">{pr.year}</span>
                <p>{pr.desc}</p>
                <div className="metrics">
                  {pr.metrics.map((m, j) => (
                    <span className="metric" key={j}>
                      <RichText text={m} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="proj-stack">
                {pr.stack.map((s, j) => (
                  <span className="chip" key={j}>
                    {s}
                  </span>
                ))}
              </div>
              {href ? (
                <a
                  className="proj-arrow"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkAria}
                  data-cursor={linkLabel}
                >
                  ↗
                </a>
              ) : null}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Tech Stack</h2>
          <div className="section-num">04 / 05</div>
        </div>
        <div className="skill-grid">
          {PD.skills.map((s, i) => (
            <div className="skill-cat reveal" key={i}>
              <div className="cat-h">
                <span className="ix">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.cat}</h3>
              </div>
              <div className="skill-tags">
                {s.tags.map((t, j) => (
                  <span key={j}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="eyebrow reveal no-rule" style={{ justifyContent: "center" }}>
          Contact / 05
        </div>
        <h2 className="reveal d1">Let&apos;s build something.</h2>
        <p className="blurb reveal d2">
          Open to full-stack, backend, and AI/ML engineering roles. The fastest way to reach me is
          email.
        </p>
        <div style={{ marginTop: 30 }} className="reveal d2">
          <a
            className="mail"
            href={`mailto:${PD.email}`}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,30px)", letterSpacing: "-0.01em" }}
          >
            {PD.email}
          </a>
        </div>
        <div className="socials reveal d3">
          <a className="social" href={`mailto:${PD.email}`}>
            Email <span className="arw">↗</span>
          </a>
          <a className="social" href={PD.linkedin} target="_blank" rel="noopener">
            LinkedIn <span className="arw">↗</span>
          </a>
          <a className="social" href={PD.github} target="_blank" rel="noopener">
            GitHub <span className="arw">↗</span>
          </a>
          <a className="social" href={PD.resume} target="_blank" rel="noopener" download>
            Resume <span className="arw">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="ft">© 2026 Nishal Chandra Reddy</div>
      <div className="ft" style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <span>United States</span>
      </div>
      <button
        type="button"
        className="top-link"
        onClick={() => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }}
      >
        Back to top <span>↑</span>
      </button>
    </div>
  );
}

export { About, Experience, Projects, Skills, Contact, Footer };
