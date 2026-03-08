
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { scrollToSection } from '../utils/scrollToSection';

const ChevronDown: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [meerOpen, setMeerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const meerRef = useRef<HTMLDivElement>(null);
  const meerTimeout = useRef<ReturnType<typeof setTimeout>>();

  const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      scrollToSection(e, id);
      setMobileMenuOpen(false);
      setMeerOpen(false);
    } else {
      // Section doesn't exist on this page — navigate to homepage with hash
      e.preventDefault();
      window.location.href = `/#${id}`;
    }
  };

  // Track scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active section (homepage only)
  useEffect(() => {
    if (!isHome) return;
    const ids = ['werkwijze', 'resultaten', 'prijzen', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close everything on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMeerOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (meerRef.current && !meerRef.current.contains(e.target as Node)) {
        setMeerOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Hover intent for dropdown (desktop)
  const openMeer = useCallback(() => {
    clearTimeout(meerTimeout.current);
    setMeerOpen(true);
  }, []);

  const closeMeerDelayed = useCallback(() => {
    meerTimeout.current = setTimeout(() => setMeerOpen(false), 200);
  }, []);

  const primaryNav = [
    { id: 'werkwijze', label: 'Werkwijze' },
    { id: 'resultaten', label: 'Resultaten' },
    { id: 'prijzen', label: 'Prijzen' },
  ];

  const meerSections = [
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
  ];

  const meerLinks = [
    { href: '/blog/waarom-website-nodig-2026.html', label: 'Blog' },
    { href: '/klantenkaart.html', label: 'Klantenkaart', highlight: true },
  ];

  // Is any "meer" section active?
  const meerActive = isHome && ['contact', 'faq'].includes(activeSection);

  // Build correct href for section links (homepage anchor vs cross-page nav)
  const sectionHref = (id: string) => isHome ? `#${id}` : `/#${id}`;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out
          ${scrolled ? 'pt-2 px-3 sm:px-4' : 'pt-3 px-4 sm:px-6'}`}
      >
        <div
          className={`glass-pill relative flex items-center justify-between w-full max-w-5xl
            transition-all duration-500 ease-out
            ${scrolled
              ? 'px-4 sm:px-5 py-2.5 shadow-pill-scrolled'
              : 'px-5 sm:px-6 py-3 shadow-pill'
            }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 lg:gap-3 text-lg lg:text-xl font-serif font-bold shrink-0 z-10">
            <img
              src="/logo.webp"
              alt="Webaanzee"
              width="36"
              height="36"
              decoding="async"
              className="w-7 h-7 lg:w-9 lg:h-9 object-contain"
            />
            <span>
              <span className="text-white">Web</span>
              <span className="text-gold">aan</span>
              <span className="text-white">zee</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
            {primaryNav.map(({ id, label }) => (
              <a
                key={id}
                href={sectionHref(id)}
                onClick={(e) => handleNav(e, id)}
                className={`relative px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer
                  ${activeSection === id
                    ? 'text-white bg-white/[0.12]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
              >
                {label}
              </a>
            ))}

            {/* "Meer" dropdown */}
            <div
              ref={meerRef}
              className="relative"
              onMouseEnter={openMeer}
              onMouseLeave={closeMeerDelayed}
            >
              <button
                type="button"
                onClick={() => setMeerOpen((v) => !v)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer
                  ${meerActive || meerOpen
                    ? 'text-white bg-white/[0.12]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                aria-expanded={meerOpen}
                aria-haspopup="true"
              >
                Meer
                <ChevronDown className={`transition-transform duration-300 ${meerOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full right-0 mt-2.5 glass-dropdown min-w-[180px] transition-all duration-300 ease-out origin-top-right
                  ${meerOpen
                    ? 'opacity-100 scale-100 translate-y-0 visible'
                    : 'opacity-0 scale-95 -translate-y-1 invisible pointer-events-none'
                  }`}
              >
                <div className="p-1.5">
                  {meerSections.map(({ id, label }) => (
                    <a
                      key={id}
                      href={sectionHref(id)}
                      onClick={(e) => handleNav(e, id)}
                      className={`block px-3.5 py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer
                        ${activeSection === id
                          ? 'text-white bg-white/[0.1]'
                          : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                        }`}
                    >
                      {label}
                    </a>
                  ))}
                  {meerLinks.map(({ href, label, highlight }) => (
                    <a
                      key={href}
                      href={href}
                      className={`block px-3.5 py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200
                        ${highlight
                          ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-400/[0.08]'
                          : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {label}
                        {highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        )}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2 shrink-0 z-10">
            <a
              href={sectionHref('seo-analyse')}
              onClick={(e) => handleNav(e, 'seo-analyse')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              SEO-analyse
            </a>

            {/* Hamburger / Close */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.14] transition-all duration-300"
              aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-[18px] h-[14px] relative flex flex-col justify-between">
                <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500
          ${mobileMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-500
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setMobileMenuOpen(false); }}
          role="button"
          tabIndex={-1}
          aria-label="Menu sluiten"
        />

        {/* Menu Panel */}
        <nav
          className={`absolute top-16 left-3 right-3 sm:left-4 sm:right-4 glass-pill-mobile p-5 transition-all duration-500 ease-out
            ${mobileMenuOpen
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-4 scale-[0.97]'
            }`}
          style={{ maxHeight: 'calc(100vh - 5rem)', overflowY: 'auto' }}
        >
          <div className="flex flex-col gap-0.5">
            {/* Primary navigation */}
            <div className="px-3 pt-1 pb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Navigatie</span>
            </div>
            {primaryNav.map(({ id, label }) => (
              <a
                key={id}
                href={sectionHref(id)}
                onClick={(e) => handleNav(e, id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${activeSection === id
                    ? 'text-white bg-white/[0.1]'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
              >
                {label}
              </a>
            ))}

            <div className="h-px bg-white/[0.06] my-2 mx-3" />

            {/* Secondary items */}
            <div className="px-3 pt-1 pb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Meer</span>
            </div>
            {meerSections.map(({ id, label }) => (
              <a
                key={id}
                href={sectionHref(id)}
                onClick={(e) => handleNav(e, id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${activeSection === id
                    ? 'text-white bg-white/[0.1]'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
              >
                {label}
              </a>
            ))}
            {meerLinks.map(({ href, label, highlight }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${highlight
                    ? 'text-amber-400 hover:bg-amber-400/[0.08]'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
              >
                {label}
                {highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                )}
              </a>
            ))}

            <div className="h-px bg-white/[0.06] my-2 mx-3" />

            {/* CTA */}
            <a
              href={sectionHref('seo-analyse')}
              onClick={(e) => handleNav(e, 'seo-analyse')}
              className="mx-1 mt-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-500/[0.08] hover:bg-emerald-500/[0.14] transition-all duration-200 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Gratis SEO-analyse
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
