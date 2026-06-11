export type ProductItem = { name: string; description: string };

export type Category = {
  id: string;
  title: string;
  description: string;
  items: ProductItem[];
};

export const categories: Category[] = [
  {
    id: "drinkware",
    title: "Dinings & Drinkware Premium",
    description:
      "Souvenir berbahan keramik, kaca, dan kebutuhan minum harian; populer untuk suvenir pernikahan eksklusif maupun hadiah korporat.",
    items: [
      {
        name: "Gelas & Mug Kustom",
        description: "Mug estetik dengan cetakan logo atau ilustrasi kustom.",
      },
      {
        name: "Mangkuk & Piring Keramik",
        description:
          "Set perangkat makan minimalis mewah untuk hampers hari raya.",
      },
      {
        name: "Tumbler Custom",
        description:
          "Botol minum fungsional untuk merchandise seminar atau kantoran.",
      },
    ],
  },
  {
    id: "home-decor",
    title: "Aesthetic Home Decor",
    description:
      "Pemanis sudut rumah berbahan kain premium (suede) dicetak motif penuh teknik sublimasi; memberi kesan hangat dan mewah.",
    items: [
      {
        name: "Table Runner",
        description:
          "Pemanis meja makan atau meja tamu yang bisa disesuaikan dengan tema interior.",
      },
      {
        name: "Tatakan Gelas (Coaster)",
        description:
          "Aksesoris meja berbahan lembut untuk pelengkap suvenir kafe atau ruang tamu.",
      },
      {
        name: "Sarung Bantal Sofa (Cushion Cover)",
        description: "Sarung bantal kustom estetik untuk mempercantik ruang keluarga.",
      },
      {
        name: "Sajadah Muka & Travel Slim",
        description:
          "Alas sujud praktis dan ringkas, favorit untuk suvenir tasyakuran atau umrah.",
      },
    ],
  },
  {
    id: "essentials",
    title: "Functional & Daily Essentials",
    description:
      "Produk kain pelengkap gaya hidup dan mobilitas harian; diminati komunitas, instansi, maupun anak muda karena kepraktisannya.",
    items: [
      {
        name: "Totebag & Pouch",
        description:
          "Tas jinjing dan dompet kecil serbaguna untuk kosmetik, mukena, atau seminar kit.",
      },
      {
        name: "Lanyard Kustom",
        description:
          "Tali id-card premium untuk merchandise kepanitiaan event atau seragam kantor.",
      },
      {
        name: "Lifestyle Essentials",
        description:
          "Aksesoris kain harian lain yang dirancang ringkas dan travel-friendly.",
      },
    ],
  },
];
