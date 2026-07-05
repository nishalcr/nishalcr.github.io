import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RichText } from "@/lib/richtext";

describe("RichText", () => {
  it("renders plain text unchanged, with no <b>", () => {
    const { container } = render(<RichText text="hello world" />);
    expect(container.textContent).toBe("hello world");
    expect(container.querySelector("b")).toBeNull();
  });

  it("wraps a **bold** segment in <b>", () => {
    const { container } = render(<RichText text="cut cost by **40%** total" />);
    const b = container.querySelector("b");
    expect(b?.textContent).toBe("40%");
    expect(container.textContent).toBe("cut cost by 40% total");
  });

  it("handles multiple bold segments", () => {
    const { container } = render(<RichText text="**a** and **b**" />);
    expect(container.querySelectorAll("b")).toHaveLength(2);
  });

  it("never leaks literal asterisks", () => {
    const { container } = render(<RichText text="**x** y **z**" />);
    expect(container.textContent).not.toContain("*");
  });
});
