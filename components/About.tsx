
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gold/20 rounded-2xl transition-all group-hover:bg-gold/30"></div>
            {/* Studiofoto placeholder */}
            <img 
              src="/studiofoto.png" 
              alt="Kevin B. - Uw Lokale Vakman" 
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
              className="rounded-xl shadow-2xl relative z-10 w-full object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-8 right-8 bg-gold p-6 rounded-lg shadow-xl z-20 hidden md:block">
              <p className="text-navy font-serif font-bold text-2xl">Kevin B.</p>
              <p className="text-navy/70 text-sm font-bold uppercase tracking-tight">Uw Lokale Vakman</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-gold font-bold uppercase tracking-widest text-sm">Persoonlijke Aanpak</span>
              <h2 className="text-4xl md:text-5xl font-serif">Uw lokale partner.</h2>
            </div>
            
            <div className="space-y-6 text-white/80 leading-relaxed text-lg">
              <p>
                Ik ben Kevin Bourguignon. Geen eigenaar van een duur marketingbureau in Brussel, maar een vakman uit de buurt. Ik spreek uw taal en ken de lokale markt.
              </p>
              <p>
                Als webdesigner met oog voor beeld en presentatie weet ik hoe uw zaak vertrouwen uitstraalt. Ik maak een website die niet alleen mooi is, maar ook klanten oplevert.
              </p>
              <p className="font-serif italic text-gold text-2xl">
                "Ik geloof in snelle service en afspraken nakomen. Geen woorden maar daden."
              </p>
              <p>
                Geen uurtje-factuurtje gedoe of technisch jargon. Gewoon een goede website voor een eerlijke prijs, volledig ontzorgd.
              </p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-serif font-bold text-gold">5-Sterren</p>
                <p className="text-sm text-white/50 uppercase tracking-widest">Service & Aanpak</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gold">Lokaal</p>
                <p className="text-sm text-white/50 uppercase tracking-widest">Altijd dichtbij</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
