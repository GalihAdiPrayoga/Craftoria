"use client";
import { useEffect, useState } from "react";

/**
 * ATOM — ScrollProgressBar
 * Thin gradient line fixed at the very top of the viewport.
 * Fills left-to-right as the user scrolls down the page.
 * z-[60] → sits above the Navbar (z-50).
 */
export function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setPct(max > 0 ? (scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      role="presentation"
      className="fixed top-0 left-0 z-60 h-[2px] pointer-events-none"
      style={{
        width: `${pct}%`,
        background: "linear-gradient(90deg, #f4edd9 0%, #faf7f2 50%, #f4edd9 100%)",
      }}
    />
  );
}
