import { and, desc, eq, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertDiagnostic,
  InsertInquiry,
  InsertPageView,
  InsertPost,
  InsertUser,
  diagnostics,
  inquiries,
  pageViews,
  posts,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export async function getPosts(options?: { published?: boolean; category?: string; limit?: number; offset?: number }) {
  const db = await getDb();
  if (!db) return [];
  const conditions: ReturnType<typeof eq>[] = [];
  if (options?.published !== undefined) conditions.push(eq(posts.published, options.published));
  if (options?.category) conditions.push(eq(posts.category, options.category as "senior" | "moss" | "company" | "news"));
  let query = db.select().from(posts).orderBy(desc(posts.createdAt)).$dynamic();
  if (conditions.length > 0) query = query.where(and(...conditions));
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.offset(options.offset);
  return await query;
}

export async function getPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0];
}

export async function getPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return result[0];
}

export async function createPost(data: InsertPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(posts).values(data);
  const result = await db.select().from(posts).where(eq(posts.slug, data.slug)).limit(1);
  return result[0];
}

export async function updatePost(id: number, data: Partial<InsertPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(posts).set(data).where(eq(posts.id, id));
  return getPostById(id);
}

export async function deletePost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(posts).where(eq(posts.id, id));
}

export async function getPostsCount(published?: boolean) {
  const db = await getDb();
  if (!db) return 0;
  const conditions = published !== undefined ? [eq(posts.published, published)] : [];
  const result = await db.select({ count: sql<number>`count(*)` }).from(posts).where(conditions.length > 0 ? and(...conditions) : undefined);
  return Number(result[0]?.count ?? 0);
}

// ─── Inquiries ────────────────────────────────────────────────────────────────

export async function createInquiry(data: InsertInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(inquiries).values(data);
  const result = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(1);
  return result[0];
}

export async function getInquiries(options?: { status?: string; limit?: number; offset?: number }) {
  const db = await getDb();
  if (!db) return [];
  const conditions: ReturnType<typeof eq>[] = [];
  if (options?.status) conditions.push(eq(inquiries.status, options.status as "new" | "read" | "replied" | "closed"));
  let query = db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).$dynamic();
  if (conditions.length > 0) query = query.where(and(...conditions));
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.offset(options.offset);
  return await query;
}

export async function getInquiryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return result[0];
}

export async function updateInquiry(id: number, data: Partial<InsertInquiry>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(inquiries).set(data).where(eq(inquiries.id, id));
  return getInquiryById(id);
}

export async function getInquiriesCount(status?: string) {
  const db = await getDb();
  if (!db) return 0;
  const conditions = status ? [eq(inquiries.status, status as "new" | "read" | "replied" | "closed")] : [];
  const result = await db.select({ count: sql<number>`count(*)` }).from(inquiries).where(conditions.length > 0 ? and(...conditions) : undefined);
  return Number(result[0]?.count ?? 0);
}

// ─── PageViews ────────────────────────────────────────────────────────────────

export async function recordPageView(data: InsertPageView) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pageViews).values(data);
}

export async function getPageViewStats(days: number = 30) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  return await db
    .select({ path: pageViews.path, count: sql<number>`count(*)` })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(pageViews.path)
    .orderBy(desc(sql`count(*)`));
}

export async function getDailyPageViews(days: number = 14) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  return await db
    .select({
      date: sql<string>`DATE(${pageViews.createdAt})`,
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`DATE(${pageViews.createdAt})`)
    .orderBy(sql`DATE(${pageViews.createdAt})`);
}

export async function getTotalPageViews(days?: number) {
  const db = await getDb();
  if (!db) return 0;
  const conditions = days
    ? [gte(pageViews.createdAt, (() => { const d = new Date(); d.setDate(d.getDate() - days); return d; })())]
    : [];
  const result = await db.select({ count: sql<number>`count(*)` }).from(pageViews).where(conditions.length > 0 ? and(...conditions) : undefined);
  return Number(result[0]?.count ?? 0);
}

// ─── Diagnostics ─────────────────────────────────────────────────────────────

export async function createDiagnostic(data: InsertDiagnostic) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(diagnostics).values(data);
  const result = await db.select().from(diagnostics).orderBy(desc(diagnostics.createdAt)).limit(1);
  return result[0];
}

export async function getDiagnostics(options?: { limit?: number; offset?: number }) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(diagnostics).orderBy(desc(diagnostics.createdAt)).$dynamic();
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.offset(options.offset);
  return await query;
}

export async function getDiagnosticById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(diagnostics).where(eq(diagnostics.id, id)).limit(1);
  return result[0];
}

export async function getDiagnosticsCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(diagnostics);
  return Number(result[0]?.count ?? 0);
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const db = await getDb();
  if (!db) return { totalInquiries: 0, newInquiries: 0, totalDiagnostics: 0, totalUsers: 0, totalPageViews: 0 };

  const [inquiryTotal, inquiryNew, diagTotal, userTotal, pvTotal] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(inquiries),
    db.select({ count: sql<number>`count(*)` }).from(inquiries).where(eq(inquiries.status, "new")),
    db.select({ count: sql<number>`count(*)` }).from(diagnostics),
    db.select({ count: sql<number>`count(*)` }).from(users),
    db.select({ count: sql<number>`count(*)` }).from(pageViews),
  ]);

  return {
    totalInquiries: Number(inquiryTotal[0]?.count ?? 0),
    newInquiries: Number(inquiryNew[0]?.count ?? 0),
    totalDiagnostics: Number(diagTotal[0]?.count ?? 0),
    totalUsers: Number(userTotal[0]?.count ?? 0),
    totalPageViews: Number(pvTotal[0]?.count ?? 0),
  };
}

export async function getAllUsers(options?: { limit?: number; offset?: number }) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(users).orderBy(desc(users.createdAt)).$dynamic();
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.offset(options.offset);
  return await query;
}

export async function updateUserRole(id: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ role }).where(eq(users.id, id));
}

// ─── Traffic / Referrer Analysis ─────────────────────────────────────────────

/**
 * referrer URL을 채널로 분류하는 헬퍼
 * direct | search | social | external
 */
export function classifyReferrer(referrer: string | null | undefined): string {
  if (!referrer || referrer.trim() === "" || referrer === "direct") return "direct";
  const url = referrer.toLowerCase();
  const searchEngines = ["google.", "naver.", "daum.", "bing.", "yahoo.", "duckduckgo.", "baidu.", "yandex."];
  const socialNetworks = ["facebook.", "instagram.", "twitter.", "t.co", "linkedin.", "youtube.", "tiktok.", "kakao.", "band.us", "blog.naver."];
  if (searchEngines.some(s => url.includes(s))) return "search";
  if (socialNetworks.some(s => url.includes(s))) return "social";
  return "external";
}

/** 채널별 방문 수 (기간 필터 포함) */
export async function getReferrerChannelStats(days: number = 30) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  const rows = await db
    .select({ referrer: pageViews.referrer, count: sql<number>`count(*)` })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(pageViews.referrer)
    .orderBy(desc(sql`count(*)`));

  // 채널별 집계
  const channelMap: Record<string, number> = { direct: 0, search: 0, social: 0, external: 0 };
  for (const row of rows) {
    const ch = classifyReferrer(row.referrer);
    channelMap[ch] = (channelMap[ch] ?? 0) + Number(row.count);
  }
  return Object.entries(channelMap).map(([channel, count]) => ({ channel, count }));
}

/** 상위 referrer URL 목록 (direct 제외) */
export async function getTopReferrers(days: number = 30, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  const rows = await db
    .select({ referrer: pageViews.referrer, count: sql<number>`count(*)` })
    .from(pageViews)
    .where(and(gte(pageViews.createdAt, since), sql`${pageViews.referrer} IS NOT NULL AND ${pageViews.referrer} != ''`))
    .groupBy(pageViews.referrer)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
  return rows.map(r => ({ referrer: r.referrer ?? "", count: Number(r.count) }));
}

/** 시간대별 방문 패턴 (0~23시) */
export async function getHourlyVisitPattern(days: number = 30) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  const rows = await db
    .select({
      hour: sql<number>`HOUR(${pageViews.createdAt})`,
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`HOUR(${pageViews.createdAt})`)
    .orderBy(sql`HOUR(${pageViews.createdAt})`);
  // 0~23 모든 시간대를 채워서 반환
  const hourMap: Record<number, number> = {};
  for (const row of rows) hourMap[Number(row.hour)] = Number(row.count);
  return Array.from({ length: 24 }, (_, h) => ({ hour: h, count: hourMap[h] ?? 0 }));
}

/** 요일별 방문 패턴 (0=일, 6=토) */
export async function getDayOfWeekPattern(days: number = 30) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  const rows = await db
    .select({
      dow: sql<number>`DAYOFWEEK(${pageViews.createdAt})`, // 1=일, 7=토
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`DAYOFWEEK(${pageViews.createdAt})`)
    .orderBy(sql`DAYOFWEEK(${pageViews.createdAt})`);
  const dowLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const dowMap: Record<number, number> = {};
  for (const row of rows) dowMap[Number(row.dow)] = Number(row.count);
  // MySQL DAYOFWEEK: 1=Sun, 2=Mon, ..., 7=Sat
  return Array.from({ length: 7 }, (_, i) => ({
    day: dowLabels[i],
    count: dowMap[i + 1] ?? 0,
  }));
}
