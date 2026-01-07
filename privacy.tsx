import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Privacy from './components/Privacy';
import Cookies from './components/Cookies';
import Header from './components/Header';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-navy">
      <Header />
      <main className="flex-grow">
        <Privacy />
        <Cookies />
      </main>
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
    <PrivacyPage />
  </React.StrictMode>
);
