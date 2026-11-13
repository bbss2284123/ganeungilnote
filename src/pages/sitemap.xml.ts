import type { APIContext } from "astro";
import { siteConfig, absoluteUrl } from "../../site.config";
import { allPublished, postPath } from "../lib/posts";
import { isThinListing } from "../lib/seo";

export async function GET(_context: APIContext) {
  const posts = await allPublished();
  const staticPages = ["/", "/about/", "/sources/", "/privacy/", "/terms/", "/contact/", "/archive/"];
  const urls = [
    ...staticPages.map((path) => ({ loc: absoluteUrl(path), lastmod: siteConfig.legalUpdated })),
    ...siteConfig.categories.map((category) => ({ loc: absoluteUrl(`/category/${category.id}/`), lastmod: siteConfig.legalUpdated })),
    ...siteConfig.tags
      .filter((tag) => !isThinListing(posts.filter((post) => post.data.tags.includes(tag.id)).length))
      .map((tag) => ({ loc: absoluteUrl(`/tag/${tag.id}/`), lastmod: siteConfig.legalUpdated })),
    ...siteConfig.regions
      .filter((region) => !isThinListing(posts.filter((post) => post.data.region_id === region.id).length))
      .map((region) => ({ loc: absoluteUrl(`/region/${region.id}/`), lastmod: siteConfig.legalUpdated })),
    ...posts.map((post) => ({ loc: absoluteUrl(postPath(post.id)), lastmod: post.data.updated })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
