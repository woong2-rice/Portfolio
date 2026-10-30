// '재능은 애매하지 않다' 미리보기에 쓰는 위인 기록.
// 나이는 그 일이 일어난 해의 만 나이입니다. 정식 서비스 전에는 항목마다 출처를 붙일 예정이에요.
import type { L, Locale } from "@/lib/i18n";

export type Feat = { age: number; year: string; who: L; did: L; field: L };

const F = {
  music: { ko: "음악", en: "music", ja: "音楽", zh: "音乐" },
  invention: { ko: "발명", en: "invention", ja: "発明", zh: "发明" },
  history: { ko: "역사", en: "history", ja: "歴史", zh: "历史" },
  science: { ko: "과학", en: "science", ja: "科学", zh: "科学" },
  literature: { ko: "문학", en: "literature", ja: "文学", zh: "文学" },
  art: { ko: "미술", en: "art", ja: "美術", zh: "美术" },
} satisfies Record<string, L>;

export const feats: Feat[] = [
  { age: 8, year: "1764", field: F.music,
    who: { ko: "모차르트", en: "Mozart", ja: "モーツァルト", zh: "莫扎特" },
    did: { ko: "첫 교향곡을 썼어요", en: "wrote his first symphony", ja: "最初の交響曲を書きました", zh: "写出了第一部交响曲" } },
  { age: 15, year: "1824", field: F.invention,
    who: { ko: "루이 브라유", en: "Louis Braille", ja: "ルイ・ブライユ", zh: "路易·布莱叶" },
    did: { ko: "점자를 고안했어요", en: "devised braille", ja: "点字を考案しました", zh: "发明了盲文" } },
  { age: 17, year: "1429", field: F.history,
    who: { ko: "잔 다르크", en: "Joan of Arc", ja: "ジャンヌ・ダルク", zh: "圣女贞德" },
    did: { ko: "오를레앙 포위를 풀어냈어요", en: "lifted the siege of Orléans", ja: "オルレアンの包囲を解きました", zh: "解除了奥尔良之围" } },
  { age: 19, year: "1642", field: F.science,
    who: { ko: "블레즈 파스칼", en: "Blaise Pascal", ja: "ブレーズ・パスカル", zh: "布莱兹·帕斯卡" },
    did: { ko: "계산기를 설계하기 시작했어요", en: "began designing his calculating machine", ja: "計算機の設計を始めました", zh: "开始设计他的计算器" } },
  { age: 20, year: "1818", field: F.literature,
    who: { ko: "메리 셸리", en: "Mary Shelley", ja: "メアリー・シェリー", zh: "玛丽·雪莱" },
    did: { ko: "『프랑켄슈타인』을 펴냈어요", en: "published Frankenstein", ja: "『フランケンシュタイン』を出版しました", zh: "出版了《弗兰肯斯坦》" } },
  { age: 21, year: "1418", field: F.history,
    who: { ko: "세종", en: "King Sejong", ja: "世宗", zh: "世宗" },
    did: { ko: "조선의 네 번째 임금이 되었어요", en: "became the fourth king of Joseon", ja: "朝鮮の第4代国王になりました", zh: "成为朝鲜第四代国王" } },
  { age: 23, year: "1666", field: F.science,
    who: { ko: "아이작 뉴턴", en: "Isaac Newton", ja: "アイザック・ニュートン", zh: "艾萨克·牛顿" },
    did: { ko: "미적분을 고안했어요", en: "worked out calculus", ja: "微積分を考案しました", zh: "构想出了微积分" } },
  { age: 26, year: "1905", field: F.science,
    who: { ko: "아인슈타인", en: "Einstein", ja: "アインシュタイン", zh: "爱因斯坦" },
    did: { ko: "특수 상대성 이론을 발표했어요", en: "published special relativity", ja: "特殊相対性理論を発表しました", zh: "发表了狭义相对论" } },
  { age: 27, year: "1880", field: F.art,
    who: { ko: "빈센트 반 고흐", en: "Vincent van Gogh", ja: "フィンセント・ファン・ゴッホ", zh: "文森特·梵高" },
    did: { ko: "화가의 길로 들어섰어요", en: "set out to become a painter", ja: "画家の道に進みました", zh: "走上了画家之路" } },
  { age: 45, year: "1937", field: F.literature,
    who: { ko: "J. R. R. 톨킨", en: "J. R. R. Tolkien", ja: "J・R・R・トールキン", zh: "J.R.R.托尔金" },
    did: { ko: "『호빗』을 펴냈어요", en: "published The Hobbit", ja: "『ホビット』を出版しました", zh: "出版了《霍比特人》" } },
  { age: 56, year: "1818", field: F.history,
    who: { ko: "정약용", en: "Jeong Yak-yong", ja: "丁若鏞", zh: "丁若镛" },
    did: { ko: "『목민심서』를 완성했어요", en: "completed Mongmin simseo", ja: "『牧民心書』を完成させました", zh: "完成了《牧民心书》" } },
  { age: 65, year: "1932", field: F.literature,
    who: { ko: "로라 잉걸스 와일더", en: "Laura Ingalls Wilder", ja: "ローラ・インガルス・ワイルダー", zh: "劳拉·英格斯·怀德" },
    did: { ko: "첫 책을 펴냈어요", en: "published her first book", ja: "最初の本を出版しました", zh: "出版了第一本书" } },
];

/** 입력한 나이와 같거나 바로 아래인 기록, 그리고 그다음 기록 */
export function lookup(age: number) {
  const sorted = [...feats].sort((a, b) => a.age - b.age);
  let current: Feat | undefined;
  let next: Feat | undefined;
  for (const f of sorted) {
    if (f.age <= age) current = f;
    else {
      next = f;
      break;
    }
  }
  return { current, next };
}

/** 이름 뒤에 '은/는'을 바르게 붙입니다 */
export function topic(name: string) {
  const last = name.trim().charCodeAt(name.trim().length - 1);
  if (last < 0xac00 || last > 0xd7a3) return `${name}는`;
  return (last - 0xac00) % 28 === 0 ? `${name}는` : `${name}은`;
}

/** 언어별 문장 */
export const sentence = {
  main(f: Feat, lang: Locale) {
    const who = f.who[lang], did = f.did[lang];
    switch (lang) {
      case "ko": return `${f.age}살의 ${topic(who)} ${did}`;
      case "en": return `At ${f.age}, ${who} ${did}.`;
      case "ja": return `${f.age}歳の${who}は、${did}`;
      case "zh": return `${f.age}岁的${who}${did}。`;
    }
  },
  meta(f: Feat, age: number, lang: Locale) {
    const gap = age - f.age, field = f.field[lang];
    switch (lang) {
      case "ko": return `${f.year}년, ${field}${gap ? `. 지금 나이보다 ${gap}살 어릴 때` : ""}`;
      case "en": return `${f.year}, ${field}${gap ? `. ${gap} year${gap > 1 ? "s" : ""} younger than you` : ""}`;
      case "ja": return `${f.year}年、${field}${gap ? `。いまより${gap}歳若いころ` : ""}`;
      case "zh": return `${f.year}年，${field}${gap ? `。比你现在小${gap}岁` : ""}`;
    }
  },
  next(f: Feat, age: number, lang: Locale) {
    const n = f.age - age, who = f.who[lang], did = f.did[lang];
    switch (lang) {
      case "ko": return `그리고 ${n}년 뒤, ${f.age}살의 ${topic(who)} ${did}`;
      case "en": return `And ${n} year${n > 1 ? "s" : ""} later, at ${f.age}, ${who} ${did}.`;
      case "ja": return `そして${n}年後、${f.age}歳の${who}は${did}`;
      case "zh": return `再过${n}年，${f.age}岁的${who}${did}。`;
    }
  },
  tooYoung(age: number, lang: Locale) {
    switch (lang) {
      case "ko": return `${age}살이면, 모차르트도 아직 첫 교향곡을 쓰기 전이었어요.`;
      case "en": return `At ${age}, even Mozart hadn't written his first symphony yet.`;
      case "ja": return `${age}歳なら、モーツァルトもまだ最初の交響曲を書く前でした。`;
      case "zh": return `${age}岁时，连莫扎特都还没写出第一部交响曲。`;
    }
  },
  late: {
    ko: "늦었다고 생각한 나이에도 첫 책은 나와요.",
    en: "Even at an age that feels late, a first book can still come out.",
    ja: "遅いと思った歳でも、最初の本は出せます。",
    zh: "即使在觉得太晚的年纪，第一本书也照样能出版。",
  } as L,
};
