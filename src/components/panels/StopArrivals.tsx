"use client";

import { Crosshair, Footprints, Loader2 } from "lucide-react";
import type { City, LatLng } from "@/lib/types";
import { arrivalsAtStop } from "@/lib/simulation";
import { haversine } from "@/lib/geo";
import { StopSelect } from "@/components/ui/StopSelect";
import { RouteBadge, EtaPill, Occupancy, FavStar } from "@/components/ui/Bits";
import { formatDistance, formatWalkTime } from "@/lib/utils";

export function StopArrivals({
  city,
  epochSec,
  stopId,
  setStop,
  onTrackVehicle,
  isFav,
  onToggleFav,
  userPos,
  locating,
  onLocate,
}: {
  city: City;
  epochSec: number;
  stopId: string | null;
  setStop: (id: string | null) => void;
  onTrackVehicle: (vehicleId: string) => void;
  isFav?: (id: string) => boolean;
  onToggleFav?: (id: string) => void;
  userPos?: LatLng | null;
  locating?: boolean;
  onLocate?: () => void;
}) {
  const arrivals = stopId ? arrivalsAtStop(city, stopId, epochSec) : [];
  const stop = city.stops.find((s) => s.id === stopId);
  const distM = stop && userPos ? haversine(userPos, stop.pos) : null;

  return (
    <div className="space-y-4">
      <StopSelect
        stops={city.stops}
        value={stopId}
        onChange={setStop}
        placeholder="Choose a stop"
      />

      {!stopId && (
        <p className="px-1 text-sm text-muted-foreground">
          Select a stop to see the next buses arriving, soonest first.
        </p>
      )}

      {stop && (
        <div>
          <div className="flex items-center justify-between px-1 pb-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Arrivals at {stop.name}
            </p>
            {isFav && onToggleFav && (
              <FavStar active={isFav(stop.id)} onClick={() => onToggleFav(stop.id)} />
            )}
          </div>

          {distM != null ? (
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm dark:bg-blue-500/10">
              <Footprints size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-700 dark:text-blue-300">
                {formatDistance(distM)} away
              </span>
              <span className="text-blue-600/70 dark:text-blue-300/70">
                · {formatWalkTime(distM)}
              </span>
            </div>
          ) : (
            onLocate && (
              <button
                onClick={onLocate}
                disabled={locating}
                className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-brand-600 disabled:opacity-60"
              >
                {locating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Locating…
                  </>
                ) : (
                  <>
                    <Crosshair size={14} /> Show distance from my location
                  </>
                )}
              </button>
            )
          )}

          {arrivals.length === 0 ? (
            <p className="px-1 text-sm text-muted-foreground">No buses scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {arrivals.map((a) => (
                <li key={a.vehicleId}>
                  <button
                    onClick={() => onTrackVehicle(a.vehicleId)}
                    className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-left shadow-card transition-colors hover:border-brand-500/40 hover:bg-brand-50/40"
                  >
                    <RouteBadge number={a.routeNumber} color={a.color} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">→ {a.destination}</p>
                      <Occupancy level={a.occupancy} />
                    </div>
                    <EtaPill sec={a.etaSec} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
