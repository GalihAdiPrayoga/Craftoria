"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Paintbrush2, ShieldCheck, HandHeart, Sparkles, Zap, Users } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true
        }
      }
    );
  }, [delay]);

  return (
    <div ref={ref} className={`opacity-0 ${className ?? ""}`}>
      {children}
    </div>
  );
}

function SectionLabel({ no, title }: { no: string; title: string }) {
  return (
    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-navy/40 mb-8">
      <span>{no}</span>
      <span className="h-px w-8 bg-navy/20" />
      <span>{title}</span>
    </div>
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
      <section id="about" className="scroll-mt-20 bg-cream-light py-32 lg:py-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <FadeUp>
                <SectionLabel no="01" title="ABOUT" />
                <p className="mt-8 font-serif text-3xl md:text-4xl leading-snug text-navy">
                  Studio kreatif souvenir &amp; merchandise
                </p>
              </FadeUp>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 text-lg leading-relaxed text-navy/70 font-sans border-t border-navy/10 pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10">
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
          <FadeUp delay={0.2} className="mt-24 lg:mt-32">
            <div className="grid grid-cols-1 border-y border-navy/10 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-navy/10">
              {[
                { icon: Zap, label: "Proses Cepat", sub: "Estimasi presisi sesuai timeline" },
                { icon: ShieldCheck, label: "Kualitas Premium", sub: "Bahan pilihan, qc ketat" },
                { icon: Paintbrush2, label: "100% Kustom", sub: "Desain eksklusif milik Anda" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="flex flex-col items-start gap-4 py-8 sm:px-8 first:sm:pl-0 last:sm:pr-0"
                  >
                    <Icon className="h-6 w-6 text-navy/40" strokeWidth={1} />
                    <div>
                      <p className="font-serif text-lg font-medium text-navy">{f.label}</p>
                      <p className="mt-1 text-sm text-navy/50 font-sans">{f.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="vision-mission" className="scroll-mt-20 bg-white py-32 lg:py-40 border-t border-navy/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <FadeUp>
                  <SectionLabel no="02" title="VISION & MISSION" />
                  <p className="mt-8 font-serif text-3xl md:text-4xl leading-snug text-navy">
                    Arah dan komitmen kami
                  </p>
                  <div className="mt-12">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy/40 mb-4">
                      Visi Utama
                    </p>
                    <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed text-navy border-l-2 border-navy/10 pl-6">
                      Menjadi studio kreatif andalan dalam penyediaan souvenir dan
                      merchandise yang estetik, solutif, dan menyenangkan bagi setiap
                      klien.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:mt-24 space-y-12">
              {missions.map((m, i) => {
                const Icon = m.icon;
                return (
                  <FadeUp key={m.title} delay={0.1 * i}>
                    <div className="flex gap-6 items-start">
                      <div className="mt-1">
                        <Icon className="h-6 w-6 text-navy/30" strokeWidth={1} />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-navy">
                          {m.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-navy/60 font-sans">
                          {m.description}
                        </p>
                      </div>
                    </div>
                    {i !== missions.length - 1 && (
                      <div className="mt-12 h-px w-full bg-navy/5" />
                    )}
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Kenapa Kami ── */}
      <section id="why-us" className="scroll-mt-20 bg-cream-light py-32 lg:py-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <FadeUp>
                <SectionLabel no="03" title="WHY US" />
                <p className="mt-8 font-serif text-3xl md:text-4xl leading-snug text-navy">
                  Souvenir terbaik dimulai dari sini
                </p>
                <p className="mt-6 text-lg leading-relaxed text-navy/60 font-sans">
                  Pengalaman pembuatan souvenir yang personal, dari konsultasi pertama 
                  hingga produk eksklusif siap melengkapi momen berharga Anda.
                </p>
              </FadeUp>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid gap-12">
                {reasons.map((r, i) => {
                  return (
                    <FadeUp 
                      key={r.title} 
                      delay={0.1 * i} 
                    >
                      <div className="group relative flex gap-8 items-start pb-12 border-b border-navy/10 last:border-b-0 last:pb-0">
                        <span className="font-mono text-sm font-bold text-navy/20 pt-1">
                          {r.no}
                        </span>
                        <div>
                          <h4 className="font-serif text-2xl text-navy">
                            {r.title}
                          </h4>
                          <p className="mt-3 text-base leading-relaxed text-navy/60 font-sans">
                            {r.description}
                          </p>
                        </div>
                      </div>
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
