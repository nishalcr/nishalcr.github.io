import { PORTFOLIO as P } from "@/lib/data";

const marq = [
  "Spring Boot",
  "Node.js",
  "React",
  "AWS",
  "Kafka",
  "Distributed Systems",
  "LLMs",
  "Microservices",
  "PyTorch",
  "Kubernetes",
];

function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="btn btn-primary" href="#projects">
        View work <span className="arw">→</span>
      </a>
      <a className="btn btn-ghost" href={P.resume} target="_blank" rel="noopener" download>
        Resume <span className="arw">↓</span>
      </a>
    </div>
  );
}

/* Editorial hero (the frozen "minimal" treatment, dvdrod-inspired) */
export default function Hero() {
  return (
    <section className="hero heroA" id="top">
      <div className="wrap heroA-inner">
        <div className="eyebrow heroA-role reveal">Full Stack Developer · AI/ML</div>
        <h1 className="heroA-name">
          <span className="ln reveal d1">
            <span>Nishal</span>
          </span>
          <span className="ln reveal d2">
            <span>Chandra Reddy</span>
          </span>
        </h1>
        <p className="lead reveal d3">
          I design, build, and ship scalable web applications, microservices, and distributed
          systems — with four years delivering production software.
        </p>
        <div className="heroA-meta reveal d4">
          <span className="m">
            <span className="live"></span> Available for work
          </span>
          <span className="m">United States</span>
          <span className="m">4 years experience</span>
        </div>
        <div className="reveal d4">
          <HeroActions />
        </div>
      </div>
      <div className="heroA-marquee reveal d4" aria-hidden="true">
        <div className="marquee-track">
          {[...marq, ...marq].map((m, i) => (
            <span className="it" key={i}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
