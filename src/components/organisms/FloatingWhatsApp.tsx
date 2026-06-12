"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Tombol WhatsApp melayang (fixed bottom-right).
 * Muncul setelah scroll 300px dengan animasi spring.
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
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Konsultasi via WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl"
        >
          <FaWhatsapp className="h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
