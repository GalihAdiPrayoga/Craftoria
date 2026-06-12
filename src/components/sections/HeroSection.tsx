"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { MessageCircle, ArrowDown, Sparkles } from "lucide-react";

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

      <div className="relative mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:py-44">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {site.tagline}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mx-auto max-w-4xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Souvenir &amp; merchandise{" "}
          <span className="text-cream/70">yang berkesan</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-8 text-white/40 sm:text-lg"
        >
          Studio kreatif Mojokerto — dari ide hingga produk siap dibagikan.
          Estetik, fungsional, personal.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <motion.a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-whatsapp/20 transition-shadow hover:shadow-xl hover:shadow-whatsapp/30"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Konsultasi Gratis
          </motion.a>

          <motion.a
            href="#categories"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          >
            Lihat Katalog
          </motion.a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
        >
          {[
            { val: "500+", label: "Pesanan Selesai" },
            { val: "3", label: "Kategori Produk" },
            { val: "100%", label: "Kustom Design" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-0.5 bg-navy/60 px-4 py-5 text-center backdrop-blur-sm"
            >
              <span className="text-xl font-extrabold text-white sm:text-2xl">
                {s.val}
              </span>
              <span className="text-[11px] font-medium text-white/40 sm:text-xs">
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
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-white/20" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
