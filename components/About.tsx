
import React from 'react';
import { IconLocation } from './Icons';

const About: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
            <img 
              src="/studiofoto.png" 
              alt="Kevin B. - Uw Lokale Vakman" 
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
              className="relative z-10 w-full object-cover aspect-[4/5]"
            />
          </div>

          <div className="space-y-8 text-[#cbd5e1]">
            <div className="space-y-4">
              <span className="text-gold font-bold uppercase tracking-[2px] text-sm">Persoonlijke Aanpak</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">
                Uw digitale partner
                <br className="hidden md:block" />
                aan de kust.
              </h2>
            </div>
            
            <div className="space-y-6 leading-relaxed text-lg">
              <p>
                Geen onpersoonlijk agentschap, maar een vakman uit de buurt. Ik spreek uw taal, ken de regio en sta altijd klaar voor een koffie en een goed gesprek.
              </p>
              <p>
                Als webdesigner met oog voor beeld en presentatie weet ik hoe uw zaak vertrouwen uitstraalt. Ik maak een website die niet alleen mooi is, maar ook klanten oplevert.
              </p>
              <p className="font-serif text-gold text-2xl">
                Snelle service, harde afspraken. Geen woorden maar daden.
              </p>
              <p>
                Geen uurtje-factuurtje of technisch jargon. Gewoon een goede website voor een eerlijke prijs, volledig ontzorgd.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-2 gap-8">
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row items-center">
                  <span className="text-gold text-xl leading-none" aria-hidden="true">★★★★★</span>
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold text-white">5-Sterren Service</p>
                  <p className="mt-1 text-sm text-white/60">Persoonlijke aanpak</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row items-center">
                  <IconLocation className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold text-white">Altijd dichtbij</p>
                  <p className="mt-1 text-sm text-white/60">Regio Kust &amp; Brugge</p>
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
