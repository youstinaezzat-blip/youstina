import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  logoUrl: string;
  onNavigate?: (view: 'home' | 'experience') => void;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExperienceClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('experience');
      window.location.hash = 'experience';
      setIsMobileMenuOpen(false);
      window.scrollTo(0, 0);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('home');
      window.location.hash = '';
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-700 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" onClick={handleHomeClick} className="block transition-transform hover:scale-105 duration-500">
            <Logo src={logoUrl} className={isScrolled ? "h-16 md:h-20" : "h-24 md:h-32"} />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-12 text-[11px] font-bold tracking-[0.4em] uppercase text-stone-300">
          <a href="#experience" onClick={handleExperienceClick} className="hover:text-[#c5a059] transition-colors cursor-pointer">Experience</a>
          <a href="#itinerary" className="hover:text-[#c5a059] transition-colors">Journeys</a>
          <a href="#booking" className="hover:text-[#c5a059] transition-colors">Concierge</a>
          <button className="px-10 py-3 bg-gradient-to-r from-[#c5a059]/10 to-[#8d6e35]/20 border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-500 font-bold tracking-[0.2em]">
            INQUIRE
          </button>
        </div>

        <button className="md:hidden text-white p-2 z-[70]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} className="text-[#c5a059]" /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-stone-950 z-[65] flex flex-col items-center justify-center gap-10 animate-fadeIn">
          <a href="#experience" onClick={handleExperienceClick} className="text-3xl font-serif text-[#c5a059] tracking-[0.2em] uppercase transition-all hover:scale-110">Experience</a>
          <a href="#itinerary" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-[#c5a059] tracking-[0.2em] uppercase transition-all hover:scale-110">Journeys</a>
          <a href="#booking" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white tracking-[0.2em] uppercase transition-all hover:scale-110">Concierge</a>
          
          <div className="mt-10">
            <Logo src={logoUrl} className="h-24 opacity-30 grayscale" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;