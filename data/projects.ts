// 런치패드에 올라가는 작품 다섯 개. 글은 모두 네 언어(ko·en·ja·zh)로 씁니다.
// 새 작품을 추가하거나 글을 고칠 때는 이 파일만 바꾸면 메인 페이지와 상세 페이지가 함께 바뀝니다.
import type { L } from "@/lib/i18n";

export type ProjectStatus = "live" | "dev";
export type RoadmapState = "done" | "doing" | "next";

export type Shot = {
  /** public/ 아래 경로 */
  src: string;
  alt: L;
  width: number;
  height: number;
  /** 있으면 소리 없는 반복 영상으로 재생하고, src는 첫 장면(포스터)으로 씁니다 */
  video?: string;
};

export type FragmentName = "diamond-linescore" | "diamond-standings" | "diamond-modules";

export type Feature = {
  title: L;
  body: L;
  /** 스크린샷이 있으면 사진, 없으면 fragment 이름으로 HTML 조각을 그립니다 */
  shot?: Shot;
  fragment?: FragmentName;
};

export type Project = {
  id: string;
  name: L;
  /** 짧은 영어 이름 */
  latin: string;
  status: ProjectStatus;
  statusLabel: L;
  kind: L;
  /** 메인 전시 카드용 아주 짧은 설명 */
  tagline: L;
  /** 상세 히어로 한 줄 */
  oneLine: L;
  summary: L;
  url?: string;
  started: L;
  /** 각 작품이 가진 고유 색: 상세 페이지와 들어갈 때 애니메이션의 바탕 */
  color: { field: string; ink: string; accent: string; soft: string };
  device: "phone" | "laptop";
  screen: Shot | { fragment: FragmentName };
  features: Feature[];
  devNote: { tools: string; idea: L; period: L };
  roadmap: { version: string; label: L; state: RoadmapState }[];
};

const phone = (src: string, alt: L): Shot => ({ src, alt, width: 780, height: 1688 });

// 다이아몬드는 아직 만들 가능성이 낮아서 늘 맨 아래에 둡니다 (아래 projects 정렬 참고).
const list: Project[] = [
  // ───────────────────────── 여행 기록장 ─────────────────────────
  {
    id: "travel-log",
    name: { ko: "여행 기록장", en: "Travel Log", ja: "旅の記録帳", zh: "旅行记录本" },
    latin: "Travel Log",
    status: "live",
    statusLabel: { ko: "운영 중", en: "Live", ja: "公開中", zh: "已上线" },
    kind: { ko: "지도 여행 일기", en: "Map travel journal", ja: "地図の旅日記", zh: "地图旅行日记" },
    tagline: {
      ko: "칠할수록 짙어지는 여행 지도",
      en: "A map that deepens as you travel",
      ja: "塗るほど濃くなる旅の地図",
      zh: "越走越浓的旅行地图",
    },
    oneLine: {
      ko: "다녀올수록 지도가 짙어지는 여행 일기",
      en: "A travel journal where the map darkens with every trip",
      ja: "訪れるほど地図が濃くなる旅日記",
      zh: "去得越多，地图颜色越深的旅行日记",
    },
    summary: {
      ko: "긴 글 대신 지도를 칠해요. 시·군·구 251곳과 세계 지도 위에 다녀온 곳을 남기면 횟수만큼 색이 짙어지고, 같은 기록이 연표와 여행 결산으로도 정리돼요. 폰과 PC에서 같은 계정으로 이어서 씁니다.",
      en: "Paint a map instead of writing long entries. Mark places across Korea's 251 cities and counties or anywhere in the world, and each visit deepens the colour. The same records become a timeline and a summary of your travel life, synced between phone and PC.",
      ja: "長い文章の代わりに地図を塗ります。韓国の市・郡・区251か所や世界地図に訪れた場所を残すと、回数に応じて色が濃くなり、同じ記録が年表と旅の決算にもまとまります。スマホとPCで同じアカウントのまま使えます。",
      zh: "不写长篇游记，而是给地图上色。在韩国251个市郡区和世界地图上记下去过的地方，次数越多颜色越深，同一份记录还会整理成时间线和旅行总结。手机和电脑用同一个账号同步。",
    },
    url: "https://travel-log-1ze.pages.dev/",
    started: { ko: "2026년 8월", en: "August 2026", ja: "2026年8月", zh: "2026年8月" },
    color: { field: "#e9ece6", ink: "#1f2a22", accent: "#56755d", soft: "#dde3db" },
    device: "laptop",
    screen: {
      src: "/shots/travel/desktop.webp",
      alt: {
        ko: "여행 기록장 데스크톱 화면. 다녀온 시·군·구가 세이지색으로 칠해진 국내 지도",
        en: "Travel Log on desktop: a map of Korea with visited districts painted sage green",
        ja: "旅の記録帳のデスクトップ画面。訪れた市・郡・区がセージ色に塗られた韓国地図",
        zh: "旅行记录本桌面版：去过的市郡区被涂成鼠尾草绿的韩国地图",
      },
      width: 1600,
      height: 1000,
    },
    features: [
      {
        title: { ko: "다녀올수록 짙어지는 지도", en: "A map that deepens", ja: "訪れるほど濃くなる地図", zh: "越去越浓的地图" },
        body: {
          ko: "기록한 시·군·구가 횟수에 따라 열 단계로 짙어져요. 계획은 빗금, 가고 싶은 곳은 점선으로 표시돼요.",
          en: "Each district darkens in ten steps as you return. Plans show as hatching, wish-list places as a dotted outline.",
          ja: "記録した市・郡・区が回数に応じて10段階で濃くなります。計画は斜線、行きたい場所は点線で表示されます。",
          zh: "记录过的市郡区按次数分十级加深。计划用斜线表示，想去的地方用虚线表示。",
        },
        shot: phone("/shots/travel/map.webp", {
          ko: "국내 지도 화면", en: "The Korea map view", ja: "韓国地図の画面", zh: "韩国地图页面",
        }),
      },
      {
        title: { ko: "누르면 그곳의 기록", en: "Tap a place, see its trips", ja: "押せばその場所の記録", zh: "点一下，看那里的记录" },
        body: {
          ko: "강릉을 누르면 강릉에 다녀온 날들이 아래에서 올라와요. 그 자리에서 새 기록도 더해요.",
          en: "Tap Gangneung and every trip there slides up from the bottom. Add a new one right there.",
          ja: "江陵を押すと、江陵へ行った日々が下から現れます。その場で新しい記録も追加できます。",
          zh: "点一下江陵，去过江陵的日子会从底部滑出，也可以当场添加新记录。",
        },
        shot: phone("/shots/travel/region.webp", {
          ko: "강릉시를 눌렀을 때 열리는 기록 시트", en: "The sheet that opens for Gangneung", ja: "江陵市を押したときに開く記録シート", zh: "点开江陵市时弹出的记录面板",
        }),
      },
      {
        title: { ko: "연표로 다시 보는 여행", en: "Your trips as a timeline", ja: "年表で振り返る旅", zh: "用时间线回看旅行" },
        body: {
          ko: "같은 기록이 해마다 묶인 연표가 돼요. 지역, 동행, 장소로 바로 찾을 수 있어요.",
          en: "The same records become a timeline grouped by year, searchable by place or companion.",
          ja: "同じ記録が年ごとの年表になります。地域・同行者・場所ですぐに探せます。",
          zh: "同一份记录按年份整理成时间线，可按地区、同行者、地点搜索。",
        },
        shot: phone("/shots/travel/timeline.webp", {
          ko: "연도별 연표 화면", en: "The yearly timeline", ja: "年ごとの年表画面", zh: "按年份排列的时间线",
        }),
      },
      {
        title: { ko: "내 여행 인생 결산", en: "Your travel life, summed up", ja: "わたしの旅の決算", zh: "我的旅行人生总结" },
        body: {
          ko: "몇 번 떠났는지, 누구와 많이 갔는지, 돈은 어디에 썼는지 한 화면에서 봐요.",
          en: "How often you left, who you went with most, and where the money went, on one screen.",
          ja: "何回出かけたか、誰とよく行ったか、お金を何に使ったかを一画面で確認できます。",
          zh: "出发了几次、最常和谁同行、钱花在了哪里，一屏看完。",
        },
        shot: phone("/shots/travel/analytics.webp", {
          ko: "여행 결산 화면", en: "The travel summary", ja: "旅の決算画面", zh: "旅行总结页面",
        }),
      },
    ],
    devNote: {
      tools: "Claude Code, Cursor, Supabase, Cloudflare Pages",
      idea: {
        ko: "이야기를 길게 적기보다 지도를 색칠하는 느낌으로",
        en: "Less like writing a diary, more like colouring in a map",
        ja: "長く書くより、地図を塗るような感覚で",
        zh: "与其写长篇日记，不如像给地图上色",
      },
      period: { ko: "2026년 8월부터", en: "since August 2026", ja: "2026年8月から", zh: "自2026年8月起" },
    },
    roadmap: [
      { version: "v1.0", state: "done", label: { ko: "지도 색칠과 연표", en: "Map painting and timeline", ja: "地図の塗り分けと年表", zh: "地图上色与时间线" } },
      { version: "v1.1", state: "done", label: { ko: "로그인, 폰과 PC 동기화, 사진 저장", en: "Sign-in, phone–PC sync, photos", ja: "ログイン、スマホとPCの同期、写真保存", zh: "登录、手机电脑同步、照片保存" } },
      { version: "v2.0", state: "doing", label: { ko: "새 디자인과 여행 결산", en: "New design and travel summary", ja: "新デザインと旅の決算", zh: "全新设计与旅行总结" } },
      { version: "v2.1", state: "next", label: { ko: "누구나 쓰는 앱으로 공개", en: "Open to everyone", ja: "誰でも使えるアプリとして公開", zh: "向所有人开放" } },
    ],
  },

  // ───────────────────────── Langsplit ─────────────────────────
  {
    id: "langsplit",
    name: { ko: "Langsplit", en: "Langsplit", ja: "Langsplit", zh: "Langsplit" },
    latin: "Langsplit",
    status: "live",
    statusLabel: { ko: "테스트 공개 중", en: "Open beta", ja: "テスト公開中", zh: "公开测试中" },
    kind: { ko: "이야기로 배우는 외국어 게임", en: "Story-driven language game", ja: "物語で学ぶ外国語ゲーム", zh: "用故事学外语的游戏" },
    tagline: {
      ko: "넘기며 배우는 외국어 게임",
      en: "Swipe your way into a language",
      ja: "めくって学ぶ外国語ゲーム",
      zh: "滑动之间学外语",
    },
    oneLine: {
      ko: "이야기 속 외국어를 읽고, 넘겨서 결정하기",
      en: "Read the story in another language, swipe to decide",
      ja: "物語の外国語を読んで、めくって決める",
      zh: "读懂故事里的外语，滑动做出选择",
    },
    summary: {
      ko: "이야기마다 다른 세계가 외국어로 말을 걸어와요. 문자와 메모, 편지와 뉴스를 읽고 카드를 좌우로 넘겨 대답하면 이야기가 갈라져요. 새 이야기와 새 언어가 계속 서가에 더해지고, 대사는 시험에 자주 나오는 어휘로 썼어요.",
      en: "Every story is a different world that speaks to you in another language. Read texts, memos, letters and news, then swipe left or right to answer and the story branches. New stories and languages keep joining the shelf, and the lines are written with common exam vocabulary.",
      ja: "物語ごとに違う世界が外国語で話しかけてきます。メッセージやメモ、手紙やニュースを読み、カードを左右にめくって答えると物語が分かれていきます。新しい物語と言語が本棚に増え続け、セリフは試験によく出る語彙で書いています。",
      zh: "每个故事都是一个用外语和你说话的不同世界。读短信、备忘录、信件和新闻，左右滑动卡片作答，故事就会分岔。书架上会不断加入新的故事和语言，台词选用考试常见词汇。",
    },
    url: "https://langsplit.pages.dev",
    started: { ko: "2026년 9월", en: "September 2026", ja: "2026年9月", zh: "2026年9月" },
    color: { field: "#14213d", ink: "#f3ead6", accent: "#d9b56a", soft: "#1d2c4d" },
    device: "phone",
    screen: {
      src: "/shots/langsplit/swipe-poster.webp",
      video: "/shots/langsplit/swipe.mp4",
      alt: {
        ko: "Langsplit을 실제로 플레이하는 영상. 카드를 좌우로 넘기며 결정한다",
        en: "Langsplit being played: swiping cards left and right to decide",
        ja: "Langsplitの実際のプレイ映像。カードを左右にめくって決める",
        zh: "Langsplit实际游玩视频：左右滑动卡片做决定",
      },
      width: 780,
      height: 1688,
    },
    features: [
      {
        title: { ko: "넘기는 순간이 대답", en: "Every swipe is an answer", ja: "めくる瞬間が答え", zh: "滑动即回答" },
        body: {
          ko: "카드를 왼쪽이나 오른쪽으로 넘기면 그게 대답이에요. 제대로 읽어야 게이지를 지킬 수 있어요.",
          en: "Swipe left or right and that is your reply. Read carefully or the gauges fall.",
          ja: "カードを左か右にめくれば、それが答えです。しっかり読まないとゲージを守れません。",
          zh: "向左或向右滑动卡片就是你的回答。读不懂，各项指标就守不住。",
        },
        shot: phone("/shots/langsplit/biscuit.webp", {
          ko: "강아지 Biscuit이 공을 물고 온 카드", en: "A card where Biscuit the dog brings a ball", ja: "犬のBiscuitがボールを持ってきたカード", zh: "小狗Biscuit叼来网球的卡片",
        }),
      },
      {
        title: { ko: "진짜 문서처럼 읽는 대사", en: "Lines that look like the real thing", ja: "本物の文書のように読むセリフ", zh: "像真实文件一样的台词" },
        body: {
          ko: "문자, 업무 메모, 편지, 뉴스 속보. 그 세계에 정말 있을 법한 모양 그대로 읽어요.",
          en: "Text messages, office memos, letters, breaking news, each shaped the way it would be in that world.",
          ja: "メッセージ、業務メモ、手紙、ニュース速報。その世界に本当にありそうな形のまま読みます。",
          zh: "短信、工作备忘、信件、新闻快讯，都按那个世界里真实的样子呈现。",
        },
        shot: phone("/shots/langsplit/kevin.webp", {
          ko: "인턴 Kevin이 보낸 영어 문자 카드", en: "An English text from Kevin the intern", ja: "インターンのKevinから届いた英語のメッセージ", zh: "实习生Kevin发来的英文短信",
        }),
      },
      {
        title: { ko: "계속 늘어나는 이야기 서가", en: "A shelf that keeps growing", ja: "増え続ける物語の本棚", zh: "不断扩充的故事书架" },
        body: {
          ko: "언어와 수준으로 골라 보는 이야기 목록. 새 작품이 나올 때마다 서가에 한 권씩 더해져요.",
          en: "Browse stories by language and level. Each new release adds another volume to the shelf.",
          ja: "言語とレベルで選べる物語の一覧。新作が出るたびに本棚に一冊ずつ加わります。",
          zh: "按语言和难度挑选故事。每推出一部新作，书架上就多一本。",
        },
        shot: phone("/shots/langsplit/home.webp", {
          ko: "언어와 수준으로 고르는 작품 목록", en: "The story shelf, filtered by language and level", ja: "言語とレベルで選ぶ作品一覧", zh: "按语言和难度筛选的作品列表",
        }),
      },
      {
        title: { ko: "시험 어휘로 쓴 대사", en: "Written with exam vocabulary", ja: "試験語彙で書いたセリフ", zh: "用考试词汇写成的台词" },
        body: {
          ko: "토익·토플·JLPT에 자주 나오는 단어로 쓰고, 같은 장면을 입문부터 고급까지 수준별로 다시 썼어요.",
          en: "Lines use words common in TOEIC, TOEFL and JLPT, and every scene is rewritten from beginner to advanced.",
          ja: "TOEIC・TOEFL・JLPTによく出る単語で書き、同じ場面を入門から上級までレベル別に書き直しました。",
          zh: "台词选用托业、托福、JLPT常见词汇，同一场景从入门到高级分级重写。",
        },
        shot: phone("/shots/langsplit/breaking.webp", {
          ko: "뉴스 속보 모양의 카드", en: "A card styled as breaking news", ja: "ニュース速報の形をしたカード", zh: "新闻快讯样式的卡片",
        }),
      },
    ],
    devNote: {
      tools: "Claude Code, Cursor, HTML, JavaScript, Cloudflare Pages",
      idea: {
        ko: "좌우로 넘기며 이야기를 진행하면서 단어와 문장을 익히는 게임",
        en: "A game where you learn words and sentences by swiping through a story",
        ja: "左右にめくって物語を進めながら単語と文を身につけるゲーム",
        zh: "一边左右滑动推进故事，一边掌握单词和句子的游戏",
      },
      period: { ko: "2026년 9월부터", en: "since September 2026", ja: "2026年9月から", zh: "自2026年9月起" },
    },
    roadmap: [
      { version: "v1.0", state: "done", label: { ko: "첫 이야기와 친구 플레이테스트", en: "First story and friend playtests", ja: "最初の物語と友人のテストプレイ", zh: "第一个故事与朋友试玩" } },
      { version: "v1.1", state: "done", label: { ko: "영어·일본어 이야기 추가", en: "More stories in English and Japanese", ja: "英語・日本語の物語を追加", zh: "新增英语、日语故事" } },
      { version: "v1.2", state: "done", label: { ko: "수준별 카드와 새 디자인", en: "Levelled cards and a new design", ja: "レベル別カードと新デザイン", zh: "分级卡片与全新设计" } },
      { version: "v1.3", state: "doing", label: { ko: "새 이야기 계속 추가", en: "New stories, continuously", ja: "新しい物語を追加し続ける", zh: "持续加入新故事" } },
      { version: "v2.0", state: "next", label: { ko: "음성과 플레이스토어 출시", en: "Voice lines and Play Store release", ja: "音声とPlayストア公開", zh: "配音与Play商店上架" } },
    ],
  },

  // ───────────────────────── 운세주막 ─────────────────────────
  {
    id: "unse-jumak",
    name: { ko: "운세주막", en: "Jumak", ja: "運勢酒幕", zh: "运势酒幕" },
    latin: "Jumak",
    status: "live",
    statusLabel: { ko: "운영 중", en: "Live", ja: "公開中", zh: "已上线" },
    kind: { ko: "사주·타로·꿈풀이", en: "Saju, tarot and dreams", ja: "四柱・タロット・夢占い", zh: "四柱、塔罗与解梦" },
    tagline: {
      ko: "등불 켜진 주막의 운세 풀이",
      en: "Fortunes at a lantern-lit inn",
      ja: "灯りのともる酒幕の占い",
      zh: "灯火酒幕里的命理夜谈",
    },
    oneLine: {
      ko: "등불 켜진 주막, 방마다 다른 풀이꾼",
      en: "A lantern-lit Korean inn with a different reader in every room",
      ja: "灯りのともる酒幕、部屋ごとに違う占い師",
      zh: "灯火通明的韩式酒幕，每个房间住着不同的解读人",
    },
    summary: {
      ko: "주막의 방마다 다른 풀이꾼이 기다려요. 명리학 박사는 여덟 글자로 당신의 이야기를, 월하는 두 사람의 인연을, 서역 항해사 하밀은 직접 섞은 타로를, 나그네는 간밤의 꿈을 풀어 줘요. 풀이는 논문과 고전 원문을 근거로 썼어요.",
      en: "Each room of the inn has its own reader. A scholar of saju reads your eight characters, Wolha reads two people's bond, Hamil the western navigator reads the tarot you shuffle yourself, and a wanderer reads last night's dream. Readings are grounded in papers and classical texts.",
      ja: "酒幕の部屋ごとに違う占い師が待っています。命理学の博士は八文字であなたの物語を、月下は二人の縁を、西域の航海士ハミルは自分で混ぜたタロットを、旅人は昨夜の夢を読み解きます。解釈は論文と古典の原文を根拠にしています。",
      zh: "酒幕的每个房间都有一位解读人。命理学博士用八个字讲你的故事，月下解读两人的缘分，西域航海士哈米尔解读你亲手洗的塔罗牌，旅人解读昨夜的梦。解读以论文和古籍原文为依据。",
    },
    url: "https://unsejumak.pages.dev",
    started: { ko: "2026년 10월", en: "October 2026", ja: "2026年10月", zh: "2026年10月" },
    color: { field: "#1c2140", ink: "#f2e9da", accent: "#f2a83b", soft: "#262c52" },
    device: "phone",
    screen: phone("/shots/jumak/home.webp", {
      ko: "운세주막 첫 화면. 밤하늘 아래 등불 켜진 주막과 방 목록",
      en: "Jumak's home: a lantern-lit inn under the night sky and its rooms",
      ja: "運勢酒幕のトップ画面。夜空の下、灯りのともる酒幕と部屋の一覧",
      zh: "运势酒幕首页：夜空下灯火通明的酒幕与房间列表",
    }),
    features: [
      {
        title: { ko: "방마다 다른 풀이꾼", en: "A reader in every room", ja: "部屋ごとに違う占い師", zh: "每个房间一位解读人" },
        body: {
          ko: "사주, 궁합, 책력, 타로, 꿈풀이. 문패를 보고 들어갈 방을 골라요.",
          en: "Saju, compatibility, almanac, tarot, dreams. Pick a room by its name board.",
          ja: "四柱、相性、暦、タロット、夢占い。表札を見て入る部屋を選びます。",
          zh: "四柱、合婚、历书、塔罗、解梦，看门牌选房间。",
        },
        shot: phone("/shots/jumak/home.webp", {
          ko: "주막의 방 목록", en: "The rooms of the inn", ja: "酒幕の部屋一覧", zh: "酒幕的房间列表",
        }),
      },
      {
        title: { ko: "하밀의 별각", en: "Hamil's star room", ja: "ハミルの星の間", zh: "哈米尔的观星阁" },
        body: {
          ko: "폭풍에 배를 잃고 조선에 닿은 서역 항해사가, 직접 섞은 카드로 질문 하나에 긴 풀이 한 편을 들려줘요.",
          en: "A western navigator, shipwrecked onto Joseon's shore, answers one question with one long reading from cards you shuffle.",
          ja: "嵐で船を失い朝鮮に流れ着いた西域の航海士が、自分で混ぜたカードで一つの質問に長い解釈を語ります。",
          zh: "一位在风暴中失去船只、漂流到朝鲜的西域航海士，用你亲手洗的牌，为一个问题讲一段完整的解读。",
        },
        shot: phone("/shots/jumak/tarot.webp", {
          ko: "서역 항해사 하밀의 타로 방", en: "Hamil's tarot room", ja: "西域の航海士ハミルのタロット部屋", zh: "西域航海士哈米尔的塔罗房间",
        }),
      },
      {
        title: { ko: "월하의 달빛 마루", en: "Wolha's moonlit porch", ja: "月下の月明かりの縁側", zh: "月下的月光檐廊" },
        body: {
          ko: "두 사람의 사주를 나란히 놓고 청실홍실로 엮어, 점수 하나가 아니라 결을 보여 줘요.",
          en: "Two charts laid side by side and tied with red and blue thread, showing texture rather than a single score.",
          ja: "二人の四柱を並べて青と赤の糸で結び、点数一つではなく相性の手触りを見せます。",
          zh: "把两人的命盘并排放好，用红蓝丝线相连，展示的是缘分的纹理，而不是一个分数。",
        },
        shot: phone("/shots/jumak/gunghap.webp", {
          ko: "두 사람의 궁합을 보는 달빛 마루", en: "The moonlit porch for compatibility", ja: "二人の相性を見る月明かりの縁側", zh: "看两人合婚的月光檐廊",
        }),
      },
      {
        title: { ko: "나그네의 아침 꿈풀이", en: "The wanderer's morning dream reading", ja: "旅人の朝の夢占い", zh: "旅人的清晨解梦" },
        body: {
          ko: "간밤의 꿈을 적으면 옛 해몽 자료를 근거로 풀어요. 태몽이라면 옛사람들의 태몽 풀이도 함께.",
          en: "Write down last night's dream and it is read with old dream books as the source, including traditional conception dreams.",
          ja: "昨夜の夢を書けば、昔の夢解き資料をもとに読み解きます。胎夢なら昔の人の胎夢解釈も一緒に。",
          zh: "写下昨晚的梦，依据古代解梦资料解读。如果是胎梦，还会附上古人的胎梦解释。",
        },
        shot: phone("/shots/jumak/dream.webp", {
          ko: "나그네의 꿈풀이 방", en: "The wanderer's dream room", ja: "旅人の夢占いの部屋", zh: "旅人的解梦房间",
        }),
      },
    ],
    devNote: {
      tools: "Next.js, Claude Code, Cloudflare Pages, AI",
      idea: {
        ko: "근거 있는 사주 해석, 직접 뽑는 타로, 풀이 스타일을 고르는 이야기꾼",
        en: "Grounded saju readings, tarot you draw yourself, storytellers you choose",
        ja: "根拠ある四柱の解釈、自分で引くタロット、語り口を選べる語り部",
        zh: "有依据的四柱解读、亲手抽的塔罗、可以挑选风格的讲述者",
      },
      period: { ko: "2026년 10월부터", en: "since October 2026", ja: "2026年10月から", zh: "自2026年10月起" },
    },
    roadmap: [
      { version: "v1.0", state: "done", label: { ko: "명리학 박사의 사주풀이 공개", en: "Saju readings by the scholar", ja: "命理学博士の四柱占いを公開", zh: "命理学博士的四柱解读上线" } },
      { version: "v1.1", state: "done", label: { ko: "궁합, 토정비결, 오늘의 한 상, 길일 달력", en: "Compatibility, almanac, daily table, lucky days", ja: "相性、土亭秘訣、今日の膳、吉日カレンダー", zh: "合婚、土亭秘诀、今日一桌、吉日历" } },
      { version: "v1.2", state: "done", label: { ko: "하밀의 타로와 나그네의 꿈풀이", en: "Hamil's tarot and the wanderer's dreams", ja: "ハミルのタロットと旅人の夢占い", zh: "哈米尔的塔罗与旅人的解梦" } },
      { version: "v1.3", state: "doing", label: { ko: "영어판 Jumak", en: "English edition", ja: "英語版 Jumak", zh: "英文版 Jumak" } },
    ],
  },

  // ───────────────────────── 재능은 애매하지 않다 ─────────────────────────
  {
    id: "same-age",
    name: { ko: "재능은 애매하지 않다", en: "Talent Isn't Vague", ja: "才能は曖昧じゃない", zh: "天赋并不模糊" },
    latin: "Talent Isn't Vague",
    status: "live",
    statusLabel: { ko: "운영 중", en: "Live", ja: "公開中", zh: "已上线" },
    kind: { ko: "나이 비교 사이트", en: "Age comparison site", ja: "年齢比較サイト", zh: "年龄对比网站" },
    tagline: {
      ko: "내 나이에 그들은 뭘 했을까",
      en: "What had they done at my age?",
      ja: "わたしの歳で、彼らは何をした？",
      zh: "在我这个年纪，他们做了什么？",
    },
    oneLine: {
      ko: "같은 나이, 누군가는 이미, 누군가는 아직",
      en: "Same age: some already had, some not yet",
      ja: "同じ歳、もう成し遂げた人と、まだだった人",
      zh: "同样的年纪，有人已经做到，有人还没开始",
    },
    summary: {
      ko: "나이와 관심 분야를 고르면, 같은 나이에 다른 사람들이 무엇을 하고 있었는지 보여 줘요. 그 나이에 이미 해낸 사람과, 그때는 아직 무명이었다가 나중에 꽃핀 사람을 나란히 놓아서 기죽기보다 힘이 나는 비교가 되도록 만들었어요. 위인뿐 아니라 스타, 인플루언서, 밈이 된 장면까지 함께 담아요.",
      en: "Pick your age and the fields you care about, and see what other people were doing at exactly that age. It sets those who had already made it beside those who were still unknown and bloomed later, so the comparison lifts you up instead of knocking you down. Alongside historic figures, it includes stars, influencers and moments that went viral.",
      ja: "年齢と関心分野を選ぶと、同じ歳でほかの人たちが何をしていたかを見せます。その歳ですでに成し遂げた人と、当時はまだ無名で後に花開いた人を並べて、落ち込むより力が湧く比較になるようにしました。偉人だけでなく、スター、インフルエンサー、ミームになった場面まで扱います。",
      zh: "选择年龄和感兴趣的领域，就能看到别人在同样的年纪正在做什么。它把那个年纪已经成功的人，和当时还默默无闻、后来才大放异彩的人放在一起，让比较带来的是动力而不是沮丧。除了历史人物，还收录明星、网红和成为热梗的瞬间。",
    },
    url: "https://potential-iota.vercel.app",
    started: { ko: "2026년 10월", en: "October 2026", ja: "2026年10月", zh: "2026年10月" },
    color: { field: "#ffd600", ink: "#111111", accent: "#111111", soft: "#ffe866" },
    device: "phone",
    screen: phone("/shots/same-age/result.webp", {
      ko: "같은 26세, 누군가는 이미, 누군가는 아직. 이미 해낸 사람들의 카드 목록",
      en: "\"Same age 26: some already, some not yet\" with cards of people who had already made it",
      ja: "「同じ26歳、もう誰かは、まだ誰かは」。すでに成し遂げた人のカード一覧",
      zh: "“同样26岁，有人已经，有人还没”，以及已经成功者的卡片列表",
    }),
    features: [
      {
        title: { ko: "나이 하나, 분야 하나", en: "One age, one field", ja: "年齢ひとつ、分野ひとつ", zh: "一个年龄，一个领域" },
        body: {
          ko: "만 나이를 크게 적고 음악, 스포츠, 문학 같은 분야를 고르면 끝이에요. 세부 분야는 쉰 가지가 넘게 나눠 두었어요.",
          en: "Type your age in big numbers and pick a field like music, sport or literature. Over fifty sub-fields let you narrow it down.",
          ja: "満年齢を大きく入れて、音楽、スポーツ、文学などの分野を選ぶだけ。細かい分野は五十以上に分けてあります。",
          zh: "大大地输入周岁年龄，再选音乐、体育、文学等领域就好。细分领域超过五十个。",
        },
        shot: phone("/shots/same-age/home.webp", {
          ko: "노란 칸에 큰 숫자로 나이를 넣는 첫 화면",
          en: "Home screen with a big age number in a yellow box",
          ja: "黄色い枠に大きな数字で年齢を入れるトップ画面",
          zh: "在黄色框里输入大号年龄数字的首页",
        }),
      },
      {
        title: { ko: "이미 해냈다", en: "Already did it", ja: "もう成し遂げた", zh: "已经做到了" },
        body: {
          ko: "그 나이에 이미 대표작을 낸 사람들이 먼저 나와요. 스물여섯의 아인슈타인, 스물셋의 이상처럼요.",
          en: "First come those who had made their mark by that age: Einstein at 26, the poet Yi Sang at 23.",
          ja: "その歳ですでに代表作を出した人が先に出てきます。26歳のアインシュタイン、23歳の詩人イ・サンのように。",
          zh: "先出现的是在那个年纪已有代表作的人，比如26岁的爱因斯坦、23岁的诗人李箱。",
        },
        shot: phone("/shots/same-age/result.webp", {
          ko: "같은 나이에 이미 해낸 사람들", en: "People who had already made it at that age", ja: "同じ歳ですでに成し遂げた人たち", zh: "同龄时已经成功的人",
        }),
      },
      {
        title: { ko: "아직이었다", en: "Not yet", ja: "まだだった", zh: "还没开始" },
        body: {
          ko: "같은 나이에 아직 알려지지 않았던 사람들도 나란히 보여 줘요. 마흔에 데뷔한 박완서처럼, 늦게 꽃핀 이야기가 비교를 응원으로 바꿔요.",
          en: "Side by side are those still unknown at that age, like novelist Park Wan-suh who debuted at 39. Late bloomers turn the comparison into encouragement.",
          ja: "同じ歳でまだ知られていなかった人も並べて見せます。39歳でデビューした作家パク・ワンソのような遅咲きの話が、比較を応援に変えます。",
          zh: "同样也会列出那个年纪还默默无闻的人，比如39岁才出道的作家朴婉绪。大器晚成的故事，把比较变成了鼓励。",
        },
        shot: phone("/shots/same-age/result-late.webp", {
          ko: "그 나이에는 아직이었던 사람들", en: "People who hadn't yet made it at that age", ja: "その歳ではまだだった人たち", zh: "在那个年纪还没成功的人",
        }),
      },
      {
        title: { ko: "한 사람의 나이표", en: "One person's age timeline", ja: "一人の年齢表", zh: "一个人的年龄表" },
        body: {
          ko: "누군가를 누르면 나이별로 무슨 일이 있었는지, 숫자로 본 그 장면, 출처까지 한 화면에 담겨요. 위인뿐 아니라 스타와 밈이 된 순간도 있어요.",
          en: "Tap someone to see what happened at each age, the numbers behind the moment, and sources. Stars and viral moments sit beside historic figures.",
          ja: "誰かを押すと、年齢ごとの出来事、数字で見たその場面、出典まで一画面に。偉人だけでなく、スターやミームになった瞬間もあります。",
          zh: "点开某个人，就能在一个页面看到每个年龄发生的事、用数字呈现的那个瞬间，以及出处。不只有历史人物，还有明星和成为热梗的瞬间。",
        },
        shot: phone("/shots/same-age/person.webp", {
          ko: "존박의 나이표와 숫자 카드", en: "John Park's age timeline and number cards", ja: "ジョン・パクの年齢表と数字カード", zh: "John Park 的年龄表与数字卡片",
        }),
      },
      {
        title: { ko: "카드로 나눠 보기", en: "Share it as a card", ja: "カードで共有", zh: "做成卡片分享" },
        body: {
          ko: "마음에 드는 장면은 인스타그램 세로 비율 카드로 만들어 바로 공유할 수 있어요.",
          en: "Turn any moment you like into a portrait card sized for Instagram and share it straight away.",
          ja: "気に入った場面はインスタグラムの縦長比率のカードにして、すぐ共有できます。",
          zh: "喜欢的瞬间可以生成 Instagram 竖版比例的卡片，马上分享。",
        },
        shot: phone("/shots/same-age/person-kim.webp", {
          ko: "김연아의 열아홉 살과 공유 버튼", en: "Kim Yuna at 19 with the share button", ja: "キム・ヨナの19歳と共有ボタン", zh: "金妍儿的19岁与分享按钮",
        }),
      },
    ],
    devNote: {
      tools: "React, Vite, Claude Code, Wikidata, Vercel",
      idea: {
        ko: "'재능은 애매하지 않다'는 밈에서 시작해, 같은 나이·같은 분야의 사람과 나를 나란히 놓아 보는 사이트",
        en: "Born from the Korean meme \"talent isn't vague\": a site that sets you beside people of the same age in the same field",
        ja: "「才能は曖昧じゃない」というミームから始まった、同じ歳・同じ分野の人と自分を並べてみるサイト",
        zh: "源自韩国网络梗“天赋并不模糊”，把自己和同龄、同领域的人放在一起看的网站",
      },
      period: { ko: "2026년 10월부터", en: "since October 2026", ja: "2026年10月から", zh: "自2026年10月起" },
    },
    roadmap: [
      { version: "v0.1", state: "done", label: { ko: "노랑·검정 두 색 디자인", en: "Two-colour design in yellow and black", ja: "黄色と黒の2色デザイン", zh: "黄黑双色设计" } },
      { version: "v1.0", state: "done", label: { ko: "사이트 공개, 공유 카드", en: "Site launch with share cards", ja: "サイト公開と共有カード", zh: "网站上线与分享卡片" } },
      { version: "v1.1", state: "doing", label: { ko: "위키데이터로 인물 1,000명 넘게 늘리기", en: "Growing to 1,000+ people via Wikidata", ja: "ウィキデータで人物を1,000人以上に", zh: "用维基数据扩充到1000多人" } },
      { version: "v1.2", state: "next", label: { ko: "작품 이미지와 영상 붙이기", en: "Images and videos of their work", ja: "作品の画像と映像を追加", zh: "加入作品图片与视频" } },
      { version: "v2.0", state: "next", label: { ko: "생일을 넣으면 날짜 단위로 비교", en: "Day-by-day comparison from your birthday", ja: "誕生日から日単位で比較", zh: "输入生日，按天对比" } },
    ],
  },

  // ───────────────────────── 다이아몬드 ─────────────────────────
  {
    id: "diamond",
    name: { ko: "다이아몬드", en: "Diamond", ja: "ダイヤモンド", zh: "钻石" },
    latin: "Diamond",
    status: "dev",
    statusLabel: { ko: "만드는 중", en: "In development", ja: "開発中", zh: "开发中" },
    kind: { ko: "프로야구 구단 경영 시뮬레이션", en: "Baseball club management sim", ja: "プロ野球球団経営シミュレーション", zh: "职业棒球球团经营模拟" },
    tagline: {
      ko: "프로야구 구단 경영 게임",
      en: "Run a pro baseball club",
      ja: "プロ野球の球団経営ゲーム",
      zh: "职业棒球球团经营游戏",
    },
    oneLine: {
      ko: "한 타석씩 굴러가는 프로야구 구단 경영",
      en: "Pro baseball management, one plate appearance at a time",
      ja: "一打席ずつ進むプロ野球の球団経営",
      zh: "一个打席一个打席推进的职业棒球经营",
    },
    summary: {
      ko: "열 개 구단, 팀당 144경기. 타석마다 삼진·볼넷, 타구질, 수비를 차례로 계산하는 엔진 위에 드래프트, FA, 훈련과 성장, 병역과 국제대회, 퓨처스리그까지 얹었어요. 지금은 감독과 단장의 화면을 새로 그리는 중이에요.",
      en: "Ten clubs, 144 games each. An engine that resolves every plate appearance step by step, with the draft, free agency, training and growth, military service, international events and the minor league on top. The manager's and GM's screens are being redesigned now.",
      ja: "10球団、各144試合。打席ごとに三振・四球、打球の質、守備を順に計算するエンジンの上に、ドラフト、FA、練習と成長、兵役と国際大会、ファームリーグまで載せました。いまは監督とGMの画面を作り直しています。",
      zh: "十支球队，每队144场。引擎逐个打席依次计算三振与保送、击球质量和守备，在此之上加入了选秀、自由球员、训练与成长、兵役与国际赛事、二军联赛。目前正在重新设计教练与总经理界面。",
    },
    started: { ko: "2026년 8월", en: "August 2026", ja: "2026年8月", zh: "2026年8月" },
    color: { field: "#0f1b33", ink: "#eef1f6", accent: "#f3cd6a", soft: "#172646" },
    device: "laptop",
    screen: { fragment: "diamond-linescore" },
    features: [
      {
        title: { ko: "9회에 뒤집히는 경기", en: "Games that turn in the ninth", ja: "9回にひっくり返る試合", zh: "第九局逆转的比赛" },
        body: {
          ko: "타석마다 확률을 합성해 결과를 굴려요. 아래 점수표는 이 엔진이 실제로 돌린 한 경기예요.",
          en: "Each plate appearance blends probabilities and rolls an outcome. The scoreboard below is a real game from the engine.",
          ja: "打席ごとに確率を合成して結果を決めます。下のスコアボードはこのエンジンが実際に回した一試合です。",
          zh: "每个打席合成概率后掷出结果。下方记分板是这个引擎实际跑出的一场比赛。",
        },
        fragment: "diamond-linescore",
      },
      {
        title: { ko: "144경기 시즌을 몇 초 만에", en: "A 144-game season in seconds", ja: "144試合のシーズンを数秒で", zh: "几秒跑完144场赛季" },
        body: {
          ko: "720경기를 한 번에 돌려 순위표를 만들어요. 같은 전력으로 다시 돌리면 다른 시즌이 나와요.",
          en: "Run all 720 games at once and get the standings. Run it again with the same rosters for a different season.",
          ja: "720試合を一度に回して順位表を作ります。同じ戦力でもう一度回すと別のシーズンになります。",
          zh: "一次跑完720场比赛生成排名表。用相同阵容再跑一次，就是另一个赛季。",
        },
        fragment: "diamond-standings",
      },
      {
        title: { ko: "구단 운영의 모든 것", en: "Everything a club runs on", ja: "球団運営のすべて", zh: "球团运营的一切" },
        body: {
          ko: "드래프트, FA 협상, 나이에 따른 성장과 노쇠, 상무와 병역특례까지 구단의 1년을 담았어요.",
          en: "The draft, free-agent talks, ageing curves, military service and exemptions: a club's whole year.",
          ja: "ドラフト、FA交渉、年齢による成長と衰え、尚武と兵役特例まで、球団の1年を詰め込みました。",
          zh: "选秀、自由球员谈判、随年龄的成长与衰退、尚武队和兵役特例，囊括球团的一整年。",
        },
        fragment: "diamond-modules",
      },
    ],
    devNote: {
      tools: "Python, SQLite, pywebview, Claude Code",
      idea: {
        ko: "프로야구 기록으로 굴러가는 감독·단장 매니지먼트 게임",
        en: "A manager-and-GM game driven by real baseball statistics",
        ja: "プロ野球の記録で動く監督・GMマネジメントゲーム",
        zh: "由职业棒球数据驱动的教练兼总经理经营游戏",
      },
      period: { ko: "2026년 8월 말부터", en: "since late August 2026", ja: "2026年8月末から", zh: "自2026年8月底起" },
    },
    roadmap: [
      { version: "v0.1", state: "done", label: { ko: "타석·경기·시즌 엔진", en: "Plate, game and season engine", ja: "打席・試合・シーズンのエンジン", zh: "打席、比赛、赛季引擎" } },
      { version: "v0.2", state: "done", label: { ko: "드래프트, FA, 성장, 병역, 퓨처스리그", en: "Draft, FA, growth, service, minors", ja: "ドラフト、FA、成長、兵役、ファーム", zh: "选秀、自由球员、成长、兵役、二军" } },
      { version: "v0.3", state: "doing", label: { ko: "새 화면 설계와 다시 짓기", en: "New screens and a rebuild", ja: "新しい画面設計と作り直し", zh: "新界面设计与重建" } },
      { version: "v1.0", state: "next", label: { ko: "첫 시즌을 끝까지 플레이", en: "Play a full first season", ja: "最初のシーズンを最後までプレイ", zh: "完整玩完第一个赛季" } },
    ],
  },
];

/** 화면에 보여 줄 순서. 다이아몬드는 항상 마지막 */
export const projects: Project[] = [
  ...list.filter((p) => p.id !== "diamond"),
  ...list.filter((p) => p.id === "diamond"),
];

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export function neighbours(id: string) {
  const i = projects.findIndex((p) => p.id === id);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
