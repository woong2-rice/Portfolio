"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";
import { site } from "@/data/site";

// 연락: 질문 하나와 칸 하나. 이메일이 설정돼 있으면 메일 앱으로 바로 이어지고,
// 아직 없으면 GitHub로 연결합니다.
export function Contact() {
  const id = useId();
  const hint = useId();
  const [msg, setMsg] = useState("");
  const { email, github, githubLabel, twitter } = site.contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="frame scroll-mt-0 bg-surface py-[clamp(7rem,12vw,11rem)]">
      <div className="mx-auto max-w-[36rem]">
        <h2 id="contact-title" data-r className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold leading-snug tracking-[-0.02em]">
          <span className="block text-muted">만들고 싶은 게 떠올랐다면,</span>
          <span className="block">같이 이야기해요.</span>
        </h2>

        {email ? (
          <form
            data-r
            style={{ ["--d" as string]: 1 }}
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              const body = encodeURIComponent(msg);
              location.href = `mailto:${email}?subject=${encodeURIComponent("런치패드에서 보내는 메시지")}&body=${body}`;
            }}
          >
            <label htmlFor={id} className="sr-only">
              보낼 메시지
            </label>
            <div className="relative">
              <input
                id={id}
                aria-describedby={hint}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="한 줄로 적어 주세요"
                className="h-16 w-full bg-bg pl-5 pr-16 text-[1.0625rem] text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-inset focus:ring-accent"
              />
              <button
                type="submit"
                aria-label="메일로 보내기"
                className="absolute right-2 top-2 grid size-12 place-items-center bg-accent text-accent-ink transition-transform hover:[&_svg]:translate-x-0.5 active:scale-95"
              >
                <ArrowRight aria-hidden />
              </button>
            </div>
            <p id={hint} className="mt-4 text-[0.9375rem] text-muted">
              보내기를 누르면 메일 앱이 이 문장을 담아 열려요.
            </p>
          </form>
        ) : null}

        <dl data-r style={{ ["--d" as string]: 2 }} className="mt-14 grid gap-4 text-[1.0625rem]">
          {github && (
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-muted">GitHub</dt>
              <dd>
                <a href={github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 font-semibold underline">
                  {githubLabel}
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </dd>
            </div>
          )}
          {email && (
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-muted">Email</dt>
              <dd>
                <a href={`mailto:${email}`} className="font-semibold underline">
                  {email}
                </a>
              </dd>
            </div>
          )}
          {twitter && (
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-muted">X</dt>
              <dd>
                <a href={twitter} target="_blank" rel="noreferrer" className="font-semibold underline">
                  {twitter.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
