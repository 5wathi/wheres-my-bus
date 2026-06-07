"use client";

import { useEffect, useState } from "react";

/**
 * A ticking epoch-seconds clock that drives the live simulation. Returns
 * seconds since epoch, updated every `intervalMs`. Starts at a fixed value on
 * the server and the first client render to avoid hydration mismatches, then
 * begins ticking after mount.
 */
export function useClock(intervalMs = 1000): number {
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    setNow(Date.now() / 1000);
    const id = setInterval(() => setNow(Date.now() / 1000), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
