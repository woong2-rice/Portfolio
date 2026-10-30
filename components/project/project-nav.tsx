import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ui } from "@/data/site";
import { prefix, type Locale } from "@/lib/i18n";

// 이전 작품 | 메인 홈 | 다음 작품. 양쪽 판은 이웃 작품의 색으로 칠합니다.
export function ProjectNav({ prev, next, lang }: { prev: Project; next: Project; lang: Locale }) {
  const base = prefix(lang);
  return (
    <nav aria-label={`${ui.detail.prev[lang]} / ${ui.detail.next[lang]}`} className="grid md:grid-cols-[1fr_auto_1fr]">
      <Link
        href={`${base}/project/${prev.id}`}
        className="group flex min-h-[14rem] flex-col justify-end gap-2 px-[var(--margin)] py-10 no-underline md:px-[6%]"
        style={{ backgroundColor: prev.color.field, color: prev.color.ink }}
      >
        <span className="inline-flex items-center gap-2 text-[1rem] font-medium">
          <ArrowLeft aria-hidden className="size-5 transition-transform group-hover:-translate-x-1" />
          {ui.detail.prev[lang]}
        </span>
        <span className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-bold leading-tight tracking-[-0.03em]">{prev.name[lang]}</span>
      </Link>
      <Link
        href={`${base}/#projects`}
        className="flex items-center justify-center bg-ink px-10 py-8 font-semibold text-bg no-underline transition-opacity hover:opacity-90"
      >
        {ui.detail.home[lang]}
      </Link>
      <Link
        href={`${base}/project/${next.id}`}
        className="group flex min-h-[14rem] flex-col items-end justify-end gap-2 px-[var(--margin)] py-10 text-right no-underline md:px-[6%]"
        style={{ backgroundColor: next.color.field, color: next.color.ink }}
      >
        <span className="inline-flex items-center gap-2 text-[1rem] font-medium">
          {ui.detail.next[lang]}
          <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
        </span>
        <span className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-bold leading-tight tracking-[-0.03em]">{next.name[lang]}</span>
      </Link>
    </nav>
  );
}
