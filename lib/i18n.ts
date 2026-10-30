// 다국어: 한국어(기본, 주소 앞에 아무것도 없음) / English / 日本語 / 中文
export const locales = ["ko", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export const otherLocales = ["en", "ja", "zh"] as const;

/** 언어별 글 한 묶음 */
export type L = Record<Locale, string>;

export const localeLabel: Record<Locale, string> = { ko: "한국어", en: "English", ja: "日本語", zh: "中文" };
export const htmlLang: Record<Locale, string> = { ko: "ko", en: "en", ja: "ja", zh: "zh-Hans" };

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

/** 그 언어의 주소 앞부분: 한국어는 "", 나머지는 "/en" 처럼 */
export function prefix(lang: Locale) {
  return lang === "ko" ? "" : `/${lang}`;
}

/** 경로를 다른 언어 경로로 바꿉니다: "/en/project/x" → ("ja") "/ja/project/x" */
export function switchPath(pathname: string, to: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) parts.shift();
  const rest = parts.length ? `/${parts.join("/")}` : "";
  return `${prefix(to)}${rest}` || "/";
}

export function langFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : "ko";
}
