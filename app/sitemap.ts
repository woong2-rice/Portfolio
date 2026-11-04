import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { locales } from "@/lib/i18n";
import { languagesFor, pathFor } from "@/lib/seo";

// /sitemap.xml — 구글 서치 콘솔·네이버 서치어드바이저에 이 주소를 제출해요.
// 네 언어 × (홈 + 작품 상세 + 피드백). 작품을 추가하면 data/projects.ts만 고쳐도 여기 자동으로 들어가요.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    ...projects.map((p) => ({ path: `/project/${p.id}`, priority: p.status === "live" ? 0.8 : 0.6 })),
    { path: "/feedback", priority: 0.3 },
  ];
  const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;
  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: abs(pathFor(lang, path)) || site.url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: lang === "ko" ? priority : Math.round(priority * 0.8 * 10) / 10,
      alternates: {
        languages: Object.fromEntries(Object.entries(languagesFor(path)).map(([k, v]) => [k, abs(v) || site.url])),
      },
    })),
  );
}
