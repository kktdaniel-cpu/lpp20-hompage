/**
 * Where We Go Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Vision, roadmap, ecosystem
 * Bilingual KO/EN, forest green accent on light background
 */

import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const VISION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/vision_abstract-7AMge4AHfxSbANG6oKWMtJ.webp";

const copy = {
  ko: {
    section_num: "03",
    section_label: "Where We Go",
    title: "우리가 향하는\n미래",
    desc: "2030년까지 시니어 1,000만 명의 삶을 바꾸는 생태계를 구축합니다. 이막일장 플랫폼과 이끼 스마트팜이 연결되어 시니어가 소비자이자 생산자로 활동하는 선순환 경제를 만들어갑니다.",
    problem_label: "우리가 해결하는 문제",
    stats: [
      { num: "1,000만+", label: "65세 이상 인구", sub: "전체 인구의 20% 초과" },
      { num: "70~80%", label: "시니어 자산 중 부동산", sub: "현금 흐름 전환 필요" },
      { num: "10년", label: "소득 공백기", sub: "은퇴~국민연금 수령 전" },
      { num: "3대 불안", label: "건강 · 빈곤 · 고립", sub: "통합 솔루션 부재" },
    ],
    milestones: [
      { year: "2025", phase: "Phase 1", title: "기반 구축", desc: "이막일장 플랫폼 MVP 개발, 이끼 스마트팜 특허 출원, 소셜벤처 인증 취득", status: "current" },
      { year: "2026", phase: "Phase 2", title: "시장 진입", desc: "B2C 서비스 론칭, 파트너사 10곳 확보, 이끼 테라리움 B2B 납품 시작", status: "upcoming" },
      { year: "2027", phase: "Phase 3", title: "생태계 확장", desc: "마이데이터 연동 고도화, 시니어 커뮤니티 1만 명 달성, 해외 시장 조사", status: "upcoming" },
      { year: "2030", phase: "Vision", title: "시니어 생태계 완성", desc: "누적 이용자 100만 명, 탄소 저감 인증 획득, 동남아 시장 진출", status: "future" },
    ],
    vision_title: "시니어가 사회의 새로운 동력이 되는 세상",
    vision_desc: "은퇴자가 부담이 아닌 자원이 되는 사회. 이끼가 도시의 공기를 정화하고, 시니어가 그 생산자가 되는 순환 경제. 라이프이점영이 꿈꾸는 미래입니다.",
  },
  en: {
    section_num: "03",
    section_label: "Where We Go",
    title: "The future\nwe're building.",
    desc: "We are building an ecosystem that transforms the lives of 10 million seniors by 2030. The Imakiljang platform and moss smart farm connect to create a virtuous circular economy where seniors are both consumers and producers.",
    problem_label: "The Problem We Solve",
    stats: [
      { num: "10M+", label: "Population 65+", sub: "Over 20% of total population" },
      { num: "70–80%", label: "Senior assets in real estate", sub: "Cash flow conversion needed" },
      { num: "10 yrs", label: "Income gap period", sub: "Retirement to pension receipt" },
      { num: "3 Fears", label: "Health · Poverty · Isolation", sub: "No integrated solution" },
    ],
    milestones: [
      { year: "2025", phase: "Phase 1", title: "Foundation", desc: "Imakiljang platform MVP development, moss smart farm patent filing, social venture certification", status: "current" },
      { year: "2026", phase: "Phase 2", title: "Market Entry", desc: "B2C service launch, 10 partner companies secured, moss terrarium B2B supply begins", status: "upcoming" },
      { year: "2027", phase: "Phase 3", title: "Ecosystem Expansion", desc: "MyData integration advancement, 10,000 senior community members, overseas market research", status: "upcoming" },
      { year: "2030", phase: "Vision", title: "Senior Ecosystem Complete", desc: "1 million cumulative users, carbon reduction certification, Southeast Asian market entry", status: "future" },
    ],
    vision_title: "A world where seniors become a new driving force of society",
    vision_desc: "A society where retirees are resources, not burdens. A circular economy where moss purifies city air and seniors are its producers. This is the future Life 2.0 envisions.",
  },
};

export default function WhereWeGoSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  return (
    <section
      id="where-we-go"
      ref={sectionRef}
      className="fade-up py-24 md:py-32"
      style={{ backgroundColor: "#F8F7F4" }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-16">
          <span className="section-num">{t.section_num}</span>
          <span className="w-8 h-px bg-[#C9A84C]" />
          <span className="font-en text-xs text-[#C9A84C] tracking-[0.18em] uppercase font-semibold">
            {t.section_label}
          </span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.15]"
            style={{ color: "#0F1C2E", whiteSpace: "pre-line" }}
          >
            {t.title}
          </h2>
          <p className="font-body text-sm text-[#6B6560] leading-relaxed self-end">
            {t.desc}
          </p>
        </div>

        {/* Problem Stats */}
        <div className="mb-16">
          <p className="font-en text-xs text-[#9A9590] tracking-[0.18em] uppercase mb-6">{t.problem_label}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "#E8E5DF" }}>
            {t.stats.map((s) => (
              <div key={s.label} className="p-6 md:p-8" style={{ backgroundColor: "#F8F7F4" }}>
                <div className="font-en font-bold text-2xl md:text-3xl mb-1" style={{ color: "#1B3A2D" }}>
                  {s.num}
                </div>
                <div className="font-body text-xs font-medium text-[#3D3A35] mb-1">{s.label}</div>
                <div className="font-body text-xs text-[#9A9590]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="relative mb-16">
          <p className="font-en text-xs text-[#9A9590] tracking-[0.18em] uppercase mb-8">Roadmap</p>
          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-3 left-4 right-4 h-px"
              style={{ backgroundColor: "#E8E5DF" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {t.milestones.map((m, i) => (
                <div key={m.year} className="relative">
                  <div className="flex items-center gap-3 mb-4 md:flex-col md:items-start md:gap-0">
                    <div
                      className="relative z-10 w-3 h-3 rounded-full md:mb-4 shrink-0"
                      style={{
                        backgroundColor: m.status === "current" ? "#C9A84C" : m.status === "future" ? "#C9A84C" : "#1B3A2D",
                      }}
                    />
                    <span
                      className="font-en font-bold text-xl md:text-2xl"
                      style={{ color: m.status === "future" ? "#C9A84C" : "#0F1C2E" }}
                    >
                      {m.year}
                    </span>
                  </div>
                  <div
                    className="px-3 py-1.5 mb-3 inline-block"
                    style={{ backgroundColor: m.status === "current" ? "#1B3A2D" : "#F0EDE8" }}
                  >
                    <span
                      className="font-en text-xs tracking-widest uppercase font-medium"
                      style={{ color: m.status === "current" ? "#C9A84C" : "#9A9590" }}
                    >
                      {m.phase}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm mb-2" style={{ color: "#0F1C2E" }}>
                    {m.title}
                  </h4>
                  <p className="font-body text-xs text-[#6B6560] leading-relaxed">{m.desc}</p>
                  {m.status === "current" && (
                    <div className="flex items-center gap-1.5 mt-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A2D] animate-pulse" />
                      <span className="font-en text-xs text-[#1B3A2D] font-medium">In Progress</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Statement Banner */}
        <div className="relative overflow-hidden p-10 md:p-16" style={{ backgroundColor: "#0F1C2E" }}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${VISION_IMG})` }}
          />
          <div className="relative z-10 max-w-2xl">
            <span className="font-en text-xs text-[#C9A84C] tracking-[0.2em] uppercase font-medium mb-4 block">
              Our Vision
            </span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4 leading-[1.3]">
              {t.vision_title}
            </h3>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              {t.vision_desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
