// 런치패드에 올라가는 작품 다섯 개.
// 새 작품을 추가하거나 글을 고칠 때는 이 파일만 바꾸면 메인 페이지와 상세 페이지가 함께 바뀝니다.

export type ProjectStatus = "live" | "dev";
export type RoadmapState = "done" | "doing" | "next";

export type Shot = {
  /** public/ 아래 경로 */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** 있으면 소리 없는 반복 영상으로 재생하고, src는 첫 장면(포스터)으로 씁니다 */
  video?: string;
};

export type Feature = {
  title: string;
  body: string;
  /** 스크린샷이 있으면 사진, 없으면 fragment 이름으로 HTML 조각을 그립니다 */
  shot?: Shot;
  fragment?: "diamond-linescore" | "diamond-standings" | "diamond-modules" | "same-age";
};

export type Project = {
  id: string;
  name: string;
  /** 짧은 영어 이름 (프리로더·작은 표기용) */
  latin: string;
  status: ProjectStatus;
  /** 상태를 말로 */
  statusLabel: string;
  kind: string;
  /** 메인 전시 카드용 아주 짧은 설명 (15자 이내) */
  tagline: string;
  /** 한 줄 소개 — 상세 히어로에 씀 */
  oneLine: string;
  /** 두세 문장 설명 */
  summary: string;
  url?: string;
  started: string;
  /** 각 작품이 가진 고유 색: 이 색이 그 작품 화면의 바탕이 됩니다 */
  color: { field: string; ink: string; accent: string; soft: string };
  /** 기기 목업 종류와 그 안에 넣을 화면 */
  device: "phone" | "laptop";
  screen: Shot | { fragment: Feature["fragment"] };
  /** 메인 페이지 챕터에서 크게 보여 줄 한 가지 (숫자 또는 실제 화면 속 한 줄) */
  highlight: { kind: "figure" | "quote"; text: string; caption: string; lang?: string };
  /** 메인 페이지 챕터에 들어가는 세 줄 사실 */
  facts: { label: string; value: string }[];
  features: Feature[];
  devNote: { tools: string; idea: string; period: string };
  roadmap: { version: string; label: string; state: RoadmapState }[];
};

const phone = (src: string, alt: string): Shot => ({ src, alt, width: 780, height: 1688 });
const jumakPhone = (src: string, alt: string): Shot => ({ src, alt, width: 750, height: 1624 });

export const projects: Project[] = [
  {
    id: "travel-log",
    name: "여행 기록장",
    latin: "Travel Log",
    status: "live",
    statusLabel: "운영 중",
    kind: "지도 여행 일기",
    tagline: "칠할수록 짙어지는 여행 지도",
    oneLine: "다녀올수록 지도가 짙어지는 여행 일기",
    summary:
      "긴 글 대신 지도를 색칠해요. 시·군·구 251곳과 세계 지도 위에 다녀온 곳을 남기면 횟수만큼 색이 짙어지고, 같은 기록이 연표와 통계로도 정리돼요. 폰과 PC에서 같은 계정으로 이어서 씁니다.",
    url: "https://woong2-rice.github.io/Travel-log/",
    started: "2026년 8월",
    color: { field: "#dbe7e3", ink: "#17362f", accent: "#3d7268", soft: "#c9dad5" },
    device: "laptop",
    screen: {
      src: "/shots/travel/desktop.webp",
      alt: "여행 기록장 데스크톱 화면. 다녀온 시·군·구가 횟수만큼 짙은 초록으로 칠해진 국내 지도",
      width: 1600,
      height: 1000,
    },
    highlight: { kind: "figure", text: "251", caption: "곳의 시·군·구 경계가 지도에 들어 있어요. 세계 지도는 나라와 주 단위로." },
    facts: [
      { label: "만든 것", value: "시·군·구 경계 지도, 연표, 여행 통계" },
      { label: "쓴 도구", value: "Claude Code, Supabase, GitHub Pages" },
      { label: "시작", value: "2026년 8월, 첫 바이브 코딩 작품" },
    ],
    features: [
      {
        title: "다녀올수록 짙어지는 지도",
        body: "기록을 남긴 시·군·구가 횟수에 따라 열 단계로 짙어져요. 계획은 빗금, 가고 싶은 곳은 점선으로 표시돼요.",
        shot: phone("/shots/travel/map.webp", "국내 지도에 강릉, 제주, 경주 등이 칠해진 화면"),
      },
      {
        title: "지역을 누르면 그곳의 기록",
        body: "강릉을 누르면 강릉에 다녀온 날짜, 동행, 장소, 비용이 차례로 펼쳐져요. 그 자리에서 새 기록도 더해요.",
        shot: phone("/shots/travel/region.webp", "강릉시를 눌렀을 때 세 번의 여행 기록이 열린 화면"),
      },
      {
        title: "연표로 다시 보는 여행",
        body: "같은 기록이 날짜순 연표가 돼요. 동행자 이름이나 지역으로 바로 찾을 수 있어요.",
        shot: phone("/shots/travel/timeline.webp", "날짜순으로 늘어선 여행 연표 화면"),
      },
      {
        title: "누구와, 어디로, 얼마나",
        body: "연도별 여행 횟수, 함께 간 사람, 나라별 방문, 항목별 비용을 한 화면에서 봐요. CSV로 내보낼 수도 있어요.",
        shot: phone("/shots/travel/stats.webp", "연도별 여행 횟수와 동행 통계 화면"),
      },
    ],
    devNote: {
      tools: "Claude Code (Cursor 터미널), Supabase, GitHub Pages, PWA",
      idea: "이야기를 길게 적기보다 지도를 색칠하는 느낌으로",
      period: "2026년 8월부터",
    },
    roadmap: [
      { version: "v1.0", label: "시·군·구 지도 색칠과 연표", state: "done" },
      { version: "v1.1", label: "이메일 로그인, 폰과 PC 동기화, 오프라인 지도", state: "done" },
      { version: "v1.2", label: "사진 저장소 분리, 기록 하나당 한 줄 구조", state: "done" },
      { version: "v2.0", label: "여러 사람이 쓰는 앱으로 공개", state: "next" },
    ],
  },
  {
    id: "langsplit",
    name: "Langsplit",
    latin: "Langsplit",
    status: "live",
    statusLabel: "친구들과 테스트 중",
    kind: "스와이프 언어 학습 게임",
    tagline: "넘기며 배우는 영어 게임",
    oneLine: "영어로 말을 거는 백악관에서 4년 버티기",
    summary:
      "참모의 메모, 인턴의 문자, 기자의 질문이 영어로 날아오고, 좌우로 넘겨 대답해요. 제대로 읽어야 지지율·의회·경제·안보를 지킬 수 있어요. 시험에 자주 나오는 어휘로 카드를 썼어요.",
    url: "https://langsplit.pages.dev",
    started: "2026년 9월",
    color: { field: "#15221d", ink: "#efe8d6", accent: "#c8a45c", soft: "#22352d" },
    device: "phone",
    screen: {
      src: "/shots/langsplit/swipe-poster.webp",
      video: "/shots/langsplit/swipe.mp4",
      alt: "Langsplit을 실제로 플레이하는 영상. 카드를 좌우로 넘기며 대통령의 결정을 내린다",
      width: 390,
      height: 844,
    },
    highlight: { kind: "quote", lang: "en", text: "Biscuit drops a tennis ball at your feet and wags his tail.", caption: "대통령편의 첫 카드. 왼쪽은 Not now, buddy. 오른쪽은 Okay, one throw!" },
    facts: [
      { label: "만든 것", value: "이야기 네 편, 카드마다 하·중·상 세 버전" },
      { label: "쓴 도구", value: "Claude Code, 순수 HTML·JS, Cloudflare Pages" },
      { label: "원칙", value: "무료, 광고 없음, 기록은 기기 안에만" },
    ],
    features: [
      {
        title: "넘기는 순간이 곧 결정",
        body: "카드를 왼쪽이나 오른쪽으로 넘기면 대통령의 결정이 돼요. 대통령의 개 Biscuit의 공놀이부터 국가 예산까지.",
        shot: phone("/shots/langsplit/biscuit.webp", "Biscuit이 테니스공을 물고 온 카드"),
      },
      {
        title: "문자, 메모, 브리핑",
        body: "인턴은 문자로, 비서실장은 업무 메모로, 대변인은 브리핑 자료로 말을 걸어요. 실제 영어 문서의 모양 그대로.",
        shot: phone("/shots/langsplit/kevin.webp", "인턴 Kevin이 보낸 영어 문자 카드"),
      },
      {
        title: "이야기 네 편, 언어 두 개",
        body: "대통령편, 학생회장편, 벙커편은 영어로, 도쿄 종합상사 신입사원편은 일본어로. 취향대로 골라 돌아가며 배워요.",
        shot: phone("/shots/langsplit/home.webp", "작품 목록 화면: 대통령편과 학생회장편"),
      },
      {
        title: "같은 장면, 세 가지 난이도",
        body: "모든 카드를 하·중·상 세 버전으로 다시 썼어요. 실력이 늘면 같은 이야기를 더 어려운 영어로 다시 해요.",
        shot: phone("/shots/langsplit/detail.webp", "대통령편 소개와 하·중·상 난이도 선택 화면"),
      },
    ],
    devNote: {
      tools: "Claude Code (Cursor 터미널), HTML, JavaScript, Cloudflare Pages",
      idea: "레인즈처럼 좌우로 넘기며 이야기를 진행하면서 단어와 문장을 익히는 게임",
      period: "2026년 9월부터",
    },
    roadmap: [
      { version: "v1.0", label: "대통령편, 친구 플레이테스트", state: "done" },
      { version: "v1.1", label: "학생회장편, 벙커편, 신입사원편 추가", state: "done" },
      { version: "v1.2", label: "모든 카드 하·중·상 난이도", state: "done" },
      { version: "v2.0", label: "음성 녹음과 플레이스토어 출시", state: "next" },
    ],
  },
  {
    id: "unse-jumak",
    name: "운세주막",
    latin: "Jumak",
    status: "live",
    statusLabel: "운영 중",
    kind: "사주·타로 풀이",
    tagline: "등불 켜진 주막의 사주풀이",
    oneLine: "등불 켜진 주막에서 듣는 사주 이야기",
    summary:
      "주막의 방마다 다른 풀이꾼이 앉아 있어요. 명리학 박사는 여덟 글자로 당신의 이야기를, 월하는 두 사람의 궁합을, 나그네는 직접 섞은 타로 카드를 읽어 줘요. 풀이는 논문과 고전 원문을 근거로 썼어요.",
    url: "https://unsejumak.pages.dev",
    started: "2026년 10월",
    color: { field: "#2a2340", ink: "#f2e9da", accent: "#f2a83b", soft: "#382f52" },
    device: "phone",
    screen: jumakPhone("/shots/jumak/home.webp", "운세주막 첫 화면. 밤하늘 아래 등불 켜진 주막"),
    highlight: { kind: "figure", text: "博 緣 曆 月 夢", caption: "주막의 다섯 방. 사주, 궁합, 책력, 타로, 꿈풀이." },
    facts: [
      { label: "만든 것", value: "사주, 궁합, 토정비결, 타로, 꿈풀이" },
      { label: "쓴 도구", value: "Next.js, Claude Code, Cloudflare Pages" },
      { label: "근거", value: "논문 20편과 『자평진전』 등 고전 원문" },
    ],
    features: [
      {
        title: "여덟 글자, 네 기둥",
        body: "태어난 해·달·날·시를 뿌리, 줄기, 꽃, 열매의 네 기둥으로 펼치고 한 글자씩 짚어 가며 풀어요.",
        shot: jumakPhone("/shots/jumak/wonguk.webp", "네 기둥 원국표 화면"),
      },
      {
        title: "월하의 달빛 마루",
        body: "두 사람의 사주를 나란히 놓고, 점수 하나로 줄이지 않고 보는 방법마다 다른 결을 보여 줘요.",
        shot: jumakPhone("/shots/jumak/gunghap.webp", "두 사람의 궁합 결과 화면"),
      },
      {
        title: "손으로 섞는 타로",
        body: "화면을 문질러 카드를 직접 섞어요. 뽑은 카드는 질문 하나에 긴 서술형 풀이 한 편으로 답해요.",
        shot: jumakPhone("/shots/jumak/tarot.webp", "카드를 문질러 섞는 타로 화면"),
      },
      {
        title: "꿈풀이와 태몽",
        body: "간밤의 꿈을 적으면 옛 해몽 자료를 근거로 풀어요. 태몽이라면 옛사람들의 태몽 풀이도 함께.",
        shot: jumakPhone("/shots/jumak/dream.webp", "누런 구렁이 꿈풀이 결과 화면"),
      },
    ],
    devNote: {
      tools: "Next.js, Claude Code, Cloudflare Pages, AI 풀이(타로·꿈)",
      idea: "근거 있는 사주 해석, 직접 뽑는 타로, 풀이 스타일을 고르는 이야기꾼",
      period: "2026년 10월부터",
    },
    roadmap: [
      { version: "v1.0", label: "명리학 박사의 사주풀이 웹 공개", state: "done" },
      { version: "v1.1", label: "궁합, 토정비결, 오늘의 한 상, 길일 달력", state: "done" },
      { version: "v1.2", label: "타로와 꿈풀이에 AI 풀이", state: "done" },
      { version: "v1.3", label: "주막 디자인 개편", state: "doing" },
      { version: "v2.0", label: "해외판 Jumak", state: "next" },
    ],
  },
  {
    id: "diamond",
    name: "다이아몬드",
    latin: "Diamond",
    status: "dev",
    statusLabel: "만드는 중",
    kind: "프로야구 구단 경영 시뮬레이션",
    tagline: "프로야구 구단 경영 게임",
    oneLine: "한 타석씩 굴러가는 프로야구 구단 경영",
    summary:
      "열 개 구단, 팀당 144경기. 타석마다 삼진·볼넷, 타구질, 수비를 차례로 계산하는 엔진 위에 드래프트, FA, 훈련과 성장, 병역과 국제대회, 퓨처스리그까지 얹었어요. 지금은 엔진을 다 만들고 화면을 붙이는 중이에요.",
    started: "2026년 8월",
    color: { field: "#8a3a22", ink: "#fbefe3", accent: "#f3cd6a", soft: "#9c4a30" },
    device: "laptop",
    screen: { fragment: "diamond-linescore" },
    highlight: { kind: "figure", text: "5 : 4", caption: "엔진이 돌린 개막전. 수원이 9회 초 4점을 내 뒤집었어요." },
    facts: [
      { label: "만든 것", value: "경기·시즌·드래프트·FA·병역 엔진" },
      { label: "쓴 도구", value: "Python, SQLite, pywebview, Claude Code" },
      { label: "지금", value: "엔진 완성, 화면 붙이는 중" },
    ],
    features: [
      {
        title: "9회에 뒤집히는 경기",
        body: "타석마다 확률을 합성해 결과를 굴려요. 아래 점수표는 이 엔진이 실제로 돌린 한 경기예요.",
        fragment: "diamond-linescore",
      },
      {
        title: "144경기 시즌을 몇 초 만에",
        body: "720경기를 한 번에 돌려 순위표를 만들어요. 같은 전력으로 시즌을 다시 돌리면 다른 이야기가 나와요.",
        fragment: "diamond-standings",
      },
      {
        title: "구단 운영의 모든 것",
        body: "아마추어 드래프트, FA 협상, 나이에 따른 성장과 노쇠, 상무와 병역특례까지 구단의 1년을 다 담았어요.",
        fragment: "diamond-modules",
      },
    ],
    devNote: {
      tools: "Python, SQLite, pywebview, Claude Code",
      idea: "프로야구 기록으로 굴러가는 텍스트 구단 경영 게임",
      period: "2026년 8월 말부터",
    },
    roadmap: [
      { version: "v0.1", label: "타석·경기·시즌 시뮬레이션 엔진", state: "done" },
      { version: "v0.2", label: "드래프트, FA, 성장, 병역, 퓨처스리그", state: "done" },
      { version: "v0.3", label: "데스크톱 화면과 라인업 편성", state: "doing" },
      { version: "v1.0", label: "첫 시즌을 끝까지 플레이", state: "next" },
    ],
  },
  {
    id: "same-age",
    name: "재능은 애매하지 않다",
    latin: "Same Age",
    status: "dev",
    statusLabel: "아이디어, 미리보기 공개",
    kind: "나이 비교 사이트",
    tagline: "내 나이에 그는 뭘 했을까",
    oneLine: "내 나이에 그 사람은 무엇을 했을까",
    summary:
      "나이를 넣으면 같은 나이의 위인이 해낸 일을 보여 줘요. '재능은 애매하지 않다'는 밈에서 시작했지만, 예순다섯에 첫 책을 낸 작가도 함께 보여 줘서 마냥 기죽지는 않게 만들 생각이에요.",
    started: "2026년 10월",
    color: { field: "#e9c547", ink: "#1f1a0c", accent: "#1f1a0c", soft: "#f3dc7e" },
    device: "phone",
    screen: { fragment: "same-age" },
    highlight: { kind: "figure", text: "65", caption: "로라 잉걸스 와일더가 첫 책을 펴낸 나이." },
    facts: [
      { label: "만든 것", value: "이 페이지 안의 미리보기" },
      { label: "다음", value: "분야를 고르고 위인 데이터 늘리기" },
      { label: "출발", value: "'재능은 애매하지 않다' 밈" },
    ],
    features: [
      {
        title: "나이 하나만 넣으면",
        body: "숫자를 바꾸는 순간 같은 나이, 혹은 바로 아래 나이에 누군가 해낸 일이 나와요.",
        fragment: "same-age",
      },
    ],
    devNote: {
      tools: "Next.js, Claude Code",
      idea: "분야와 나이를 넣으면 세계적 위인의 같은 나이 업적을 보여 주는 사이트",
      period: "2026년 10월부터",
    },
    roadmap: [
      { version: "v0.1", label: "아이디어 정리", state: "done" },
      { version: "v0.2", label: "런치패드 속 미리보기", state: "done" },
      { version: "v0.3", label: "분야별 위인 데이터와 출처 정리", state: "next" },
    ],
  },
];

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export function neighbours(id: string) {
  const i = projects.findIndex((p) => p.id === id);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
