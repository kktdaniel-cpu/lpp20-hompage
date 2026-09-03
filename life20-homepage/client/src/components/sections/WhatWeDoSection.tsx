/**
 * What We Do Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Grid-based, two business pillars
 * Bilingual KO/EN, no product pricing, concept-level only
 */

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const SENIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/senior_lifestyle_renewal-9v6qu2Pdovi67LnbHZVTyu.webp";
const MOSS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/moss_tech_renewal-d7SRRzkdPjRTPdxYznt5hF.webp";

const copy = {
  ko: {
    section_num: "01",
    section_label: "What We Do",
    title: "두 가지 혁신으로\n새로운 가능성을 만듭니다.",
    desc: "시니어의 삶을 재설계하는 플랫폼 기술과 지속 가능한 미래를 위한 친환경 스마트팜 기술—두 가지 축으로 초고령화 사회의 문제를 기회로 전환합니다.",
    pillars: [
      {
        num: "01",
        tag: "Senior Life Platform",
        title: "이막일장",
        title_en: "二幕一章",
        subtitle: "Senior Life Masterplan Portal",
        desc: "은퇴 전·후 시니어의 삶 전체를 통합 관리하는 데이터 기반 포털 플랫폼. 단 한 번의 AI 진단으로 객관적 은퇴 준비 지수를 산출하고, 맞춤형 마스터플랜을 제공합니다.",
        features: [
          "7대 코어 생태계 (건강·자산·주거·일자리·웰다잉)",
          "What-if 시뮬레이션 — 아파트 시세 → 주택연금 변환",
          "마이데이터 연동 통합 자산·건강·연금 분석",
          "역경매 기반 전문가 1:1 비대면 매칭",
        ],
        cta: "이막일장 상세 보기",
        link: "/imakiljang",
      },
      {
        num: "02",
        tag: "Moss Agrivoltaics",
        title: "이끼 스마트팜",
        title_en: "Smart Moss Farm",
        subtitle: "Agrivoltaic Ecosystem & Smart Bio-Air Terrarium",
        desc: "이끼의 탁월한 공기 정화 능력과 어그리볼태익 기술을 결합한 친환경 스마트팜. 탄소 저감, 시니어 일자리 창출, 실내 공기질 개선을 동시에 실현합니다.",
        features: [
          "스마트 바이오-에어 테라리움 (특허 출원 중)",
          "카트리지형 이끼 패널 + 자동화 급수 시스템",
          "K-Taxonomy 녹색분류체계 적합 기술",
          "시니어 긱워커 연계 일자리 창출 모델",
        ],
        cta: null,
        link: null,
      },
    ],
  },
  en: {
    section_num: "01",
    section_label: "What We Do",
    title: "Two innovations.\nOne mission.",
    desc: "We combine a senior life redesign platform with eco-friendly smart farm technology to transform the challenges of an aging society into opportunities.",
    pillars: [
      {
        num: "01",
        tag: "Senior Life Platform",
        title: "Imakiljang",
        title_en: "二幕一章",
        subtitle: "Senior Life Masterplan Portal",
        desc: "A data-driven portal platform that comprehensively manages the entire life of seniors before and after retirement. One AI diagnosis generates an objective retirement readiness score and a personalized masterplan.",
        features: [
          "7-Core Ecosystem (Health · Finance · Housing · Jobs · Legacy)",
          "What-if Simulation — Apartment value → Pension cash flow",
          "MyData integration for unified asset, health & pension analysis",
          "Reverse-auction expert matching (1:1 non-face-to-face)",
        ],
        cta: "Explore Imakiljang",
        link: "/imakiljang",
      },
      {
        num: "02",
        tag: "Moss Agrivoltaics",
        title: "Moss Smart Farm",
        title_en: "Smart Moss Farm",
        subtitle: "Agrivoltaic Ecosystem & Smart Bio-Air Terrarium",
        desc: "An eco-friendly smart farm combining moss's superior air purification capabilities with agrivoltaic technology. Simultaneously achieves carbon reduction, senior job creation, and indoor air quality improvement.",
        features: [
          "Smart Bio-Air Terrarium (Patent Pending)",
          "Cartridge-type moss panel + automated irrigation system",
          "K-Taxonomy Green Classification compliant technology",
          "Senior gig-worker linked job creation model",
        ],
        cta: null,
        link: null,
      },
    ],
  },
};

export default function WhatWeDoSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const [active, setActive] = useState(0);
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  const pillar = t.pillars[active];
  const img = active === 0 ? SENIOR_IMG : MOSS_IMG;

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="fade-up py-24 md:py-32"
      style={{ backgroundColor: "#F8F7F4" }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-num">{t.section_num}</span>
              <span className="w-8 h-px bg-[#C9A84C]" />
              <span className="section-label">{t.section_label}</span>
            </div>
            <h2
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.2]"
              style={{ color: "#0F1C2E", whiteSpace: "pre-line" }}
            >
              {t.title}
            </h2>
          </div>
          <p className="font-body text-sm text-[#6B6560] leading-relaxed max-w-sm">
            {t.desc}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E8E5DF] mb-12">
          {t.pillars.map((p, i) => (
            <button
              key={p.num}
              onClick={() => setActive(i)}
              className={`relative pb-4 pr-8 font-body text-sm font-medium transition-colors duration-300 ${
                active === i ? "text-[#1B3A2D]" : "text-[#9A9590] hover:text-[#3D3A35]"
              }`}
            >
              <span className="font-en text-xs mr-2" style={{ color: active === i ? "#C9A84C" : "#C9A84C88" }}>
                {p.num}
              </span>
              {p.tag}
              {active === i && (
                <span className="absolute bottom-0 left-0 right-8 h-0.5 bg-[#1B3A2D]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img
              src={img}
              alt={pillar.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            {/* Image overlay tag */}
            <div
              className="absolute top-4 left-4 px-3 py-1.5"
              style={{ backgroundColor: "#1B3A2D" }}
            >
              <span className="font-en text-xs text-white tracking-widest uppercase font-medium">
                {pillar.tag}
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-start">
            {/* Title Block */}
            <div className="mb-6 pb-6 border-b border-[#E8E5DF]">
              <div className="flex items-baseline gap-3 mb-1">
                <h3 className="font-display font-bold text-3xl md:text-4xl" style={{ color: "#0F1C2E" }}>
                  {pillar.title}
                </h3>
                <span className="font-accent italic text-lg" style={{ color: "#9A9590" }}>
                  {pillar.title_en}
                </span>
              </div>
              <p className="font-en text-xs tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                {pillar.subtitle}
              </p>
            </div>

            <p className="font-body text-sm text-[#3D3A35] leading-relaxed mb-8">
              {pillar.desc}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {pillar.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#1B3A2D" }}
                  />
                  <span className="font-body text-sm text-[#3D3A35]">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {pillar.cta && pillar.link && (
              <Link
                href={pillar.link}
                className="btn-primary self-start group"
              >
                {pillar.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
