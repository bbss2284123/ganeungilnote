import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

function htmlFiles(dir: string): string[] {
  const found: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) found.push(...htmlFiles(full));
    else if (name.endsWith(".html")) found.push(full);
  }
  return found;
}

const root = path.join(process.cwd(), "dist");
const files = htmlFiles(root);
const joined = files.map((file) => readFileSync(file, "utf8")).join("\n");
const forbidden = [
  "flowerhomenote",
  "꽃과살림",
  "techjeongbiso",
  "테크정비소",
  "todaymoneytip",
  "머니팁",
  "/opt/cursor",
  "googletagmanager",
  "adsbygoogle",
  "cloudflareinsights",
  "sample-place-guide",
  "예시·미검증",
  "예시읍",
  "직접 다녀온",
];
const hits: string[] = [];
for (const word of forbidden) {
  if (joined.toLowerCase().includes(word.toLowerCase())) hits.push(`빌드 결과에 남으면 안 되는 문자열: ${word}`);
}
if (joined.includes("12,840") || joined.includes("조회수")) {
  hits.push("빌드 결과에 조회수 표현이 있습니다.");
}
if (hits.length) {
  for (const hit of hits) console.error(hit);
  process.exit(1);
}
console.log(`HTML ${files.length}개. 분석 스크립트·시안 글·형제 블로그 문자열이 없습니다.`);
