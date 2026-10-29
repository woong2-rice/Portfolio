import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProject, neighbours, projects } from "@/data/projects";
import { Device } from "@/components/project-screen";
import { Tilt } from "@/components/device/tilt";
import { Preloader } from "@/components/project/preloader";
import { FeatureStrip } from "@/components/project/feature-strip";
import { SameAgeSection } from "@/components/home/same-age-section";
import { DevNote } from "@/components/project/dev-note";
import { ProjectNav } from "@/components/project/project-nav";
import { buttonVariants } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProject(id);
  return p ? { title: p.name, description: p.oneLine } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();
  const { prev, next } = neighbours(p.id);

  return (
    <>
      <Preloader name={p.name} latin={p.latin} field={p.color.field} ink={p.color.ink} />

      {/* 히어로: 그 작품의 색 위에 기기 하나 */}
      <section
        aria-labelledby="project-title"
        className="frame grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-[6%]"
        style={{ backgroundColor: p.color.field, color: p.color.ink }}
      >
        <div className="lg:pl-[6%]">
          <h1 id="project-title" data-r className="display max-w-[12ch]">
            {p.name}
          </h1>
          <p data-r style={{ ["--d" as string]: 1 }} className="lead mt-6 max-w-[24ch] font-semibold">
            {p.oneLine}
          </p>
          <p data-r style={{ ["--d" as string]: 2 }} className="mt-5 max-w-[44ch]">
            {p.summary}
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
                라이브 사이트 방문하기 <ArrowUpRight aria-hidden />
              </a>
            ) : (
              <p className="text-[1.0625rem] font-semibold">
                {p.statusLabel}. 공개되면 여기서 바로 열 수 있어요.
              </p>
            )}
            <p className="text-[0.9375rem]">
              {p.kind}, {p.started} 시작
            </p>
          </div>
        </div>
        <div data-r style={{ ["--d" as string]: 2 }} className="flex justify-center">
          <Tilt className={p.device === "phone" ? "w-[min(68vw,20rem)] lg:w-[min(24vw,calc(76svh*9/19.5))]" : "w-full max-w-[44rem]"}>
            <Device kind={p.device} screen={p.screen} priority sizes="(min-width:1024px) 26vw, 68vw" />
          </Tilt>
        </div>
      </section>

      {p.id === "same-age" ? <SameAgeSection storyLink={false} /> : <FeatureStrip project={p} />}
      <DevNote project={p} />
      <ProjectNav prev={prev} next={next} />
    </>
  );
}
