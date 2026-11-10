import { z } from "astro/zod";
import { siteConfig } from "../../site.config";

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜는 YYYY-MM-DD");
const stamp = z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/, "날짜 또는 날짜와 시각");
const nullableText = z.string().nullable();
const nullableStamp = stamp.nullable();
const categoryIds = siteConfig.categories.map((category) => category.id) as [string, ...string[]];
const tagIds = siteConfig.tags.map((tag) => tag.id) as [string, ...string[]];
const regionIds = siteConfig.regions.map((region) => region.id) as [string, ...string[]];

export const statuses = ["draft", "needs_review", "approved", "published", "stale"] as const;

const httpsUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), "출처는 https 주소");

export const sourceSchema = z
  .object({
    title: z.string().min(2),
    url: httpsUrl,
    checked_at: dateString,
  })
  .strict();

export const placeSchema = z
  .object({
    place_id: nullableText,
    official_name: nullableText,
    address: nullableText,
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    opening_hours: nullableText,
    weekly_closed_days: z.array(z.string()),
    temporary_closure: nullableText,
    admission: nullableText,
    official_url: httpsUrl.nullable(),
  })
  .strict();

export const summarySchema = z
  .object({
    location: nullableText,
    map_url: httpsUrl.nullable(),
    hours: nullableText,
    weekly_closed: nullableText,
    temporary_closure: nullableText,
    admission: nullableText,
    parking: nullableText,
    transit: nullableText,
    official_url: httpsUrl.nullable(),
  })
  .strict();

export const parkingLotSchema = z
  .object({
    parking_id: z.string().min(1),
    label: z.string().min(1),
    parking_name: nullableText,
    road_address: nullableText,
    lat: z.number().nullable(),
    lng: z.number().nullable(),
    entrance_note: nullableText,
    operating_days: nullableText,
    open_hours: nullableText,
    fee_text: nullableText,
    walking_text: nullableText,
    feature: nullableText,
    capacity: nullableText,
    restrictions: nullableText,
    verified_at: nullableStamp,
    source_url: httpsUrl.nullable(),
  })
  .strict();

export const transportLegSchema = z
  .object({
    summary: nullableText,
    steps: z.array(z.string()),
    note: nullableText,
  })
  .strict();

export const restaurantSchema = z
  .object({
    name: z.string().min(1),
    kind: nullableText,
    address: nullableText,
    access: nullableText,
    rating_text: nullableText,
    review_count_text: nullableText,
    review_scope: nullableText,
    menu: nullableText,
    hours: nullableText,
    parking: nullableText,
    source_url: httpsUrl.nullable(),
    source_label: nullableText,
  })
  .strict();

export const routeMapSchema = z
  .object({
    src: z.string().regex(/^\//, "이미지 경로는 /로 시작").nullable(),
    alt: z.string().min(4),
    caption: nullableText,
    schematic: z.boolean(),
    verified: z.boolean(),
  })
  .strict();

const bareClaims = /^(무료|연중무휴|없음|항상 운영|도보\s*\d+\s*분)$/;

function rejectBareClaim(value: string | null, ctx: z.RefinementCtx, path: (string | number)[]) {
  if (value && bareClaims.test(value.trim())) {
    ctx.addIssue({
      code: "custom",
      path,
      message: `비어 있는 값을 ${value.trim()} 으로 채우지 않습니다. 확인되지 않음으로 두세요.`,
    });
  }
}

export const postSchema = z
  .object({
    title: z.string().min(8),
    description: z.string().min(40).max(180),
    date: dateString,
    updated: dateString,
    publishAt: stamp.optional(),
    draft: z.boolean(),
    category: z.enum(categoryIds),
    tags: z.array(z.enum(tagIds)).min(1),
    status: z.enum(statuses),
    /** 화면 표시용 지역 이름. 실재 확인 전이면 null */
    region: nullableText,
    region_id: z.enum(regionIds).nullable(),
    verified_at: nullableStamp,
    published_at: dateString.nullable(),
    /** 맨 위 3줄. 1~3개 */
    lede: z.array(z.string().min(4)).min(1).max(3),
    /** 카드에 붙이는 주제 라벨. 요금·휴무의 단정이 아닙니다. */
    preview_topics: z.array(z.string().min(1)).max(4),
    sample: z.boolean(),
    place: placeSchema,
    summary: summarySchema,
    parking_lots: z.array(parkingLotSchema),
    transport: z
      .object({
        car: transportLegSchema,
        walk: transportLegSchema,
        rail: transportLegSchema,
      })
      .strict(),
    route_map: routeMapSchema.nullable(),
    restaurants: z.array(restaurantSchema),
    cautions: z.array(z.string()),
    sources: z.array(sourceSchema),
    related_slugs: z.array(z.string()),
    hero_image: z.string().regex(/^\//).nullable(),
    hero_alt: nullableText,
    author: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((post, ctx) => {
    rejectBareClaim(post.summary.hours, ctx, ["summary", "hours"]);
    rejectBareClaim(post.summary.weekly_closed, ctx, ["summary", "weekly_closed"]);
    rejectBareClaim(post.summary.admission, ctx, ["summary", "admission"]);
    rejectBareClaim(post.summary.parking, ctx, ["summary", "parking"]);
    rejectBareClaim(post.place.opening_hours, ctx, ["place", "opening_hours"]);
    rejectBareClaim(post.place.admission, ctx, ["place", "admission"]);
    for (const day of post.place.weekly_closed_days) rejectBareClaim(day, ctx, ["place", "weekly_closed_days"]);
    for (const [index, lot] of post.parking_lots.entries()) {
      rejectBareClaim(lot.fee_text, ctx, ["parking_lots", index, "fee_text"]);
      rejectBareClaim(lot.walking_text, ctx, ["parking_lots", index, "walking_text"]);
      rejectBareClaim(lot.open_hours, ctx, ["parking_lots", index, "open_hours"]);
      if (lot.fee_text && /원/.test(lot.fee_text) && !/(분|시간|일|회|대)/.test(lot.fee_text)) {
        ctx.addIssue({
          code: "custom",
          path: ["parking_lots", index, "fee_text"],
          message: "주차 요금에는 분·시간·일·회·대 단위가 필요합니다.",
        });
      }
      if (!post.draft && lot.walking_text && !lot.verified_at) {
        ctx.addIssue({
          code: "custom",
          path: ["parking_lots", index, "walking_text"],
          message: "도보 정보를 발행하려면 그 주차장의 verified_at이 필요합니다.",
        });
      }
    }
    if (post.hero_image && !post.hero_alt?.trim()) {
      ctx.addIssue({ code: "custom", path: ["hero_alt"], message: "hero_image가 있으면 hero_alt가 필요합니다." });
    }
    if (post.route_map && !post.route_map.schematic && !post.route_map.verified) {
      ctx.addIssue({
        code: "custom",
        path: ["route_map"],
        message: "검증하지 않은 동선 그림은 schematic: true 로 개념도라고 밝혀야 합니다.",
      });
    }
    if (post.route_map?.verified && !post.route_map.src) {
      ctx.addIssue({ code: "custom", path: ["route_map", "src"], message: "검증된 지도는 이미지 경로가 필요합니다." });
    }
    if (post.route_map?.src?.includes("/brand/samples") || post.hero_image?.includes("/brand/samples")) {
      ctx.addIssue({ code: "custom", message: "디자인 샘플 이미지는 글의 사진으로 쓰지 않습니다." });
    }
    if (!post.draft && post.sample) {
      ctx.addIssue({ code: "custom", message: "sample 글은 draft: true 로 두어야 합니다." });
    }
    if (!post.draft && post.status !== "approved" && post.status !== "published") {
      ctx.addIssue({ code: "custom", message: "발행하려면 status가 approved 또는 published여야 합니다." });
    }
    if (post.draft && post.status === "published") {
      ctx.addIssue({ code: "custom", message: "published 상태이면 draft는 false여야 합니다." });
    }
    if (!post.draft && post.sources.length < 1) {
      ctx.addIssue({ code: "custom", path: ["sources"], message: "발행 글에는 출처가 하나 이상 필요합니다." });
    }
    if (!post.draft && !post.verified_at) {
      ctx.addIssue({ code: "custom", path: ["verified_at"], message: "발행 글에는 verified_at이 필요합니다." });
    }
  });

export type PostFrontmatter = z.infer<typeof postSchema>;
export type ParkingLot = z.infer<typeof parkingLotSchema>;
export type Restaurant = z.infer<typeof restaurantSchema>;
export type TransportLeg = z.infer<typeof transportLegSchema>;
