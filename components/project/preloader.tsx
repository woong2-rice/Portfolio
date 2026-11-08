"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { Plane, Trophy } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

// 작품에 들어갈 때 1초 남짓 나오는 장면. 작품마다 그 작품다운 움직임이 하나씩 있어요.
//   여행 기록장: 비행기가 점선을 그리며 날아가 화면을 떠남
//   Langsplit: 외국어 인사 카드가 좌우로 넘겨져 날아감
//   운세주막: 창호 문이 양쪽으로 열림
//   다이아몬드: 야구공이 포물선을 그리며 날아감
//   재능은 애매하지 않다: 종이에 휘갈긴 낙서를 구겨 던지면 트로피로 바뀜
//   삼국지 3부작: 칼과 창이 부딪히며 불꽃이 튀고, 그 자리에서 누런 새 하늘(황천)이 열림
const HOLD = 1150;
/** 종이 장면은 그리기·구기기·던지기 세 동작이라 조금 더 길게 */
const HOLD_PAPER = 1750;
/** 칼과 창이 부딪히고 → 빛이 갈라지며 새 하늘이 열림 */
const HOLD_CLASH = 1900;
const EASE = [0.76, 0, 0.24, 1] as const;

export function Preloader({ project: p, lang }: { project: Project; lang: Locale }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) return setShow(false);
    const t = setTimeout(() => setShow(false), p.id === "same-age" ? HOLD_PAPER : p.id === "sangokushi" ? HOLD_CLASH : HOLD);
    return () => clearTimeout(t);
  }, [reduce, p.id]);

  const name = p.name[lang];
  const doors = p.id === "unse-jumak";

  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.div
          aria-hidden
          className="preloader-failsafe fixed inset-0 z-50 overflow-hidden"
          style={{ color: p.color.ink, backgroundColor: doors ? "transparent" : p.color.field }}
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={doors ? { opacity: 1, transition: { duration: 0.7 } } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {p.id === "travel-log" && <PlaneScene />}
          {p.id === "langsplit" && <CardScene color={p.color} />}
          {p.id === "unse-jumak" && <DoorScene color={p.color} name={name} />}
          {p.id === "diamond" && <BallScene />}
          {p.id === "same-age" && <PaperScene />}
          {p.id === "sangokushi" && <ClashScene />}
          {!doors && <Title name={name} latin={p.latin} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Title({ name, latin }: { name: string; latin: string }) {
  return (
    <motion.p
      className="absolute bottom-[10svh] left-[var(--margin)] right-[var(--margin)] text-[clamp(3rem,1.5rem+7vw,8rem)] font-bold leading-[0.95] tracking-[-0.045em]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {name}
      {latin !== name && <span className="block text-[0.3em] font-semibold tracking-[-0.02em] opacity-70">{latin}</span>}
    </motion.p>
  );
}

/** 여행 기록장: 왼쪽 아래에서 오른쪽 위로, 점선 항로를 그리며 날아가는 비행기 */
function PlaneScene() {
  const path = "M -40 620 C 260 600, 420 380, 640 300 S 1000 120, 1300 -60";
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="3 16"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        opacity={0.55}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: [0.5, 0, 0.3, 1] }}
      />
      <Follow d={path} duration={1.1} ease={[0.5, 0, 0.3, 1]} turn={45}>
        <Plane x={-28} y={-28} width={56} height={56} strokeWidth={1.6} fill="currentColor" />
      </Follow>
    </svg>
  );
}

/** Langsplit: 인사 카드 세 장이 차례로 좌우로 넘겨져 날아감 */
function CardScene({ color }: { color: Project["color"] }) {
  const cards = ["你好", "こんにちは", "Hello"];
  return (
    <div className="absolute inset-0 grid place-items-center pb-[18svh]">
      <div className="relative h-[min(52svh,24rem)] w-[min(68vw,17rem)]">
        {cards.map((word, i) => {
          const order = cards.length - 1 - i; // 위에 있는 카드가 먼저 날아감
          const dir = order % 2 === 0 ? 1 : -1;
          return (
            <motion.div
              key={word}
              className="absolute inset-0 grid place-items-center rounded-[1.25rem] text-[clamp(2rem,1.4rem+3vw,3rem)] font-bold"
              style={{ backgroundColor: color.ink, color: color.field, zIndex: i }}
              initial={{ x: 0, rotate: (i - 1) * 3, opacity: 1 }}
              animate={order < 2 ? { x: dir * 520, rotate: dir * 24, opacity: 0 } : { y: [10, 0] }}
              transition={{ delay: 0.15 + order * 0.32, duration: 0.5, ease: [0.5, 0, 0.75, 0] }}
            >
              {word}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** 운세주막: 창호 문 두 짝이 가운데에서 맞닿아 있다가 양쪽으로 열림 */
function DoorScene({ color, name }: { color: Project["color"]; name: string }) {
  const lattice = <Lattice />;
  return (
    <>
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#f6ecd6]"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {lattice}
      </motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#f6ecd6]"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {lattice}
      </motion.div>
      {/* 문 뒤에서 번지는 등불 */}
      <motion.div
        className="absolute left-1/2 top-1/2 size-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
        style={{ backgroundColor: color.accent }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.55, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
      />
      <motion.p
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[#3b2a1c] px-6 py-3 text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold tracking-[-0.03em] text-[#f6ecd6]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
      >
        {name}
      </motion.p>
    </>
  );
}

/** 다이아몬드: 야구공이 포물선을 그리며 날아가 화면 밖으로 */
function BallScene() {
  const path = "M 80 640 Q 600 -80 1240 260";
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity={0.35}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: [0.3, 0, 0.6, 1] }}
      />
      <Follow d={path} duration={1} ease={[0.3, 0, 0.6, 1]} spin={720}>
        <circle r="30" fill="#f8f6f0" />
        <path d="M -18 -22 Q -6 0 -18 22 M 18 -22 Q 6 0 18 22" fill="none" stroke="#d2373c" strokeWidth="3" strokeDasharray="3 4" />
      </Follow>
    </svg>
  );
}

/** 재능은 애매하지 않다: 종이에 낙서가 휘갈겨지고 → 구겨져 공이 되고 → 위로 던져지면 → 트로피로 바뀜 */
function PaperScene() {
  const D = 1.6; // 전체 길이(초)
  // 0 등장 · 0.06 펼침 · 0.34 낙서 끝 · 0.46 구김 · 0.6 던져서 꼭대기 · 0.63 사라짐 → 트로피가 남은 시간을 채움
  const times = [0, 0.06, 0.34, 0.46, 0.6, 0.63];
  const scribble =
    "M34 70 C70 38 96 92 128 58 S178 64 158 98 C132 128 64 104 50 138 S92 184 140 166 S186 164 168 204 C150 232 86 222 62 238";
  return (
    <div className="absolute inset-0 grid place-items-center pb-[16svh]">
      <div className="relative">
        {/* 종이 → 구겨진 공 */}
        <motion.div
          className="relative h-[min(40svh,17rem)] w-[min(56vw,13rem)] overflow-hidden bg-[#fffdf6]"
          initial={{ opacity: 0, scale: 0.86, rotate: -9, x: "0vw", y: "5svh", borderRadius: "2%" }}
          animate={{
            opacity: [0, 1, 1, 1, 1, 0],
            scale: [0.86, 1, 1, 0.3, 0.26, 0.2],
            rotate: [-9, -5, -5, 40, 250, 290],
            x: ["0vw", "0vw", "0vw", "0vw", "10vw", "11vw"],
            y: ["5svh", "0svh", "0svh", "2svh", "-24svh", "-25svh"],
            borderRadius: ["2%", "2%", "2%", "46%", "50%", "50%"],
          }}
          transition={{ duration: D, times, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
            {[52, 92, 132, 172, 212].map((y) => (
              <line key={y} x1="18" x2="182" y1={y} y2={y} stroke="#111" strokeOpacity="0.08" strokeWidth="1.5" />
            ))}
            <motion.path
              d={scribble}
              fill="none"
              stroke="#111"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: D * 0.06, duration: D * 0.26, ease: [0.4, 0, 0.6, 1] }}
            />
            {/* 구겨질 때 생기는 주름 */}
            <motion.path
              d="M20 40 L90 120 L60 200 M180 30 L110 130 L170 230 M30 150 L170 140"
              fill="none"
              stroke="#111"
              strokeOpacity="0.35"
              strokeWidth="3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: D * 0.46, times: [0, 0.75, 1] }}
            />
          </svg>
        </motion.div>

        {/* 꼭대기에서 트로피로 */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-[4rem] -mt-[4rem]"
          initial={{ opacity: 0, scale: 0.2, rotate: -25, x: "11vw", y: "-25svh" }}
          animate={{
            opacity: [0, 0, 1, 1],
            scale: [0.2, 0.2, 1.25, 1],
            rotate: [-25, -25, 6, 0],
            x: ["11vw", "11vw", "11vw", "11vw"],
            y: ["-25svh", "-25svh", "-25svh", "-25svh"],
          }}
          transition={{ duration: D, times: [0, 0.6, 0.7, 0.78], ease: "easeOut" }}
        >
          <Trophy size={128} strokeWidth={1.4} fill="#fffdf6" />
          {/* 반짝 */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <span key={deg} className="absolute left-1/2 top-1/2 size-0" style={{ transform: `rotate(${deg}deg)` }}>
              <motion.span
                className="absolute left-0 top-[-1.5px] h-[3px] w-6 rounded-full bg-current"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: [0, 0, 1, 0], x: [0, 0, 74, 100] }}
                transition={{ duration: D, times: [0, 0.62, 0.72, 0.86] }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/** 삼국지 3부작: 왼쪽 아래에서 칼, 오른쪽 아래에서 창이 들어와 한가운데서 부딪힘 →
 *  섬광과 불꽃 → 부딪힌 자리에서 금빛 해가 떠오르고 지평선이 양옆으로 갈라지며 새 하늘이 열림 */
function ClashScene() {
  const D = 1.8;
  const HIT = 0.3; // 부딪히는 순간(전체 대비)
  const GOLD = "#d8be7e";
  const STEEL = "#e9e4d6";
  // 두 무기가 겹치는 점이 화면의 (50%, 40%)
  const pivot = "absolute left-1/2 top-[40%] size-0";
  const enter = (from: string) => ({
    x: [from, "0vw", from.startsWith("-") ? "-1.6vw" : "1.6vw", "0vw", "0vw"],
    y: ["34vh", "0vh", "1vh", "0vh", "0vh"],
    opacity: [0, 1, 1, 1, 0.25],
  });
  const enterT = { duration: D, times: [0, HIT, HIT + 0.05, HIT + 0.12, 1], ease: "easeOut" as const };
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ x: 0 }}
      animate={{ x: [0, 0, -9, 8, -4, 0] }}
      transition={{ duration: D, times: [0, HIT, HIT + 0.02, HIT + 0.04, HIT + 0.07, HIT + 0.1] }}
    >
      {/* 떠오르는 금빛 해 (흐린 원) */}
      <div className={pivot}>
        <motion.span
          className="absolute -left-[22vmin] -top-[22vmin] size-[44vmin] rounded-full blur-[48px]"
          style={{ backgroundColor: GOLD }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0, 0.75, 0.85], scale: [0.2, 0.2, 1.25, 1.7] }}
          transition={{ duration: D, times: [0, HIT + 0.08, 0.7, 1], ease: "easeOut" }}
        />
      </div>

      {/* 갈라지는 지평선 */}
      <motion.span
        className="absolute left-0 right-0 top-[40%] h-[2px] origin-center"
        style={{ backgroundColor: GOLD }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 0, 1], opacity: [0, 1, 1] }}
        transition={{ duration: D, times: [0, HIT + 0.12, 0.72], ease: [0.65, 0, 0.35, 1] }}
      />

      {/* 칼: 끝이 오른쪽 위를 향하게 */}
      <div className={pivot}>
        <motion.div
          className="absolute -left-[2.6vmin] -top-[25vmin] h-[56vmin] w-[5.2vmin] origin-[50%_25vmin]"
          style={{ rotate: 38 }}
          initial={{ x: "-62vw", y: "34vh", opacity: 0 }}
          animate={enter("-62vw")}
          transition={enterT}
        >
          <svg viewBox="0 0 40 440" className="h-full w-full overflow-visible" aria-hidden>
            <path d="M20 0 L27 22 L27 300 L13 300 L13 22 Z" fill={STEEL} />
            <path d="M20 14 L20 296" stroke="#141a16" strokeOpacity="0.35" strokeWidth="2" />
            <rect x="0" y="300" width="40" height="11" rx="2" fill={GOLD} />
            <rect x="15" y="311" width="10" height="92" fill="#3b2a1d" />
            <circle cx="20" cy="412" r="9" fill={GOLD} />
          </svg>
        </motion.div>
      </div>

      {/* 창: 끝이 왼쪽 위를 향하게, 붉은 술 */}
      <div className={pivot}>
        <motion.div
          className="absolute -left-[2.6vmin] -top-[25vmin] h-[70vmin] w-[5.2vmin] origin-[50%_25vmin]"
          style={{ rotate: -38 }}
          initial={{ x: "62vw", y: "34vh", opacity: 0 }}
          animate={enter("62vw")}
          transition={enterT}
        >
          <svg viewBox="0 0 40 560" className="h-full w-full overflow-visible" aria-hidden>
            <path d="M20 0 C31 34 31 70 20 104 C9 70 9 34 20 0 Z" fill={STEEL} />
            <rect x="12" y="104" width="16" height="12" fill={GOLD} />
            <path d="M14 118 L6 168 M18 118 L14 176 M22 118 L26 176 M26 118 L34 168" stroke="#a82828" strokeWidth="4" strokeLinecap="round" />
            <rect x="17" y="116" width="6" height="444" fill="#7a5a3a" />
          </svg>
        </motion.div>
      </div>

      {/* 섬광과 불꽃 */}
      <div className={pivot}>
        <motion.span
          className="absolute -left-[9vmin] -top-[9vmin] size-[18vmin] rounded-full bg-white blur-[6px]"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0, 1, 0], scale: [0.2, 0.2, 1.5, 2.6] }}
          transition={{ duration: D, times: [0, HIT - 0.01, HIT + 0.03, HIT + 0.16] }}
        />
        {[0, 32, 70, 112, 150, 196, 236, 278, 318].map((deg, i) => (
          <span key={deg} className="absolute left-0 top-0 size-0" style={{ transform: `rotate(${deg}deg)` }}>
            <motion.span
              className="absolute left-0 top-[-1px] h-[2px] rounded-full"
              style={{ backgroundColor: i % 3 === 0 ? "#fff6d8" : GOLD, width: `${3 + (i % 3)}vmin` }}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0, 0, 1, 0], x: ["0vmin", "0vmin", `${10 + (i % 4) * 3}vmin`, `${16 + (i % 4) * 4}vmin`] }}
              transition={{ duration: D, times: [0, HIT, HIT + 0.06, HIT + 0.2], ease: "easeOut" }}
            />
          </span>
        ))}
      </div>

      {/* 새 하늘의 이름 */}
      <motion.p
        lang="zh-Hant"
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(2.5rem,1.5rem+5vw,6rem)] font-bold tracking-[0.3em]"
        style={{ color: "#141a16" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: D, times: [0, 0.62, 0.82] }}
      >
        黃天
      </motion.p>
    </motion.div>
  );
}

/** SVG 경로를 따라 자식을 움직입니다 (turn: 진행 방향에 더할 각도, spin: 전체 회전량) */
function Follow({
  d,
  duration,
  ease,
  turn,
  spin,
  children,
}: {
  d: string;
  duration: number;
  ease: [number, number, number, number];
  turn?: number;
  spin?: number;
  children: ReactNode;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const gRef = useRef<SVGGElement>(null);
  useEffect(() => {
    const path = pathRef.current, g = gRef.current;
    if (!path || !g) return;
    const len = path.getTotalLength();
    const place = (k: number) => {
      const p = path.getPointAtLength(k * len);
      let angle = 0;
      if (turn !== undefined) {
        const q = path.getPointAtLength(Math.min(len, k * len + 1));
        angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI + turn;
      }
      if (spin) angle = k * spin;
      g.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
    };
    place(0);
    const c = animate(0, 1, { duration, ease, onUpdate: place });
    return () => c.stop();
  }, [duration, ease, turn, spin]);
  return (
    <>
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      <g ref={gRef}>{children}</g>
    </>
  );
}

/** 창호 격자: 나무 살(진한 갈색)과 한지(미색) */
function Lattice() {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id="shoji" width="96" height="120" patternUnits="userSpaceOnUse">
          <rect width="96" height="120" fill="#f6ecd6" />
          <rect width="6" height="120" fill="#3b2a1c" />
          <rect width="96" height="6" fill="#3b2a1c" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#shoji)" />
      <rect width="100%" height="100%" fill="none" stroke="#3b2a1c" strokeWidth="20" />
    </svg>
  );
}
