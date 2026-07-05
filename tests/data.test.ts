import { describe, it, expect } from "vitest";
import { PORTFOLIO } from "@/lib/data";

describe("portfolio data integrity", () => {
  it("has core identity fields", () => {
    expect(PORTFOLIO.name).toBeTruthy();
    expect(PORTFOLIO.email).toMatch(/@/);
    expect(PORTFOLIO.resume).toBe("/resume.pdf");
  });

  it("every project has title, description, metrics, and stack", () => {
    for (const p of PORTFOLIO.projects) {
      expect(p.title).toBeTruthy();
      expect(p.desc.length).toBeGreaterThan(10);
      expect(p.metrics.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it("project links, when present, are https URLs", () => {
    for (const p of PORTFOLIO.projects) {
      if (p.repo) expect(p.repo).toMatch(/^https:\/\//);
      if (p.demo) expect(p.demo).toMatch(/^https:\/\//);
    }
  });

  it("every job has role, company, and at least one bullet", () => {
    for (const j of PORTFOLIO.experience) {
      expect(j.role).toBeTruthy();
      expect(j.company).toBeTruthy();
      expect(j.points.length).toBeGreaterThan(0);
    }
  });

  it("bold markers are balanced (even count of ** in every content string)", () => {
    const strings = [
      ...PORTFOLIO.experience.flatMap((j) => j.points),
      ...PORTFOLIO.projects.flatMap((p) => p.metrics),
      ...PORTFOLIO.about.body,
    ];
    for (const s of strings) {
      const count = (s.match(/\*\*/g) ?? []).length;
      expect(count % 2, `unbalanced ** in: ${s}`).toBe(0);
    }
  });
});
