/**
 * Who We Are Section — Life 2.0 Renewal v3
 * Design: "Established Authority" — Dark Navy background, credible & warm
 * Bilingual KO/EN, founding story, certifications, Team profiles
 */

import React from "react";
import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Mail } from "lucide-react";

const teamMembers = {
  ko: [
    {
      name: "김영범",
      title: "대표이사",
      titleEn: "CEO & Founder",
      img: "/manus-storage/kim-youngbeom-ceo-v2_4264f458.png",
      email: "bory70@lpp20.com",
      career: [
        "건국대학교 부동산대학원 경영관리 석사",
        "보람그룹 상무 · 자산개발사업부 (2014–2024)",
        "보람바이오텍㈜ 대표이사 (2021–2024)",
        "부동산개발전문인력 자격 보유",
      ],
      summary: "부동산 개발·시니어케어 융합 전문가. 24년 개발 경력을 바탕으로 시니어 생태계의 새로운 패러다임을 설계합니다.",
    },
    {
      name: "홍인철",
      title: "연구소장",
      titleEn: "Director of Research",
      img: "/manus-storage/team_hong_incheol_real_c5668395.jpg",
      email: "Daniel@lpp20.com",
      career: [
        "건국대학교 환경공학과 학사 / 부동산학 석사",
        "고려대학교 Executive MBA",
        "LS네트웍스 글로벌사업부 매니저 (2012–2016)",
        "환경기사 자격 · PM 인증 (KOCEA)",
      ],
      summary: "신재생에너지·환경공학·글로벌 비즈니스 22년 경력. 이끼 스마트팜 기술 R&D와 해외 사업 개발을 총괄합니다.",
    },
    {
      name: "김수련",
      title: "관리실장",
      titleEn: "Head of Operations",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/team_kim_suryeon-mCgttF6bQcpZoF78BKe7cf.webp",
      email: null,
      career: [
        "경영 관리 및 조직 운영 전문가",
        "재무·인사·법무 통합 관리",
        "스타트업 운영 체계 구축 경험",
        "내부 프로세스 최적화 및 파트너 관리",
      ],
      summary: "조직의 내실을 다지는 운영 전문가. 재무·인사·법무를 통합 관리하며 팀이 핵심 사업에 집중할 수 있도록 지원합니다.",
    },
  ],
  en: [
    {
      name: "Kim Young-beom",
      title: "CEO & Founder",
      titleEn: "CEO & Founder",
      img: "/manus-storage/kim-youngbeom-ceo-v2_4264f458.png",
      email: "bory70@lpp20.com",
      career: [
        "M.S. in Real Estate Management, Konkuk University",
        "Executive Director, Boram Group Asset Dev. (2014–2024)",
        "CEO, Boram Biotech Co., Ltd. (2021–2024)",
        "Certified Real Estate Development Professional",
      ],
      summary: "Expert in real estate development and senior care integration. Designing a new paradigm for the senior ecosystem based on 24 years of development experience.",
    },
    {
      name: "Hong In-cheol",
      title: "Director of Research",
      titleEn: "Director of Research",
      img: "/manus-storage/team_hong_incheol_real_c5668395.jpg",
      email: "Daniel@lpp20.com",
      career: [
        "B.S. Environmental Engineering, Konkuk Univ.",
        "Executive MBA, Korea University",
        "Manager, LS Networks Global Business Div. (2012–2016)",
        "Environmental Engineer · PM Certified (KOCEA)",
      ],
      summary: "22 years in renewable energy, environmental engineering, and global business. Leads R&D for moss smart farm technology and overseas business development.",
    },
    {
      name: "Kim Su-ryeon",
      title: "Head of Operations",
      titleEn: "Head of Operations",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/team_kim_suryeon-mCgttF6bQcpZoF78BKe7cf.webp",
      email: null,
      career: [
        "Business Management & Operations Specialist",
        "Integrated Finance, HR & Legal Management",
        "Startup Operations Framework Builder",
        "Internal Process Optimization & Partner Management",
      ],
      summary: "Operations expert who strengthens organizational foundations. Manages finance, HR, and legal affairs so the team can focus on core business.",
    },
  ],
};

const copy = {
  ko: {
    section_num: "02",
    section_label: "Who We Are",
    title: "우리는\n누구인가",
    quote: "은퇴 전·후 시니어의 삶 전체를 통합 관리하는 제2의 생애주기 맞춤형 데이터 기반 포털 플랫폼 기업.",
    desc1: "초고령화 사회의 3대 불안—건강, 빈곤, 고립—을 해소할 통합 솔루션을 만드는 데이터 기술 기반 소셜 벤처입니다.",
    desc2: "단편적인 시니어 서비스를 하나로 연결하여, 은퇴자가 사회의 부담이 아닌 새로운 동력이 되도록 지원합니다.",
    values: [
      { icon: "◈", title: "Health", ko: "건강한 노후", desc: "AI 기반 24시간 안심 케어와 웨어러블 생체신호 모니터링으로 시니어의 안전을 지킵니다." },
      { icon: "◇", title: "Wealth", ko: "지속 가능한 자산", desc: "데이터 기반 은퇴 설계와 지속 가능한 일자리 창출로 소득 공백 없는 노후를 설계합니다." },
      { icon: "△", title: "Dignity", ko: "존엄한 마무리", desc: "웰다잉과 디지털 유산 정리를 통해 인생의 마지막 장을 가장 존엄하게 준비합니다." },
    ],
    certs: [
      { label: "설립", value: "2025년 8월 20일" },
      { label: "기업 유형", value: "혁신성장유형 벤처기업" },
      { label: "인증", value: "소셜벤처기업" },
      { label: "R&D", value: "연구개발전담부서" },
    ],
    ceo_quote: "은퇴는 인생의 끝이 아니라 새로운 장의 시작입니다. 우리는 그 시작을 가장 존엄하게 만들기 위해 존재합니다.",
    ceo_name: "김영범",
    ceo_title: "대표이사 · Life 2.0",
    team_label: "Our Team",
    team_title: "라이프이점영을\n이끄는 사람들",
    team_desc: "부동산 개발, 환경공학, 신재생에너지, 글로벌 비즈니스의 전문가들이 모여 시니어 생태계의 새로운 미래를 만들어갑니다.",
    photo_notice: "",
    email_label: "이메일",
    career_label: "주요 경력",
  },
  en: {
    section_num: "02",
    section_label: "Who We Are",
    title: "Our story\nand mission.",
    quote: "A data-driven portal platform company for the second life cycle, comprehensively managing the entire lives of seniors before and after retirement.",
    desc1: "We are a data-technology-based social venture building integrated solutions to address the three major anxieties of an aging society: health, poverty, and isolation.",
    desc2: "We connect fragmented senior services into one ecosystem, enabling retirees to become new drivers of society rather than a burden.",
    values: [
      { icon: "◈", title: "Health", ko: "Healthy Aging", desc: "AI-powered 24/7 care and wearable biosignal monitoring to protect senior safety." },
      { icon: "◇", title: "Wealth", ko: "Sustainable Assets", desc: "Data-driven retirement planning and sustainable job creation for income-gap-free retirement." },
      { icon: "△", title: "Dignity", ko: "Dignified Closure", desc: "Preparing the final chapter of life with the utmost dignity through well-dying and digital legacy management." },
    ],
    certs: [
      { label: "Founded", value: "August 20, 2025" },
      { label: "Type", value: "Innovation Growth Venture" },
      { label: "Certified", value: "Social Venture" },
      { label: "R&D", value: "Dedicated R&D Division" },
    ],
    ceo_quote: "Retirement is not the end of life, but the beginning of a new chapter. We exist to make that beginning as dignified as possible.",
    ceo_name: "Kim Young-beom",
    ceo_title: "CEO · Life 2.0",
    team_label: "Our Team",
    team_title: "The people\nbehind Life 2.0",
    team_desc: "Experts in real estate development, environmental engineering, renewable energy, and global business come together to build a new future for the senior ecosystem.",
    photo_notice: "",
    email_label: "Email",
    career_label: "Career Highlights",
  },
};

export default function WhoWeAreSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const members = teamMembers[lang];
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;
  const teamRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  return (
    <>
      {/* ─── Company Identity Section ─── */}
      <section
        id="who-we-are"
        ref={sectionRef}
        className="fade-up py-24 md:py-32"
        style={{ backgroundColor: "var(--avo-deep)" }}
      >
        <div className="container">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-16">
            <span className="section-num">{t.section_num}</span>
            <span className="w-8 h-px bg-[var(--avo-mid)]" />
            <span className="font-en text-xs text-[var(--avo-mid)] tracking-[0.18em] uppercase font-semibold">
              {t.section_label}
            </span>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
            {/* Left: Title + Quote */}
            <div>
              <h2
                className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-8"
                style={{ whiteSpace: "pre-line" }}
              >
                {t.title}
              </h2>
              <blockquote
                className="font-body text-base md:text-lg leading-relaxed pl-5 mb-8"
                style={{
                  color: "rgba(248,247,244,0.75)",
                  borderLeft: "2px solid var(--avo-mid)",
                }}
              >
                "{t.quote}"
              </blockquote>
              <p className="font-body text-sm text-white/50 leading-relaxed mb-4">{t.desc1}</p>
              <p className="font-body text-sm text-white/50 leading-relaxed">{t.desc2}</p>
              {/* Certifications */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                {t.certs.map((c) => (
                  <div
                    key={c.label}
                    className="p-4 border"
                    style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="font-en text-xs text-white/30 tracking-widest uppercase mb-1">{c.label}</div>
                    <div className="font-body text-sm text-white/80 font-medium">{c.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Values + CEO Quote */}
            <div className="space-y-4">
              {t.values.map((v) => (
                <div
                  key={v.title}
                  className="p-6 border transition-all duration-300 hover:border-[var(--avo-deep)]"
                  style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 font-en text-lg font-bold mt-0.5" style={{ color: "var(--avo-mid)" }}>
                      {v.icon}
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-en text-sm font-semibold text-white tracking-wide">{v.title}</span>
                        <span className="font-body text-xs text-white/40">— {v.ko}</span>
                      </div>
                      <p className="font-body text-sm text-white/55 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* CEO Quote */}
              <div className="p-6" style={{ backgroundColor: "var(--avo-deep)" }}>
                <p className="font-accent italic text-base text-white/85 leading-relaxed mb-4">
                  "{t.ceo_quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm text-white"
                    style={{ backgroundColor: "var(--avo-main)" }}
                  >
                    {t.ceo_name[0]}
                  </div>
                  <div>
                    <div className="font-body text-sm font-medium text-white">{t.ceo_name}</div>
                    <div className="font-en text-xs text-white/40 tracking-wide">{t.ceo_title}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team Section ─── */}
      <section
        ref={teamRef}
        className="fade-up py-24 md:py-32"
        style={{ backgroundColor: "var(--avo-deep)" }}
      >
        <div className="container">
          {/* Team Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="section-num">02-1</span>
            <span className="w-8 h-px bg-[var(--avo-mid)]" />
            <span className="font-en text-xs text-[var(--avo-mid)] tracking-[0.18em] uppercase font-semibold">
              {t.team_label}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-16">
            <h2
              className="font-display font-bold text-3xl md:text-4xl text-white leading-[1.2]"
              style={{ whiteSpace: "pre-line" }}
            >
              {t.team_title}
            </h2>
            <p className="font-body text-sm text-white/50 leading-relaxed lg:max-w-sm">
              {t.team_desc}
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden border transition-all duration-500 hover:-translate-y-1"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "340px" }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(30,45,15,0.95) 0%, rgba(61,92,30,0.35) 50%, transparent 100%)",
                    }}
                  />
                  {/* Name overlay on photo */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="font-display font-bold text-xl text-white mb-0.5">{member.name}</div>
                    <div className="font-en text-xs text-[var(--avo-mid)] tracking-widest uppercase">{member.titleEn}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Summary */}
                  <p className="font-body text-sm text-white/65 leading-relaxed mb-5">
                    {member.summary}
                  </p>

                  {/* Career Highlights */}
                  <div className="mb-5">
                    <div className="font-en text-xs text-white/30 tracking-widest uppercase mb-3">
                      {t.career_label}
                    </div>
                    <ul className="space-y-2">
                      {member.career.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-[var(--avo-mid)]" />
                          <span className="font-body text-xs text-white/50 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  {member.email && (
                    <div
                      className="pt-4 border-t"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-white/40 hover:text-[var(--avo-mid)] transition-colors duration-200 group/email"
                      >
                        <Mail size={13} className="shrink-0" />
                        <span className="font-en text-xs tracking-wide">{member.email}</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: "var(--avo-mid)" }}
                />
              </div>
            ))}
          </div>

          {/* Photo notice */}
          <p className="font-body text-xs text-white/20 mt-8 text-center">{t.photo_notice}</p>
        </div>
      </section>
    </>
  );
}
