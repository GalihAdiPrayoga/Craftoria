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
          duration: 0.65,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 87%",
            once: true
          }
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
      <section id="about" className="relative z-20 scroll-mt-0 overflow-hidden bg-white -mt-1">
        {/* ── KUNCI TRANSISI WAVE DI SINI ── */}
        {/* Wave dipindah ke AboutSection agar blob background bisa menyatu (tidak ada garis putih keras) */}
        <div className="w-full relative z-30 pointer-events-none leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block">
            <path
              className="fill-navy"
              fillOpacity="1"
              d="M0,160L30,133.3C60,107,120,53,180,64C240,75,300,149,360,170.7C420,192,480,160,540,170.7C600,181,660,235,720,256C780,277,840,267,900,245.3C960,224,1020,192,1080,192C1140,192,1200,224,1260,224C1320,224,1380,192,1410,176L1440,160L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* Decorative Blobs */}
        <div className="pointer-events-none absolute top-[-5%] right-[-5%] h-[500px] w-[500px] rounded-full bg-cream/60 blur-[100px] z-0" />
        <div className="pointer-events-none absolute top-[40%] left-[-10%] h-[400px] w-[400px] rounded-full bg-white/80 blur-[80px] z-0" />

        <div className="relative z-10 py-24 lg:py-32">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-5 relative">
              {/* Big Watermark Text */}
              <span className="absolute -top-14 -left-8 text-[7rem] md:text-[9rem] font-bold text-navy/3 select-none z-0 tracking-tighter leading-none">
                STUDIO
              </span>
              <div className="relative z-10">
                <FadeUp>

                  <p className="font-serif text-4xl md:text-5xl leading-tight text-navy">
                    Studio kreatif <span className="text-transparent bg-clip-text bg-linear-to-r from-navy to-navy-soft italic">souvenir &amp; merchandise</span>
                  </p>
                </FadeUp>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 text-lg leading-relaxed text-navy/70 font-sans border-t border-navy/10 pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 relative">
              <FadeUp delay={0.1}>
                <p>
                  Craftoria.co hadir sebagai mitra terpercaya untuk mewujudkan kebutuhan
                  souvenir, kado personal, hingga merchandise event yang
                  <strong className="text-navy font-medium"> fungsional, minimalis, dan bernilai estetika tinggi.</strong>
                </p>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <p className="text-[0.938rem] font-medium text-navy/80 leading-relaxed">
                    Melalui pendekatan desain berkarakter dan teknik cetak digital modern, hasil akhir tak sekadar indah, tetapi juga bercerita.
                  </p>
                </div>
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
                    className="group relative flex flex-col items-start gap-5 p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-cream/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 p-4 rounded-2xl bg-cream-light text-navy/50 transition-all duration-500 group-hover:bg-navy group-hover:text-white group-hover:shadow-xl group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div className="relative z-10 mt-2">
                      <p className="font-serif text-xl font-medium text-navy">{f.label}</p>
                      <p className="mt-2 text-[0.938rem] text-navy/60 font-sans leading-relaxed">{f.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="vision-mission" className="relative z-20 scroll-mt-0 bg-white py-24 lg:py-32 border-t border-navy/5">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">

              <p className="font-serif text-4xl md:text-5xl leading-tight text-navy">
                Arah &amp; komitmen <span className="text-transparent bg-clip-text bg-linear-to-r from-navy to-navy-soft italic">kreatif kami</span>
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-fr">
            {/* Vision - Large Bento Box */}
            <div className="md:col-span-2 lg:row-span-2">
              <FadeUp className="h-full">
                <div className="h-full relative group p-6 sm:p-8 rounded-md bg-cream-light border border-navy/5 transition-all duration-500 hover:bg-navy hover:-translate-y-1 hover:shadow-card-hover overflow-hidden flex flex-col justify-center cursor-pointer">
                  {/* Decorative hover background blob */}
                  <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-navy/5 transition-transform duration-700 group-hover:scale-[3.5] group-hover:bg-white/5 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="mb-6 inline-flex items-center gap-3 p-2.5 pr-5 rounded-full justify-center bg-white shadow-sm border border-navy/5 transition-colors duration-500 group-hover:bg-white/10 group-hover:border-white/10">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-navy/60 transition-colors duration-500 group-hover:text-white/80">
                        Visi Utama
                      </span>
                    </div>
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-snug text-navy transition-colors duration-500 group-hover:text-white">
                      Menjadi studio kreatif andalan dalam penyediaan souvenir dan
                      merchandise yang estetik, solutif, dan menyenangkan bagi setiap klien.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Mission 1 */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-1">
              <FadeUp delay={0.1} className="h-full">
                <div className="h-full group p-6 sm:p-8 rounded-md bg-white border border-navy/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="absolute inset-0 bg-linear-to-br from-cream/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <div className="relative z-10 shrink-0 p-5 rounded-3xl bg-cream-light text-navy transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Paintbrush2 className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-serif text-xl sm:text-2xl text-navy font-medium mb-2">
                      {missions[0].title}
                    </h3>
                    <p className="text-[0.938rem] leading-relaxed text-navy/60 font-sans">
                      {missions[0].description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Mission 2 */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-1">
              <FadeUp delay={0.2} className="h-full">
                <div className="h-full group p-6 rounded-md bg-white border border-navy/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-linear-to-br from-cream/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <div className="relative z-10 mb-6 w-fit p-4 rounded-2xl bg-cream-light text-navy transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-serif text-xl text-navy font-medium mb-2">
                      {missions[1].title}
                    </h3>
                    <p className="text-[0.938rem] leading-relaxed text-navy/60 font-sans">
                      {missions[1].description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Mission 3 */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-1">
              <FadeUp delay={0.3} className="h-full">
                <div className="h-full group p-6 rounded-md bg-white border border-navy/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-linear-to-br from-cream/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <div className="relative z-10 mb-6 w-fit p-4 rounded-2xl bg-cream-light text-navy transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <HandHeart className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-serif text-xl text-navy font-medium mb-2">
                      {missions[2].title}
                    </h3>
                    <p className="text-[0.938rem] leading-relaxed text-navy/60 font-sans">
                      {missions[2].description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kenapa Kami ── */}
      <section id="why-us" className="relative z-20 scroll-mt-0 bg-cream-light py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="max-w-2xl">

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
