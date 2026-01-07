
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Proof from './components/Proof';
import Offer from './components/Offer';
import About from './components/About';
import ContactFooter from './components/ContactFooter';
import { IconInstagram, IconFacebook, IconLinkedIn } from './components/Icons';

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
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid gap-12 xl:gap-16 md:grid-cols-[1.5fr_1fr] items-start">
            <div className="max-w-md md:max-w-sm">
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Over Web aan Zee</h4>
              <p className="leading-relaxed text-sm">
                Web aan Zee helpt lokale ondernemers aan de Belgische kust met een sterke online aanwezigheid: een duidelijke website en beter gevonden worden op Google.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:items-end text-left md:text-right">
              <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigatie</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#werkwijze" className="hover:text-gold transition-colors">Werkwijze</a></li>
                  <li><a href="#prijzen" className="hover:text-gold transition-colors">Tarieven</a></li>
                  <li><a href="/privacy.html#privacy" className="hover:text-gold transition-colors">Privacybeleid</a></li>
                  <li><a href="/privacy.html#cookies" className="hover:text-gold transition-colors">Cookiebeleid</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 grid gap-4 sm:gap-6 md:grid-cols-[1fr_auto] items-center">
            <p className="text-sm text-center md:text-left">&copy; {new Date().getFullYear()} Web aan Zee. Geen technisch jargon, gewoon resultaat.</p>
            <div className="flex justify-center md:justify-end space-x-5">
              <a href="https://www.instagram.com/bourguignon_visualart/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-gold transition-colors" aria-label="Instagram">
                <IconInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="Facebook">
                <IconFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="LinkedIn">
                <IconLinkedIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
