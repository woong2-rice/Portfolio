"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { Plane } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

// 작품에 들어갈 때 1초 남짓 나오는 장면. 작품마다 그 작품다운 움직임이 하나씩 있어요.
//   여행 기록장: 비행기가 점선을 그리며 날아가 화면을 떠남
//   Langsplit: 외국어 인사 카드가 좌우로 넘겨져 날아감
//   운세주막: 창호 문이 양쪽으로 열림
//   다이아몬드: 야구공이 포물선을 그리며 날아감
//   재능은 애매하지 않다: 나이 숫자가 빠르게 올라감
const HOLD = 1150;
const EASE = [0.76, 0, 0.24, 1] as const;

export function Preloader({ project: p, lang }: { project: Project; lang: Locale }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) return setShow(false);
    const t = setTimeout(() => setShow(false), HOLD);
    return () => clearTimeout(t);
  }, [reduce]);

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
          {p.id === "same-age" && <CountScene />}
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

/** 재능은 애매하지 않다: 나이가 1부터 빠르게 올라감 */
function CountScene() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 950);
      setN(Math.round(1 + 64 * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <p className="absolute right-[var(--margin)] top-[8svh] text-[clamp(7rem,4rem+18vw,18rem)] font-bold leading-none tracking-[-0.06em] tabular-nums">
      {n}
    </p>
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
