/** 썸네일 검수용. WebP·PNG 픽셀 크기만 읽습니다. */
import { readFileSync } from "node:fs";

export const THUMB_WIDTH = 1200;
export const THUMB_HEIGHT = 675;

export function readImageSize(file: string): { width: number; height: number } | null {
  const buf = readFileSync(file);
  if (buf.length >= 24 && buf.toString("ascii", 1, 4) === "PNG" && buf[0] === 0x89) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length < 30 || buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return {
      width: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
      height: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1,
    };
  }
  if (chunk === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8 ") {
    const sig = buf.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    if (sig < 0 || sig + 7 >= buf.length) return null;
    return { width: buf.readUInt16LE(sig + 3) & 0x3fff, height: buf.readUInt16LE(sig + 5) & 0x3fff };
  }
  return null;
}

export function isRequiredThumbnailSize(size: { width: number; height: number } | null): boolean {
  return Boolean(size && size.width === THUMB_WIDTH && size.height === THUMB_HEIGHT);
}
