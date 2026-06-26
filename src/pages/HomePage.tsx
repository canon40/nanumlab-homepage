import { AICapabilitiesSection } from "../components/sections/AICapabilitiesSection";
import { CompanyStatsSection } from "../components/sections/CompanyStatsSection";
import { CorporateServicesSection } from "../components/sections/CorporateServicesSection";
import { HeroSection } from "../components/sections/HeroSection";
import { OurServicesBannerSection } from "../components/sections/OurServicesBannerSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { QuickContactSection } from "../components/sections/QuickContactSection";
import { WhyChooseUsSection } from "../components/sections/WhyChooseUsSection";

/** 홈 — 히어로 + AI 기술 + nanumlab.com 기업 콘텐츠 */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <AICapabilitiesSection />
      <WhyChooseUsSection />
      <CorporateServicesSection />
      <OurServicesBannerSection />
      <ProcessSection />
      <CompanyStatsSection />
      <QuickContactSection />
    </>
  );
}
