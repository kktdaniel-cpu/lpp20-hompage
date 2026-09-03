/**
 * Who We Are Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Dark Navy background, credible & warm
 * Bilingual KO/EN, founding story, certifications
 */

import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

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
  },
};

export default function WhoWeAreSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="fade-up py-24 md:py-32"
      style={{ backgroundColor: "#0F1C2E" }}
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
                borderLeft: "2px solid #C9A84C",
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
                className="p-6 border transition-all duration-300 hover:border-[#1B3A2D]"
                style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 font-en text-lg font-bold mt-0.5" style={{ color: "#C9A84C" }}>
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
            <div className="p-6" style={{ backgroundColor: "#1B3A2D" }}>
              <p className="font-accent italic text-base text-white/85 leading-relaxed mb-4">
                "{t.ceo_quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm text-white"
                  style={{ backgroundColor: "#2D5A42" }}
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
  );
}
