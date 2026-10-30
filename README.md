# Woong's Launchpad

바이브 코딩으로 만든 작품 다섯 개를 한곳에 모은 포트폴리오 허브.

- 메인(`/`): 작품 하나가 한 화면. 큰 기기 목업 + 제목 + 한 줄 + Visit Live / Story.
- 상세(`/project/[id]`): 작품마다 다른 들어가기 장면 → 히어로 → 플레이스토어식 기능 판 → 개발 노트와 로드맵 → 이전/홈/다음.
- '재능은 애매하지 않다'는 상세 페이지에서 바로 써 볼 수 있는 미리보기가 들어가 있어요.

## 언어

한국어는 `/`, 영어 `/en`, 일본어 `/ja`, 중국어 `/zh`. 머리말 오른쪽 지구본에서 바꿔요.
글은 모두 `data/*.ts` 안에 `{ ko, en, ja, zh }` 네 칸으로 들어 있어요.

## 피드백

- 런치패드 `/feedback` 페이지, 그리고 각 앱의 '피드백' 버튼이 같은 창(`public/feedback-widget.js`)을 써요.
- 보낸 내용은 여행 기록장과 같은 Supabase 프로젝트의 `feedback` 표에 쌓여요.
- **처음 한 번:** Supabase 대시보드 → SQL Editor 에 `supabase/feedback.sql` 을 붙여 넣고 Run.
- 읽기: Table Editor → feedback. 웹에서는 누구도 읽을 수 없게(쓰기만 가능) 막아 두었어요.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 확인
```

## 고칠 곳

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 이름, 소개 문장, Maker's note, 도구, 연락처, 화면 곳곳의 짧은 글 | `data/site.ts` |
| 작품 내용, 링크, 색, 기능 설명, 로드맵 | `data/projects.ts` |
| 같은 나이 위인 목록 | `data/same-age.ts` |
| 다이아몬드 점수표·순위표 (엔진 실행 결과) | `data/diamond.ts` |
| 스크린샷·영상 | `public/shots/<작품>/` |


## 구조

```
app/
  (ko)/                   한국어: /, /project/[id], /feedback
  [lang]/                 영어·일본어·중국어: /en, /ja, /zh 아래 같은 페이지
components/
  pages/                  홈, 작품 상세, 피드백 페이지 본문 (언어만 받아서 그림)
  home/                   전시 카드, Maker's note, 연락
  project/                들어가기 장면(preloader), 기능 판, 개발 노트, 이전/다음
  device/                 IphoneFrame, MacbookFrame, Tilt(3D 기울기)
  fragments/              다이아몬드 화면 조각, 같은 나이 위젯
  feedback-form.tsx       피드백 페이지의 입력 칸
data/                     모든 글과 데이터 (네 언어)
lib/i18n.ts · feedback.ts 언어 도구, 피드백 저장
public/feedback-widget.js 다른 앱에도 붙이는 공용 피드백 창
public/shots/             실제 앱 화면과 Langsplit 플레이 영상
supabase/feedback.sql     피드백 표 만들기 (한 번만)
```

## 배포 (Vercel)

GitHub `woong2-rice/Portfolio`의 main에 올라가면 Vercel이 자동으로 다시 배포해요.
지금 주소: https://portfolio-gamma-umber-62.vercel.app (Vercel → Settings → Domains 에서 바꿀 수 있어요)

## 이미지 메모

- 여행 기록장 스크린샷은 새 디자인(v2)의 **예시 기록 모드**로 찍었습니다(개인 기록 아님).
- Langsplit, 운세주막 화면은 실제 앱 화면입니다. 운세주막은 `사주분석앱/03_앱/web/screenshots`의 캡처를 썼어요.
- Langsplit 영상과 화면은 새 디자인을 실제로 플레이하며 찍었어요.
- 다이아몬드는 아직 화면이 없어서, 엔진이 실제로 돌린 경기·시즌 결과를 HTML로 그렸어요.
