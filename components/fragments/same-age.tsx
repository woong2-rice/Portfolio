"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { lookup, topic } from "@/data/same-age";
import { cn } from "@/lib/utils";

// 이 페이지의 '살아 있는 하나': 나이를 넣으면 같은 나이의 위인이 해낸 일이 바로 나옵니다.

export function useSameAge(initial = 24) {
  const [age, setAge] = useState(initial);
  const set = (n: number) => setAge(Math.max(1, Math.min(99, Math.round(Number.isFinite(n) ? n : initial))));
  return { age, set, ...lookup(age) };
}

export function AgeInput({
  age,
  set,
  className,
  tone = "dark",
}: {
  age: number;
  set: (n: number) => void;
  className?: string;
  tone?: "dark" | "light";
}) {
  const id = useId();
  const btn =
    tone === "dark"
      ? "bg-[#e9c547] text-[#1f1a0c] hover:bg-[#f3dc7e]"
      : "bg-[#1f1a0c] text-[#e9c547] hover:bg-[#3a3218]";
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label htmlFor={id} className="text-[1.0625rem] opacity-90">
        지금 내 나이 (만)
      </label>
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          aria-label="한 살 줄이기"
          onClick={() => set(age - 1)}
          className={cn("grid size-16 place-items-center transition-[transform,background-color] active:scale-95", btn)}
        >
          <Minus aria-hidden />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={1}
          max={99}
          value={age}
          onChange={(e) => set(Number(e.target.value))}
          className="h-16 w-28 bg-transparent text-center text-[2.75rem] font-bold tabular-nums tracking-tight outline-none [appearance:textfield] focus-visible:outline-[3px] focus-visible:outline-current [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label="한 살 늘리기"
          onClick={() => set(age + 1)}
          className={cn("grid size-16 place-items-center transition-[transform,background-color] active:scale-95", btn)}
        >
          <Plus aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function AgeResult({ age, current, next, compact = false }: ReturnType<typeof useSameAge> & { compact?: boolean }) {
  const reduce = useReducedMotion();
  const key = current ? `${current.who}-${age}` : `none-${age}`;
  return (
    <div aria-live="polite" className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={key}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {current ? (
            <>
              <p
                className={cn(
                  "font-bold leading-[1.18] tracking-[-0.025em] [text-wrap:balance]",
                  compact ? "text-[1.25rem]" : "text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]",
                )}
              >
                {current.age}살의 {topic(current.who)} {current.did}
              </p>
              <p className={cn("mt-3", compact ? "text-[0.9375rem]" : "text-[1.0625rem]")}>
                {current.year}년, {current.field}
                {current.age !== age && `. 지금 나이보다 ${age - current.age}살 어릴 때`}
              </p>
            </>
          ) : (
            <p
              className={cn(
                "font-bold leading-[1.18] tracking-[-0.025em]",
                compact ? "text-[1.25rem]" : "text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]",
              )}
            >
              {age}살이면, 모차르트도 아직 첫 교향곡을 쓰기 전이었어요.
            </p>
          )}
          {next && (
            <p className={cn("mt-6 max-w-[38ch]", compact ? "text-[0.9375rem]" : "text-[1.0625rem]")}>
              그리고 {next.age - age}년 뒤, {next.age}살의 {topic(next.who)} {next.did}
            </p>
          )}
          {!next && current && (
            <p className={cn("mt-6 max-w-[38ch]", compact ? "text-[0.9375rem]" : "text-[1.0625rem]")}>
              늦었다고 생각한 나이에도 첫 책은 나와요.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** 폰 목업 안에 들어가는 작은 버전 */
export function SameAgeScreen() {
  const s = useSameAge(26);
  return (
    <div data-ui className="flex h-full w-full flex-col justify-between bg-[#1f1a0c] px-[9%] pb-[12%] pt-[22%] text-[#f6efd8]">
      <AgeResult {...s} compact />
      <AgeInput age={s.age} set={s.set} tone="dark" className="[&_input]:text-[2rem] [&_button]:size-12 [&_input]:h-12 [&_input]:w-20" />
    </div>
  );
}
