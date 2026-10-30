import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProject, neighbours } from "@/data/projects";
import { ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { Device } from "@/components/project-screen";
import { Tilt } from "@/components/device/tilt";
import { Preloader } from "@/components/project/preloader";
import { FeatureStrip } from "@/components/project/feature-strip";
import { SameAgeSection } from "@/components/home/same-age-section";
import { DevNote } from "@/components/project/dev-note";
import { ProjectNav } from "@/components/project/project-nav";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";

export function ProjectPage({ id, lang }: { id: string; lang: Locale }) {
  const p = getProject(id);
  if (!p) notFound();
  const { prev, next } = neighbours(p.id);

  return (
    <>
      <Preloader project={p} lang={lang} />

      {/* 히어로: 그 작품의 색 위에 기기 하나 */}
      <section
        aria-labelledby="project-title"
        className="frame grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-[6%]"
        style={{ backgroundColor: p.color.field, color: p.color.ink }}
      >
        <div className="lg:pl-[6%]">
          <h1 id="project-title" data-r className="display max-w-[12ch]">
            {p.name[lang]}
          </h1>
          <p data-r style={{ ["--d" as string]: 1 }} className="lead mt-6 max-w-[26ch] font-semibold">
            {p.oneLine[lang]}
          </p>
          <p data-r style={{ ["--d" as string]: 2 }} className="mt-5 max-w-[46ch]">
            {p.summary[lang]}
          </p>
          <div data-r style={{ ["--d" as string]: 3 }} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: "lg" })}
                style={{ ["--btn-bg" as string]: p.color.ink, ["--btn-ink" as string]: p.color.field }}
              >
                {ui.detail.visit[lang]} <ArrowUpRight aria-hidden />
              </a>
            ) : (
              <p className="text-[1.0625rem] font-semibold">
                {p.statusLabel[lang]}. {ui.detail.soon[lang]}
              </p>
            )}
            <p className="text-[0.9375rem]">
              {p.kind[lang]}, {p.started[lang]} {ui.detail.started[lang]}
            </p>
          </div>
        </div>
        <div data-r style={{ ["--d" as string]: 2 }} className="flex justify-center">
          <Tilt className={p.device === "phone" ? "w-[min(68vw,20rem)] lg:w-[min(24vw,calc(76svh*9/19.5))]" : "w-full max-w-[44rem]"}>
            <Device kind={p.device} screen={p.screen} lang={lang} priority sizes="(min-width:1024px) 26vw, 68vw" />
          </Tilt>
        </div>
      </section>

      {p.id === "same-age" ? <SameAgeSection lang={lang} /> : <FeatureStrip project={p} lang={lang} />}
      <DevNote project={p} lang={lang} />
      <ProjectNav prev={prev} next={next} lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
