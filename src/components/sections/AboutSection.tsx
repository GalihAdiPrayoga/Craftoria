"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Paintbrush2, ShieldCheck, HandHeart, Sparkles, Zap, Users } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 87%",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-fade opacity-0 ${className ?? ""}`}>
      {children}
    </div>
  );
}

const missions = [
  {
    icon: Paintbrush2,
    title: "Solusi Desain Kustom",
    description:
      "Menerjemahkan ide, logo, atau tema acara klien ke dalam produk suvenir yang rapi dan berkarakter unik.",
  },
  {
    icon: ShieldCheck,
    title: "Kualitas Terjaga",
    description:
      "Bahan pilihan dan kualitas cetak bersih di setiap produk, demi kepuasan dan apresiasi penerima hadiah.",
  },
  {
    icon: HandHeart,
    title: "Pelayanan Fleksibel",
    description:
      "Konsultasi santai dan adaptasi produk sesuai anggaran serta kebutuhan tak terduga setiap acara.",
  },
];

const reasons = [
  {
    icon: Paintbrush2,
    no: "01",
    title: "Flexible Custom Design",
    description:
      "Desain motif, warna, hingga tulisan ucapan bisa didiskusikan secara mendalam bersama kami agar hasilnya sempurna.",
  },
  {
    icon: Sparkles,
    no: "02",
    title: "Modern Aesthetic",
    description:
      "Konsep yang simpel, bersih, dan kekinian yang selalu terkurasi dan relevan dengan selera pasar terkini.",
  },
  {
    icon: Users,
    no: "03",
    title: "Friendly Service",
    description:
      "Menemani Anda dari draf ide pertama, pemilihan sampel, hingga produk siap dikemas rapi.",
  },
];

/* ─────────────────────────────────────────────
   SUB-SECTION 1 — Tentang Kami (#about)
───────────────────────────────────────────── */
function AboutIntro() {
  return (
    <section
      className="relative z-20 overflow-hidden bg-white -mt-1"
    >
      {/* Wave transisi navy→putih — JANGAN UBAH (commit abcbfd6) */}
      <div className="w-full relative z-30 pointer-events-none leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto block"
        >
          <path
            className="fill-navy"
            fillOpacity="1"
            d="M0,160L30,133.3C60,107,120,53,180,64C240,75,300,149,360,170.7C420,192,480,160,540,170.7C600,181,660,235,720,256C780,277,840,267,900,245.3C960,224,1020,192,1080,192C1140,192,1200,224,1260,224C1320,224,1380,192,1410,176L1440,160L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          />
        </svg>
      </div>

      <div className="relative z-10 py-20 sm:py-24 lg:py-32">
        {/* Anchor tepat di heading — id di sini agar scroll mendarat di judul */}
        <div id="about" className="scroll-mt-24" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* Heading + body */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <FadeUp>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-navy">
                  Studio kreatif souvenir &amp; merchandise
                </h2>
              </FadeUp>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <FadeUp delay={0.1}>
                <p className="text-base sm:text-lg leading-relaxed text-navy/60 font-sans">
                  Craftoria.co hadir sebagai mitra terpercaya untuk mewujudkan
                  kebutuhan souvenir, kado personal, hingga merchandise event yang{" "}
                  <strong className="text-navy font-medium">
                    fungsional, minimalis, dan bernilai estetika tinggi.
                  </strong>
                </p>
                <div className="mt-8 border-t border-navy/10 pt-8">
                  <p className="text-[0.9rem] leading-relaxed text-navy/50 font-sans">
                    Melalui pendekatan desain berkarakter dan teknik cetak digital
                    modern, hasil akhir tak sekadar indah, tetapi juga bercerita.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Feature strip */}
          <FadeUp delay={0.15} className="mt-16 sm:mt-20 lg:mt-24">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                { icon: Zap, label: "Proses Cepat", sub: "Estimasi presisi sesuai timeline" },
                { icon: ShieldCheck, label: "Kualitas Premium", sub: "Bahan pilihan, QC ketat" },
                { icon: Paintbrush2, label: "100% Kustom", sub: "Desain eksklusif milik Anda" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="group flex flex-col gap-5 p-7 rounded-xl border border-navy/10 bg-white transition-all duration-300 hover:border-navy/25 hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] cursor-pointer"
                  >
                    <div className="p-2.5 w-fit rounded-lg bg-cream-light text-navy/55 transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold text-navy">
                        {f.label}
                      </p>
                      <p className="mt-1.5 text-sm text-navy/50 font-sans leading-relaxed">
                        {f.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SUB-SECTION 2 — Visi & Misi (#vision-mission)
───────────────────────────────────────────── */
function VisionMission() {
  return (
    <section
      className="relative z-20 bg-white py-20 sm:py-24 lg:py-32 border-t border-navy/5"
    >
      {/* Anchor tepat di heading — id di sini agar scroll mendarat di judul */}
      <div id="vision-mission" className="scroll-mt-24" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Eyebrow + heading row */}
        <FadeUp>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-navy">
              Arah &amp; komitmen kreatif kami
            </h2>
            <p className="text-base text-navy/50 font-sans leading-relaxed lg:max-w-xs lg:ml-auto">
              Setiap produk mencerminkan nilai-nilai yang mendasari cara kami
              berkarya dan melayani.
            </p>
          </div>
        </FadeUp>

        {/* Visi — navy solid, tanpa blob */}
        <FadeUp delay={0.1} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-xl bg-navy px-8 py-12 sm:px-12 sm:py-14">
            <span className="absolute top-7 right-8 text-[10px] font-display font-semibold tracking-[.22em] uppercase text-white/25">
              Visi Utama
            </span>
            <span
              aria-hidden
              className="pointer-events-none select-none absolute -bottom-8 -right-4 text-[11rem] font-display font-bold leading-none text-white/4"
            >
              V
            </span>
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug text-white max-w-3xl">
              Menjadi studio kreatif andalan dalam penyediaan souvenir dan
              merchandise yang estetik, solutif, dan menyenangkan bagi setiap
              klien.
            </p>
          </div>
        </FadeUp>

        {/* Misi — 3 kartu clean */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {missions.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeUp key={m.title} delay={0.08 * (i + 1)}>
                <div className="group flex flex-col gap-5 p-7 rounded-xl border border-navy/10 bg-cream-light/40 transition-all duration-300 hover:border-navy/20 hover:bg-white hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.10)]">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 w-fit rounded-lg bg-white text-navy/50 border border-navy/8">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <span className="font-display text-xs font-semibold text-navy/20 tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/55 font-sans">
                      {m.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SUB-SECTION 3 — Kenapa Kami (#why-us)
───────────────────────────────────────────── */
function WhyUs() {
  return (
    <section
      className="relative z-20 bg-cream-light py-20 sm:py-24 lg:py-32"
    >
      {/* Anchor tepat di heading — id di sini agar scroll mendarat di judul */}
      <div id="why-us" className="scroll-mt-24" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Eyebrow + heading */}
        <FadeUp>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-navy">
              Souvenir terbaik dimulai dari sini
            </h2>
            <p className="text-base text-navy/50 font-sans leading-relaxed lg:max-w-xs lg:ml-auto">
              Pengalaman pembuatan souvenir yang personal, dari konsultasi pertama
              hingga produk eksklusif siap melengkapi momen berharga Anda.
            </p>
          </div>
        </FadeUp>

        {/* 3 kartu — hover navy dipertahankan, blob dihapus */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-px bg-navy/8 overflow-hidden rounded-2xl border border-navy/8 sm:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <FadeUp key={r.title} delay={0.08 * i} className="bg-cream-light">
                <div className="group h-full bg-white p-9 sm:p-10 transition-colors duration-300 hover:bg-navy cursor-pointer">
                  <div className="flex items-start justify-between">
                    <Icon
                      className="h-7 w-7 text-navy/25 transition-colors duration-300 group-hover:text-white/60"
                      strokeWidth={1.5}
                    />
                    <span className="font-display text-xs font-semibold tabular-nums text-navy/20 transition-colors duration-300 group-hover:text-white/25">
                      {r.no}
                    </span>
                  </div>
                  <h4 className="mt-10 font-display text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-white">
                    {r.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-navy/55 font-sans transition-colors duration-300 group-hover:text-white/70">
                    {r.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Exported composite component
───────────────────────────────────────────── */
export function AboutSection() {
  return (
    <>
      <AboutIntro />
      <VisionMission />
      <WhyUs />
    </>
  );
}
