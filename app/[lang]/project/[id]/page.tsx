import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { ProjectPage } from "@/components/pages/project-page";
import { otherLocales, type Locale } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() {
  return otherLocales.flatMap((lang) => projects.map((p) => ({ lang, id: p.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }): Promise<Metadata> {
  const { lang, id } = await params;
  const p = getProject(id);
  return p ? { title: p.name[lang as Locale], description: p.oneLine[lang as Locale] } : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  return <ProjectPage id={id} lang={lang as Locale} />;
}
