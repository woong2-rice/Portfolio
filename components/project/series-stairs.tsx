"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Project } from "@/data/projects";
import type { L, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// 시리즈 작품(삼국지 3부작)의 상세: 세 편이 계단처럼 한 칸씩 내려가며 놓이고,
// 한 칸을 누르면 아래 설명(소개, 세 가지 사실, 화면 세 장)이 그 편으로 바뀝니다.

const T: Record<string, L> = {
  title: { ko: "한 시대, 세 편", en: "One era, three games", ja: "ひとつの時代、三作", zh: "一个时代，三部作品" },
  hint: {
    ko: "계단을 눌러 한 편씩 살펴보세요.",
    en: "Pick a step to look at each game.",
    ja: "階段を押して一作ずつ見てください。",
    zh: "点击台阶，逐一查看每部作品。",
  },
  role: { ko: "나는", en: "You are", ja: "わたしは", zh: "我是" },
  time: { ko: "시간", en: "Time", ja: "時間", zh: "时间" },
  stage: { ko: "화면", en: "Screen", ja: "画面", zh: "画面" },
};

export function SeriesStairs({ project: p, lang }: { project: Project; lang: Locale }) {
  const series = p.series ?? [];
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const s = series[active];
  if (!s) return null;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = series.length;
    const to = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(to);
    tabs.current[to]?.focus();
  };

  return (
    <section
      aria-labelledby="series-title"
      className="py-[clamp(6rem,10vw,10rem)]"
      style={{ backgroundColor: p.color.field, color: p.color.ink }}
    >
      <div className="frame">
        <h2 id="series-title" data-r className="head max-w-[20ch]">
          {T.title[lang]}
        </h2>
        <p data-r style={{ ["--d" as string]: 1 }} className="mt-4 opacity-75">
          {T.hint[lang]}
        </p>

        {/* 계단: 왼쪽 위에서 오른쪽 아래로 한 칸씩 내려갑니다 */}
        <div role="tablist" aria-label={T.title[lang]} className="mt-12 grid gap-3 md:grid-cols-3 md:items-start md:gap-4">
          {series.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`series-tab-${x.id}`}
                aria-selected={on}
                aria-controls={`series-panel-${x.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                data-r
                style={{
                  ["--d" as string]: i + 1,
                  backgroundColor: on ? p.color.accent : p.color.soft,
                  color: on ? p.color.field : p.color.ink,
                }}
                className={cn(
                  "group relative grid gap-2 px-6 pb-7 pt-6 text-left transition-[transform,background-color] duration-300 hover:-translate-y-1",
                  i === 1 && "md:mt-16",
                  i === 2 && "md:mt-32",
                )}
              >
                <span className="font-serif text-[clamp(2.75rem,2rem+2.4vw,4.5rem)] font-bold leading-none tracking-[-0.02em]">
                  {x.numeral}
                </span>
                <span className="mt-2 text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] font-bold leading-tight tracking-[-0.03em]">
                  {x.name[lang]}
                </span>
                <span className="text-[1rem] leading-snug opacity-85">{x.tagline[lang]}</span>
                <span className={cn("mt-3 w-fit text-[0.875rem] font-semibold", on ? "opacity-80" : "opacity-60")}>
                  {x.statusLabel[lang]}
                </span>
              </button>
            );
          })}
        </div>

        {/* 고른 편의 설명 */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.id}
            role="tabpanel"
            id={`series-panel-${s.id}`}
            aria-labelledby={`series-tab-${s.id}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-20"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[8%]">
              <div>
                <h3 className="text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-bold leading-tight tracking-[-0.03em]">
                  {s.numeral}. {s.name[lang]}
                </h3>
                <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed opacity-90">{s.summary[lang]}</p>
              </div>
              <dl className="grid content-start gap-0 self-start">
                {(["role", "time", "stage"] as const).map((k) => (
                  <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-4 py-3" style={{ borderTop: `1px solid ${p.color.soft}` }}>
                    <dt className="opacity-65">{T[k][lang]}</dt>
                    <dd className="font-semibold">{s.facts[k][lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ul className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
              {s.features.map((f) => (
                <li key={f.title.en} className="w-[82vw] max-w-[30rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
                  <div className="overflow-hidden" style={{ outline: `1px solid ${p.color.soft}` }}>
                    <Image
                      src={f.shot.src}
                      alt={f.shot.alt[lang]}
                      width={f.shot.width}
                      height={f.shot.height}
                      sizes="(min-width: 1024px) 30vw, 82vw"
                      className="block h-auto w-full"
                    />
                  </div>
                  <h4 className="mt-5 text-[1.25rem] font-bold tracking-[-0.02em]">{f.title[lang]}</h4>
                  <p className="mt-2 text-[1rem] leading-relaxed opacity-85">{f.body[lang]}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
