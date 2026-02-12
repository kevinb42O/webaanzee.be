
import React, { useEffect, useState, useRef } from 'react';
import { IconLocation, StarRating } from './Icons';

const About: React.FC = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const offset = (scrollProgress - 0.5) * 150;
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 px-6 bg-navy text-white overflow-hidden" aria-labelledby="over-ons-heading">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Radial light accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with modern layered magazine aesthetic */}
          <div className="relative">
            {/* Offset backdrop layer */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5" />
            
            {/* Gradient edge glow */}
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-amber-500/20 via-transparent to-transparent pointer-events-none z-10"></div>
            
            {/* Main image container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              <img 
                src="/studiofoto.png" 
                alt="Kevin Bourguignon, webdesigner bij Webaanzee, in zijn studio in Blankenberge" 
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
                className="relative w-full object-cover aspect-[4/5] contrast-[1.05] brightness-[1.05]"
                style={{
                  transform: prefersReducedMotion ? 'none' : `translateY(${parallaxOffset}px) scale(1.08)`,
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Kicker */}
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500">Persoonlijke Aanpak</span>
              <h2 id="over-ons-heading" className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.08] tracking-[-0.02em]">
                Eén aanspreekpunt.
                <br />
                <span className="text-white/50">Geen agentschap.</span>
              </h2>
            </div>
            
            {/* Body text */}
            <div className="space-y-6 leading-relaxed text-lg md:text-xl text-slate-300">
              <p>
                Geen onpersoonlijk agentschap, maar een vakman uit de buurt. Ik spreek uw taal, ken de regio en sta altijd klaar voor een koffie en een goed gesprek.
              </p>
              <p>
                Als webdesigner met oog voor beeld en presentatie weet ik hoe uw zaak vertrouwen uitstraalt. Ik maak een website die niet alleen mooi is, maar ook klanten oplevert.
              </p>
            </div>

            {/* Quote Block - Premium */}
            <blockquote className="relative rounded-xl p-6 overflow-hidden border border-white/[0.06]" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%)' }}>
              {/* Gold accent line left */}
              <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600"></div>
              {/* Large watermark quote icon */}
              <span className="absolute -top-4 -left-2 text-[80px] font-serif text-slate-700/15 leading-none select-none pointer-events-none">"</span>
              <p className="relative z-10 pl-4 font-serif text-amber-400/90 text-xl md:text-2xl italic leading-relaxed">
                "Kevin nam alles uit handen. We zien nu wekelijks nieuwe gezichten in de winkel."
              </p>
              <footer className="relative z-10 pl-4 mt-3 text-sm text-white/40">
                — Olivier &amp; Kelly, Vishandel Blankenberge
              </footer>
            </blockquote>

            <p className="text-lg text-slate-400 leading-relaxed">
              Geen uurtje-factuurtje of technisch jargon. Gewoon een goede website voor een eerlijke prijs, met iemand die u kan bellen.
            </p>

            {/* Trust Signals */}
            <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-10">
              {/* 5-Star Service */}
              <div className="flex items-center gap-4">
                <StarRating rating={5} size="w-5 h-5" />
                <div>
                  <p className="font-bold text-white text-sm">5-Sterren Service</p>
                  <p className="text-xs text-slate-500">Persoonlijke aanpak</p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-4">
                <IconLocation className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white text-sm">Altijd dichtbij</p>
                  <p className="text-xs text-slate-500">Regio Kust &amp; Brugge</p>
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
