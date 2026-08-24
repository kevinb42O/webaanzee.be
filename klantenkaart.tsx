import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Header from './components/Header';
import Klantenkaart from './components/Klantenkaart';
import ContactFooter from './components/ContactFooter';
import CrispChat from './components/CrispChat';
import './index.css';

export const KlantenkaartPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Klantenkaart />
      </main>
      <CrispChat />
      <ContactFooter />
    </div>
  );
};

if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (!container) throw new Error('Could not find root element to mount to');
  const app = (
    <React.StrictMode>
      <KlantenkaartPage />
    </React.StrictMode>
  );
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
