import type { LatLng } from "./types";

const R = 6371000; // Earth radius, metres
const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

/** Great-circle distance between two points, in metres. */
export function haversine(a: LatLng, b: LatLng): number {
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Initial bearing from a → b, degrees (0 = north, clockwise). */
export function bearing(a: LatLng, b: LatLng): number {
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const dLng = toRad(b[1] - a[1]);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Linear interpolation between two coordinates (good enough at city scale). */
function lerp(a: LatLng, b: LatLng, t: number): LatLng {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

export interface PolylineGeometry {
  points: LatLng[];
  /** Cumulative distance to the start of each segment; cumulative[i] is the
   *  distance from points[0] to points[i]. */
  cumulative: number[];
  totalM: number;
}

/** Precompute cumulative distances along a polyline. */
export function buildGeometry(points: LatLng[]): PolylineGeometry {
  const cumulative: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    cumulative.push(cumulative[i - 1] + haversine(points[i - 1], points[i]));
  }
  return { points, cumulative, totalM: cumulative[cumulative.length - 1] };
}

/** The point and heading at a given distance along the polyline. */
export function pointAtDistance(
  geo: PolylineGeometry,
  distanceM: number
): { pos: LatLng; heading: number } {
  const d = Math.max(0, Math.min(distanceM, geo.totalM));
  // Find the segment containing d.
  let i = 1;
  while (i < geo.cumulative.length && geo.cumulative[i] < d) i++;
  const segStart = geo.points[i - 1];
  const segEnd = geo.points[Math.min(i, geo.points.length - 1)];
  const segLen = geo.cumulative[i] - geo.cumulative[i - 1] || 1;
  const t = (d - geo.cumulative[i - 1]) / segLen;
  return { pos: lerp(segStart, segEnd, t), heading: bearing(segStart, segEnd) };
}

/**
 * Distance along the polyline at which each stop sits. We snap each stop to its
 * nearest vertex on the polyline. Returns metres for each stop in order.
 */
export function stopDistances(
  geo: PolylineGeometry,
  stopPositions: LatLng[]
): number[] {
  return stopPositions.map((sp) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < geo.points.length; i++) {
      const dd = haversine(sp, geo.points[i]);
      if (dd < bestDist) {
        bestDist = dd;
        best = geo.cumulative[i];
      }
    }
    return best;
  });
}
