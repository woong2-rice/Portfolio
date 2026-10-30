import { site, ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";

// 이력서 대신 짧은 편지. 그리고 다룰 줄 아는 도구.
export function MakerNote({ lang }: { lang: Locale }) {
  return (
    <section id="about" aria-labelledby="about-title" className="frame scroll-mt-0 py-[clamp(7rem,12vw,12rem)]">
      <div className="mx-auto grid max-w-[36rem] gap-16 md:max-w-[72rem] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[8%]">
        <div>
          <h2 id="about-title" data-r className="head">
            {ui.about.title[lang]}
          </h2>
          <div className="mt-10 max-w-[34rem] space-y-6">
            {site.makerNote.map((para, i) => (
              <p key={i} data-r style={{ ["--d" as string]: i + 1 }}>
                {para[lang]}
              </p>
            ))}
          </div>
          <p data-r style={{ ["--d" as string]: 4 }} className="mt-10 text-[1.375rem] font-bold">
            {site.maker.name[lang]}
            <span className="mt-1 block text-[1rem] font-normal text-muted">{site.maker.role[lang]}</span>
          </p>
        </div>
        <div className="md:pt-3">
          <h3 data-r className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold tracking-[-0.025em]">
            {ui.about.tools[lang]}
          </h3>
          <ul className="mt-6 space-y-1">
            {site.tools.map((t, i) => (
              <li
                key={t}
                data-r
                style={{ ["--d" as string]: i + 1 }}
                className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.3] tracking-[-0.025em] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
