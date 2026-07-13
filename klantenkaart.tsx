import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Klantenkaart from './components/Klantenkaart';
import ContactFooter from './components/ContactFooter';
import CrispChat from './components/CrispChat';
import './index.css';

const KlantenkaartPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1, paddingTop: '100px' }}>
        <Klantenkaart />
      </main>
      <CrispChat />
      <ContactFooter />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <KlantenkaartPage />
    </React.StrictMode>
  );
}
