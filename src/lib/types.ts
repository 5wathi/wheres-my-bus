// Domain model for the live city-bus tracker.

export type LatLng = [number, number]; // [lat, lng]

/** A physical bus stop. */
export interface Stop {
  id: string;
  name: string;
  pos: LatLng;
}

/**
 * A bus route (one direction). The `stops` are an ordered list of stop ids the
 * bus serves. `path` is an optional set of via-points used to draw a realistic
 * polyline on the map; when omitted, the stop positions themselves are used.
 */
export interface Route {
  id: string;
  /** Public route number, e.g. "500D", "G-4", "201". */
  number: string;
  name: string;
  operator: string;
  /** Brand color for the route line/marker. */
  color: string;
  stops: string[];
  path?: LatLng[];
  /** Headway between consecutive buses, in minutes. */
  headwayMin: number;
  /** Average operating speed, km/h, used by the simulation. */
  speedKmph: number;
  /** Service window. */
  firstBus: string; // "05:30"
  lastBus: string; // "23:00"
  fare: number; // ₹ end-to-end
}

export interface City {
  id: string;
  name: string;
  operator: string;
  center: LatLng;
  zoom: number;
  stops: Stop[];
  routes: Route[];
}

/** A single live vehicle, produced by the simulation engine. */
export interface LiveBus {
  vehicleId: string;
  routeId: string;
  routeNumber: string;
  color: string;
  pos: LatLng;
  /** Bearing in degrees (0 = north), for orienting the marker. */
  heading: number;
  /** Direction of travel: 1 = forward along stops, -1 = return. */
  direction: 1 | -1;
  speedKmph: number;
  /** Distance travelled along the route polyline, in metres. */
  distanceM: number;
  /** Id of the stop the bus is heading toward next. */
  nextStopId: string;
  /** Seconds until it reaches `nextStopId`. */
  etaToNextStopSec: number;
  /** Headed-toward terminus name (the route's last stop in this direction). */
  destination: string;
  occupancy: "low" | "medium" | "high";
}

export type AlertSeverity = "delay" | "diversion" | "info";

/** A service alert affecting one or more routes (or the whole network). */
export interface ServiceAlert {
  id: string;
  cityId: string;
  /** Affected route ids, or "all" for a network-wide notice. */
  routeIds: string[] | "all";
  severity: AlertSeverity;
  title: string;
  detail: string;
}

/** An upcoming arrival of a route at a particular stop. */
export interface Arrival {
  routeId: string;
  routeNumber: string;
  color: string;
  destination: string;
  vehicleId: string;
  etaSec: number;
  occupancy: LiveBus["occupancy"];
}
