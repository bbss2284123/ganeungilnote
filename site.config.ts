/**
 * 가는길노트 공통 설정.
 * 광고·분석·인증 값은 비어 있습니다. 채우기 전에는 스크립트와 ads.txt 게시자 줄을 넣지 않습니다.
 * 색은 설계서의 #FFFFFF #253246 #2768B5 #DDEFE6 #EAA76C #F5F7FA 입니다.
 */
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  soft: string;
  accent: string;
}

export interface NamedLink {
  id: string;
  label: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  match: string[];
}

export const siteConfig = {
  name: "가는길노트",
  nameEn: "ganeungilnote",
  tagline: "여행·교통·주차·축제 정보를 정리하는 블로그",
  slogan: "가기 전에 확인할 정보, 한눈에.",
  url: "https://ganeungilnote.com",
  description:
    "축제, 지역, 교통, 주차, 휴무, 맛집 정보를 조사해 뚜벅이·자차·기차 여행자가 가기 전에 확인하도록 정리하는 블로그입니다.",
  lang: "ko",
  locale: "ko_KR",
  contactEmail: "baekhyun071500@gmail.com",
  legalUpdated: "2026-11-10",
  postsPerPage: 9,
  /** 한국 시간 기준 하루 발행 상한. */
  maxPostsPerDay: 1,
  /** TODO: IndexNow 키. 비우면 키 파일을 만들지 않고 핑도 보내지 않습니다. */
  indexNowKey: "",
  author: {
    /** TODO: 필명. 비어 있는 동안은 사이트 이름을 발행자로 둡니다. */
    name: "가는길노트",
    slug: "editor",
    role: "편집",
    bio: "운영자 필명은 아직 정해지지 않았습니다. 글은 출처와 확인일을 남긴 뒤에만 발행합니다.",
  },
  design: {
    fontFamily: '"Pretendard Variable", Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
    bg: "#FFFFFF",
    canvas: "#F5F7FA",
    text: "#253246",
    muted: "#5C6B7A",
    brand: "#2768B5",
    mint: "#DDEFE6",
    orange: "#EAA76C",
    max: "1240px",
  },
  categories: [
    {
      id: "region",
      name: "지역·여행정보",
      description: "관광지와 지역 생활정보의 주소, 운영, 휴무를 확인한 범위에서 정리합니다.",
      icon: "region",
      soft: "#DDEFE6",
      accent: "#1C6B5A",
    },
    {
      id: "festival",
      name: "축제·행사",
      description: "개최 기간, 관람료, 셔틀, 임시 주차장, 변경·취소 공지를 공식 발표 기준으로 정리합니다.",
      icon: "festival",
      soft: "#FDE8D4",
      accent: "#8A4E22",
    },
    {
      id: "transit",
      name: "교통·주차",
      description: "역·터미널에서 가는 법, 환승, 주차장 이름·요금 단위·운영을 정리합니다.",
      icon: "transit",
      soft: "#E5F0FA",
      accent: "#2768B5",
    },
    {
      id: "course",
      name: "여행코스·맛집",
      description: "뚜벅이·자차 동선과 주변 식당의 휴무, 주차, 접근을 확인된 항목만 비교합니다.",
      icon: "course",
      soft: "#EEF2F6",
      accent: "#253246",
    },
  ] satisfies Category[],
  tags: [
    { id: "walk", label: "뚜벅이", description: "대중교통과 도보를 중심으로 적은 글" },
    { id: "car", label: "자차", description: "자가용 진입과 주차를 다룬 글" },
    { id: "daytrip", label: "당일치기", description: "하루 일정으로 읽는 글" },
    { id: "train", label: "기차여행", description: "철도 이동을 다룬 글" },
    { id: "bus", label: "버스", description: "시내·시외버스 연결을 다룬 글" },
    { id: "free-parking", label: "무료주차", description: "무료 주차를 공식 출처로 확인한 글에만 붙이는 태그" },
    { id: "closed-day", label: "정기휴무", description: "쉬는 날을 다룬 글" },
    { id: "weekend", label: "주말", description: "주말 운영이나 혼잡 안내를 다룬 글" },
    { id: "rain", label: "우천", description: "비 오는 날의 취소·대체 안내를 다룬 글" },
    { id: "sns", label: "SNS 화제", description: "화제 장소를 공식 자료로 다시 확인한 글" },
    { id: "pet", label: "반려동물 동반", description: "반려동물 동반 조건을 확인한 글" },
    { id: "wheelchair", label: "휠체어 접근", description: "휠체어 접근을 확인한 글" },
  ] satisfies NamedLink[],
  regions: [
    { id: "seoul", label: "서울", description: "서울 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
    { id: "busan", label: "부산", description: "부산 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
    { id: "gyeongju", label: "경주", description: "경주 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
    { id: "gangneung", label: "강릉", description: "강릉 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
    { id: "jeju", label: "제주", description: "제주 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
    { id: "jeonju", label: "전주", description: "전주 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
    { id: "yeosu", label: "여수", description: "여수 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
    { id: "gangwon", label: "강원", description: "강원 장소의 운영, 교통, 주차를 확인한 글이 모입니다." },
  ] satisfies NamedLink[],
  nav: [
    { id: "index", label: "홈", href: "/", match: ["index"] },
    { id: "region", label: "지역·여행정보", href: "/category/region/", match: ["region"] },
    { id: "festival", label: "축제·행사", href: "/category/festival/", match: ["festival"] },
    { id: "transit", label: "교통·주차", href: "/category/transit/", match: ["transit"] },
    { id: "course", label: "여행코스·맛집", href: "/category/course/", match: ["course"] },
  ] satisfies NavItem[],
  adsense: {
    /** TODO: AdSense 게시자 ID (pub- 로 시작). 비우면 ads.txt 에 게시자 줄을 넣지 않습니다. */
    publisherId: "",
    slots: {
      /** TODO: 광고 슬롯 ID */
      afterIntro: "",
      midArticle: "",
      endArticle: "",
      sidebar: "",
    },
  },
  /** TODO: GA4 측정 ID (G- 로 시작). 비우면 분석 스크립트를 넣지 않습니다. */
  ga4Id: "",
  /** TODO: Cloudflare Web Analytics 토큰. 비우면 비콘을 넣지 않습니다. */
  cloudflareWebAnalyticsToken: "",
  verification: {
    google: "",
    naver: "",
    bing: "",
  },
} as const;

export type CategoryId = (typeof siteConfig.categories)[number]["id"];
export type TagId = (typeof siteConfig.tags)[number]["id"];
export type RegionId = (typeof siteConfig.regions)[number]["id"];

export function categoryById(id: string): Category | undefined {
  return siteConfig.categories.find((category) => category.id === id);
}

export function tagById(id: string): NamedLink | undefined {
  return siteConfig.tags.find((tag) => tag.id === id);
}

export function regionById(id: string): NamedLink | undefined {
  return siteConfig.regions.find((region) => region.id === id);
}

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
