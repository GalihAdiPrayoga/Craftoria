import type { ReactNode, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = {
  /** Konten tombol (teks, icon, dll.) */
  children: ReactNode;
  /** Varian visual tombol */
  variant?: ButtonVariant;
  /** URL tujuan — merender <a> jika disediakan */
  href?: string;
  /** Class Tailwind tambahan */
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-whatsapp text-white hover:bg-whatsapp/90",
  outline: "border border-navy/20 text-navy hover:bg-navy/5",
  ghost: "text-navy/70 hover:text-navy hover:bg-navy/5",
};

/**
 * Tombol fleksibel — mendukung 3 varian (primary/outline/ghost).
 * Merender <a> jika href diberikan, cocok untuk link WhatsApp.
 */
export function Button({
  children,
  variant = "primary",
  href,
  className,
  ...rest
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className ?? ""}`;

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
