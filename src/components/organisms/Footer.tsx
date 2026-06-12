import { site } from "@/data/site";
import { MapPin, Phone, AtSign, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { buildWhatsAppLink } from "@/utils/whatsapp";

const navLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Visi & Misi", href: "#vision-mission" },
  { label: "Kenapa Kami", href: "#why-us" },
  { label: "Produk", href: "#categories" },
];

const socialLinks = [
  { label: "Instagram", href: site.instagram },
  { label: "TikTok", href: site.tiktok },
  { label: "Shopee", href: site.shopeeUrl },
];

/**
 * ORGANISM — Footer
 * Assembles: CTA band + 4-col dark footer using Button atom.
 * id="contact" — scroll target dari navItems.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact">
      {/* ── CTA band ── */}
      <div className="bg-cream-light">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-navy px-8 py-14 sm:px-14">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/25">
                  Mulai dari sini
                </p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  Punya ide souvenir? <br />
                  Mari wujudkan bersama.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/45">
                  Konsultasi gratis via WhatsApp — kami siap membantu dari konsep
                  hingga produk siap dibagikan.
                </p>
              </div>
              <Button
                variant="whatsapp"
                size="lg"
                icon={ArrowUpRight}
                iconPosition="right"
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                Chat WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer dark ── */}
      <div className="bg-navy-mid text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-serif text-lg font-bold tracking-tight">
                {site.name}
              </p>
              <p className="mt-2.5 text-sm leading-7 text-white/40">
                Studio kreatif souvenir &amp; merchandise di Mojokerto, Jawa
                Timur. Fungsional, estetik, personal.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/50">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-white/20" strokeWidth={1.5} />
                  {site.phoneDisplay}
                </li>
                <li className="flex items-center gap-2.5">
                  <AtSign className="h-4 w-4 shrink-0 text-white/20" strokeWidth={1.5} />
                  @craftoria.co
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/20" strokeWidth={1.5} />
                  {site.location}
                </li>
              </ul>
            </div>

            {/* Nav */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/20">
                Navigasi
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-white/50 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/20">
                Temukan Kami
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {socialLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/50 transition-colors hover:text-white"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-40" strokeWidth={2} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote */}
            <div className="hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/20">
                Moto
              </p>
              <p className="mt-5 font-serif text-sm italic leading-8 text-white/35">
                &ldquo;Setiap acara layak dikenang lewat souvenir yang bermakna.&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
            <p className="text-xs text-white/20">
              © {year} {site.name}. Seluruh hak cipta dilindungi.
            </p>
            <p className="text-xs text-white/15">
              Made with care · {site.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
