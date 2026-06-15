"use client";

import { Fragment, useEffect, useState } from "react";
import { PORTFOLIO as PD } from "@/lib/data";

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
                <p key={i} className={"reveal d" + (i + 1)} dangerouslySetInnerHTML={{ __html: p }} />
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
                    <li key={j} dangerouslySetInnerHTML={{ __html: pt }} />
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
          {PD.projects.map((pr, i) => (
            <div className="proj reveal" key={i}>
              <div className="proj-idx">/{String(i + 1).padStart(2, "0")}</div>
              <div className="proj-main">
                <h3>{pr.title}</h3>
                <span className="yr">{pr.year}</span>
                <p>{pr.desc}</p>
                <div className="metrics">
                  {pr.metrics.map((m, j) => (
                    <span
                      className="metric"
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: m.t.replace(/([\d.]+%?|sub-\d+ms|99\.99%|5×)/g, "<b>$1</b>"),
                      }}
                    />
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
              <div className="proj-arrow">↗</div>
            </div>
          ))}
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

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setT(
          new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "America/Phoenix",
          }).format(new Date())
        );
      } catch {
        setT(new Date().toLocaleTimeString());
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="clock">{t}</span>;
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
        <span>
          United States — <Clock />
        </span>
      </div>
      <div className="top-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Back to top <span>↑</span>
      </div>
    </div>
  );
}

export { About, Experience, Projects, Skills, Contact, Footer };
