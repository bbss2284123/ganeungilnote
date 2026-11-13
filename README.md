# 가는길노트

가기 전에 확인할 정보, 한눈에.  
축제·지역·교통·주차·휴무·맛집을 조사해 정리하는 국내 여행 블로그입니다.  
프로덕션 주소는 [https://ganeungilnote.com](https://ganeungilnote.com) 입니다.

Astro 정적 사이트입니다. 빌드 결과는 `dist` 이고, 검색은 Pagefind, 글은 `src/content/posts` 입니다.

## 로컬에서 보기

Node.js 22가 필요합니다.

```bash
npm install
npm run dev
```

- 발행된 글만 홈·분류·RSS·사이트맵에 나옵니다. 지금은 발행 글이 없습니다.
- 글이 없으면 홈은 빈 상태와 네 분류 안내입니다. 가짜 글, 날짜, 조회수를 넣지 않습니다.
- 개발 서버에서 초안 화면: `/draft/sample-place-guide/`
- `npm run build` 결과에는 초안 주소가 들어가지 않습니다.

```bash
npm run check
npm run build
npm run preview
```

## Cloudflare Pages

| 항목 | 값 |
| --- | --- |
| 빌드 명령 | `npm run build` |
| 출력 디렉터리 | `dist` |
| 환경 변수 | `NODE_VERSION=22` |
| 프로덕션 도메인 | `ganeungilnote.com` |

GitHub Actions `Scheduled publish` 가 약 30분마다, 한국 시간 07:00–22:30 에 돌아갑니다. 저장소 비밀 `CF_PAGES_DEPLOY_HOOK` 에 Cloudflare Pages 배포 훅 URL을 넣습니다. 비밀이 없으면 배포를 건너뛰고 성공으로 끝납니다.

초안(`draft: true`)과 시안(`sample: true`)은 배포 대상이 아닙니다. `publishAt`(없으면 `date`)이 아직 오지 않은 글은 빌드에 나오지 않고, 그 시각이 지난 뒤의 예약 실행이 배포 훅을 호출합니다. 같은 한국 날짜에 공개되는 글은 `site.config.ts` 의 `maxPostsPerDay`(1)까지입니다.

## 주인님이 채울 값

`site.config.ts` 에 비워 둔 칸입니다. 비어 있으면 스크립트와 ads.txt 게시자 줄을 넣지 않습니다.

| 칸 | 넣는 값 |
| --- | --- |
| `author.name` | 필명. 비어 있는 동안은 사이트 이름을 발행자로 둡니다. |
| `contactEmail` | 문의 메일. 지금은 `baekhyun071500@gmail.com` |
| `adsense.publisherId` | AdSense 게시자 ID (`pub-` 로 시작) |
| `adsense.slots.*` | 본문 슬롯 ID |
| `ga4Id` | GA4 측정 ID (`G-`) |
| `cloudflareWebAnalyticsToken` | Cloudflare Web Analytics 토큰 |
| `verification.google` | Google Search Console 메타 코드 |
| `verification.naver` | 네이버 서치어드바이저 인증 코드 |
| `verification.bing` | Bing 웹마스터 인증 코드 |
| `indexNowKey` | IndexNow 키. 비우면 핑하지 않습니다. |

로컬에서만 GA를 덮어쓰려면 `.env` 에 `PUBLIC_GA_ID` 를 넣습니다. 예시는 `.env.example` 입니다.

본문에 광고가 필요하면 글 템플릿이 아니라 `PostView` 의 `<AdSlot />` 를 씁니다. ID가 비어 있으면 배너를 그리지 않습니다.

## 글을 추가하는 방법

1. `docs/templates/article.mdx` 를 `src/content/posts/<slug>.mdx` 로 복사합니다.
2. `[작성]` 을 바꿉니다. 분류는 `region` 지역·여행정보, `festival` 축제·행사, `transit` 교통·주차, `course` 여행코스·맛집 중 하나입니다.
3. 태그는 `site.config.ts` 의 id를 씁니다. 예: `walk`, `car`, `daytrip`, `train`, `bus`.
4. 모르는 값은 `null` 또는 빈 배열로 둡니다. 화면은 **확인되지 않음** 입니다. `무료`, `연중무휴`, `도보 5분`으로 채우지 않습니다.
5. 출처가 있는 요금에는 단위를 적습니다. 예: `기본 30분 2,000원`. 단위 없는 `2,000원` 은 검수가 멈춥니다.
6. 동선 그림이 개념도면 `route_map.schematic: true` 입니다. 화면과 설명에 `개념도·축척 없음` 이 붙습니다. 검증 전에는 `verified: false` 입니다.
7. 발행하려면 `draft: false`, `sample: false`, `status` 가 `approved` 또는 `published`, `verified_at`, 출처 1개 이상이 필요합니다.
8. 공개 시각은 `publishAt` 입니다. 미래로 두면 그 시각의 예약 배포 때 올라갑니다. 같은 한국 날짜에는 1편까지입니다.
9. `npm run check` 로 스키마와 금지 표현을 확인한 뒤 커밋합니다.

대표 사진이 없으면 카드는 분류 아이콘만 보여 줍니다. 사진이 있으면 `hero_image` 와 `hero_alt` 를 같이 적습니다. `docs/design-samples/` 의 썸네일과 주차 그림은 디자인 참고이며 글에 넣지 않습니다.

## 글에 항상 붙는 구성

제목, 3줄 요약, 본문 앵커, 한눈에 보는 정보표, 자차·뚜벅이·기차·버스, 주차장 비교(P1·P2·P3), 동선 지도, 식당 카드, 방문 전 주의, 출처와 기준일, 관련 글.

## 분류

상위 분류는 네 개입니다. 교통·가는 법과 주차는 `교통·주차` 하나로 둡니다. 지역 바로가기는 분류가 아니라 `/region/<id>/` 필터입니다.

## 색

| 토큰 | 값 | 쓰는 곳 |
| --- | --- | --- |
| 배경 | `#FFFFFF` | 페이지 |
| 글자 | `#253246` | 본문 |
| 브랜드 | `#2768B5` | 링크, 선택 메뉴 |
| 민트 | `#DDEFE6` | 칩, 안내 상자 |
| 오렌지 | `#EAA76C` | 강조. 작은 본문 글자에는 쓰지 않습니다 |
| 캔버스 | `#F5F7FA` | 검색창, 빈 상태 |

본문은 Pretendard Variable 이고, 없으면 Noto Sans KR, Apple SD Gothic Neo 순입니다. 본문 17px, 글 안은 18px입니다. 폭은 1240px이고, 글 목록과 사이드바는 약 3:1입니다. 좁은 화면은 한 열입니다.
