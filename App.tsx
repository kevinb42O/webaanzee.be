import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Proof from './components/Proof';
import ClientMarks from './components/ClientMarks';
import Offer from './components/Offer';
import Quality from './components/Quality';
import FAQ from './components/FAQ';
import About from './components/About';
import ContactFooter from './components/ContactFooter';
import CrispChat from './components/CrispChat';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }} role="main" itemScope itemType="https://schema.org/WebPage">
        <Hero />
        <Proof />
        <ClientMarks />
        <ProblemSolution />
        <Quality />
        <Offer />
        <About />
        <FAQ />
        <ContactFooter />
      </main>
      <CrispChat />
      <Analytics />
    </div>
  );
};

export default App;
