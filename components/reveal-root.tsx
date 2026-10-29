"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// [data-r] 표시가 붙은 요소가 화면에 들어오면 한 번만 'in'을 붙입니다.
export function RevealRoot() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-r]:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    // 안전장치: 3초 뒤에도 화면 안에 있는데 안 보이는 것은 그냥 보여 줌
    const t = setTimeout(() => {
      els.forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) e.classList.add("in");
      });
    }, 3000);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
