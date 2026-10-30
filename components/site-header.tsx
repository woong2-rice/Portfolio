import Link from "next/link";
import { site, ui } from "@/data/site";
import { prefix, type Locale } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitch } from "./lang-switch";

// 평범한 막대: 이름, 링크, 언어, 테마.
export function SiteHeader({ lang }: { lang: Locale }) {
  const home = prefix(lang) || "/";
  const base = prefix(lang);
  const links = [
    [ui.nav.projects[lang], `${base}/#projects`],
    [ui.nav.about[lang], `${base}/#about`],
    [ui.nav.contact[lang], `${base}/#contact`],
    [ui.nav.feedback[lang], `${base}/feedback`],
  ] as const;
  return (
    <header className="frame relative z-30 bg-bg">
      <div className="flex h-16 items-center justify-between gap-2">
        <Link href={home} className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink no-underline">
          {site.wordmark}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-1">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="hidden px-3 py-2 text-[0.9375rem] font-medium text-ink no-underline transition-colors hover:bg-surface lg:inline-block"
            >
              {label}
            </Link>
          ))}
          <LangSwitch lang={lang} />
          <ThemeToggle lang={lang} />
        </nav>
      </div>
    </header>
  );
}
