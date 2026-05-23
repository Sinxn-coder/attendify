import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustBadges from '../components/TrustBadges';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import DashboardPreviewSection from '../components/DashboardPreviewSection';
import SecuritySection from '../components/SecuritySection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-text selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <HeroSection />
        <TrustBadges />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardPreviewSection />
        <SecuritySection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
