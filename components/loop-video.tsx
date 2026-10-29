"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

// 소리 없는 반복 영상. 화면 밖이거나 탭이 숨겨지면 멈추고, 움직임 줄이기 설정이면 첫 장면만 보여 줍니다.
export function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !document.hidden) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover object-top"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
