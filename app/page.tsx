import { HeroSection } from "@/components/sections/HeroSection";
import { PainPoints } from "@/components/sections/PainPoints";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPoints />
      <HowItWorks />
      <SkillsGrid />
      <CTASection />
      <Footer />
    </>
  );
}
