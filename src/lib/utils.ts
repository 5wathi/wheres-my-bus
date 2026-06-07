import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Human ETA: "Due", "3 min", "1h 12m". */
export function formatEta(sec: number): string {
  if (sec <= 30) return "Due";
  const m = Math.round(sec / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

export function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

/** Rough walking time at ~5 km/h (≈83 m/min). */
export function formatWalkTime(m: number): string {
  const min = Math.max(1, Math.round(m / 83));
  if (min < 60) return `${min} min walk`;
  const h = Math.floor(min / 60);
  return `${h}h ${min % 60}m walk`;
}

const occupancyLabel = {
  low: "Seats available",
  medium: "Standing room",
  high: "Crowded",
} as const;

export function occupancyText(o: "low" | "medium" | "high"): string {
  return occupancyLabel[o];
}

export function occupancyDots(o: "low" | "medium" | "high"): number {
  return o === "low" ? 1 : o === "medium" ? 2 : 3;
}
