import assert from "node:assert/strict";
import test from "node:test";
import { displayFact, displayList, formatVerified, UNKNOWN } from "../src/lib/display";

test("null은 확인되지 않음이고 무료나 연중무휴가 아니다", () => {
  for (const value of [null, undefined, "", "   "]) {
    const shown = displayFact(value);
    assert.equal(shown, UNKNOWN);
    assert.notEqual(shown, "무료");
    assert.notEqual(shown, "연중무휴");
    assert.notEqual(shown, "없음");
  }
  assert.equal(displayList([]), UNKNOWN);
  assert.equal(displayList(null), UNKNOWN);
  assert.equal(formatVerified(null), UNKNOWN);
  assert.equal(formatVerified(""), UNKNOWN);
});

test("확인 시각은 Asia/Seoul을 붙인다", () => {
  assert.equal(formatVerified("2026-11-10"), "2026년 11월 10일 · Asia/Seoul");
  assert.equal(formatVerified("2026-11-10T09:30"), "2026년 11월 10일 09:30 · Asia/Seoul");
});

test("적힌 문장은 그대로 보여 준다", () => {
  assert.equal(displayFact("예시·미검증"), "예시·미검증");
});
