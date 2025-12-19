import { requireUnAuth } from "@/module/auth/utils/auth-utils";
import { Navbar } from "@/components/landing/navbar";
import { Scene } from "@/components/landing/scene";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { DemoSection } from "@/components/landing/demo-section";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default async function Home() {
  await requireUnAuth();
  
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden selection:bg-purple-500/30">
        <Navbar />
        
        {/* 3D Background */}
        <Scene />

        <main>
            <Hero />
            <Features />
            <HowItWorks />
            <DemoSection />
            <Testimonials />
            <Pricing />
            <CTA />
        </main>

        <Footer />
    </div>
  );
}
