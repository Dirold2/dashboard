import { hostName } from "@config";
import { MetadataRoute } from "next";

const host = hostName;

export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      sitemap: `${host}sitemap.xml`,
    }
}