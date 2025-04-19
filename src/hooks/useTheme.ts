import * as React from "react";

type ThemeType = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = React.useState<ThemeType>(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("theme") === "dark"
    ) {
      return "dark";
    }
    return "light";
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return [theme, setTheme] as const;
}
