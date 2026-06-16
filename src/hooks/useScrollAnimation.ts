"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Default easing used across all scroll animations for consistency.
 * power2.out feels natural without being bouncy or over-dramatic.
 */
const EASE = "power2.out";

/**
 * Fade-up a single element when it enters the viewport.
 * Uses `once: true` so it only fires once, not on scroll back.
 */
export function useFadeUp(
  delay = 0,
  options?: { y?: number; duration?: number; start?: string }
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: options?.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.7,
          delay,
          ease: EASE,
          scrollTrigger: {
            trigger: ref.current,
            start: options?.start ?? "top 87%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, options?.y, options?.duration, options?.start]);

  return ref;
}

/**
 * Stagger-reveal a list of child elements when the container enters the viewport.
 * Good for grids, card lists, etc.
 */
export function useStaggerReveal(
  selector: string,
  options?: {
    stagger?: number;
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current!.querySelectorAll(selector);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: options?.y ?? 24 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.6,
          ease: EASE,
          stagger: options?.stagger ?? 0.09,
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: options?.start ?? "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selector]);

  return containerRef;
}

/**
 * Reveal a horizontal line of items (e.g. footer columns) with a gentle left-to-right stagger.
 */
export function useColumnReveal(selector: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cols = containerRef.current!.querySelectorAll(selector);
      if (!cols.length) return;

      gsap.fromTo(
        cols,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selector]);

  return containerRef;
}

/**
 * More dramatic reveal: fade-up with a subtle skewY twist.
 * Use for section headings to create a premium "emergence" feel.
 * Animates: opacity 0→1 · y 48→0 · skewY 2→0
 */
export function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 48, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return ref;
}
