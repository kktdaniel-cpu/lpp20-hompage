/**
 * Hero Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Dark Navy + Forest Green
 * Full-screen hero with bilingual headline, dual CTA
 */

import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "../Navigation";
import { useScrollProgress } from "../../hooks/useScrollAnimation";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/hero_renewal_bg-oGotzyxnNkWJog9gCnTBif.webp";

const copy = {
  ko: {
    eyebrow: "주식회사 라이프이점영 · LIFE 2.0",
    headline1: "새로운 삶의 장을",
    headline2: "설계합니다.",
    sub_en: "Designing the Next Chapter of Life",
    desc: "데이터 기술 기반의 시니어 라이프 마스터플랜 플랫폼 '이막일장'과 이끼 어그리볼태익 기술로 초고령화 사회의 새로운 가능성을 만들어갑니다.",
    cta_individual: "서비스 살펴보기",
    cta_b2b: "파트너십 문의",
    scroll: "SCROLL",
  },
  en: {
    eyebrow: "Life 2.0 Co., Ltd. · 라이프이점영",
    headline1: "Designing the",
    headline2: "Next Chapter.",
    sub_en: "새로운 삶의 장을 설계합니다",
    desc: "We build the future of senior life through our AI-powered retirement masterplan platform 'Imakiljang' and innovative moss agrivoltaic technology.",
    cta_individual: "Explore Services",
    cta_b2b: "Partner Inquiry",
    scroll: "SCROLL",
  },
};

const stats = [
  { value: "2025", ko: "설립 연도", en: "Founded" },
  { value: "4+", ko: "핵심 사업 영역", en: "Business Areas" },
  { value: "K-Taxonomy", ko: "녹색분류체계 인증", en: "Green Taxonomy" },
  { value: "소셜벤처", ko: "기업 인증", en: "Social Venture" },
];

export default function HeroSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const [loaded, setLoaded] = useState(false);
  useScrollProgress();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("what-we-do");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#0F1C2E" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: loaded ? 0.3 : 0,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,28,46,0.97) 0%, rgba(27,58,45,0.65) 55%, rgba(15,28,46,0.92) 100%)",
        }}
      />

      {/* Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[33.333, 66.666].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${left}%`,
              width: "1px",
              background: `linear-gradient(to bottom, transparent, rgba(201,168,76,${0.1 - i * 0.03}) 25%, rgba(201,168,76,${0.1 - i * 0.03}) 75%, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container pt-28 pb-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-8 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "0.1s",
            }}
          >
            <span className="w-8 h-px bg-[#C9A84C]" />
            <span className="font-en text-xs text-[#C9A84C] tracking-[0.2em] uppercase font-medium">
              {t.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0.25s",
            }}
          >
            <h1 className="font-display font-bold text-white leading-[1.1] mb-3">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {t.headline1}
              </span>
              <span
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ color: "#4A7A5E" }}
              >
                {t.headline2}
              </span>
            </h1>
            <p
              className="font-accent italic text-lg md:text-xl mt-2"
              style={{ color: "rgba(201,168,76,0.75)" }}
            >
              {t.sub_en}
            </p>
          </div>

          {/* Description */}
          <p
            className="font-body text-sm md:text-base text-white/55 leading-relaxed max-w-xl mt-7 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "0.4s",
            }}
          >
            {t.desc}
          </p>

          {/* Dual CTA */}
          <div
            className="flex flex-wrap gap-3 mt-10 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "0.55s",
            }}
          >
            <button onClick={scrollToNext} className="btn-primary group">
              {t.cta_individual}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost-white"
            >
              {t.cta_b2b}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        className="relative z-10 border-t transition-all duration-700"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          opacity: loaded ? 1 : 0,
          transitionDelay: "0.7s",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className="py-5 px-4 border-r last:border-r-0"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="font-en font-bold text-lg md:text-xl" style={{ color: "#C9A84C", letterSpacing: "-0.02em" }}>
                  {s.value}
                </div>
                <div className="font-body text-xs text-white/35 mt-1 tracking-wide">
                  {lang === "ko" ? s.ko : s.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-28 right-8 md:right-14 z-10 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors duration-300"
        aria-label={t.scroll}
      >
        <span
          className="font-en text-[10px] tracking-[0.2em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          {t.scroll}
        </span>
        <ChevronDown size={12} className="animate-bounce" />
      </button>
    </section>
  );
}
