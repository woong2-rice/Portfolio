import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn/ui 방식의 버튼. 한 가지 모양(각진 모서리)만 씁니다.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[transform,background-color,color] duration-200 ease-[var(--ease-out)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5",
  {
    variants: {
      variant: {
        solid: "bg-[var(--btn-bg,var(--accent))] text-[var(--btn-ink,var(--accent-ink))] hover:brightness-110",
        outline:
        "bg-transparent text-ink shadow-[inset_0_0_0_1.5px_var(--ink)] hover:bg-ink hover:text-bg",
      quiet:
          "bg-[color-mix(in_oklab,var(--btn-bg,var(--accent))_14%,transparent)] text-[var(--btn-quiet-ink,var(--ink))] hover:bg-[color-mix(in_oklab,var(--btn-bg,var(--accent))_24%,transparent)]",
      },
      size: {
        md: "h-12 px-5 text-[1rem]",
        lg: "h-14 px-7 text-[1.0625rem]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type Props = React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, ...props }: Props) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
