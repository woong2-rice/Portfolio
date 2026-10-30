import type { Project } from "@/data/projects";
import { ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function devSentence(p: Project, lang: Locale) {
  const { tools } = p.devNote, idea = p.devNote.idea[lang], period = p.devNote.period[lang];
  switch (lang) {
    case "ko": return `${tools}로 만들었어요. 처음 아이디어는 “${idea}”. ${period} 만들고 있어요.`;
    case "en": return `Made with ${tools}. The first idea: “${idea}”. In progress ${period}.`;
    case "ja": return `${tools}で作りました。最初のアイデアは「${idea}」。${period}作っています。`;
    case "zh": return `使用 ${tools} 制作。最初的想法是“${idea}”。${period}持续制作中。`;
  }
}

// 흐린 글씨의 개발 노트 한 줄, 그리고 버전별 로드맵.
export function DevNote({ project: p, lang }: { project: Project; lang: Locale }) {
  const d = ui.detail;
  return (
    <section aria-labelledby="devnote-title" className="frame bg-surface py-[clamp(6rem,10vw,9rem)]">
      <div className="mx-auto grid max-w-[72rem] gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[8%]">
        <div>
          <h2 id="devnote-title" data-r className="head">
            {d.devNote[lang]}
          </h2>
          <p data-r style={{ ["--d" as string]: 1 }} className="mt-8 max-w-[40ch] text-[1rem] leading-relaxed text-muted">
            {devSentence(p, lang)}
          </p>
        </div>
        <div>
          <h3 data-r className="text-[1.0625rem] font-semibold text-muted">
            {d.roadmap[lang]}
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
                <span className={cn("text-[1.0625rem]", r.state !== "next" && "font-semibold")}>{r.label[lang]}</span>
                <span className="text-[0.9375rem]">{d.state[r.state][lang]}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
