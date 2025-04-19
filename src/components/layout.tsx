import * as React from "react";
import { Sun, Moon } from "lucide-react";

import { Button } from "./ui/button";
import { useTheme } from "@/hooks/useTheme";

function Layout({ children }: React.PropsWithChildren) {
  const [theme, setTheme] = useTheme();
  const isLight = theme === "light";

  return (
    <div className="flex flex-col">
      <header className="grow-0 shrink-0 flex sticky top-0 bg-background h-16 items-center gap-2 border-b px-4">
        <Button
          data-sidebar="trigger"
          variant="ghost"
          size="icon"
          className={"h-7 w-7"}
          onClick={() => {
            setTheme(isLight ? "dark" : "light");
          }}
        >
          {isLight ? <Moon /> : <Sun />}
          <span className="sr-only">{"Toggle theme"}</span>
        </Button>
      </header>
      <main className="grow-1 shrink-1">{children}</main>
    </div>
  );
}

export default Layout;
