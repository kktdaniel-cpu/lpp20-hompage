import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Inbox, Mail, Building, Phone, MessageSquare, Clock, CheckCircle, XCircle, Eye, X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";

type Status = "new" | "read" | "replied" | "closed";
type InquiryType = "partnership" | "investment" | "individual" | "other";

const STATUS_LABELS: Record<Status, string> = {
  new: "신규",
  read: "확인",
  replied: "답변완료",
  closed: "종료",
};

const STATUS_COLORS: Record<Status, string> = {
  new: "#E74C3C",
  read: "#F39C12",
  replied: "#27AE60",
  closed: "#7F8C8D",
};

const TYPE_LABELS: Record<InquiryType, string> = {
  partnership: "파트너십",
  investment: "투자 문의",
  individual: "개인 문의",
  other: "기타",
};

const TYPE_COLORS: Record<InquiryType, string> = {
  partnership: "#2D6A4F",
  investment: "#1B4F72",
  individual: "#7D3C98",
  other: "#5D6D7E",
};

type Inquiry = {
  id: number;
  type: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  message: string;
  status: string;
  adminNote?: string | null;
  createdAt: Date;
};

function InquiryDetail({ inquiry, onClose, onStatusChange }: {
  inquiry: Inquiry;
  onClose: () => void;
  onStatusChange: (id: number, status: Status, note?: string) => void;
}) {
  const [note, setNote] = useState(inquiry.adminNote ?? "");
  const [saving, setSaving] = useState(false);

  const handleStatus = async (status: Status) => {
    setSaving(true);
    onStatusChange(inquiry.id, status, note);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">문의 상세</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={20} /></button>
        </div>

        {/* Type + Status badges */}
        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: TYPE_COLORS[inquiry.type as InquiryType] + "44", color: TYPE_COLORS[inquiry.type as InquiryType] }}>
            {TYPE_LABELS[inquiry.type as InquiryType]}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: STATUS_COLORS[inquiry.status as Status] + "22", color: STATUS_COLORS[inquiry.status as Status] }}>
            {STATUS_LABELS[inquiry.status as Status]}
          </span>
          <span className="text-white/30 text-xs ml-auto">
            {new Date(inquiry.createdAt).toLocaleString("ko-KR")}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
            <Mail size={16} className="text-white/40" />
            <div>
              <div className="text-white text-sm font-medium">{inquiry.name}</div>
              <div className="text-white/50 text-xs">{inquiry.email}</div>
            </div>
          </div>
          {inquiry.company && (
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <Building size={16} className="text-white/40" />
              <span className="text-white/70 text-sm">{inquiry.company}</span>
            </div>
          )}
          {inquiry.phone && (
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <Phone size={16} className="text-white/40" />
              <span className="text-white/70 text-sm">{inquiry.phone}</span>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={14} className="text-white/40" />
            <span className="text-white/40 text-xs">문의 내용</span>
          </div>
          <div className="p-4 rounded-xl text-white/80 text-sm leading-relaxed whitespace-pre-wrap" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
            {inquiry.message}
          </div>
        </div>

        {/* Admin Note */}
        <div className="mb-6">
          <label className="text-white/40 text-xs mb-2 block">관리자 메모</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="내부 메모를 입력하세요..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </div>

        {/* Status Actions */}
        <div className="flex flex-wrap gap-2">
          {(["read", "replied", "closed"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => handleStatus(s)}
              disabled={saving || inquiry.status === s}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-40"
              style={{ backgroundColor: STATUS_COLORS[s] + "22", color: STATUS_COLORS[s], border: `1px solid ${STATUS_COLORS[s]}44` }}
            >
              {s === "read" ? <Eye size={12} /> : s === "replied" ? <CheckCircle size={12} /> : <XCircle size={12} />}
              {STATUS_LABELS[s]}으로 변경
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminInquiries() {
  const utils = trpc.useUtils();
  const [statusFilter, setStatusFilter] = useState<Status | undefined>(undefined);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const { data, isLoading } = trpc.inquiries.list.useQuery({ status: statusFilter, limit: 50 });

  const updateStatus = trpc.inquiries.updateStatus.useMutation({
    onSuccess: () => {
      utils.inquiries.list.invalidate();
      setSelected(null);
      toast.success("상태가 업데이트되었습니다.");
    },
    onError: (e) => toast.error(e.message),
  });

  const handleStatusChange = (id: number, status: Status, adminNote?: string) => {
    updateStatus.mutate({ id, status, adminNote });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">문의 관리</h1>
          <p className="text-white/40 text-sm">파트너십, 투자, 개인 문의를 관리합니다.</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "전체", value: data?.total ?? 0, color: "#5D6D7E" },
            { label: "신규", value: data?.newCount ?? 0, color: "#E74C3C" },
            { label: "답변완료", value: data?.repliedCount ?? 0, color: "#27AE60" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setStatusFilter(undefined)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${!statusFilter ? "text-white" : "text-white/50"}`}
            style={{ backgroundColor: !statusFilter ? "#2D6A4F" : "rgba(255,255,255,0.05)" }}
          >
            전체
          </button>
          {(["new", "read", "replied", "closed"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${statusFilter === s ? "text-white" : "text-white/50"}`}
              style={{ backgroundColor: statusFilter === s ? STATUS_COLORS[s] : "rgba(255,255,255,0.05)" }}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
          {isLoading ? (
            <div className="p-12 text-center text-white/30">로딩 중...</div>
          ) : data?.items.length === 0 ? (
            <div className="p-12 text-center">
              <Inbox size={40} className="mx-auto mb-3 text-white/20" />
              <p className="text-white/30 text-sm">문의가 없습니다.</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {data?.items.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 cursor-pointer transition-colors"
                  onClick={() => setSelected(inq as Inquiry)}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: STATUS_COLORS[inq.status as Status] }} />
                  <div className="flex-shrink-0">
                    <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: TYPE_COLORS[inq.type as InquiryType] + "33", color: TYPE_COLORS[inq.type as InquiryType] }}>
                      {TYPE_LABELS[inq.type as InquiryType]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{inq.name}</span>
                      {inq.company && <span className="text-white/40 text-xs">· {inq.company}</span>}
                    </div>
                    <div className="text-white/40 text-xs truncate mt-0.5">{inq.message.slice(0, 80)}...</div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs font-medium" style={{ color: STATUS_COLORS[inq.status as Status] }}>
                      {STATUS_LABELS[inq.status as Status]}
                    </div>
                    <div className="text-white/30 text-xs mt-0.5">
                      {new Date(inq.createdAt).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && (
        <InquiryDetail
          inquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </AdminLayout>
  );
}
