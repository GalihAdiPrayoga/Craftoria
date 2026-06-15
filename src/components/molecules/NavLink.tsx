import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  scrolled?: boolean;
};

/**
 * MOLECULE — NavLink
 * Tautan navigasi dengan animasi underline slide-in saat hover.
 * Digunakan di Navbar desktop.
 */
export function NavLink({ href, children, onClick, className, scrolled = true }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative text-sm font-medium transition-colors duration-200",
        scrolled 
          ? "text-navy/65 hover:text-navy" 
          : "text-white/70 hover:text-white",
        className
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full",
          scrolled ? "bg-navy" : "bg-white"
        )} 
      />
    </a>
  );
}
