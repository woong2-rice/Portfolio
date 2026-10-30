import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/app/globals.css";
import type { ReactNode } from "react";
import { htmlLang, type Locale } from "@/lib/i18n";
import { ui } from "@/data/site";
import { SiteHeader } from "./site-header";
import { themeScript } from "./theme-toggle";
import { RevealRoot } from "./reveal-root";
import { BackToTop } from "./back-to-top";

// 두 뿌리 레이아웃(한국어 / 다른 언어)이 함께 쓰는 문서 틀.
export function RootShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <html lang={htmlLang[lang]} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          {ui.nav.skip[lang]}
        </a>
        <SiteHeader lang={lang} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <BackToTop lang={lang} />
        <RevealRoot />
      </body>
    </html>
  );
}
