import type { ServiceAlert } from "@/lib/types";

// Seeded service alerts. In a real deployment these would come from a feed
// (e.g. GTFS-Realtime service alerts); the UI consumes the same shape.
export const ALERTS: ServiceAlert[] = [
  // Bengaluru
  {
    id: "blr-a1",
    cityId: "blr",
    routeIds: ["blr-356", "blr-g4"],
    severity: "diversion",
    title: "Diversion near Silk Board",
    detail:
      "Flyover work — buses are routed via BTM 2nd Stage. Expect 10–15 min of extra travel time.",
  },
  {
    id: "blr-a2",
    cityId: "blr",
    routeIds: ["blr-335e"],
    severity: "delay",
    title: "Running ~10 min late",
    detail: "Heavy traffic on Old Airport Road toward Whitefield.",
  },
  {
    id: "blr-a3",
    cityId: "blr",
    routeIds: "all",
    severity: "info",
    title: "Digital passes accepted",
    detail: "Show your BMTC pass in the app — no paper ticket needed.",
  },
  // Delhi
  {
    id: "del-a1",
    cityId: "del",
    routeIds: ["del-521"],
    severity: "delay",
    title: "Delays around ITO",
    detail: "Congestion near ITO during peak hours; allow extra time.",
  },
  // Mumbai
  {
    id: "mum-a1",
    cityId: "mum",
    routeIds: ["mum-700"],
    severity: "diversion",
    title: "Boarding point moved at Mahim",
    detail: "Road resurfacing — boarding shifted ~200 m north of the usual stop.",
  },
  // Chennai
  {
    id: "maa-a1",
    cityId: "maa",
    routeIds: ["maa-21g"],
    severity: "delay",
    title: "Weather delays near Guindy",
    detail: "Rain is slowing services through Guindy; buses may bunch.",
  },
  // Hyderabad
  {
    id: "hyd-a1",
    cityId: "hyd",
    routeIds: ["hyd-49m"],
    severity: "info",
    title: "New AC buses in service",
    detail: "AC buses now run on this corridor through the day.",
  },
  // Coimbatore
  {
    id: "cbe-a1",
    cityId: "cbe",
    routeIds: ["cbe-s12"],
    severity: "delay",
    title: "Delays on Avinashi Road",
    detail: "Metro construction near Hope College is slowing buses toward Singanallur.",
  },
];

export function alertsForCity(cityId: string): ServiceAlert[] {
  return ALERTS.filter((a) => a.cityId === cityId);
}

export function alertsForRoute(routeId: string): ServiceAlert[] {
  // Route/stop ids are city-prefixed (e.g. "cbe-s12"); a network-wide ("all")
  // alert must only apply to routes in its own city.
  const cityId = routeId.split("-")[0];
  return ALERTS.filter(
    (a) =>
      a.cityId === cityId &&
      (a.routeIds === "all" || a.routeIds.includes(routeId))
  );
}

/** True if a route has any non-info alert (used for the route-row dot). */
export function routeHasAlert(routeId: string): boolean {
  return ALERTS.some(
    (a) =>
      a.severity !== "info" &&
      a.routeIds !== "all" &&
      a.routeIds.includes(routeId)
  );
}
