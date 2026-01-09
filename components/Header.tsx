
import React, { useState, useEffect } from 'react';
import { IconPhone } from './Icons';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isHome = window.location.pathname === '/';
      setIsScrolled(!isHome || window.scrollY > 50);
    };

    // Initial state based on current page & scroll
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnnouncementClick = () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {showAnnouncement && !isScrolled && (
          <div className="mb-3">
            <div className="relative flex items-center justify-center bg-[#334155] text-white text-[13px] md:text-sm py-2 px-3 rounded-md">
              <button
                type="button"
                onClick={handleAnnouncementClick}
                className="w-full text-center focus:outline-none"
              >
                <span>
                  🚀 Start 2026 sterk: Er zijn nog 2 plekken beschikbaar voor websites in januari.
                </span>{' '}
                <span className="underline underline-offset-4 decoration-gold font-semibold">
                  Reserveer uw plek →
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowAnnouncement(false)}
                className="absolute right-3 text-white/60 hover:text-white text-xs"
                aria-label="Sluit aankondiging"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <a href="/" className={`flex items-center gap-3 md:gap-4 text-2xl md:text-3xl font-serif font-bold ${isScrolled ? 'text-navy' : 'text-white'}`}>
            <img
              src="/logo_zondertekst_zonderachtergrond.png"
              alt="Web aan Zee"
              width="44"
              height="44"
              decoding="async"
              className="h-9 w-9 md:h-11 md:w-11 object-contain"
            />
            <span>
              Web <span className="text-gold">aan Zee</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
            <a href="/#werkwijze" className="hover:text-gold transition-colors">Werkwijze</a>
            <a href="/#resultaten" className="hover:text-gold transition-colors">Resultaten</a>
            <a href="/#prijzen" className="hover:text-gold transition-colors">Prijzen</a>
            <a href="/#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>

          <a 
            href="tel:0494816714" 
            className="bg-gold hover:bg-gold-dark text-navy px-6 py-2.5 rounded-md font-bold transition-all transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl shadow-lg flex items-center space-x-2"
          >
            <IconPhone className="w-5 h-5" />
            <span className="hidden sm:inline">Gratis kennismakingsgesprek</span>
            <span className="sm:hidden">Bel nu</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
