"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import type { GalleryImage } from "@/data/gallery";
import { site } from "@/data/site";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

/**
 * ORGANISM — Lightbox
 * Overlay fullscreen untuk memperbesar foto gallery.
 * - Navigasi wrap (item terakhir→pertama). Keyboard: Esc tutup, kiri/kanan navigasi.
 * - Counter posisi foto (X / Y).
 * - Entrance/exit animation pada gambar.
 * - CTA WhatsApp per produk.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const total = images.length;
  const current = images[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (!current) return null;

  /* Build WhatsApp URL with product context from alt text */
  const waText = encodeURIComponent(
    `Halo Craftoria! Saya tertarik dengan produk ini: "${current.alt}". Bisa bantu info harga & cara pemesanan?`
  );
  const waUrl = `https://wa.me/${site.whatsappNumber}?text=${waText}`;

  return (
    /* Backdrop */
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau foto produk"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-navy/92 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* ── Top bar: close + counter ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Counter */}
        <span className="font-display text-sm font-semibold tabular-nums text-white/40 select-none">
          {index + 1} / {total}
        </span>

        {/* Close */}
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="flex items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* ── Prev button ── */}
      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* ── Image with entrance animation ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative mx-16 max-h-[75vh] w-auto max-w-[88vw]"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={1200}
            height={1200}
            sizes="90vw"
            className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Next button ── */}
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* ── Bottom: product alt + WhatsApp CTA ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Product name (from alt) */}
        <p className="text-sm text-white/45 font-sans text-center sm:text-left line-clamp-1 max-w-xs">
          {current.alt}
        </p>

        {/* CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all duration-200 shrink-0"
        >
          <FaWhatsapp className="h-4 w-4" />
          Tanya Harga Produk Ini
        </a>
      </div>
    </motion.div>
  );
}
