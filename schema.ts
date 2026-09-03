import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  bigint,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 블로그/인사이트 게시물 테이블
 */
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: mysqlEnum("category", ["senior", "moss", "company", "news"]).notNull().default("company"),
  summary: text("summary"),
  content: text("content"),
  coverImage: varchar("coverImage", { length: 500 }),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  authorId: int("authorId"),
  viewCount: int("viewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

/**
 * 문의 테이블 (Contact 폼 수신)
 */
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["partnership", "investment", "individual", "other"]).notNull().default("other"),
  name: varchar("name", { length: 100 }).notNull(),
  company: varchar("company", { length: 200 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied", "closed"]).default("new").notNull(),
  adminNote: text("adminNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

/**
 * 페이지뷰 통계 테이블
 */
export const pageViews = mysqlTable("page_views", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  path: varchar("path", { length: 500 }).notNull(),
  referrer: varchar("referrer", { length: 500 }),
  userAgent: varchar("userAgent", { length: 500 }),
  ip: varchar("ip", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;

/**
 * 2막1장 인생 후반기 종합 진단 데이터 테이블
 */
export const diagnostics = mysqlTable("diagnostics", {
  id: int("id").autoincrement().primaryKey(),
  // 기본 정보
  age: int("age"),
  gender: mysqlEnum("gender", ["male", "female"]),
  jobType: mysqlEnum("jobType", ["employee", "self_employed", "freelancer", "other"]),
  jobYears: varchar("jobYears", { length: 50 }),
  salary: varchar("salary", { length: 50 }),
  // 재무 현황
  monthlyExpense: varchar("monthlyExpense", { length: 50 }),
  assetTypes: text("assetTypes"), // JSON array
  monthlyInvestment: varchar("monthlyInvestment", { length: 50 }),
  // 보험 진단 (JSON)
  cancerInsurance: text("cancerInsurance"),
  brainInsurance: text("brainInsurance"),
  heartInsurance: text("heartInsurance"),
  healthConcerns: text("healthConcerns"), // JSON array
  // 가족 및 상속
  inheritanceAmount: varchar("inheritanceAmount", { length: 50 }),
  welldyingInterests: text("welldyingInterests"), // JSON array
  // 진단 결과
  financialScore: int("financialScore"),
  resultSummary: text("resultSummary"),
  // 연락처 (선택)
  contactName: varchar("contactName", { length: 100 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  // 메타
  sessionId: varchar("sessionId", { length: 100 }),
  referrer: varchar("referrer", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Diagnostic = typeof diagnostics.$inferSelect;
export type InsertDiagnostic = typeof diagnostics.$inferInsert;