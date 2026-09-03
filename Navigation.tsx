/**
 * Navigation — Life 2.0 Renewal v2
 * Design: "Established Authority" — Deep Forest Green + Dark Navy
 * Bilingual KO/EN toggle, scroll-aware, mobile responsive
 */

import { useState, useEffect, createContext, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

// Language context
export const LangContext = createContext<{
  lang: "ko" | "en";
  setLang: (l: "ko" | "en") => void;
}>({ lang: "ko", setLang: () => {} });

export function useLang() {
  return useContext(LangContext);
}

const navItems = [
  { ko: "2막1장 플랫폼", en: "Imakiljang", href: "/imakiljang" },
  { ko: "이끼 스마트팜", en: "Moss Smart Farm", href: "/smartfarm" },
  { ko: "회사 소개", en: "About Us", href: "#who-we-are" },
  { ko: "비전", en: "Vision", href: "#where-we-go" },
  { ko: "팀 문화", en: "Culture", href: "#how-we-work" },
  { ko: "문의", en: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { lang, setLang } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const ids = ["who-we-are", "where-we-go", "how-we-work", "contact", "what-we-do"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div id="scroll-progress" style={{ width: "0%" }} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--avo-deep)]/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col leading-none">
                <span
                  className="font-display text-sm md:text-base font-bold tracking-tight transition-colors duration-300"
                  style={{ color: scrolled ? "var(--avo-fog)" : "var(--avo-fog)" }}
                >
                  라이프이점영
                </span>
                <span
                  className="font-accent italic text-xs tracking-widest transition-colors duration-300"
                  style={{ color: "var(--gold-satin)" }}
                >
                  Life 2.0
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                const isPageLink = !item.href.startsWith("#");
                if (isPageLink) {
                  return (
                    <Link key={item.href} href={item.href}>
                      <span className={`relative font-body text-sm font-medium transition-colors duration-300 group cursor-pointer ${isActive ? "text-[var(--gold-satin)]" : "text-white/70 hover:text-white"}`}>
                        {lang === "ko" ? item.ko : item.en}
                        <span className={`absolute -bottom-0.5 left-0 h-px bg-[var(--gold-satin)] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                      </span>
                    </Link>
                  );
                }
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative font-body text-sm font-medium transition-colors duration-300 group ${
                      isActive ? "text-[var(--gold-satin)]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {lang === "ko" ? item.ko : item.en}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[var(--gold-satin)] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                );
              })}

              {/* Language Toggle */}
              <div className="flex items-center gap-1 ml-2 border border-white/20 rounded-none overflow-hidden">
                <button
                  onClick={() => setLang("ko")}
                  className={`px-2.5 py-1 text-xs font-medium font-en transition-all duration-200 ${
                    lang === "ko"
                      ? "bg-[var(--avo-deep)] text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  KO
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1 text-xs font-medium font-en transition-all duration-200 ${
                    lang === "en"
                      ? "bg-[var(--avo-deep)] text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* B2B CTA */}
              <button
                onClick={() => handleNavClick("#contact")}
                className="ml-1 px-5 py-2 text-xs font-medium bg-[var(--gold-antique)] text-[var(--avo-deep)] hover:bg-[var(--gold-satin)] transition-all duration-300 border border-[var(--gold-antique)] hover:border-[var(--gold-satin)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 tracking-wide font-semibold"
              >
                {lang === "ko" ? "파트너십 문의" : "Partner Inquiry"}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--avo-deep)] transition-all duration-400 md:hidden flex flex-col ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full gap-6 px-8">
          <div className="mb-4">
            <span className="font-display text-xl font-bold text-white">라이프이점영</span>
            <span className="block font-accent italic text-sm text-[var(--gold-satin)] tracking-widest">Life 2.0</span>
          </div>
          {navItems.map((item, i) => {
            const isPageLink = !item.href.startsWith("#");
            return (
              <div key={item.href} style={{ animationDelay: `${i * 0.05}s` }}>
                {isPageLink ? (
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                    <span className="block group cursor-pointer">
                      <span className="block font-display text-2xl font-bold text-white/90 hover:text-white transition-colors duration-300">
                        {lang === "ko" ? item.ko : item.en}
                      </span>
                      <span className="block font-en text-xs text-white/30 tracking-widest uppercase mt-0.5">
                        {lang === "ko" ? item.en : item.ko}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <button onClick={() => handleNavClick(item.href)} className="text-left group">
                    <span className="block font-display text-2xl font-bold text-white/90 hover:text-white transition-colors duration-300">
                      {lang === "ko" ? item.ko : item.en}
                    </span>
                    <span className="block font-en text-xs text-white/30 tracking-widest uppercase mt-0.5">
                      {lang === "ko" ? item.en : item.ko}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setLang("ko")}
              className={`px-4 py-2 text-sm font-medium font-en border transition-all ${
                lang === "ko" ? "bg-[var(--avo-deep)] border-[var(--avo-deep)] text-white" : "border-white/20 text-white/50"
              }`}
            >
              한국어
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 text-sm font-medium font-en border transition-all ${
                lang === "en" ? "bg-[var(--avo-deep)] border-[var(--avo-deep)] text-white" : "border-white/20 text-white/50"
              }`}
            >
              English
            </button>
          </div>
          <button
            onClick={() => handleNavClick("#contact")}
            className="mt-2 px-8 py-3 text-sm font-medium bg-[var(--gold-antique)] text-[var(--avo-deep)] hover:bg-[var(--gold-satin)] transition-colors duration-300 font-semibold"
          >
            {lang === "ko" ? "파트너십 문의" : "Partner Inquiry"}
          </button>
        </div>
      </div>
    </>
  );
}
