"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CountUpProps {
  /** The final number to count up to. */
  target: number;
  /** Optional prefix (e.g. "+"). */
  prefix?: string;
  /** Optional suffix (e.g. "%", "k+"). */
  suffix?: string;
  /** Animation duration in seconds. Default 1.4s. */
  duration?: number;
  /** Delay before the count starts (seconds). */
  delay?: number;
}

/**
 * ATOM — CountUp
 * Animates a number from 0 to `target` when the element enters the viewport.
 * Respects prefers-reduced-motion — shows the final value immediately.
 */
export function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1.4,
  delay = 0,
}: CountUpProps) {
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const [value, setValue] = useState(prefersReduced ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 92%",
      once: true,
      onEnter() {
        gsap.to(obj, {
          val: target,
          duration,
          delay,
          ease: "power2.out",
          onUpdate() {
            setValue(Math.round(obj.val));
          },
          onComplete() {
            setValue(target);
          },
        });
      },
    });
    return () => st.kill();
  }, [target, duration, delay, prefersReduced]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
