import type { Project, RoadmapState } from "@/data/projects";
import { cn } from "@/lib/utils";

const stateLabel: Record<RoadmapState, string> = { done: "완료", doing: "진행 중", next: "예정" };

// 흐린 글씨의 개발 노트 한 줄, 그리고 버전별 로드맵.
export function DevNote({ project: p }: { project: Project }) {
  return (
    <section aria-labelledby="devnote-title" className="frame bg-surface py-[clamp(6rem,10vw,9rem)]">
      <div className="mx-auto grid max-w-[72rem] gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[8%]">
        <div>
          <h2 id="devnote-title" data-r className="head">
            개발 노트
          </h2>
          <p data-r style={{ ["--d" as string]: 1 }} className="mt-8 max-w-[40ch] text-[1rem] leading-relaxed text-muted">
            {p.devNote.tools}로 만들었어요. 처음 아이디어는 &ldquo;{p.devNote.idea}&rdquo;. {p.devNote.period} 만들고 있어요.
          </p>
        </div>
        <div>
          <h3 data-r className="text-[1.0625rem] font-semibold text-muted">
            로드맵
          </h3>
          <ol className="mt-6">
            {p.roadmap.map((r, i) => (
              <li
                key={r.version}
                data-r
                style={{ ["--d" as string]: i + 1 }}
                className={cn(
                  "grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 px-5 py-5",
                  r.state === "doing" && "bg-[var(--accent)] text-[var(--accent-ink)]",
                  r.state === "done" && "bg-surface-2",
                  r.state === "next" && "text-muted",
                )}
              >
                <span className="font-bold tabular-nums">{r.version}</span>
                <span className={cn("text-[1.0625rem]", r.state !== "next" && "font-semibold")}>{r.label}</span>
                <span className="text-[0.9375rem]">{stateLabel[r.state]}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
