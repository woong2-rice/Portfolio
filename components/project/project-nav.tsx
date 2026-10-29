import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

// 이전 작품 | 메인 홈 | 다음 작품. 양쪽 판은 이웃 작품의 색으로 칠합니다.
export function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav aria-label="다른 작품" className="grid md:grid-cols-[1fr_auto_1fr]">
      <Link
        href={`/project/${prev.id}`}
        className="group flex min-h-[14rem] flex-col justify-end gap-2 px-[var(--margin)] py-10 no-underline md:px-[6%]"
        style={{ backgroundColor: prev.color.field, color: prev.color.ink }}
      >
        <span className="inline-flex items-center gap-2 text-[1rem] font-medium">
          <ArrowLeft aria-hidden className="size-5 transition-transform group-hover:-translate-x-1" />
          이전 작품
        </span>
        <span className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-bold leading-tight tracking-[-0.03em]">
          {prev.name}
        </span>
      </Link>
      <Link
        href="/#projects"
        className="flex items-center justify-center bg-ink px-10 py-8 font-semibold text-bg no-underline transition-opacity hover:opacity-90"
      >
        메인 홈으로
      </Link>
      <Link
        href={`/project/${next.id}`}
        className="group flex min-h-[14rem] flex-col items-end justify-end gap-2 px-[var(--margin)] py-10 text-right no-underline md:px-[6%]"
        style={{ backgroundColor: next.color.field, color: next.color.ink }}
      >
        <span className="inline-flex items-center gap-2 text-[1rem] font-medium">
          다음 작품
          <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
        </span>
        <span className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-bold leading-tight tracking-[-0.03em]">
          {next.name}
        </span>
      </Link>
    </nav>
  );
}
