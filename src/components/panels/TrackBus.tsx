"use client";

import { useState } from "react";
import { Navigation, Gauge } from "lucide-react";
import type { City } from "@/lib/types";
import { busesOnRoute, findVehicle } from "@/lib/simulation";
import { RouteBadge, EtaPill, Occupancy } from "@/components/ui/Bits";
import { cn, formatEta } from "@/lib/utils";

export function TrackBus({
  city,
  epochSec,
  focusVehicleId,
  setFocusVehicle,
}: {
  city: City;
  epochSec: number;
  focusVehicleId: string | null;
  setFocusVehicle: (id: string) => void;
}) {
  const focused = focusVehicleId ? findVehicle(city, focusVehicleId, epochSec) : null;
  const [openRouteId, setOpenRouteId] = useState<string | null>(
    focused?.routeId ?? null
  );

  const stopName = (id: string) =>
    city.stops.find((s) => s.id === id)?.name ?? id;

  return (
    <div className="space-y-4">
      {focused && (
        <div
          className="rounded-xl border-2 p-4 shadow-card"
          style={{ borderColor: focused.color }}
        >
          <div className="flex items-center gap-3">
            <RouteBadge number={focused.routeNumber} color={focused.color} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">→ {focused.destination}</p>
              <p className="text-xs text-muted-foreground">Bus {focused.vehicleId}</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-live-moving">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live-moving opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live-moving" />
              </span>
              Live
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Navigation size={16} className="text-brand-600" />
              <div>
                <p className="text-xs text-muted-foreground">Next stop</p>
                <p className="text-sm font-medium">{stopName(focused.nextStopId)}</p>
              </div>
            </div>
            <EtaPill sec={focused.etaToNextStopSec} />
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <Occupancy level={focused.occupancy} />
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Gauge size={14} /> {focused.speedKmph} km/h
            </span>
          </div>
        </div>
      )}

      <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {focused ? "Track another bus" : "Pick a route, then a bus to track"}
      </p>

      <ul className="space-y-2">
        {city.routes.map((r) => {
          const open = openRouteId === r.id;
          const buses = open ? busesOnRoute(city, r, epochSec) : [];
          return (
            <li key={r.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <button
                onClick={() => setOpenRouteId(open ? null : r.id)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50"
              >
                <RouteBadge number={r.number} color={r.color} />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{r.name}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  className={cn("text-muted-foreground transition-transform", open && "rotate-180")}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              {open && (
                <ul className="border-t border-border">
                  {buses.map((b) => (
                    <li key={b.vehicleId}>
                      <button
                        onClick={() => setFocusVehicle(b.vehicleId)}
                        className={cn(
                          "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-brand-50/50",
                          b.vehicleId === focusVehicleId && "bg-brand-50 font-medium"
                        )}
                      >
                        <span>
                          Bus {b.vehicleId}
                          <span className="ml-2 text-xs text-muted-foreground">
                            → {b.destination}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatEta(b.etaToNextStopSec)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
