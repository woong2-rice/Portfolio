import { site } from "@/data/site";

// 이력서 대신 짧은 편지. 그리고 다룰 줄 아는 도구를 글자로 크게.
export function MakerNote() {
  return (
    <section id="about" aria-labelledby="about-title" className="frame scroll-mt-0 py-[clamp(7rem,12vw,12rem)]">
      <div className="mx-auto grid max-w-[36rem] md:max-w-[72rem] gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[8%]">
        <div>
          <h2 id="about-title" data-r className="head">
            Maker&apos;s note
          </h2>
          <div className="mt-10 max-w-[34rem] space-y-6">
            {site.makerNote.map((para, i) => (
              <p key={i} data-r style={{ ["--d" as string]: i + 1 }}>
                {para}
              </p>
            ))}
          </div>
          <p data-r style={{ ["--d" as string]: 4 }} className="mt-10 text-[1.375rem] font-bold">
            웅
            <span className="mt-1 block text-[1rem] font-normal text-muted">관광경영·문화유산관리 전공, 바이브 코더</span>
          </p>
        </div>
        <div className="md:pt-3">
          <h3 data-r className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold tracking-[-0.025em]">
            손에 익은 도구
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
