"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// 한 화면 넘게 내려가면 오른쪽 아래에 나타나는 '맨 위로' 버튼.
export function BackToTop({ lang }: { lang: Locale }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label={ui.nav.toTop[lang]}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      // taste-skill-ignore: 떠 있는 버튼이라 그림자를 씀
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 grid size-12 place-items-center rounded-full bg-ink text-bg shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-95", // taste-skill-ignore
        show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp aria-hidden size={20} />
    </button>
  );
}
