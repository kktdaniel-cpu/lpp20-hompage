import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Lock } from "lucide-react";
import {
  Activity,
  BarChart3,
  FileText,
  Home,
  Inbox,
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { href: "/admin", label: "대시보드", icon: BarChart3 },
  { href: "/admin/inquiries", label: "문의 관리", icon: Inbox },
  { href: "/admin/diagnostics", label: "2막1장 진단", icon: Activity },
  { href: "/admin/traffic", label: "유입 경로 분석", icon: TrendingUp },
  { href: "/admin/users", label: "회원 관리", icon: Users },
  { href: "/admin/posts", label: "콘텐츠 관리", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => { window.location.href = "/"; },
  });

  // 로그인 후 /admin으로 돌아오도록 returnPath를 포함한 로그인 URL 생성
  const adminLoginUrl = (() => {
    const base = getLoginUrl();
    try {
      const url = new URL(base);
      const redirectUri = `${window.location.origin}/api/oauth/callback`;
      const state = btoa(JSON.stringify({ redirectUri, returnPath: "/admin" }));
      url.searchParams.set("state", state);
      return url.toString();
    } catch {
      return base;
    }
  })();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0D1B2A" }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0D1B2A" }}>
        <div className="text-center max-w-sm px-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#2D6A4F" }}>
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">관리자 로그인</h1>
          <p className="text-white/50 text-sm mb-8">관리자 페이지에 접근하려면 로그인이 필요합니다.</p>
          <a
            href={adminLoginUrl}
            className="block w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: "#2D6A4F" }}
          >
            로그인하기
          </a>
          <Link href="/" className="block mt-4 text-white/40 text-sm hover:text-white/70 transition-colors">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0D1B2A" }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">접근 권한 없음</h1>
          <p className="text-white/60 mb-6">관리자 권한이 필요합니다.</p>
          <Link href="/" className="px-6 py-3 rounded-lg text-white font-medium" style={{ backgroundColor: "#2D6A4F" }}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0A1628", fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: "#0D1B2A", borderRight: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#2D6A4F" }}>
              L
            </div>
            <div>
              <div className="text-white font-bold text-sm">Life 2.0</div>
              <div className="text-white/40 text-xs">관리자 패널</div>
            </div>
          </Link>
          <button className="lg:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                style={isActive ? { backgroundColor: "#2D6A4F" } : {}}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#1A3A5C" }}>
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">{user?.name ?? "관리자"}</div>
              <div className="text-white/40 text-xs truncate">{user?.email ?? ""}</div>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg text-white/50 hover:text-white text-sm transition-colors">
            <Home size={16} />
            홈페이지 보기
          </Link>
          <button
            onClick={() => logout.mutate()}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/50 hover:text-red-400 text-sm transition-colors"
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3" style={{ backgroundColor: "#0D1B2A", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <button className="text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <span className="text-white font-semibold text-sm">Life 2.0 관리자</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
