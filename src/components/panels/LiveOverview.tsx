"use client";

import { MapPin } from "lucide-react";
import type { City } from "@/lib/types";
import { arrivalsAtStop, busesOnRoute } from "@/lib/simulation";
import { alertsForCity, routeHasAlert } from "@/data/alerts";
import { RouteBadge, EtaPill } from "@/components/ui/Bits";
import { AlertSummary } from "@/components/ui/AlertCard";

export function LiveOverview({
  city,
  epochSec,
  onSelectRoute,
  favStops = [],
  onOpenStop,
}: {
  city: City;
  epochSec: number;
  onSelectRoute: (routeId: string) => void;
  favStops?: string[];
  onOpenStop?: (stopId: string) => void;
}) {
  const totalLive = city.routes.reduce(
    (n, r) => n + busesOnRoute(city, r, epochSec).length,
    0
  );

  const savedInCity = city.stops.filter((s) => favStops.includes(s.id));
  const alerts = alertsForCity(city.id);

  return (
    <div className="space-y-3">
      <AlertSummary alerts={alerts} />

      {savedInCity.length > 0 && (
        <div>
          <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            ★ Saved stops
          </p>
          <ul className="space-y-2">
            {savedInCity.map((s) => {
              const next = arrivalsAtStop(city, s.id, epochSec, 1)[0];
              return (
                <li key={s.id}>
                  <button
                    onClick={() => onOpenStop?.(s.id)}
                    className="flex w-full items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-left shadow-card transition-colors hover:bg-muted/50"
                  >
                    <MapPin size={15} className="shrink-0 text-amber-500/80" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{s.name}</span>
                    {next ? (
                      <span className="flex items-center gap-1.5">
                        <RouteBadge number={next.routeNumber} color={next.color} />
                        <EtaPill sec={next.etaSec} />
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-brand-700">{city.operator} network</p>
          <p className="text-xs text-brand-600/80">
            {city.routes.length} routes · {city.stops.length} stops
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold tabular-nums text-brand-700">{totalLive}</p>
          <p className="text-xs text-brand-600/80">buses live</p>
        </div>
      </div>

      <p className="px-1 pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Routes
      </p>
      <ul className="space-y-2">
        {city.routes.map((r) => {
          const live = busesOnRoute(city, r, epochSec).length;
          return (
            <li key={r.id}>
              <button
                onClick={() => onSelectRoute(r.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-left shadow-card transition-colors hover:border-brand-500/40 hover:bg-brand-50/40"
              >
                <RouteBadge number={r.number} color={r.color} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 truncate text-sm font-medium">
                    {r.name}
                    {routeHasAlert(r.id) && (
                      <span
                        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70"
                        title="Service alert on this route"
                      />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Every {r.headwayMin} min · ₹{r.fare} · {r.firstBus}–{r.lastBus}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-live-moving">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live-moving opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-live-moving" />
                  </span>
                  {live}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
