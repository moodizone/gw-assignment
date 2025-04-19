"use client";
import React from "react";

// based on tailwind breakpoint
const breakpoint = 768;

function isDesktop(): boolean {
  if (typeof window === "undefined") {
    return false; // Default to false if window is not defined
  }
  return window.innerWidth >= breakpoint;
}

export function useDesktop(debounce = 500): boolean {
  const [is, setIs] = React.useState<boolean>(isDesktop());

  // execute on resizing
  React.useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIs(isDesktop());
      }, debounce);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debounce]);

  return is;
}
