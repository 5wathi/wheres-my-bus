import type { Arrival, City, LatLng, LiveBus, Route, Stop } from "./types";
import {
  buildGeometry,
  pointAtDistance,
  stopDistances,
  type PolylineGeometry,
} from "./geo";
import { ROUTE_PATHS } from "@/data/routePaths";

/**
 * Per-route precomputed simulation state. A route is modelled as an out-and-
 * back service: a bus travels from the first stop to the last (forward), then
 * returns (back), giving a cycle of length 2 × routeLength. Buses are spaced
 * evenly around the cycle by the route's headway.
 */
interface RouteSim {
  route: Route;
  geo: PolylineGeometry;
  stopPos: LatLng[];
  /** Distance along the polyline of each stop, in order, metres. */
  stopDistM: number[];
  cycleM: number;
  speedMps: number;
  numBuses: number;
}

const simCache = new Map<string, RouteSim>();

function getStopPositions(city: City, route: Route): LatLng[] {
  const byId = new Map(city.stops.map((s) => [s.id, s] as const));
  return route.stops.map((id) => {
    const s = byId.get(id);
    if (!s) throw new Error(`Route ${route.id} references unknown stop ${id}`);
    return s.pos;
  });
}

function buildRouteSim(city: City, route: Route): RouteSim {
  const cached = simCache.get(route.id);
  if (cached) return cached;

  const stopPos = getStopPositions(city, route);
  const geo = buildGeometry(ROUTE_PATHS[route.id] ?? route.path ?? stopPos);
  const stopDistM = stopDistances(geo, stopPos);
  const speedMps = (route.speedKmph * 1000) / 3600;
  const cycleM = geo.totalM * 2;
  const cycleSec = cycleM / speedMps;
  const headwaySec = route.headwayMin * 60;
  const numBuses = Math.max(1, Math.round(cycleSec / headwaySec));

  const sim: RouteSim = { route, geo, stopPos, stopDistM, cycleM, speedMps, numBuses };
  simCache.set(route.id, sim);
  return sim;
}

// A stable per-route phase offset so buses don't all start at the terminus
// together. Derived from the route id (deterministic, no Math.random).
function routeSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % 100000;
}

const occLevels: LiveBus["occupancy"][] = ["low", "medium", "high"];

/**
 * The cycle-distance (0 .. cycleM) of a single bus at a given time. Forward
 * leg is [0, totalM]; return leg is (totalM, cycleM].
 */
function busCycleDistance(sim: RouteSim, busIndex: number, epochSec: number): number {
  const cycleSec = sim.cycleM / sim.speedMps;
  const spacing = sim.cycleM / sim.numBuses;
  const seedOffset = routeSeed(sim.route.id) % sim.cycleM;
  const base = (epochSec % cycleSec) * sim.speedMps;
  return (base + busIndex * spacing + seedOffset) % sim.cycleM;
}

function busFromCycleDistance(
  sim: RouteSim,
  busIndex: number,
  cd: number,
  cityStops: Map<string, Stop>
): LiveBus {
  const forward = cd <= sim.geo.totalM;
  const distanceM = forward ? cd : sim.cycleM - cd;
  const { pos, heading } = pointAtDistance(sim.geo, distanceM);
  const direction: 1 | -1 = forward ? 1 : -1;

  // Next stop in the current direction of travel.
  const route = sim.route;
  let nextStopIdx: number;
  if (forward) {
    nextStopIdx = sim.stopDistM.findIndex((sd) => sd > distanceM + 1);
    if (nextStopIdx === -1) nextStopIdx = route.stops.length - 1;
  } else {
    // travelling toward stop 0; the next stop is the largest stopDist < distanceM
    nextStopIdx = 0;
    for (let i = route.stops.length - 1; i >= 0; i--) {
      if (sim.stopDistM[i] < distanceM - 1) {
        nextStopIdx = i;
        break;
      }
    }
  }
  const nextStopId = route.stops[nextStopIdx];
  const etaM = Math.abs(sim.stopDistM[nextStopIdx] - distanceM);
  const etaToNextStopSec = Math.round(etaM / sim.speedMps);

  const destId = forward ? route.stops[route.stops.length - 1] : route.stops[0];
  const destination = cityStops.get(destId)?.name ?? "Terminus";

  const occupancy =
    occLevels[(busIndex + Math.floor((epochBucket(cd, sim)) )) % occLevels.length];

  return {
    vehicleId: `${route.number}-${busIndex + 1}`,
    routeId: route.id,
    routeNumber: route.number,
    color: route.color,
    pos,
    heading: forward ? heading : (heading + 180) % 360,
    direction,
    speedKmph: route.speedKmph,
    distanceM,
    nextStopId,
    etaToNextStopSec,
    destination,
    occupancy,
  };
}

// Vary occupancy slowly over the route so it isn't static, without randomness.
function epochBucket(cd: number, sim: RouteSim): number {
  return Math.floor((cd / sim.cycleM) * 4);
}

/** All live buses for a route at the given moment. */
export function busesOnRoute(city: City, route: Route, epochSec: number): LiveBus[] {
  const sim = buildRouteSim(city, route);
  const cityStops = new Map(city.stops.map((s) => [s.id, s] as const));
  const out: LiveBus[] = [];
  for (let k = 0; k < sim.numBuses; k++) {
    const cd = busCycleDistance(sim, k, epochSec);
    out.push(busFromCycleDistance(sim, k, cd, cityStops));
  }
  return out;
}

/** All live buses across the whole city. */
export function allBuses(city: City, epochSec: number): LiveBus[] {
  return city.routes.flatMap((r) => busesOnRoute(city, r, epochSec));
}

/**
 * Upcoming arrivals at a stop, soonest first. Considers every bus on every
 * route that serves the stop, in both travel directions.
 */
export function arrivalsAtStop(
  city: City,
  stopId: string,
  epochSec: number,
  limit = 8
): Arrival[] {
  const cityStops = new Map(city.stops.map((s) => [s.id, s] as const));
  const arrivals: Arrival[] = [];

  for (const route of city.routes) {
    const stopIdx = route.stops.indexOf(stopId);
    if (stopIdx === -1) continue;
    const sim = buildRouteSim(city, route);
    const s = sim.stopDistM[stopIdx];
    // The stop is passed twice per cycle: forward at cd=s, return at cd=cycleM-s.
    const targets = [s, sim.cycleM - s];

    for (let k = 0; k < sim.numBuses; k++) {
      const cd = busCycleDistance(sim, k, epochSec);
      // Smallest forward distance until this bus reaches one of the targets.
      let bestM = Infinity;
      let arrivesForward = true;
      for (let t = 0; t < targets.length; t++) {
        const ahead = (targets[t] - cd + sim.cycleM) % sim.cycleM;
        if (ahead < bestM) {
          bestM = ahead;
          arrivesForward = t === 0;
        }
      }
      const etaSec = Math.round(bestM / sim.speedMps);
      const destId = arrivesForward
        ? route.stops[route.stops.length - 1]
        : route.stops[0];
      arrivals.push({
        routeId: route.id,
        routeNumber: route.number,
        color: route.color,
        destination: cityStops.get(destId)?.name ?? "Terminus",
        vehicleId: `${route.number}-${k + 1}`,
        etaSec,
        occupancy: occLevels[(k + stopIdx) % occLevels.length],
      });
    }
  }

  return arrivals.sort((a, b) => a.etaSec - b.etaSec).slice(0, limit);
}

/** Routes that serve BOTH the origin and destination stops (origin before dest). */
export function routesBetween(
  city: City,
  fromStopId: string,
  toStopId: string
): { route: Route; fromIdx: number; toIdx: number; direction: 1 | -1 }[] {
  const out: { route: Route; fromIdx: number; toIdx: number; direction: 1 | -1 }[] = [];
  for (const route of city.routes) {
    const a = route.stops.indexOf(fromStopId);
    const b = route.stops.indexOf(toStopId);
    if (a === -1 || b === -1 || a === b) continue;
    out.push({ route, fromIdx: a, toIdx: b, direction: a < b ? 1 : -1 });
  }
  return out;
}

export interface TripOption {
  route: Route;
  fromIdx: number;
  toIdx: number;
  direction: 1 | -1;
  stopsCount: number;
  /** Seconds until the next bus reaches the origin heading the right way. */
  nextEtaSec: number;
  /** In-vehicle travel time origin → destination, seconds. */
  travelSec: number;
  /** Estimated fare for this segment, ₹. */
  fare: number;
}

/** Plan a trip A → B: every route serving both stops, with live next-bus ETA. */
export function tripOptions(
  city: City,
  fromStopId: string,
  toStopId: string,
  epochSec: number
): TripOption[] {
  const out: TripOption[] = [];
  for (const { route, fromIdx, toIdx, direction } of routesBetween(
    city,
    fromStopId,
    toStopId
  )) {
    const sim = buildRouteSim(city, route);
    const sFrom = sim.stopDistM[fromIdx];
    const sTo = sim.stopDistM[toIdx];
    const segM = Math.abs(sTo - sFrom);
    const travelSec = Math.round(segM / sim.speedMps);

    // Cycle-distance target at which a bus passes the origin in the
    // correct direction of travel.
    const originTarget = direction === 1 ? sFrom : sim.cycleM - sFrom;
    let nextEtaSec = Infinity;
    for (let k = 0; k < sim.numBuses; k++) {
      const cd = busCycleDistance(sim, k, epochSec);
      const ahead = (originTarget - cd + sim.cycleM) % sim.cycleM;
      nextEtaSec = Math.min(nextEtaSec, Math.round(ahead / sim.speedMps));
    }

    const frac = sim.geo.totalM > 0 ? segM / sim.geo.totalM : 1;
    const fare = Math.max(5, Math.round(route.fare * frac));

    out.push({
      route,
      fromIdx,
      toIdx,
      direction,
      stopsCount: Math.abs(toIdx - fromIdx),
      nextEtaSec,
      travelSec,
      fare,
    });
  }
  return out.sort((a, b) => a.nextEtaSec - b.nextEtaSec);
}

/** Find a single live vehicle by its id (e.g. "500D-2"). */
export function findVehicle(
  city: City,
  vehicleId: string,
  epochSec: number
): LiveBus | null {
  const routeNumber = vehicleId.split("-").slice(0, -1).join("-");
  const route = city.routes.find((r) => r.number === routeNumber);
  if (!route) return null;
  return busesOnRoute(city, route, epochSec).find((b) => b.vehicleId === vehicleId) ?? null;
}
