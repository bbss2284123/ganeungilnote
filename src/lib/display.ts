import { formatKo } from "./dates";

/** 비어 있는 사실 값. 무료, 연중무휴, 없음으로 바꾸지 않습니다. */
export const UNKNOWN = "확인되지 않음";

export function displayFact(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return UNKNOWN;
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : UNKNOWN;
  const text = value.trim();
  return text.length ? text : UNKNOWN;
}

export function displayList(values: readonly string[] | null | undefined): string {
  if (!values || values.length === 0) return UNKNOWN;
  const cleaned = values.map((item) => item.trim()).filter(Boolean);
  return cleaned.length ? cleaned.join(", ") : UNKNOWN;
}

/** 확인 시각. 시간대는 Asia/Seoul 로 적습니다. 값이 없으면 확인되지 않음만 반환합니다. */
export function formatVerified(value: string | null | undefined): string {
  if (value === null || value === undefined || value.trim() === "") return UNKNOWN;
  const stamp = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(stamp)) return `${formatKo(stamp)} · Asia/Seoul`;
  const match = stamp.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
  if (match) return `${formatKo(match[1])} ${match[2]} · Asia/Seoul`;
  return `${stamp} · Asia/Seoul`;
}
