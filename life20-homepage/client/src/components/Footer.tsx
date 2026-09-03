/**
 * Footer — Life 2.0 Renewal v2
 * Design: "Established Authority" — Dark Navy, minimal, bilingual
 */

import { Link } from "wouter";
import { useLang } from "./Navigation";

const copy = {
  ko: {
    tagline: "인생 2막을 가장 존엄하게.",
    nav: [
      { label: "Who We Are", href: "/#who-we-are" },
      { label: "What We Do", href: "/#what-we-do" },
      { label: "이막일장", href: "/imakiljang" },
      { label: "Contact", href: "/#contact" },
    ],
    legal: [
      { label: "개인정보처리방침", href: "#" },
      { label: "이용약관", href: "#" },
    ],
    company: "주식회사 라이프이점영",
    ceo: "대표이사 김영범",
    reg: "사업자등록번호: 000-00-00000",
    address: "서울특별시 강남구",
    copyright: `© ${new Date().getFullYear()} Life 2.0 Corp. All rights reserved.`,
  },
  en: {
    tagline: "The most dignified second act.",
    nav: [
      { label: "Who We Are", href: "/#who-we-are" },
      { label: "What We Do", href: "/#what-we-do" },
      { label: "Imakiljang", href: "/imakiljang" },
      { label: "Contact", href: "/#contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
    company: "Life 2.0 Corp.",
    ceo: "CEO: Kim Young-beom",
    reg: "Business Reg. No.: 000-00-00000",
    address: "Gangnam-gu, Seoul, Korea",
    copyright: `© ${new Date().getFullYear()} Life 2.0 Corp. All rights reserved.`,
  },
};

export default function Footer() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <footer style={{ backgroundColor: "#080F1A" }}>
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-display font-bold text-xl text-white">Life</span>
              <span className="font-en font-bold text-xl" style={{ color: "#C9A84C" }}>2.0</span>
            </div>
            <p className="font-accent italic text-sm text-white/40 mb-1">{t.tagline}</p>
            <p className="font-body text-xs text-white/25">라이프이점영 (Life 2.0)</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {t.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-en text-xs text-white/35 hover:text-white/70 transition-colors duration-200 tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t mb-8" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-body text-xs text-white/25">{t.company} · {t.ceo}</p>
            <p className="font-body text-xs text-white/20">{t.reg} · {t.address}</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {t.legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-en text-xs text-white/25 hover:text-white/50 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <span className="font-en text-xs text-white/20">{t.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
