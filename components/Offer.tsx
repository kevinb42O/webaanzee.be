
import React from 'react';
import { IconCheck, IconShield } from './Icons';

const Offer: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative">

        <div className="text-center mb-16 space-y-4">
          <h2 id="prijzen-heading" className="text-3xl md:text-5xl font-serif text-navy">Eerlijke tarieven. Geen verrassingen.</h2>
          <p className="text-navy/60 max-w-xl mx-auto">Vakmanschap tegen een transparante prijs, speciaal ontworpen voor lokale zelfstandigen.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Onepage Package */}
          <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-amber-400/50 flex flex-col h-full overflow-hidden">
            <div className="p-8 flex flex-col flex-1">
              {/* Badge inside card */}
              <span className="bg-amber-100 text-amber-800 text-xs font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-4 inline-block w-fit">
                Meest gekozen
              </span>

              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Het "Kust-Pakket"</h3>
              <p className="text-slate-500 text-sm mb-6">Ideaal voor de kleine zaak die snel online wil staan.</p>
              
              <div className="mb-10 flex items-baseline justify-center gap-1">
                <span className="text-base text-slate-400 font-medium mr-1">Vanaf</span>
                <span className="text-xl text-slate-500 font-medium">€</span>
                <span className="text-5xl font-serif text-slate-900">450</span>
                <span className="text-slate-500 font-sans ml-1">eenmalig</span>
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  { title: "Website op één pagina", desc: "Professioneel en overzichtelijk" },
                  { title: "Mobiel-vriendelijk", desc: "Perfect op iPhone en Android" },
                  { title: "Vindbaar op Google", desc: "Basis SEO (structuur + teksten)" },
                  { title: "Eigen Domeinnaam", desc: "Uw eigen .be adres" },
                  { title: "Basis beeld-setup", desc: "We zorgen dat alles er netjes uitziet" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <IconCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">{item.title}</span>
                      <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hosting section with subtle background */}
            <div className="mt-auto bg-slate-50 px-8 py-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <IconShield className="w-5 h-5 text-amber-500" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">€50/maand</span>
                  <span className="mx-1">—</span>
                  <span>Premium hosting &amp; onderhoud</span>
                </p>
              </div>

              <a 
                href="#contact" 
                className="block w-full text-center font-semibold text-lg py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-slate-900 hover:from-amber-200 hover:via-amber-300 hover:to-amber-400"
              >
                Start Kust-Pakket
              </a>
            </div>
          </div>

          {/* Business Package */}
          <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-slate-200 flex flex-col h-full overflow-hidden">
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 mt-8">Groei-Pakket</h3>
              <p className="text-slate-500 text-sm mb-6">Voor de zaak met meerdere diensten, info of een aanbod dat vaak verandert.</p>
              
              <div className="mb-10 flex items-baseline justify-center gap-1">
                <span className="text-base text-slate-400 font-medium mr-1">Vanaf</span>
                <span className="text-xl text-slate-500 font-medium">€</span>
                <span className="text-5xl font-serif text-slate-900">950</span>
                <span className="text-slate-500 font-sans ml-1">eenmalig</span>
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  { title: "Meerdere pagina's", desc: "Home, Over Ons, Menu/Service, Contact" },
                  { title: "Uitgebreide beeldstrategie", desc: "Met uw eigen foto's en zorgvuldig geselecteerde beelden" },
                  { title: "Meertaligheid", desc: "Optioneel NL / FR / EN voor toerisme" },
                  { title: "Online reservaties", desc: "Koppel uw huidig systeem" },
                  { title: "Beter gevonden op Google", desc: "Basis SEO + technische opbouw" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <IconCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">{item.title}</span>
                      <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hosting section with subtle background */}
            <div className="mt-auto bg-slate-50 px-8 py-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <IconShield className="w-5 h-5 text-amber-500" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">€50/maand</span>
                  <span className="mx-1">—</span>
                  <span>Premium hosting &amp; onderhoud</span>
                </p>
              </div>

              <a 
                href="#contact" 
                className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold text-lg py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
