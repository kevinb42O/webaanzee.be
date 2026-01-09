
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Proof from './components/Proof';
import Offer from './components/Offer';
import About from './components/About';
import ContactFooter from './components/ContactFooter';
import { IconInstagram, IconFacebook, IconLinkedIn, IconMail, IconLocation, IconTrendUp } from './components/Icons';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section id="werkwijze">
          <ProblemSolution />
        </section>
        <section id="resultaten">
          <Proof />
        </section>
        <section id="prijzen">
          <Offer />
        </section>
        <About />
        <section id="contact">
          <ContactFooter />
        </section>
      </main>
      <footer className="bg-navy-dark text-white/60 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid gap-10 md:gap-12 md:grid-cols-[2fr_1fr_1fr] items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo_zondertekst_zonderachtergrond.png"
                  alt="Web aan Zee"
                  width="44"
                  height="44"
                  decoding="async"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-lg font-serif font-semibold text-white">
                  Web <span className="text-gold">aan Zee</span>
                </span>
              </div>
              <p className="leading-[1.6] text-sm text-[#cbd5e1]">
                Web aan Zee helpt lokale ondernemers aan de Belgische kust met een sterke online aanwezigheid: een duidelijke website en beter gevonden worden op Google.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">Navigatie</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="transition-colors hover:text-gold">Startpagina</a></li>
                <li><a href="/#werkwijze" className="transition-colors hover:text-gold">Werkwijze</a></li>
                <li><a href="/#resultaten" className="transition-colors hover:text-gold">Resultaten</a></li>
                <li><a href="/#prijzen" className="transition-colors hover:text-gold">Prijzen</a></li>
                <li><a href="/#contact" className="transition-colors hover:text-gold">Contact</a></li>
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-3 text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Connect</h4>
                <div className="flex items-center gap-3">
                  <IconMail className="w-4 h-4 text-gold" />
                  <span className="text-white">kevin@webaanzee.be</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconLocation className="w-4 h-4 text-gold" />
                  <span>Blankenberge, West-Vlaanderen</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconTrendUp className="w-4 h-4 text-gold" />
                  <span>Beschikbaar voor nieuwe projecten</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <a href="https://www.instagram.com/bourguignon_visualart/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-gold transition-colors" aria-label="Instagram">
                  <IconInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-gold transition-colors" aria-label="Facebook">
                  <IconFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-gold transition-colors" aria-label="LinkedIn">
                  <IconLinkedIn className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-xs md:text-sm text-center md:text-left">
              &copy; 2026 Web aan Zee. Gemaakt aan de Belgische kust.
            </p>
            <div className="flex justify-center md:justify-end gap-4 text-[11px] md:text-xs text-white/40">
              <a href="/privacy.html#privacy" className="hover:text-white transition-colors">Privacybeleid</a>
              <a href="/privacy.html#cookies" className="hover:text-white transition-colors">Cookiebeleid</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
