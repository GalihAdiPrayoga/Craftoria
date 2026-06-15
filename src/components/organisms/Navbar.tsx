"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site, navItems } from "@/data/site";
import { NavLink } from "@/components/molecules/NavLink";
import { cn } from "@/lib/utils";

/**
 * ORGANISM — Navbar
 * Assembles: NavLink molecules + hamburger state + scroll blur effect.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    // Primary: observe the hero. Navbar turns solid the moment the hero is no
    // longer behind it — robust regardless of hero height (was a magic
    // `innerHeight - 80` threshold that broke when hero < 100vh).
    if (hero && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    // Fallback: simple scroll threshold.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-navy/8 bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="relative h-10 w-10 md:h-12 md:w-12 transition-all duration-300">
            <Image 
              src="/image/logo/logo craftoria.webp"
              alt="Craftoria Logo"
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className={cn(
                "object-contain object-left",
                !(scrolled || open) && "brightness-0 invert"
              )}
              priority
            />
          </div>
          <span className={cn(
            "font-sans text-2xl font-black tracking-tighter transition-colors",
            scrolled || open ? "text-navy" : "text-white"
          )}>
            {site.name}
          </span>
        </a>

        {/* Desktop nav — NavLink molecules */}
        <ul className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} scrolled={scrolled}>{item.label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden",
            scrolled || open ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-navy/8 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-navy/75 transition-colors hover:bg-cream-light hover:text-navy"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
