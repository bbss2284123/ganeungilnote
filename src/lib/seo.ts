/** 태그·지역 목록이 이 수보다 적은 발행 글을 가지면 얇은 페이지로 보고 noindex·사이트맵 제외합니다. */
export const MIN_LISTING_POSTS = 2;

export function isThinListing(count: number): boolean {
  return count < MIN_LISTING_POSTS;
}

/** "2026-11-14T18:00" 또는 "2026-11-14" 를 한국 시간 ISO 8601 로 바꿉니다. */
export function seoulIso(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T00:00:00+09:00`;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return `${value}:00+09:00`;
  return value;
}

/** 글마다 만든 공유 이미지 (1200×630 PNG). */
export function postOgImage(id: string): string {
  return `/images/og/${id}.png`;
}
