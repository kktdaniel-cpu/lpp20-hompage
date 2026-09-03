/**
 * Smartfarm (이끼 스마트팜) Detail Page
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
  Wind, Leaf, Zap, Users, TrendingUp, Shield,
  ArrowRight, ArrowLeft, ChevronDown, Award, Droplets,
  Sun, Activity, Globe, Layers
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
    heroLabel: "이끼 기반 공기 정화 기술",
    heroTitle: "스마트 바이오-에어 테라리움",
    heroSub: '"자연의 호흡을 기술로 완성하다"',
    heroDesc: "카트리지형 이끼 패널과 강제 하향식 정화 시스템이 결합된 신개념 공기 정화 솔루션. 특허 출원 중인 3중 입체 정화 경로로 미세먼지, CO₂, 습도를 동시에 제어합니다.",
    heroCta1: "기술 상세 보기",
    heroCta2: "파트너십 문의",

    conceptLabel: "Core Concept",
    conceptTitle: "식물이 숨쉬는 방식으로",
    conceptTitleAccent: "공기를 정화합니다.",
    conceptDesc: "기존 공기청정기는 필터를 교체하지만, 스마트 바이오-에어 테라리움은 살아있는 이끼가 스스로 공기를 정화합니다. 큐티클층이 없는 이끼의 표면과 수분의 이중 작용으로 미세먼지를 흡착하고, 식물 호흡으로 CO₂를 포집하며, 자연 증산으로 실내 습도를 최적화합니다.",
    conceptStat1: "미세먼지 흡착",
    conceptStat1Sub: "큐티클층 없는 표면 + 수분 이중 작용",
    conceptStat2: "CO₂ 저감",
    conceptStat2Sub: "식물 호흡을 통한 탄소 포집",
    conceptStat3: "천연 가습",
    conceptStat3Sub: "실내 적정 습도 자동 유지",

    techLabel: "Patent-Pending Technology",
    techTitle: "3중 입체 정화 경로",
    techTitleAccent: "(Triple Layer System)",
    techDesc: "외부 이끼 패널 → 내부 이끼 패널 → 바닥 이끼 패널로 이어지는 3단계 정화 경로가 공기와 이끼의 접촉 면적을 극대화합니다. 강제 하향식 집진 팬이 오염된 공기를 이끼 패널 전체에 고르게 통과시킵니다.",
    techSpec: "제품 규격: 500(W) × 500(D) × 1,150(H) mm",

    cartridgeLabel: "Cartridge System",
    cartridgeTitle: "교체 가능한",
    cartridgeTitleAccent: "카트리지 설계",
    cartridgeDesc: "이끼 카트리지는 샌드위치 적층 구조로 설계되어 비산 방지와 수분 최적화를 동시에 달성합니다. 전문 지식 없이도 손잡이를 잡고 슬라이드 방식으로 간편하게 교체할 수 있어, 시니어 긱워커가 정기 교체 서비스를 담당하는 비즈니스 모델과 완벽하게 연결됩니다.",

    layersLabel: "Sandwich Structure",
    layer1: "전면 격자망",
    layer1Sub: "5cm 간격 · 비산 방지",
    layer2: "생이끼 층",
    layer2Sub: "살아있는 이끼 · 공기 정화",
    layer3: "천연 압축솜",
    layer3Sub: "수분 보유 · 이끼 영양 공급",
    layer4: "후면 격자망",
    layer4Sub: "2.5cm 간격 · 구조 고정",

    controlLabel: "Integrated Control",
    controlTitle: "통합 제어",
    controlTitleAccent: "시스템",
    controlDesc: "하단 블랙 베이스 유닛에 미스트 분사 주기와 LED 조도를 독립적으로 제어하는 다이얼이 내장되어 있습니다. 물통과 전자 장비는 불투명 하부 유닛 내부에 완벽하게 수납되어 깔끔하고 모던한 외관을 유지합니다.",
    controlFeature1: "MIST 분사 제어",
    controlFeature1Sub: "이끼 자동 수분 공급 주기 조절",
    controlFeature2: "LED 조도 제어",
    controlFeature2Sub: "생육 최적화 + 인테리어 조명",
    controlFeature3: "4면 타공 아크릴",
    controlFeature3Sub: "360° 전방향 공기 유입 설계",
    controlFeature4: "자동 수분 공급",
    controlFeature4Sub: "내장 물통 + 미스트 분사 연동",

    seniorLabel: "Senior Employment Model",
    seniorTitle: "이끼가 만드는",
    seniorTitleAccent: "시니어 일자리",
    seniorDesc: "스마트 바이오-에어 테라리움은 단순한 제품이 아닙니다. 은퇴 시니어가 이끼 카트리지를 직접 재배하고 납품·교체하는 서비스 생태계를 창출합니다. 이막일장 플랫폼의 시니어 일자리 매칭 모듈과 연계하여, 은퇴 후에도 자연과 함께하는 의미 있는 일자리를 제공합니다.",
    seniorStep1: "이끼 재배",
    seniorStep1Sub: "소규모 재배 키트로 자택 또는 공동 재배 공간에서 이끼 카트리지 생산",
    seniorStep2: "품질 검수",
    seniorStep2Sub: "라이프이점영 품질 기준에 따른 이끼 상태 확인 및 카트리지 조립",
    seniorStep3: "납품·교체",
    seniorStep3Sub: "B2B 고객사(호텔, 오피스, 의료기관) 정기 방문 및 카트리지 교체 서비스",
    seniorStep4: "수익 창출",
    seniorStep4Sub: "이막일장 플랫폼 연계 정산 시스템으로 안정적 월 수입 확보",

    esgLabel: "ESG & Carbon Credit",
    esgTitle: "탄소를 줄이고",
    esgTitleAccent: "가치를 만듭니다",
    esgDesc: "스마트 바이오-에어 테라리움의 이끼 생태계는 K-Taxonomy 녹색분류체계 인증과 연계하여 탄소 크레딧 창출이 가능합니다. 기업의 ESG 경영 목표 달성을 지원하는 동시에, 시니어 일자리 창출이라는 사회적 가치를 더합니다.",
    esgStat1: "탄소 포집",
    esgStat1Sub: "이끼의 광합성 탄소 흡수",
    esgStat2: "K-Taxonomy",
    esgStat2Sub: "녹색분류체계 인증 연계",
    esgStat3: "ESG 기여",
    esgStat3Sub: "환경·사회 이중 가치 창출",

    bizLabel: "Business Model",
    bizTitle: "4가지 수익 축으로",
    bizTitleAccent: "지속 가능한 성장",
    bizDesc: "단일 제품 판매를 넘어, 구독 기반 카트리지 교체 서비스와 B2B 대형 설치, 탄소 크레딧까지 다층적 수익 구조를 구축합니다.",

    ctaLabel: "파트너십 및 투자 문의",
    ctaTitle: "자연과 기술이 만나는",
    ctaTitleAccent: "새로운 시장을 함께 열어가세요",
    ctaDesc: "스마트 바이오-에어 테라리움은 현재 특허 출원 중이며, B2B 파트너십과 투자 협력을 모색하고 있습니다. 함께 더 나은 공기와 더 나은 일자리를 만들어 갈 파트너를 기다립니다.",
    ctaBtn1: "파트너십 문의하기",
    ctaBtn2: "홈으로 돌아가기",
  },
  en: {
    backLink: "Back to Life 2.0",
    heroLabel: "Moss-Based Air Purification Technology",
    heroTitle: "Smart Bio-Air Terrarium",
    heroSub: '"Completing Nature\'s Breath with Technology"',
    heroDesc: "A next-generation air purification solution combining cartridge-type moss panels with a forced downward purification system. The patent-pending triple-layer purification path simultaneously controls fine dust, CO₂, and humidity.",
    heroCta1: "Explore Technology",
    heroCta2: "Partnership Inquiry",

    conceptLabel: "Core Concept",
    conceptTitle: "Purifying air the way",
    conceptTitleAccent: "plants breathe.",
    conceptDesc: "Conventional air purifiers replace filters; the Smart Bio-Air Terrarium uses living moss that purifies air on its own. The cuticle-free surface of moss combined with moisture absorption captures fine dust, plant respiration sequesters CO₂, and natural transpiration optimizes indoor humidity.",
    conceptStat1: "Fine Dust Absorption",
    conceptStat1Sub: "Cuticle-free surface + dual moisture action",
    conceptStat2: "CO₂ Reduction",
    conceptStat2Sub: "Carbon capture via plant respiration",
    conceptStat3: "Natural Humidification",
    conceptStat3Sub: "Automatic optimal indoor humidity",

    techLabel: "Patent-Pending Technology",
    techTitle: "Triple Layer",
    techTitleAccent: "Purification System",
    techDesc: "A 3-stage purification path — Outer Moss Panel → Inner Moss Panel → Floor Moss Panel — maximizes air-to-moss contact area. A forced downward dust collection fan evenly passes contaminated air through the entire moss panel array.",
    techSpec: "Dimensions: 500(W) × 500(D) × 1,150(H) mm",

    cartridgeLabel: "Cartridge System",
    cartridgeTitle: "Replaceable",
    cartridgeTitleAccent: "Cartridge Design",
    cartridgeDesc: "The moss cartridge uses a sandwich layered structure to simultaneously achieve scatter prevention and moisture optimization. Easy slide-out replacement requires no expertise, perfectly connecting to the business model where senior gig workers handle regular replacement services.",

    layersLabel: "Sandwich Structure",
    layer1: "Front Wire Mesh",
    layer1Sub: "5cm spacing · scatter prevention",
    layer2: "Living Moss Layer",
    layer2Sub: "Live moss · air purification",
    layer3: "Natural Cotton Fiber",
    layer3Sub: "Moisture retention · moss nutrition",
    layer4: "Rear Wire Mesh",
    layer4Sub: "2.5cm spacing · structural support",

    controlLabel: "Integrated Control",
    controlTitle: "Integrated",
    controlTitleAccent: "Control System",
    controlDesc: "The black base unit contains independent dials for mist spray timing and LED brightness. Water tank and electronics are perfectly concealed inside the opaque lower unit, maintaining a clean and modern appearance.",
    controlFeature1: "MIST Control",
    controlFeature1Sub: "Automated moss hydration cycle adjustment",
    controlFeature2: "LED Brightness Control",
    controlFeature2Sub: "Growth optimization + interior lighting",
    controlFeature3: "4-Side Perforated Acrylic",
    controlFeature3Sub: "360° omnidirectional air intake design",
    controlFeature4: "Auto Hydration",
    controlFeature4Sub: "Built-in tank + mist spray integration",

    seniorLabel: "Senior Employment Model",
    seniorTitle: "Moss creating",
    seniorTitleAccent: "senior employment",
    seniorDesc: "The Smart Bio-Air Terrarium is more than a product. It creates a service ecosystem where retired seniors cultivate, supply, and replace moss cartridges. Linked with Imakiljang's senior job matching module, it provides meaningful work alongside nature after retirement.",
    seniorStep1: "Moss Cultivation",
    seniorStep1Sub: "Produce moss cartridges at home or shared cultivation spaces with small-scale kits",
    seniorStep2: "Quality Inspection",
    seniorStep2Sub: "Check moss condition and assemble cartridges per Life 2.0 quality standards",
    seniorStep3: "Delivery & Replacement",
    seniorStep3Sub: "Regular visits to B2B clients (hotels, offices, medical facilities) for cartridge replacement",
    seniorStep4: "Income Generation",
    seniorStep4Sub: "Stable monthly income through Imakiljang platform-linked settlement system",

    esgLabel: "ESG & Carbon Credit",
    esgTitle: "Reducing carbon,",
    esgTitleAccent: "creating value",
    esgDesc: "The moss ecosystem of the Smart Bio-Air Terrarium can generate carbon credits linked to K-Taxonomy green classification certification. It supports corporate ESG management goals while adding the social value of senior employment creation.",
    esgStat1: "Carbon Capture",
    esgStat1Sub: "Photosynthetic carbon absorption by moss",
    esgStat2: "K-Taxonomy",
    esgStat2Sub: "Green classification certification linkage",
    esgStat3: "ESG Contribution",
    esgStat3Sub: "Dual environmental & social value",

    bizLabel: "Business Model",
    bizTitle: "Sustainable growth",
    bizTitleAccent: "through 4 revenue streams",
    bizDesc: "Beyond single product sales, we build a multi-layered revenue structure spanning subscription-based cartridge replacement services, B2B large-scale installations, and carbon credits.",

    ctaLabel: "Partnership & Investment Inquiry",
    ctaTitle: "Open a new market where",
    ctaTitleAccent: "nature meets technology",
    ctaDesc: "The Smart Bio-Air Terrarium is currently patent-pending and seeking B2B partnerships and investment collaboration. We welcome partners who will help create cleaner air and better jobs together.",
    ctaBtn1: "Partnership Inquiry",
    ctaBtn2: "Back to Home",
  },
};

// ─── Business Model Data ──────────────────────────────────────────────────────
const bizModels = [
  {
    id: "01", icon: Users,
    ko: "B2C 프리미엄 판매", en: "B2C Premium Sales",
    descKo: "개인 소비자 대상 프리미엄 인테리어 공기정화 기기 판매 및 이끼 카트리지 정기 구독 서비스",
    descEn: "Premium interior air purifier sales to individual consumers with regular moss cartridge subscription service",
    color: "#2D6A4F",
  },
  {
    id: "02", icon: TrendingUp,
    ko: "B2B 대형 설치", en: "B2B Large Installation",
    descKo: "호텔, 오피스, 의료기관, 공공시설 대상 대형 이끼 월(Moss Wall) 및 다수 유닛 설치 계약",
    descEn: "Large moss wall and multi-unit installation contracts for hotels, offices, medical facilities, and public spaces",
    color: "#C9A84C",
  },
  {
    id: "03", icon: Leaf,
    ko: "카트리지 구독 서비스", en: "Cartridge Subscription",
    descKo: "시니어 긱워커가 담당하는 정기 카트리지 교체 서비스. 이막일장 플랫폼 연계 일자리 창출",
    descEn: "Regular cartridge replacement service managed by senior gig workers, linked to Imakiljang platform job creation",
    color: "#4A90D9",
  },
  {
    id: "04", icon: Globe,
    ko: "탄소 크레딧", en: "Carbon Credits",
    descKo: "K-Taxonomy 녹색분류체계 인증 연계 탄소 크레딧 발행. ESG 투자 유치 및 기업 탄소 중립 지원",
    descEn: "Carbon credit issuance linked to K-Taxonomy certification. ESG investment attraction and corporate carbon neutrality support",
    color: "#7C3AED",
  },
];

// ─── Control Features ─────────────────────────────────────────────────────────
const controlFeatures = [
  { icon: Droplets, koKey: "controlFeature1", enKey: "controlFeature1", subKoKey: "controlFeature1Sub", subEnKey: "controlFeature1Sub" },
  { icon: Sun, koKey: "controlFeature2", enKey: "controlFeature2", subKoKey: "controlFeature2Sub", subEnKey: "controlFeature2Sub" },
  { icon: Layers, koKey: "controlFeature3", enKey: "controlFeature3", subKoKey: "controlFeature3Sub", subEnKey: "controlFeature3Sub" },
  { icon: Activity, koKey: "controlFeature4", enKey: "controlFeature4", subKoKey: "controlFeature4Sub", subEnKey: "controlFeature4Sub" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Smartfarm() {
  const { lang } = useLang();
  const t = copy[lang];
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const seniorSteps = [
    { title: t.seniorStep1, desc: t.seniorStep1Sub, icon: Leaf, num: "01" },
    { title: t.seniorStep2, desc: t.seniorStep2Sub, icon: Shield, num: "02" },
    { title: t.seniorStep3, desc: t.seniorStep3Sub, icon: ArrowRight, num: "03" },
    { title: t.seniorStep4, desc: t.seniorStep4Sub, icon: TrendingUp, num: "04" },
  ];

  const layers = [
    { title: t.layer1, sub: t.layer1Sub, color: "#C9A84C" },
    { title: t.layer2, sub: t.layer2Sub, color: "#2D6A4F" },
    { title: t.layer3, sub: t.layer3Sub, color: "#4A90D9" },
    { title: t.layer4, sub: t.layer4Sub, color: "#C9A84C" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF", fontFamily: "'Noto Sans KR', sans-serif" }}>
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A1628" }}
      >
        {/* Background image with parallax */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/smartfarm_hero-TLisyxknQTUt7rWWnYtUFD.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.25}px)`,
            opacity: 0.45,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.7) 60%, rgba(10,22,40,0.97) 100%)"
        }} />

        {/* Back link */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <Link href="/">
              <span className="inline-flex items-center gap-2 text-sm cursor-pointer"
                style={{ color: "rgba(245,243,239,0.6)", fontFamily: "'Noto Sans KR', sans-serif" }}>
                <ArrowLeft size={14} />
                {t.backLink}
              </span>
            </Link>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block text-xs tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
                style={{ color: "#2D6A4F", backgroundColor: "rgba(45,106,79,0.15)", border: "1px solid rgba(45,106,79,0.3)", fontFamily: "'Noto Sans KR', sans-serif" }}>
                {t.heroLabel}
              </span>
            </div>

            <h1 className="mb-4" style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontWeight: 700,
              color: "#F5F3EF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}>
              {t.heroTitle}
            </h1>

            <p className="mb-6 italic" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              color: "#C9A84C",
              letterSpacing: "0.02em",
            }}>
              {t.heroSub}
            </p>

            <p className="mb-10 leading-relaxed" style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              color: "rgba(245,243,239,0.75)",
              maxWidth: "560px",
            }}>
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#tech">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "#2D6A4F",
                    color: "#F5F3EF",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1B4D38")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#2D6A4F")}
                >
                  {t.heroCta1} <ArrowRight size={14} />
                </button>
              </a>
              <Link href="/#contact">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    color: "#F5F3EF",
                    border: "1px solid rgba(245,243,239,0.35)",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(245,243,239,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(245,243,239,0.35)")}
                >
                  {t.heroCta2}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown size={20} style={{ color: "rgba(245,243,239,0.4)" }} />
        </div>
      </section>

      {/* ── CONCEPT ──────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F5F3EF" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <span className="inline-block text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: "#2D6A4F", fontFamily: "'Noto Sans KR', sans-serif" }}>
                {t.conceptLabel}
              </span>
              <h2 style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "#0A1628",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}>
                {t.conceptTitle}<br />
                <span style={{ color: "#2D6A4F" }}>{t.conceptTitleAccent}</span>
              </h2>
              <p className="mt-6 leading-relaxed" style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: "0.95rem",
                color: "#4B5563",
                lineHeight: 1.85,
              }}>
                {t.conceptDesc}
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { stat: t.conceptStat1, sub: t.conceptStat1Sub, icon: Wind, color: "#2D6A4F" },
                  { stat: t.conceptStat2, sub: t.conceptStat2Sub, icon: Leaf, color: "#C9A84C" },
                  { stat: t.conceptStat3, sub: t.conceptStat3Sub, icon: Droplets, color: "#4A90D9" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-6 rounded-sm"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(10,22,40,0.08)" }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}>
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1" style={{
                        fontFamily: "'Noto Serif KR', serif",
                        fontSize: "1rem",
                        color: "#0A1628",
                      }}>{item.stat}</p>
                      <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: "0.85rem", color: "#6B7280" }}>
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TECH: TRIPLE LAYER ────────────────────────────────────────────────── */}
      <section id="tech" className="py-24 lg:py-32" style={{ backgroundColor: "#0F1C2E" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <FadeUp className="text-center mb-16">
            <span className="inline-block text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: "#2D6A4F", fontFamily: "'Noto Sans KR', sans-serif" }}>
              {t.techLabel}
            </span>
            <h2 style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#F5F3EF",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}>
              {t.techTitle}{" "}
              <span style={{ color: "#C9A84C" }}>{t.techTitleAccent}</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(245,243,239,0.65)",
              lineHeight: 1.85,
            }}>
              {t.techDesc}
            </p>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product image */}
            <FadeUp>
              <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/smartfarm_hero-TLisyxknQTUt7rWWnYtUFD.webp"
                  alt="Smart Bio-Air Terrarium"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: "linear-gradient(to top, rgba(10,22,40,0.9), transparent)" }}>
                  <p className="text-xs text-center" style={{ color: "rgba(245,243,239,0.6)", fontFamily: "'Noto Sans KR', sans-serif" }}>
                    {t.techSpec}
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* 3 Layer explanation */}
            <FadeUp delay={0.15}>
              <div className="space-y-5">
                {[
                  {
                    num: "1st",
                    ko: "외부 이끼 패널 (Outer Panel)",
                    en: "Outer Moss Panel",
                    desc: lang === "ko" ? "외벽에서 10cm 이격 배치. 외부 오염 공기를 1차 정화" : "10cm from outer wall. First-stage purification of incoming air",
                    color: "#2D6A4F",
                  },
                  {
                    num: "2nd",
                    ko: "내부 이끼 패널 (Inner Panel)",
                    en: "Inner Moss Panel",
                    desc: lang === "ko" ? "1차 패널에서 5cm 이격. 2차 심층 정화로 유해 물질 제거" : "5cm from outer panel. Secondary deep purification removing harmful substances",
                    color: "#C9A84C",
                  },
                  {
                    num: "3rd",
                    ko: "바닥 이끼 패널 (Floor Panel)",
                    en: "Floor Moss Panel",
                    desc: lang === "ko" ? "내측 하단 집진 팬 앞 배치. 3차 최종 정화 후 청정 공기 하향 배출" : "Placed before the bottom dust collection fan. Final 3rd-stage purification before downward clean air exhaust",
                    color: "#4A90D9",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-5 rounded-sm"
                    style={{ backgroundColor: "rgba(245,243,239,0.05)", border: "1px solid rgba(245,243,239,0.08)" }}>
                    <div className="flex-shrink-0">
                      <span className="inline-block w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${item.color}20`, color: item.color, fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem" }}>
                        {item.num}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold mb-1" style={{
                        fontFamily: "'Noto Serif KR', serif",
                        fontSize: "0.95rem",
                        color: "#F5F3EF",
                      }}>
                        {lang === "ko" ? item.ko : item.en}
                      </p>
                      <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: "0.85rem", color: "rgba(245,243,239,0.55)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CARTRIDGE SYSTEM ─────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F5F3EF" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Cartridge image */}
            <FadeUp>
              <div className="relative rounded-sm overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/smartfarm_tech-b6k29Cgiz7L6eErTnz3uk3.webp"
                  alt="Cartridge System"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeUp>

            {/* Cartridge explanation */}
            <FadeUp delay={0.15}>
              <span className="inline-block text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: "#2D6A4F", fontFamily: "'Noto Sans KR', sans-serif" }}>
                {t.cartridgeLabel}
              </span>
              <h2 style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
                color: "#0A1628",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}>
                {t.cartridgeTitle}<br />
                <span style={{ color: "#2D6A4F" }}>{t.cartridgeTitleAccent}</span>
              </h2>
              <p className="mt-6 mb-10 leading-relaxed" style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: "0.95rem",
                color: "#4B5563",
                lineHeight: 1.85,
              }}>
                {t.cartridgeDesc}
              </p>

              {/* Sandwich layers */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-4"
                  style={{ color: "#6B7280", fontFamily: "'Noto Sans KR', sans-serif" }}>
                  {t.layersLabel}
                </p>
                <div className="space-y-2">
                  {layers.map((layer, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-sm"
                      style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(10,22,40,0.07)" }}>
                      <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: layer.color }} />
                      <div>
                        <p className="font-semibold text-sm" style={{ fontFamily: "'Noto Sans KR', sans-serif", color: "#0A1628" }}>
                          {layer.title}
                        </p>
                        <p className="text-xs mt-0.5" style={{ fontFamily: "'Noto Sans KR', sans-serif", color: "#6B7280" }}>
                          {layer.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CONTROL SYSTEM ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#1B3A2D" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <FadeUp className="text-center mb-16">
            <span className="inline-block text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: "#C9A84C", fontFamily: "'Noto Sans KR', sans-serif" }}>
              {t.controlLabel}
            </span>
            <h2 style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#F5F3EF",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}>
              {t.controlTitle}{" "}
              <span style={{ color: "#C9A84C" }}>{t.controlTitleAccent}</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(245,243,239,0.65)",
              lineHeight: 1.85,
            }}>
              {t.controlDesc}
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Droplets, title: t.controlFeature1, sub: t.controlFeature1Sub },
              { icon: Sun, title: t.controlFeature2, sub: t.controlFeature2Sub },
              { icon: Layers, title: t.controlFeature3, sub: t.controlFeature3Sub },
              { icon: Activity, title: t.controlFeature4, sub: t.controlFeature4Sub },
            ].map((feat, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="p-6 rounded-sm h-full"
                  style={{ backgroundColor: "rgba(245,243,239,0.07)", border: "1px solid rgba(245,243,239,0.1)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)" }}>
                    <feat.icon size={18} style={{ color: "#C9A84C" }} />
                  </div>
                  <p className="font-semibold mb-2" style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: "0.95rem",
                    color: "#F5F3EF",
                  }}>
                    {feat.title}
                  </p>
                  <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: "0.82rem", color: "rgba(245,243,239,0.55)" }}>
                    {feat.sub}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SENIOR EMPLOYMENT ────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F5F3EF" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp delay={0.1}>
              <span className="inline-block text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: "#2D6A4F", fontFamily: "'Noto Sans KR', sans-serif" }}>
                {t.seniorLabel}
              </span>
              <h2 style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
                color: "#0A1628",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}>
                {t.seniorTitle}<br />
                <span style={{ color: "#2D6A4F" }}>{t.seniorTitleAccent}</span>
              </h2>
              <p className="mt-6 leading-relaxed" style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: "0.95rem",
                color: "#4B5563",
                lineHeight: 1.85,
              }}>
                {t.seniorDesc}
              </p>

              {/* Steps */}
              <div className="mt-10 space-y-4">
                {seniorSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#2D6A4F", color: "#F5F3EF", fontFamily: "'Cormorant Garamond', serif" }}>
                      {step.num}
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ fontFamily: "'Noto Serif KR', serif", color: "#0A1628" }}>
                        {step.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif", color: "#6B7280" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp>
              <div className="relative rounded-sm overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/smartfarm_senior-7uQtnAEs5ndxJQjUs8Yp94.webp"
                  alt="Senior moss cultivation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-end p-6"
                  style={{ background: "linear-gradient(to top, rgba(10,22,40,0.75) 0%, transparent 60%)" }}>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: "#C9A84C", fontFamily: "'Noto Sans KR', sans-serif" }}>
                      {lang === "ko" ? "이막일장 플랫폼 연계" : "Linked with Imakiljang Platform"}
                    </p>
                    <p className="text-sm" style={{ color: "#F5F3EF", fontFamily: "'Noto Serif KR', serif" }}>
                      {lang === "ko" ? "은퇴 후에도 자연과 함께하는 일" : "Meaningful work with nature after retirement"}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── ESG & CARBON ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Ecosystem image */}
            <FadeUp>
              <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/smartfarm_ecosystem-UF4xCafmeokTdGeEgSDjW6.webp"
                  alt="Green Ecosystem"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <span className="inline-block text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: "#C9A84C", fontFamily: "'Noto Sans KR', sans-serif" }}>
                {t.esgLabel}
              </span>
              <h2 style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
                color: "#F5F3EF",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}>
                {t.esgTitle}<br />
                <span style={{ color: "#C9A84C" }}>{t.esgTitleAccent}</span>
              </h2>
              <p className="mt-6 leading-relaxed" style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(245,243,239,0.65)",
                lineHeight: 1.85,
              }}>
                {t.esgDesc}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { stat: t.esgStat1, sub: t.esgStat1Sub, icon: Leaf },
                  { stat: t.esgStat2, sub: t.esgStat2Sub, icon: Award },
                  { stat: t.esgStat3, sub: t.esgStat3Sub, icon: Globe },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-sm"
                    style={{ backgroundColor: "rgba(245,243,239,0.05)", border: "1px solid rgba(245,243,239,0.08)" }}>
                    <item.icon size={20} className="mx-auto mb-3" style={{ color: "#C9A84C" }} />
                    <p className="font-semibold text-sm mb-1" style={{ fontFamily: "'Noto Serif KR', serif", color: "#F5F3EF" }}>
                      {item.stat}
                    </p>
                    <p className="text-xs" style={{ fontFamily: "'Noto Sans KR', sans-serif", color: "rgba(245,243,239,0.45)" }}>
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODEL ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F5F3EF" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <FadeUp className="mb-16">
            <span className="inline-block text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: "#2D6A4F", fontFamily: "'Noto Sans KR', sans-serif" }}>
              {t.bizLabel}
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "#0A1628",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}>
                {t.bizTitle}<br />
                <span style={{ color: "#2D6A4F" }}>{t.bizTitleAccent}</span>
              </h2>
              <p className="max-w-sm" style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: "0.9rem",
                color: "#6B7280",
                lineHeight: 1.75,
              }}>
                {t.bizDesc}
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bizModels.map((model, i) => (
              <FadeUp key={model.id} delay={i * 0.1}>
                <div className="p-7 rounded-sm h-full flex flex-col"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(10,22,40,0.07)" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-bold" style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: model.color,
                      fontSize: "1.1rem",
                    }}>
                      {model.id}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${model.color}15` }}>
                      <model.icon size={15} style={{ color: model.color }} />
                    </div>
                  </div>
                  <p className="font-semibold mb-3" style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: "0.95rem",
                    color: "#0A1628",
                  }}>
                    {lang === "ko" ? model.ko : model.en}
                  </p>
                  <p className="text-xs leading-relaxed mt-auto" style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    color: "#6B7280",
                    lineHeight: 1.75,
                  }}>
                    {lang === "ko" ? model.descKo : model.descEn}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: "#0F1C2E" }}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663581018875/g3SxRMGuSoYTNsPXU9euJo/smartfarm_ecosystem-UF4xCafmeokTdGeEgSDjW6.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,28,46,0.95), rgba(27,58,45,0.85))" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            <span className="inline-block text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: "#C9A84C", fontFamily: "'Noto Sans KR', sans-serif" }}>
              {t.ctaLabel}
            </span>
            <h2 className="mb-6" style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F3EF",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}>
              {t.ctaTitle}<br />
              <span style={{ color: "#C9A84C" }}>{t.ctaTitleAccent}</span>
            </h2>
            <p className="mb-10 max-w-xl mx-auto" style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(245,243,239,0.65)",
              lineHeight: 1.85,
            }}>
              {t.ctaDesc}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/#contact">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-sm text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "#2D6A4F",
                    color: "#F5F3EF",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1B4D38")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#2D6A4F")}
                >
                  {t.ctaBtn1} <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-sm text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    color: "#F5F3EF",
                    border: "1px solid rgba(245,243,239,0.3)",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(245,243,239,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(245,243,239,0.3)")}
                >
                  <ArrowLeft size={14} /> {t.ctaBtn2}
                </button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
