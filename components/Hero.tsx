import { PORTFOLIO as P } from "@/lib/data";

const marq = [
  "Java",
  "Spring Boot",
  "Node.js",
  "Kafka",
  "ECS Fargate",
  "LLM Pipelines",
  "Distributed Systems",
  "Terraform",
  "React",
  "Microservices",
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
        <div className="eyebrow heroA-role reveal">
          Software Engineer · Distributed Systems & AI
        </div>
        <h1 className="heroA-name">
          <span className="ln reveal d1">
            <span>Nishal</span>
          </span>
          <span className="ln reveal d2">
            <span>Chandra Reddy</span>
          </span>
        </h1>
        <p className="lead reveal d3">
          For five years I&apos;ve owned production systems end to end — architecting Java and
          Spring Boot microservices, Kafka event pipelines and LLM extraction that handle real
          traffic every day.
        </p>
        <div className="heroA-meta reveal d4">
          <span className="m">
            <span className="live"></span> Available for work
          </span>
          <span className="m">Phoenix, AZ · Open to relocation</span>
          <span className="m">5 years experience</span>
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
