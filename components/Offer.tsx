
import React from 'react';
import { IconCheck, IconPlus } from './Icons';

const Offer: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative">

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-navy">Eerlijke tarieven. Geen verrassingen.</h2>
          <p className="text-navy/60 max-w-xl mx-auto">Vakmanschap tegen een transparante prijs, speciaal ontworpen voor lokale zelfstandigen.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* Onepage Package */}
          <div className="bg-white border-4 border-navy rounded-3xl overflow-visible shadow-2xl relative mt-5 flex flex-col h-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max inline-flex items-center px-4 py-1.5 rounded-full bg-gold text-navy text-xs font-bold uppercase tracking-widest shadow-md z-10">
              Meest gekozen
            </div>

            <div className="p-8 pt-10">
              <h3 className="text-xl font-serif font-bold text-navy mb-2">Het "Kust-Pakket"</h3>
              <p className="text-navy/60 text-sm mb-6">Ideaal voor de kleine zaak die snel online wil staan.</p>
              
              <div className="mb-10">
                <span className="text-lg text-navy/40 font-semibold mr-1">Vanaf</span>
                <span className="text-5xl font-serif font-bold text-navy align-baseline">€450</span>
                <span className="text-navy/50 font-semibold ml-2 text-sm">eenmalig</span>
              </div>

              <ul className="space-y-4 mb-10 text-sm">
                {[
                  { title: "Website op één pagina", desc: "Professioneel en overzichtelijk", icon: "laptop" },
                  { title: "Mobiel-vriendelijk", desc: "Perfect op iPhone en Android", icon: "mobile-alt" },
                  { title: "Vindbaar op Google", desc: "Basis SEO (structuur + teksten)", icon: "map-marker-alt" },
                  { title: "Eigen Domeinnaam", desc: "Uw eigen .be adres", icon: "globe" },
                  { title: "Basis beeld-setup", desc: "We zorgen dat alles er netjes uitziet", icon : "camera" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <IconCheck className="text-gold mt-1" />
                    <div>
                      <span className="font-bold text-navy">{item.title}</span>
                      <p className="text-navy/50 text-xs">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-100 mb-8">
                <p className="text-center text-xs font-medium text-navy/70 leading-relaxed bg-slate-50 p-3 rounded-lg">
                  <span className="font-bold text-navy">Hosting &amp; Support: €50/maand</span>
                  <span className="text-navy/60"> — Hosting, beveiliging en kleine updates (max. 3 per maand).</span>
                </p>
              </div>

              <a 
                href="#contact" 
                className="block w-full text-center bg-navy hover:bg-navy-light text-white font-bold py-4 rounded-xl transition-all shadow-lg"
              >
                Start Kust-Pakket
              </a>
            </div>
          </div>

          {/* Business Package */}
          <div className="bg-white border-4 border-slate-300 hover:border-navy rounded-3xl overflow-hidden shadow-2xl p-8 flex flex-col h-full transition-all mt-5">
            <h3 className="text-xl font-serif font-bold text-navy mb-2">Groei-Pakket</h3>
            <p className="text-navy/60 text-sm mb-6">Voor de zaak met meerdere diensten, info of een aanbod dat vaak verandert.</p>
            
            <div className="mb-10">
              <span className="text-lg text-navy/40 font-semibold mr-1">Vanaf</span>
              <span className="text-5xl font-serif font-bold text-navy align-baseline">€950</span>
              <span className="text-navy/50 font-semibold ml-2 text-sm">eenmalig</span>
            </div>

            <ul className="space-y-4 mb-auto text-sm">
              {[
                { title: "Meerdere pagina's", desc: "Home, Over Ons, Menu/Service, Contact" },
                { title: "Uitgebreide beeldstrategie", desc: "Met uw eigen foto's en zorgvuldig geselecteerde beelden" },
                { title: "Meertaligheid", desc: "Optioneel NL / FR / EN voor toerisme" },
                { title: "Online reservaties", desc: "Koppel uw huidig systeem" },
                { title: "Beter gevonden op Google", desc: "Basis SEO + technische opbouw" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <IconCheck className="text-gold mt-1" />
                  <div>
                    <span className="font-bold text-navy">{item.title}</span>
                    <p className="text-navy/50 text-xs">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <a 
                href="#contact" 
                className="block w-full text-center bg-navy hover:bg-navy-light text-white font-bold py-4 rounded-xl transition-all shadow-lg"
              >
                Start Groei-Pakket
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
