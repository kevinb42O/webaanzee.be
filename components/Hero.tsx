
import React from 'react';
import { IconCheck } from './Icons';
import selfieNoBackground from '../selfieNObackgroundV3.png';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 bg-coast overflow-hidden">
      <div className="absolute inset-0 bg-navy/40 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
        <div className="text-white space-y-6 max-w-2xl text-center md:text-left">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-gold/60 text-xs font-semibold tracking-[0.22em] uppercase text-white">
            Website + Google in 7 dagen
          </p>
          <h1 className="text-3xl md:text-6xl font-serif leading-tight">
            Uw zaak professioneel online. <br />
            <span className="text-gold italic font-normal text-2xl md:text-5xl">Zonder gedoe.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-bold tracking-wide">
            Website + beter gevonden op Google.<br />
            <span className="text-gold">Ik regel alles.</span>
          </p>
          <p className="text-white/80 leading-relaxed">
            U hoeft niks technisch te kennen. Ik leg het uit zoals het is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-center md:justify-start">
            <a 
              href="#contact" 
              className="btn-primary"
            >
              Gratis kennismakingsgesprek
            </a>
            <a 
              href="#werkwijze" 
              className="btn-secondary"
            >
              Mijn werkwijze
            </a>
          </div>
          <div className="pt-2 text-white/80">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-xs md:text-sm font-medium">
              <span className="flex items-center gap-2"><IconCheck className="text-gold" />Regio Kust & Brugge</span>
              <span className="flex items-center gap-2"><IconCheck className="text-gold" />Snel bereikbaar</span>
              <span className="flex items-center gap-2"><IconCheck className="text-gold" />Heldere uitleg</span>
            </div>
          </div>
        </div>

        <div className="relative mt-10 md:mt-0 flex justify-center">
          <div className="relative w-64 sm:w-72 md:w-[420px] lg:w-[460px] max-w-[480px] overflow-visible flex items-end justify-center">
            <img 
              src={selfieNoBackground}
              alt="Kevin van Web aan Zee, webdesigner" 
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
