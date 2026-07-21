import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gridmind.local";
  return ["", "/technology", "/dashboard", "/design-system"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 }));
}
