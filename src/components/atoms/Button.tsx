import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary-navy"
  | "secondary-cream"
  | "outline"
  | "whatsapp"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
};

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type AsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

/* ── Style maps ── */
const variantMap: Record<ButtonVariant, string> = {
  "primary-navy":
    "bg-navy text-white hover:bg-navy-mid shadow-sm hover:shadow-md",
  "secondary-cream":
    "bg-cream text-navy hover:bg-cream/80 shadow-sm hover:shadow-md",
  outline:
    "border border-navy/20 text-navy bg-transparent hover:bg-navy/5",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp/90 shadow-md hover:shadow-lg shadow-whatsapp/20",
  ghost: "text-navy/70 hover:text-navy hover:bg-navy/5",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs gap-1.5 rounded-full",
  md: "px-6 py-3 text-sm gap-2 rounded-full",
  lg: "px-8 py-4 text-base gap-2.5 rounded-full",
};

const iconSizeMap: Record<ButtonSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

/**
 * ATOM — Button
 * Komponen tombol global dengan variant, size, icon, dan loading state.
 * Render sebagai <a> jika `href` diberikan.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary-navy",
    size = "md",
    icon: Icon,
    iconPosition = "left",
    isLoading = false,
    children,
    className,
    href,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantMap[variant],
    sizeMap[size],
    className
  );

  const content = (
    <>
      {isLoading && (
        <Loader2 className={cn(iconSizeMap[size], "animate-spin")} />
      )}
      {!isLoading && Icon && iconPosition === "left" && (
        <Icon className={iconSizeMap[size]} strokeWidth={2} />
      )}
      {children}
      {!isLoading && Icon && iconPosition === "right" && (
        <Icon className={iconSizeMap[size]} strokeWidth={2} />
      )}
    </>
  );

  if (href !== undefined) {
    const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...linkProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      className={classes}
      disabled={isLoading || buttonProps.disabled}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
