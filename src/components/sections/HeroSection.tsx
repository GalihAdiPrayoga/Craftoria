import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/ui/Icons";

/**
 * Hero Section — headline utama, tagline, dan dual CTA.
 * ID: #hero (scroll target dari logo Navbar).
 */
export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-cream-light">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cream opacity-60" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cream opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-navy/50">
          {site.tagline}
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl md:text-6xl">
          Souvenir &amp; merchandise yang{" "}
          <span className="text-navy/70">estetik</span>,{" "}
          <span className="text-navy/70">fungsional</span>, dan{" "}
          <span className="text-navy/70">personal</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-navy/60 sm:text-lg">
          {site.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Konsultasi Sekarang
          </Button>

          <Button variant="outline" href="#categories">
            <ArrowRightIcon className="h-4 w-4" />
            Lihat Katalog
          </Button>
        </div>
      </div>
    </section>
  );
}
