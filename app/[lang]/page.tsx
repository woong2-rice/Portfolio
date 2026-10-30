import { HomePage } from "@/components/pages/home-page";
import type { Locale } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <HomePage lang={lang as Locale} />;
}
