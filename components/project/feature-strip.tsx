import type { Project } from "@/data/projects";
import { ui } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { IphoneFrame } from "@/components/device/iphone-frame";
import { Fragment, ScreenContent } from "@/components/project-screen";

// 플레이스토어 홍보 이미지처럼: 키 큰 판마다 굵은 제목 한 줄, 짧은 설명, 아래로 잘려 나가는 폰 화면.
// 판 바탕은 그 작품의 색과 한 단계 옅은 색을 번갈아 씁니다.
export function FeatureStrip({ project: p, lang }: { project: Project; lang: Locale }) {
  const tones = [p.color.field, p.color.soft];
  return (
    <section aria-labelledby="features-title" className="py-[clamp(6rem,10vw,10rem)]">
      <div className="frame">
        <h2 id="features-title" data-r className="head max-w-[20ch]">
          {p.name[lang]}
          {ui.detail.features[lang]}
        </h2>
      </div>
      <ul
        className="frame mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:thin] lg:grid lg:snap-none lg:overflow-visible"
        style={{ gridTemplateColumns: `repeat(${Math.min(p.features.length, 4)}, minmax(0, 1fr))` }}
      >
        {p.features.map((f, i) => (
          <li
            key={f.title.en}
            data-r
            style={{ ["--d" as string]: i, backgroundColor: tones[i % 2], color: p.color.ink }}
            className="relative flex w-[80vw] max-w-[22rem] shrink-0 snap-start flex-col overflow-hidden lg:w-auto lg:max-w-none"
          >
            <div className="px-6 pb-8 pt-8">
              <h3 className="text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] font-bold leading-[1.15] tracking-[-0.03em] [text-wrap:balance]">
                {f.title[lang]}
              </h3>
              <p className="mt-3 text-[1rem] leading-relaxed">{f.body[lang]}</p>
            </div>
            <div className="mt-auto h-[26rem] overflow-hidden px-[12%]">
              {f.shot ? (
                <IphoneFrame>
                  <ScreenContent screen={f.shot} lang={lang} sizes="(min-width: 1024px) 20vw, 64vw" />
                </IphoneFrame>
              ) : f.fragment ? (
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <Fragment name={f.fragment} lang={lang} />
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
