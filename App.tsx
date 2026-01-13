
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Proof from './components/Proof';
import Offer from './components/Offer';
import FAQ from './components/FAQ';
import About from './components/About';
import ContactFooter from './components/ContactFooter';
import { IconInstagram, IconFacebook, IconLinkedIn, IconMail, IconLocation, IconTrendUp } from './components/Icons';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" role="main" itemScope itemType="https://schema.org/WebPage">
        <Hero />
        <section id="werkwijze" aria-labelledby="werkwijze-heading">
          <ProblemSolution />
        </section>
        <section id="resultaten" aria-labelledby="resultaten-heading">
          <Proof />
        </section>
        <section id="prijzen" aria-labelledby="prijzen-heading">
          <Offer />
        </section>
        <section id="faq" aria-labelledby="faq-heading">
          <FAQ />
        </section>
        <section id="over-ons" aria-labelledby="over-ons-heading">
          <About />
        </section>
        <section id="contact" aria-labelledby="contact-heading">
          <ContactFooter />
        </section>
      </main>
    </div>
  );
};

export default App;
