import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";
import { siteConfig } from "../../site.config";
import { postSchema } from "./post-schema";
import { publishDay } from "./publish-due";

export interface Issue {
  level: "error" | "info";
  file: string;
  message: string;
}

export interface LoadedPost {
  id: string;
  file: string;
  body: string;
  data: Record<string, unknown>;
}

export function loadBanned(): string[] {
  const file = path.join(process.cwd(), "rules/banned.yaml");
  const parsed = parse(readFileSync(file, "utf8")) as { phrases?: string[] };
  return (parsed.phrases ?? []).filter((phrase) => phrase.trim().length > 0);
}

export function loadPosts(): LoadedPost[] {
  const dir = path.join(process.cwd(), "src/content/posts");
  return readdirSync(dir)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => {
      const file = path.join(dir, name);
      const raw = readFileSync(file, "utf8");
      const parsed = matter(raw, {
        engines: {
          yaml: {
            parse: (input: string) => parse(input),
            stringify: () => "",
          },
        },
      });
      return {
        id: name.replace(/\.mdx?$/, ""),
        file: path.relative(process.cwd(), file),
        body: parsed.content,
        data: parsed.data as Record<string, unknown>,
      };
    });
}

function walkStrings(value: unknown, visit: (text: string) => void) {
  if (typeof value === "string") visit(value);
  else if (Array.isArray(value)) value.forEach((item) => walkStrings(item, visit));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => walkStrings(item, visit));
}

export function checkPosts(posts: LoadedPost[], banned = loadBanned()): Issue[] {
  const issues: Issue[] = [];
  const perDay = new Map<string, string[]>();
  for (const post of posts) {
    const parsed = postSchema.safeParse(post.data);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const where = issue.path.length ? issue.path.join(".") : "frontmatter";
        issues.push({ level: "error", file: post.file, message: `${where}: ${issue.message}` });
      }
      continue;
    }
    const data = parsed.data;
    const blob = `${data.title}\n${data.description}\n${post.body}`;
    for (const phrase of banned) {
      if (blob.includes(phrase)) {
        issues.push({ level: "error", file: post.file, message: `금지 표현: ${phrase}` });
      }
    }
    walkStrings(data, (text) => {
      if (text.includes("/brand/samples") || text.includes("docs/design-samples")) {
        issues.push({ level: "error", file: post.file, message: "디자인 샘플 경로는 글에 넣지 않습니다." });
      }
    });
    if (!data.draft && /예시·미검증|예시읍/.test(blob)) {
      issues.push({ level: "error", file: post.file, message: "발행 글에 시안 표식을 남기지 않습니다." });
    }
    if (!data.draft && !data.sample) {
      const at = data.publishAt ?? data.date;
      const day = publishDay(at);
      const list = perDay.get(day) ?? [];
      list.push(post.id);
      perDay.set(day, list);
    }
  }
  for (const [day, ids] of perDay) {
    if (ids.length > siteConfig.maxPostsPerDay) {
      issues.push({
        level: "error",
        file: "src/content/posts",
        message: `${day} 발행 글이 ${ids.length}편입니다. 하루 ${siteConfig.maxPostsPerDay}편까지입니다. (${ids.join(", ")})`,
      });
    }
  }
  return issues;
}
