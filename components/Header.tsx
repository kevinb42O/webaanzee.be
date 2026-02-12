
import React, { useState } from 'react';
import { IconPhone } from './Icons';
import { scrollToSection } from '../utils/scrollToSection';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    scrollToSection(e, id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 px-6 py-3 md:py-4 glass-header text-white transition-all duration-300"
    >
      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 md:gap-4 text-xl md:text-3xl font-serif font-bold">
            <img
              src="/logo_zondertekst_zonderachtergrond.png"
              alt="Webaanzee"
              width="44"
              height="44"
              decoding="async"
              className="w-8 h-8 md:h-11 md:w-11 object-contain"
            />
            <span>
              <span className="text-white">Web</span>
              <span className="text-gold">aan</span>
              <span className="text-white">zee</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center space-x-6 text-[11px] lg:text-xs font-medium uppercase tracking-[0.2em]">
            <a href="/" onClick={(e) => handleNav(e, 'werkwijze')} className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Werkwijze</a>
            <a href="/" onClick={(e) => handleNav(e, 'resultaten')} className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Resultaten</a>
            <a href="/" onClick={(e) => handleNav(e, 'prijzen')} className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Prijzen</a>
            <a href="/" onClick={(e) => handleNav(e, 'faq')} className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">FAQ</a>
            <a href="/" onClick={(e) => handleNav(e, 'contact')} className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Contact</a>
          </nav>

          {/* CTA Button - Always visible */}
          <div className="flex items-center gap-2">
            <a 
              href="tel:0494816714" 
              className="btn-primary !px-3 !py-1.5 lg:!px-5 lg:!py-2 !text-xs lg:!text-sm flex items-center space-x-1.5 lg:space-x-2 whitespace-nowrap"
            >
              <IconPhone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Bel me</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 -mr-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <a href="/" onClick={(e) => handleNav(e, 'werkwijze')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Werkwijze</a>
              <a href="/" onClick={(e) => handleNav(e, 'resultaten')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Resultaten</a>
              <a href="/" onClick={(e) => handleNav(e, 'prijzen')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Prijzen</a>
              <a href="/" onClick={(e) => handleNav(e, 'faq')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">FAQ</a>
              <a href="/" onClick={(e) => handleNav(e, 'contact')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Contact</a>
              <a 
                href="tel:0494816714" 
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-gold font-semibold mt-2"
              >
                <IconPhone className="w-4 h-4" />
                Bel 0494 81 67 14
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
