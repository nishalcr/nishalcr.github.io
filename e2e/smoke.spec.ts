import { test, expect } from "@playwright/test";

test.describe("portfolio smoke", () => {
  test("renders the hero name and all key sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Nishal");
    for (const id of ["about", "experience", "projects", "skills", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("theme toggle flips data-theme", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const before = await html.getAttribute("data-theme");
    await page.getByRole("button", { name: /toggle colour theme/i }).click();
    await expect(html).not.toHaveAttribute("data-theme", before ?? "");
  });

  test("resume links point to the stable /resume.pdf path", async ({ page }) => {
    await page.goto("/");
    const resume = page.getByRole("link", { name: /resume/i }).first();
    await expect(resume).toHaveAttribute("href", /\/resume\.pdf$/);
  });
});
