/* Résumé data — Nishal Chandra Reddy */

export interface MetaItem {
  k: string;
  v: string;
}

export interface About {
  lead: string;
  body: string[];
}

export interface Job {
  role: string;
  company: string;
  loc: string;
  when: string;
  points: string[];
}

export interface ProjectMetric {
  t: string;
}

export interface Project {
  title: string;
  year: string;
  desc: string;
  metrics: ProjectMetric[];
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
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  resume: string;
  meta: MetaItem[];
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
  role: "Full Stack Developer",
  role2: "AI / ML Enthusiast",
  email: "nishalcr@gmail.com",
  phone: "+1 602 393 8973",
  location: "United States",
  linkedin: "https://www.linkedin.com/in/nishalcr",
  github: "https://github.com/nishalcr",
  resume: "/uploads/Resume_Nishal_C_R-e45ae100.pdf",

  meta: [
    { k: "Experience", v: "4 years" },
    { k: "Focus", v: "Distributed systems · AI" },
    { k: "Based in", v: "United States" },
    { k: "Status", v: "Open to opportunities" },
  ],

  about: {
    lead: "Full Stack Developer with 4 years of experience architecting and shipping scalable web applications, microservices, and APIs — end to end.",
    body: [
      "I specialize in building production-grade distributed systems and cloud-native solutions with Spring Boot, Node.js, and React, and in integrating AI/ML technologies where they deliver measurable business impact.",
      "A recent Master's graduate in Computer Science from Arizona State University, I bring deep expertise in machine learning and data engineering, with a proven track record of delivering reliable, high-performance software at scale.",
    ],
  },

  experience: [
    {
      role: "Software Developer",
      company: "Ecohome.one",
      loc: "Remote · US",
      when: "Aug 2025 — Present",
      points: [
        "Built and optimized scalable full-stack systems and RESTful APIs with <b>Node.js, React, MongoDB, AWS</b> and Cloudflare for seamless frontend–backend integration.",
        "Integrated AI and LLM models to automate workflows and deliver personalized user experiences.",
        "Architected cloud-native microservices for scalability and cost efficiency, cutting infrastructure spend by <b>25%</b>.",
        "Collaborated across functions to ship production-ready, user-centric solutions on schedule.",
      ],
    },
    {
      role: "Senior Software Developer",
      company: "Comviva",
      loc: "Bengaluru, India",
      when: "May 2021 — Jul 2023",
      points: [
        "Directed a cross-functional team of five — mentoring, running architecture reviews, and aligning engineering with product, lifting velocity <b>25%</b> and code quality <b>30%</b>.",
        "Led the architectural redesign of the MobiLytix Loyalty & Rewards platform with Domain-Driven Design, boosting throughput <b>60%</b> and feature delivery <b>35%</b>.",
        "Architected event-driven <b>Kafka</b> pipelines reliably processing <b>700K+</b> daily transactions at sub-200ms latency, improving consistency <b>50%</b>.",
        "Migrated on-prem infra to SaaS cloud on <b>AWS</b> with centralized ELK logging — cutting costs <b>40%</b> and speeding incident resolution <b>80%</b>.",
      ],
    },
    {
      role: "Software Developer",
      company: "Comviva",
      loc: "Bengaluru, India",
      when: "Aug 2019 — Apr 2021",
      points: [
        "Delivered new features for the campaign rules engine, enabling personalized reward programs and raising engagement <b>20%</b>.",
        "Enhanced the Toll-Free Data Access system with C/C++ traffic monitoring, Redis session management, and Node.js reverse-proxy logic — improving reliability <b>25%</b>.",
        "Built CI/CD pipelines with GitLab CI, Jenkins, and SonarQube — increasing deployment frequency <b>40%</b> and reducing production errors <b>30%</b>.",
        "Integrated Prometheus and Grafana for real-time oversight, curtailing downtime <b>~35%</b>.",
      ],
    },
  ],

  projects: [
    {
      title: "Swarm Intelligence Distributed Database",
      year: "2024",
      desc: "A scalable, fault-tolerant distributed database ingesting 10M+ IoT data points daily via Kafka and MongoDB sharding, with AI-driven query optimization using Ant Colony & Particle Swarm Optimization.",
      metrics: [
        { t: "99.99% uptime" },
        { t: "+45% query perf" },
        { t: "5× traffic spikes" },
      ],
      stack: ["Kafka", "MongoDB", "Docker Swarm", "Prometheus", "Grafana"],
    },
    {
      title: "NetGuardian AI",
      year: "2024",
      desc: "End-to-end ML pipeline predicting severity of problematic internet use from 10,000+ hours of actigraphy time-series, using autoencoders and ensemble learning tuned with Quadratic Weighted Kappa.",
      metrics: [
        { t: "+20% accuracy" },
        { t: "90%+ robustness" },
      ],
      stack: ["Autoencoders", "scikit-learn", "Time-Series", "Ensemble Models"],
    },
    {
      title: "Serverless Face Recognition",
      year: "2024",
      desc: "An end-to-end serverless pipeline triggered by S3 uploads with Dockerized ffmpeg for frame extraction, deploying ResNet-34 via OpenCV for real-time inference on 1GB+ videos without managing servers.",
      metrics: [
        { t: "sub-500ms / frame" },
        { t: "+30% throughput" },
      ],
      stack: ["AWS Lambda", "S3", "Docker", "OpenCV", "ResNet-34"],
    },
  ],

  skills: [
    { cat: "Languages", tags: ["Python", "Java", "JavaScript", "TypeScript", "Go", "C / C++", "Bash"] },
    { cat: "Frameworks", tags: ["Spring Boot", "Node.js", "FastAPI", "React", "Next.js", "Vue.js", "Svelte", "GraphQL", "gRPC", "WebSockets"] },
    { cat: "Cloud & DevOps", tags: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible", "GitHub Actions", "Jenkins", "Keycloak", "OAuth 2.0"] },
    { cat: "AI / ML & Data", tags: ["LLMs", "Transformers", "TensorFlow", "PyTorch", "LangChain", "Pandas", "NumPy", "OpenCV"] },
    { cat: "Databases", tags: ["PostgreSQL", "MySQL", "Cassandra", "MongoDB", "Neo4j", "Redis", "Elasticsearch"] },
    { cat: "Observability", tags: ["Kafka", "Prometheus", "Grafana", "Kibana", "ELK Stack", "SonarQube"] },
  ],

  education: [
    { deg: "M.S. Computer Science", school: "Arizona State University", when: "2025", extra: "GPA 3.77" },
    { deg: "B.E. Computer Science", school: "Bangalore Institute of Technology", when: "2019", extra: "GPA 3.8" },
  ],
};
