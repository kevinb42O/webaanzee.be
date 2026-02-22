import React, { useState } from 'react';
import { IconCheck } from './Icons';

const SEOAnalyse: React.FC = () => {
  const [open, setOpen] = useState(false);

  const analyseItems = [
    {
      icon: '🔍',
      title: 'Google-zichtbaarheid',
      desc: 'Ik zoek uw zaak op via Google zoals een klant dat zou doen. Vindt men u? Of vindt men uw concurrent? U krijgt zwart-op-wit te zien waar u nu staat.',
    },
    {
      icon: '📱',
      title: 'Mobiele ervaring',
      desc: 'Meer dan 70% van uw klanten zoekt via smartphone. Ik test of uw site (als u er een hebt) snel laadt, correct weergegeven wordt en of iemand makkelijk contact kan opnemen.',
    },
    {
      icon: '⚡',
      title: 'Snelheid & techniek',
      desc: 'Ik meet de laadsnelheid met dezelfde tools die Google zelf gebruikt. Een trage website kost u posities én klanten. U krijgt uw exacte score.',
    },
    {
      icon: '📍',
      title: 'Lokale vindbaarheid',
      desc: 'Staat u op Google Maps? Is uw Google Bedrijfsprofiel compleet en correct ingevuld? Dit bepaalt of buurtbewoners u vinden. Ik check dit tot in detail.',
    },
    {
      icon: '🏆',
      title: 'Concurrentie-vergelijking',
      desc: 'Ik vergelijk uw online aanwezigheid met die van 2-3 directe concurrenten in uw regio. Zo weet u precies waar u achterloopt en waar de kansen liggen.',
    },
    {
      icon: '📋',
      title: 'Persoonlijk actieplan',
      desc: 'Geen vaag rapport, maar een duidelijke lijst: dit zijn de 3-5 dingen die u als eerste moet aanpakken om meer klanten via Google te krijgen. In gewone mensentaal.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-50/40 rounded-full blur-[140px] pointer-events-none -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-50/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold tracking-[0.2em] uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Gratis — Geen verplichtingen</span>
          </div>
          <h2 id="seo-analyse-heading" className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 tracking-[-0.02em] leading-[1.1]">
            Gratis SEO-analyse<br className="hidden sm:block" /> voor uw zaak
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Wilt u weten of klanten u vinden op Google? Ik analyseer uw volledige online zichtbaarheid 
            en geef u een <strong className="text-slate-700">eerlijk, persoonlijk rapport</strong> — volledig gratis, zonder verkooppraat.
          </p>
        </div>

        {/* What's included - clear explanation */}
        <div className="mb-16">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-amber-600 mb-10">
            Wat zit er in uw gratis analyse?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyseItems.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-amber-700 transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works - simple 3 steps */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 mb-16">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-amber-600 mb-10">
            Hoe werkt het?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: '1',
                title: 'U neemt contact op',
                desc: 'Via WhatsApp, telefoon of mail. Vertel me uw zaaknaam en in welke gemeente u actief bent. Dat is alles wat ik nodig heb.',
              },
              {
                step: '2',
                title: 'Ik analyseer alles',
                desc: 'Binnen 48 uur onderzoek ik uw Google-zichtbaarheid, website (als u er een hebt), snelheid, en concurrentie. Grondig en persoonlijk.',
              },
              {
                step: '3',
                title: 'U krijgt uw rapport',
                desc: 'We bellen 15 minuten. Ik leg alles uit in gewone taal. U weet precies waar u staat en wat u kunt doen. Geen verplichtingen, geen druk.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-amber-500/20">
                  {item.step}
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ dropdown */}
        <div className="max-w-2xl mx-auto mb-16">
          <details 
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group"
            open={open}
          >
            <summary 
              className="flex justify-between items-center py-5 px-6 cursor-pointer list-none font-semibold text-slate-900 hover:text-slate-700 transition-colors select-none"
              onClick={(e) => { e.preventDefault(); setOpen(!open); }}
            >
              <span>"Gratis? Wat is de catch?"</span>
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-50 group-open:bg-amber-100 flex items-center justify-center transition-all duration-300">
                <svg 
                  width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  className={`text-slate-400 group-open:text-amber-600 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                >
                  <line x1="10" y1="4" x2="10" y2="16" />
                  <line x1="4" y1="10" x2="16" y2="10" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-50">
              <p className="pt-4">
                Er is <strong className="text-slate-700">geen catch</strong>. Ik doe dit omdat ik weet dat de meeste lokale ondernemers 
                niet beseffen hoeveel klanten ze mislopen. Als ik u dat kan laten zien, en u besluit later dat u 
                hulp wilt — dan kent u mij al. Maar er is <strong className="text-slate-700">nul verplichting</strong>. 
                U krijgt het rapport sowieso, ook als u daarna niets doet. Beloofd.
              </p>
            </div>
          </details>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <a
            href="https://wa.me/32494816714?text=Hallo%20Kevin%2C%20ik%20zou%20graag%20een%20gratis%20SEO-analyse%20aanvragen%20voor%20mijn%20zaak."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Vraag mijn gratis SEO-analyse aan
          </a>
          <p className="text-sm text-slate-400">
            Of bel <a href="tel:0494816714" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">0494 81 67 14</a> — ik neem altijd op.
          </p>

          {/* Trust bullets */}
          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-3 pt-4">
            {['Geen kosten', 'Geen verplichtingen', 'Rapport binnen 48u'].map((text) => (
              <span key={text} className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <IconCheck className="text-emerald-500 w-4 h-4" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOAnalyse;
