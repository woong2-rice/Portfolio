import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/root-shell";
import { site } from "@/data/site";
import { languagesFor, OG_IMAGE, ogLocale, verification } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.title}` },
  description: site.description.ko,
  applicationName: site.title,
  keywords: site.keywords,
  authors: [{ name: site.maker.name.ko, url: site.url }],
  creator: site.maker.name.ko,
  alternates: { canonical: "/", languages: languagesFor("/") },
  openGraph: {
    type: "website",
    siteName: site.title,
    title: site.title,
    description: site.description.ko,
    url: "/",
    locale: ogLocale.ko,
    alternateLocale: [ogLocale.en, ogLocale.ja, ogLocale.zh],
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description.ko, images: [OG_IMAGE.url] },
  robots: { index: true, follow: true },
  verification: verification(),
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
