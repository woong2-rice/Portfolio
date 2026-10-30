import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { site, ui } from "@/data/site";
import { prefix, type Locale } from "@/lib/i18n";
import { Device } from "@/components/project-screen";
import { Tilt } from "@/components/device/tilt";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 메인 페이지: 미술관 전시대처럼, 작품 하나가 한 화면을 차지합니다.
// 카드마다 남기는 글자는 제목, 한 줄 설명, 버튼 두 개뿐. 바탕은 흰색과 연회색을 번갈아 씁니다.

export function Hero({ lang }: { lang: Locale }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="frame flex min-h-[calc(76svh-4rem)] flex-col items-center justify-center pb-12 pt-10 text-center"
    >
      <h1
        id="hero-title"
        data-r
        className="max-w-[22ch] text-[clamp(1.75rem,0.9rem+4.2vw,5.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.035em] [text-wrap:balance]"
      >
        {site.headline}
      </h1>
      <p data-r style={{ ["--d" as string]: 1 }} className="mt-7 text-[clamp(1rem,0.9rem+0.5vw,1.375rem)] font-medium text-muted">
        {site.tools.slice(0, 4).join("  ·  ")}
      </p>
      <Link
        href="#projects"
        data-r
        style={{ ["--d" as string]: 2 }}
        aria-label={ui.nav.down[lang]}
        className="mt-[8svh] grid size-12 place-items-center text-ink transition-transform hover:translate-y-1"
      >
        <ChevronDown aria-hidden className="size-7 animate-[nudge_2.4s_ease-in-out_infinite]" />
      </Link>
    </section>
  );
}

export function Showcase({ lang }: { lang: Locale }) {
  return (
    <div id="projects" className="scroll-mt-0">
      {projects.map((p, i) => (
        <Exhibit key={p.id} lang={lang} project={p} tone={i % 2 === 0 ? "surface" : "bg"} first={i === 0} />
      ))}
    </div>
  );
}

function Exhibit({ project: p, lang, tone, first }: { project: Project; lang: Locale; tone: "bg" | "surface"; first: boolean }) {
  return (
    <section
      aria-labelledby={`ex-${p.id}`}
      className={cn(
        "frame flex min-h-[100svh] flex-col items-center justify-center gap-[clamp(1.75rem,4svh,3rem)] py-[clamp(3rem,6svh,5rem)]",
        tone === "surface" ? "bg-surface" : "bg-bg",
      )}
    >
      {/* 기기가 화면 높이의 60% 이상을 차지하도록 */}
      <div data-r className="flex w-full justify-center">
        <Tilt className={p.device === "phone" ? "w-[min(64vw,calc(61svh*9/19.5))]" : "w-[min(100%,calc(58svh*1.6),68rem)]"}>
          <Device
            kind={p.device}
            screen={p.screen}
            lang={lang}
            priority={first}
            sizes={p.device === "phone" ? "(min-width:768px) 30svh, 64vw" : "(min-width:768px) 68rem, 100vw"}
          />
        </Tilt>
      </div>

      <div className="flex flex-col items-center text-center">
        <h2
          id={`ex-${p.id}`}
          data-r
          style={{ ["--d" as string]: 1 }}
          className="text-[clamp(2.25rem,1.4rem+3vw,4.5rem)] font-bold leading-none tracking-[-0.04em] [text-wrap:balance]"
        >
          {p.name[lang]}
        </h2>
        <p data-r style={{ ["--d" as string]: 2 }} className="mt-3 text-[clamp(1.0625rem,1rem+0.4vw,1.375rem)] text-muted">
          {p.tagline[lang]}
        </p>
        <div data-r style={{ ["--d" as string]: 3 }} className="mt-7 flex flex-wrap justify-center gap-3">
          {p.url ? (
            <a href={p.url} target="_blank" rel="noreferrer" className={buttonVariants()}>
              {ui.showcase.visit[lang]} <ArrowUpRight aria-hidden />
              <span className="sr-only">: {p.name[lang]}, {ui.showcase.newTab[lang]}</span>
            </a>
          ) : (
            <span aria-disabled className={cn(buttonVariants(), "pointer-events-none opacity-35")}>
              {ui.showcase.visit[lang]}
              <span className="sr-only">: {ui.showcase.notYet[lang]}</span>
            </span>
          )}
          <Link href={`${prefix(lang)}/project/${p.id}`} className={buttonVariants({ variant: "outline" })}>
            {ui.showcase.story[lang]} <ArrowRight aria-hidden />
            <span className="sr-only">: {p.name[lang]}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
