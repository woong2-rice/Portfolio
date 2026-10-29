# Woong's Launchpad

바이브 코딩으로 만든 작품 다섯 개를 한곳에 모은 포트폴리오 허브.

- 메인(`/`): 왼쪽에서 작품 이야기가 지나가면, 오른쪽에 고정된 무대의 기기 화면과 바탕색이 그 작품의 것으로 바뀝니다.
- 상세(`/project/[id]`): 작품 색 프리로더 → 히어로 → 플레이스토어식 기능 판 → 개발 노트와 로드맵 → 이전/홈/다음.
- '재능은 애매하지 않다'는 메인과 상세 페이지 안에서 바로 써 볼 수 있는 미리보기로 들어가 있어요.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 확인
```

## 고칠 곳

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 이름, 소개 문장, Maker's note, 도구, 연락처(이메일·GitHub) | `data/site.ts` |
| 작품 내용, 링크, 색, 기능 설명, 로드맵 | `data/projects.ts` |
| 같은 나이 위인 목록 | `data/same-age.ts` |
| 다이아몬드 점수표·순위표 (엔진 실행 결과) | `data/diamond.ts` |
| 스크린샷·영상 | `public/shots/<작품>/` |

`data/site.ts`의 `contact.email`을 채우면 연락 칸(한 줄 입력 → 메일 앱)이 켜집니다.

## 구조

```
app/
  layout.tsx              머리말, 글꼴, 테마
  page.tsx                메인 허브
  project/[id]/page.tsx   작품 상세 (5개 정적 생성)
components/
  device/                 IphoneFrame, MacbookFrame, Tilt(3D 기울기)
  home/                   SplitStage, SameAgeSection, MakerNote, Contact
  project/                Preloader, FeatureStrip, DevNote, ProjectNav
  fragments/              다이아몬드 화면 조각, 같은 나이 위젯
  ui/button.tsx           shadcn/ui 방식 버튼
data/                     모든 글과 데이터
public/shots/             실제 앱 스크린샷과 Langsplit 플레이 영상
```

## 배포 (Vercel)

1. 이 폴더를 GitHub 저장소로 올립니다.
2. vercel.com → Add New Project → 저장소 선택 → Deploy. 설정은 기본값 그대로.

## 이미지 메모

- 여행 기록장 스크린샷은 실제 앱에 **예시 기록**을 넣어 찍었습니다(개인 기록 아님).
- Langsplit, 운세주막 화면은 실제 앱 화면입니다. 운세주막은 `사주분석앱/03_앱/web/screenshots`의 캡처를 썼어요.
- 다이아몬드는 아직 화면이 없어서, 엔진이 실제로 돌린 경기·시즌 결과를 HTML로 그렸어요.
