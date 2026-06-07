"use client";

import { ArrowDownUp, History } from "lucide-react";
import type { City } from "@/lib/types";
import type { SavedTrip } from "@/lib/useFavourites";
import { tripOptions } from "@/lib/simulation";
import { StopSelect } from "@/components/ui/StopSelect";
import { RouteBadge, EtaPill } from "@/components/ui/Bits";
import { formatEta } from "@/lib/utils";

export function FindBuses({
  city,
  epochSec,
  fromStopId,
  toStopId,
  setFrom,
  setTo,
  onViewRoute,
  recentTrips = [],
  onClearRecents,
}: {
  city: City;
  epochSec: number;
  fromStopId: string | null;
  toStopId: string | null;
  setFrom: (id: string | null) => void;
  setTo: (id: string | null) => void;
  onViewRoute: (routeId: string) => void;
  recentTrips?: SavedTrip[];
  onClearRecents?: () => void;
}) {
  const ready = fromStopId && toStopId;
  const options = ready ? tripOptions(city, fromStopId!, toStopId!, epochSec) : [];
  const stopName = (id: string) => city.stops.find((s) => s.id === id)?.name ?? null;
  // Only recents whose both stops exist in the current city.
  const cityRecents = recentTrips.filter(
    (t) => stopName(t.from) && stopName(t.to)
  );

  function swap() {
    setFrom(toStopId);
    setTo(fromStopId);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded-xl border border-border bg-card p-3 shadow-card">
        <StopSelect
          stops={city.stops}
          value={fromStopId}
          onChange={setFrom}
          placeholder="From stop"
          exclude={toStopId}
        />
        <div className="flex justify-center">
          <button
            onClick={swap}
            disabled={!fromStopId && !toStopId}
            className="rounded-full border border-border bg-card p-1.5 text-muted-foreground hover:text-brand-600 disabled:opacity-40"
            title="Swap"
          >
            <ArrowDownUp size={15} />
          </button>
        </div>
        <StopSelect
          stops={city.stops}
          value={toStopId}
          onChange={setTo}
          placeholder="To stop"
          exclude={fromStopId}
        />
      </div>

      {!ready && cityRecents.length > 0 && (
        <div>
          <div className="flex items-center justify-between px-1 pb-2">
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <History size={13} /> Recent
            </p>
            {onClearRecents && (
              <button
                onClick={onClearRecents}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <ul className="space-y-1.5">
            {cityRecents.map((t, i) => (
              <li key={`${t.from}-${t.to}-${i}`}>
                <button
                  onClick={() => {
                    setFrom(t.from);
                    setTo(t.to);
                  }}
                  className="flex w-full items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-left text-sm shadow-card hover:bg-muted/50"
                >
                  <span className="truncate">{stopName(t.from)}</span>
                  <ArrowDownUp size={12} className="shrink-0 rotate-90 text-muted-foreground" />
                  <span className="truncate">{stopName(t.to)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!ready && cityRecents.length === 0 && (
        <p className="px-1 text-sm text-muted-foreground">
          Pick an origin and destination to see direct buses with live arrival
          times.
        </p>
      )}

      {ready && options.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-center text-sm text-muted-foreground">
          No direct route between these stops. Try a nearby interchange.
        </div>
      )}

      {options.length > 0 && (
        <div>
          <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {options.length} direct {options.length === 1 ? "route" : "routes"}
          </p>
          <ul className="space-y-2">
            {options.map((o) => (
              <li key={o.route.id}>
                <button
                  onClick={() => onViewRoute(o.route.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-left shadow-card transition-colors hover:border-brand-500/40 hover:bg-brand-50/40"
                >
                  <RouteBadge number={o.route.number} color={o.route.color} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{o.route.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.stopsCount} stops · ~{formatEta(o.travelSec)} ride · ₹{o.fare}
                    </p>
                  </div>
                  <div className="text-right">
                    <EtaPill sec={o.nextEtaSec} />
                    <p className="mt-1 text-[11px] text-muted-foreground">next bus</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
