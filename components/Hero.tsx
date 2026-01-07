
import React from 'react';
import { IconCheck } from './Icons';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 bg-coast overflow-hidden">
      <div className="absolute inset-0 bg-navy/40 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white space-y-6 max-w-2xl text-center md:text-left">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-[0.22em] uppercase text-white/80">
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
              className="bg-gold hover:bg-gold-dark text-navy text-center px-10 py-4 rounded-md font-bold text-lg transition-all shadow-xl w-full sm:w-auto"
            >
              Gratis kennismakingsgesprek
            </a>
            <a 
              href="#werkwijze" 
              className="border-2 border-white/80 hover:bg-white hover:text-navy text-white text-center px-10 py-4 rounded-md font-bold text-lg transition-all w-full sm:w-auto"
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
        
        <div className="hidden sm:block relative mt-10 md:mt-0">
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-2xl shadow-2xl rotate-3 transform hover:rotate-0 transition-all duration-500">
             <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
              alt="Website voorbeeld op tablet" 
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
              className="rounded-lg shadow-inner"
             />
             <div className="absolute -bottom-6 -left-6 bg-gold p-3 md:p-4 rounded-lg shadow-xl animate-bounce flex items-center gap-2">
               <IconCheck className="text-navy w-5 h-5" />
               <span className="text-navy text-xs font-semibold hidden md:inline">Binnen 7 dagen online</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
