"use client";

import { usePreferences } from "@/app/providers";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = usePreferences();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="h-10 w-20 rounded-full border border-black/10 bg-white/80 text-sm font-medium text-zinc-900 transition-colors hover:border-brand hover:text-brand dark:border-white/10 dark:bg-white/5 dark:text-white"
    >
      {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
    </button>
  );
}
