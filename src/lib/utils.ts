import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility: menggabungkan class Tailwind dengan aman (deduplication + conditional).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
