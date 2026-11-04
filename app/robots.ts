import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// /robots.txt — 모든 검색 로봇(구글 Googlebot, 네이버 Yeti 포함)에게 전체 공개.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
