"use client";

import { AgeInput, AgeResult, useSameAge } from "@/components/fragments/same-age";
import { ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";

// '재능은 애매하지 않다' 상세 페이지의 체험 구간. 왼쪽(어두운 칸)에 나이를 넣으면 오른쪽(밝은 칸)에 결과가 나옵니다.
export function SameAgeSection({ lang }: { lang: Locale }) {
  const s = useSameAge(24);
  return (
    <section id="same-age" aria-labelledby="same-age-title" className="grid md:grid-cols-2">
      <div className="relative flex min-h-[62svh] flex-col bg-[#1f1a0c] px-[var(--margin)] pb-28 pt-[16svh] text-[#f6efd8] md:min-h-[90svh] md:px-[8%] md:pt-[24svh]">
        <p data-r className="lead max-w-[24ch] font-semibold">
          {ui.sameAge.prompt[lang]}
        </p>
        <AgeInput lang={lang} age={s.age} set={s.set} className="mt-10" />
        <h2
          id="same-age-title"
          className="absolute bottom-8 left-[var(--margin)] text-[clamp(2.5rem,1.2rem+5vw,5rem)] font-bold leading-none tracking-[-0.04em] text-[#e9c547] md:left-[8%]"
        >
          {ui.sameAge.left[lang]}
          <span className="sr-only"> {ui.sameAge.right[lang]}</span>
        </h2>
      </div>
      <div className="relative flex min-h-[62svh] flex-col bg-[#e9c547] px-[var(--margin)] pb-36 pt-16 text-[#1f1a0c] md:min-h-[90svh] md:px-[8%] md:pt-[24svh]">
        <p
          aria-hidden
          className="mb-10 text-[clamp(2.5rem,1.2rem+5vw,5rem)] font-bold leading-none tracking-[-0.04em] md:absolute md:bottom-8 md:right-[8%] md:mb-0"
        >
          {ui.sameAge.right[lang]}
        </p>
        <div className="max-w-[30rem]">
          <AgeResult lang={lang} {...s} />
        </div>
      </div>
    </section>
  );
}
