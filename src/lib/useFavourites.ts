"use client";

import { useCallback, useEffect, useState } from "react";

export interface SavedTrip {
  from: string;
  to: string;
}

const STOPS_KEY = "wmb:fav-stops";
const TRIPS_KEY = "wmb:recent-trips";
const MAX_RECENTS = 6;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Favourite stops and recent A→B searches, persisted in localStorage. State is
 * empty on the server and first client render (avoids hydration mismatch), then
 * hydrates from storage after mount.
 */
export function useFavourites() {
  const [favStops, setFavStops] = useState<string[]>([]);
  const [recentTrips, setRecentTrips] = useState<SavedTrip[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavStops(read<string[]>(STOPS_KEY, []));
    setRecentTrips(read<SavedTrip[]>(TRIPS_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STOPS_KEY, JSON.stringify(favStops));
  }, [favStops, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem(TRIPS_KEY, JSON.stringify(recentTrips));
  }, [recentTrips, ready]);

  const toggleFav = useCallback((stopId: string) => {
    setFavStops((cur) =>
      cur.includes(stopId) ? cur.filter((s) => s !== stopId) : [stopId, ...cur]
    );
  }, []);

  const isFav = useCallback((stopId: string) => favStops.includes(stopId), [favStops]);

  const addRecentTrip = useCallback((from: string, to: string) => {
    if (!from || !to || from === to) return;
    setRecentTrips((cur) => {
      // No-op if this trip is already the most recent — avoids a new array
      // reference (and the re-render it would cause).
      if (cur[0]?.from === from && cur[0]?.to === to) return cur;
      return [
        { from, to },
        ...cur.filter((t) => !(t.from === from && t.to === to)),
      ].slice(0, MAX_RECENTS);
    });
  }, []);

  const clearRecents = useCallback(() => setRecentTrips([]), []);

  return { ready, favStops, isFav, toggleFav, recentTrips, addRecentTrip, clearRecents };
}
