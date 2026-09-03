import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createDiagnostic,
  createInquiry,
  createPost,
  deletePost,
  getAdminStats,
  getAllUsers,
  getDailyPageViews,
  getDayOfWeekPattern,
  getDiagnosticById,
  getDiagnostics,
  getDiagnosticsCount,
  getHourlyVisitPattern,
  getInquiries,
  getInquiriesCount,
  getInquiryById,
  getPageViewStats,
  getPostById,
  getPosts,
  getPostsCount,
  getReferrerChannelStats,
  getTopReferrers,
  getTotalPageViews,
  recordPageView,
  updateInquiry,
  updatePost,
  updateUserRole,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { sendInquiryNotificationEmail } from "./_core/email";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "관리자 권한이 필요합니다." });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  analytics: router({
    track: publicProcedure
      .input(z.object({ path: z.string(), referrer: z.string().optional() }))
      .mutation(async ({ input, ctx }) => {
        const ip = (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "";
        const userAgent = ctx.req.headers["user-agent"] || "";
        await recordPageView({ path: input.path, referrer: input.referrer, userAgent, ip });
        return { success: true };
      }),

    stats: adminProcedure
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const [pageStats, dailyViews, totalViews, totalMonth] = await Promise.all([
          getPageViewStats(input.days),
          getDailyPageViews(14),
          getTotalPageViews(),
          getTotalPageViews(30),
        ]);
        return { pageStats, dailyViews, totalViews, totalMonth };
      }),

    traffic: adminProcedure
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const [channels, topReferrers, hourly, dayOfWeek, dailyViews] = await Promise.all([
          getReferrerChannelStats(input.days),
          getTopReferrers(input.days, 20),
          getHourlyVisitPattern(input.days),
          getDayOfWeekPattern(input.days),
          getDailyPageViews(input.days),
        ]);
        return { channels, topReferrers, hourly, dayOfWeek, dailyViews };
      }),
  }),

  posts: router({
    list: publicProcedure
      .input(z.object({
        category: z.enum(["senior", "moss", "company", "news"]).optional(),
        limit: z.number().default(10),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const items = await getPosts({ published: true, category: input.category, limit: input.limit, offset: input.offset });
        const total = await getPostsCount(true);
        return { items, total };
      }),

    adminList: adminProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
      .query(async ({ input }) => {
        const items = await getPosts({ limit: input.limit, offset: input.offset });
        const total = await getPostsCount();
        const published = await getPostsCount(true);
        return { items, total, published, drafts: total - published };
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        category: z.enum(["senior", "moss", "company", "news"]),
        summary: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input, ctx }) => {
        return createPost({
          ...input,
          authorId: ctx.user.id,
          publishedAt: input.published ? new Date() : undefined,
        });
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        category: z.enum(["senior", "moss", "company", "news"]).optional(),
        summary: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const existing = await getPostById(id);
        if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
        const updateData: Record<string, unknown> = { ...data };
        if (data.published && !existing.published) updateData.publishedAt = new Date();
        return updatePost(id, updateData as Parameters<typeof updatePost>[1]);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePost(input.id);
        return { success: true };
      }),
  }),

  inquiries: router({
    submit: publicProcedure
      .input(z.object({
        type: z.enum(["partnership", "investment", "individual", "other"]),
        name: z.string().min(1),
        company: z.string().nullish().transform(v => v ?? undefined),
        email: z.string().email(),
        phone: z.string().nullish().transform(v => v ?? undefined),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const inquiry = await createInquiry(input);
        // Manus 알림 (앱 내 푸시)
        await notifyOwner({
          title: `새 문의: ${input.type === "partnership" ? "파트너십" : input.type === "investment" ? "투자" : input.type === "individual" ? "개인" : "기타"}`,
          content: `발신: ${input.name} (${input.email})\n${input.company ? `소속: ${input.company}\n` : ""}내용: ${input.message.slice(0, 200)}`,
        });
        // 이메일 알림 (Daniel@lpp20.com)
        await sendInquiryNotificationEmail({
          type: input.type,
          name: input.name,
          company: input.company,
          email: input.email,
          phone: input.phone,
          message: input.message,
        });
        return { success: true, id: inquiry?.id };
      }),

    list: adminProcedure
      .input(z.object({
        status: z.enum(["new", "read", "replied", "closed"]).optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const items = await getInquiries({ status: input.status, limit: input.limit, offset: input.offset });
        const [total, newCount, repliedCount] = await Promise.all([
          getInquiriesCount(),
          getInquiriesCount("new"),
          getInquiriesCount("replied"),
        ]);
        return { items, total, newCount, repliedCount };
      }),

    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "closed"]),
        adminNote: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateInquiry(id, data);
      }),

    get: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const item = await getInquiryById(input.id);
        if (!item) throw new TRPCError({ code: "NOT_FOUND" });
        return item;
      }),
  }),

  // ─── Diagnostics ─────────────────────────────────────────────────────────────
  diagnostics: router({
    // 외부 2막1장 링크에서 POST하는 공개 API
    submit: publicProcedure
      .input(z.object({
        age: z.number().optional(),
        gender: z.enum(["male", "female"]).optional(),
        jobType: z.enum(["employee", "self_employed", "freelancer", "other"]).optional(),
        jobYears: z.string().optional(),
        salary: z.string().optional(),
        monthlyExpense: z.string().optional(),
        assetTypes: z.string().optional(),
        monthlyInvestment: z.string().optional(),
        cancerInsurance: z.string().optional(),
        brainInsurance: z.string().optional(),
        heartInsurance: z.string().optional(),
        healthConcerns: z.string().optional(),
        inheritanceAmount: z.string().optional(),
        welldyingInterests: z.string().optional(),
        financialScore: z.number().optional(),
        resultSummary: z.string().optional(),
        contactName: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
        sessionId: z.string().optional(),
        referrer: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createDiagnostic(input);
        await notifyOwner({
          title: `새 2막1장 진단 접수`,
          content: `나이: ${input.age ?? "-"}세 | 성별: ${input.gender === "male" ? "남성" : input.gender === "female" ? "여성" : "-"} | 점수: ${input.financialScore ?? "-"}\n${input.contactName ? `연락정보: ${input.contactName} (${input.contactEmail})` : ""}`,
        }).catch(() => {});
        return { success: true, id: result?.id };
      }),

    list: adminProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
      .query(async ({ input }) => {
        const [items, total] = await Promise.all([
          getDiagnostics({ limit: input.limit, offset: input.offset }),
          getDiagnosticsCount(),
        ]);
        return { items, total };
      }),

    get: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const item = await getDiagnosticById(input.id);
        if (!item) throw new TRPCError({ code: "NOT_FOUND" });
        return item;
      }),
  }),

  // ─── Admin ────────────────────────────────────────────────────────────────────
  admin: router({
    stats: adminProcedure.query(async () => getAdminStats()),

    users: router({
      list: adminProcedure
        .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
        .query(async ({ input }) => {
          const items = await getAllUsers({ limit: input.limit, offset: input.offset });
          return { items, total: items.length };
        }),

      updateRole: adminProcedure
        .input(z.object({ id: z.number(), role: z.enum(["user", "admin"]) }))
        .mutation(async ({ input, ctx }) => {
          if (input.id === ctx.user.id) throw new TRPCError({ code: "BAD_REQUEST", message: "자신의 권한은 변경할 수 없습니다." });
          await updateUserRole(input.id, input.role);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
