// 다이아몬드 엔진(diamond.sim / diamond.season)이 실제로 돌린 결과를 옮겨 둔 것.
// 경기: build_league(0)의 수원 랩터스(원정) vs 부산 시걸스(홈), Random(77)
// 시즌: simulate_season(seed=2026), 팀당 144경기

export const lineScore = {
  innings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  away: { team: "수원 랩터스", runs: [1, 0, 0, 0, 0, 0, 0, 0, 4], r: 5, h: 11, e: 1 },
  home: { team: "부산 시걸스", runs: [0, 0, 0, 0, 0, 1, 2, 0, 1], r: 4, h: 11, e: 0 },
  log: [
    "1회 초 · 장재현 2루타",
    "1회 초 · 류예준 1루타, 1점",
    "7회 말 · 부산 2점, 3 대 1 역전",
    "9회 초 · 수원 4점, 5 대 3 재역전",
  ],
};

export const standings = [
  { rank: 1, team: "세종 코메츠", w: 91, l: 48, t: 5, gb: "-" },
  { rank: 2, team: "대전 팔콘스", w: 87, l: 53, t: 4, gb: "4.5" },
  { rank: 3, team: "수원 랩터스", w: 79, l: 58, t: 7, gb: "11.0" },
  { rank: 4, team: "청주 미티어스", w: 73, l: 65, t: 6, gb: "17.5" },
  { rank: 5, team: "전주 그리즐리스", w: 72, l: 67, t: 5, gb: "19.0" },
  { rank: 6, team: "부산 시걸스", w: 71, l: 68, t: 5, gb: "20.0" },
  { rank: 7, team: "인천 웨이브스", w: 63, l: 73, t: 8, gb: "26.5" },
  { rank: 8, team: "광주 레오파즈", w: 60, l: 80, t: 4, gb: "31.5" },
  { rank: 9, team: "창원 타이탄스", w: 54, l: 89, t: 1, gb: "39.0" },
  { rank: 10, team: "대구 퓨마스", w: 44, l: 93, t: 7, gb: "46.0" },
];

export const modules = [
  { name: "드래프트", body: "11라운드 × 10구단, 아마추어 유망주 풀" },
  { name: "FA와 재정", body: "시장가치, 연봉 협상, 모기업 지원" },
  { name: "훈련과 성장", body: "나이에 따른 성장 곡선과 노쇠" },
  { name: "병역", body: "상무, 현역, 국제대회 금메달 특례" },
  { name: "퓨처스리그", body: "12구단 북부·남부, 콜업과 옵션" },
];
