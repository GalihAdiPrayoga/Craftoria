"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Paintbrush2, ShieldCheck, HandHeart, Sparkles, Zap, Users } from "lucide-react";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-cream px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-navy/50">
      {children}
    </span>
  );
}

const missions = [
  {
    icon: Paintbrush2,
    title: "Solusi Desain Kustom",
    description: "Menerjemahkan ide, logo, atau tema acara klien ke dalam produk suvenir yang rapi dan berkarakter.",
  },
  {
    icon: ShieldCheck,
    title: "Kualitas Terjaga",
    description: "Bahan pilihan dan kualitas cetak bersih di setiap produk, demi kepuasan penerima hadiah.",
  },
  {
    icon: HandHeart,
    title: "Pelayanan Fleksibel",
    description: "Konsultasi mudah dan adaptasi produk sesuai anggaran serta kebutuhan unik setiap acara.",
  },
];

const reasons = [
  {
    icon: Paintbrush2,
    no: "01",
    title: "Flexible Custom Design",
    description: "Desain motif, warna, hingga tulisan ucapan bisa didiskusikan bersama agar sempurna.",
  },
  {
    icon: Sparkles,
    no: "02",
    title: "Modern Aesthetic",
    description: "Konsep simpel, bersih, dan kekinian yang selalu relevan dengan selera pasar terkini.",
  },
  {
    icon: Users,
    no: "03",
    title: "Friendly Service",
    description: "Menemani Anda dari draf ide, pemilihan sampel, hingga produk siap dikemas.",
  },
];

export function AboutSection() {
  return (
    <>
      {/* ── Tentang Kami ── */}
      <section id="about" className="scroll-mt-20 bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel>Tentang Kami</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Studio kreatif souvenir &amp; merchandise
              </h2>
              <p className="mt-5 text-base leading-8 text-navy/50">
                Craftoria.co hadir sebagai mitra untuk mewujudkan kebutuhan
                souvenir, hadiah, kado personal, hingga merchandise event yang
                fungsional, minimalis, dan bernilai estetika tinggi — melalui
                pendekatan desain yang personal dan teknik cetak digital modern.
              </p>
            </div>
          </FadeUp>

          {/* Feature strip */}
          <FadeUp delay={0.15}>
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: Zap, label: "Proses Cepat", sub: "Estimasi sesuai deadline" },
                { icon: ShieldCheck, label: "Kualitas Premium", sub: "Bahan pilihan terbaik" },
                { icon: Paintbrush2, label: "100% Kustom", sub: "Sesuai konsep Anda" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="flex items-center gap-4 rounded-2xl border border-navy/8 bg-cream-light p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy">
                      <Icon className="h-5 w-5 text-cream" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">{f.label}</p>
                      <p className="text-xs text-navy/50">{f.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="vision-mission" className="scroll-mt-20 bg-cream-light py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel>Visi &amp; Misi</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Arah dan komitmen kami
              </h2>
            </div>
          </FadeUp>

          {/* Visi — full-width dark card */}
          <FadeUp delay={0.12}>
            <div className="relative mt-12 overflow-hidden rounded-3xl bg-navy p-10 text-center lg:p-14">
              {/* decorative ring */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/5" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-white/5" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/25">
                Visi
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-xl font-semibold leading-8 text-white/80 lg:text-2xl">
                Menjadi studio kreatif andalan dalam penyediaan souvenir dan
                merchandise yang estetik, solutif, dan menyenangkan bagi setiap
                klien.
              </p>
            </div>
          </FadeUp>

          {/* Misi cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeUp key={m.title} delay={0.08 * i}>
                  <div className="h-full rounded-2xl border border-navy/8 bg-white p-7 transition-shadow duration-200 hover:shadow-lg">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cream">
                      <Icon className="h-5 w-5 text-navy/70" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-navy">{m.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy/55">{m.description}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Kenapa Kami ── */}
      <section id="why-us" className="scroll-mt-20 bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel>Kenapa Memilih Kami</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Souvenir terbaik dimulai dari sini
              </h2>
              <p className="mt-4 text-base leading-7 text-navy/50">
                Pengalaman pembuatan souvenir yang personal, dari konsultasi
                hingga produk selesai.
              </p>
            </div>
          </FadeUp>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <FadeUp key={r.title} delay={0.08 * i}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-navy/8 bg-cream-light p-8 transition-shadow duration-200 hover:shadow-lg"
                  >
                    {/* Number watermark */}
                    <span className="absolute right-5 top-4 text-5xl font-black text-navy/5 select-none">
                      {r.no}
                    </span>
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-navy/70" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-navy">{r.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy/55">{r.description}</p>
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
