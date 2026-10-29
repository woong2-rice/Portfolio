import Image from "next/image";
import type { Feature, Shot } from "@/data/projects";
import { DiamondLineScore, DiamondModules, DiamondStandings } from "./fragments/diamond";
import { SameAgeScreen } from "./fragments/same-age";
import { IphoneFrame } from "./device/iphone-frame";
import { MacbookFrame } from "./device/macbook-frame";
import { LoopVideo } from "./loop-video";

export function Fragment({ name }: { name: NonNullable<Feature["fragment"]> }) {
  switch (name) {
    case "diamond-linescore":
      return <DiamondLineScore />;
    case "diamond-standings":
      return <DiamondStandings />;
    case "diamond-modules":
      return <DiamondModules />;
    case "same-age":
      return <SameAgeScreen />;
  }
}

/** 기기 화면 안을 채우는 것: 스크린샷이면 위쪽 기준으로 잘라 채우고, 아니면 HTML 조각 */
export function ScreenContent({
  screen,
  priority,
  sizes,
}: {
  screen: Shot | { fragment: Feature["fragment"] };
  priority?: boolean;
  sizes: string;
}) {
  if ("src" in screen && screen.video) {
    return <LoopVideo src={screen.video} poster={screen.src} label={screen.alt} />;
  }
  if ("src" in screen) {
    return (
      <Image
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        priority={priority}
        sizes={sizes}
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return screen.fragment ? <Fragment name={screen.fragment} /> : null;
}

export function Device({
  kind,
  screen,
  priority,
  sizes = "(min-width: 1024px) 30vw, 70vw",
}: {
  kind: "phone" | "laptop";
  screen: Shot | { fragment: Feature["fragment"] };
  priority?: boolean;
  sizes?: string;
}) {
  const Frame = kind === "phone" ? IphoneFrame : MacbookFrame;
  return (
    <Frame>
      <ScreenContent screen={screen} priority={priority} sizes={sizes} />
    </Frame>
  );
}
