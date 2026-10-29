import Link from "next/link";
import { site } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";

// 평범한 막대: 이름, 링크 셋, 테마 전환.
export function SiteHeader() {
  return (
    <header className="frame relative z-30 bg-bg">
      <div className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink no-underline">
          {site.wordmark}
        </Link>
        <nav aria-label="주요 메뉴" className="flex items-center gap-1 sm:gap-2">
          {[
            ["Projects", "/#projects"],
            ["About", "/#about"],
            ["Contact", "/#contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="hidden px-3 py-2 text-[0.9375rem] font-medium text-ink no-underline transition-colors hover:bg-surface sm:inline-block"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#projects"
            className="px-3 py-2 text-[0.9375rem] font-medium text-ink no-underline hover:bg-surface sm:hidden"
          >
            Projects
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
