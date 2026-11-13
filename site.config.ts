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
    { id: "walk", label: "뚜벅이", description: "지하철·버스와 도보로 축제장, 관광지, 공항에 가는 길을 정리한 글입니다. 역 출구, 환승, 걷는 방향을 공식 안내 기준으로 적습니다." },
    { id: "car", label: "자차", description: "자가용으로 갈 때 필요한 진입 방향, 주차장 위치, 요금 단위와 할인 조건을 공식 자료로 확인해 정리한 글을 모았습니다." },
    { id: "daytrip", label: "당일치기", description: "하루 일정으로 다녀오기 좋은 지역과 코스를 정리한 글입니다. 이동 순서, 운영 시간, 쉬는 날을 확인된 범위에서 적습니다." },
    { id: "train", label: "기차여행", description: "KTX·SRT와 일반열차, 공항철도로 이동하는 방법을 다룬 글입니다. 내리는 역, 환승, 역에서 가는 길을 공식 안내로 정리합니다." },
    { id: "bus", label: "버스", description: "시내·시외버스와 공항버스로 가는 방법을 다룬 글입니다. 노선 번호, 타는 곳, 내리는 정류장을 운영사 안내 기준으로 적습니다." },
    { id: "free-parking", label: "무료주차", description: "무료 주차를 공식 출처로 확인한 장소만 모은 글입니다. 무료 조건과 시간, 바뀔 수 있는 점을 함께 적고 확인일을 남깁니다." },
    { id: "closed-day", label: "정기휴무", description: "정기휴무와 임시휴무 등 쉬는 날을 다룬 글입니다. 공식 공지 기준으로 휴무 요일과 예외를 정리해 헛걸음을 줄이도록 돕습니다." },
    { id: "weekend", label: "주말", description: "주말과 공휴일의 운영 시간, 요금 차이, 붐비는 시간대 안내를 다룬 글입니다. 공식 자료로 확인한 내용만 정리해 적습니다." },
    { id: "rain", label: "우천", description: "비가 오거나 바람이 셀 때의 취소, 연기, 대체 운영 안내를 다룬 글입니다. 운영 기관 공지를 기준으로 확인 방법을 적습니다." },
    { id: "sns", label: "SNS 화제", description: "SNS에서 화제가 된 장소를 공식 자료로 다시 확인한 글입니다. 운영 시간, 예약, 주차처럼 가기 전에 필요한 정보만 정리합니다." },
    { id: "pet", label: "반려동물 동반", description: "반려동물과 함께 갈 수 있는지, 목줄·케이지 같은 조건이 있는지를 공식 안내로 확인한 장소를 정리한 글을 모았습니다." },
    { id: "wheelchair", label: "휠체어 접근", description: "휠체어로 이동할 수 있는 길, 경사로, 엘리베이터, 장애인 주차 같은 접근 정보를 공식 안내로 확인해 정리한 글입니다." },
  ] satisfies NamedLink[],
  regions: [
    { id: "seoul", label: "서울", description: "서울의 축제, 관광지, 공항과 공영주차장 정보를 모았습니다. 운영 시간, 교통, 주차 요금을 공식 자료로 확인해 정리합니다." },
    { id: "busan", label: "부산", description: "부산의 축제, 해변, 관광지와 주변 공영주차장 정보를 모았습니다. 점등 시간, 교통, 주차 요금을 공식 자료로 확인합니다." },
    { id: "gyeongju", label: "경주", description: "경주의 유적지와 관광지, 축제 정보를 모았습니다. 관람 시간, 휴무, 주차, 역과 터미널에서 가는 길을 공식 자료로 정리합니다." },
    { id: "gangneung", label: "강릉", description: "강릉의 바다, 해돋이 명소, 축제 정보를 모았습니다. 운영 시간, KTX·버스 교통, 주차 정보를 공식 자료로 확인해 적습니다." },
    { id: "jeju", label: "제주", description: "제주의 오름, 한라산, 관광지와 축제 정보를 모았습니다. 탐방 예약, 운영 시간, 버스와 주차 정보를 공식 자료로 정리합니다." },
    { id: "jeonju", label: "전주", description: "전주 한옥마을과 주변 관광지, 축제 정보를 모았습니다. 운영 시간, 휴무, 주차장, 역에서 가는 길을 공식 자료로 적습니다." },
    { id: "yeosu", label: "여수", description: "여수의 바다, 야경 명소, 축제 정보를 모았습니다. 운영 시간, 쉬는 날, 버스·기차 교통과 주차를 공식 자료로 정리합니다." },
    { id: "gangwon", label: "강원", description: "강원 지역의 산, 바다, 축제 정보를 모았습니다. 탐방로 운영, 휴무, 교통과 주차 정보를 공식 자료로 확인해 정리합니다." },
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
