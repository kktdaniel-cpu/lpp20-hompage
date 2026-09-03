import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
} from "recharts";
import { Globe, Search, Share2, Link2, TrendingUp } from "lucide-react";
import AdminLayout from "./AdminLayout";

// ─── 채널 설정 ─────────────────────────────────────────────────────────────────
const CHANNEL_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  direct:   { label: "직접 방문",   color: "#2D6A4F", icon: Globe },
  search:   { label: "검색 엔진",   color: "#C9A84C", icon: Search },
  social:   { label: "소셜 미디어", color: "#0EA5E9", icon: Share2 },
  external: { label: "외부 링크",   color: "#8B5CF6", icon: Link2 },
};

// ─── 기간 선택 탭 ─────────────────────────────────────────────────────────────
const PERIOD_OPTIONS = [
  { label: "7일",  value: 7 },
  { label: "30일", value: 30 },
  { label: "90일", value: 90 },
];

// ─── 커스텀 툴팁 ──────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl text-sm" style={{ backgroundColor: "#1A2E45", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
      <div className="text-white/50 text-xs mb-1">{label}</div>
      <div className="font-bold">{payload[0].value.toLocaleString()}회</div>
    </div>
  );
}

// ─── 채널 카드 ────────────────────────────────────────────────────────────────
function ChannelCard({ channel, count, total }: { channel: string; count: number; total: number }) {
  const cfg = CHANNEL_CONFIG[channel] ?? { label: channel, color: "#888", icon: Globe };
  const Icon = cfg.icon;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: cfg.color + "22" }}>
            <Icon size={16} style={{ color: cfg.color }} />
          </div>
          <span className="text-white/70 text-sm">{cfg.label}</span>
        </div>
        <span className="text-white/40 text-xs">{pct}%</span>
      </div>
      <div className="text-2xl font-bold text-white mb-2">{count.toLocaleString()}</div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
      </div>
    </div>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function AdminTraffic() {
  const [days, setDays] = useState(30);
  const { data, isLoading } = trpc.analytics.traffic.useQuery({ days });

  const totalVisits = data?.channels.reduce((s, c) => s + c.count, 0) ?? 0;

  // 파이차트 데이터
  const pieData = (data?.channels ?? []).map(c => ({
    name: CHANNEL_CONFIG[c.channel]?.label ?? c.channel,
    value: c.count,
    color: CHANNEL_CONFIG[c.channel]?.color ?? "#888",
  }));

  // 일별 방문 데이터
  const lineData = (data?.dailyViews ?? []).map(d => ({
    date: d.date?.slice(5) ?? "",
    방문: Number(d.count),
  }));

  // 시간대별 데이터
  const hourlyData = (data?.hourly ?? []).map(h => ({
    hour: `${h.hour}시`,
    방문: h.count,
  }));

  // 요일별 데이터
  const dowData = data?.dayOfWeek ?? [];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">유입 경로 분석</h1>
            <p className="text-white/40 text-sm">방문자가 어디서 유입되는지 파악하세요.</p>
          </div>
          {/* 기간 선택 */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
            {PERIOD_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setDays(opt.value)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: days === opt.value ? "#2D6A4F" : "transparent",
                  color: days === opt.value ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-white/40">분석 중...</div>
        ) : (
          <>
            {/* 채널 카드 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {["direct", "search", "social", "external"].map(ch => {
                const found = data?.channels.find(c => c.channel === ch);
                return <ChannelCard key={ch} channel={ch} count={found?.count ?? 0} total={totalVisits} />;
              })}
            </div>

            {/* 채널 파이차트 + 일별 추이 */}
            <div className="grid lg:grid-cols-5 gap-6 mb-6">
              {/* 파이차트 */}
              <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 className="text-white font-semibold mb-4">채널 비율</h2>
                {totalVisits > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1A2E45", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        formatter={(v: number) => [`${v.toLocaleString()}회`, ""]}
                      />
                      <Legend
                        formatter={(value) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-52 flex items-center justify-center text-white/30 text-sm">데이터 없음</div>
                )}
              </div>

              {/* 일별 방문 추이 */}
              <div className="lg:col-span-3 rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 className="text-white font-semibold mb-4">일별 방문 추이</h2>
                {lineData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={lineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="방문" stroke="#2D6A4F" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#2D6A4F" }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-52 flex items-center justify-center text-white/30 text-sm">데이터 없음</div>
                )}
              </div>
            </div>

            {/* 시간대별 + 요일별 */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* 시간대별 */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 className="text-white font-semibold mb-4">시간대별 방문 패턴</h2>
                {hourlyData.some(h => h.방문 > 0) ? (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={hourlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="hour" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false}
                        tickFormatter={(v) => v.replace("시", "")} interval={3} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="방문" fill="#C9A84C" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-44 flex items-center justify-center text-white/30 text-sm">데이터 없음</div>
                )}
              </div>

              {/* 요일별 */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 className="text-white font-semibold mb-4">요일별 방문 패턴</h2>
                {dowData.some(d => d.count > 0) ? (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={dowData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" name="방문" fill="#0EA5E9" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-44 flex items-center justify-center text-white/30 text-sm">데이터 없음</div>
                )}
              </div>
            </div>

            {/* 상위 유입 URL */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={18} style={{ color: "#C9A84C" }} />
                <h2 className="text-white font-semibold">상위 유입 URL</h2>
                <span className="text-white/30 text-xs ml-auto">직접 방문 제외</span>
              </div>
              {data?.topReferrers && data.topReferrers.length > 0 ? (
                <div className="space-y-2">
                  {data.topReferrers.map((r, i) => {
                    const maxCount = data.topReferrers[0]?.count ?? 1;
                    const pct = Math.round((r.count / maxCount) * 100);
                    const channel = (() => {
                      const url = r.referrer.toLowerCase();
                      if (["google.", "naver.", "daum.", "bing.", "yahoo.", "duckduckgo."].some(s => url.includes(s))) return "search";
                      if (["facebook.", "instagram.", "twitter.", "t.co", "linkedin.", "youtube.", "kakao.", "band."].some(s => url.includes(s))) return "social";
                      return "external";
                    })();
                    const color = CHANNEL_CONFIG[channel]?.color ?? "#888";
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                        <span className="text-white/30 text-xs w-5 text-right flex-shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-white/80 text-xs truncate mb-1.5">{r.referrer}</div>
                          <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                          </div>
                        </div>
                        <span className="text-white/50 text-xs flex-shrink-0 ml-2">{r.count.toLocaleString()}회</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-white/30 text-sm text-center py-8">외부 유입 데이터가 없습니다.</div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
