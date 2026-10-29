import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// 폰 목업. 화면 비율 9:19.5. 스크린샷이든 HTML 조각이든 children으로 넣습니다.
// 모든 작품을 같은 규격의 틀에 넣어 서로 다른 화면 스타일을 한 줄로 묶어 줍니다.
export function IphoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("relative w-full rounded-[13%/6%] bg-[#101112] p-[3.2%]", className)}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[10.5%/4.9%] bg-black">
        {children}
        <div
          aria-hidden
          className="absolute left-1/2 top-[1.6%] h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-[#101112]"
        />
      </div>
      <span aria-hidden className="absolute -right-[1.1%] top-[22%] h-[9%] w-[1.1%] rounded-r bg-[#101112]" />
      <span aria-hidden className="absolute -left-[1.1%] top-[18%] h-[5%] w-[1.1%] rounded-l bg-[#101112]" />
      <span aria-hidden className="absolute -left-[1.1%] top-[25%] h-[8%] w-[1.1%] rounded-l bg-[#101112]" />
    </div>
  );
}
