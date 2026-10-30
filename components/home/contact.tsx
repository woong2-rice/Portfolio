"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";
import { site, ui } from "@/data/site";
import { prefix, type Locale } from "@/lib/i18n";

// 연락: 질문 하나와 칸 하나. 보내기를 누르면 메일 앱이 그 문장을 담아 열립니다.
export function Contact({ lang }: { lang: Locale }) {
  const id = useId();
  const hint = useId();
  const [msg, setMsg] = useState("");
  const { email, github, githubLabel } = site.contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="frame scroll-mt-0 bg-surface py-[clamp(7rem,12vw,11rem)]">
      <div className="mx-auto max-w-[36rem]">
        <h2 id="contact-title" data-r className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold leading-snug tracking-[-0.02em]">
          <span className="block text-muted">{ui.contact.line1[lang]}</span>
          <span className="block">{ui.contact.line2[lang]}</span>
        </h2>

        <form
          data-r
          style={{ ["--d" as string]: 1 }}
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            location.href = `mailto:${email}?subject=${encodeURIComponent(ui.contact.subject[lang])}&body=${encodeURIComponent(msg)}`;
          }}
        >
          <label htmlFor={id} className="sr-only">
            {ui.contact.placeholder[lang]}
          </label>
          <div className="relative">
            <input
              id={id}
              aria-describedby={hint}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={ui.contact.placeholder[lang]}
              className="h-16 w-full bg-bg pl-5 pr-16 text-[1.0625rem] text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-inset focus:ring-accent"
            />
            <button
              type="submit"
              aria-label={ui.contact.send[lang]}
              className="absolute right-2 top-2 grid size-12 place-items-center bg-accent text-accent-ink transition-transform active:scale-95 hover:[&_svg]:translate-x-0.5"
            >
              <ArrowRight aria-hidden className="transition-transform" />
            </button>
          </div>
          <p id={hint} className="mt-4 text-[0.9375rem] text-muted">
            {ui.contact.hint[lang]}
          </p>
        </form>

        <dl data-r style={{ ["--d" as string]: 2 }} className="mt-14 grid gap-4 text-[1.0625rem]">
          <div className="grid grid-cols-[6.5rem_1fr] gap-4">
            <dt className="text-muted">Email</dt>
            <dd>
              <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
                {email}
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-4">
            <dt className="text-muted">GitHub</dt>
            <dd>
              <a href={github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 font-semibold underline underline-offset-4">
                {githubLabel}
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-4">
            <dt className="text-muted">{ui.nav.feedback[lang]}</dt>
            <dd>
              <Link href={`${prefix(lang)}/feedback`} className="font-semibold underline underline-offset-4">
                {ui.feedback.title[lang]} →
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
