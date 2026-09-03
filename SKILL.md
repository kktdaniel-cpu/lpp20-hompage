---
name: webdev-color-theme-designer
description: >
  Webdev 프로젝트의 색상 팔레트 교체, 프리미엄 골드/자연 계열 팔레트 설계·적용, UI 섹션 컴포넌트
  구현(Testimonial 슬라이더·FAQ·통계 카운터·팀 카드·타임라인), 브랜드 AI 이미지 생성,
  PDF 다운로드 버튼 추가, 브랜드 명칭 전체 교체 워크플로우 스킬.
  사용 시점: (1) 색상 테마 교체, (2) 프리미엄 팔레트 제안·적용, (3) UI 섹션 컴포넌트 추가,
  (4) 제품·기술 브랜드 이미지 생성, (5) PDF 소개서 다운로드 버튼 추가,
  (6) 홈페이지 전체 브랜드명 일괄 교체.
---

# Webdev Color Theme Designer

이 스킬은 세 가지 독립적인 작업을 다룬다. 각 작업은 단독으로도, 조합해서도 사용할 수 있다.

---

## 작업 선택

**팔레트 교체만 필요한 경우** → [1. 색상 팔레트 교체 워크플로우](#1-색상-팔레트-교체-워크플로우)

**새 팔레트 제안이 필요한 경우** → [2. 프리미엄 팔레트 설계 패턴](#2-프리미엄-팔레트-설계-패턴)

**Testimonial 섹션 추가가 필요한 경우** → [3. Testimonial 슬라이더 섹션](#3-testimonial-슬라이더-섹션)

**FAQ 아코디언이 필요한 경우** → [4. FAQ 아코디언 섹션](#4-faq-아코디언-섹션)

**숫자 KPI 카운터가 필요한 경우** → [5. 통계 카운터 애니메이션](#5-통계-카운터-애니메이션)

**팀 멤버 소개 카드가 필요한 경우** → [6. 팀 멤버 카드 그리드](#6-팀-멤버-카드-그리드)

**연혁·프로세스·로드맵이 필요한 경우** → [7. 타임라인 섹션](#7-타임라인-섹션)

**제품·기술 브랜드 이미지가 필요한 경우** → [8. 브랜드 AI 이미지 생성](#8-브랜드-ai-이미지-생성)

**PDF 소개서 다운로드 버튼이 필요한 경우** → [9. PDF 다운로드 버튼](#9-pdf-다운로드-버튼)

**홈페이지 전체 브랜드명을 교체해야 하는 경우** → [10. 브랜드 명칭 전체 교체](#10-브랜드-명칭-전체-교체)

---

## 1. 색상 팔레트 교체 워크플로우

전체 절차는 `references/palette-swap-workflow.md`에 있다. 핵심 단계 요약:

1. **기존 색상 감사** — `grep -rn '#[0-9A-Fa-f]\{6\}'` 로 하드코딩된 값 목록 추출
2. **토큰 매핑 테이블 작성** — 교체 전/후 대응표를 먼저 만든다
3. **`index.css` CSS 변수 업데이트** — `:root` 블록에 새 팔레트 변수 추가, semantic token 재매핑
4. **컴포넌트 일괄 교체** — `sed` 로 토큰명 일괄 치환, 인라인 스타일은 수동 확인
5. **대비 비율 검증** — 텍스트 가독성(WCAG AA ≥ 4.5:1) 확인
6. **서버 재시작** — HMR이 CSS를 못 잡을 경우 `webdev_restart_server` 사용

> 자세한 명령어 예시는 `references/palette-swap-workflow.md` 참조.

---

## 2. 프리미엄 팔레트 설계 패턴

### 팔레트 제안 원칙

- 5색 세트로 제안: **딥(배경용) → 메인 → 미드 → 라이트 → 크림(배경 강조)**
- 각 색상에 **역할**을 명시: 배경 / 버튼 / 강조 텍스트 / 카드 배경 / 섹션 배경
- **어두운 배경 + 밝은 강조** 조합이 고급스러운 느낌을 준다 (예: 딥 그린 + 골드)

### 골드 팔레트 (즉시 사용 가능)

| 이름 | Hex | 용도 |
|------|-----|------|
| Champagne Gold | `#F7E7A3` | 배경 하이라이트, 연한 강조 |
| Warm Satin Gold | `#E8C96B` | 메인 포인트, 버튼, 배지 |
| Pale Harvest Gold | `#F2D06B` | 헤드라인 강조, 아이콘 |
| Antique Gold | `#D4A843` | CTA 버튼, 섹션 번호, 구분선 |
| Ivory Gold | `#F5E6B2` | 카드 배경, 소프트 하이라이트 |

골드 색상의 구체적인 적용 예시(Hero, KPI 숫자, 배지, 진행 바 등)는 `references/gold-palette-patterns.md` 참조.

### Tailwind 4 OKLCH 변환

Tailwind 4의 `@theme inline` 블록은 OKLCH 형식을 사용해야 한다:

```css
@theme inline {
  --color-gold-satin:    oklch(83% 0.14 85);
  --color-gold-antique:  oklch(73% 0.16 80);
  --color-avo-deep:      oklch(42% 0.12 135);
}
```

---

## 3. Testimonial 슬라이더 섹션

### 빠른 구현 체크리스트

- [ ] `TestimonialsSection.tsx` 컴포넌트 생성
- [ ] 리뷰 데이터 배열 정의 (KO/EN 이중언어 포함)
- [ ] 자동 슬라이더 (`useEffect` + `setInterval`, 5초 기본)
- [ ] 골드 진행 바 (progress state → width %)
- [ ] 이전/다음 버튼 + 도트 인디케이터
- [ ] `Home.tsx`에 InsightsSection 뒤, ContactSection 앞에 배치

### 핵심 데이터 구조

```ts
interface Testimonial {
  id: number;
  name: string; nameEn: string;
  title: string; titleEn: string;
  location: string;
  category: string; categoryEn: string;
  rating: number;   // 1–5
  text: string; textEn: string;
}
```

### 자동 슬라이더 핵심 로직

```tsx
const [current, setCurrent] = useState(0);
const [progress, setProgress] = useState(0);

useEffect(() => {
  const start = Date.now();
  const tick = setInterval(() => {
    const pct = Math.min(((Date.now() - start) / 5000) * 100, 100);
    setProgress(pct);
    if (pct >= 100) {
      setCurrent(c => (c + 1) % items.length);
      setProgress(0);
      clearInterval(tick);
    }
  }, 50);
  return () => clearInterval(tick);
}, [current]);
```

슬라이드 전환 애니메이션은 `key={current}` + CSS `@keyframes fade-in` 패턴을 사용한다.

> 전체 구현 코드(아바타, 도트 인디케이터, 이중언어 처리)는 `references/testimonial-slider-pattern.md` 참조.

### 디자인 원칙

- **배경**: 어두운 색(딥 그린 등)으로 주변 섹션과 명확히 구분
- **강조**: 골드 배지, 골드 별점, 골드 진행 바로 신뢰감·고급감 부여
- **아바타**: 실제 사진이 없으면 이니셜 + 골드 그라데이션 원형으로 대체
- **리뷰 내용**: 실제 고객 리뷰로 교체 전까지 샘플임을 사용자에게 고지

---

---

## 4. FAQ 아코디언 섹션

### 빠른 구현 체크리스트

- [ ] `FAQSection.tsx` 컴포넌트 생성
- [ ] FAQ 데이터 배열 정의 (카테고리·KO/EN 포함)
- [ ] `openId` state로 단일 열기 또는 `Set<number>`으로 다중 열기 구현
- [ ] `grid-template-rows: 0fr → 1fr` CSS 애니메이션 적용 (max-height 사용 금지)
- [ ] 카테고리 필터 탭 (선택 사항, 골드 언더라인 활성 스타일)
- [ ] 접근성: `<button>`, `aria-expanded`, `aria-controls` 적용

### 핵심: 부드러운 높이 애니메이션

`max-height` 트릭은 레이아웃 지연을 유발한다. 대신 CSS Grid 트릭을 사용한다:

```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;       /* collapsed */
  transition: grid-template-rows 0.3s ease;
}
.accordion-content.open {
  grid-template-rows: 1fr;       /* expanded */
}
.accordion-inner { overflow: hidden; }
```

> 전체 구현 코드(골드 강조, 카테고리 탭, 접근성)는 `references/faq-accordion-pattern.md` 참조.

---

## 5. 통계 카운터 애니메이션

### 빠른 구현 체크리스트

- [ ] `useCountUp` 커스텀 훅 작성 (Intersection Observer + ease-out 애니메이션)
- [ ] `StatCard` 컴포넌트 (숫자 + 접미사 + 레이블)
- [ ] `auto-fit minmax` 그리드 레이아웃
- [ ] 뷰포트 진입 시 카운트 시작 (스크롤 전 0 유지)

### 핵심 훅 요약

```tsx
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver로 뷰포트 진입 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // ease-out cubic 애니메이션
  useEffect(() => {
    if (!started) return;
    const t0 = Date.now();
    const tick = setInterval(() => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p >= 1) clearInterval(tick);
    }, 16);
    return () => clearInterval(tick);
  }, [started, target, duration]);

  return { count, ref };
}
```

> 전체 구현 코드(그리드, 구분선, 골드 스타일링)는 `references/stats-counter-pattern.md` 참조.

---

## 6. 팀 멤버 카드 그리드

### 빠른 구현 체크리스트

- [ ] `TeamSection.tsx` 컴포넌트 생성
- [ ] 팀 멤버 데이터 배열 정의 (사진 URL 또는 이니셜 폴백)
- [ ] 사진 업로드: `manus-upload-file --webdev` → `/manus-storage/...` URL 사용
- [ ] 호버 오버레이 (translateY 슬라이드업) 또는 3D 플립 카드 선택
- [ ] `auto-fill minmax(220px, 1fr)` 반응형 그리드

### 두 가지 카드 변형

| 변형 | 설명 | 적합한 경우 |
|------|------|------------|
| **Overlay** | 호버 시 하단에서 바이오 슬라이드업 | 모바일 포함 모든 환경 |
| **Flip Card** | 3D Y축 회전으로 뒷면 표시 | 데스크톱 전용 레이아웃 |

사진이 없을 때: 이니셜 + `linear-gradient(135deg, var(--avo-deep), var(--avo-main))` 배경 + 골드 텍스트로 대체.

> 전체 구현 코드(오버레이·플립·태그·반응형)는 `references/team-card-pattern.md` 참조.

---

## 7. 타임라인 섹션

### 빠른 구현 체크리스트

- [ ] `TimelineSection.tsx` 컴포넌트 생성
- [ ] 타임라인 데이터 정의 (`status: "past" | "current" | "future"` 포함)
- [ ] 데스크톱: 좌우 교차 레이아웃 (`grid-template-columns: 1fr 48px 1fr`)
- [ ] 모바일: 단일 컬럼 (`grid-template-columns: 24px 1fr`)
- [ ] 스크롤 리빌 애니메이션 (Intersection Observer + `transitionDelay`)
- [ ] 현재 노드: 골드 펄스 효과 (`box-shadow: 0 0 0 4px rgba(232,201,107,0.3)`)
- [ ] 미래 항목: 반투명 + 점선 테두리

### 세 가지 사용 시나리오

| 시나리오 | `year` 필드 | `step` 필드 |
|----------|------------|------------|
| 회사 연혁 | `"2025"`, `"2024"` | — |
| 서비스 프로세스 | — | `"STEP 01"`, `"STEP 02"` |
| 로드맵 | `"Q1 2026"` | — |

> 전체 구현 코드(교차 레이아웃·모바일·스크롤 리빌)는 `references/timeline-section-pattern.md` 참조.

---

## 8. 브랜드 AI 이미지 생성

### 빠른 구현 체크리스트

- [ ] 교체할 이미지의 구도·색상·브랜드 요소 파악
- [ ] 프롬프트 작성 (제품 형태 + 기술 흐름 + 브랜드명 명시)
- [ ] `generate` 모드로 이미지 생성 → `/home/ubuntu/webdev-static-assets/` 저장
- [ ] `manus-upload-file --webdev <파일>` 업로드 후 URL 획득
- [ ] 컴포넌트 내 기존 URL을 새 URL로 교체

### 프롬프트 핵심 구조

```
"[제품 외형] + [기술 흐름 묘사] + Brand label '[브랜드명]' visible.
Style: premium product diagram, [배경색] background, [강조색] accent lighting."
```

> 상세 프롬프트 템플릿·색상 팔레트 연동 팁은 `references/brand-image-generation-pattern.md` 참조.

---

## 9. PDF 다운로드 버튼

### 빠른 구현 체크리스트

- [ ] PDF 파일 준비 (없으면 fpdf2로 플레이스홀더 생성)
- [ ] `manus-upload-file --webdev <파일>.pdf` 업로드
- [ ] 섹션 하단에 골드 테두리 다운로드 버튼 UI 추가
- [ ] 특정 탭에서만 표시할 경우 `{active === N && ...}` 조건부 렌더링
- [ ] 호버 시 골드 배경으로 채워지는 인터랙션 적용

### 필요한 아이콘 import

```tsx
import { FileText, Download } from "lucide-react";
```

> 전체 컴포넌트 코드·CSS 변수 참조는 `references/pdf-download-button-pattern.md` 참조.

---

## 10. 브랜드 명칭 전체 교체

### 빠른 구현 체크리스트

- [ ] `grep -rn "구명칭"` 으로 교체 대상 전수 검색
- [ ] sed로 KO/EN 명칭 일괄 교체
- [ ] 이미지 내 텍스트 교체 → AI 이미지 재생성 (패턴 8 참조)
- [ ] `grep -rn "구명칭"` 재실행으로 잔존 여부 검증

### 자주 놓치는 위치

Navigation 메뉴 · Hero 서브타이틀 · Footer · Insights 카드 태그 · 관리자 페이지 · 이메일 템플릿

> 전체 체크리스트·sed 명령어 예시는 `references/brand-rename-pattern.md` 참조.

---

## 참조 파일 목록

| 파일 | 내용 |
|------|------|
| `references/palette-swap-workflow.md` | 팔레트 교체 전체 절차 + 명령어 |
| `references/gold-palette-patterns.md` | 골드 팔레트 값, 대비 비율, 적용 예시 코드 |
| `references/testimonial-slider-pattern.md` | Testimonial 컴포넌트 전체 구현 패턴 |
| `references/faq-accordion-pattern.md` | FAQ 아코디언 구현 패턴 (CSS Grid 애니메이션) |
| `references/stats-counter-pattern.md` | 통계 카운터 애니메이션 (useCountUp 훅) |
| `references/team-card-pattern.md` | 팀 멤버 카드 그리드 (오버레이·플립 변형) |
| `references/timeline-section-pattern.md` | 타임라인 섹션 (연혁·프로세스·로드맵) |
| `references/brand-image-generation-pattern.md` | 브랜드 AI 이미지 생성 프롬프트 구조·적용 워크플로우 |
| `references/pdf-download-button-pattern.md` | PDF 다운로드 버튼 컴포넌트 패턴 (골드 팔레트 적용) |
| `references/brand-rename-pattern.md` | 브랜드 명칭 전체 교체 워크플로우 (grep/sed + 이미지 교체) |
