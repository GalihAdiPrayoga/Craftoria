import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { MapPin, Phone, AtSign, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: site.instagram },
  { label: "TikTok", href: site.tiktok },
  { label: "Shopee", href: site.shopeeUrl },
];

const navLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Visi & Misi", href: "#vision-mission" },
  { label: "Kenapa Kami", href: "#why-us" },
  { label: "Produk", href: "#categories" },
];

/**
 * Footer — Server Component, modern multi-column layout.
 * id="contact" sebagai anchor target.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact">
      {/* ── CTA band ── */}
      <div className="bg-cream-light">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-navy px-8 py-12 text-center sm:px-14 lg:flex-row lg:text-left">
            <div className="max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                Mulai sekarang
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Punya ide souvenir? <br className="hidden sm:block" />
                Mari wujudkan bersama.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/45">
                Konsultasi gratis via WhatsApp — kami siap membantu dari konsep
                hingga produk selesai.
              </p>
            </div>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-whatsapp px-8 py-4 text-sm font-bold text-white shadow-lg shadow-whatsapp/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-whatsapp/30"
            >
              Chat WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="bg-navy-mid text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand col */}
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-lg font-extrabold tracking-tight">{site.name}</p>
              <p className="mt-2 text-sm leading-7 text-white/40">
                Studio kreatif souvenir &amp; merchandise di Mojokerto, Jawa Timur.
              </p>
              {/* Contact quick info */}
              <ul className="mt-5 space-y-2.5 text-sm text-white/50">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-white/25" strokeWidth={1.5} />
                  {site.phoneDisplay}
                </li>
                <li className="flex items-center gap-2.5">
                  <AtSign className="h-4 w-4 shrink-0 text-white/25" strokeWidth={1.5} />
                  @craftoria.co
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/25" strokeWidth={1.5} />
                  {site.location}
                </li>
              </ul>
            </div>

            {/* Nav links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/25">
                Navigasi
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-white/50 transition-colors duration-150 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social / e-commerce */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/25">
                Temukan Kami
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {socialLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/50 transition-colors duration-150 hover:text-white"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-40" strokeWidth={2} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tagline/closing col */}
            <div className="hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-widest text-white/25">
                Moto
              </p>
              <p className="mt-4 text-sm leading-7 text-white/40 italic">
                &ldquo;Setiap acara layak dikenang lewat souvenir yang bermakna.&rdquo;
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
            <p className="text-xs text-white/25">
              © {currentYear} {site.name}. Seluruh hak cipta dilindungi.
            </p>
            <p className="text-xs text-white/20">
              Made with care in {site.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
