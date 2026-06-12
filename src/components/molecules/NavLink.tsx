import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 * MOLECULE — NavLink
 * Tautan navigasi dengan animasi underline slide-in saat hover.
 * Digunakan di Navbar desktop.
 */
export function NavLink({ href, children, onClick, className }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative text-sm font-medium text-navy/65 transition-colors duration-200 hover:text-navy",
        className
      )}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-navy transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
