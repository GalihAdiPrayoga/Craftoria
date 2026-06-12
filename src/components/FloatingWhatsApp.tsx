"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Tombol WhatsApp melayang (fixed bottom-right).
 * Muncul setelah scroll 300px. Mengarahkan ke WA dengan pesan generik.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
