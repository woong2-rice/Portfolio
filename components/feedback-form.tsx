"use client";

import { ArrowRight, Check } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { feedbackApps, feedbackKinds, sendFeedback, type FeedbackApp, type FeedbackKind } from "@/lib/feedback";
import type { L, Locale } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const T = {
  app: { ko: "어느 작품인가요?", en: "Which project?", ja: "どの作品ですか？", zh: "是哪个作品？" },
  launchpad: { ko: "이 런치패드", en: "This Launchpad", ja: "このランチパッド", zh: "这个作品集" },
  kind: { ko: "어떤 이야기인가요?", en: "What kind?", ja: "どんな内容ですか？", zh: "是什么类型？" },
  kinds: {
    bug: { ko: "고장 났어요", en: "Something broke", ja: "不具合", zh: "出故障了" },
    idea: { ko: "이런 게 있으면", en: "An idea", ja: "こんな機能が欲しい", zh: "我有个想法" },
    praise: { ko: "좋았어요", en: "I liked it", ja: "よかった", zh: "很喜欢" },
    other: { ko: "그 밖에", en: "Something else", ja: "その他", zh: "其他" },
  } as Record<FeedbackKind, L>,
  message: { ko: "내용", en: "Message", ja: "内容", zh: "内容" },
  messageHint: {
    ko: "어느 화면에서 무엇을 하다가 그랬는지 적어 주면 고치기 쉬워요.",
    en: "Saying which screen and what you were doing makes it easier to fix.",
    ja: "どの画面で何をしていたかを書いてもらえると直しやすいです。",
    zh: "写清楚在哪个页面、做什么时发生的，会更容易修复。",
  },
  contact: { ko: "답장 받을 연락처 (선택)", en: "Where to reply (optional)", ja: "返信先（任意）", zh: "回复联系方式（选填）" },
  contactHint: {
    ko: "이메일 등. 비워 두면 익명으로 보내져요.",
    en: "Email or similar. Leave blank to send anonymously.",
    ja: "メールなど。空欄なら匿名で送られます。",
    zh: "邮箱等。留空则匿名发送。",
  },
  send: { ko: "보내기", en: "Send", ja: "送る", zh: "发送" },
  sending: { ko: "보내는 중…", en: "Sending…", ja: "送信中…", zh: "发送中…" },
  done: { ko: "잘 받았어요. 고마워요!", en: "Got it. Thank you!", ja: "受け取りました。ありがとう！", zh: "收到了，谢谢！" },
  again: { ko: "하나 더 보내기", en: "Send another", ja: "もう一つ送る", zh: "再发一条" },
  error: {
    ko: "지금은 보내지 못했어요. 잠시 뒤 다시 시도하거나 메일로 보내 주세요:",
    en: "It didn't go through. Try again shortly, or email it to:",
    ja: "いま送信できませんでした。少し後でもう一度試すか、メールで送ってください：",
    zh: "暂时没能发送。请稍后再试，或发邮件到：",
  },
  empty: { ko: "내용을 적어 주세요.", en: "Please write a message.", ja: "内容を書いてください。", zh: "请填写内容。" },
} as const;

export function FeedbackForm({ lang, initialApp = "launchpad" }: { lang: Locale; initialApp?: FeedbackApp }) {
  const ids = { app: useId(), msg: useId(), msgHint: useId(), contact: useId(), contactHint: useId(), err: useId() };
  const [app, setApp] = useState<FeedbackApp>(initialApp);
  const [kind, setKind] = useState<FeedbackKind>("idea");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "empty">("idle");

  // 주소에 ?app=langsplit 처럼 붙어 오면 그 작품을 골라 둡니다
  useEffect(() => {
    const a = new URLSearchParams(location.search).get("app");
    if (a && (feedbackApps as readonly string[]).includes(a)) setApp(a as FeedbackApp);
  }, []);

  const appName = (a: FeedbackApp) => (a === "launchpad" ? T.launchpad[lang] : projects.find((p) => p.id === a)?.name[lang] ?? a);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return setState("empty");
    if (trap) return setState("done"); // 자동 입력 로봇은 조용히 무시
    setState("sending");
    try {
      await sendFeedback({ app, kind, message: message.trim().slice(0, 2000), contact: contact.trim().slice(0, 200), lang, page: location.pathname });
      setState("done");
      setMessage("");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="bg-surface px-7 py-10">
        <Check aria-hidden className="size-8" />
        <p className="mt-4 text-[1.5rem] font-bold tracking-[-0.02em]">{T.done[lang]}</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 font-semibold underline underline-offset-4">
          {T.again[lang]}
        </button>
      </div>
    );
  }

  const field = "w-full bg-surface px-4 text-[1.0625rem] text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-inset focus:ring-accent";

  return (
    <form onSubmit={submit} noValidate className="grid gap-8">
      <div>
        <label htmlFor={ids.app} className="block font-semibold">{T.app[lang]}</label>
        <select id={ids.app} value={app} onChange={(e) => setApp(e.target.value as FeedbackApp)} className={cn(field, "mt-3 h-14 appearance-auto")}>
          {feedbackApps.map((a) => (
            <option key={a} value={a}>{appName(a)}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="font-semibold">{T.kind[lang]}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {feedbackKinds.map((k) => (
            <label
              key={k}
              className={cn(
                "cursor-pointer px-4 py-2.5 text-[1rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                kind === k ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-surface-2",
              )}
            >
              <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} className="sr-only" />
              {T.kinds[k][lang]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={ids.msg} className="block font-semibold">{T.message[lang]}</label>
        <textarea
          id={ids.msg}
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (state === "empty") setState("idle"); }}
          rows={6}
          maxLength={2000}
          aria-describedby={`${ids.msgHint}${state === "empty" ? ` ${ids.err}` : ""}`}
          aria-invalid={state === "empty"}
          className={cn(field, "mt-3 resize-y py-3 leading-relaxed")}
        />
        <p id={ids.msgHint} className="mt-2 flex justify-between gap-4 text-[0.9375rem] text-muted">
          <span>{T.messageHint[lang]}</span>
          <span className="tabular shrink-0">{message.length}/2000</span>
        </p>
        {state === "empty" && <p id={ids.err} className="mt-2 font-semibold text-[#c2410c]">{T.empty[lang]}</p>}
      </div>

      <div>
        <label htmlFor={ids.contact} className="block font-semibold">{T.contact[lang]}</label>
        <input id={ids.contact} value={contact} onChange={(e) => setContact(e.target.value)} maxLength={200} autoComplete="email" aria-describedby={ids.contactHint} className={cn(field, "mt-3 h-14")} />
        <p id={ids.contactHint} className="mt-2 text-[0.9375rem] text-muted">{T.contactHint[lang]}</p>
      </div>

      {/* 사람에게는 보이지 않는 칸: 로봇이 채우면 버립니다 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {state === "error" && (
        <p role="alert" className="bg-surface px-4 py-3">
          {T.error[lang]}{" "}
          <a className="font-semibold underline" href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`[${appName(app)}] feedback`)}&body=${encodeURIComponent(message)}`}>
            {site.contact.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex h-14 w-fit items-center gap-2 bg-ink px-8 text-[1.0625rem] font-semibold text-bg transition-transform active:scale-[0.97] disabled:opacity-60 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
      >
        {state === "sending" ? T.sending[lang] : T.send[lang]}
        {state !== "sending" && <ArrowRight aria-hidden className="size-5" />}
      </button>
    </form>
  );
}
