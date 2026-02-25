import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
