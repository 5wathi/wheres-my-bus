"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const KEY = "wmb:theme";

/**
 * Light/dark theme, persisted in localStorage and applied via the `dark` class
 * on <html>. Defaults to the OS preference on first visit. A small inline
 * script in the layout sets the class before paint to avoid a flash; this hook
 * keeps it in sync afterwards.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Theme | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(KEY, theme);
  }, [theme, ready]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle, ready };
}
