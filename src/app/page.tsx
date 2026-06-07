"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Bus, MapPin, Route as RouteIcon, Search, Locate, Crosshair, Share2, Check, Sun, Moon } from "lucide-react";
import { CITIES, getCity } from "@/data/cities";
import { ROUTE_PATHS } from "@/data/routePaths";
import { allBuses, findVehicle } from "@/lib/simulation";
import { haversine } from "@/lib/geo";
import { useClock } from "@/lib/useClock";
import { useFavourites } from "@/lib/useFavourites";
import { useTheme } from "@/lib/useTheme";
import type { LatLng } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LiveOverview } from "@/components/panels/LiveOverview";
import { FindBuses } from "@/components/panels/FindBuses";
import { StopArrivals } from "@/components/panels/StopArrivals";
import { TrackBus } from "@/components/panels/TrackBus";
import { RouteDetail } from "@/components/panels/RouteDetail";
import { NearMe } from "@/components/panels/NearMe";

const BusMap = dynamic(() => import("@/components/BusMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

type Tab = "live" | "near" | "find" | "stops" | "track";

const TABS: { id: Tab; label: string; icon: typeof Bus }[] = [
  { id: "live", label: "Live", icon: Bus },
  { id: "near", label: "Near", icon: Crosshair },
  { id: "find", label: "Find", icon: Search },
  { id: "stops", label: "Stops", icon: MapPin },
  { id: "track", label: "Track", icon: Locate },
];

const TAB_IDS: Tab[] = ["live", "near", "find", "stops", "track"];

interface UrlState {
  city: string;
  tab: Tab;
  route: string | null;
  from: string | null;
  to: string | null;
  stop: string | null;
  bus: string | null;
}

function buildQuery(s: UrlState): string {
  const p = new URLSearchParams();
  if (s.city) p.set("city", s.city);
  if (s.tab && s.tab !== "live") p.set("tab", s.tab);
  if (s.route) p.set("route", s.route);
  if (s.from) p.set("from", s.from);
  if (s.to) p.set("to", s.to);
  if (s.stop) p.set("stop", s.stop);
  if (s.bus) p.set("bus", s.bus);
  return p.toString();
}

export default function Page() {
  const epochSec = useClock();
  const [cityId, setCityId] = useState(CITIES[0].id);
  const [tab, setTab] = useState<Tab>("live");
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [fromStopId, setFromStopId] = useState<string | null>(null);
  const [toStopId, setToStopId] = useState<string | null>(null);
  const [arrivalsStopId, setArrivalsStopId] = useState<string | null>(null);
  const [focusVehicleId, setFocusVehicleId] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<LatLng | null>(null);
  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [isDemoLocation, setIsDemoLocation] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [urlReady, setUrlReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const fav = useFavourites();
  const { theme, toggle: toggleTheme } = useTheme();
  const { addRecentTrip } = fav;
  // Record a recent search once both ends are chosen. Depend only on the stable
  // callback (not the whole `fav` object, which is a fresh reference each render).
  useEffect(() => {
    if (fromStopId && toStopId) addRecentTrip(fromStopId, toStopId);
  }, [fromStopId, toStopId, addRecentTrip]);

  // Hydrate state from the URL once, on mount (kept out of render to avoid a
  // server/client hydration mismatch).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get("city");
    const validCity = c && CITIES.some((x) => x.id === c) ? c : CITIES[0].id;
    if (validCity !== CITIES[0].id) setCityId(validCity);
    const cityObj = getCity(validCity);

    const t = p.get("tab");
    if (t && (TAB_IDS as string[]).includes(t)) setTab(t as Tab);
    const route = p.get("route");
    if (route && cityObj.routes.some((r) => r.id === route)) setSelectedRouteId(route);
    const from = p.get("from");
    if (from && cityObj.stops.some((s) => s.id === from)) setFromStopId(from);
    const to = p.get("to");
    if (to && cityObj.stops.some((s) => s.id === to)) setToStopId(to);
    const stop = p.get("stop");
    if (stop && cityObj.stops.some((s) => s.id === stop)) setArrivalsStopId(stop);
    const bus = p.get("bus");
    if (bus) setFocusVehicleId(bus);
    setUrlReady(true);
  }, []);

  // Reflect state changes back into the URL (replaceState — no history spam).
  useEffect(() => {
    if (!urlReady) return;
    const q = buildQuery({
      city: cityId,
      tab,
      route: selectedRouteId,
      from: fromStopId,
      to: toStopId,
      stop: arrivalsStopId,
      bus: focusVehicleId,
    });
    window.history.replaceState(null, "", window.location.pathname + (q ? `?${q}` : ""));
  }, [
    urlReady,
    cityId,
    tab,
    selectedRouteId,
    fromStopId,
    toStopId,
    arrivalsStopId,
    focusVehicleId,
  ]);

  const city = getCity(cityId);
  const buses = useMemo(() => allBuses(city, epochSec), [city, epochSec]);
  const selectedRoute = city.routes.find((r) => r.id === selectedRouteId) ?? null;

  const routeLine = useMemo<LatLng[] | null>(() => {
    if (!selectedRoute) return null;
    if (ROUTE_PATHS[selectedRoute.id]) return ROUTE_PATHS[selectedRoute.id];
    const byId = new Map(city.stops.map((s) => [s.id, s] as const));
    return selectedRoute.stops.map((id) => byId.get(id)!.pos);
  }, [selectedRoute, city]);

  function resetSelections() {
    setSelectedRouteId(null);
    setFocusVehicleId(null);
    setArrivalsStopId(null);
    setFromStopId(null);
    setToStopId(null);
    setFlyTarget(null);
    setUserPos(null);
    setIsDemoLocation(false);
    setLocError(null);
  }

  async function share() {
    const q = buildQuery({
      city: cityId,
      tab,
      route: selectedRouteId,
      from: fromStopId,
      to: toStopId,
      stop: arrivalsStopId,
      bus: focusVehicleId,
    });
    const url =
      window.location.origin + window.location.pathname + (q ? `?${q}` : "");
    const nav = navigator as Navigator & {
      share?: (data: { title?: string; url?: string }) => Promise<void>;
    };
    if (nav.share) {
      try {
        await nav.share({ title: "Where's My Bus", url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  function changeCity(id: string) {
    setCityId(id);
    resetSelections();
    setTab("live");
  }

  // Snap to the nearest covered city for a given location and drop the
  // "you are here" marker there.
  function placeUser(pos: LatLng, demo: boolean) {
    let best = CITIES[0];
    let bestD = Infinity;
    for (const c of CITIES) {
      const d = haversine(pos, c.center);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    setCityId(best.id);
    setSelectedRouteId(null);
    setFocusVehicleId(null);
    setUserPos(pos);
    setIsDemoLocation(demo);
    setFlyTarget(pos);
  }

  // switchCity=true snaps to the nearest covered city (Near Me); false just
  // records the location to measure distance to the currently-viewed stop.
  function locateMe(switchCity = true) {
    setLocError(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocError("Geolocation isn't available in this browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLocating(false);
        const pos: LatLng = [p.coords.latitude, p.coords.longitude];
        if (switchCity) {
          placeUser(pos, false);
        } else {
          setUserPos(pos);
          setIsDemoLocation(false);
          setFlyTarget(pos);
        }
      },
      (err) => {
        setLocating(false);
        setLocError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. You can use the demo location instead."
            : "Couldn't get your location. Try the demo location."
        );
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  function useDemoLocation() {
    setLocError(null);
    placeUser(city.center, true);
  }

  function openRoute(routeId: string) {
    setSelectedRouteId(routeId);
    const r = city.routes.find((x) => x.id === routeId);
    const byId = new Map(city.stops.map((s) => [s.id, s] as const));
    if (r) setFlyTarget(byId.get(r.stops[Math.floor(r.stops.length / 2)])!.pos);
  }

  function selectArrivalsStop(id: string | null) {
    setArrivalsStopId(id);
    const stop = city.stops.find((s) => s.id === id);
    if (stop) setFlyTarget(stop.pos);
  }

  function trackVehicle(id: string) {
    setFocusVehicleId(id);
    setSelectedRouteId(null);
    setTab("track");
    const bus = findVehicle(city, id, epochSec || Date.now() / 1000);
    if (bus) setFlyTarget(bus.pos);
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="z-[1000] flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Bus size={20} />
          </span>
          <div className="leading-tight">
            <h1 className="text-base font-bold">Where&apos;s My Bus</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Live city bus tracker · India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-card text-foreground transition-colors hover:bg-muted"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={share}
            className="flex items-center gap-1.5 rounded-lg border border-input bg-card py-2 px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            title="Share this view"
          >
            {copied ? <Check size={15} className="text-live-moving" /> : <Share2 size={15} />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
          </button>

          <div className="relative">
            <select
              value={cityId}
              onChange={(e) => changeCity(e.target.value)}
              className="appearance-none rounded-lg border border-input bg-card py-2 pl-3 pr-9 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.operator}
                </option>
              ))}
            </select>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Map (top on mobile, right on desktop) */}
        <div className="order-1 h-[42vh] w-full md:order-2 md:h-auto md:flex-1">
          <BusMap
            city={city}
            buses={buses}
            highlightRouteId={selectedRoute?.id ?? null}
            routeLine={routeLine}
            routeColor={selectedRoute?.color}
            focusVehicleId={focusVehicleId}
            selectedStopId={arrivalsStopId}
            userPos={userPos}
            flyTarget={flyTarget}
            dark={theme === "dark"}
            onSelectBus={trackVehicle}
            onSelectStop={(id) => {
              setTab("stops");
              selectArrivalsStop(id);
            }}
          />
        </div>

        {/* Panel */}
        <section className="order-2 flex w-full flex-col border-t border-border bg-background md:order-1 md:w-[404px] md:border-r md:border-t-0">
          {/* Tabs */}
          <nav className="flex shrink-0 border-b border-border bg-card">
            {TABS.map((t) => {
              const active = tab === t.id && !selectedRoute;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedRouteId(null);
                    setTab(t.id);
                  }}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                    active
                      ? "text-brand-600"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <t.icon size={18} />
                  {t.label}
                  <span
                    className={cn(
                      "h-0.5 w-8 rounded-full",
                      active ? "bg-brand-600" : "bg-transparent"
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <div className="thin-scroll flex-1 overflow-y-auto p-3">
            {selectedRoute ? (
              <RouteDetail
                city={city}
                route={selectedRoute}
                epochSec={epochSec}
                onBack={() => setSelectedRouteId(null)}
                onTrackVehicle={trackVehicle}
              />
            ) : tab === "live" ? (
              <LiveOverview
                city={city}
                epochSec={epochSec}
                onSelectRoute={openRoute}
                favStops={fav.favStops}
                onOpenStop={(id) => {
                  setTab("stops");
                  selectArrivalsStop(id);
                }}
              />
            ) : tab === "near" ? (
              <NearMe
                city={city}
                epochSec={epochSec}
                userPos={userPos}
                locating={locating}
                error={locError}
                isDemo={isDemoLocation}
                onLocate={locateMe}
                onUseDemo={useDemoLocation}
                onOpenStop={(id) => {
                  setTab("stops");
                  selectArrivalsStop(id);
                }}
                onTrackVehicle={trackVehicle}
                isFav={fav.isFav}
                onToggleFav={fav.toggleFav}
              />
            ) : tab === "find" ? (
              <FindBuses
                city={city}
                epochSec={epochSec}
                fromStopId={fromStopId}
                toStopId={toStopId}
                setFrom={setFromStopId}
                setTo={setToStopId}
                onViewRoute={openRoute}
                recentTrips={fav.recentTrips}
                onClearRecents={fav.clearRecents}
              />
            ) : tab === "stops" ? (
              <StopArrivals
                city={city}
                epochSec={epochSec}
                stopId={arrivalsStopId}
                setStop={selectArrivalsStop}
                onTrackVehicle={trackVehicle}
                isFav={fav.isFav}
                onToggleFav={fav.toggleFav}
                userPos={userPos}
                locating={locating}
                onLocate={() => locateMe(false)}
              />
            ) : (
              <TrackBus
                city={city}
                epochSec={epochSec}
                focusVehicleId={focusVehicleId}
                setFocusVehicle={trackVehicle}
              />
            )}
          </div>

          <footer className="shrink-0 border-t border-border bg-card px-3 py-2 text-center text-[11px] text-muted-foreground">
            <RouteIcon size={11} className="mr-1 inline" />
            Live positions are simulated for demonstration · {city.operator}
          </footer>
        </section>
      </main>
    </div>
  );
}
