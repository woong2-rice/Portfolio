// 사이트 전체 설정과 화면 글. 이름, 연락처, 소개 글은 여기서 바꿉니다.
import type { L } from "@/lib/i18n";

export const site = {
  wordmark: "Woong's Launchpad",
  shortName: "Woong",
  /** 실제 공개 주소 (각 앱의 피드백 창이 이 사이트를 가리킬 때도 씀) */
  url: "https://woong2.vercel.app",
  title: "Woong's Launchpad",
  description: {
    ko: "AI와 함께 아이디어를 빠르게 실현하는 메이커, 웅의 웹 앱 모음",
    en: "Web apps by Woong, a maker who turns ideas into products with AI",
    ja: "AIとともにアイデアを素早く形にするメイカー、ウンのウェブアプリ集",
    zh: "与AI一起快速实现创意的创作者 Woong 的网页应用合集",
  } as L,
  headline: "I build web experiences with AI.",
  tools: ["Claude Code", "Cursor", "Next.js", "Supabase", "Cloudflare Pages", "Python"],
  contact: {
    email: "woong2biz@gmail.com",
    github: "https://github.com/woong2-rice",
    githubLabel: "github.com/woong2-rice",
  },
  maker: {
    name: { ko: "웅", en: "Woong", ja: "ウン", zh: "Woong" } as L,
    role: {
      ko: "관광경영·문화유산관리 전공, 바이브 코더",
      en: "Tourism and cultural heritage student, vibe coder",
      ja: "観光経営・文化遺産管理専攻、バイブコーダー",
      zh: "旅游管理与文化遗产管理专业，氛围编程者",
    } as L,
  },
  makerNote: [
    {
      ko: "2026년 8월, 코딩을 한 줄도 모르는 상태에서 Claude를 결제하고 바이브 코딩을 시작했어요. 첫 작품은 다녀온 곳을 지도에 칠하는 여행 기록장이었어요.",
      en: "In August 2026, without knowing a single line of code, I subscribed to Claude and started vibe coding. My first project was a travel journal that paints the places I've been on a map.",
      ja: "2026年8月、コードを一行も知らないままClaudeに課金して、バイブコーディングを始めました。最初の作品は、訪れた場所を地図に塗る旅の記録帳でした。",
      zh: "2026年8月，在一行代码都不会的情况下，我订阅了Claude，开始了氛围编程。第一个作品是把去过的地方涂在地图上的旅行记录本。",
    },
    {
      ko: "저는 관광경영과 문화유산관리를 공부해요. 그래서인지 만드는 것마다 기록과 이야기가 들어가요. 백악관의 하루, 주막의 밤, 야구단의 한 시즌처럼요.",
      en: "I study tourism management and cultural heritage, which may be why everything I make carries records and stories: a day in the White House, a night at an inn, a season with a ball club.",
      ja: "観光経営と文化遺産管理を学んでいるからか、作るものにはいつも記録と物語が入ります。ホワイトハウスの一日、酒幕の夜、球団の1シーズンのように。",
      zh: "我学的是旅游管理和文化遗产管理，也许正因如此，我做的东西里总有记录和故事：白宫的一天、酒幕的一夜、球队的一个赛季。",
    },
    {
      ko: "아이디어가 떠오르면 그날 Claude에게 말로 설명하고, 돌아가는 화면을 친구들에게 보여 주고, 들은 대로 고쳐요. 이 페이지도 그렇게 만들었어요.",
      en: "When an idea comes, I explain it to Claude that same day, show the working screen to friends, and fix what they tell me. This page was made the same way.",
      ja: "アイデアが浮かんだらその日のうちにClaudeに言葉で説明し、動く画面を友達に見せて、言われた通りに直します。このページもそうやって作りました。",
      zh: "有了想法，我当天就用语言讲给Claude听，把能运行的界面给朋友看，再按他们的意见修改。这个页面也是这样做出来的。",
    },
  ] as L[],
};

/** 화면 곳곳의 짧은 글 */
export const ui = {
  nav: {
    projects: { ko: "Projects", en: "Projects", ja: "Projects", zh: "Projects" },
    about: { ko: "About", en: "About", ja: "About", zh: "About" },
    contact: { ko: "Contact", en: "Contact", ja: "Contact", zh: "Contact" },
    feedback: { ko: "Feedback", en: "Feedback", ja: "Feedback", zh: "Feedback" },
    language: { ko: "언어", en: "Language", ja: "言語", zh: "语言" },
    skip: { ko: "본문으로 건너뛰기", en: "Skip to content", ja: "本文へスキップ", zh: "跳到正文" },
    toTop: { ko: "맨 위로", en: "Back to top", ja: "トップへ戻る", zh: "回到顶部" },
    themeDark: { ko: "어두운 화면으로 바꾸기", en: "Switch to dark mode", ja: "ダークモードに切り替え", zh: "切换到深色模式" },
    themeLight: { ko: "밝은 화면으로 바꾸기", en: "Switch to light mode", ja: "ライトモードに切り替え", zh: "切换到浅色模式" },
    down: { ko: "작품 보러 내려가기", en: "Scroll to projects", ja: "作品へスクロール", zh: "向下查看作品" },
  },
  showcase: {
    visit: { ko: "Visit Live", en: "Visit Live", ja: "Visit Live", zh: "Visit Live" },
    story: { ko: "Story", en: "Story", ja: "Story", zh: "Story" },
    newTab: { ko: "새 창에서 열기", en: "opens in a new tab", ja: "新しいタブで開く", zh: "在新标签页打开" },
    notYet: { ko: "아직 공개 전이에요", en: "not public yet", ja: "まだ公開前です", zh: "尚未公开" },
  },
  about: {
    title: { ko: "Maker's note", en: "Maker's note", ja: "Maker's note", zh: "Maker's note" },
    tools: { ko: "손에 익은 도구", en: "Tools I use", ja: "使い慣れた道具", zh: "常用工具" },
  },
  contact: {
    line1: { ko: "만들고 싶은 게 떠올랐다면,", en: "If something you'd like built comes to mind,", ja: "作りたいものが浮かんだら、", zh: "如果你想到了想做的东西，" },
    line2: { ko: "같이 이야기해요.", en: "let's talk.", ja: "一緒に話しましょう。", zh: "一起聊聊吧。" },
    placeholder: { ko: "한 줄로 적어 주세요", en: "Write a line", ja: "一行で書いてください", zh: "写一句话" },
    send: { ko: "메일로 보내기", en: "Send by email", ja: "メールで送る", zh: "用邮件发送" },
    hint: {
      ko: "보내기를 누르면 메일 앱이 이 문장을 담아 열려요.",
      en: "Your mail app opens with this line filled in.",
      ja: "送るを押すと、この文章が入った状態でメールアプリが開きます。",
      zh: "点击发送后，邮件应用会带着这句话打开。",
    },
    subject: { ko: "런치패드에서 보내는 메시지", en: "Message from the Launchpad", ja: "ランチパッドからのメッセージ", zh: "来自作品集的留言" },
  },
  footer: {
    what: { ko: "바이브 코딩으로 만든 작품들", en: "Things made by vibe coding", ja: "バイブコーディングで作った作品", zh: "用氛围编程做出的作品" },
  },
  detail: {
    visit: { ko: "라이브 사이트 방문하기", en: "Visit the live site", ja: "公開サイトへ", zh: "访问上线网站" },
    soon: { ko: "공개되면 여기서 바로 열 수 있어요.", en: "Once it's public you can open it from here.", ja: "公開されたらここからすぐ開けます。", zh: "公开后可以直接从这里打开。" },
    started: { ko: "시작", en: "started", ja: "開始", zh: "开始" },
    features: { ko: "에서 할 수 있는 것", en: ": what you can do", ja: "でできること", zh: "能做什么" },
    devNote: { ko: "개발 노트", en: "Dev note", ja: "開発ノート", zh: "开发笔记" },
    roadmap: { ko: "로드맵", en: "Roadmap", ja: "ロードマップ", zh: "路线图" },
    state: {
      done: { ko: "완료", en: "Done", ja: "完了", zh: "已完成" },
      doing: { ko: "진행 중", en: "In progress", ja: "進行中", zh: "进行中" },
      next: { ko: "예정", en: "Planned", ja: "予定", zh: "计划中" },
    },
    prev: { ko: "이전 작품", en: "Previous", ja: "前の作品", zh: "上一个作品" },
    next: { ko: "다음 작품", en: "Next", ja: "次の作品", zh: "下一个作品" },
    home: { ko: "메인 홈으로", en: "Back home", ja: "ホームへ", zh: "回到首页" },
  },
  sameAge: {
    prompt: {
      ko: "나이를 바꿔 보세요. 만드는 중인 사이트를 여기서 먼저 써 볼 수 있어요.",
      en: "Change the age. You can try the site I'm building right here.",
      ja: "年齢を変えてみてください。制作中のサイトをここで先に試せます。",
      zh: "改改年龄试试。正在制作的网站可以先在这里体验。",
    },
    left: { ko: "같은 나이에", en: "At your age,", ja: "同じ歳で、", zh: "同样的年纪，" },
    right: { ko: "그들은", en: "they…", ja: "彼らは", zh: "他们……" },
    label: { ko: "지금 내 나이 (만)", en: "My age", ja: "いまの年齢（満）", zh: "我现在的年龄（周岁）" },
    minus: { ko: "한 살 줄이기", en: "One year younger", ja: "1歳減らす", zh: "减一岁" },
    plus: { ko: "한 살 늘리기", en: "One year older", ja: "1歳増やす", zh: "加一岁" },
  },
  feedback: {
    title: { ko: "Feedback", en: "Feedback", ja: "Feedback", zh: "Feedback" },
    intro: {
      ko: "써 보고 불편했던 점, 고장 난 곳, 있었으면 하는 기능을 알려 주세요. 하나하나 직접 읽어요.",
      en: "Tell me what felt awkward, what broke, or what you wish existed. I read every one myself.",
      ja: "使ってみて不便だった点、壊れていた所、あったらいい機能を教えてください。一つひとつ自分で読みます。",
      zh: "告诉我用起来不顺手的地方、坏掉的功能，或者你希望有的功能。每一条我都会亲自看。",
    },
  },
} satisfies Record<string, Record<string, unknown>>;

export function tx(l: L, lang: keyof L) {
  return l[lang];
}
