"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgeInput, AgeResult, useSameAge } from "@/components/fragments/same-age";

// 분할을 깨고 화면 전체를 쓰는 구간. 왼쪽(어두운 칸)에 나이를 넣으면 오른쪽(밝은 칸)에 결과가 나옵니다.
// 만드는 중인 '재능은 애매하지 않다'를 이 자리에서 바로 써 볼 수 있게 한 미리보기.
export function SameAgeSection({ storyLink = true }: { storyLink?: boolean }) {
  const s = useSameAge(24);
  return (
    <section id="same-age" aria-labelledby="same-age-title" className="grid scroll-mt-0 md:grid-cols-2">
      <div className="relative flex min-h-[62svh] flex-col bg-[#1f1a0c] px-[var(--margin)] pb-28 pt-[16svh] text-[#f6efd8] md:min-h-[90svh] md:px-[8%] md:pt-[24svh]">
        <p data-r className="lead max-w-[22ch] font-semibold">
          나이를 바꿔 보세요. 만드는 중인 사이트를 여기서 먼저 써 볼 수 있어요.
        </p>
        <AgeInput age={s.age} set={s.set} className="mt-10" />
        <h2
          id="same-age-title"
          className="absolute bottom-8 left-[var(--margin)] text-[clamp(2.5rem,1.2rem+5vw,5rem)] font-bold leading-none tracking-[-0.04em] text-[#e9c547] md:left-[8%]"
        >
          같은 나이에<span className="sr-only">, 그들은 무엇을 했을까</span>
        </h2>
      </div>
      <div className="relative flex min-h-[62svh] flex-col bg-[#e9c547] px-[var(--margin)] pb-36 pt-16 text-[#1f1a0c] md:min-h-[90svh] md:px-[8%] md:pt-[24svh]">
        <p
          aria-hidden
          className="mb-10 text-[clamp(2.5rem,1.2rem+5vw,5rem)] font-bold leading-none tracking-[-0.04em] md:absolute md:bottom-8 md:right-[8%] md:mb-0"
        >
          그들은
        </p>
        <div className="max-w-[30rem]">
          <AgeResult {...s} />
        </div>
        {storyLink && (
        <Link
          href="/project/same-age"
          className="group mt-10 inline-flex w-fit items-center gap-2 font-semibold underline decoration-2 underline-offset-4 md:mt-12"
        >
          이 아이디어의 이야기
          <ArrowRight aria-hidden className="size-[1.1em] transition-transform group-hover:translate-x-1" />
        </Link>
        )}
      </div>
    </section>
  );
}
