import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agdtayawa.xyz";

  const routes = ["", "/projects", "/experience", "/skills", "/contact"];

  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}


