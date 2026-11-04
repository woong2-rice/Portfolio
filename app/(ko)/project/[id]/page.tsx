import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { projectMetadata } from "@/lib/project-meta";
import { ProjectPage } from "@/components/pages/project-page";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return projectMetadata(id, "ko");
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectPage id={id} lang="ko" />;
}
