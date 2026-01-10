import '@/components/landing/landing.css';
import Header from '@/components/landing/header/header';
import HeroSection from '@/components/landing/hero';
import { CoreFeatures } from '@/components/landing/core-features';
import AIToolsTabs from '@/components/landing/tools';
import BenefitsGrid from '@/components/landing/benefits';
import TestimonialsSection from '@/components/landing/client-testimonial';

import FaqAccordion from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CoreFeatures />
      <AIToolsTabs />
      <BenefitsGrid />
      <TestimonialsSection />
      <FaqAccordion />
      <Footer />
    </div>
  );
}
