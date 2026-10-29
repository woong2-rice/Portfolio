"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// 상세 페이지에 들어올 때 1초 남짓, 그 작품의 색이 화면을 채웠다가 걷힙니다.
export function Preloader({ name, latin, field, ink }: { name: string; latin: string; field: string; ink: string }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 550);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.div
          aria-hidden
          className="preloader-failsafe fixed inset-0 z-50 flex items-end px-[var(--margin)] pb-[12svh]"
          style={{ backgroundColor: field, color: ink }}
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="text-[clamp(3rem,1.5rem+7vw,8rem)] font-bold leading-[0.95] tracking-[-0.045em]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {name}
            {latin !== name && <span className="block text-[0.32em] font-semibold tracking-[-0.02em] opacity-80">{latin}</span>}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
