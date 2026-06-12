"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { MessageCircle, ChevronDown } from "lucide-react";

/**
 * Hero Section — client component agar Framer Motion dapat berjalan.
 * Headline, tagline, dual CTA. id="hero" sebagai scroll target.
 */
export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-cream-light">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cream opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cream opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-28 text-center sm:px-6 lg:py-44">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-navy/40"
        >
          {site.tagline}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Souvenir &amp; merchandise{" "}
          <br className="hidden sm:block" />
          <span className="text-navy/40">estetik, fungsional, personal.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-navy/50 sm:text-lg"
        >
          {site.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Konsultasi Sekarang
          </motion.a>

          <motion.a
            href="#categories"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
          >
            Lihat Katalog
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-navy/20" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
