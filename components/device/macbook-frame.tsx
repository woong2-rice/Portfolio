import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// 노트북 목업. 화면 비율 16:10, 아래에 받침.
export function MacbookFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="mx-[7%] rounded-t-[2.2%/3.4%] bg-[#101112] px-[1.8%] pb-[2.4%] pt-[2.4%]">
        <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "16 / 10" }}>
          {children}
        </div>
      </div>
      <div className="relative h-0 pb-[2.6%]">
        <div className="absolute inset-0 rounded-b-[40%/100%] bg-[#2a2c2e]" />
        <div className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[30%/100%] bg-[#16181a]" />
      </div>
    </div>
  );
}
