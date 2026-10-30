import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { ProjectPage } from "@/components/pages/project-page";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProject(id);
  return p ? { title: p.name.ko, description: p.oneLine.ko } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectPage id={id} lang="ko" />;
}
