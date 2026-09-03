import { trpc } from "@/lib/trpc";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FileText, Inbox, Eye, TrendingUp, Clock, CheckCircle } from "lucide-react";
import AdminLayout from "./AdminLayout";

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/50 text-sm">{label}</span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "22" }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      {sub && <div className="text-white/40 text-xs">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = trpc.analytics.stats.useQuery({ days: 30 });
  const { data: posts } = trpc.posts.adminList.useQuery({ limit: 5 });
  const { data: inquiries } = trpc.inquiries.list.useQuery({ limit: 5 });

  const chartData = stats?.dailyViews?.map((d) => ({
    date: d.date?.slice(5) ?? "",
    views: Number(d.count),
  })) ?? [];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">대시보드</h1>
          <p className="text-white/40 text-sm">Life 2.0 홈페이지 현황을 한눈에 확인하세요.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Eye} label="총 페이지뷰" value={statsLoading ? "..." : (stats?.totalViews ?? 0).toLocaleString()} sub="전체 누적" color="#2D6A4F" />
          <StatCard icon={TrendingUp} label="이번 달 조회" value={statsLoading ? "..." : (stats?.totalMonth ?? 0).toLocaleString()} sub="최근 30일" color="#40916C" />
          <StatCard icon={FileText} label="게시물" value={posts?.total ?? 0} sub={`발행 ${posts?.published ?? 0} / 초안 ${posts?.drafts ?? 0}`} color="#1B4F72" />
          <StatCard icon={Inbox} label="새 문의" value={inquiries?.newCount ?? 0} sub={`전체 ${inquiries?.total ?? 0}건`} color="#C0392B" />
        </div>

        {/* Chart + Recent */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Views Chart */}
          <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="text-white font-semibold mb-6">일별 페이지뷰 (최근 14일)</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1A2E45", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                    labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                  />
                  <Bar dataKey="views" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-52 flex items-center justify-center text-white/30 text-sm">
                아직 방문 데이터가 없습니다.
              </div>
            )}
          </div>

          {/* Top Pages */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="text-white font-semibold mb-6">인기 페이지</h2>
            {stats?.pageStats && stats.pageStats.length > 0 ? (
              <div className="space-y-3">
                {stats.pageStats.slice(0, 8).map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-white/30 text-xs w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white/80 text-xs truncate">{p.path}</div>
                    </div>
                    <span className="text-white/50 text-xs">{Number(p.count).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white/30 text-sm text-center mt-8">데이터 없음</div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-semibold">최근 문의</h2>
            <a href="/admin/inquiries" className="text-xs px-3 py-1 rounded-lg text-white/60 hover:text-white transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
              전체 보기
            </a>
          </div>
          {inquiries?.items && inquiries.items.length > 0 ? (
            <div className="space-y-3">
              {inquiries.items.slice(0, 5).map((inq) => (
                <div key={inq.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${inq.status === "new" ? "bg-red-400" : inq.status === "read" ? "bg-yellow-400" : "bg-green-400"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{inq.name}</div>
                    <div className="text-white/40 text-xs truncate">{inq.email} · {inq.message.slice(0, 40)}...</div>
                  </div>
                  <div className="text-white/30 text-xs flex-shrink-0">
                    {new Date(inq.createdAt).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/30 text-sm text-center py-8">아직 문의가 없습니다.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
