import Link from "next/link";
import { site, ui } from "@/data/site";
import { prefix, type Locale } from "@/lib/i18n";

// 꼬리말은 조용한 한 줄.
export function SiteFooter({ lang }: { lang: Locale }) {
  const base = prefix(lang);
  return (
    <footer className="frame pb-8 pt-[18svh] text-[0.9375rem]">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-6">
        <p className="text-muted">{ui.footer.what[lang]}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          <Link href={`${base}/#projects`} className="font-medium">
            {ui.nav.projects[lang]}
          </Link>
          <Link href={`${base}/feedback`} className="font-medium">
            {ui.nav.feedback[lang]}
          </Link>
          <a href={`mailto:${site.contact.email}`} className="font-medium">
            Email
          </a>
          <a href={site.contact.github} target="_blank" rel="noreferrer" className="font-medium">
            GitHub
          </a>
        </nav>
        <p className="text-muted sm:text-right">2026 {site.shortName}</p>
      </div>
    </footer>
  );
}
