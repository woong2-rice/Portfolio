import Image from "next/image";
import type { FragmentName, Shot } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import { DiamondLineScore, DiamondModules, DiamondStandings } from "./fragments/diamond";
import { SameAgeScreen } from "./fragments/same-age";
import { IphoneFrame } from "./device/iphone-frame";
import { MacbookFrame } from "./device/macbook-frame";
import { LoopVideo } from "./loop-video";

export function Fragment({ name, lang }: { name: FragmentName; lang: Locale }) {
  switch (name) {
    case "diamond-linescore":
      return <DiamondLineScore />;
    case "diamond-standings":
      return <DiamondStandings />;
    case "diamond-modules":
      return <DiamondModules />;
    case "same-age":
      return <SameAgeScreen lang={lang} />;
  }
}

/** 기기 화면 안을 채우는 것: 영상, 스크린샷(위쪽 기준으로 잘라 채움), 또는 HTML 조각 */
export function ScreenContent({
  screen,
  lang,
  priority,
  sizes,
}: {
  screen: Shot | { fragment: FragmentName };
  lang: Locale;
  priority?: boolean;
  sizes: string;
}) {
  if ("src" in screen && screen.video) {
    return <LoopVideo src={screen.video} poster={screen.src} label={screen.alt[lang]} />;
  }
  if ("src" in screen) {
    return (
      <Image
        src={screen.src}
        alt={screen.alt[lang]}
        width={screen.width}
        height={screen.height}
        priority={priority}
        sizes={sizes}
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return <Fragment name={screen.fragment} lang={lang} />;
}

export function Device({
  kind,
  screen,
  lang,
  priority,
  sizes = "(min-width: 1024px) 30vw, 70vw",
}: {
  kind: "phone" | "laptop";
  screen: Shot | { fragment: FragmentName };
  lang: Locale;
  priority?: boolean;
  sizes?: string;
}) {
  const Frame = kind === "phone" ? IphoneFrame : MacbookFrame;
  return (
    <Frame>
      <ScreenContent screen={screen} lang={lang} priority={priority} sizes={sizes} />
    </Frame>
  );
}
