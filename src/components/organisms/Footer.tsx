import { site } from "@/data/site";
import { MapPin, Phone, AtSign, ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";


const navLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Visi & Misi", href: "#vision-mission" },
  { label: "Kenapa Kami", href: "#why-us" },
  { label: "Galeri", href: "#gallery" },
];

const socialLinks = [
  { label: "Instagram", href: site.instagram },
  { label: "TikTok", href: site.tiktok },
  { label: "Shopee", href: site.shopeeUrl },
];

/**
 * ORGANISM — Footer
 * Assembles: wave transition + 4-col dark footer.
 * id="contact" — scroll target dari navItems.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-20">
      {/* Wave transition — sits flush between white section and navy footer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="block w-full -mb-px"
        preserveAspectRatio="none"
      >
        <path
          fill="#1e293b"
          fillOpacity="1"
          d="M0,64L30,101.3C60,139,120,213,180,218.7C240,224,300,160,360,144C420,128,480,160,540,165.3C600,171,660,149,720,133.3C780,117,840,107,900,85.3C960,64,1020,32,1080,42.7C1140,53,1200,107,1260,122.7C1320,139,1380,117,1410,106.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </svg>

      {/* ── Main footer dark ── */}
      <div className="bg-navy-mid text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-sans text-xl font-black tracking-tighter">
                {site.name}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/40">
                Studio kreatif souvenir &amp; merchandise di Mojokerto, Jawa
                Timur. Fungsional, estetik, personal.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/50">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-white/20" strokeWidth={1.5} />
                  <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                    {site.phoneDisplay}
                  </a>
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
