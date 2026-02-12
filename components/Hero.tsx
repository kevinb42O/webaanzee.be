
import React from 'react';
import { IconCheck } from './Icons';
import selfieNoBackground from '../selfieNObackgroundV3.png';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-32 sm:pb-36 md:pb-44 lg:pb-48 bg-coast overflow-hidden">
      {/* Mesh gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/50 via-transparent to-purple-900/20 pointer-events-none z-[2]"></div>
      <div className="absolute inset-0 bg-navy/30 pointer-events-none z-[2]"></div>
      
      {/* Radial glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none z-[2]"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none z-[2]"></div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24">
        
        {/* Left Content */}
        <div className="text-white max-w-2xl text-center md:text-left">
          
          {/* Eyebrow Tag - Premium */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-glow"></span>
            Binnen 7 dagen live
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-[1.08] tracking-[-0.02em] mb-6 md:mb-8">
            Meer klanten{' '}
            <br className="hidden sm:block" />
            via <span className="inline-flex tracking-[-0.02em]"><span style={{color:'#4285F4'}}>G</span><span style={{color:'#EA4335'}}>o</span><span style={{color:'#FBBC05'}}>o</span><span style={{color:'#4285F4'}}>g</span><span style={{color:'#34A853'}}>l</span><span style={{color:'#EA4335'}}>e</span></span>.
            <br />
            <span className="relative inline-block mt-1 md:mt-2">
              Binnen een week.
              <span className="absolute -bottom-1.5 md:-bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400/80 via-amber-500/60 to-transparent rounded-full"></span>
            </span>
          </h1>

          {/* Single supporting paragraph */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/60 leading-relaxed max-w-xl mx-auto md:mx-0 mb-10 md:mb-12">
            Geen standaard websites, maar digitale magneten. Dezelfde strategie die Hondaanzee.be in 12 dagen naar{' '}
            <span className="text-white/90 font-medium">#1 in Google</span> bracht, pas ik toe op uw zaak.
          </p>

          {/* CTA Buttons */}
          <div className="px-4 md:px-0 w-full md:w-auto mb-4 md:mb-5">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center md:justify-start">
              <a 
                href="#contact" 
                className="btn-primary w-full sm:w-auto text-center"
              >
                Gratis kennismakingsgesprek
              </a>
              <a 
                href="#werkwijze" 
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Mijn werkwijze
              </a>
            </div>
          </div>

          {/* Social Proof Link */}
          <p className="text-white/40 text-sm md:text-base mb-10 md:mb-12 px-4 md:px-0">
            Of bekijk eerst{' '}
            <a href="#resultaten" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 decoration-amber-400/40 transition-colors font-medium">
              mijn laatste resultaat: 13.700 bezoekers in 12 dagen
            </a>{' '}
            ↓
          </p>

          {/* Trust Indicators - Elevated */}
          <div className="inline-flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
            {[
              'Regio Kust & Brugge',
              'Transparante prijzen',
              '7 dagen levertijd'
            ].map((text, i) => (
              <span key={i} className="flex items-center gap-2.5 text-white/60 text-xs md:text-sm font-medium">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <IconCheck className="text-amber-400 w-3 h-3" />
                </span>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side - Portrait with Premium Framing */}
        <div className="relative mt-8 md:mt-0 flex justify-center">
          {/* Subtle glow behind portrait */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-amber-500/[0.08] rounded-full blur-[80px]"></div>
          </div>
          
          {/* Decorative ring */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div className="w-56 sm:w-64 md:w-[340px] lg:w-[380px] aspect-square rounded-full border border-white/[0.06]"></div>
          </div>
          
          <div className="relative w-64 sm:w-72 md:w-[400px] lg:w-[440px] max-w-[460px] overflow-visible flex items-end justify-center">
            <img 
              src={selfieNoBackground}
              alt="Kevin van Webaanzee, webdesigner" 
              decoding="async"
              width="800"
              height="600"
              className="w-full h-auto object-contain relative z-10"
              style={{
                filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute -bottom-[1px] left-0 w-full z-[11] pointer-events-none leading-[0]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[50px] sm:h-[70px] md:h-[100px] lg:h-[120px]">
          <path d="M0,40 C240,90 480,5 720,40 C960,85 1200,10 1440,50 L1440,100 L0,100 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
