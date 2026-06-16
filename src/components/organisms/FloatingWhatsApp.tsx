"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Tombol WhatsApp melayang (fixed bottom-right).
 * - Muncul setelah scroll 300px dengan animasi spring.
 * - Tooltip "Chat Kami" muncul saat hover (desktop).
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-6 z-50 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          {/* Tooltip label — slides in from right on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                key="tooltip"
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="select-none whitespace-nowrap rounded-lg bg-navy px-3.5 py-2 text-xs font-semibold text-white shadow-lg"
              >
                Chat Kami
              </motion.span>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl"
          >
            <FaWhatsapp className="h-7 w-7" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
