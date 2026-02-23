
import React, { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
const Proof = lazy(() => import('./components/Proof'));
import Offer from './components/Offer';
import SEOAnalyse from './components/SEOAnalyse';
import FAQ from './components/FAQ';
import About from './components/About';
import ContactFooter from './components/ContactFooter';
import WhatsAppFloat from './components/WhatsAppFloat';

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
          <Suspense fallback={<div className="py-32" />}>
            <Proof />
          </Suspense>
        </section>
        <section id="prijzen" aria-labelledby="prijzen-heading">
          <Offer />
        </section>
        <section id="seo-analyse" aria-labelledby="seo-analyse-heading">
          <SEOAnalyse />
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
      <WhatsAppFloat />
      <Analytics />
    </div>
  );
};

export default App;
