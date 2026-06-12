import { site } from "@/data/site";
import { MapPin, Phone, AtSign } from "lucide-react";

/**
 * Footer — Server Component, 3-kolom grid.
 * id="contact" sebagai anchor target dari navItems.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "Instagram", href: site.instagram },
    { label: "TikTok", href: site.tiktok },
    { label: "Shopee", href: site.shopeeUrl },
  ];

  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand & deskripsi */}
          <div>
            <p className="text-lg font-bold tracking-tight">{site.name}</p>
            <p className="mt-3 text-sm leading-7 text-white/50">
              Studio kreatif penyedia souvenir &amp; merchandise yang estetik,
              fungsional, dan personal untuk berbagai acara di Indonesia.
            </p>
          </div>

          {/* Kontak & lokasi */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Kontak
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />
                {site.phoneDisplay}
              </li>
              <li className="flex items-center gap-2">
                <AtSign className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />
                @craftoria.co
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />
                {site.location}
              </li>
            </ul>
          </div>

          {/* Sosial & e-commerce */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Temukan Kami
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & copyright */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-white/30">
            © {currentYear} {site.name} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
