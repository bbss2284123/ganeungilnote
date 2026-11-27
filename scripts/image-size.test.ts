import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { isRequiredThumbnailSize, readImageSize, THUMB_HEIGHT, THUMB_WIDTH } from "../src/lib/image-size";

test("기존 썸네일은 1200×675 WebP로 읽힌다", () => {
  const file = path.join(process.cwd(), "public/images/posts/osaek-byeolbit-garden-2026-thumbnail.webp");
  const size = readImageSize(file);
  assert.deepEqual(size, { width: THUMB_WIDTH, height: THUMB_HEIGHT });
  assert.equal(isRequiredThumbnailSize(size), true);
});

test("기본 OG 이미지는 1200×630이라 썸네일 규격이 아니다", () => {
  const file = path.join(process.cwd(), "public/brand/og-default.png");
  const size = readImageSize(file);
  assert.deepEqual(size, { width: 1200, height: 630 });
  assert.equal(isRequiredThumbnailSize(size), false);
});
