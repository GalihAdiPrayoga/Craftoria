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
    
    const ctx = gsap.context(() => {
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
    }, ref);

    return () => ctx.revert();
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
      <section id="about" className="relative z-20 scroll-mt-20 bg-cream-light py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <FadeUp>
                <SectionLabel no="01" title="ABOUT" />
                <p className="font-serif text-3xl md:text-4xl leading-snug text-navy">
                  Studio kreatif souvenir &amp; merchandise
                </p>
              </FadeUp>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 text-base leading-relaxed text-navy/65 font-sans border-t border-navy/10 pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10">
              <FadeUp delay={0.1}>
                <p>
                  Craftoria.co hadir sebagai mitra terpercaya untuk mewujudkan kebutuhan
                  souvenir, kado personal, hingga merchandise event yang
                  fungsional, minimalis, dan bernilai estetika tinggi.
                </p>
                <p className="mt-5">
                  Melalui pendekatan desain yang berkarakter dan teknik cetak digital modern, 
                  kami berkomitmen memberikan hasil akhir yang tak sekadar indah, 
                  tetapi juga mampu bercerita.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Feature strip */}
          <FadeUp delay={0.2} className="mt-20 lg:mt-24">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { icon: Zap, label: "Proses Cepat", sub: "Estimasi presisi sesuai timeline" },
                { icon: ShieldCheck, label: "Kualitas Premium", sub: "Bahan pilihan, qc ketat" },
                { icon: Paintbrush2, label: "100% Kustom", sub: "Desain eksklusif milik Anda" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="group flex flex-col items-start gap-5 p-8 rounded-2xl bg-white border border-navy/5 transition-all duration-300 hover:shadow-xl hover:shadow-navy/5 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="p-3.5 rounded-xl bg-cream-light text-navy/50 transition-all duration-300 group-hover:bg-navy group-hover:text-white group-hover:scale-110 group-hover:-rotate-3">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-serif text-lg font-medium text-navy">{f.label}</p>
                      <p className="mt-2 text-sm text-navy/60 font-sans leading-relaxed">{f.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="vision-mission" className="relative z-20 scroll-mt-20 bg-white py-24 lg:py-32 border-t border-navy/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <FadeUp>
                  <SectionLabel no="02" title="VISION & MISSION" />
                  <p className="font-serif text-3xl md:text-4xl leading-snug text-navy">
                    Arah dan komitmen kami
                  </p>
                  <div className="mt-10">
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

            <div className="lg:col-span-6 lg:col-start-7 lg:mt-16 space-y-4">
              {missions.map((m, i) => {
                const Icon = m.icon;
                return (
                  <FadeUp key={m.title} delay={0.1 * i}>
                    <div className="group flex gap-6 items-start p-6 -mx-6 rounded-2xl transition-all duration-300 hover:bg-navy/[0.03] cursor-pointer">
                      <div className="mt-1 p-3 rounded-xl bg-white border border-navy/5 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="h-5 w-5 text-navy" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-navy transition-colors duration-300 group-hover:text-navy/80">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-[0.938rem] leading-relaxed text-navy/60 font-sans">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Kenapa Kami ── */}
      <section id="why-us" className="relative z-20 scroll-mt-20 bg-cream-light py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="max-w-2xl">
              <SectionLabel no="03" title="WHY US" />
              <p className="font-serif text-3xl md:text-4xl leading-snug text-navy">
                Souvenir terbaik dimulai dari sini
              </p>
              <p className="mt-5 text-base leading-relaxed text-navy/60 font-sans">
                Pengalaman pembuatan souvenir yang personal, dari konsultasi pertama
                hingga produk eksklusif siap melengkapi momen berharga Anda.
              </p>
            </div>
          </FadeUp>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-3">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <FadeUp key={r.title} delay={0.1 * i} className="bg-cream-light">
                  <div className="group h-full bg-white p-10 transition-all duration-500 hover:bg-navy hover:text-white cursor-pointer relative overflow-hidden">
                    {/* Decorative hover background blob */}
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-navy/5 transition-transform duration-700 group-hover:scale-[2.5] group-hover:bg-white/5" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <Icon className="h-8 w-8 text-navy/30 transition-colors duration-500 group-hover:text-white/80" strokeWidth={1.5} />
                      <span className="font-mono text-sm font-bold text-navy/20 transition-colors duration-500 group-hover:text-white/20">{r.no}</span>
                    </div>
                    <h4 className="relative z-10 mt-10 font-serif text-2xl text-navy transition-colors duration-500 group-hover:text-white">{r.title}</h4>
                    <p className="relative z-10 mt-4 text-[0.938rem] leading-relaxed text-navy/60 font-sans transition-colors duration-500 group-hover:text-white/80">
                      {r.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
