import type { Locale } from "@/lib/i18n";
import { Hero, Showcase } from "@/components/home/showcase";
import { MakerNote } from "@/components/home/maker-note";
import { Contact } from "@/components/home/contact";
import { SiteFooter } from "@/components/site-footer";
import { SeoJsonLd } from "@/components/seo-jsonld";

export function HomePage({ lang }: { lang: Locale }) {
  return (
    <>
      <SeoJsonLd lang={lang} />
      <Hero lang={lang} />
      <Showcase lang={lang} />
      <MakerNote lang={lang} />
      <Contact lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
