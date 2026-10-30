import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { RootShell } from "@/components/root-shell";
import { site } from "@/data/site";
import { isLocale, otherLocales } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() {
  return otherLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s — ${site.title}` },
    description: site.description[lang],
    alternates: { canonical: `/${lang}`, languages: { ko: "/", en: "/en", ja: "/ja", "zh-Hans": "/zh" } },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "ko") notFound();
  return <RootShell lang={lang}>{children}</RootShell>;
}
