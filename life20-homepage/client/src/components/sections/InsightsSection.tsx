/**
 * Community & Insights Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Light background, editorial card layout
 * Bilingual KO/EN, SNS channel links
 */

import { ExternalLink, Youtube, Instagram } from "lucide-react";
import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const copy = {
  ko: {
    section_num: "05",
    section_label: "Community & Insights",
    title: "인사이트 &\n커뮤니티",
    desc: "은퇴 설계, 이끼 기술, 시니어 트렌드에 관한 전문 콘텐츠를 공유합니다. 유튜브와 인스타그램에서 더 많은 이야기를 만나보세요.",
    articles: [
      {
        tag: "은퇴 설계",
        title: "아파트 한 채가 전부인 당신, 주택연금으로 월 얼마를 받을 수 있을까?",
        desc: "서울 아파트 시세 기준 주택연금 예상 수령액 시뮬레이션. 은퇴 후 현금흐름 설계의 핵심 전략을 알아봅니다.",
        date: "2025.12",
        read: "5분 읽기",
      },
      {
        tag: "이끼 기술",
        title: "이끼가 실내 공기를 정화하는 원리 — 스마트 바이오-에어 테라리움 기술 해설",
        desc: "이끼의 음이온 발생, VOC 흡착, CO₂ 저감 메커니즘과 우리의 특허 출원 기술을 상세히 설명합니다.",
        date: "2025.11",
        read: "7분 읽기",
      },
      {
        tag: "시니어 트렌드",
        title: "2030년 초고령사회 진입 — 한국 시니어 시장의 5가지 변화",
        desc: "인구통계학적 변화가 만들어내는 새로운 비즈니스 기회. 시니어 테크 스타트업이 주목해야 할 트렌드를 분석합니다.",
        date: "2025.10",
        read: "6분 읽기",
      },
    ],
    channels: [
      { icon: "youtube" as const, name: "Life 2.0 유튜브", handle: "@life20official", desc: "은퇴 설계 실전 가이드, 이끼 기술 소개 영상", color: "#FF0000", url: "#" },
      { icon: "instagram" as const, name: "Life 2.0 인스타그램", handle: "@life20_official", desc: "시니어 라이프 인사이트, 이끼 스마트팜 일상", color: "#E1306C", url: "#" },
    ],
    coming_soon: "준비 중",
  },
  en: {
    section_num: "05",
    section_label: "Community & Insights",
    title: "Insights &\nCommunity",
    desc: "We share expert content on retirement planning, moss technology, and senior trends. Find more stories on our YouTube and Instagram channels.",
    articles: [
      {
        tag: "Retirement Planning",
        title: "If your only asset is an apartment, how much can you receive from a housing pension?",
        desc: "Simulation of expected housing pension amounts based on Seoul apartment prices. Key strategies for post-retirement cash flow planning.",
        date: "Dec 2025",
        read: "5 min read",
      },
      {
        tag: "Moss Technology",
        title: "How moss purifies indoor air — Smart Bio-Air Terrarium technology explained",
        desc: "Detailed explanation of moss's negative ion generation, VOC adsorption, CO₂ reduction mechanisms and our patent-pending technology.",
        date: "Nov 2025",
        read: "7 min read",
      },
      {
        tag: "Senior Trends",
        title: "Entering a super-aged society by 2030 — 5 changes in Korea's senior market",
        desc: "New business opportunities created by demographic changes. Analysis of trends that senior tech startups should pay attention to.",
        date: "Oct 2025",
        read: "6 min read",
      },
    ],
    channels: [
      { icon: "youtube" as const, name: "Life 2.0 YouTube", handle: "@life20official", desc: "Practical retirement planning guides, moss technology introduction videos", color: "#FF0000", url: "#" },
      { icon: "instagram" as const, name: "Life 2.0 Instagram", handle: "@life20_official", desc: "Senior life insights, moss smart farm daily updates", color: "#E1306C", url: "#" },
    ],
    coming_soon: "Coming Soon",
  },
};

export default function InsightsSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  return (
    <section
      id="insights"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16" style={{ backgroundColor: "#E8E5DF" }}>
          {t.articles.map((a, i) => (
            <article
              key={i}
              className="p-8 group cursor-pointer transition-all duration-300 hover:bg-[#F0EDE8]"
              style={{ backgroundColor: "#F8F7F4" }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className="px-2.5 py-1 text-xs font-en font-medium tracking-wide"
                  style={{ backgroundColor: "#1B3A2D", color: "#C9A84C" }}
                >
                  {a.tag}
                </span>
                <span className="font-en text-xs text-[#9A9590]">{a.date}</span>
              </div>
              <h3 className="font-display font-bold text-sm md:text-base leading-snug mb-3 group-hover:text-[#1B3A2D] transition-colors duration-300" style={{ color: "#0F1C2E" }}>
                {a.title}
              </h3>
              <p className="font-body text-xs text-[#6B6560] leading-relaxed mb-6">
                {a.desc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#E8E5DF]">
                <span className="font-en text-xs text-[#9A9590]">{a.read}</span>
                <ExternalLink size={12} className="text-[#9A9590] group-hover:text-[#1B3A2D] transition-colors duration-300" />
              </div>
            </article>
          ))}
        </div>

        {/* SNS Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.channels.map((ch) => (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-5 p-6 border transition-all duration-300 hover:border-[#1B3A2D] group"
              style={{ borderColor: "#E8E5DF" }}
            >
              <div
                className="shrink-0 w-10 h-10 flex items-center justify-center"
                style={{ backgroundColor: "#0F1C2E" }}
              >
                {ch.icon === "youtube" ? (
                  <Youtube size={18} style={{ color: ch.color }} />
                ) : (
                  <Instagram size={18} style={{ color: ch.color }} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-display font-bold text-sm mb-0.5" style={{ color: "#0F1C2E" }}>
                      {ch.name}
                    </div>
                    <div className="font-en text-xs text-[#9A9590] mb-2">{ch.handle}</div>
                    <p className="font-body text-xs text-[#6B6560] leading-relaxed">{ch.desc}</p>
                  </div>
                  <span
                    className="shrink-0 ml-4 px-2.5 py-1 text-xs font-en border"
                    style={{ borderColor: "#E8E5DF", color: "#9A9590" }}
                  >
                    {t.coming_soon}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
