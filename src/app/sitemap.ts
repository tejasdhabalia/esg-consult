import { MetadataRoute } from "next";
import { llmsManifest as manifest } from "@/generated/llms-manifest";

export default function sitemap(): MetadataRoute.Sitemap {
  return manifest.pages.map((page) => ({
    url: page.url,
    lastModified: new Date(manifest.generatedAt),
    changeFrequency: page.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: page.priority,
  }));
}
