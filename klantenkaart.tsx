import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Klantenkaart from './components/Klantenkaart';
import WhatsAppFloat from './components/WhatsAppFloat';

const KlantenkaartPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-navy">
      <Header />
      <main className="flex-grow">
        <Klantenkaart />
      </main>
      <WhatsAppFloat />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <KlantenkaartPage />
  </React.StrictMode>
);
