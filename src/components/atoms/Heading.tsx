import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingVariant = "serif" | "sans";

type HeadingProps = {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  children: React.ReactNode;
  className?: string;
};

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight",
  h2: "text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight",
  h3: "text-xl sm:text-2xl font-bold leading-snug",
  h4: "text-base sm:text-lg font-semibold leading-snug",
};

/**
 * ATOM — Heading
 * Tipografi global. variant="serif" → Playfair Display editorial.
 * variant="sans" → Open Sans (default body weight).
 */
export function Heading({
  level = "h2",
  variant = "serif",
  children,
  className,
}: HeadingProps) {
  const Tag = level;

  return (
    <Tag
      className={cn(
        levelStyles[level],
        variant === "serif" ? "font-serif" : "font-sans",
        className
      )}
    >
      {children}
    </Tag>
  );
}
