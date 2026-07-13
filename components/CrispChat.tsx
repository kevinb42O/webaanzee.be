import React, { useEffect, useState } from 'react';
import styles from './CrispCustomButton.module.css';

// Type definition for window to avoid TypeScript errors
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

const CrispChat: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const WEBSITE_ID = "ede3f23a-3d08-4cf9-93ae-cd556b614349"; 
    
    if (!window.$crisp) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = WEBSITE_ID;

      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
      
      // Listen to Crisp events
      window.$crisp.push(["on", "chat:opened", () => {
        setIsChatOpen(true);
      }]);
      
      window.$crisp.push(["on", "chat:closed", () => {
        setIsChatOpen(false);
        // Zorg dat de standaard Crisp knop weer verdwijnt als de chat sluit
        window.$crisp.push(["do", "chat:hide"]);
      }]);

      // Verberg de standaard knop direct bij laden
      window.$crisp.push(["on", "session:loaded", () => {
        // Enkel verbergen als we de chat nog niet expliciet geopend hebben
        if (!isChatOpen) {
          window.$crisp.push(["do", "chat:hide"]);
        }
      }]);
    }
  }, []);

  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
      setIsChatOpen(true);
    }
  };

  // If the native chat is open, we hide our custom button
  if (isChatOpen) return null;

  return (
    <div className={styles.floatContainer}>
      <span className={styles.tooltip}>
        Stel me je vraag via de chat
      </span>
      <button
        onClick={openChat}
        aria-label="Open chat"
        className={styles.button}
      >
        <span className={styles.pulse} />
        {/* Crisp Chat Icon (Message bubble) */}
        <svg
          viewBox="0 0 24 24"
          className={styles.icon}
        >
          <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
        </svg>
      </button>
    </div>
  );
};

export default CrispChat;
