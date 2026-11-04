import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { prefix, type Locale } from "@/lib/i18n";

// 구조화 데이터(JSON-LD): 검색엔진에 "이 사이트는 웅의 포트폴리오이고, 작품은 이것들이며, 각각 이 주소에 있다"를 알려 줘요.
// 화면에는 보이지 않아요. 작품 목록·주소는 data/projects.ts, 이름·메일은 data/site.ts에서 자동으로 가져와요.
export function SeoJsonLd({ lang }: { lang: Locale }) {
  const home = `${site.url}${prefix(lang)}`;
  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.maker.name[lang],
    alternateName: ["웅", "Woong"],
    email: `mailto:${site.contact.email}`,
    url: site.url,
    sameAs: [site.contact.github],
    jobTitle: site.maker.role[lang],
  };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: home,
        name: site.title,
        description: site.description[lang],
        inLanguage: lang,
        author: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "ItemList",
        name: lang === "ko" ? "작품 목록" : "Projects",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": p.url ? "WebApplication" : "CreativeWork",
            name: p.name[lang],
            alternateName: p.latin,
            description: p.oneLine[lang],
            url: p.url ?? `${home}/project/${p.id}`,
            ...(p.url && { applicationCategory: "Web", operatingSystem: "Web browser", sameAs: `${home}/project/${p.id}` }),
            author: { "@id": `${site.url}/#person` },
          },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
