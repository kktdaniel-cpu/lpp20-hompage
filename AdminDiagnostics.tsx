import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Activity, ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import AdminLayout from "./AdminLayout";

type DiagnosticItem = {
  id: number;
  age: number | null;
  gender: "male" | "female" | null;
  jobType: string | null;
  salary: string | null;
  financialScore: number | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  resultSummary: string | null;
  createdAt: Date;
  [key: string]: unknown;
};

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-white/30 text-xs">-</span>;
  const color = score >= 70 ? "#2D6A4F" : score >= 40 ? "#B7791F" : "#C0392B";
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: color }}>
      {score}점
    </span>
  );
}

function DetailModal({ item, onClose }: { item: DiagnosticItem; onClose: () => void }) {
  const fields: { label: string; key: keyof DiagnosticItem }[] = [
    { label: "나이", key: "age" },
    { label: "성별", key: "gender" },
    { label: "직업 유형", key: "jobType" },
    { label: "근무 연수", key: "jobYears" },
    { label: "월 급여", key: "salary" },
    { label: "월 지출", key: "monthlyExpense" },
    { label: "월 투자액", key: "monthlyInvestment" },
    { label: "보유 자산 유형", key: "assetTypes" },
    { label: "암보험", key: "cancerInsurance" },
    { label: "뇌혈관보험", key: "brainInsurance" },
    { label: "심장보험", key: "heartInsurance" },
    { label: "건강 관심사", key: "healthConcerns" },
    { label: "상속 자산", key: "inheritanceAmount" },
    { label: "웰다잉 관심사", key: "welldyingInterests" },
    { label: "진단 점수", key: "financialScore" },
    { label: "결과 요약", key: "resultSummary" },
    { label: "이름", key: "contactName" },
    { label: "이메일", key: "contactEmail" },
    { label: "전화번호", key: "contactPhone" },
    { label: "세션 ID", key: "sessionId" },
    { label: "유입 경로", key: "referrer" },
  ];

  const formatValue = (key: keyof DiagnosticItem, val: unknown): string => {
    if (val === null || val === undefined) return "-";
    if (key === "gender") return val === "male" ? "남성" : "여성";
    if (key === "jobType") {
      const map: Record<string, string> = { employee: "직장인", self_employed: "자영업", freelancer: "프리랜서", other: "기타" };
      return map[val as string] ?? String(val);
    }
    if (key === "financialScore") return `${val}점`;
    // JSON 배열 파싱 시도
    if (typeof val === "string" && val.startsWith("[")) {
      try { return JSON.parse(val).join(", "); } catch { return val; }
    }
    if (typeof val === "object" && val instanceof Date) {
      return val.toLocaleString("ko-KR");
    }
    return String(val);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <h2 className="text-white font-bold text-lg">진단 상세 #{item.id}</h2>
            <p className="text-white/40 text-xs mt-1">{new Date(item.createdAt).toLocaleString("ko-KR")}</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          {fields.map(({ label, key }) => {
            const val = item[key];
            if (val === null || val === undefined) return null;
            return (
              <div key={key} className={key === "resultSummary" ? "col-span-2" : ""}>
                <div className="text-white/40 text-xs mb-1">{label}</div>
                <div className="text-white text-sm">{formatValue(key, val)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function AdminDiagnostics() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<DiagnosticItem | null>(null);
  const limit = 20;

  const { data, isLoading } = trpc.diagnostics.list.useQuery({ limit, offset: page * limit });

  const handleExportCSV = () => {
    if (!data?.items?.length) return;
    const headers = ["ID", "접수일", "나이", "성별", "직업", "급여", "점수", "이름", "이메일", "전화"];
    const rows = data.items.map((d) => [
      d.id,
      new Date(d.createdAt).toLocaleDateString("ko-KR"),
      d.age ?? "",
      d.gender === "male" ? "남성" : d.gender === "female" ? "여성" : "",
      d.jobType ?? "",
      d.salary ?? "",
      d.financialScore ?? "",
      d.contactName ?? "",
      d.contactEmail ?? "",
      d.contactPhone ?? "",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `2막1장_진단데이터_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">2막1장 진단 데이터</h1>
            <p className="text-white/40 text-sm">총 {data?.total ?? 0}건의 진단 데이터</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "#2D6A4F" }}
          >
            <Download size={16} />
            CSV 다운로드
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-white/40">로딩 중...</div>
        ) : !data?.items?.length ? (
          <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Activity size={40} className="mx-auto mb-4 text-white/20" />
            <p className="text-white/40">아직 진단 데이터가 없습니다.</p>
            <p className="text-white/20 text-sm mt-2">2막1장 진단 링크를 통해 접수된 데이터가 여기에 표시됩니다.</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["#", "접수일", "나이", "성별", "직업", "점수", "연락처", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-white/40 text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onClick={() => setSelected(d as DiagnosticItem)}
                  >
                    <td className="px-4 py-3 text-white/40 text-xs">{d.id}</td>
                    <td className="px-4 py-3 text-white/70 text-xs">
                      {new Date(d.createdAt).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">{d.age ? `${d.age}세` : "-"}</td>
                    <td className="px-4 py-3 text-white/70 text-sm">
                      {d.gender === "male" ? "남성" : d.gender === "female" ? "여성" : "-"}
                    </td>
                    <td className="px-4 py-3 text-white/70 text-xs">
                      {({ employee: "직장인", self_employed: "자영업", freelancer: "프리랜서", other: "기타" } as Record<string, string>)[d.jobType ?? ""] ?? "-"}
                    </td>
                    <td className="px-4 py-3"><ScoreBadge score={d.financialScore} /></td>
                    <td className="px-4 py-3 text-white/60 text-xs">
                      {d.contactName ? (
                        <span>{d.contactName}{d.contactEmail ? ` · ${d.contactEmail}` : ""}</span>
                      ) : "-"}
                    </td>
                    <td className="px-4 py-3 text-white/30 text-xs">상세 →</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-white/40 text-xs">{page * limit + 1}–{Math.min((page + 1) * limit, data.total)} / {data.total}건</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-1.5 rounded-lg text-white/50 hover:text-white disabled:opacity-30 transition-colors"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="p-1.5 rounded-lg text-white/50 hover:text-white disabled:opacity-30 transition-colors"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}
    </AdminLayout>
  );
}
