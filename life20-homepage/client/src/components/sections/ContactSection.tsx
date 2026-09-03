/**
 * Contact Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Dark Navy, dual CTA (B2B + Individual)
 * Bilingual KO/EN
 */

import { useState } from "react";
import { Send, Building2, User } from "lucide-react";
import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

type InquiryType = "partnership" | "investment" | "other";

const copy = {
  ko: {
    section_num: "06",
    section_label: "Contact",
    title: "함께 만들어갈\n미래를 논의해요",
    desc: "투자 문의, 파트너십 제안, 서비스 이용 문의 모두 환영합니다. 48시간 내에 답변 드립니다.",
    tabs: [
      { id: "b2b" as const, label: "투자 · 파트너십", icon: "building" },
      { id: "individual" as const, label: "개인 문의", icon: "user" },
    ],
    b2b: {
      types: [
        { id: "partnership" as InquiryType, label: "파트너십 제안" },
        { id: "investment" as InquiryType, label: "투자 문의" },
        { id: "other" as InquiryType, label: "기타 협업" },
      ],
      name: "담당자명",
      company: "기업/기관명",
      email: "이메일",
      phone: "연락처 (선택)",
      message_ph: "파트너십 또는 투자 관련 문의 내용을 자유롭게 작성해 주세요.",
      submit: "문의 보내기",
      success: "문의가 접수되었습니다. 48시간 내에 연락드리겠습니다.",
    },
    individual: {
      name: "이름",
      email: "이메일",
      age: "연령대",
      age_options: ["40대", "50대", "60대", "70대 이상"],
      interest: "관심 서비스",
      interest_options: ["이막일장 플랫폼", "이끼 스마트팜 키트", "시니어 커뮤니티", "기타"],
      message_ph: "서비스 이용 문의나 궁금한 점을 자유롭게 작성해 주세요.",
      submit: "문의 보내기",
      success: "문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
    },
    info: [
      { label: "이메일", value: "hello@life20.kr" },
      { label: "소재지", value: "서울특별시 강남구" },
      { label: "설립", value: "2025년 8월 20일" },
    ],
    ir_label: "IR 자료 요청",
    ir_desc: "투자 검토를 위한 IR 자료는 이메일 문의를 통해 제공해 드립니다.",
    ir_cta: "IR 자료 요청하기 →",
  },
  en: {
    section_num: "06",
    section_label: "Contact",
    title: "Let's discuss\nthe future together.",
    desc: "We welcome investment inquiries, partnership proposals, and service inquiries. We respond within 48 hours.",
    tabs: [
      { id: "b2b" as const, label: "Investment · Partnership", icon: "building" },
      { id: "individual" as const, label: "Individual Inquiry", icon: "user" },
    ],
    b2b: {
      types: [
        { id: "partnership" as InquiryType, label: "Partnership Proposal" },
        { id: "investment" as InquiryType, label: "Investment Inquiry" },
        { id: "other" as InquiryType, label: "Other Collaboration" },
      ],
      name: "Contact Name",
      company: "Company / Organization",
      email: "Email",
      phone: "Phone (Optional)",
      message_ph: "Please describe your partnership or investment inquiry.",
      submit: "Send Inquiry",
      success: "Your inquiry has been received. We will contact you within 48 hours.",
    },
    individual: {
      name: "Name",
      email: "Email",
      age: "Age Group",
      age_options: ["40s", "50s", "60s", "70+"],
      interest: "Service of Interest",
      interest_options: ["Imakiljang Platform", "Moss Smart Farm Kit", "Senior Community", "Other"],
      message_ph: "Please describe your service inquiry or questions.",
      submit: "Send Inquiry",
      success: "Your inquiry has been received. We will contact you soon.",
    },
    info: [
      { label: "Email", value: "hello@life20.kr" },
      { label: "Location", value: "Gangnam-gu, Seoul" },
      { label: "Founded", value: "August 20, 2025" },
    ],
    ir_label: "IR Materials",
    ir_desc: "IR materials for investment review are available upon email request.",
    ir_cta: "Request IR Materials →",
  },
};

export default function ContactSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  const [activeTab, setActiveTab] = useState<"b2b" | "individual">("b2b");
  const [inquiryType, setInquiryType] = useState<InquiryType>("partnership");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 items-start">
          {/* Left: Info */}
          <div>
            <h2
              className="font-display font-bold text-3xl md:text-4xl text-white leading-[1.15] mb-6"
              style={{ whiteSpace: "pre-line" }}
            >
              {t.title}
            </h2>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-10">
              {t.desc}
            </p>

            <div className="space-y-0 mb-8">
              {t.info.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 py-4 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span className="font-en text-xs text-white/30 tracking-widest uppercase w-20 shrink-0">
                    {item.label}
                  </span>
                  <span className="font-body text-sm text-white/70">{item.value}</span>
                </div>
              ))}
            </div>

            {/* IR Box */}
            <div className="p-5" style={{ backgroundColor: "#1B3A2D" }}>
              <p className="font-en text-xs text-[#C9A84C] tracking-widest uppercase mb-2">{t.ir_label}</p>
              <p className="font-body text-xs text-white/60 leading-relaxed mb-3">{t.ir_desc}</p>
              <a
                href="mailto:hello@life20.kr"
                className="font-en text-xs text-[#C9A84C] underline underline-offset-4 hover:text-white transition-colors duration-200"
              >
                {t.ir_cta}
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {/* Tabs */}
            <div className="flex mb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {t.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSubmitted(false); }}
                  className="flex items-center gap-2 px-5 py-3 font-en text-sm font-medium transition-all duration-200 border-b-2 -mb-px"
                  style={{
                    color: activeTab === tab.id ? "#C9A84C" : "rgba(255,255,255,0.35)",
                    borderBottomColor: activeTab === tab.id ? "#C9A84C" : "transparent",
                  }}
                >
                  {tab.icon === "building" ? <Building2 size={14} /> : <User size={14} />}
                  {tab.label}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="p-10 text-center" style={{ backgroundColor: "#1B3A2D" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#2D5A42" }}
                >
                  <Send size={16} style={{ color: "#C9A84C" }} />
                </div>
                <p className="font-display font-bold text-base text-white">
                  {activeTab === "b2b" ? t.b2b.success : t.individual.success}
                </p>
              </div>
            ) : activeTab === "b2b" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {t.b2b.types.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setInquiryType(type.id)}
                      className="px-4 py-2 text-xs font-en font-medium border transition-all duration-200"
                      style={{
                        borderColor: inquiryType === type.id ? "#C9A84C" : "rgba(255,255,255,0.15)",
                        color: inquiryType === type.id ? "#C9A84C" : "rgba(255,255,255,0.45)",
                        backgroundColor: inquiryType === type.id ? "rgba(201,168,76,0.08)" : "transparent",
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder={t.b2b.name} required
                    className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                  <input type="text" placeholder={t.b2b.company} required
                    className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="email" placeholder={t.b2b.email} required
                    className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                  <input type="tel" placeholder={t.b2b.phone}
                    className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                </div>
                <textarea placeholder={t.b2b.message_ph} required rows={5}
                  className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25 resize-none"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 font-en text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "#C9A84C", color: "#0F1C2E" }}>
                  <Send size={14} />
                  {t.b2b.submit}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder={t.individual.name} required
                    className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                  <input type="email" placeholder={t.individual.email} required
                    className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select className="w-full px-4 py-3 font-body text-sm bg-[#0F1C2E] border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white/70"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                    <option value="">{t.individual.age}</option>
                    {t.individual.age_options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <select className="w-full px-4 py-3 font-body text-sm bg-[#0F1C2E] border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white/70"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                    <option value="">{t.individual.interest}</option>
                    {t.individual.interest_options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <textarea placeholder={t.individual.message_ph} required rows={5}
                  className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[#C9A84C] text-white placeholder-white/25 resize-none"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }} />
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 font-en text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "#1B3A2D", color: "#C9A84C" }}>
                  <Send size={14} />
                  {t.individual.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
