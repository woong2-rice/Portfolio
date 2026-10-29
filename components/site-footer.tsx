import Link from "next/link";
import { site } from "@/data/site";

// 꼬리말은 조용한 한 줄.
export function SiteFooter() {
  return (
    <footer className="frame pb-8 pt-[18svh] text-[0.9375rem]">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-6">
        <p className="text-muted">바이브 코딩으로 만든 작품들</p>
        <nav aria-label="꼬리말" className="flex flex-wrap gap-6">
          <Link href="/#projects" className="font-medium">
            Projects
          </Link>
          <Link href="/#about" className="font-medium">
            About
          </Link>
          {site.contact.github && (
            <a href={site.contact.github} target="_blank" rel="noreferrer" className="font-medium">
              GitHub
            </a>
          )}
        </nav>
        <p className="text-muted sm:text-right">2026 {site.shortName}</p>
      </div>
    </footer>
  );
}
