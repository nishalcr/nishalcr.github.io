"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

type Theme = "dark" | "light";

const listeners = new Set<() => void>();

// The DOM (<html data-theme>) is the source of truth — the inline no-flash
// script in layout.tsx sets it before paint. We read it via useSyncExternalStore
// so the client reconciles to the real theme after hydration without a mismatch.
function getSnapshot(): Theme {
  return (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
}

function getServerSnapshot(): Theme {
  return "dark"; // SSR default; the script + client snapshot correct it on load
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("ncr-theme", theme);
  } catch {
    /* ignore (private mode / storage disabled) */
  }
  listeners.forEach((l) => l());
}

interface ThemeCtxValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeCtx = createContext<ThemeCtxValue>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
