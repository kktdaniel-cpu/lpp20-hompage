/**
 * Imakiljang (이막일장) Detail Page — Renewal v2
 * Design: "Established Authority" — Dark Navy + Forest Green + Warm Gold
 *
 * Color System (aligned with homepage):
 *   Background: #0A1628 (Deep Navy), #0F1C2E (Dark Navy), #1B3A2D (Forest Green)
 *   Surface: #F5F3EF (Off-White), #FFFFFF (White)
 *   Primary text: #0A1628 (on light), #F5F3EF (on dark)
 *   Gold accent: #C9A84C (Warm Gold)
 *   Green accent: #2D6A4F (Forest Green mid)
 *   Muted: #6B7280
 *
 * Typography:
 *   Display: Noto Serif KR (font-display)
 *   Body: Noto Sans KR (font-body)
 *   Accent: Cormorant Garamond italic (font-accent)
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Heart, DollarSign, Home, Briefcase, ShoppingBag,
  Users, BookOpen, ArrowRight, ChevronDown, Check,
  Shield, Star, Zap, ArrowLeft, Activity, TrendingUp
} from "lucide-react";
import Navigation, { useLang } from "@/components/Navigation";
import Footer from "@/components/Footer";

// ─── Scroll Animation ─────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Bilingual Content ────────────────────────────────────────────────────────
const copy = {
  ko: {
    backLink: "라이프이점영 홈으로",
    heroLabel: "시니어 라이프 마스터플랜 포털",
    heroTitle: "이막일장",
    heroHanja: "二幕一章",
    heroSub: '"은퇴에서 별이 되기까지"',
    heroDesc: "은퇴 전·후 시니어의 삶 전체를 통합 관리하는 데이터 기반 포털 플랫폼. 단 한 번의 AI 진단으로 객관적 은퇴 준비 지수를 산출하고, 맞춤형 마스터플랜을 제공합니다.",
    heroCta1: "서비스 살펴보기",
    heroCta2: "사전 등록 문의",

    brandLabel: "Brand Identity",
    brandTitle: "당신의 진짜 이야기는",
    brandTitleAccent: "지금부터입니다.",
    actTitle: "2 Act (이막)",
    actDesc: "은퇴 후 새롭게 시작되는 인생의 두 번째 무대. 끝이 아닌 새로운 시작입니다.",
    chapterTitle: "1 Chapter (일장)",
    chapterDesc: "그 무대의 첫 장을 가장 안전하고 품격 있게 여는 시작점. 이막일장이 함께합니다.",

    coreLabel: "7-Core Ecosystem",
    coreTitle: "7가지 핵심 영역이",
    coreTitleAccent: "톱니바퀴처럼 맞물려",
    coreTitleSub: "시니어 라이프의 모든 순간을 케어합니다.",
    coreDesc: "건강부터 유산까지, 은퇴 전·후 삶의 7가지 핵심 영역을 하나의 플랫폼에서 통합 관리합니다. 단편적인 서비스가 아닌, 유기적으로 연결된 생태계입니다.",
    coreImgCaption: "7가지 핵심 영역이 하나의 생태계로",

    formulaLabel: "Stage 1 — Diagnosis",
    formulaTitle: "은퇴 준비 지수 산출 공식",
    formulaDesc: "단순한 자산 계산이 아닙니다. 건강 데이터와 활동성을 결합하여 '남은 생의 활력'을 과학적으로 수치화합니다.",

    stageLabel: "Service Structure",
    stageTitle: "4단계 서비스 구조",
    stageDesc: "진단부터 솔루션 매칭, 위기 대응, 웰다잉까지 — 인생 2막의 모든 순간을 함께합니다.",

    personaLabel: "Target Persona",
    personaTitle: "이막일장이 설계한",
    personaTitleAccent: "당신의 이야기",
    personaName: "강성훈",
    personaProfile: "46세 · 1980년생 · 중견기업 차장",
    personaPainTitle: "핵심 불안 요소",
    personaSolutionLabel: "이막일장의 해법",
    personaSolution: "남양주 아파트(10억) 주택연금 전환 시, 65세부터 매월 210만 원 현금 흐름 창출. 자산 고갈 시점 82세 → 95세로 연장.",

    bizLabel: "Business Model",
    bizTitle: "지속 가능한",
    bizTitleAccent: "수익 구조",
    bizDesc: "숨고의 역경매 모델과 볼드인의 What-if 시뮬레이션을 결합한 한국형 양면 시장 구조. B2C 무료 진단으로 트래픽을 확보하고, B2B 매칭 수수료로 수익을 창출합니다.",

    communityLabel: "Stage 3 — Community",
    communityTitle: "혼자가 아닌,",
    communityTitleAccent: "함께하는 인생 2막",
    communityDesc: "동일 은퇴 시기, 유사 자산 규모의 사용자들이 익명으로 연결되는 프리미엄 라운지. 고립감을 해소하고 서로의 경험을 나누며 더 나은 인생 2막을 설계합니다.",

    ctaLabel: "사전 등록 및 문의",
    ctaTitle: "이막일장과 함께",
    ctaTitleAccent: "인생 2막을 설계하세요",
    ctaDesc: "현재 이막일장 플랫폼은 개발 중입니다. 파트너십, 투자 문의, 사전 등록은 아래 버튼을 통해 연락해 주세요.",
    ctaBtn1: "파트너십 문의하기",
    ctaBtn2: "홈으로 돌아가기",
  },
  en: {
    backLink: "Back to Life 2.0",
    heroLabel: "Senior Life Masterplan Portal",
    heroTitle: "Imakiljang",
    heroHanja: "二幕一章",
    heroSub: '"From Retirement to Legacy"',
    heroDesc: "A data-driven portal platform for comprehensive senior life management. One AI diagnosis generates an objective retirement readiness score and a personalized masterplan.",
    heroCta1: "Explore Service",
    heroCta2: "Pre-register",

    brandLabel: "Brand Identity",
    brandTitle: "Your real story",
    brandTitleAccent: "starts now.",
    actTitle: "2 Act (이막)",
    actDesc: "The second stage of life that begins after retirement — not an ending, but a new beginning.",
    chapterTitle: "1 Chapter (일장)",
    chapterDesc: "The opening chapter of that stage, crafted with safety and dignity. Imakiljang is with you.",

    coreLabel: "7-Core Ecosystem",
    coreTitle: "7 core domains",
    coreTitleAccent: "interlocking seamlessly",
    coreTitleSub: "to care for every moment of senior life.",
    coreDesc: "From health to legacy, 7 key domains of pre- and post-retirement life managed in one integrated platform — not fragmented services, but a living ecosystem.",
    coreImgCaption: "7 core domains as one ecosystem",

    formulaLabel: "Stage 1 — Diagnosis",
    formulaTitle: "Retirement Readiness Score Formula",
    formulaDesc: "More than asset calculation. We combine health data and activity levels to scientifically quantify your remaining life vitality.",

    stageLabel: "Service Structure",
    stageTitle: "4-Stage Service Structure",
    stageDesc: "From diagnosis to solution matching, crisis response, and well-dying — together through every moment of Act 2.",

    personaLabel: "Target Persona",
    personaTitle: "A story designed",
    personaTitleAccent: "for you by Imakiljang",
    personaName: "Kang Seong-hun",
    personaProfile: "Age 46 · Born 1980 · Senior Manager",
    personaPainTitle: "Core Anxieties",
    personaSolutionLabel: "Imakiljang's Solution",
    personaSolution: "Converting a ₩1B apartment to housing pension generates ₩2.1M/month from age 65. Asset depletion age extended from 82 → 95.",

    bizLabel: "Business Model",
    bizTitle: "Sustainable",
    bizTitleAccent: "Revenue Structure",
    bizDesc: "A Korean two-sided market combining reverse-auction matching (숨고 model) with What-if simulation (볼드인 model). Free B2C diagnosis drives traffic; B2B matching fees generate revenue.",

    communityLabel: "Stage 3 — Community",
    communityTitle: "Not alone,",
    communityTitleAccent: "Act 2 together",
    communityDesc: "A premium lounge connecting users with similar retirement timelines and asset profiles anonymously. Break isolation, share experiences, and design a better second act.",

    ctaLabel: "Pre-registration & Inquiry",
    ctaTitle: "Design your Act 2",
    ctaTitleAccent: "with Imakiljang",
    ctaDesc: "The Imakiljang platform is currently in development. For partnership, investment, or pre-registration inquiries, please contact us below.",
    ctaBtn1: "Partnership Inquiry",
    ctaBtn2: "Back to Home",
  },
};

// ─── 7 Core Data ─────────────────────────────────────────────────────────────
const cores = [
  {
    id: "01", en: "Health", ko: "건강 케어",
    icon: Heart, color: "#E05252", bg: "rgba(224,82,82,0.1)",
    desc: "AI 24시간 안심 케어와 웨어러블 기반 골든타임 세이프티 솔루션으로 시니어의 건강과 안전을 지킵니다.",
    descEn: "24/7 AI safety care and wearable-based golden-time safety solutions protect senior health.",
  },
  {
    id: "02", en: "Finance", ko: "은퇴 자산",
    icon: DollarSign, color: "#C9A84C", bg: "rgba(201,168,76,0.1)",
    desc: "마이데이터 연동으로 3층 연금·부동산·금융 자산을 통합 분석하고 자산 고갈 시점을 시각화합니다.",
    descEn: "MyData integration analyzes 3-tier pension, real estate, and financial assets with depletion visualization.",
  },
  {
    id: "03", en: "Housing", ko: "주거 매칭",
    icon: Home, color: "#4A90D9", bg: "rgba(74,144,217,0.1)",
    desc: "아파트 실거래가를 주택연금 월 현금흐름으로 자동 변환하는 한국형 특화 시뮬레이션을 제공합니다.",
    descEn: "Korea-specific simulation automatically converts apartment market prices to monthly housing pension cash flows.",
  },
  {
    id: "04", en: "Job", ko: "일자리 매칭",
    icon: Briefcase, color: "#2D6A4F", bg: "rgba(45,106,79,0.1)",
    desc: "탤런트뱅크 방식의 프리미엄 시니어 긱워커 매칭으로 단순 노무가 아닌 전문성 기반 일자리를 연결합니다.",
    descEn: "Premium senior gig-worker matching connects expertise-based jobs, not simple labor.",
  },
  {
    id: "05", en: "Shopping", ko: "시니어 커머스",
    icon: ShoppingBag, color: "#8B5CF6", bg: "rgba(139,92,246,0.1)",
    desc: "시니어 라이프스타일에 최적화된 건강·취미·여행 큐레이션 커머스로 품격 있는 소비를 지원합니다.",
    descEn: "Curated commerce for health, hobbies, and travel optimized for senior lifestyles.",
  },
  {
    id: "06", en: "Community", ko: "프리미엄 라운지",
    icon: Users, color: "#0EA5A0", bg: "rgba(14,165,160,0.1)",
    desc: "동일 은퇴 시기·유사 자산 규모 사용자 간 익명 매칭 라운지로 고립감을 해소하고 연대를 만듭니다.",
    descEn: "Anonymous matching lounge for users with similar retirement timelines and asset profiles.",
  },
  {
    id: "07", en: "Legacy", ko: "디지털 유산 금고",
    icon: BookOpen, color: "#94A3B8", bg: "rgba(148,163,184,0.1)",
    desc: "종단간 암호화(E2EE) 기반 유언장·계좌·디지털 기록을 안전하게 보관하고 지정 시점에 전달합니다.",
    descEn: "E2EE-encrypted secure storage for wills, accounts, and digital records with timed delivery.",
  },
];

// ─── 4 Stage Service ──────────────────────────────────────────────────────────
const stages = [
  {
    num: "01", label: "Stage 1",
    title: "진단 (Diagnosis)", titleEn: "Diagnosis",
    subtitle: "은퇴 준비 지수 산출", subtitleEn: "Retirement Readiness Score",
    color: "#C9A84C",
    features: [
      "마이데이터 연동 자산·건강·연금 자동 수집",
      "What-if 시뮬레이션 — 슬라이더로 변수 조작",
      "한국형 특화: 아파트 시세 → 주택연금 현금흐름 변환",
      "웰다잉 코어: MBTI 스와이프 방식 직관적 진단",
      "리워드: 부동산 시뮬레이터 1회 무료 이용권",
    ],
    featuresEn: [
      "Auto-collect assets, health, and pension via MyData",
      "What-if simulation — adjust variables with sliders",
      "Korea-specific: apartment price → housing pension conversion",
      "Well-dying core: MBTI swipe-style intuitive diagnosis",
      "Reward: 1 free real estate simulator session",
    ],
    formula: "Score = (Asset + Health) / Goal × Activity",
    formulaDesc: "단순 자산 계산이 아닙니다. 건강 데이터와 활동성을 결합하여 '남은 생의 활력'을 과학적으로 수치화합니다.",
  },
  {
    num: "02", label: "Stage 2",
    title: "솔루션 매칭", titleEn: "Solution Matching",
    subtitle: "맞춤 설계 및 전문가 연결", subtitleEn: "Custom Planning & Expert Connection",
    color: "#2D6A4F",
    features: [
      "AI 기반 5~10년 마스터플랜 타임라인 자동 생성",
      "한국FP협회 은퇴설계전문가 1:1 역경매 매칭",
      "시니어 긱워커 일자리 매칭 (공공 + 프리미엄 DB)",
      "반경 내 1등급 요양병원 3곳 압축 추천",
      "웰다잉: 상조·법무법인 비교 견적 자동화",
    ],
    featuresEn: [
      "AI-generated 5-10 year masterplan timeline",
      "1:1 reverse-auction matching with certified retirement planners",
      "Senior gig-worker job matching (public + premium DB)",
      "Top 3 Grade-1 care hospitals within radius",
      "Well-dying: automated funeral & legal firm comparison quotes",
    ],
    formula: null,
    formulaDesc: null,
  },
  {
    num: "03", label: "Stage 3",
    title: "위기 대응", titleEn: "Crisis Response",
    subtitle: "골든타임 세이프티 솔루션", subtitleEn: "Golden-Time Safety Solution",
    color: "#E05252",
    features: [
      "감지(Detection): 웨어러블 이상 징후 실시간 포착",
      "분석(AI Analysis): 생체 리듬 변화 위험 상황 판별",
      "전송(Transmission): 위치 + 병력 데이터 자동 전송",
      "진입(Access): 스마트 도어락 자동 개방",
      "골든타임 확보 — 닫힌 문을 부수는 5분을 기술로",
    ],
    featuresEn: [
      "Detection: real-time wearable anomaly capture",
      "AI Analysis: biometric rhythm change risk assessment",
      "Transmission: auto-send location + medical history",
      "Access: smart door lock auto-unlock",
      "Securing golden time — 5 minutes that save lives",
    ],
    formula: null,
    formulaDesc: null,
  },
  {
    num: "04", label: "Stage 4",
    title: "웰다잉 솔루션", titleEn: "Well-Dying Solution",
    subtitle: "품격 있는 마무리", subtitleEn: "A Dignified Farewell",
    color: "#94A3B8",
    features: [
      "시크릿 유언 금고: 블록체인 기반 안전 보관",
      "디지털 유산 정리: 금융 자산 체계적 상속 지원",
      "엔딩 매니지먼트: 죽음은 끝이 아닌 별이 되는 과정",
      "유가족 자동 알림 및 암호화 열람 권한 양도",
      "개인 뮤지엄·다잉메시지 영상 촬영 및 유품 보관",
    ],
    featuresEn: [
      "Secret will vault: blockchain-based secure storage",
      "Digital legacy management: systematic asset inheritance",
      "Ending management: death as becoming a star, not an end",
      "Auto-notification to family with encrypted access transfer",
      "Personal museum, dying message video, and keepsake storage",
    ],
    formula: null,
    formulaDesc: null,
  },
];

// ─── Business Model ───────────────────────────────────────────────────────────
const bizModels = [
  { step: "01", title: "무료 진단", titleEn: "Free Diagnosis", desc: "B2C 무료 진단으로 트래픽 확보 및 데이터 축적", descEn: "B2C free diagnosis for traffic acquisition and data accumulation", icon: Activity, color: "#2D6A4F" },
  { step: "02", title: "유료 시뮬레이터", titleEn: "Premium Simulator", desc: "부동산 주택연금 시뮬레이터 등 프리미엄 진단 기능", descEn: "Premium diagnostic features including real estate housing pension simulator", icon: TrendingUp, color: "#C9A84C" },
  { step: "03", title: "전문가 매칭 수수료", titleEn: "Expert Matching Fee", desc: "역경매 기반 B2B 과금 — 전문가가 견적 회신 시 과금", descEn: "Reverse-auction B2B billing — charged when experts submit quotes", icon: Users, color: "#4A90D9" },
  { step: "04", title: "구독 서비스", titleEn: "Subscription", desc: "프리미엄 라운지 + 디지털 유산 금고 월정액 구독", descEn: "Premium lounge + digital legacy vault monthly subscription", icon: Star, color: "#8B5CF6" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Imakiljang() {
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { lang } = useLang();
  const t = copy[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3EF] font-body">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/10">
        <div
          className="h-full bg-[#C9A84C] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/imakiljang_hero-kgkLo2ePcYrCv9AZ7GEpzn.webp"
            alt="이막일장 히어로"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/50 to-[#0A1628]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/70 to-transparent" />
        </div>

        {/* Back Link */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="container">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#C9A84C] transition-colors duration-300 text-sm font-body"
            >
              <ArrowLeft size={14} />
              {t.backLink}
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container pb-20 md:pb-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#C9A84C]" />
              <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">
                {t.heroLabel}
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-[1.05] mb-3">
              {t.heroTitle}
            </h1>
            <p className="font-display text-2xl md:text-3xl text-[#C9A84C] mb-2 tracking-widest">
              {t.heroHanja}
            </p>
            <p className="font-accent italic text-white/50 text-lg md:text-xl mb-8">
              {t.heroSub}
            </p>

            <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-10">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#service-overview"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("service-overview")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold hover:bg-[#b8963e] transition-all duration-300"
              >
                {t.heroCta1}
                <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("imak-contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {t.heroCta2}
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs font-body tracking-widest" style={{ writingMode: "vertical-rl" }}>SCROLL</span>
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── BRAND MEANING ────────────────────────────────────────────────── */}
      <section id="service-overview" className="py-24 md:py-32 bg-[#0F1C2E]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.brandLabel}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                {t.brandTitle}<br />
                <span className="text-[#C9A84C]">{t.brandTitleAccent}</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-0.5 bg-[#C9A84C] flex-shrink-0" />
                  <div>
                    <p className="font-display text-white font-semibold mb-1.5">{t.actTitle}</p>
                    <p className="font-body text-white/50 text-sm leading-relaxed">{t.actDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-0.5 bg-[#2D6A4F] flex-shrink-0" />
                  <div>
                    <p className="font-display text-white font-semibold mb-1.5">{t.chapterTitle}</p>
                    <p className="font-body text-white/50 text-sm leading-relaxed">{t.chapterDesc}</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "1,000만+", label: lang === "ko" ? "65세 이상 인구" : "65+ Population", sub: lang === "ko" ? "전체 인구의 20% 초과" : "Over 20% of total population" },
                  { num: "70~80%", label: lang === "ko" ? "시니어 자산 중 부동산" : "Senior Assets in Real Estate", sub: lang === "ko" ? "현금 흐름 전무" : "Zero cash flow" },
                  { num: "10년", label: lang === "ko" ? "소득 공백기" : "Income Gap", sub: lang === "ko" ? "은퇴~국민연금 수령 전" : "Retirement to pension receipt" },
                  { num: "3대 불안", label: lang === "ko" ? "건강·빈곤·고립" : "Health·Poverty·Isolation", sub: lang === "ko" ? "통합 솔루션 부재" : "No integrated solution" },
                ].map((stat, i) => (
                  <FadeUp key={i} delay={0.08 * i}>
                    <div className="p-5 border border-white/8 bg-white/4 hover:bg-white/7 transition-colors duration-300">
                      <p className="font-display text-2xl font-bold text-[#C9A84C] mb-1">{stat.num}</p>
                      <p className="font-body text-white text-sm font-medium mb-0.5">{stat.label}</p>
                      <p className="font-body text-white/35 text-xs">{stat.sub}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 7 CORE ECOSYSTEM ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F5F3EF]">
        <div className="container">
          <FadeUp>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.coreLabel}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1628] leading-tight mb-4">
                {t.coreTitle}<br />
                <span className="text-[#2D6A4F]">{t.coreTitleAccent}</span><br />
                {t.coreTitleSub}
              </h2>
              <p className="font-body text-[#6B7280] max-w-xl leading-relaxed">{t.coreDesc}</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: Image */}
            <FadeUp>
              <div className="relative overflow-hidden aspect-square max-w-md mx-auto md:mx-0">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/imakiljang_diagnosis-iKpKTkJ7SfHb5jjeDKSDNo.webp"
                  alt="7대 코어 생태계"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent flex items-end p-6">
                  <p className="font-display text-white text-lg font-semibold">{t.coreImgCaption}</p>
                </div>
              </div>
            </FadeUp>

            {/* Right: Core Cards */}
            <div className="grid grid-cols-1 gap-2.5">
              {cores.map((core, i) => {
                const Icon = core.icon;
                return (
                  <FadeUp key={core.id} delay={i * 0.05}>
                    <div className="group flex items-start gap-4 p-4 border border-[#E5E0D8] hover:border-[#C9A84C]/40 bg-white hover:bg-[#FAFAF8] transition-all duration-300 cursor-default">
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{ background: core.bg }}
                      >
                        <Icon size={18} style={{ color: core.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-accent italic text-xs text-[#94A3B8]">{core.id}</span>
                          <span className="font-display text-sm font-semibold text-[#0A1628]">{core.ko}</span>
                          <span className="font-accent italic text-xs text-[#94A3B8]">{core.en}</span>
                        </div>
                        <p className="font-body text-xs text-[#6B7280] leading-relaxed">
                          {lang === "ko" ? core.desc : core.descEn}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCORE FORMULA ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#0A1628] overflow-hidden">
        <div className="container">
          <FadeUp>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.formulaLabel}</span>
                <div className="w-6 h-px bg-[#C9A84C]" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                {t.formulaTitle}
              </h2>
              <p className="font-body text-white/45 max-w-lg mx-auto">{t.formulaDesc}</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <div className="p-8 md:p-12 border border-[#C9A84C]/25 bg-white/3 text-center mb-8">
                <div className="font-display text-xl md:text-3xl text-white mb-2 leading-loose">
                  <span className="text-white/60">Score =</span>
                  <span className="inline-block mx-4 text-center">
                    <span className="block border-b border-white/40 pb-2 px-4 mb-2">
                      <span className="text-[#C9A84C]">Asset(C)</span>
                      <span className="text-white/40 mx-2">+</span>
                      <span className="text-[#E05252]">Health(H)</span>
                    </span>
                    <span className="text-[#4A90D9] text-lg md:text-2xl">Goal(G)</span>
                  </span>
                  <span className="text-white/40 mx-2">×</span>
                  <span className="text-[#2D6A4F]">Activity(W)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { var: "C (Cash)", label: lang === "ko" ? "현재 자산 + 연금" : "Current Assets + Pension", color: "#C9A84C" },
                  { var: "H (Health)", label: lang === "ko" ? "생체 나이 및 기대 건강 수명" : "Biological age & expected health span", color: "#E05252" },
                  { var: "G (Goal)", label: lang === "ko" ? "목표 은퇴 생활비 및 의료 예비비" : "Target retirement living & medical reserve", color: "#4A90D9" },
                  { var: "W (Work)", label: lang === "ko" ? "은퇴 후 소득 활동 및 커뮤니티 참여도" : "Post-retirement income activity & community engagement", color: "#2D6A4F" },
                ].map((item, i) => (
                  <FadeUp key={i} delay={0.05 * i}>
                    <div className="p-4 border border-white/8 bg-white/4 text-center">
                      <p className="font-display text-sm font-bold mb-1.5" style={{ color: item.color }}>{item.var}</p>
                      <p className="font-body text-white/40 text-xs leading-relaxed">{item.label}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 4 STAGE SERVICE ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F5F3EF]">
        <div className="container">
          <FadeUp>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.stageLabel}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1628] leading-tight mb-4">
                {t.stageTitle}
              </h2>
              <p className="font-body text-[#6B7280] max-w-xl leading-relaxed">{t.stageDesc}</p>
            </div>
          </FadeUp>

          {/* Stage Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {stages.map((stage, i) => (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeStage === i
                    ? "bg-[#0A1628] text-white"
                    : "border border-[#D1CBC0] text-[#6B7280] hover:border-[#0A1628] hover:text-[#0A1628]"
                }`}
              >
                <span className="font-accent italic mr-2" style={{ color: activeStage === i ? "#C9A84C" : stages[i].color }}>
                  {stage.num}
                </span>
                {lang === "ko" ? stage.title : stage.titleEn}
              </button>
            ))}
          </div>

          {/* Stage Content */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeUp key={activeStage}>
              <div>
                <p className="font-accent italic text-sm mb-2" style={{ color: stages[activeStage].color }}>
                  {stages[activeStage].label}
                </p>
                <h3 className="font-display text-3xl font-bold text-[#0A1628] mb-1">
                  {lang === "ko" ? stages[activeStage].title : stages[activeStage].titleEn}
                </h3>
                <p className="font-body text-[#6B7280] mb-8">
                  {lang === "ko" ? stages[activeStage].subtitle : stages[activeStage].subtitleEn}
                </p>

                <ul className="space-y-3">
                  {(lang === "ko" ? stages[activeStage].features : stages[activeStage].featuresEn).map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: stages[activeStage].color + "18" }}
                      >
                        <Check size={10} style={{ color: stages[activeStage].color }} />
                      </div>
                      <span className="font-body text-sm text-[#374151] leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                {stages[activeStage].formula && (
                  <div className="mt-8 p-5 bg-[#0F1C2E]">
                    <p className="font-display text-[#C9A84C] text-sm font-semibold mb-2">
                      {lang === "ko" ? "진단 공식" : "Diagnosis Formula"}
                    </p>
                    <p className="font-accent italic text-white text-base mb-2">{stages[activeStage].formula}</p>
                    <p className="font-body text-white/45 text-xs leading-relaxed">{stages[activeStage].formulaDesc}</p>
                  </div>
                )}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative overflow-hidden aspect-[4/3]">
                {activeStage === 0 && (
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/imakiljang_planning-68DundbFeGUSBTK94sSWTd.webp"
                    alt="진단 단계"
                    className="w-full h-full object-cover"
                  />
                )}
                {activeStage === 1 && (
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/senior_platform-6JNFmSRfmRCqjXXpJvQpFN.webp"
                    alt="솔루션 매칭"
                    className="w-full h-full object-cover"
                  />
                )}
                {activeStage === 2 && (
                  <div className="w-full h-full bg-[#0F1C2E] flex flex-col items-center justify-center p-8 text-center">
                    <Shield size={48} className="text-[#E05252] mb-4" />
                    <p className="font-display text-white text-xl font-bold mb-2">
                      {lang === "ko" ? "골든타임 세이프티" : "Golden-Time Safety"}
                    </p>
                    <p className="font-body text-white/45 text-sm">
                      {lang === "ko" ? "닫힌 문을 부수는 5분,\n그 시간을 기술로 돌려드립니다." : "5 minutes that break through closed doors,\nreturned to you through technology."}
                    </p>
                    <div className="mt-6 flex gap-3 flex-wrap justify-center">
                      {(lang === "ko" ? ["감지", "분석", "전송", "진입"] : ["Detect", "Analyze", "Transmit", "Access"]).map((step, i) => (
                        <div key={i} className="px-3 py-1.5 border border-[#E05252]/40 text-[#E05252] text-xs font-body">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeStage === 3 && (
                  <div className="w-full h-full bg-[#0A1628] flex flex-col items-center justify-center p-8 text-center">
                    <Star size={48} className="text-[#C9A84C] mb-4" />
                    <p className="font-display text-white text-xl font-bold mb-2">
                      {lang === "ko" ? "죽음은 끝이 아닙니다" : "Death is not the end"}
                    </p>
                    <p className="font-body text-white/45 text-sm">
                      {lang === "ko" ? "별이 되는 과정,\n이막일장이 품격 있게 함께합니다." : "The process of becoming a star,\nImakiljang walks with you with dignity."}
                    </p>
                  </div>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── PERSONA ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0F1C2E]">
        <div className="container">
          <FadeUp>
            <div className="mb-14 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.personaLabel}</span>
                <div className="w-6 h-px bg-[#C9A84C]" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                {t.personaTitle}<br />
                <span className="text-[#C9A84C]">{t.personaTitleAccent}</span>
              </h2>
            </div>
          </FadeUp>

          <div className="max-w-4xl mx-auto">
            <FadeUp delay={0.1}>
              <div className="grid md:grid-cols-2 gap-0 overflow-hidden border border-white/10">
                {/* Left: Persona Profile */}
                <div className="bg-[#1B3A2D] p-8 md:p-10">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-14 h-14 bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-[#C9A84C] text-xl font-bold">강</span>
                    </div>
                    <div>
                      <p className="font-display text-white text-xl font-bold">{t.personaName}</p>
                      <p className="font-body text-white/45 text-sm">{t.personaProfile}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: lang === "ko" ? "월 수입" : "Monthly Income", value: lang === "ko" ? "400만 원" : "₩4M/month" },
                      { label: lang === "ko" ? "자산" : "Assets", value: lang === "ko" ? "남양주 아파트 1채" : "1 apartment in Namyangju" },
                      { label: lang === "ko" ? "은퇴 시점" : "Retirement", value: lang === "ko" ? "5~8년 후 예상" : "Expected in 5-8 years" },
                      { label: lang === "ko" ? "희망 일자리" : "Desired Work", value: lang === "ko" ? "단순 노무 아닌 긱워커" : "Expertise-based gig work" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/8 pb-3">
                        <span className="font-body text-white/45 text-sm">{item.label}</span>
                        <span className="font-body text-white text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Pain Points & Solution */}
                <div className="bg-white p-8 md:p-10">
                  <p className="font-display text-[#0A1628] text-lg font-bold mb-6">{t.personaPainTitle}</p>
                  <div className="space-y-3.5 mb-8">
                    {(lang === "ko" ? [
                      "국민연금 수령 전 10년 소득 공백기",
                      "아파트 자산이 묶여 현금 흐름 전무",
                      "복잡한 인증 절차와 수기 입력 기피",
                      "단순 노무직 아닌 전문성 활용 일자리 부재",
                    ] : [
                      "10-year income gap before national pension receipt",
                      "Apartment assets locked with zero cash flow",
                      "Avoidance of complex authentication and manual input",
                      "Lack of expertise-based jobs beyond simple labor",
                    ]).map((pain, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E05252] flex-shrink-0 mt-2" />
                        <p className="font-body text-sm text-[#374151] leading-relaxed">{pain}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-[#F0F7F4] border-l-2 border-[#2D6A4F]">
                    <p className="font-display text-[#2D6A4F] text-sm font-semibold mb-1.5">{t.personaSolutionLabel}</p>
                    <p className="font-body text-[#374151] text-xs leading-relaxed">{t.personaSolution}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODEL ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F5F3EF]">
        <div className="container">
          <FadeUp>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.bizLabel}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1628] leading-tight mb-4">
                {t.bizTitle}<br />
                <span className="text-[#C9A84C]">{t.bizTitleAccent}</span>
              </h2>
              <p className="font-body text-[#6B7280] max-w-xl leading-relaxed">{t.bizDesc}</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-4 gap-0 border border-[#E5E0D8]">
            {bizModels.map((biz, i) => {
              const Icon = biz.icon;
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className={`p-6 md:p-8 h-full ${i < 3 ? "border-b md:border-b-0 md:border-r border-[#E5E0D8]" : ""} group hover:bg-white transition-colors duration-300`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-accent italic text-xs text-[#94A3B8]">{biz.step}</span>
                      <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ background: biz.color + "15" }}
                      >
                        <Icon size={16} style={{ color: biz.color }} />
                      </div>
                    </div>
                    <p className="font-display text-[#0A1628] font-semibold mb-2">
                      {lang === "ko" ? biz.title : biz.titleEn}
                    </p>
                    <p className="font-body text-[#6B7280] text-xs leading-relaxed">
                      {lang === "ko" ? biz.desc : biz.descEn}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#1B3A2D]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/imakiljang_community-CfAMn8r3VV727XcGonSi2o.webp"
                  alt="시니어 커뮤니티"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.communityLabel}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                {t.communityTitle}<br />
                <span className="text-[#C9A84C]">{t.communityTitleAccent}</span>
              </h2>
              <p className="font-body text-white/55 leading-relaxed mb-8">{t.communityDesc}</p>
              <div className="space-y-4">
                {[
                  { icon: Users, label: lang === "ko" ? "프리미엄 라운지" : "Premium Lounge", desc: lang === "ko" ? "동일 조건 사용자 익명 매칭 커뮤니티" : "Anonymous matching community for similar-profile users" },
                  { icon: Shield, label: lang === "ko" ? "디지털 유산 금고" : "Digital Legacy Vault", desc: lang === "ko" ? "E2EE 암호화 기반 안전한 유언 보관" : "E2EE-encrypted secure will storage" },
                  { icon: Zap, label: lang === "ko" ? "골든타임 세이프티" : "Golden-Time Safety", desc: lang === "ko" ? "24시간 AI 위기 감지 및 자동 대응" : "24/7 AI crisis detection and auto-response" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#C9A84C]" />
                      </div>
                      <div>
                        <p className="font-display text-white text-sm font-semibold mb-0.5">{item.label}</p>
                        <p className="font-body text-white/45 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="imak-contact" className="py-24 md:py-32 bg-[#F5F3EF]">
        <div className="container">
          <FadeUp>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-accent italic text-[#C9A84C] text-sm tracking-widest uppercase">{t.ctaLabel}</span>
                <div className="w-6 h-px bg-[#C9A84C]" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1628] leading-tight mb-6">
                {t.ctaTitle}<br />
                <span className="text-[#2D6A4F]">{t.ctaTitleAccent}</span>
              </h2>
              <p className="font-body text-[#6B7280] leading-relaxed mb-10">{t.ctaDesc}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2D6A4F] text-white text-sm font-semibold hover:bg-[#1B3A2D] transition-all duration-300"
                >
                  {t.ctaBtn1}
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#0A1628] text-[#0A1628] text-sm font-medium hover:bg-[#0A1628] hover:text-white transition-all duration-300"
                >
                  {t.ctaBtn2}
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
