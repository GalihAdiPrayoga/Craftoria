import { site } from "@/data/site";

/**
 * Footer — Server Component.
 * Grid minimalis: deskripsi brand, link sosmed, lokasi, dan copyright.
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
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand & deskripsi */}
          <div>
            <p className="text-lg font-bold">{site.name}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {site.tagline} — mewujudkan kebutuhan souvenir, hadiah, dan
              merchandise event yang fungsional, minimalis, dan bernilai
              estetika tinggi.
            </p>
          </div>

          {/* Kontak & lokasi */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Kontak
            </p>
            <dl className="mt-3 space-y-2 text-sm text-white/70">
              <div>
                <dt className="sr-only">Telepon</dt>
                <dd>{site.phoneDisplay}</dd>
              </div>
              <div>
                <dt className="sr-only">Lokasi</dt>
                <dd>{site.location}</dd>
              </div>
            </dl>
          </div>

          {/* Sosial media */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Ikuti Kami
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & copyright */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">
            © {currentYear} {site.name}. Seluruh hak cipta dilindungi. {site.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
