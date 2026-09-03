/**
 * TimelineSection — 회사 연혁 타임라인
 * 스크롤 리빌 애니메이션 (Intersection Observer)
 * 좌우 교차 레이아웃 (데스크톱) / 단일 컬럼 (모바일)
 * 골드 팔레트: 노드·커넥터·배지·태그 전반에 적용
 */

import { useEffect, useRef, useState } from "react";
import { useLang } from "../Navigation";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  tags: string[];
  status: "past" | "current" | "future";
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: "2023",
    title: "라이프이점영 설립 구상",
    titleEn: "Life 2.0 Concept Founded",
    description:
      "고령화 사회의 새로운 패러다임을 제시하기 위해 '인생 2막'을 지원하는 플랫폼 아이디어를 구체화하기 시작했습니다.",
    descriptionEn:
      "Began conceptualizing a platform to support the 'second act of life', presenting a new paradigm for an aging society.",
    tags: ["기획", "리서치"],
    status: "past",
  },
  {
    id: 2,
    year: "2024 Q1",
    title: "핵심 사업 영역 정의",
    titleEn: "Core Business Areas Defined",
    description:
      "2막1장 플랫폼, Mossrium Solutions, 라이프 컨설팅, 시니어 에듀테크 등 4대 핵심 사업 영역을 확정하고 팀을 구성했습니다.",
    descriptionEn:
      "Finalized four core business areas — Act 2 Platform, IKKI Smart Farm, Life Consulting, and Senior EduTech — and assembled the founding team.",
    tags: ["사업 전략", "팀 빌딩"],
    status: "past",
  },
  {
    id: 3,
    year: "2024 Q3",
    title: "K-Taxonomy 녹색 인증 획득",
    titleEn: "K-Taxonomy Green Certification",
    description:
      "Mossrium Solutions 사업이 한국형 녹색분류체계(K-Taxonomy) 인증을 획득하며 ESG 경영 기반을 확립했습니다.",
    descriptionEn:
      "IKKI Smart Farm received K-Taxonomy green certification, establishing a solid ESG management foundation.",
    tags: ["ESG", "인증", "스마트팜"],
    status: "past",
  },
  {
    id: 4,
    year: "2025",
    title: "공식 법인 설립 및 서비스 론칭",
    titleEn: "Official Incorporation & Service Launch",
    description:
      "라이프이점영 주식회사를 공식 설립하고 2막1장 플랫폼 베타 서비스를 시작했습니다. 초기 파트너사 10곳과 MOU를 체결했습니다.",
    descriptionEn:
      "Officially incorporated Life 2.0 Co., Ltd. and launched the Act 2 Platform beta service, signing MOUs with 10 initial partner companies.",
    tags: ["법인 설립", "베타 론칭", "파트너십"],
    status: "current",
  },
  {
    id: 5,
    year: "2026 Q2",
    title: "시리즈 A 투자 유치 목표",
    titleEn: "Series A Funding Target",
    description:
      "플랫폼 사용자 10만 명 달성 및 시리즈 A 투자 유치를 목표로 합니다. 일본·동남아 시장 진출을 위한 파트너십을 구축할 예정입니다.",
    descriptionEn:
      "Targeting 100,000 platform users and Series A funding. Planning partnerships for expansion into Japan and Southeast Asia.",
    tags: ["투자", "글로벌 확장"],
    status: "future",
  },
  {
    id: 6,
    year: "2027",
    title: "글로벌 시니어 플랫폼으로 도약",
    titleEn: "Global Senior Platform Expansion",
    description:
      "아시아 5개국 진출과 함께 시니어 라이프스타일 생태계를 완성합니다. 누적 사용자 100만 명을 목표로 합니다.",
    descriptionEn:
      "Completing the senior lifestyle ecosystem with expansion into 5 Asian countries, targeting 1 million cumulative users.",
    tags: ["아시아 진출", "생태계"],
    status: "future",
  },
];

// ─── useReveal hook ───────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // 한 번 보이면 해제 (반복 방지)
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── TimelineCard ─────────────────────────────────────────────────────────────
function TimelineCard({
  item,
  lang,
  align,
}: {
  item: TimelineItem;
  lang: "ko" | "en";
  align: "left" | "right";
}) {
  const title = lang === "ko" ? item.title : item.titleEn;
  const desc = lang === "ko" ? item.description : item.descriptionEn;
  const isFuture = item.status === "future";
  const isCurrent = item.status === "current";

  return (
    <div
      style={{
        background: isCurrent
          ? "rgba(232,201,107,0.08)"
          : "rgba(255,255,255,0.04)",
        border: isCurrent
          ? "1px solid rgba(232,201,107,0.4)"
          : isFuture
          ? "1px dashed rgba(232,201,107,0.2)"
          : "1px solid rgba(232,201,107,0.15)",
        borderRadius: 12,
        padding: "1.25rem 1.5rem",
        textAlign: align === "left" ? "right" : "left",
        opacity: isFuture ? 0.65 : 1,
        position: "relative",
      }}
    >
      {/* 현재 항목 강조 배지 */}
      {isCurrent && (
        <div
          style={{
            position: "absolute",
            top: -10,
            ...(align === "left" ? { right: 16 } : { left: 16 }),
            background: "var(--gold-satin, #E8C96B)",
            color: "#1a2010",
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            padding: "2px 10px",
            borderRadius: 9999,
          }}
        >
          NOW
        </div>
      )}

      {/* 연도 배지 */}
      <div
        style={{
          color: "var(--gold-satin, #E8C96B)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          marginBottom: "0.35rem",
        }}
      >
        {item.year}
        {isFuture && (
          <span
            style={{
              marginLeft: 6,
              background: "rgba(232,201,107,0.15)",
              padding: "1px 6px",
              borderRadius: 4,
              fontSize: "0.65rem",
            }}
          >
            {lang === "ko" ? "예정" : "Planned"}
          </span>
        )}
      </div>

      {/* 제목 */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: isCurrent ? "var(--gold-champagne, #F7E7A3)" : "inherit",
        }}
      >
        {title}
      </div>

      {/* 설명 */}
      <p
        style={{
          fontSize: "0.85rem",
          lineHeight: 1.7,
          opacity: 0.78,
          margin: 0,
        }}
      >
        {desc}
      </p>

      {/* 태그 */}
      {item.tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            marginTop: "0.75rem",
            justifyContent: align === "left" ? "flex-end" : "flex-start",
          }}
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(232,201,107,0.12)",
                color: "var(--gold-champagne, #F7E7A3)",
                border: "1px solid rgba(232,201,107,0.2)",
                borderRadius: 9999,
                padding: "2px 9px",
                fontSize: "0.7rem",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TimelineRow ──────────────────────────────────────────────────────────────
function TimelineRow({
  item,
  index,
  lang,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  lang: "ko" | "en";
  isLast: boolean;
}) {
  const isLeft = index % 2 === 0;
  const isCurrent = item.status === "current";
  const { ref, visible } = useReveal(0.15);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: `${index * 0.12}s`,
      }}
    >
      {/* 데스크톱: 3컬럼 좌우 교차 */}
      <div
        className="timeline-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 56px 1fr",
          gap: "0 0.75rem",
          alignItems: "flex-start",
        }}
      >
        {/* 왼쪽 카드 (짝수 인덱스) */}
        <div
          className="timeline-left"
          style={{
            paddingRight: "0.5rem",
            paddingBottom: "2rem",
            opacity: isLeft ? 1 : 0,
            pointerEvents: isLeft ? "auto" : "none",
          }}
        >
          {isLeft && <TimelineCard item={item} lang={lang} align="left" />}
        </div>

        {/* 중앙 트랙 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 노드 */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: isCurrent
                ? "var(--gold-satin, #E8C96B)"
                : item.status === "future"
                ? "rgba(212,168,67,0.4)"
                : "var(--gold-antique, #D4A843)",
              border: "3px solid var(--avo-deep, #2D4A1A)",
              boxShadow: isCurrent
                ? "0 0 0 5px rgba(232,201,107,0.25), 0 0 12px rgba(232,201,107,0.4)"
                : "none",
              flexShrink: 0,
              zIndex: 1,
              marginTop: "1.35rem",
              position: "relative",
            }}
          >
            {/* 현재 항목 펄스 링 */}
            {isCurrent && (
              <div
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: "50%",
                  border: "2px solid rgba(232,201,107,0.4)",
                  animation: "pulse-ring 2s ease-out infinite",
                }}
              />
            )}
          </div>

          {/* 커넥터 라인 */}
          {!isLast && (
            <div
              style={{
                flex: 1,
                width: 2,
                minHeight: 40,
                background:
                  "linear-gradient(to bottom, var(--gold-antique, #D4A843), rgba(212,168,67,0.15))",
                marginTop: 4,
              }}
            />
          )}
        </div>

        {/* 오른쪽 카드 (홀수 인덱스) */}
        <div
          className="timeline-right"
          style={{
            paddingLeft: "0.5rem",
            paddingBottom: "2rem",
            opacity: !isLeft ? 1 : 0,
            pointerEvents: !isLeft ? "auto" : "none",
          }}
        >
          {!isLeft && <TimelineCard item={item} lang={lang} align="right" />}
        </div>
      </div>

      {/* 모바일: 단일 컬럼 (CSS로 처리) */}
      <div
        className="timeline-mobile"
        style={{ display: "none", paddingBottom: "1.5rem" }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          {/* 모바일 노드 + 라인 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "1.35rem",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: isCurrent
                  ? "var(--gold-satin, #E8C96B)"
                  : item.status === "future"
                  ? "rgba(212,168,67,0.4)"
                  : "var(--gold-antique, #D4A843)",
                border: "2px solid var(--avo-deep, #2D4A1A)",
                boxShadow: isCurrent
                  ? "0 0 0 4px rgba(232,201,107,0.25)"
                  : "none",
                flexShrink: 0,
              }}
            />
            {!isLast && (
              <div
                style={{
                  flex: 1,
                  width: 2,
                  minHeight: 30,
                  background:
                    "linear-gradient(to bottom, var(--gold-antique, #D4A843), rgba(212,168,67,0.15))",
                  marginTop: 4,
                }}
              />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <TimelineCard item={item} lang={lang} align="right" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TimelineSection ──────────────────────────────────────────────────────────
interface Props {
  lang?: "ko" | "en";
}

export default function TimelineSection({ lang: langProp }: Props) {
  const { lang: ctxLang } = useLang();
  const lang = langProp ?? ctxLang;
  const [mode, setMode] = useState<"history" | "roadmap">("history");

  const filtered =
    mode === "history"
      ? timelineData.filter((d) => d.status !== "future")
      : timelineData;

  return (
    <section
      id="timeline"
      style={{
        background:
          "linear-gradient(180deg, var(--avo-deep, #2D4A1A) 0%, #1a2e0e 100%)",
        color: "#e8f0e0",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,201,107,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(143,175,90,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* 섹션 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(232,201,107,0.1)",
              border: "1px solid rgba(232,201,107,0.25)",
              borderRadius: 9999,
              padding: "0.3rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                color: "var(--gold-satin, #E8C96B)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
              }}
            >
              {lang === "ko" ? "04 · 우리의 여정" : "04 · OUR JOURNEY"}
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            {lang === "ko" ? (
              <>
                인생 2막을 향한{" "}
                <span style={{ color: "var(--gold-satin, #E8C96B)" }}>
                  발걸음
                </span>
              </>
            ) : (
              <>
                Steps Toward{" "}
                <span style={{ color: "var(--gold-satin, #E8C96B)" }}>
                  Life 2.0
                </span>
              </>
            )}
          </h2>

          <p
            style={{
              fontSize: "1rem",
              opacity: 0.7,
              maxWidth: 480,
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            {lang === "ko"
              ? "라이프이점영이 걸어온 길과 앞으로 나아갈 방향을 함께 확인하세요."
              : "Explore the milestones we've achieved and the vision we're building toward."}
          </p>

          {/* 모드 토글 */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 9999,
              padding: 4,
              gap: 4,
            }}
          >
            {(["history", "roadmap"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "0.4rem 1.25rem",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: mode === m ? 700 : 400,
                  background:
                    mode === m
                      ? "var(--gold-satin, #E8C96B)"
                      : "transparent",
                  color: mode === m ? "#1a2010" : "rgba(232,240,224,0.7)",
                  transition: "all 0.2s ease",
                }}
              >
                {m === "history"
                  ? lang === "ko"
                    ? "연혁"
                    : "History"
                  : lang === "ko"
                  ? "로드맵"
                  : "Roadmap"}
              </button>
            ))}
          </div>
        </div>

        {/* 타임라인 트랙 */}
        <div>
          {filtered.map((item, index) => (
            <TimelineRow
              key={item.id}
              item={item}
              index={index}
              lang={lang}
              isLast={index === filtered.length - 1}
            />
          ))}
        </div>
      </div>

      {/* 펄스 링 애니메이션 CSS */}
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* 모바일: 단일 컬럼 전환 */
        @media (max-width: 640px) {
          .timeline-row {
            display: none !important;
          }
          .timeline-mobile {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
