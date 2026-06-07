// Where's My Bus service worker — offline app shell + tile/asset caching.
// Bump CACHE_VERSION to invalidate old caches on deploy.
const CACHE_VERSION = "wmb-v1";
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;
const TILE_CACHE = `${CACHE_VERSION}-tiles`;
const TILE_LIMIT = 400;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(["/"])).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.startsWith(CACHE_VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Trim a cache to a maximum number of entries (oldest-first eviction).
async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Map tiles (cartocdn / OSM): cache-first, fill the cache as you browse.
  if (/basemaps\.cartocdn\.com|tile\.openstreetmap\.org/.test(url.hostname)) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async (cache) => {
        const hit = await cache.match(request);
        if (hit) return hit;
        try {
          const res = await fetch(request);
          if (res.ok) {
            cache.put(request, res.clone());
            trim(TILE_CACHE, TILE_LIMIT);
          }
          return res;
        } catch {
          return hit || Response.error();
        }
      })
    );
    return;
  }

  // App navigations: network-first, fall back to the cached shell offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put("/", copy));
          return res;
        })
        .catch(() => caches.match("/", { ignoreSearch: true }))
    );
    return;
  }

  // Same-origin static assets (Next chunks, icons): stale-while-revalidate.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const hit = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || network;
      })
    );
  }
});
