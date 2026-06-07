import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Where's My Bus — Live City Bus Tracker",
    short_name: "Where's My Bus",
    description:
      "Track city buses live across India. Find routes between stops, see live arrivals and follow any bus on the map.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#4f5aa3",
    orientation: "portrait-primary",
    categories: ["travel", "navigation", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
