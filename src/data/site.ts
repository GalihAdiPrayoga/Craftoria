export type NavItem = { label: string; href: string };

export const site = {
  name: "Craftoria",
  tagline: "Studio kreatif Souvenir & Merchandise",
  description:
    "Craftoria.co adalah studio kreatif yang membantu mewujudkan kebutuhan souvenir, hadiah, dan merchandise event yang fungsional, minimalis, dan bernilai estetika tinggi.",
  whatsappNumber: "6285113153923",
  phoneDisplay: "0851-1315-3923",
  instagram: "https://instagram.com/craftoria.co",
  tiktok: "https://www.tiktok.com/@craftoria.co",
  shopeeLabel: "Craftoria.co Official Shop",
  shopeeUrl: "https://shopee.co.id/search?keyword=craftoria.co",
  location: "Mojokerto, Jawa Timur, Indonesia",
} as const;

export const navItems: NavItem[] = [
  { label: "Tentang", href: "#about" },
  { label: "Visi & Misi", href: "#vision-mission" },
  { label: "Kenapa Kami", href: "#why-us" },
  { label: "Galeri", href: "#gallery" },
];
