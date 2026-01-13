
import React from 'react';
import { IconCheck } from './Icons';
import selfieNoBackground from '../selfieNObackgroundV3.png';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-16 md:pb-20 bg-coast overflow-hidden">
      {/* Mesh gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/50 via-transparent to-purple-900/20 pointer-events-none z-[2]"></div>
      <div className="absolute inset-0 bg-navy/30 pointer-events-none z-[2]"></div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24">
        
        {/* Left Content */}
        <div className="text-white max-w-2xl text-center md:text-left">
          
          {/* Eyebrow Tag */}
          <p className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white/90 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Website + Google in 7 dagen
          </p>

          {/* Main Headline with Serif Font */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold leading-tight md:leading-[1.1] tracking-tight mb-4 md:mb-6 px-2 md:px-0">
            Uw zaak professioneel online.
          </h1>
          
          {/* Elegant Script Subline */}
          <p className="text-elegant text-xl sm:text-2xl md:text-4xl text-gold-gradient mb-8 md:mb-12">
            Zonder gedoe.
          </p>

          {/* Value Proposition */}
          <p className="text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium tracking-wide mb-3 md:mb-4 px-2 md:px-0">
            Website + beter gevonden op Google.<br />
            <span className="text-gold-gradient font-semibold">Ik regel alles.</span>
          </p>
          
          <p className="text-white/60 leading-relaxed text-sm md:text-lg mb-8 md:mb-10 max-w-lg mx-auto md:mx-0 px-2 md:px-0">
            U hoeft niks technisch te kennen. Ik leg het uit zoals het is.
          </p>

          {/* CTA Buttons */}
          <div className="px-4 md:px-0 w-full md:w-auto mb-8 md:mb-10">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center md:justify-start">
              <a 
                href="#contact" 
                className="btn-primary btn-sheen w-full sm:w-auto text-center"
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

          {/* Trust Indicators */}
          <div className="text-white/70">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2.5 text-xs md:text-sm font-medium">
              <span className="flex items-center gap-2">
                <IconCheck className="text-gold w-4 h-4" />
                Regio Kust & Brugge
              </span>
              <span className="flex items-center gap-2">
                <IconCheck className="text-gold w-4 h-4" />
                Snel bereikbaar
              </span>
              <span className="flex items-center gap-2">
                <IconCheck className="text-gold w-4 h-4" />
                Heldere uitleg
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Portrait with Premium Effects */}
        <div className="relative mt-8 md:mt-0 flex justify-center portrait-glow animate-levitate">
          {/* Ambient glow behind portrait */}
          <div className="absolute inset-0 -inset-x-16 -inset-y-16 bg-gradient-radial from-indigo-500/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none animate-glow-pulse"></div>
          
          <div className="relative w-64 sm:w-72 md:w-[400px] lg:w-[440px] max-w-[460px] overflow-visible flex items-end justify-center">
            {/* Gold ring glow effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-t from-gold/20 via-gold/5 to-transparent blur-2xl pointer-events-none animate-glow-pulse"></div>
            
            <img 
              src={selfieNoBackground}
              alt="Kevin van Webaanzee, webdesigner" 
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
              className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
