import React from 'react';
import { IconCheck } from './Icons';
import selfieNoBackground from '../selfieNObackgroundV3.png';
import SandDune from './SandDune';

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
          
          <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed md:leading-relaxed max-w-xl mb-8 md:mb-10">
            Een snelle, professionele website die lokaal gevonden wordt. Geen gedoe, geen verrassingen. Alles wat u nodig heeft, binnen 7 dagen online.
          </p>

          {/* Bullet points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-left text-white/90 font-medium mb-10 text-sm md:text-base">
            <div className="flex items-center gap-2.5">
              <IconCheck className="w-5 h-5 text-amber-400" />
              <span>Binnen 7 dagen online</span>
            </div>
            <div className="flex items-center gap-2.5">
              <IconCheck className="w-5 h-5 text-amber-400" />
              <span>Lokaal vindbaar in Google</span>
            </div>
            <div className="flex items-center gap-2.5">
              <IconCheck className="w-5 h-5 text-amber-400" />
              <span>Simpel en snel contact</span>
            </div>
            <div className="flex items-center gap-2.5">
              <IconCheck className="w-5 h-5 text-amber-400" />
              <span>Perfect op elk apparaat</span>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href="#contact" 
            className="inline-block bg-amber-500 text-slate-900 font-bold tracking-wide px-8 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-400/30 transform hover:-translate-y-1"
          >
            Start hier uw project
          </a>
        </div>

        {/* Right Image */}
        <div className="hidden md:block flex-shrink-0">
          <img 
            src={selfieNoBackground}
            alt="Kevin Bourguignon, webdesigner bij Webaanzee" 
            width={400} 
            height={400} 
            className="w-80 h-80 lg:w-[400px] lg:h-[400px] object-contain"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <SandDune />
      </div>
    </section>
  );
};

export default Hero;
