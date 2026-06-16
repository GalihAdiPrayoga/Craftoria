import type { Metadata } from "next";
import { Open_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { FloatingWhatsApp } from "@/components/organisms/FloatingWhatsApp";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Craftoria.co — Studio kreatif Souvenir & Merchandise",
  description:
    "Craftoria.co adalah studio kreatif penyedia souvenir & merchandise estetik, fungsional, dan bisa dikustom untuk berbagai acara di Mojokerto, Jawa Timur.",
  openGraph: {
    title: "Craftoria.co — Studio kreatif Souvenir & Merchandise",
    description:
      "Souvenir & merchandise estetik, fungsional, dan personal untuk berbagai acara.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${openSans.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-navy">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
