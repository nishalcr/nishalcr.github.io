"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeCtxValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeCtx = createContext<ThemeCtxValue>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialise to the SSR-safe default so the first client render matches the
  // server HTML (no hydration mismatch). The inline no-flash script in the
  // layout has already set the *visual* theme on <html> before paint.
  const [theme, setThemeState] = useState<Theme>("dark");

  // After mount, sync React state to whatever the no-flash script decided.
  useEffect(() => {
    const dom = (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    if (dom !== theme) setThemeState(dom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply + persist on every explicit change (also covers the initial sync).
  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("ncr-theme", t);
    } catch {
      /* ignore */
    }
  };

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
