/**
 * How We Work Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Dark Navy, team culture
 * Bilingual KO/EN
 */

import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const copy = {
  ko: {
    section_num: "04",
    section_label: "How We Work",
    title: "우리가 일하는\n방식",
    desc: "라이프이점영은 단순한 스타트업이 아닙니다. 시니어의 삶을 직접 경험한 사람들이 모여 진정성 있는 해결책을 만들어갑니다.",
    principles: [
      { num: "01", title: "데이터 기반 의사결정", en: "Data-Driven Decisions", desc: "감이 아닌 데이터로 결정합니다. 시니어 사용자 인터뷰, 행동 데이터 분석, A/B 테스트를 통해 검증된 솔루션만을 출시합니다." },
      { num: "02", title: "투명한 소통", en: "Radical Transparency", desc: "팀 내부의 모든 의사결정 과정을 공유합니다. 투자자, 파트너, 사용자 모두에게 진행 상황을 솔직하게 공개합니다." },
      { num: "03", title: "임팩트 중심", en: "Impact-First", desc: "수익보다 사회적 임팩트를 먼저 측정합니다. 시니어 삶의 질 개선 지표가 우리의 핵심 KPI입니다." },
      { num: "04", title: "빠른 실험, 빠른 학습", en: "Fast Experiment, Fast Learn", desc: "완벽한 제품보다 빠른 검증을 선택합니다. 실패를 두려워하지 않고, 배움을 두려워합니다." },
    ],
    culture_items: [
      { label: "주간 전체 공유", value: "매주 월요일 10:00", desc: "전 팀원이 진행 상황과 블로커를 공유합니다." },
      { label: "사용자 인터뷰", value: "격주 진행", desc: "실제 시니어 사용자와 정기적으로 대화합니다." },
      { label: "임팩트 리포트", value: "분기별 공개", desc: "사회적 임팩트 지표를 외부에 공개합니다." },
    ],
    certs: ["혁신성장유형 벤처기업", "소셜벤처기업", "K-Taxonomy 적합", "연구개발전담부서"],
    hiring_title: "함께 일할 분을 찾습니다",
    hiring_desc: "시니어의 삶을 바꾸고 싶은 분들을 찾습니다. 직책보다 임팩트를 중시하는 분이라면 함께해요.",
    hiring_cta: "채용 문의하기 →",
  },
  en: {
    section_num: "04",
    section_label: "How We Work",
    title: "How we\nbuild together.",
    desc: "Life 2.0 is not just a startup. We are people who have directly experienced the lives of seniors, building authentic solutions together.",
    principles: [
      { num: "01", title: "Data-Driven Decisions", en: "데이터 기반 의사결정", desc: "We decide with data, not intuition. We only launch solutions validated through senior user interviews, behavioral data analysis, and A/B testing." },
      { num: "02", title: "Radical Transparency", en: "투명한 소통", desc: "We share all internal decision-making processes. We honestly disclose progress to investors, partners, and users alike." },
      { num: "03", title: "Impact-First", en: "임팩트 중심", desc: "We measure social impact before revenue. Improvement in senior quality of life metrics is our core KPI." },
      { num: "04", title: "Fast Experiment, Fast Learn", en: "빠른 실험, 빠른 학습", desc: "We choose fast validation over perfect products. We're not afraid to fail, but we're afraid not to learn." },
    ],
    culture_items: [
      { label: "Weekly All-Hands", value: "Every Monday 10:00", desc: "All team members share progress and blockers." },
      { label: "User Interviews", value: "Bi-weekly", desc: "Regular conversations with actual senior users." },
      { label: "Impact Report", value: "Quarterly Public", desc: "Social impact metrics published externally." },
    ],
    certs: ["Innovation Growth Venture", "Social Venture", "K-Taxonomy Compliant", "Dedicated R&D Division"],
    hiring_title: "We're Hiring",
    hiring_desc: "We're looking for people who want to change senior lives. If you value impact over title, join us.",
    hiring_cta: "Inquire about joining →",
  },
};

export default function HowWeWorkSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  return (
    <section
      id="how-we-work"
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

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start">
          {/* Left: Principles */}
          <div>
            <h2
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-6"
              style={{ whiteSpace: "pre-line" }}
            >
              {t.title}
            </h2>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-12 max-w-lg">
              {t.desc}
            </p>

            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {t.principles.map((p) => (
                <div key={p.num} className="py-6 group cursor-default">
                  <div className="flex items-start gap-6">
                    <span className="font-en text-xs text-white/20 font-medium mt-1 shrink-0 w-6">
                      {p.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h4 className="font-display font-bold text-base text-white group-hover:text-[#4A7A5E] transition-colors duration-300">
                          {p.title}
                        </h4>
                        <span className="font-en text-xs text-white/25">{p.en}</span>
                      </div>
                      <p className="font-body text-sm text-white/50 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Culture + Certs + Hiring */}
          <div className="space-y-4">
            <p className="font-en text-xs text-white/30 tracking-[0.18em] uppercase mb-6">Team Rituals</p>
            {t.culture_items.map((c) => (
              <div
                key={c.label}
                className="p-5 border"
                style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div className="font-en text-xs text-[#C9A84C] tracking-wide uppercase mb-1">{c.label}</div>
                <div className="font-display font-bold text-sm text-white mb-1">{c.value}</div>
                <div className="font-body text-xs text-white/40 leading-relaxed">{c.desc}</div>
              </div>
            ))}

            {/* Certifications */}
            <div
              className="p-5 border"
              style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <p className="font-en text-xs text-white/30 tracking-widest uppercase mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {t.certs.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 text-xs font-body border"
                    style={{ borderColor: "rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.8)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Hiring */}
            <div className="p-5" style={{ backgroundColor: "#1B3A2D" }}>
              <p className="font-en text-xs text-[#C9A84C] tracking-widest uppercase mb-2">{t.hiring_title}</p>
              <p className="font-body text-sm text-white/80 leading-relaxed mb-3">{t.hiring_desc}</p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-en text-xs text-[#C9A84C] underline underline-offset-4 hover:text-white transition-colors duration-200"
              >
                {t.hiring_cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
