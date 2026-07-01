import React, { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
const Proof = lazy(() => import('./components/Proof'));
import Offer from './components/Offer';
import Klantenkaart from './components/Klantenkaart';
import SEOAnalyse from './components/SEOAnalyse';
import FAQ from './components/FAQ';
import About from './components/About';
import ContactFooter from './components/ContactFooter';
import WhatsAppFloat from './components/WhatsAppFloat';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }} role="main" itemScope itemType="https://schema.org/WebPage">
        <Hero />
        <ProblemSolution />
        <Suspense fallback={<div style={{ padding: '8rem 0' }} />}>
          <Proof />
        </Suspense>
        <Offer />
        <Klantenkaart />
        <SEOAnalyse />
        <FAQ />
        <About />
        <ContactFooter />
      </main>
      <WhatsAppFloat />
      <Analytics />
    </div>
  );
};

export default App;
