export type GalleryCategory = "drinkware" | "home-decor" | "essentials";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

const dir = "/image/catalog";

/**
 * 30 foto produk asli Craftoria.
 * `category` hasil kurasi visual (tiap foto diperiksa langsung).
 * `alt` deskriptif singkat untuk a11y & SEO.
 */
export const galleryImages: GalleryImage[] = [
  { src: `${dir}/souvenir-craftoria (1).jpeg`, alt: "Totebag kanvas custom cetak foto Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (2).jpeg`, alt: "Totebag kanvas custom souvenir pernikahan", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (3).jpeg`, alt: "Totebag kanvas custom tema Ramadhan", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (4).jpeg`, alt: "Totebag kanvas custom hadiah ulang tahun", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (5).jpeg`, alt: "Totebag kanvas custom desain personal", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (6).jpeg`, alt: "Totebag kanvas custom desain personal", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (7).jpeg`, alt: "Totebag kanvas custom ucapan birthday", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (8).jpeg`, alt: "Tali lanyard custom full-color Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (9).jpeg`, alt: "Totebag kanvas custom graduation", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (10).jpeg`, alt: "Ransel serut kanvas custom happy birthday", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (11).jpeg`, alt: "Tumbler aluminium custom sekolah dan graduation", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (12).jpeg`, alt: "Tali lanyard custom 17 Agustus merah-putih", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (13).jpeg`, alt: "Piring keramik motif bunga souvenir dengan gift box", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (14).jpeg`, alt: "Piring keramik motif bunga souvenir premium packaging", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (15).jpeg`, alt: "Totebag kanvas custom logo sekolah", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (16).jpeg`, alt: "Tissue pouch kulit custom logo perusahaan", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (17).jpeg`, alt: "Totebag kanvas custom logo sekolah SMAK", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (18).jpeg`, alt: "Mug keramik custom happy graduation pink", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (19).jpeg`, alt: "Pouch kulit navy custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (20).jpeg`, alt: "Mug keramik custom graduation chibi hijab", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (21).jpeg`, alt: "Pouch kulit navy custom tampak samping", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (22).jpeg`, alt: "Pouch kulit navy custom tampak depan", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (23).jpeg`, alt: "Card holder kulit custom inisial dengan pita emas", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (24).jpeg`, alt: "Mangkuk keramik hijau souvenir dengan gift box floral", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (25).jpeg`, alt: "Mangkuk kaca bening souvenir dengan gift box Thank You", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (26).jpeg`, alt: "Mangkuk kaca faceted souvenir dengan gift box elegan", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (27).jpeg`, alt: "Botol kaca frosted custom souvenir pernikahan", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (28).jpeg`, alt: "Gelas kaca custom souvenir pernikahan dengan pita emas", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (29).jpeg`, alt: "Gelas kaca custom souvenir pernikahan premium", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (30).jpeg`, alt: "Botol kaca frosted custom souvenir pernikahan dengan box", category: "drinkware" },
];

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "drinkware", label: "Drinkware" },
  { id: "home-decor", label: "Decor" },
  { id: "essentials", label: "Daily" },
];
