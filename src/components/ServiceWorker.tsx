"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

/**
 * Registers the service worker (production only — dev has no stable asset URLs)
 * and shows a small banner when the browser goes offline so users know they're
 * on cached data.
 */
export function ServiceWorker() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof navigator !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration failures are non-fatal */
      });
    }

    setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[2000] flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-foreground/90 px-4 py-2 text-xs font-medium text-white shadow-panel backdrop-blur">
        <WifiOff size={14} />
        Offline — showing cached schedules &amp; map
      </div>
    </div>
  );
}
