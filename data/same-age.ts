// '재능은 애매하지 않다' 미리보기에 쓰는 위인 기록.
// 나이는 그 일이 일어난 해의 만 나이입니다. 정식 서비스 전에는 항목마다 출처를 붙일 예정이에요.

export type Feat = { age: number; who: string; did: string; year: string; field: string };

export const feats: Feat[] = [
  { age: 8, who: "모차르트", did: "첫 교향곡을 썼어요", year: "1764", field: "음악" },
  { age: 15, who: "루이 브라유", did: "점자를 고안했어요", year: "1824", field: "발명" },
  { age: 17, who: "잔 다르크", did: "오를레앙 포위를 풀어냈어요", year: "1429", field: "역사" },
  { age: 19, who: "블레즈 파스칼", did: "계산기를 설계하기 시작했어요", year: "1642", field: "과학" },
  { age: 20, who: "메리 셸리", did: "『프랑켄슈타인』을 펴냈어요", year: "1818", field: "문학" },
  { age: 21, who: "세종", did: "조선의 네 번째 임금이 되었어요", year: "1418", field: "역사" },
  { age: 23, who: "아이작 뉴턴", did: "미적분을 고안했어요", year: "1666", field: "과학" },
  { age: 26, who: "아인슈타인", did: "특수 상대성 이론을 발표했어요", year: "1905", field: "과학" },
  { age: 27, who: "빈센트 반 고흐", did: "화가의 길로 들어섰어요", year: "1880", field: "미술" },
  { age: 45, who: "J. R. R. 톨킨", did: "『호빗』을 펴냈어요", year: "1937", field: "문학" },
  { age: 56, who: "정약용", did: "『목민심서』를 완성했어요", year: "1818", field: "역사" },
  { age: 65, who: "로라 잉걸스 와일더", did: "첫 책을 펴냈어요", year: "1932", field: "문학" },
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
