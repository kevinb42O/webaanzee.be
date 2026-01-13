
import React, { useEffect, useState, useRef } from 'react';
import { IconLocation } from './Icons';

const About: React.FC = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Disable on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate parallax only when section is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const offset = (scrollProgress - 0.5) * 150; // Noticeable 150px max movement
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-navy text-white overflow-hidden" aria-labelledby="over-ons-heading">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Image with modern layered magazine aesthetic */}
          <div 
            className="relative"
          >
            {/* Offset backdrop layer */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5" />
            
            {/* Main image container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              <img 
                src="/studiofoto.png" 
                alt="Kevin B. - Uw Lokale Vakman" 
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
                className="relative w-full object-cover aspect-[4/5] contrast-[1.05] brightness-[1.05]"
                style={{
                  transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px) scale(1.25)`,
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div 
            className="space-y-8"
          >
            <div className="space-y-6">
              {/* Kicker - smaller, bold, wide tracking, gold */}
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Persoonlijke Aanpak</span>
              <h2 id="over-ons-heading" className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1]">
                Uw digitale partner
                <br />
                <span className="text-white/70">aan de kust.</span>
              </h2>
            </div>
            
            {/* Body text - light gray with relaxed line height */}
            <div className="space-y-6 leading-relaxed text-lg md:text-xl text-slate-300">
              <p>
                Geen onpersoonlijk agentschap, maar een vakman uit de buurt. Ik spreek uw taal, ken de regio en sta altijd klaar voor een koffie en een goed gesprek.
              </p>
              <p>
                Als webdesigner met oog voor beeld en presentatie weet ik hoe uw zaak vertrouwen uitstraalt. Ik maak een website die niet alleen mooi is, maar ook klanten oplevert.
              </p>
            </div>

            {/* Quote Block - Editorial Centerpiece */}
            <blockquote className="relative bg-slate-800/50 rounded-lg p-6 overflow-hidden">
              {/* Large watermark quote icon */}
              <span className="absolute -top-4 -left-2 text-[120px] font-serif text-slate-700/30 leading-none select-none pointer-events-none">"</span>
              <p className="relative z-10 font-serif text-amber-500 text-xl md:text-2xl italic">
                "Snelle service, eerlijke afspraken. Geen woorden maar daden."
              </p>
            </blockquote>

            <p className="text-lg text-slate-300 leading-relaxed">
              Geen uurtje-factuurtje of technisch jargon. Gewoon een goede website voor een eerlijke prijs, volledig ontzorgd.
            </p>

            {/* Trust Signals - Horizontal aligned */}
            <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-10">
              {/* 5-Star Service */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-white">5-Sterren Service</p>
                  <p className="text-sm text-slate-400">Persoonlijke aanpak</p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-4">
                <IconLocation className="w-6 h-6 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Altijd dichtbij</p>
                  <p className="text-sm text-slate-400">Regio Kust &amp; Brugge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
