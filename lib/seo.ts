// 검색엔진(구글·네이버)용 공통 도구: 언어별 주소 묶음, 인증 태그, 공유 미리보기.
import type { Metadata } from "next";
import { site } from "@/data/site";
import { locales, prefix, type Locale } from "@/lib/i18n";

/** "/project/x" → { ko: "/project/x", en: "/en/project/x", …, "x-default": "/project/x" } */
export function languagesFor(path: string) {
  const p = path === "/" ? "" : path;
  const map: Record<string, string> = {};
  for (const l of locales) map[l === "zh" ? "zh-Hans" : l] = `${prefix(l)}${p}` || "/";
  map["x-default"] = p || "/";
  return map;
}

/** 그 언어의 주소: ("en", "/project/x") → "/en/project/x" */
export function pathFor(lang: Locale, path: string) {
  const p = path === "/" ? "" : path;
  return `${prefix(lang)}${p}` || "/";
}

export const ogLocale: Record<Locale, string> = { ko: "ko_KR", en: "en_US", ja: "ja_JP", zh: "zh_CN" };

/** 구글·네이버 등록 확인 태그 (값이 있을 때만) */
export function verification(): Metadata["verification"] | undefined {
  const { google, naver } = site.verify;
  if (!google && !naver) return undefined;
  return {
    ...(google && { google }),
    ...(naver && { other: { "naver-site-verification": naver } }),
  };
}

export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: site.title };
