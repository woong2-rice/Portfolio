import { ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { FeedbackForm } from "@/components/feedback-form";
import { SiteFooter } from "@/components/site-footer";

export function FeedbackPage({ lang }: { lang: Locale }) {
  return (
    <>
      <section aria-labelledby="fb-title" className="frame py-[clamp(4rem,10vw,8rem)]">
        <div className="mx-auto max-w-[40rem]">
          <h1 id="fb-title" className="display">
            {ui.feedback.title[lang]}
          </h1>
          <p className="lead mt-6 text-muted">{ui.feedback.intro[lang]}</p>
          <div className="mt-12">
            <FeedbackForm lang={lang} />
          </div>
        </div>
      </section>
      <SiteFooter lang={lang} />
    </>
  );
}
