"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { MessageCircle, ArrowDown, Sparkles } from "lucide-react";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-navy">
      {/* ── Gradient mesh background ── */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-navy-mid opacity-80 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-navy-soft opacity-60 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream opacity-5 blur-3xl" />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f4edd9 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:py-48">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {site.tagline}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto max-w-4xl text-center"
        >
          <Heading level="h1" className="text-white">
            Souvenir &amp; merchandise{" "}
            <span className="text-cream/80">yang berkesan</span>
          </Heading>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-white/70 sm:text-xl font-sans"
        >
          Studio kreatif Mojokerto — dari ide hingga produk siap dibagikan.
          Estetik, fungsional, personal.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            variant="whatsapp"
            size="lg"
            icon={MessageCircle}
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto hover:scale-105"
          >
            Konsultasi Gratis
          </Button>

          <Button
            variant="outline"
            size="lg"
            href="#categories"
            className="w-full sm:w-auto text-white border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:text-white"
          >
            Lihat Katalog
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mt-24 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl"
        >
          {[
            { val: "500+", label: "Pesanan Selesai" },
            { val: "3", label: "Kategori Produk" },
            { val: "100%", label: "Kustom Design" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1.5 bg-navy/60 px-4 py-8 text-center backdrop-blur-md"
            >
              <span className="font-serif text-3xl font-black text-white sm:text-4xl">
                {s.val}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60 sm:text-xs">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6 text-white/40" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
