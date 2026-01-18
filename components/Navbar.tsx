
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  logoUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="block transition-transform hover:scale-105 duration-500">
            <Logo src={logoUrl} className={isScrolled ? "h-16 md:h-20" : "h-24 md:h-32"} />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-12 text-[11px] font-bold tracking-[0.4em] uppercase text-stone-300">
          <a href="#services" className="hover:text-[#c5a059] transition-colors">Experience</a>
          <a href="#itinerary" className="hover:text-[#c5a059] transition-colors">Journeys</a>
          <a href="#booking" className="hover:text-[#c5a059] transition-colors">Concierge</a>
          <button className="px-10 py-3 bg-gradient-to-r from-[#c5a059]/10 to-[#8d6e35]/20 border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-500 font-bold tracking-[0.2em]">
            INQUIRE
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/98 border-t border-stone-800 p-12 flex flex-col gap-8 text-center animate-fadeIn shadow-2xl">
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-[#c5a059] tracking-widest uppercase">Experience</a>
          <a href="#itinerary" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-[#c5a059] tracking-widest uppercase">Journeys</a>
          <a href="#booking" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white tracking-widest uppercase">Concierge</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
