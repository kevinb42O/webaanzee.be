import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import Privacy from './components/Privacy';
import Cookies from './components/Cookies';
import Header from './components/Header';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-navy">
      <Header light />
      <main className="flex-grow">
        <Privacy />
        <Cookies />
      </main>
    </div>
  );
};

if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Could not find root element to mount to');
  const app = <React.StrictMode><PrivacyPage /></React.StrictMode>;
  if (rootElement.hasChildNodes()) hydrateRoot(rootElement, app);
  else createRoot(rootElement).render(app);
}
