/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 18 StrictMode double-mounts in dev, which breaks react-leaflet
  // ("Map container is already initialized") because Leaflet binds to the DOM
  // node on first mount. Documented workaround for react-leaflet + App Router.
  reactStrictMode: false,
  // Pin the workspace root — sibling lockfiles outside this project would
  // otherwise confuse Next.js's auto-detection.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
