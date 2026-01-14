import type { MetadataRoute } from "next";

const siteUrl = "https://francescodelmonaco.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: siteUrl,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1,
        },
        // Add more routes as the app grows
    ];
}
