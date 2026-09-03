# Life 2.0 홈페이지 TODO

## 완료된 작업
- [x] 홈페이지 기본 구조 (Hero, WhoWeAre, WhatWeDo, WhereWeGo, HowWeWork, Insights, Contact, Footer)
- [x] 다국어 지원 (KO/EN)
- [x] 문의 폼 (파트너십/투자/개인/기타)
- [x] 문의 DB 저장
- [x] 관리자 문의 목록/상세 페이지
- [x] 문의 폼 오류 수정 (message 최소 길이, company null 허용)
- [x] Resend 이메일 알림 연동 (Daniel@lpp20.com)

## 진행 중 / 예정 작업

### 관리자 대시보드
- [x] 관리자 대시보드 메인 (통계 카드: 문의 수, 진단 수, 회원 수, 페이지뷰)
- [x] 문의 관리 페이지 (목록, 상태 변경, 답변 메모)
- [x] 2막1장 진단 데이터 관리 페이지 (목록, 상세, CSV 다운로드)
- [x] 회원 관리 페이지 (목록, 역할 변경)
- [ ] 게시물(인사이트) 관리 페이지 (작성, 수정, 삭제, 발행)

### 2막1장 진단 연동
- [x] DB 스키마: diagnostics 테이블 추가 (진단 데이터 저장)
- [x] 서버 API: diagnostics.submit (외부 링크에서 POST)
- [x] 서버 API: diagnostics.list, diagnostics.get (관리자 조회)
- [x] 서비스 살펴보기 섹션에 2막1장 진단 링크 버튼 추가 (외부 링크로 연결)
- [ ] 외부 링크 → 진단 완료 시 데이터 API 전송 연동

### 이메일
- [ ] Resend lpp20.com 도메인 인증 (noreply@lpp20.com 발신자 설정)

### 유입 경로 분석
- [x] 서버 API: referrer 분류 로직 (직접 방문/검색엔진/소셜/외부링크)
- [x] 서버 API: 채널별 유입 통계 쿼리 추가
- [x] 관리자 대시보드: 유입 경로 분석 전용 페이지 (/admin/traffic)
- [x] 유입 경로 분석 페이지: 채널별 파이차트
- [x] 유입 경로 분석 페이지: 시간대별 방문 패턴 차트
- [x] 유입 경로 분석 페이지: 상위 referrer URL 목록
- [x] AdminLayout 사이드바에 유입 경로 메뉴 추가

### UX/디자인 개선 (2차)
- [x] 히어로 섹션: 무엇을 하는 회사인지 즉시 이해되도록 메인 카피/서브카피 명확화
- [x] 내비게이션: 사업영역↔회사소개 등 섹션 간 이동 링크 명확화 및 앵커 스크롤 정비
- [x] 메뉴 구조 단순화: 2막1장 플랫폼 / 모스스마트팜 / 회사소개 / 비전 등 최상위 메뉴로 펼치기
- [x] 2막1장 이미지 좌우반전
- [x] 전체 색감 세이지 톤으로 변경 (다크네이비 → 세이지 그린 계열)

### 폼 유효성 검사
- [x] B2B 폼: 이름/기업명/이메일/내용 필수 항목 미입력 시 인라인 오류 메시지
- [x] 개인 폼: 이름/이메일/내용 필수 항목 미입력 시 인라인 오류 메시지
- [x] 이메일 형식 정규식 검사 (양쪽 폼 공통)
- [x] 오류 있는 필드에 빨간 테두리 강조 표시
- [x] 제출 시도 후 수정하면 해당 필드 오류 즉시 해제

### 색감/폰트 개선 (v2)
- [ ] index.css: Option B 'New Vitality' 팔레트 적용 (#2D6A4F 포레스트그린, #F7FAFC 라이트그레이, #F6E05E 머스타드)
- [ ] index.css: Pretendard 폰트 적용 (Google Fonts CDN → client/index.html)
- [ ] 본문 최소 크기 18px, 행간 1.7 적용
- [ ] 하드코딩 색상 컴포넌트 일괄 교체

### 2막1장 진단 파일 통합
- [ ] 2막1장_life20_v4.html을 webdev 스토리지에 업로드
- [ ] Imakiljang.tsx 페이지에서 iframe 또는 새 탭으로 진단 파일 연결
- [ ] submitPremium/submitExpert 함수에 서버 API 연동 (진단 데이터 저장)

### 진단 임시 저장 기능
- [x] localStorage에 현재 단계 및 입력값 저장 (자동 + 수동)
- [x] 각 단계 이동 시 자동 저장
- [x] sticky 상태바에 "임시 저장" 버튼 추가
- [x] 저장 성공 시 토스트 알림 표시
- [x] 페이지 재방문 시 저장된 데이터 감지 → "이어서 진행하기" 배너 표시
- [x] 저장된 데이터로 폼 복원 (입력값, 단계 위치)
- [x] 저장 데이터 삭제(초기화) 기능

### 고객 리뷰(Testimonial) 슬라이더
- [x] 고객 리뷰(Testimonial) 슬라이더 섹션 컴포넌트 제작 (골드 팔레트, 자동 슬라이더, KO/EN 이중언어)
- [x] Home.tsx에 TestimonialsSection 등록 (InsightsSection과 ContactSection 사이)

- [x] TimelineSection 컴포넌트 구현 (스크롤 리빌 애니메이션, 좌우 교차 레이아웃, 골드 팔레트)
- [x] Home.tsx에 TimelineSection 등록 (WhoWeAreSection 뒤에 배치)

### 명칭 변경 및 이미지 추가 (v3)
- [x] Moss-Tech Solutions → Mossrium Solutions 전체 명칭 교체 (컴포넌트, 텍스트 전수 검색)
- [x] Mossrium 공기정화 제품 일러스트 이미지 생성 (운무·미세먼지 흡착·이끼 필터 흐름, Tree100 & Moss-Rium 브랜드)
- [x] 생성된 이미지 홈페이지 이끼 스마트팜 섹션에 적용
- [x] 메뉴 버튼 클릭 → 섹션 이동 전수 점검 및 수정

### 기술 소개서 다운로드 버튼 (v4)
- [x] Mossrium Solutions 섹션 하단에 Tree100 기술 소개서 다운로드 버튼 추가
- [x] Mossrium Solutions 섹션 하단에 Moss-Rium 기술 소개서 다운로드 버튼 추가
- [x] PDF 플레이스홀더 파일 생성 및 스토리지 업로드
- [x] Smartfarm 페이지 이끼 타워 제품 이미지 MOSS-TECH → MOSS-RIUM 브랜드로 재생성 및 교체

### 영문 텍스트 수정 및 이름 표기 (v5)
- [x] HeroSection EN sub_en 텍스트 영문화 ("AI-Powered Senior Life Masterplan Platform")
- [x] TimelineSection useLang() 훅 추가 (lang prop 대신 context 구독)
- [x] TimelineSection "예정" → "Planned" (EN 전환 시)
- [x] Home.tsx TimelineSection lang="ko" 하드코딩 prop 제거
- [x] WhoWeAreSection KO: "홍인철" → "홍인철 (Daniel)"
- [x] WhoWeAreSection EN: "Hong Inchul" → "Hong Inchul (Daniel)"
- [x] Footer EN: "Director: Hong Inchul" → "Director: Hong Inchul (Daniel)"
