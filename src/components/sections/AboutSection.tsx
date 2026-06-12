"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Paintbrush2, ShieldCheck, HandHeart, Sparkles, Zap, Users } from "lucide-react";
import { Heading } from "@/components/atoms/Heading";

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-navy/70 shadow-sm">
      {children}
    </span>
  );
}

const missions = [
  {
    icon: Paintbrush2,
    title: "Solusi Desain Kustom",
    description: "Menerjemahkan ide, logo, atau tema acara klien ke dalam produk suvenir yang rapi dan berkarakter unik.",
  },
  {
    icon: ShieldCheck,
    title: "Kualitas Terjaga",
    description: "Bahan pilihan dan kualitas cetak bersih di setiap produk, demi kepuasan dan apresiasi penerima hadiah.",
  },
  {
    icon: HandHeart,
    title: "Pelayanan Fleksibel",
    description: "Konsultasi santai dan adaptasi produk sesuai anggaran serta kebutuhan tak terduga setiap acara.",
  },
];

const reasons = [
  {
    icon: Paintbrush2,
    no: "01",
    title: "Flexible Custom Design",
    description: "Desain motif, warna, hingga tulisan ucapan bisa didiskusikan secara mendalam bersama kami agar hasilnya sempurna.",
  },
  {
    icon: Sparkles,
    no: "02",
    title: "Modern Aesthetic",
    description: "Konsep yang simpel, bersih, dan kekinian yang selalu terkurasi dan relevan dengan selera pasar terkini.",
  },
  {
    icon: Users,
    no: "03",
    title: "Friendly Service",
    description: "Menemani Anda dari draf ide pertama, pemilihan sampel, hingga produk siap dikemas rapi.",
  },
];

export function AboutSection() {
  return (
    <>
      {/* ── Tentang Kami ── */}
      <section id="about" className="scroll-mt-20 bg-cream-light py-28 lg:py-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-5">
              <FadeUp>
                <SectionLabel>Tentang Kami</SectionLabel>
                <Heading level="h2" className="mt-6 text-navy">
                  Studio kreatif souvenir &amp; merchandise
                </Heading>
              </FadeUp>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 text-lg leading-relaxed text-navy/85 font-sans">
              <FadeUp delay={0.1}>
                <p>
                  Craftoria.co hadir sebagai mitra terpercaya untuk mewujudkan kebutuhan
                  souvenir, kado personal, hingga merchandise event yang
                  fungsional, minimalis, dan bernilai estetika tinggi.
                </p>
                <p className="mt-6">
                  Melalui pendekatan desain yang berkarakter dan teknik cetak digital modern, 
                  kami berkomitmen memberikan hasil akhir yang tak sekadar indah, 
                  tetapi juga mampu bercerita.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Feature strip */}
          <FadeUp delay={0.2} className="mt-20 lg:mt-28">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { icon: Zap, label: "Proses Cepat", sub: "Estimasi presisi sesuai timeline" },
                { icon: ShieldCheck, label: "Kualitas Premium", sub: "Bahan pilihan, qc ketat" },
                { icon: Paintbrush2, label: "100% Kustom", sub: "Desain eksklusif milik Anda" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="flex flex-col items-start gap-4 border-t border-navy/15 pt-6 sm:flex-row sm:items-center sm:gap-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-cream">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-navy">{f.label}</p>
                      <p className="mt-1 text-sm text-navy/65 font-sans">{f.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="vision-mission" className="scroll-mt-20 bg-white py-28 lg:py-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Asymmetric layout */}
          <div className="grid gap-16 lg:grid-cols-12">
            
            {/* Left: Sticky Visi */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <FadeUp>
                  <SectionLabel>Visi &amp; Misi</SectionLabel>
                  <Heading level="h2" className="mt-6 text-navy">
                    Arah dan komitmen kami
                  </Heading>
                  <div className="mt-10 relative overflow-hidden rounded-3xl bg-navy p-10 lg:p-12 shadow-[var(--shadow-card)]">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/5" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                      Visi Utama
                    </p>
                    <p className="mt-5 font-serif text-xl sm:text-2xl font-medium leading-relaxed text-white/90">
                      Menjadi studio kreatif andalan dalam penyediaan souvenir dan
                      merchandise yang estetik, solutif, dan menyenangkan bagi setiap
                      klien.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* Right: Staggered Misi Cards */}
            <div className="lg:col-span-6 lg:col-start-7 lg:mt-24 space-y-8">
              {missions.map((m, i) => {
                const Icon = m.icon;
                return (
                  <FadeUp key={m.title} delay={0.1 * i}>
                    <div className="group rounded-3xl border border-navy/10 bg-cream-light p-8 lg:p-10 transition-shadow hover:shadow-[var(--shadow-card)]">
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6 text-navy" strokeWidth={1.5} />
                      </div>
                      <Heading level="h3" variant="serif" className="text-navy">
                        {m.title}
                      </Heading>
                      <p className="mt-3 text-base leading-relaxed text-navy/75 font-sans">
                        {m.description}
                      </p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Kenapa Kami ── */}
      <section id="why-us" className="relative scroll-mt-20 bg-navy py-28 lg:py-36 text-white overflow-hidden">
        {/* Background texture via CSS gradient for simplicity & reliability */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-5">
              <FadeUp>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
                  Kenapa Memilih Kami
                </span>
                <Heading level="h2" className="mt-6 text-white">
                  Souvenir terbaik dimulai dari sini
                </Heading>
                <p className="mt-6 text-lg leading-relaxed text-white/70 font-sans">
                  Pengalaman pembuatan souvenir yang personal, dari konsultasi pertama 
                  hingga produk eksklusif siap melengkapi momen berharga Anda.
                </p>
              </FadeUp>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid gap-6">
                {reasons.map((r, i) => {
                  const Icon = r.icon;
                  // Stagger effect via translation
                  const isEven = i % 2 === 0;
                  return (
                    <FadeUp 
                      key={r.title} 
                      delay={0.1 * i} 
                      className={isEven ? "lg:mr-12" : "lg:ml-12"}
                    >
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:bg-white/10"
                      >
                        <span className="absolute right-6 top-6 font-serif text-6xl font-black text-white/5 select-none transition-transform group-hover:scale-110">
                          {r.no}
                        </span>
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                          <Icon className="h-6 w-6 text-cream" strokeWidth={1.5} />
                        </div>
                        <Heading level="h4" variant="serif" className="text-white text-xl">
                          {r.title}
                        </Heading>
                        <p className="mt-3 text-sm leading-relaxed text-white/60 font-sans">
                          {r.description}
                        </p>
                      </motion.div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
