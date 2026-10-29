import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { site } from "@/data/site";
import { SiteHeader } from "@/components/site-header";
import { themeScript } from "@/components/theme-toggle";
import { RevealRoot } from "@/components/reveal-root";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s — ${site.title}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <RevealRoot />
      </body>
    </html>
  );
}
