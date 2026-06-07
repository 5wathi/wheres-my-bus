"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { City, LatLng, LiveBus } from "@/lib/types";

// Default marker colour for "background" buses — a quiet slate so the map
// reads calmly. Buses gain their route colour only when their route is
// selected or the bus is being tracked.
const NEUTRAL = "#94a3b8";

function busIcon(bus: LiveBus, focused: boolean, colored: boolean): L.DivIcon {
  const fill = colored ? bus.color : NEUTRAL;
  const size = focused ? 34 : colored ? 26 : 22;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        ${focused ? `<span style="position:absolute;inset:0;border-radius:9999px;background:${fill};opacity:.35;animation:wmb-ping 1.6s ease-out infinite;"></span>` : ""}
        <div style="
          position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
          background:${fill};border:2px solid #fff;border-radius:9999px;
          box-shadow:0 1px 3px rgba(0,0,0,.28);color:#fff;font-size:${focused ? 11 : 9}px;
          font-weight:700;font-family:ui-sans-serif,system-ui;opacity:${colored || focused ? 1 : 0.85};">
          <span style="transform:rotate(${bus.heading}deg);line-height:1;">▲</span>
        </div>
      </div>`,
  });
}

// Leaflet measures its container on init; if the flex layout settles after
// that (or the pane resizes), tiles only fill the stale size. Recompute on
// mount and whenever the container resizes.
function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const fix = () => map.invalidateSize();
    fix();
    const t1 = setTimeout(fix, 150);
    const t2 = setTimeout(fix, 600);
    const ro = new ResizeObserver(fix);
    ro.observe(container);
    window.addEventListener("resize", fix);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", fix);
    };
  }, [map]);
  return null;
}

function FlyTo({ target, zoom }: { target: LatLng | null; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, zoom ?? map.getZoom(), { duration: 0.8 });
  }, [target, zoom, map]);
  return null;
}

function CityView({ center, zoom }: { center: LatLng; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

export interface BusMapProps {
  city: City;
  buses: LiveBus[];
  highlightRouteId?: string | null;
  routeLine?: LatLng[] | null;
  routeColor?: string;
  focusVehicleId?: string | null;
  selectedStopId?: string | null;
  userPos?: LatLng | null;
  flyTarget?: LatLng | null;
  dark?: boolean;
  onSelectBus?: (vehicleId: string) => void;
  onSelectStop?: (stopId: string) => void;
}

function userIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `
      <div style="position:relative;width:22px;height:22px;">
        <span style="position:absolute;inset:0;border-radius:9999px;background:#2563eb;opacity:.3;animation:wmb-ping 1.8s ease-out infinite;"></span>
        <div style="position:absolute;inset:5px;background:#2563eb;border:2px solid #fff;border-radius:9999px;box-shadow:0 1px 4px rgba(0,0,0,.4);"></div>
      </div>`,
  });
}

export default function BusMap({
  city,
  buses,
  highlightRouteId,
  routeLine,
  routeColor,
  focusVehicleId,
  selectedStopId,
  userPos,
  flyTarget,
  dark,
  onSelectBus,
  onSelectStop,
}: BusMapProps) {
  const shownBuses = useMemo(
    () =>
      highlightRouteId
        ? buses.filter((b) => b.routeId === highlightRouteId)
        : buses,
    [buses, highlightRouteId]
  );

  return (
    <MapContainer
      center={city.center}
      zoom={city.zoom}
      zoomControl={false}
      className="h-full w-full"
      style={{ background: "hsl(var(--map-bg))" }}
    >
      <TileLayer
        key={dark ? "dark" : "light"}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={
          dark
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        }
      />

      <InvalidateSize />
      <CityView center={city.center} zoom={city.zoom} />
      <FlyTo target={flyTarget ?? null} zoom={14} />

      {routeLine && routeLine.length > 1 && (
        <Polyline
          positions={routeLine}
          pathOptions={{ color: routeColor ?? "#4f46e5", weight: 5, opacity: 0.85 }}
        />
      )}

      {city.stops.map((s) => {
        const isSelected = s.id === selectedStopId;
        return (
          <CircleMarker
            key={s.id}
            center={s.pos}
            radius={isSelected ? 7 : 4}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: isSelected ? "#4f46e5" : "#64748b",
              fillOpacity: 1,
            }}
            eventHandlers={{ click: () => onSelectStop?.(s.id) }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              {s.name}
            </Tooltip>
          </CircleMarker>
        );
      })}

      {userPos &&
        selectedStopId &&
        (() => {
          const s = city.stops.find((x) => x.id === selectedStopId);
          return s ? (
            <Polyline
              positions={[userPos, s.pos]}
              pathOptions={{
                color: "#2563eb",
                weight: 2.5,
                opacity: 0.85,
                dashArray: "5 7",
              }}
            />
          ) : null;
        })()}

      {userPos && (
        <Marker position={userPos} icon={userIcon()} zIndexOffset={2000}>
          <Tooltip direction="top" offset={[0, -8]}>
            You are here
          </Tooltip>
        </Marker>
      )}

      {shownBuses.map((b) => {
        const focused = b.vehicleId === focusVehicleId;
        // Colour a bus only when its route is selected or it's being tracked;
        // otherwise it stays a quiet neutral.
        const colored = !!highlightRouteId || focused;
        return (
        <Marker
          key={b.vehicleId}
          position={b.pos}
          icon={busIcon(b, focused, colored)}
          zIndexOffset={focused ? 1000 : 0}
          eventHandlers={{ click: () => onSelectBus?.(b.vehicleId) }}
        >
          <Tooltip direction="top" offset={[0, -10]}>
            <span className="font-semibold">{b.routeNumber}</span> → {b.destination}
          </Tooltip>
        </Marker>
        );
      })}
    </MapContainer>
  );
}
