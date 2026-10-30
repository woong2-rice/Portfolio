"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { locales, localeLabel, switchPath, type Locale } from "@/lib/i18n";
import { ui } from "@/data/site";
import { cn } from "@/lib/utils";

// 언어 바꾸기: 지금 보는 페이지를 다른 언어 주소로 엽니다.
export function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 items-center gap-1.5 px-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-surface"
      >
        <Globe aria-hidden size={18} />
        <span className="uppercase">{lang}</span>
        <span className="sr-only">: {ui.nav.language[lang]}</span>
      </button>
      {open && (
        <ul className={"absolute right-0 top-12 z-40 min-w-[9rem] bg-bg py-1 shadow-[0_12px_32px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)]" /* taste-skill-ignore */}>
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={switchPath(pathname, l)}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-2.5 text-[0.9375rem] no-underline transition-colors hover:bg-surface",
                  l === lang ? "font-bold text-ink" : "text-muted",
                )}
              >
                {localeLabel[l]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
