
import React from 'react';
import { IconCheck, IconShield } from './Icons';
import { scrollToSection } from '../utils/scrollToSection';

const Offer: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-white overflow-hidden noise-overlay">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-50/60 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-100/80 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative">

        <div className="text-center mb-20 space-y-5">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">Transparante prijzen</span>
          <h2 id="prijzen-heading" className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy tracking-[-0.02em]">Eerlijke tarieven.<br className="hidden sm:block" /> Geen verrassingen.</h2>
          <p className="text-navy/50 max-w-xl mx-auto text-lg leading-relaxed">Vakmanschap tegen een transparante prijs, speciaal ontworpen voor lokale zelfstandigen.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Digitale Visitekaart */}
          <div className="relative bg-white rounded-3xl flex flex-col h-full overflow-hidden shadow-premium gradient-border group hover:shadow-premium-lg transition-all duration-500">
            <div className="p-8 md:p-10 flex flex-col flex-1">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 mt-6">Digitale Visitekaart</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Een stijlvolle online aanwezigheid met al uw contactgegevens op één plek.</p>
              
              <div className="mb-10 flex items-baseline justify-center gap-1">
                <span className="text-sm text-slate-400 font-medium mr-1">Vanaf</span>
                <span className="text-xl text-slate-400 font-medium">€</span>
                <span className="text-5xl font-serif font-bold text-slate-900 tracking-tight">250</span>
                <span className="text-slate-400 font-sans text-sm ml-1">eenmalig</span>
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  { title: "Eén pagina profiel", desc: "Al uw info op één plek" },
                  { title: "Contact & Socials", desc: "Deel uw gegevens en socials" },
                  { title: "QR-code", desc: "Eenvoudig delen via QR" },
                  { title: "Eigen Domeinnaam", desc: "Uw eigen .be adres" },
                  { title: "Supersnel & Mobiel", desc: "Perfect op elk apparaat" }
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

            {/* Hosting section */}
            <div className="mt-auto bg-slate-50/80 px-8 md:px-10 py-6 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 mb-4">
                <IconShield className="w-5 h-5 text-amber-500" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">€50/jaar</span>
                  <span className="mx-1.5 text-slate-300">—</span>
                  <span>Jaarlijkse hosting &amp; onderhoud</span>
                </p>
              </div>

              <a 
                href="/" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start mijn visitekaart
              </a>
            </div>
          </div>

          {/* Onepage Package - HERO CARD */}
          <div className="relative bg-white rounded-3xl flex flex-col h-full overflow-visible glow-border z-10 group">
            {/* Floating Premium Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-white text-[10px] font-bold tracking-[0.18em] uppercase py-2 px-5 rounded-full shadow-lg shadow-amber-500/30 whitespace-nowrap ring-4 ring-white">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                Meest gekozen
              </span>
            </div>

            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[150px] bg-amber-400/[0.08] rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="p-8 md:p-10 flex flex-col flex-1 relative">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 mt-6">Het "Kust-Pakket"</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Voor de zelfstandige die professioneel online wil staan.</p>
              
              <div className="mb-10 flex items-baseline justify-center gap-1">
                <span className="text-sm text-slate-400 font-medium mr-1">Vanaf</span>
                <span className="text-xl text-amber-600 font-medium">€</span>
                <span className="text-6xl font-serif font-bold text-slate-900 tracking-tight">450</span>
                <span className="text-slate-400 font-sans text-sm ml-1">eenmalig</span>
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  { title: "Website op één pagina", desc: "Professioneel en overzichtelijk" },
                  { title: "Mobiel-vriendelijk", desc: "Perfect op iPhone en Android" },
                  { title: "Google-proof fundament", desc: "Technische SEO-basis: snelheid, structuur & meta-tags" },
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

            {/* Hosting section */}
            <div className="mt-auto bg-amber-50/50 px-8 md:px-10 py-6 border-t border-amber-100/50">
              <div className="flex items-center justify-center gap-2 mb-4">
                <IconShield className="w-5 h-5 text-amber-500" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">€20/maand</span>
                  <span className="mx-1.5 text-slate-300">—</span>
                  <span>Hosting, updates &amp; 100/100 Google-score behouden</span>
                </p>
              </div>

              <a 
                href="/" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                Kies het Kust-Pakket
              </a>
            </div>
          </div>

          {/* Business Package */}
          <div className="relative bg-white rounded-3xl flex flex-col h-full overflow-hidden shadow-premium gradient-border group hover:shadow-premium-lg transition-all duration-500">
            <div className="p-8 md:p-10 flex flex-col flex-1">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 mt-6">Groei-Pakket</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Voor de zaak met meerdere diensten, info of een aanbod dat vaak verandert.</p>
              
              <div className="mb-10 flex items-baseline justify-center gap-1">
                <span className="text-sm text-slate-400 font-medium mr-1">Vanaf</span>
                <span className="text-xl text-slate-400 font-medium">€</span>
                <span className="text-5xl font-serif font-bold text-slate-900 tracking-tight">950</span>
                <span className="text-slate-400 font-sans text-sm ml-1">eenmalig</span>
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  { title: "Meerdere pagina's", desc: "Home, Over Ons, Menu/Service, Contact" },
                  { title: "Uitgebreide beeldstrategie", desc: "Met uw eigen foto's en zorgvuldig geselecteerde beelden" },
                  { title: "Meertaligheid", desc: "Optioneel NL / FR / EN voor toerisme" },
                  { title: "Online reservaties", desc: "Koppel uw huidig systeem" },
                  { title: "Google-proof SEO", desc: "Technische SEO + zoekwoordstrategie voor uw regio" }
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

            {/* Hosting section */}
            <div className="mt-auto bg-slate-50/80 px-8 md:px-10 py-6 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 mb-4">
                <IconShield className="w-5 h-5 text-amber-500" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">€20/maand</span>
                  <span className="mx-1.5 text-slate-300">—</span>
                  <span>Hosting, updates &amp; 100/100 Google-score behouden</span>
                </p>
              </div>

              <a 
                href="/" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Kies het Groei-Pakket
              </a>
            </div>
          </div>
        </div>

        {/* Trust note under pricing */}
        <p className="text-center text-sm text-slate-400 mt-12 max-w-lg mx-auto">
          Alle prijzen zijn exclusief BTW. Twijfelt u welk pakket bij u past?{' '}
          <a href="/" onClick={(e) => scrollToSection(e, 'contact')} className="text-amber-600 font-medium hover:text-amber-700 transition-colors underline underline-offset-2 decoration-amber-300 cursor-pointer">Bel me</a> en ik adviseer u eerlijk.
        </p>
      </div>
    </section>
  );
};

export default Offer;
