import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrustSection from "./components/TrustSection";
import WhatYouLearnSection from "./components/WhatYouLearnSection";
import ChallengeBreakdown from "./components/ChallengeBreakdown";
import TestimonialsSection from "./components/TestimonialsSection";
import RegistrationForm from "./components/RegistrationForm";
import ResultsSection from "./components/ResultsSection";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <WhatYouLearnSection />
      <ChallengeBreakdown />
      <TestimonialsSection />
      <RegistrationForm />
      <ResultsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
