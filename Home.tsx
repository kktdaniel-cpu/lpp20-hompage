/**
 * Home Page — Life 2.0 (라이프이점영) Official Homepage
 * Design: "Established Authority" — Dark Navy + Forest Green + Warm Gold
 */

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import TimelineSection from "@/components/sections/TimelineSection";
import WhereWeGoSection from "@/components/sections/WhereWeGoSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import InsightsSection from "@/components/sections/InsightsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--avo-fog)" }}>
      <Navigation />
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <TimelineSection lang="ko" />
        <WhatWeDoSection />
        <WhereWeGoSection />
        <HowWeWorkSection />
        <InsightsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
