import React from 'react';
import { IconCheck, IconShield, IconPhone } from './Icons';

/* ── tiny inline icons ── */
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-amber-400">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const PaletteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-amber-400">
    <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" /><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" /><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" /><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-amber-400">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const DeviceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-amber-400">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-amber-400">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-amber-400">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const Klantenkaart: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-28 pb-20 md:pb-32 overflow-hidden bg-navy">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/80 to-purple-900/30 pointer-events-none z-[1]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-coast-noise z-[1]" />
        {/* Radial glow accents */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.05] rounded-full blur-[120px] pointer-events-none z-[2]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — Copy */}
          <div className="text-white max-w-2xl text-center lg:text-left flex-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-glow" aria-hidden="true" />
              Nieuw: digitale klantenkaart
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-serif font-semibold leading-[1.08] tracking-[-0.02em] mb-4 md:mb-6">
              Maak van elke{' '}
              <br className="hidden sm:block" />
              bezoeker een{' '}
              <span className="relative inline-block">
                <span className="text-gold-gradient">vaste gast.</span>
                <span className="absolute -bottom-1.5 md:-bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400/80 via-amber-500/60 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/40 italic mb-6 md:mb-8">
              (Zonder papieren rommel of dwingende apps)
            </p>

            <p className="text-lg md:text-xl lg:text-2xl text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
              Hoeveel vaste klanten lopen er maandelijks bij u de deur uit zonder dat u hun naam of e-mailadres kent? En hoeveel papieren stempelkaarten belanden in de prullenbak?
            </p>
            <p className="text-base md:text-lg text-white/45 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 md:mb-12">
              Stop met raden en start met meten. Met onze digitale stempelkaart krijgt elke klant een digitale portemonnee — een PWA die eruitziet als een echte app, maar draait in de browser. Geen gedwongen downloads, geen plastic pasjes, geen wurgcontracten. Werkt op élke smartphone (iPhone, Samsung, Huawei, alles) en op élke tablet achter uw kassa. 100% GDPR-conform en onmogelijk te hacken of te misbruiken.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start mb-8">
              <a
                href="https://wa.me/32494816714?text=Hallo%20Kevin%2C%20ik%20ben%20ge%C3%AFnteresseerd%20in%20de%20digitale%20klantenkaart.%20Kan%20je%20een%20gratis%20demo%20inplannen%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-center"
              >
                Boek een gratis 15-minuten demo in uw zaak
              </a>
              <a
                href="#hoe-werkt-het"
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Hoe werkt het?
              </a>
            </div>

            {/* Trust chips */}
            <div className="inline-flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
              {['Werkt op elke telefoon', '100% Fraudeproof', 'Geen app nodig'].map((t, i) => (
                <span key={i} className="flex items-center gap-2.5 text-white/60 text-xs md:text-sm font-medium">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <IconCheck className="text-amber-400 w-3 h-3" />
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="relative flex-shrink-0 w-full max-w-md lg:max-w-lg">
            <div className="absolute -inset-8 bg-amber-500/[0.06] rounded-full blur-[80px] pointer-events-none" />
            <img
              src="/spaarkaart.webp"
              alt="Digitale stempelkaart systeem — premium QR-systeem voor horeca op elke smartphone en tablet"
              width={550}
              height={511}
              className="relative rounded-3xl shadow-2xl w-full h-auto"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PAIN POINT — "Het Probleem"
          ════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-slate-50 overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-[200px] right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[150px] pointer-events-none translate-x-1/4" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-4">Het probleem</span>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 tracking-[-0.02em] leading-[1.15] mb-8">
            Uw beste klanten blijven anoniem.<br className="hidden sm:block" />
            En de concurrent pikt ze in.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12">
            U herkent ze — de dame die elke vrijdag binnenkomt, het koppel dat altijd hetzelfde tafeltje kiest. Maar u kent hun naam niet, hun e-mailadres niet, en u heeft geen manier om ze te bereiken als u een actie lanceert of een stil seizoen wilt opvullen. Ondertussen deelt de zaak verderop digitale kortingskaarten uit en bouwt een mailing-lijst op van <em>uw</em> klanten.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { stat: '67%', desc: 'van de consumenten zegt dat loyaliteitsprogramma\u2019s hen beïnvloeden bij de keuze waar ze terugkeren' },
              { stat: '5×', desc: 'goedkoper om een bestaande klant te laten terugkeren dan een nieuwe klant aan te trekken' },
              { stat: '€0', desc: 'drukkerkosten vanaf nu. Geen papieren kaartjes meer bestellen, herdrukken of weggooien. Dit systeem betaalt zichzelf terug in 1, 2, 3…' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-premium gradient-border">
                <span className="block text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-2">{item.stat}</span>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          DE OPLOSSING — "Hoe werkt het?"
          ════════════════════════════════════════════ */}
      <section id="hoe-werkt-het" className="relative py-24 md:py-32 px-6 bg-white overflow-hidden noise-overlay">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-50/60 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20 space-y-5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">De oplossing</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-navy tracking-[-0.02em]">
              Zo simpel als scannen,<br className="hidden sm:block" /> zo krachtig als een CRM.
            </h2>
            <p className="text-navy/50 max-w-2xl mx-auto text-lg leading-relaxed">
              Uw klant scant een QR-code op uw toog, logt in via een Magic Link of Google, en heeft meteen een digitale stempelkaart in uw huisstijl. Bij elk volgend bezoek genereert uw tablet een unieke QR-code die de klant scant. Drie stappen, nul frictie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Klant scant de QR-code op tafel',
                desc: 'Een luxe QR-bordje staat op uw toog of tafel. De klant opent gewoon zijn camera — geen App Store, geen download. De code leidt naar uw digitale stempelkaart die direct opent in de browser.',
              },
              {
                step: '02',
                title: 'Magic Link of Google-login',
                desc: 'De klant logt in met \u00e9\u00e9n tik via een Magic Link (e-mail, geen wachtwoord nodig) of zijn Google-account. Meteen verschijnt een stijlvolle stempelkaart in uw huisstijl — uw logo, uw kleuren. De klant kan het als icoon op zijn startscherm zetten, net als een echte app.',
              },
              {
                step: '03',
                title: 'Uw tablet genereert een unieke QR',
                desc: 'Na de bestelling genereert uw iPad of tablet een unieke, tijdgebonden QR-code. De klant scant deze met zijn stempelkaart en het punt wordt direct toegevoegd. Een geluidssignaal bevestigt de scan. Klaar \u2014 de volgende klant kan al aanschuiven.',
              },
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-8 md:p-10 shadow-premium gradient-border group hover:shadow-premium-lg transition-all duration-500">
                <span className="block text-5xl font-serif font-bold text-gold-gradient opacity-30 mb-4">{item.step}</span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          DE 3 GROTE VOORDELEN
          ════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(170deg, #1e293b 0%, #0f172a 60%, #0c1222 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-coast-noise" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20 space-y-5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">Waarom dit systeem</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-[-0.02em]">
              Een premium spaarsysteem.<br className="hidden sm:block" />
              <span className="text-white/50">Zonder de wurgcontracten.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <LockIcon />,
                title: '100% Fraudeproof',
                desc: 'Vergeet papieren kaartjes die klanten zelf afstempelen als u even niet kijkt. Elke QR-code die uw tablet genereert is cryptografisch uniek en slechts 30 seconden geldig. Onmogelijk te kopi\u00ebren, dupliceren of manipuleren. Elk punt is \u00e9cht verdiend.',
              },
              {
                icon: <PaletteIcon />,
                title: 'Volledig in uw huisstijl',
                desc: 'Uw logo, uw kleuren, uw branding — op de stempelkaart \u00e9n op de tablet. Wanneer het systeem niet actief is, draait er een dynamische screensaver met uw logo op de iPad. Uw zaak, uw uitstraling, overal.',
              },
              {
                icon: <ChartIcon />,
                title: 'Klantendata in eigen beheer',
                desc: 'Dit is geen huurplatform waar u betaalt voor toegang tot uw eigen data. Alle namen, e-mailadressen en bezoekgeschiedenis zijn van u. Exporteer ze naar Excel voor een duidelijk overzicht, draai er gerichte promo-campagnes mee, of stuur verjaardagskortingen. U beslist.',
              },
            ].map((item, i) => (
              <div key={i} className="relative rounded-3xl p-8 md:p-10 overflow-hidden group"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-white/[0.06] border border-white/[0.08] group-hover:bg-white/[0.1] group-hover:border-amber-500/20 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Extra benefits row */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { icon: <DeviceIcon />, title: 'Geen extra hardware nodig', desc: 'Geen duur kastje naast de kassa, geen POS-integratie, geen maandelijkse hardware-huur. Het hele systeem draait op uw eigen tablet \u2014 iPad, Samsung, om het even welk merk. En de klant? Die gebruikt gewoon zijn eigen telefoon.' },
              { icon: <ShieldCheckIcon />, title: '100% GDPR-conform', desc: 'Uw klanten geven expliciet toestemming, alle data wordt versleuteld opgeslagen en is AVG-proof. Klanten behouden controle over hun gegevens en kunnen zich op elk moment uitschrijven.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRIJZEN — Transparant
          ════════════════════════════════════════════ */}
      <section id="prijzen" className="relative py-28 md:py-36 px-6 bg-white overflow-hidden noise-overlay">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-50/60 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-100/80 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 space-y-5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">Transparante prijzen</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy tracking-[-0.02em]">
              Geen verborgen kosten.<br className="hidden sm:block" /> Geen wurgcontracten.
            </h2>
            <p className="text-navy/50 max-w-xl mx-auto text-lg leading-relaxed">
              Eén helder tarief. Alles inbegrepen. Geen verplichtingen — maandelijks opzegbaar na het eerste jaar.
            </p>
          </div>

          {/* Single pricing card — the "Productized Service" */}
          <div className="max-w-lg mx-auto">
            <div className="relative bg-white rounded-3xl flex flex-col overflow-visible glow-border z-10 group">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-white text-[10px] font-bold tracking-[0.18em] uppercase py-2 px-5 rounded-full shadow-lg shadow-amber-500/30 whitespace-nowrap ring-4 ring-white">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Alles-in-één pakket
                </span>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[150px] bg-amber-400/[0.08] rounded-full blur-[60px] pointer-events-none" />

              <div className="p-8 md:p-10 flex flex-col flex-1 relative">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 mt-6">Het Start-Ready Pakket</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">Een kant-en-klaar digitaal stempelkaartsysteem dat u binnen 48 uur live kunt gebruiken. Geen technische kennis vereist.</p>

                {/* Setup Price */}
                <div className="mb-4 flex items-baseline justify-center gap-1">
                  <span className="text-sm text-slate-400 font-medium mr-1">Eenmalige setup</span>
                </div>
                <div className="mb-8 flex items-baseline justify-center gap-1">
                  <span className="text-xl text-amber-600 font-medium">€</span>
                  <span className="text-6xl font-serif font-bold text-slate-900 tracking-tight">495</span>
                </div>

                <ul className="space-y-4 text-sm mb-8">
                  {[
                    { title: 'Volledig op maat design', desc: 'Uw logo, kleuren & branding op de digitale stempelkaart' },
                    { title: 'PWA — werkt als een echte app', desc: 'Klant kan het als icoon op zijn startscherm zetten, opent fullscreen' },
                    { title: 'Magic Link & Google-login', desc: 'Registreren in \u00e9\u00e9n tik — geen wachtwoorden, geen gedoe' },
                    { title: 'Cryptografisch fraudeproof', desc: 'Unieke QR-codes, 30 seconden geldig, onmogelijk te manipuleren' },
                    { title: 'Werkt op elke telefoon & tablet', desc: 'iPhone, Samsung, Huawei, iPad — maakt niet uit, het werkt overal' },
                    { title: 'Dynamische screensaver op tablet', desc: 'Uw logo en huisstijl als screensaver wanneer het systeem idle is' },
                    { title: 'Klanten dashboard + export', desc: 'Namen, e-mails, bezoekfrequentie — exporteer naar Excel voor een duidelijk overzicht' },
                    { title: 'Premium QR-bordje', desc: 'Luxe fysiek bordje voor op uw toog of tafel' },
                    { title: '100% GDPR-conform', desc: 'Versleutelde opslag, expliciete toestemming, AVG-proof' },
                    { title: 'Persoonlijke installatie', desc: 'Ik kom het bij u op de zaak instellen en uitleggen' },
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

              {/* Yearly cost */}
              <div className="mt-auto bg-amber-50/50 px-8 md:px-10 py-6 border-t border-amber-100/50">
                <div className="flex flex-col items-center gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <IconShield className="w-5 h-5 text-amber-500" />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">\u20AC250/jaar</span>
                      <span className="mx-1.5 text-slate-300">\u2014</span>
                      <span>Hosting, updates, support &amp; beveiliging</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide px-3 py-1 rounded-full border border-emerald-200">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
                    Eerste jaar GRATIS!
                  </span>
                </div>

                <a
                  href="https://wa.me/32494816714?text=Hallo%20Kevin%2C%20ik%20wil%20graag%20een%20gratis%20demo%20van%20de%20digitale%20klantenkaart%20inplannen."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30"
                >
                  Boek een gratis 15-minuten demo
                </a>
                <p className="text-center text-xs text-slate-400 mt-3">Ik kom vrijblijvend langs in uw zaak — regio Kust &amp; Brugge</p>
              </div>
            </div>
          </div>

          {/* Price comparison */}
          <div className="max-w-2xl mx-auto mt-16">
            <p className="text-center text-sm font-semibold text-slate-900 mb-6">Vergelijk eens met de grote spelers:</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Grote loyaliteits-platformen', price: '€150-300/maand', note: 'Wurgcontract + uw data is van hen' },
                { name: 'POS-systeem add-ons', price: '€80-200/maand', note: 'Gebonden aan specifieke hardware' },
                { name: 'Webaanzee', price: '€495 + €250/jaar', note: 'Eerste jaar hosting gratis. Alles van u.', highlight: true },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-5 text-center ${item.highlight ? 'bg-amber-50 border-2 border-amber-200' : 'bg-slate-50 border border-slate-100'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.highlight ? 'text-amber-600' : 'text-slate-400'}`}>{item.name}</p>
                  <p className={`text-lg font-serif font-bold mb-1 ${item.highlight ? 'text-slate-900' : 'text-slate-600'}`}>{item.price}</p>
                  <p className={`text-xs ${item.highlight ? 'text-amber-700 font-medium' : 'text-slate-400'}`}>{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-12 max-w-lg mx-auto">
            Alle prijzen zijn exclusief BTW. Vragen?{' '}
            <a href="tel:0494816714" className="text-amber-600 font-medium hover:text-amber-700 transition-colors underline underline-offset-2 decoration-amber-300">Bel me</a> en ik vertel u alles.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-50/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-4">Vaak gesteld</span>
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 tracking-[-0.02em]">
              Veelgestelde vragen
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Werkt dit op elke telefoon?',
                a: 'Ja, op iedere smartphone \u2014 iPhone, Samsung, Huawei, Google Pixel, het maakt niet uit. Het systeem werkt als een PWA (Progressive Web App): het draait volledig in de browser en uw klant kan het als icoon op zijn startscherm zetten. Het opent dan fullscreen, net als een gewone app, maar zonder download uit de App Store of Play Store.',
              },
              {
                q: 'Moet mijn klant een app downloaden?',
                a: 'Nee, absoluut niet. Dat is juist de kracht van dit systeem. Alles draait als een PWA via de browser. Uw klant scant de QR-code, logt in via een Magic Link of Google, en heeft direct een digitale stempelkaart. Optioneel kan de klant het als icoon op zijn startscherm zetten \u2014 het gedraagt zich dan als een app, maar is er geen.',
              },
              {
                q: 'Wat is een PWA precies?',
                a: 'PWA staat voor Progressive Web App. Het is een website die eruitziet en aanvoelt als een echte app. Uw klant kan het als icoon op zijn startscherm zetten \u2014 het opent dan fullscreen, net als een gewone app. Maar er is geen download nodig, geen update, en geen plek in de App Store. Het werkt op elke telefoon met een browser.',
              },
              {
                q: 'Hoe werkt het inloggen precies?',
                a: 'De klant heeft twee opties. \u00c9\u00e9n: een Magic Link \u2014 de klant vult zijn e-mailadres in en ontvangt een link waarop hij \u00e9\u00e9n keer klikt. Geen wachtwoord, geen gedoe. Twee: Google-login \u2014 \u00e9\u00e9n tik op \u201cInloggen met Google\u201d en klaar. Beide opties duren minder dan 10 seconden.',
              },
              {
                q: 'Welke tablet heb ik nodig achter de kassa?',
                a: 'Om het even welke tablet met internet en een scherm. iPad, Samsung Galaxy Tab, Lenovo, Amazon Fire \u2014 het maakt niet uit. U opent gewoon een beveiligde webpagina in de browser. Geen speciale software, geen installatie. De tablet genereert de unieke QR-codes die uw klanten scannen.',
              },
              {
                q: 'Kan ik het later opzeggen?',
                a: 'Ja, na het eerste jaar kunt u maandelijks opzeggen. Geen opzegtermijn van 12 maanden, geen boeteclausules. En u behoudt altijd uw volledige klantendatabase \u2014 die data is van u, niet van mij.',
              },
              {
                q: 'Hoeveel klanten kan ik registreren?',
                a: 'Onbeperkt. Of u nu 50 of 5.000 klanten heeft \u2014 het systeem schaalt mee zonder extra kosten. Het jaarlijkse bedrag blijft \u20AC250, ongeacht het aantal klanten. En het eerste jaar is die hosting gratis.',
              },
              {
                q: 'Kan ik de beloningen zelf aanpassen?',
                a: 'Absoluut. U bepaalt zelf hoeveel punten een klant per bezoek krijgt, bij hoeveel punten een beloning wordt ontgrendeld, en wat die beloning inhoudt. Een gratis koffie na 10 bezoeken? Een dessert na 5? U beslist, en u kunt het op elk moment aanpassen.',
              },
              {
                q: 'Is de QR-code echt fraudeproof?',
                a: 'Elke QR-code die uw tablet genereert is cryptografisch uniek en slechts 30 seconden geldig. Er is geen manier om codes te kopi\u00ebren, screenshots te hergebruiken of punten te vervalsen. Een geluidssignaal bevestigt elke succesvolle scan, zodat u en de klant weten dat het punt is geregistreerd.',
              },
              {
                q: 'Hoe snel is dit operationeel?',
                a: 'Binnen 48 uur na ons gesprek. Ik kom persoonlijk langs in uw zaak, stel alles in op uw tablet, hang het QR-bordje op, en loop samen met u het hele systeem door zodat u en uw team er direct mee aan de slag kunnen.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 overflow-hidden">
                <summary className="flex justify-between items-center py-5 px-6 cursor-pointer list-none font-semibold text-slate-900 hover:text-slate-700 transition-colors select-none">
                  <span className="pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-50 group-open:bg-amber-100 flex items-center justify-center transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-400 group-open:text-amber-600 group-open:rotate-45 transition-all duration-300">
                      <line x1="10" y1="4" x2="10" y2="16" /><line x1="4" y1="10" x2="16" y2="10" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-50">
                  <p className="pt-4">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA — Full-width
          ════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/80 to-purple-900/20 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-coast-noise" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-[-0.02em] mb-6">
            Klaar om uw klanten<br className="hidden sm:block" /> écht te leren kennen?
          </h2>
          <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-10">
            Ik kom gratis 15 minuten langs in uw zaak. Ik laat het systeem live zien op uw eigen tablet, beantwoord al uw vragen, en u beslist zonder druk. Geen verkooppraatje — gewoon een eerlijke demo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/32494816714?text=Hallo%20Kevin%2C%20ik%20wil%20graag%20een%20gratis%20demo%20van%20de%20digitale%20klantenkaart%20inplannen."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto text-center"
            >
              Boek uw gratis demo via WhatsApp
            </a>
            <a
              href="tel:0494816714"
              className="btn-secondary w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <IconPhone className="w-4 h-4" />
              Bel 0494 81 67 14
            </a>
          </div>

          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-3">
            {['Geen verplichtingen', 'Regio Kust & Brugge', 'Binnen 48 uur live'].map((t, i) => (
              <span key={i} className="flex items-center gap-2.5 text-white/50 text-xs md:text-sm font-medium">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <IconCheck className="text-amber-400 w-3 h-3" />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <footer className="bg-navy-dark border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="Webaanzee" width="24" height="24" className="w-6 h-6 object-contain" />
            <span>© {new Date().getFullYear()} Webaanzee — Kevin Bourguignon</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <a href="/privacy.html" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="tel:0494816714" className="hover:text-white/60 transition-colors">0494 81 67 14</a>
            <a href="mailto:kevin@webaanzee.be" className="hover:text-white/60 transition-colors">kevin@webaanzee.be</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Klantenkaart;
