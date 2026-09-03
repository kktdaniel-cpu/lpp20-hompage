/**
 * Contact Section — Life 2.0 Renewal v2
 * Design: "Established Authority" — Dark Navy, dual CTA (B2B + Individual)
 * Bilingual KO/EN — tRPC 실제 연동 + 클라이언트 유효성 검사
 */

import { useState } from "react";
import { Send, Building2, User, Loader2, AlertCircle } from "lucide-react";
import { useLang } from "../Navigation";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { trpc } from "../../lib/trpc";
import { toast } from "sonner";

type InquiryType = "partnership" | "investment" | "individual" | "other";

// ── 유효성 검사 유틸 ──────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): string {
  if (!email.trim()) return "이메일을 입력해 주세요.";
  if (!EMAIL_RE.test(email.trim())) return "올바른 이메일 형식이 아닙니다.";
  return "";
}

function validateRequired(value: string, label: string): string {
  if (!value.trim()) return `${label}을(를) 입력해 주세요.`;
  return "";
}

// ── 복사본 ────────────────────────────────────────────────────
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
      interest_options: ["2막1장 플랫폼", "이끼 스마트팜 키트", "시니어 커뮤니티", "기타"],
      message_ph: "서비스 이용 문의나 궁금한 점을 자유롭게 작성해 주세요.",
      submit: "문의 보내기",
      success: "문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
    },
    info: [
      { label: "이메일", value: "Daniel@lpp20.com" },
      { label: "소재지", value: "경기도 고양시 덕양구 청초로 19" },
      { label: "설립", value: "2025년 8월 20일" },
    ],
    ir_label: "IR 자료 요청",
    ir_desc: "투자 검토를 위한 IR 자료는 이메일 문의를 통해 제공해 드립니다.",
    ir_cta: "IR 자료 요청하기 →",
    errors: {
      name: "이름을 입력해 주세요.",
      company: "기업/기관명을 입력해 주세요.",
      email_required: "이메일을 입력해 주세요.",
      email_invalid: "올바른 이메일 형식이 아닙니다.",
      message: "문의 내용을 입력해 주세요.",
    },
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
      { label: "Email", value: "Daniel@lpp20.com" },
      { label: "Location", value: "Goyang-si, Gyeonggi-do" },
      { label: "Founded", value: "August 20, 2025" },
    ],
    ir_label: "IR Materials",
    ir_desc: "IR materials for investment review are available upon email request.",
    ir_cta: "Request IR Materials →",
    errors: {
      name: "Please enter your name.",
      company: "Please enter your company name.",
      email_required: "Please enter your email address.",
      email_invalid: "Please enter a valid email address.",
      message: "Please enter your message.",
    },
  },
};

// ── 에러 메시지 컴포넌트 ──────────────────────────────────────
function FieldError({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <AlertCircle size={12} className="text-red-400 shrink-0" />
      <span className="font-body text-xs text-red-400">{msg}</span>
    </div>
  );
}

// ── 인풋 스타일 헬퍼 ─────────────────────────────────────────
function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all duration-200 text-white placeholder-white/25 ${
    hasError
      ? "border-red-400 focus:border-red-300"
      : "focus:border-[var(--avo-mid)]"
  }`;
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function ContactSection() {
  const { lang } = useLang();
  const t = copy[lang];
  const sectionRef = useScrollAnimation(0.1) as React.RefObject<HTMLElement>;

  const [activeTab, setActiveTab] = useState<"b2b" | "individual">("b2b");
  const [inquiryType, setInquiryType] = useState<InquiryType>("partnership");
  const [submitted, setSubmitted] = useState(false);

  // B2B form state
  const [b2bForm, setB2bForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [b2bErrors, setB2bErrors] = useState<Record<string, string>>({});

  // Individual form state
  const [indForm, setIndForm] = useState({ name: "", email: "", age: "", interest: "", message: "" });
  const [indErrors, setIndErrors] = useState<Record<string, string>>({});

  const submitInquiry = trpc.inquiries.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success(lang === "ko" ? "문의가 접수되었습니다!" : "Inquiry submitted!");
      setTimeout(() => setSubmitted(false), 6000);
    },
    onError: () => {
      toast.error(lang === "ko" ? "오류가 발생했습니다. 다시 시도해 주세요." : "An error occurred. Please try again.");
    },
  });

  // ── B2B 유효성 검사 ──────────────────────────────────────────
  function validateB2b() {
    const errs: Record<string, string> = {};
    if (!b2bForm.name.trim()) errs.name = t.errors.name;
    if (!b2bForm.company.trim()) errs.company = t.errors.company;
    if (!b2bForm.email.trim()) {
      errs.email = t.errors.email_required;
    } else if (!EMAIL_RE.test(b2bForm.email.trim())) {
      errs.email = t.errors.email_invalid;
    }
    if (!b2bForm.message.trim()) errs.message = t.errors.message;
    return errs;
  }

  // ── 개인 유효성 검사 ─────────────────────────────────────────
  function validateInd() {
    const errs: Record<string, string> = {};
    if (!indForm.name.trim()) errs.name = t.errors.name;
    if (!indForm.email.trim()) {
      errs.email = t.errors.email_required;
    } else if (!EMAIL_RE.test(indForm.email.trim())) {
      errs.email = t.errors.email_invalid;
    }
    if (!indForm.message.trim()) errs.message = t.errors.message;
    return errs;
  }

  const handleB2bSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateB2b();
    if (Object.keys(errs).length > 0) {
      setB2bErrors(errs);
      return;
    }
    setB2bErrors({});
    submitInquiry.mutate({
      type: inquiryType,
      name: b2bForm.name,
      company: b2bForm.company,
      email: b2bForm.email,
      phone: b2bForm.phone || undefined,
      message: b2bForm.message,
    });
  };

  const handleIndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateInd();
    if (Object.keys(errs).length > 0) {
      setIndErrors(errs);
      return;
    }
    setIndErrors({});
    const interestNote = indForm.interest ? `[관심 서비스: ${indForm.interest}] [연령대: ${indForm.age}]\n\n` : "";
    submitInquiry.mutate({
      type: "individual",
      name: indForm.name,
      email: indForm.email,
      message: interestNote + indForm.message,
    });
  };

  // 필드 변경 시 해당 오류 즉시 해제
  function updateB2b(field: keyof typeof b2bForm, value: string) {
    setB2bForm(f => ({ ...f, [field]: value }));
    if (b2bErrors[field]) setB2bErrors(e => ({ ...e, [field]: "" }));
  }
  function updateInd(field: keyof typeof indForm, value: string) {
    setIndForm(f => ({ ...f, [field]: value }));
    if (indErrors[field]) setIndErrors(e => ({ ...e, [field]: "" }));
  }

  return (
    <section
      id="contact"
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
            <div className="p-5" style={{ backgroundColor: "var(--avo-deep)" }}>
              <p className="font-en text-xs text-[var(--avo-mid)] tracking-widest uppercase mb-2">{t.ir_label}</p>
              <p className="font-body text-xs text-white/60 leading-relaxed mb-3">{t.ir_desc}</p>
              <a
                href="mailto:Daniel@lpp20.com"
                className="font-en text-xs text-[var(--avo-mid)] underline underline-offset-4 hover:text-white transition-colors duration-200"
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
                  onClick={() => { setActiveTab(tab.id); setSubmitted(false); setB2bErrors({}); setIndErrors({}); }}
                  className="flex items-center gap-2 px-5 py-3 font-en text-sm font-medium transition-all duration-200 border-b-2 -mb-px"
                  style={{
                    color: activeTab === tab.id ? "var(--avo-mid)" : "rgba(255,255,255,0.35)",
                    borderBottomColor: activeTab === tab.id ? "var(--avo-mid)" : "transparent",
                  }}
                >
                  {tab.icon === "building" ? <Building2 size={14} /> : <User size={14} />}
                  {tab.label}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="p-10 text-center" style={{ backgroundColor: "var(--avo-deep)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--avo-main)" }}
                >
                  <Send size={16} style={{ color: "var(--avo-mid)" }} />
                </div>
                <p className="font-display font-bold text-base text-white">
                  {activeTab === "b2b" ? t.b2b.success : t.individual.success}
                </p>
              </div>
            ) : activeTab === "b2b" ? (
              /* ── B2B 폼 ── */
              <form onSubmit={handleB2bSubmit} className="space-y-4" noValidate>
                <div className="flex gap-2 flex-wrap">
                  {t.b2b.types.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setInquiryType(type.id)}
                      className="px-4 py-2 text-xs font-en font-medium border transition-all duration-200"
                      style={{
                        borderColor: inquiryType === type.id ? "var(--avo-mid)" : "rgba(255,255,255,0.15)",
                        color: inquiryType === type.id ? "var(--avo-mid)" : "rgba(255,255,255,0.45)",
                        backgroundColor: inquiryType === type.id ? "rgba(143,175,90,0.12)" : "transparent",
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder={t.b2b.name}
                      value={b2bForm.name}
                      onChange={(e) => updateB2b("name", e.target.value)}
                      className={inputClass(!!b2bErrors.name)}
                      style={!b2bErrors.name ? { borderColor: "rgba(255,255,255,0.12)" } : undefined}
                    />
                    <FieldError msg={b2bErrors.name || ""} />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={t.b2b.company}
                      value={b2bForm.company}
                      onChange={(e) => updateB2b("company", e.target.value)}
                      className={inputClass(!!b2bErrors.company)}
                      style={!b2bErrors.company ? { borderColor: "rgba(255,255,255,0.12)" } : undefined}
                    />
                    <FieldError msg={b2bErrors.company || ""} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      placeholder={t.b2b.email}
                      value={b2bForm.email}
                      onChange={(e) => updateB2b("email", e.target.value)}
                      className={inputClass(!!b2bErrors.email)}
                      style={!b2bErrors.email ? { borderColor: "rgba(255,255,255,0.12)" } : undefined}
                    />
                    <FieldError msg={b2bErrors.email || ""} />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder={t.b2b.phone}
                      value={b2bForm.phone}
                      onChange={(e) => updateB2b("phone", e.target.value)}
                      className={inputClass(false)}
                      style={{ borderColor: "rgba(255,255,255,0.12)" }}
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder={t.b2b.message_ph}
                    rows={5}
                    value={b2bForm.message}
                    onChange={(e) => updateB2b("message", e.target.value)}
                    className={`${inputClass(!!b2bErrors.message)} resize-none`}
                    style={!b2bErrors.message ? { borderColor: "rgba(255,255,255,0.12)" } : undefined}
                  />
                  <FieldError msg={b2bErrors.message || ""} />
                </div>

                <button
                  type="submit"
                  disabled={submitInquiry.isPending}
                  className="w-full flex items-center justify-center gap-2 py-4 font-en text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed active:translate-y-0"
                  style={{ backgroundColor: "var(--avo-mid)", color: "var(--avo-deep)" }}
                >
                  {submitInquiry.isPending ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>{lang === "ko" ? "전송 중..." : "Sending..."}</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>{t.b2b.submit}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* ── 개인 폼 ── */
              <form onSubmit={handleIndSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder={t.individual.name}
                      value={indForm.name}
                      onChange={(e) => updateInd("name", e.target.value)}
                      className={inputClass(!!indErrors.name)}
                      style={!indErrors.name ? { borderColor: "rgba(255,255,255,0.12)" } : undefined}
                    />
                    <FieldError msg={indErrors.name || ""} />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t.individual.email}
                      value={indForm.email}
                      onChange={(e) => updateInd("email", e.target.value)}
                      className={inputClass(!!indErrors.email)}
                      style={!indErrors.email ? { borderColor: "rgba(255,255,255,0.12)" } : undefined}
                    />
                    <FieldError msg={indErrors.email || ""} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={indForm.age}
                    onChange={(e) => updateInd("age", e.target.value)}
                    className="w-full px-4 py-3 font-body text-sm bg-[var(--avo-deep)] border outline-none transition-all duration-200 focus:border-[var(--avo-mid)] text-white/70"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  >
                    <option value="">{t.individual.age}</option>
                    {t.individual.age_options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <select
                    value={indForm.interest}
                    onChange={(e) => updateInd("interest", e.target.value)}
                    className="w-full px-4 py-3 font-body text-sm bg-[var(--avo-deep)] border outline-none transition-all duration-200 focus:border-[var(--avo-mid)] text-white/70"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  >
                    <option value="">{t.individual.interest}</option>
                    {t.individual.interest_options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <textarea
                    placeholder={t.individual.message_ph}
                    rows={5}
                    value={indForm.message}
                    onChange={(e) => updateInd("message", e.target.value)}
                    className={`${inputClass(!!indErrors.message)} resize-none`}
                    style={!indErrors.message ? { borderColor: "rgba(255,255,255,0.12)" } : undefined}
                  />
                  <FieldError msg={indErrors.message || ""} />
                </div>

                <button
                  type="submit"
                  disabled={submitInquiry.isPending}
                  className="w-full flex items-center justify-center gap-2 py-4 font-en text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed active:translate-y-0"
                  style={{ backgroundColor: "var(--avo-deep)", color: "var(--avo-mid)" }}
                >
                  {submitInquiry.isPending ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>{lang === "ko" ? "전송 중..." : "Sending..."}</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>{t.individual.submit}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
