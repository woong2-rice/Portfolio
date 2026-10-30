import type { Metadata } from "next";
import { FeedbackPage } from "@/components/pages/feedback-page";
import { ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: ui.feedback.title[lang as Locale] };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <FeedbackPage lang={lang as Locale} />;
}
