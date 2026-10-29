"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// 밝은 화면이 기본. 고른 테마는 이 브라우저에만 기억합니다.
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "밝은 화면으로 바꾸기" : "어두운 화면으로 바꾸기"}
      className="grid size-11 place-items-center text-ink transition-[transform,background-color] hover:bg-surface active:scale-95 [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:rotate-45"
    >
      {theme === "dark" ? <Sun aria-hidden size={20} /> : <Moon aria-hidden size={20} />}
    </button>
  );
}

export const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`;
