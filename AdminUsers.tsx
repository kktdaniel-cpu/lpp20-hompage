import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { Shield, User, Users } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";

function RoleBadge({ role }: { role: "admin" | "user" }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        backgroundColor: role === "admin" ? "#2D6A4F22" : "rgba(255,255,255,0.05)",
        color: role === "admin" ? "#40916C" : "rgba(255,255,255,0.5)",
        border: `1px solid ${role === "admin" ? "#2D6A4F66" : "rgba(255,255,255,0.1)"}`,
      }}
    >
      {role === "admin" ? "관리자" : "일반"}
    </span>
  );
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [confirmRole, setConfirmRole] = useState<"admin" | "user">("user");

  const { data, isLoading, refetch } = trpc.admin.users.list.useQuery({ limit: 100 });

  const updateRole = trpc.admin.users.updateRole.useMutation({
    onSuccess: () => {
      toast.success("권한이 변경되었습니다.");
      setConfirmId(null);
      refetch();
    },
    onError: (e) => {
      toast.error(e.message);
      setConfirmId(null);
    },
  });

  const handleRoleChange = (id: number, newRole: "admin" | "user") => {
    setConfirmId(id);
    setConfirmRole(newRole);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">회원 관리</h1>
          <p className="text-white/40 text-sm">총 {data?.total ?? 0}명의 가입 회원</p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-white/40">로딩 중...</div>
        ) : !data?.items?.length ? (
          <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Users size={40} className="mx-auto mb-4 text-white/20" />
            <p className="text-white/40">아직 가입한 회원이 없습니다.</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["#", "이름", "이메일", "가입일", "역할", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-white/40 text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map((u) => (
                  <tr
                    key={u.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-white/40 text-xs">{u.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: u.role === "admin" ? "#2D6A4F" : "#1A3A5C" }}>
                          {u.name?.[0] ?? <User size={12} />}
                        </div>
                        <span className="text-white text-sm">{u.name ?? "-"}</span>
                        {u.id === currentUser?.id && (
                          <span className="text-xs text-white/30">(나)</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60 text-xs">{u.email ?? "-"}</td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      {new Date(u.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
                    <td className="px-4 py-3">
                      {u.id !== currentUser?.id && (
                        <button
                          onClick={() => handleRoleChange(u.id, u.role === "admin" ? "user" : "admin")}
                          className="text-xs px-3 py-1 rounded-lg text-white/50 hover:text-white transition-colors"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        >
                          {u.role === "admin" ? "일반으로 변경" : "관리자로 승격"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 권한 변경 확인 모달 */}
        {confirmId !== null && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl p-6" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#8B5CF622" }}>
                  <Shield size={20} style={{ color: "#8B5CF6" }} />
                </div>
                <h3 className="text-white font-bold">권한 변경 확인</h3>
              </div>
              <p className="text-white/60 text-sm mb-6">
                이 회원을 <strong className="text-white">{confirmRole === "admin" ? "관리자" : "일반 회원"}</strong>으로 변경하시겠습니까?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmId(null)}
                  className="flex-1 py-2 rounded-xl text-sm text-white/60 hover:text-white transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  취소
                </button>
                <button
                  onClick={() => updateRole.mutate({ id: confirmId, role: confirmRole })}
                  disabled={updateRole.isPending}
                  className="flex-1 py-2 rounded-xl text-sm text-white font-medium transition-colors"
                  style={{ backgroundColor: "#2D6A4F" }}
                >
                  {updateRole.isPending ? "처리 중..." : "확인"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
