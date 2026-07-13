/* ==================================================================
   THE ONLY FILE YOU EDIT TO CHANGE SITE CONTENT.
   ------------------------------------------------------------------
   How to update things:
   - Text/bullets: just edit the strings. Wrap a phrase in **double
     asterisks** to make it bold (e.g. "cut cost by **40%**"). No HTML,
     no escaping — a stray character can't break the build.
   - Resume: drop your new PDF at  public/resume.pdf  (overwrite it).
     Nothing here changes — the path below is already stable.
   - A project's link: set `repo` (and/or `demo`) to a URL. Leave them
     off and the card simply renders without a link/arrow.
   ================================================================== */

export interface About {
  lead: string;
  body: string[];
}

export interface Job {
  role: string;
  company: string;
  loc: string;
  when: string;
  points: string[]; // use **bold** for emphasis
}

export interface Project {
  title: string;
  year: string;
  desc: string;
  repo?: string; // optional GitHub URL — arrow links here when present
  demo?: string; // optional live demo URL
  metrics: string[]; // use **bold** for emphasis, e.g. "**99.99%** uptime"
  stack: string[];
}

export interface SkillGroup {
  cat: string;
  tags: string[];
}

export interface Education {
  deg: string;
  school: string;
  when: string;
  extra?: string;
}

export interface Portfolio {
  name: string;
  first: string;
  last: string;
  role: string;
  role2: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  resume: string;
  about: About;
  experience: Job[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
}

export const PORTFOLIO: Portfolio = {
  name: "Nishal Chandra Reddy",
  first: "Nishal",
  last: "Reddy",
  role: "Software Engineer",
  role2: "Distributed Systems & AI",
  email: "nishalcr@gmail.com",
  location: "Phoenix, AZ · Open to relocation",
  linkedin: "https://www.linkedin.com/in/nishalcr",
  github: "https://github.com/nishalcr",
  resume: "/resume.pdf",

  about: {
    lead: "Software Engineer with 5 years building and owning production systems end to end — Java and Spring Boot microservices, Kafka event pipelines, and LLM extraction pipelines running on live traffic.",
    body: [
      "I've led multi-service initiatives spanning six services and mentored engineers through architecture reviews. I'm comfortable at every layer — backend architecture, cloud infrastructure and IaC, and React front ends.",
      "M.S. in Computer Science from Arizona State University (2023–2025), with a track record of delivering reliable, high-performance software at scale.",
    ],
  },

  experience: [
    {
      role: "Software Developer",
      company: "Ecohome.one",
      loc: "Remote · US",
      when: "Aug 2025 — Present",
      points: [
        "Led the **GDPR erasure program** across six services — designed the specs and built a coordinator that fans a single deletion request out to idempotent erasure workers, backed by a MySQL state machine with per-household locks and single-active-request enforcement.",
        "Build and operate the **AI receipt-extraction platform**, a Node.js service on **ECS Fargate** that turns unstructured purchase emails into structured inventory records through a **Gemini** pipeline with vision OCR for PDF and image attachments.",
        "Hardened the pipeline against LLM failure with a **four-tier fallback chain** — per-stage heuristic extractors, a config-swappable **Bedrock/Claude** path, and SQS re-queue with auto-requeue on provider recovery.",
        "Shipped two production services solo: an **Alexa integration** service (request-signature verification, OAuth account linking, circuit breakers, its own Terraform IaC and CI/CD) and **EcohomeWeb**, a React 18 + Vite SPA. Also built the **eBay resale marketplace** in the core Express API — listing state machine, scheduled delist workers, and HMAC webhook verification.",
      ],
    },
    {
      role: "Senior Software Developer",
      company: "Comviva",
      loc: "Bengaluru, India",
      when: "May 2021 — Jul 2023",
      points: [
        "Drove the architectural redesign of the **MobiLytix Loyalty & Rewards** platform — decomposing a monolith into modular **Spring Boot** services along Domain-Driven Design bounded contexts and rebuilding the campaign console as a React SPA. Lifted throughput **60%** and feature delivery **35%**.",
        "Built the service layer on **Spring Data JPA & Hibernate** over PostgreSQL, with Spring Cloud for centralized config and service discovery, Actuator metrics scraped by Prometheus, and Spring Security with **Keycloak** (OAuth 2.0 / JWT) enforcing role-based access across tenants.",
        "Architected event-driven **Kafka** pipelines for asynchronous inter-service communication, reliably processing **700K+** daily transactions at sub-200ms latency.",
        "Migrated the platform from on-prem to **AWS** SaaS — containerizing with Docker and Kubernetes and adding centralized ELK logging, cutting infrastructure cost **40%**.",
        "Led a cross-functional team of five, running architecture reviews and mentoring, and standardized Maven multi-module builds with JUnit/Mockito coverage gates in CI.",
      ],
    },
    {
      role: "Software Developer",
      company: "Comviva",
      loc: "Bengaluru, India",
      when: "Aug 2019 — Apr 2021",
      points: [
        "Built the **Toll-Free Data Access** system — network traffic monitoring in C/C++, Redis-backed session management, and reverse-proxy routing in Node.js, serving zero-rated data access at carrier scale.",
        "Shipped rule evaluation, eligibility logic, and reward fulfillment into the Java + **Spring Boot** campaign rules engine driving personalized reward programs.",
        "Automated CI/CD with **GitLab CI, Jenkins, and SonarQube**, adding API contract tests and BDD — raising deployment frequency **40%** and reducing production errors **30%**.",
        "Instrumented services with **Prometheus and Grafana** for real-time oversight.",
      ],
    },
  ],

  projects: [
    {
      title: "Swarm Intelligence Distributed Database",
      year: "2025",
      desc: "A scalable, fault-tolerant distributed database ingesting 10M+ IoT data points daily via Kafka and MongoDB sharding, with AI-driven query optimization using Ant Colony & Particle Swarm Optimization.",
      repo: "https://github.com/nishalcr/SwarmDB",
      metrics: ["**99.99%** uptime", "**+45%** query perf", "**5×** traffic spikes"],
      stack: ["Kafka", "MongoDB", "Docker Swarm", "Prometheus", "Grafana"],
    },
    {
      title: "NetGuardian AI",
      year: "2024",
      desc: "End-to-end ML pipeline predicting severity of problematic internet use from 10,000+ hours of actigraphy time-series, using autoencoders and ensemble learning tuned with Quadratic Weighted Kappa.",
      metrics: ["**+20%** accuracy", "**90%+** robustness"],
      stack: ["Autoencoders", "scikit-learn", "Time-Series", "Ensemble Models"],
    },
    {
      title: "Serverless Face Recognition",
      year: "2024",
      desc: "An end-to-end serverless pipeline triggered by S3 uploads with Dockerized ffmpeg for frame extraction, deploying ResNet-34 via OpenCV for real-time inference on 1GB+ videos without managing servers.",
      metrics: ["**sub-500ms** / frame", "**+30%** throughput"],
      stack: ["AWS Lambda", "S3", "Docker", "OpenCV", "ResNet-34"],
    },
  ],

  skills: [
    {
      cat: "Languages",
      tags: ["Java", "TypeScript", "JavaScript", "Python", "Go", "C / C++", "SQL", "Bash"],
    },
    {
      cat: "Backend & APIs",
      tags: [
        "Spring Boot",
        "Spring Data JPA",
        "Hibernate",
        "Node.js",
        "Express",
        "FastAPI",
        "REST",
        "GraphQL",
        "gRPC",
        "WebSockets",
      ],
    },
    {
      cat: "Frontend",
      tags: ["React", "Next.js", "Vite", "Vue.js", "Svelte", "Tailwind CSS", "Material UI"],
    },
    {
      cat: "AI / ML",
      tags: [
        "Claude",
        "AWS Bedrock",
        "Gemini",
        "RAG",
        "Prompt Engineering",
        "LLMs",
        "Transformers",
        "PyTorch",
        "TensorFlow",
        "LangChain",
        "scikit-learn",
        "Pandas",
        "NumPy",
        "OpenCV",
      ],
    },
    {
      cat: "Data & Messaging",
      tags: [
        "Kafka",
        "SQS / SNS",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Cassandra",
        "Redis",
        "Elasticsearch",
        "Neo4j",
      ],
    },
    {
      cat: "Cloud & DevOps",
      tags: [
        "AWS",
        "ECS Fargate",
        "Lambda",
        "GCP",
        "Azure",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Ansible",
        "GitHub Actions",
        "GitLab CI",
        "Jenkins",
      ],
    },
    {
      cat: "Testing & Auth",
      tags: [
        "Maven",
        "JUnit",
        "Mockito",
        "Jest",
        "Vitest",
        "pytest",
        "SonarQube",
        "Keycloak",
        "OAuth 2.0",
        "JWT",
      ],
    },
    {
      cat: "Observability",
      tags: ["Prometheus", "Grafana", "ELK", "Kibana", "CloudWatch"],
    },
  ],

  education: [
    {
      deg: "M.S. Computer Science",
      school: "Arizona State University",
      when: "2025",
      extra: "GPA 3.77",
    },
    {
      deg: "B.E. Computer Science",
      school: "Bangalore Institute of Technology",
      when: "2019",
      extra: "GPA 3.8",
    },
  ],
};
