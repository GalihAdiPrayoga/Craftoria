"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Paintbrush, BadgeCheck, HeartHandshake, Sparkles } from "lucide-react";

/**
 * About Section (client) — fade-in-up on scroll via useInView.
 * 3 sub-sections: #about, #vision-mission, #why-us.
 * Anchor IDs harus cocok persis dengan navItems di site.ts.
 */

const missions = [
  {
    title: "Solusi Desain Kustom",
    description:
      "Membantu menerjemahkan ide, logo, atau tema acara klien ke dalam bentuk produk suvenir secara rapi.",
    icon: Paintbrush,
  },
  {
    title: "Kualitas yang Terjaga",
    description:
      "Memastikan setiap detail produk menggunakan bahan pilihan dan kualitas cetak yang bersih demi kepuasan penerima hadiah.",
    icon: BadgeCheck,
  },
  {
    title: "Pelayanan yang Fleksibel",
    description:
      "Memberikan kemudahan konsultasi dan adaptasi produk sesuai anggaran serta kebutuhan unik di setiap acara.",
    icon: HeartHandshake,
  },
];

const reasons = [
  {
    title: "Flexible Custom Design",
    description:
      "Desain motif, warna, hingga tulisan ucapan bisa didiskusikan bersama agar pas dengan konsep acara Anda.",
    icon: Paintbrush,
  },
  {
    title: "Modern Aesthetic",
    description:
      "Kami menyukai konsep desain yang simpel, bersih, dan kekinian yang cocok dengan selera pasar saat ini.",
    icon: Sparkles,
  },
  {
    title: "Friendly Service",
    description:
      "Kami siap menemani Anda dari draf diskusi ide, pemilihan sampel produk, hingga produk siap dikemas.",
    icon: HeartHandshake,
  },
];

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <>
      {/* ── Tentang Kami ── */}
      <section id="about" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy/40">
                Tentang Kami
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Studio kreatif souvenir &amp; merchandise
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-8 text-navy/60">
              <p>
                Craftoria.co adalah studio kreatif yang bergerak di bidang
                penyediaan Souvenir &amp; Merchandise. Kami hadir sebagai mitra
                untuk mewujudkan kebutuhan souvenir, hadiah, kado personal, hingga
                merchandise event yang fungsional, minimalis, dan bernilai
                estetika tinggi.
              </p>
              <p>
                Melalui pendekatan desain yang dikurasi secara khusus (personalized
                touch) dan pemanfaatan teknik cetak digital, kami fokus menciptakan
                serta menyediakan produk souvenir dan merchandise untuk berbagai
                acara.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="vision-mission" className="scroll-mt-20 bg-cream-light py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy/40">
                Visi &amp; Misi
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Arah dan komitmen kami
              </h2>
            </div>
          </FadeUp>

          {/* Visi card */}
          <FadeUp delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-navy p-10 text-center text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                Visi
              </p>
              <p className="mt-4 text-lg leading-8 text-white/80">
                Menjadi studio kreatif andalan dalam penyediaan souvenir dan
                merchandise yang estetik, solutif, dan menyenangkan bagi setiap
                klien.
              </p>
            </div>
          </FadeUp>

          {/* Misi cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {missions.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeUp key={m.title} delay={0.1 + i * 0.08}>
                  <div className="h-full rounded-2xl border border-navy/8 bg-white p-6 transition-shadow duration-200 hover:shadow-md">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cream">
                      <Icon className="h-5 w-5 text-navy/70" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-navy">{m.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy/60">
                      {m.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Kenapa Memilih Kami ── */}
      <section id="why-us" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy/40">
                Kenapa Memilih Kami
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Souvenir, cara terbaik menyampaikan apresiasi
              </h2>
              <p className="mt-4 text-base leading-7 text-navy/50">
                Craftoria.co menawarkan pengalaman pembuatan souvenir yang
                personal dan menyenangkan.
              </p>
            </div>
          </FadeUp>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <FadeUp key={r.title} delay={0.08 * i}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-full rounded-2xl bg-cream-light p-7"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-navy/70" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-navy">{r.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy/60">
                      {r.description}
                    </p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
