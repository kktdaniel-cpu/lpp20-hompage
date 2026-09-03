/**
 * Home Page — Life 2.0 (라이프이점영) Official Homepage
 * Design: "Established Authority" — Dark Navy + Forest Green + Warm Gold
 *
 * Sections:
 * 1. Hero — 강력한 슬로건과 배경 이미지
 * 2. Who We Are — 회사 소개 (Dark Navy)
 * 3. What We Do — 이막일장 플랫폼 + 이끼 스마트팜 (Light)
 * 4. Where We Go — 비전 & 로드맵 (Light)
 * 5. How We Work — 팀 문화 (Dark Navy)
 * 6. Community & Insights — 블로그 + SNS (Light)
 * 7. Contact — 파트너십 문의 폼 (Dark Navy)
 */

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import WhereWeGoSection from "@/components/sections/WhereWeGoSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import InsightsSection from "@/components/sections/InsightsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
      <Navigation />
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <WhatWeDoSection />
        <WhereWeGoSection />
        <HowWeWorkSection />
        <InsightsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
