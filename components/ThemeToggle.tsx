"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
    >
      <span className="ico">{theme === "dark" ? "◐" : "◑"}</span>
      <span className="tlabel">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
