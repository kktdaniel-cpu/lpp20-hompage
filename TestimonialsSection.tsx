/**
 * TestimonialsSection — Life 2.0 고객 리뷰 슬라이더
 * Design: 딥 아보카도 그린 배경 + 골드 팔레트 강조
 * Features: 자동 슬라이더 (5초), 수동 이동, 진행 인디케이터, KO/EN 이중언어
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLang } from "@/components/Navigation";

interface Testimonial {
  id: number;
  nameKo: string;
  nameEn: string;
  roleKo: string;
  roleEn: string;
  locationKo: string;
  locationEn: string;
  quoteKo: string;
  quoteEn: string;
  rating: number;
  category: "platform" | "smartfarm" | "consulting";
  categoryLabelKo: string;
  categoryLabelEn: string;
  initial: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nameKo: "박성민",
    nameEn: "Sung-min Park",
    roleKo: "전직 금융권 임원 (58세)",
    roleEn: "Former Finance Executive, Age 58",
    locationKo: "서울 강남구",
    locationEn: "Gangnam, Seoul",
    quoteKo:
      "은퇴 후 막막했던 자산 관리와 일자리 문제를 2막1장 플랫폼 하나로 정리했습니다. AI 진단이 제 상황을 정확히 파악해 맞춤형 플랜을 제시해 주었고, 덕분에 새로운 커리어를 시작할 수 있었습니다. 인생 2막이 두렵지 않습니다.",
    quoteEn:
      "The 2막1장 platform helped me organize my post-retirement asset management and career concerns in one place. The AI diagnosis accurately assessed my situation and provided a tailored plan, allowing me to start a new career. I'm no longer afraid of my second act.",
    rating: 5,
    category: "platform",
    categoryLabelKo: "2막1장 플랫폼",
    categoryLabelEn: "Senior Life Platform",
    initial: "박",
    bgColor: "var(--avo-deep)",
  },
  {
    id: 2,
    nameKo: "김미영",
    nameEn: "Mi-young Kim",
    roleKo: "은퇴 교사 (62세)",
    roleEn: "Retired Teacher, Age 62",
    locationKo: "경기도 성남시",
    locationEn: "Seongnam, Gyeonggi",
    quoteKo:
      "이끼 스마트팜 투자 설명회에 참석한 게 제 인생을 바꿨습니다. 환경에 기여하면서도 안정적인 수익을 얻을 수 있다는 점이 매력적이었고, 라이프이점영 팀의 전문적인 지원 덕분에 투자 결정을 자신 있게 내릴 수 있었습니다.",
    quoteEn:
      "Attending the Moss Smart Farm investment briefing changed my life. The prospect of contributing to the environment while earning stable returns was appealing, and the professional support from the Life 2.0 team gave me the confidence to make my investment decision.",
    rating: 5,
    category: "smartfarm",
    categoryLabelKo: "이끼 스마트팜",
    categoryLabelEn: "Moss AgriVoltaics",
    initial: "김",
    bgColor: "var(--avo-main)",
  },
  {
    id: 3,
    nameKo: "이준호",
    nameEn: "Jun-ho Lee",
    roleKo: "중소기업 대표 (55세)",
    roleEn: "SME CEO, Age 55",
    locationKo: "부산광역시",
    locationEn: "Busan",
    quoteKo:
      "회사 매각 후 다음 단계를 고민하던 중 라이프이점영의 컨설팅을 받았습니다. 단순한 재무 조언이 아니라 삶 전체를 설계하는 관점에서 접근해 주셔서 깊은 인상을 받았습니다. 지금은 사회적 가치와 수익성을 동시에 추구하는 새 사업을 준비 중입니다.",
    quoteEn:
      "After selling my company, I received consulting from Life 2.0 while pondering my next steps. I was deeply impressed by their approach of designing life as a whole, not just financial advice. I'm now preparing a new venture that pursues both social value and profitability.",
    rating: 5,
    category: "consulting",
    categoryLabelKo: "라이프 컨설팅",
    categoryLabelEn: "Life Consulting",
    initial: "이",
    bgColor: "var(--avo-deep)",
  },
  {
    id: 4,
    nameKo: "최수진",
    nameEn: "Su-jin Choi",
    roleKo: "전직 의사 (60세)",
    roleEn: "Former Physician, Age 60",
    locationKo: "대전광역시",
    locationEn: "Daejeon",
    quoteKo:
      "30년 의사 생활을 마무리하고 무엇을 해야 할지 몰랐습니다. 2막1장 진단을 통해 제 강점과 관심사를 재발견했고, 헬스케어 분야의 시니어 멘토로서 새로운 역할을 찾았습니다. 은퇴가 끝이 아니라 새로운 시작임을 깨달았습니다.",
    quoteEn:
      "After 30 years as a physician, I didn't know what to do next. Through the 2막1장 diagnosis, I rediscovered my strengths and interests, and found a new role as a senior mentor in healthcare. I realized that retirement is not an end, but a new beginning.",
    rating: 5,
    category: "platform",
    categoryLabelKo: "2막1장 플랫폼",
    categoryLabelEn: "Senior Life Platform",
    initial: "최",
    bgColor: "var(--avo-main)",
  },
  {
    id: 5,
    nameKo: "정태영",
    nameEn: "Tae-young Jung",
    roleKo: "전직 공무원 (57세)",
    roleEn: "Former Government Official, Age 57",
    locationKo: "인천광역시",
    locationEn: "Incheon",
    quoteKo:
      "이끼 스마트팜 프로젝트에 참여하면서 단순한 투자를 넘어 지속 가능한 미래를 만드는 일에 동참하고 있다는 자부심을 느낍니다. 라이프이점영 팀의 투명한 소통과 전문성이 신뢰를 주었고, 주변 지인들에게도 적극 추천하고 있습니다.",
    quoteEn:
      "Participating in the Moss Smart Farm project gives me pride in contributing to a sustainable future beyond simple investment. The transparent communication and expertise of the Life 2.0 team inspired trust, and I actively recommend them to my acquaintances.",
    rating: 5,
    category: "smartfarm",
    categoryLabelKo: "이끼 스마트팜",
    categoryLabelEn: "Moss AgriVoltaics",
    initial: "정",
    bgColor: "var(--avo-deep)",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < count ? "var(--gold-satin)" : "none"}
          stroke={i < count ? "var(--gold-satin)" : "rgba(255,255,255,0.2)"}
          strokeWidth="1.2"
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.27l-3.52 1.07.67-3.92L2.3 5.64l3.94-.57L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 5000;

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % testimonials.length, "next");
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, "prev");
  }, [current, goTo]);

  // 자동 슬라이더
  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    const step = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (step / DURATION) * 100, 100));
    }, step);

    intervalRef.current = setInterval(() => {
      goNext();
    }, DURATION);
  }, [goNext]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current]);

  const t = testimonials[current];

  const texts = {
    ko: {
      sectionNum: "05",
      label: "TESTIMONIALS",
      heading: "고객의 목소리",
      subheading: "인생 2막을 함께 설계한 분들의 이야기",
      totalLabel: `${testimonials.length}개의 리뷰`,
    },
    en: {
      sectionNum: "05",
      label: "TESTIMONIALS",
      heading: "Client Stories",
      subheading: "Stories from those who designed their second act with us",
      totalLabel: `${testimonials.length} Reviews`,
    },
  };
  const tx = texts[lang];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "var(--avo-deep)" }}
    >
      {/* 배경 장식 — 골드 원형 글로우 */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,168,67,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,201,107,0.05) 0%, transparent 70%)",
        }}
      />

      {/* 상단 골드 구분선 */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--gold-antique), transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* 섹션 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-num">{tx.sectionNum}</span>
              <span
                className="w-8 h-px"
                style={{ backgroundColor: "var(--gold-antique)" }}
              />
              <span
                className="font-en text-xs tracking-[0.2em] uppercase font-semibold"
                style={{ color: "var(--gold-antique)" }}
              >
                {tx.label}
              </span>
            </div>
            <h2
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
            >
              {tx.heading}
            </h2>
            <p
              className="font-body text-sm md:text-base mt-3"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {tx.subheading}
            </p>
          </div>

          {/* 리뷰 수 + 별점 요약 */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div
                className="font-en font-bold text-2xl"
                style={{ color: "var(--gold-satin)" }}
              >
                5.0
              </div>
              <StarRating count={5} />
              <div
                className="font-body text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {tx.totalLabel}
              </div>
            </div>
            {/* 구분 */}
            <div
              className="w-px h-14 hidden md:block"
              style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
            />
            {/* 화살표 버튼 */}
            <div className="flex gap-2">
              <button
                onClick={() => { goPrev(); resetTimer(); }}
                className="w-10 h-10 flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(212,168,67,0.35)",
                  color: "var(--gold-satin)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold-antique)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(212,168,67,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,168,67,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                }}
                aria-label="이전 리뷰"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => { goNext(); resetTimer(); }}
                className="w-10 h-10 flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(212,168,67,0.35)",
                  color: "var(--gold-satin)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold-antique)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(212,168,67,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,168,67,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                }}
                aria-label="다음 리뷰"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 메인 카드 */}
        <div
          className="relative"
          style={{
            transition: "opacity 0.35s ease, transform 0.35s ease",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? direction === "next"
                ? "translateX(32px)"
                : "translateX(-32px)"
              : "translateX(0)",
          }}
        >
          <div
            className="relative rounded-none p-8 md:p-12 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(212,168,67,0.18)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(212,168,67,0.10)",
            }}
          >
            {/* 배경 인용 부호 장식 */}
            <div
              className="absolute top-6 right-8 pointer-events-none"
              style={{ color: "rgba(212,168,67,0.06)" }}
            >
              <Quote size={120} strokeWidth={1} />
            </div>

            {/* 카테고리 배지 */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="inline-flex items-center px-3 py-1 text-xs font-semibold font-en tracking-widest uppercase"
                style={{
                  backgroundColor: "rgba(212,168,67,0.12)",
                  color: "var(--gold-harvest)",
                  border: "1px solid rgba(212,168,67,0.25)",
                }}
              >
                {lang === "ko" ? t.categoryLabelKo : t.categoryLabelEn}
              </span>
              <StarRating count={t.rating} />
            </div>

            {/* 인용문 */}
            <blockquote className="relative mb-10">
              {/* 오프닝 따옴표 */}
              <span
                className="font-accent italic text-5xl leading-none mr-1 align-top"
                style={{ color: "var(--gold-antique)" }}
              >
                "
              </span>
              <p
                className="inline font-body text-lg md:text-xl leading-relaxed text-white/85"
                style={{ lineHeight: "1.8" }}
              >
                {lang === "ko" ? t.quoteKo : t.quoteEn}
              </p>
              <span
                className="font-accent italic text-5xl leading-none ml-1 align-bottom"
                style={{ color: "var(--gold-antique)" }}
              >
                "
              </span>
            </blockquote>

            {/* 리뷰어 정보 */}
            <div className="flex items-center gap-4">
              {/* 아바타 */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gold-antique), var(--gold-harvest))",
                  color: "var(--avo-deep)",
                }}
              >
                {t.initial}
              </div>
              {/* 이름 + 역할 */}
              <div>
                <div
                  className="font-display font-bold text-base"
                  style={{ color: "var(--gold-champagne)" }}
                >
                  {lang === "ko" ? t.nameKo : t.nameEn}
                </div>
                <div
                  className="font-body text-sm mt-0.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {lang === "ko" ? t.roleKo : t.roleEn}
                </div>
                <div
                  className="font-en text-xs mt-0.5 tracking-wide"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  {lang === "ko" ? t.locationKo : t.locationEn}
                </div>
              </div>

              {/* 구분선 */}
              <div
                className="hidden md:block flex-1 h-px mx-4"
                style={{
                  background:
                    "linear-gradient(to right, rgba(212,168,67,0.20), transparent)",
                }}
              />

              {/* 슬라이드 카운터 */}
              <div
                className="hidden md:flex items-baseline gap-1 shrink-0"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                <span
                  className="font-en font-bold text-2xl"
                  style={{ color: "var(--gold-satin)" }}
                >
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className="font-en text-sm">
                  / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 — 도트 인디케이터 + 진행 바 */}
        <div className="flex flex-col items-center gap-5 mt-10">
          {/* 진행 바 */}
          <div
            className="w-full max-w-xs h-px rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(to right, var(--gold-antique), var(--gold-champagne))",
              }}
            />
          </div>

          {/* 도트 */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i, i > current ? "next" : "prev"); resetTimer(); }}
                className="transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor:
                    i === current
                      ? "var(--gold-satin)"
                      : "rgba(255,255,255,0.18)",
                }}
                aria-label={`리뷰 ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 골드 구분선 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--gold-antique), transparent)",
        }}
      />
    </section>
  );
}
