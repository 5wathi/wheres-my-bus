"use client";

import { ArrowLeft } from "lucide-react";
import type { City, Route } from "@/lib/types";
import { busesOnRoute } from "@/lib/simulation";
import { alertsForRoute } from "@/data/alerts";
import { RouteBadge } from "@/components/ui/Bits";
import { AlertCard } from "@/components/ui/AlertCard";
import { formatEta } from "@/lib/utils";

export function RouteDetail({
  city,
  route,
  epochSec,
  onBack,
  onTrackVehicle,
}: {
  city: City;
  route: Route;
  epochSec: number;
  onBack: () => void;
  onTrackVehicle: (vehicleId: string) => void;
}) {
  const buses = busesOnRoute(city, route, epochSec);
  const alerts = alertsForRoute(route.id);
  const stopName = (id: string) => city.stops.find((s) => s.id === id)?.name ?? id;

  // Buses approaching each stop, keyed by their next stop, for inline display.
  const incomingByStop = new Map<string, typeof buses>();
  for (const b of buses) {
    const arr = incomingByStop.get(b.nextStopId) ?? [];
    arr.push(b);
    incomingByStop.set(b.nextStopId, arr);
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex items-start gap-3">
        <RouteBadge number={route.number} color={route.color} />
        <div>
          <h2 className="text-base font-semibold leading-tight">{route.name}</h2>
          <p className="text-xs text-muted-foreground">{route.operator}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat label="Frequency" value={`${route.headwayMin} min`} />
        <Stat label="Fare" value={`₹${route.fare}`} />
        <Stat label="Live now" value={`${buses.length}`} />
      </div>
      <p className="px-1 text-xs text-muted-foreground">
        Service {route.firstBus}–{route.lastBus} · {route.speedKmph} km/h avg
      </p>

      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((a) => (
            <AlertCard key={a.id} alert={a} />
          ))}
        </div>
      )}

      <p className="px-1 pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Stops
      </p>
      <ol className="relative ml-1.5 border-l-2" style={{ borderColor: route.color }}>
        {route.stops.map((sid, i) => {
          const incoming = incomingByStop.get(sid) ?? [];
          return (
            <li key={sid} className="relative pb-4 pl-5 last:pb-0">
              <span
                className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white"
                style={{ backgroundColor: route.color }}
              />
              <p className="text-sm font-medium leading-tight">{stopName(sid)}</p>
              {i === 0 && <span className="text-[11px] text-muted-foreground">Origin</span>}
              {i === route.stops.length - 1 && (
                <span className="text-[11px] text-muted-foreground">Terminus</span>
              )}
              {incoming.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {incoming.map((b) => (
                    <button
                      key={b.vehicleId}
                      onClick={() => onTrackVehicle(b.vehicleId)}
                      className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 hover:bg-brand-100"
                    >
                      🚌 {b.vehicleId} · {formatEta(b.etaToNextStopSec)}
                    </button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card py-2 shadow-card">
      <p className="text-sm font-semibold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
