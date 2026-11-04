import type { Metadata } from "next";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { languagesFor, OG_IMAGE, ogLocale, pathFor } from "@/lib/seo";

// 작품 상세 페이지의 검색·공유 정보 (한국어/다른 언어 페이지가 함께 씀)
export function projectMetadata(id: string, lang: Locale): Metadata {
  const p = getProject(id);
  if (!p) return {};
  const path = `/project/${p.id}`;
  const title = `${p.name[lang]}${p.name[lang] === p.latin ? "" : ` (${p.latin})`}`;
  const description = `${p.oneLine[lang]} — ${p.summary[lang]}`.slice(0, 160);
  const shot = "src" in p.screen ? { url: p.screen.src, width: p.screen.width, height: p.screen.height, alt: p.screen.alt[lang] } : OG_IMAGE;
  return {
    title,
    description,
    keywords: [p.name.ko, p.latin, p.kind[lang], ...site.keywords.slice(0, 3)],
    alternates: { canonical: pathFor(lang, path), languages: languagesFor(path) },
    openGraph: {
      type: "article",
      siteName: site.title,
      title: `${title} — ${site.title}`,
      description,
      url: pathFor(lang, path),
      locale: ogLocale[lang],
      images: [shot],
    },
    twitter: { card: "summary_large_image", title, description, images: [shot.url] },
  };
}
