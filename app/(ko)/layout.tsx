import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/root-shell";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.title}` },
  description: site.description.ko,
  alternates: { canonical: "/", languages: { ko: "/", en: "/en", ja: "/ja", "zh-Hans": "/zh" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ko">{children}</RootShell>;
}
