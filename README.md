# Where's My Bus 🚌

A live **city-bus tracker for India** — the bus analogue of *Where is my Train*.
Track buses moving in real time on a map, find direct routes between two stops,
see live arrivals at any stop, and follow an individual bus.

Covers 18 Indian cities out of the box (metros + major tier-2):

| City | Operator | | City | Operator |
|------|----------|---|------|----------|
| Bengaluru | BMTC | | Indore | AICTSL |
| Delhi | DTC | | Bhopal | BCLL |
| Mumbai | BEST | | Visakhapatnam | APSRTC |
| Chennai | MTC | | Surat | Sitilink |
| Hyderabad | TSRTC | | Kochi | KSRTC |
| Coimbatore | TNSTC | | Patna | BSRTC |
| Pune | PMPML | | Bhubaneswar | Mo Bus |
| Jaipur | JCTSL | | Chandigarh | CTU |
| Lucknow | LCTSL | | Nagpur | Aapli Bus |

Adding a city is just a data entry in `src/data/cities.ts` followed by
`npm run paths` to road-snap its routes.

## Features

- **Live map** — every bus on the network, colour-coded by route, with a
  heading arrow, moving in real time. Tap a bus to track it.
- **Find buses (A → B)** — pick an origin and destination; get the direct
  routes that serve both, each with the next-bus ETA, ride time and fare.
- **Route detail** — the full ordered stop list with live buses shown
  approaching each stop, plus frequency, fare and service hours. The route is
  highlighted on the map.
- **Stop arrivals** — choose a stop and see the next buses arriving, soonest
  first, with crowding indicators.
- **Track a bus** — follow a single vehicle: next stop, ETA, speed and
  occupancy, updating every second.
- **Near me** — uses the browser's geolocation to auto-select the closest
  covered city, drop a "you are here" pin, and list the nearest stops with
  their live arrivals (with a one-tap demo-location fallback).
- **Distance to stop** — on the Stops view, see how far any stop is from your
  location ("14.7 km away · 2h 58m walk") with a dashed connector line drawn on
  the map from you to the stop.
- **Favourites & recents** — star stops (they surface on the Live tab with
  next-arrival times) and revisit recent A→B searches as one-tap chips. Both
  persist in `localStorage`.
- **Installable PWA, works offline** — add to home screen; a service worker
  caches the app shell, static assets and map tiles you've viewed, so
  schedules and the last-seen map keep working without a connection. (The
  simulation runs client-side, so "live" buses keep moving offline too.)
- **Service alerts** — per-route disruption/delay/info banners on the Live and
  Route views, with an amber dot on affected routes in the list.
- **Shareable deep links** — the city, tab, selected route, A→B stops and
  tracked bus are reflected in the URL; the **Share** button copies a deep link
  (or opens the native share sheet) that restores exactly that view.
- **Dark mode** — a persisted light/dark toggle (defaults to your OS setting)
  with a dark map tile style; no flash on load.

## How the "live" data works

There is no single public real-time API covering city buses across all of
India, so this app ships with **realistic seeded networks** (real landmark
stops and coordinates) driven by a **client-side simulation engine**
(`src/lib/simulation.ts`). Buses are placed along each route's polyline based on
the wall clock, route headway and average speed — producing genuine motion,
ETAs and arrivals without any backend.

To wire in real data later, replace the simulation functions
(`allBuses`, `arrivalsAtStop`, `tripOptions`, `findVehicle`) with calls to a
live feed (e.g. a GTFS-Realtime vehicle-positions source) — the UI consumes
plain `LiveBus` / `Arrival` objects and needs no other changes.

## Stack

Next.js 15 (App Router) · React 18 · TypeScript · Tailwind CSS ·
Leaflet + react-leaflet · lucide-react.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000

# regenerate data / assets (optional — outputs are committed)
npm run paths    # road-snap every route via the OSRM API → src/data/routePaths.ts
npm run icons    # regenerate PWA icons from the inline SVG → public/icons/
```

> The PWA service worker only registers in a production build
> (`npm run build && npm start`); dev mode skips it so hot-reload works.

## Project layout

```
src/
  app/                 # Next.js app router (layout, page, globals, manifest.ts)
  data/
    cities.ts          # seeded city networks: stops + routes
    routePaths.ts      # generated road-snapped polylines (npm run paths)
    alerts.ts          # seeded service alerts + lookup helpers
  lib/
    types.ts           # domain model
    geo.ts             # haversine, polyline geometry, point-at-distance
    simulation.ts      # the live-bus engine (pure, clock-driven)
    useClock.ts        # ticking epoch-seconds hook
    useFavourites.ts   # localStorage favourites + recent trips
    useTheme.ts        # light/dark theme (localStorage + OS default)
    utils.ts           # cn(), ETA/fare/occupancy formatting
  components/
    BusMap.tsx         # the Leaflet map (buses, stops, route line, you-are-here, dark tiles)
    ServiceWorker.tsx  # PWA registration + offline banner
    ui/                # Button, StopSelect, AlertCard, RouteBadge / EtaPill / Occupancy / FavStar
    panels/            # LiveOverview, FindBuses, StopArrivals, TrackBus, RouteDetail, NearMe
public/
  sw.js                # service worker (shell + tile + asset caching)
  icons/               # PWA icons (npm run icons)
scripts/
  fetch-paths.ts       # OSRM road-snapping generator
  gen-icons.mjs        # PWA icon generator (sharp)
```
