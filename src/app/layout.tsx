import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-navy">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
