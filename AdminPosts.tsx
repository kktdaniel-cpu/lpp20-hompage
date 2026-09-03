import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Check, FileText } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";

type Category = "senior" | "moss" | "company" | "news";

const CATEGORY_LABELS: Record<Category, string> = {
  senior: "시니어 라이프",
  moss: "이끼 스마트팜",
  company: "회사 소식",
  news: "뉴스",
};

const CATEGORY_COLORS: Record<Category, string> = {
  senior: "#2D6A4F",
  moss: "#40916C",
  company: "#1B4F72",
  news: "#7D3C98",
};

function PostForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: Partial<{ title: string; slug: string; category: Category; summary: string; content: string; published: boolean }>;
  onSubmit: (data: { title: string; slug: string; category: Category; summary: string; content: string; published: boolean }) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    category: (initial?.category ?? "company") as Category,
    summary: initial?.summary ?? "",
    content: initial?.content ?? "",
    published: initial?.published ?? false,
  });

  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, "").replace(/\s+/g, "-").slice(0, 60);
    setForm((f) => ({ ...f, title, slug: f.slug || slug }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">{initial?.title ? "게시물 수정" : "새 게시물 작성"}</h2>
          <button onClick={onCancel} className="text-white/40 hover:text-white"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white/60 text-xs mb-1 block">제목 *</label>
            <input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="게시물 제목"
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-xs mb-1 block">슬러그 (URL) *</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="url-slug"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <div>
              <label className="text-white/60 text-xs mb-1 block">카테고리 *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ backgroundColor: "#1A2E45", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-white/60 text-xs mb-1 block">요약</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              placeholder="게시물 요약 (목록에 표시됩니다)"
              rows={2}
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>

          <div>
            <label className="text-white/60 text-xs mb-1 block">본문 내용</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="게시물 본문을 작성하세요..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${form.published ? "text-white" : "text-white/50"}`}
              style={{ backgroundColor: form.published ? "#2D6A4F" : "rgba(255,255,255,0.05)" }}
            >
              {form.published ? <Eye size={16} /> : <EyeOff size={16} />}
              {form.published ? "발행됨" : "초안"}
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onSubmit(form)}
            disabled={loading || !form.title || !form.slug}
            className="flex-1 py-3 rounded-xl text-white font-medium text-sm transition-opacity disabled:opacity-50"
            style={{ backgroundColor: "#2D6A4F" }}
          >
            {loading ? "저장 중..." : "저장"}
          </button>
          <button onClick={onCancel} className="px-6 py-3 rounded-xl text-white/60 text-sm" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPosts() {
  const utils = trpc.useUtils();
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<{ id: number; title: string; slug: string; category: Category; summary: string; content: string; published: boolean } | null>(null);

  const { data, isLoading } = trpc.posts.adminList.useQuery({ limit: 50 });

  const create = trpc.posts.create.useMutation({
    onSuccess: () => { utils.posts.adminList.invalidate(); setShowForm(false); toast.success("게시물이 작성되었습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const update = trpc.posts.update.useMutation({
    onSuccess: () => { utils.posts.adminList.invalidate(); setEditPost(null); toast.success("게시물이 수정되었습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const del = trpc.posts.delete.useMutation({
    onSuccess: () => { utils.posts.adminList.invalidate(); toast.success("게시물이 삭제되었습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const togglePublish = (post: { id: number; published: boolean }) => {
    update.mutate({ id: post.id, published: !post.published });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">콘텐츠 관리</h1>
            <p className="text-white/40 text-sm">블로그 및 인사이트 게시물을 관리합니다.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium text-sm"
            style={{ backgroundColor: "#2D6A4F" }}
          >
            <Plus size={18} />
            새 게시물
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "전체", value: data?.total ?? 0 },
            { label: "발행됨", value: data?.published ?? 0 },
            { label: "초안", value: data?.drafts ?? 0 },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Post List */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0D1B2A", border: "1px solid rgba(255,255,255,0.08)" }}>
          {isLoading ? (
            <div className="p-12 text-center text-white/30">로딩 중...</div>
          ) : data?.items.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={40} className="mx-auto mb-3 text-white/20" />
              <p className="text-white/30 text-sm">게시물이 없습니다. 첫 게시물을 작성해보세요.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["제목", "카테고리", "상태", "작성일", "관리"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-white/40 text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.items.map((post) => (
                  <tr key={post.id} className="hover:bg-white/2 transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm font-medium">{post.title}</div>
                      <div className="text-white/30 text-xs mt-0.5">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium text-white" style={{ backgroundColor: CATEGORY_COLORS[post.category as Category] + "33", color: CATEGORY_COLORS[post.category as Category] }}>
                        {CATEGORY_LABELS[post.category as Category]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${post.published ? "text-green-400" : "text-white/40"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-green-400" : "bg-white/20"}`} />
                        {post.published ? "발행됨" : "초안"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-xs">
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePublish(post)}
                          className="p-2 rounded-lg text-white/40 hover:text-white transition-colors"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                          title={post.published ? "초안으로 전환" : "발행"}
                        >
                          {post.published ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => setEditPost({ id: post.id, title: post.title, slug: post.slug, category: post.category as Category, summary: post.summary ?? "", content: post.content ?? "", published: post.published })}
                          className="p-2 rounded-lg text-white/40 hover:text-white transition-colors"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => { if (confirm("삭제하시겠습니까?")) del.mutate({ id: post.id }); }}
                          className="p-2 rounded-lg text-white/40 hover:text-red-400 transition-colors"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showForm && (
        <PostForm
          onSubmit={(data) => create.mutate(data)}
          onCancel={() => setShowForm(false)}
          loading={create.isPending}
        />
      )}

      {editPost && (
        <PostForm
          initial={editPost}
          onSubmit={(data) => update.mutate({ id: editPost.id, ...data })}
          onCancel={() => setEditPost(null)}
          loading={update.isPending}
        />
      )}
    </AdminLayout>
  );
}
