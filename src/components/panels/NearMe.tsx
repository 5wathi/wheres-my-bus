"use client";

import { Crosshair, MapPin, Loader2 } from "lucide-react";
import type { City, LatLng } from "@/lib/types";
import { arrivalsAtStop } from "@/lib/simulation";
import { haversine } from "@/lib/geo";
import { RouteBadge, EtaPill, FavStar } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";
import { formatDistance } from "@/lib/utils";

const FAR_THRESHOLD_M = 60_000; // beyond this, treat as "outside covered cities"

export function NearMe({
  city,
  epochSec,
  userPos,
  locating,
  error,
  isDemo,
  onLocate,
  onUseDemo,
  onOpenStop,
  onTrackVehicle,
  isFav,
  onToggleFav,
}: {
  city: City;
  epochSec: number;
  userPos: LatLng | null;
  locating: boolean;
  error: string | null;
  isDemo: boolean;
  onLocate: () => void;
  onUseDemo: () => void;
  onOpenStop: (stopId: string) => void;
  onTrackVehicle: (vehicleId: string) => void;
  isFav?: (id: string) => boolean;
  onToggleFav?: (id: string) => void;
}) {
  // Reference point for ranking stops: the real location, or the city centre
  // when we're falling back to a demo location.
  const ref = userPos ?? null;

  const nearest = ref
    ? city.stops
        .map((s) => ({ stop: s, distM: haversine(ref, s.pos) }))
        .sort((a, b) => a.distM - b.distM)
        .slice(0, 6)
    : [];

  const tooFar = nearest.length > 0 && nearest[0].distM > FAR_THRESHOLD_M;

  return (
    <div className="space-y-4">
      {!userPos && (
        <div className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Crosshair size={22} />
          </span>
          <p className="text-sm font-medium">Find buses near you</p>
          <p className="mb-3 mt-1 text-xs text-muted-foreground">
            Share your location to see the closest stops and their next arrivals.
          </p>
          <Button onClick={onLocate} disabled={locating} className="w-full">
            {locating ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Locating…
              </>
            ) : (
              <>
                <Crosshair size={15} /> Use my location
              </>
            )}
          </Button>
          {error && (
            <p className="mt-2 text-xs" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}
          <button
            onClick={onUseDemo}
            className="mt-2 text-xs text-brand-600 underline-offset-2 hover:underline"
          >
            Or drop me in {city.name} centre (demo)
          </button>
        </div>
      )}

      {userPos && (
        <>
          <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
              </span>
              <p className="text-sm font-medium text-brand-700">
                {isDemo ? `${city.name} centre (demo)` : "Your location"}
              </p>
            </div>
            <button
              onClick={onLocate}
              disabled={locating}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              {locating ? "Locating…" : "Refresh"}
            </button>
          </div>

          {tooFar && (
            <p className="rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              You appear to be outside our covered cities. Showing the nearest
              network — {city.name} ({city.operator}).
            </p>
          )}

          <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nearest stops
          </p>
          <ul className="space-y-2">
            {nearest.map(({ stop, distM }) => {
              const next = arrivalsAtStop(city, stop.id, epochSec, 2);
              return (
                <li key={stop.id}>
                  <div className="rounded-xl border border-border bg-card px-3 py-2.5 shadow-card">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenStop(stop.id)}
                        className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      >
                        <MapPin size={15} className="shrink-0 text-brand-600" />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {stop.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatDistance(distM)}
                        </span>
                      </button>
                      {isFav && onToggleFav && (
                        <FavStar active={isFav(stop.id)} onClick={() => onToggleFav(stop.id)} />
                      )}
                    </div>
                    {next.length > 0 ? (
                      <div className="mt-2 space-y-1.5 border-t border-border pt-2">
                        {next.map((a) => (
                          <button
                            key={a.vehicleId}
                            onClick={() => onTrackVehicle(a.vehicleId)}
                            className="flex w-full items-center gap-2 text-left"
                          >
                            <RouteBadge number={a.routeNumber} color={a.color} />
                            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                              → {a.destination}
                            </span>
                            <EtaPill sec={a.etaSec} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-xs text-muted-foreground">No buses scheduled.</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
