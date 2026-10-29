"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

// 포인터를 따라 기기가 살짝 기울어지는 3D 효과. 그림자 없이 원근만 씁니다.
export function Tilt({ children, max = 7, className }: { children: ReactNode; max?: number; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 18 });
  const sy = useSpring(y, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      className={className}
      style={{ perspective: 1400 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}
