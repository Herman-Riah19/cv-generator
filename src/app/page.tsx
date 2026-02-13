import { Header } from "@/components/landing-page/Header";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { AISection } from "@/components/landing-page/AISection";
import { ThemesSection } from "@/components/landing-page/ThemesSection";
import { CTASection } from "@/components/landing-page/CTASection";
import { Footer } from "@/components/landing-page/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AISection />
        <ThemesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
