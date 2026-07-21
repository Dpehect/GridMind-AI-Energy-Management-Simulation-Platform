import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GridMind — AI Energy Management & Simulation Platform",
    short_name: "GridMind",
    description: "Local-first energy intelligence, simulation and operations platform.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#2563eb",
    orientation: "any",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
