
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StickySection from './components/StickySection';
import BookingCard from './components/BookingCard';
import Footer from './components/Footer';
import AIPlanner from './components/AIPlanner';
import { siteContent } from './config/siteContent';

const App: React.FC = () => {
  // CRITICAL: This purges any old browser data that might still have the "Enquire" spelling
  // saved from previous sessions. It runs once per deployment version.
  useEffect(() => {
    const PROD_VERSION = 'gem_v2_final_inquire';
    const hasPurged = localStorage.getItem(PROD_VERSION);
    if (!hasPurged) {
      localStorage.clear();
      localStorage.setItem(PROD_VERSION, 'true');
      console.log("GEM Events: Production Sync Successful.");
    }
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#c5a059]/30 selection:text-[#c5a059] bg-black">
      <Navbar logoUrl={siteContent.brand.logoUrl} />
      
      <main>
        <Hero content={siteContent.hero} />
        
        <section id="services" className="py-32 bg-black relative">
          <div className="container mx-auto px-6 text-center">
            <span className="text-[#c5a059] uppercase tracking-[0.4em] text-xs mb-6 block font-bold">
              {siteContent.philosophy.badge}
            </span>
            
            <h2 className="text-5xl md:text-7xl font-serif text-[#c5a059] mb-10 leading-tight">
              {siteContent.philosophy.title}
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-stone-400 font-light leading-relaxed">
                {siteContent.philosophy.mainText}
              </p>
            </div>
          </div>
        </section>

        <StickySection content={siteContent.stickySection} />
        <AIPlanner />
        <BookingCard content={siteContent.booking} />
      </main>

      <Footer logoUrl={siteContent.brand.logoUrl} content={siteContent.footer} />
    </div>
  );
};

export default App;
