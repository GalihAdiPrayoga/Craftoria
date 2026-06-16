import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  scrolled?: boolean;
  /** If true, underline is always visible (scroll spy active section). */
  isActive?: boolean;
};

/**
 * MOLECULE — NavLink
 * Tautan navigasi dengan animasi underline slide-in saat hover.
 * Prop `isActive` dari scroll spy di Navbar menampilkan underline permanen saat section aktif.
 * Digunakan di Navbar desktop.
 */
export function NavLink({
  href,
  children,
  onClick,
  className,
  scrolled = true,
  isActive = false,
}: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative text-sm font-medium transition-colors duration-200",
        scrolled
          ? isActive
            ? "text-navy"
            : "text-navy/65 hover:text-navy"
          : isActive
          ? "text-white"
          : "text-white/70 hover:text-white",
        className
      )}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px transition-all duration-300",
          /* Active: full width always. Hover: expand on group-hover. */
          isActive ? "w-full" : "w-0 group-hover:w-full",
          scrolled ? "bg-navy" : "bg-white"
        )}
      />
    </a>
  );
}
