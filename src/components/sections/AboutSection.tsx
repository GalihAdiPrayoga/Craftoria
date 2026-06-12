/**
 * About Section — menggabungkan Tentang Kami, Visi & Misi, dan Kenapa Kami
 * dalam satu komponen dengan sub-section yang memiliki anchor ID masing-masing.
 *
 * Anchor mapping ke navItems:
 *   #about          → Tentang Kami
 *   #vision-mission → Visi & Misi
 *   #why-us         → Kenapa Memilih Kami
 */

const missions = [
  {
    title: "Solusi Desain Kustom",
    description:
      "Membantu menerjemahkan ide, logo, atau tema acara klien ke dalam bentuk produk suvenir secara rapi.",
  },
  {
    title: "Kualitas yang Terjaga",
    description:
      "Memastikan setiap detail produk menggunakan bahan pilihan dan kualitas cetak yang bersih demi kepuasan penerima hadiah.",
  },
  {
    title: "Pelayanan yang Fleksibel",
    description:
      "Memberikan kemudahan konsultasi dan adaptasi produk sesuai anggaran serta kebutuhan unik di setiap acara.",
  },
];

const reasons = [
  {
    title: "Flexible Custom Design",
    description:
      "Desain motif, warna, hingga tulisan ucapan pada produk bisa didiskusikan bersama agar pas dengan konsep acara Anda.",
    emoji: "🎨",
  },
  {
    title: "Modern Aesthetic",
    description:
      "Kami menyukai konsep desain yang simpel, bersih, dan kekinian yang cocok dengan selera pasar saat ini.",
    emoji: "✨",
  },
  {
    title: "Friendly Service",
    description:
      "Kami siap menemani Anda dari draf diskusi ide, pemilihan sampel produk, hingga produk siap dikemas dan dibagikan.",
    emoji: "🤝",
  },
];

export function AboutSection() {
  return (
    <>
      {/* ── Tentang Kami ── */}
      <section id="about" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-navy/50">
              Tentang Kami
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Studio kreatif souvenir &amp; merchandise
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-7 text-navy/70">
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
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="vision-mission" className="scroll-mt-20 bg-cream-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-navy/50">
              Visi &amp; Misi
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Arah dan komitmen kami
            </h2>
          </div>

          {/* Visi card */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-navy p-8 text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Visi
            </p>
            <p className="mt-3 text-lg leading-8">
              Menjadi studio kreatif andalan dalam penyediaan souvenir dan
              merchandise yang estetik, solutif, dan menyenangkan bagi setiap
              klien.
            </p>
          </div>

          {/* Misi cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {missions.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-navy/10 bg-white p-6 transition-shadow duration-200 hover:shadow-md"
              >
                <h3 className="text-base font-bold text-navy">{m.title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy/70">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kenapa Memilih Kami ── */}
      <section id="why-us" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-navy/50">
              Kenapa Memilih Kami
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Souvenir, cara terbaik menyampaikan apresiasi
            </h2>
            <p className="mt-4 text-base leading-7 text-navy/60">
              Craftoria.co menawarkan pengalaman pembuatan souvenir yang personal
              dan menyenangkan.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl bg-cream-light p-6 transition-shadow duration-200 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-xl">
                  {r.emoji}
                </span>
                <h3 className="mt-4 text-base font-bold text-navy">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy/70">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
