import { getCollection, type CollectionEntry } from "astro:content";
import { categoryById, siteConfig, tagById } from "../../site.config";
import { isReleased } from "./dates";
import { publishKey, selectWithinDailyCap } from "./publish-due";

export type PostEntry = CollectionEntry<"posts">;

export function publishDate(post: PostEntry): string {
  return post.data.publishAt ?? post.data.date;
}

export async function allEntries(): Promise<PostEntry[]> {
  return getCollection("posts");
}

export async function allPublished(): Promise<PostEntry[]> {
  const posts = await getCollection("posts");
  const released = posts.filter((post) => !post.data.draft && !post.data.sample && isReleased(publishDate(post)));
  const visible = selectWithinDailyCap(
    released.map((post) => ({ id: post.id, at: publishKey(publishDate(post)), post })),
    siteConfig.maxPostsPerDay,
  );
  return visible
    .map((item) => item.post)
    .sort((a, b) => publishDate(b).localeCompare(publishDate(a)) || b.data.updated.localeCompare(a.data.updated));
}

export function postPath(id: string): string {
  return `/${id}/`;
}

export function categoryPath(id: string): string {
  return `/category/${id}/`;
}

export function tagPath(id: string): string {
  return `/tag/${id}/`;
}

export function regionPath(id: string): string {
  return `/region/${id}/`;
}

export function relatedPosts(post: PostEntry, posts: PostEntry[]): PostEntry[] {
  const pinned = new Set(post.data.related_slugs);
  return posts
    .filter((item) => item.id !== post.id)
    .map((item) => {
      const sameCategory = item.data.category === post.data.category ? 3 : 0;
      const sameRegion = post.data.region_id && item.data.region_id === post.data.region_id ? 3 : 0;
      const sharedTags = item.data.tags.filter((tag) => post.data.tags.includes(tag)).length;
      const explicit = pinned.has(item.id) ? 5 : 0;
      return { item, score: sameCategory + sameRegion + sharedTags + explicit };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || publishDate(b.item).localeCompare(publishDate(a.item)))
    .slice(0, 4)
    .map((row) => row.item);
}

export function neighbors(post: PostEntry, posts: PostEntry[]): { prev?: PostEntry; next?: PostEntry } {
  const ordered = [...posts].sort((a, b) => publishDate(b).localeCompare(publishDate(a)));
  const index = ordered.findIndex((item) => item.id === post.id);
  if (index < 0) return {};
  return { next: ordered[index - 1], prev: ordered[index + 1] };
}

export function authorName(post: PostEntry): string {
  return post.data.author ?? siteConfig.author.name;
}

export function cardExcerpt(text: string, max = 72): string {
  const chars = [...text.trim()];
  if (chars.length <= max) return chars.join("");
  return `${chars.slice(0, max).join("")}…`;
}

export function categoryName(id: string): string {
  return categoryById(id)?.name ?? id;
}

export function tagLabel(id: string): string {
  return tagById(id)?.label ?? id;
}

export function pageSlice<T>(items: T[], page: number, size = siteConfig.postsPerPage): { slice: T[]; pages: number } {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const start = (page - 1) * size;
  return { slice: items.slice(start, start + size), pages };
}

export function recentPosts(posts: PostEntry[], limit = 5): PostEntry[] {
  return [...posts].sort((a, b) => b.data.updated.localeCompare(a.data.updated) || b.id.localeCompare(a.id)).slice(0, limit);
}
