import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="/#home" onClick={(e) => isHomePage ? scrollToSection(e, 'home') : undefined} className={styles.logo}>
          Webaanzee<span className={styles.logoDot}>.</span>
        </a>

        <nav className={styles.nav}>
          <a href="/#werkwijze" onClick={(e) => isHomePage ? scrollToSection(e, 'werkwijze') : undefined} className={styles.navLink}>Werkwijze</a>
          <a href="/#resultaten" onClick={(e) => isHomePage ? scrollToSection(e, 'resultaten') : undefined} className={styles.navLink}>Resultaten</a>
          <a href="/#prijzen" onClick={(e) => isHomePage ? scrollToSection(e, 'prijzen') : undefined} className={styles.navLink}>Tarieven</a>
          <a href="/klantenkaart.html" className={styles.navLink}>Klantenkaart</a>
          <a href="/#over-ons" onClick={(e) => isHomePage ? scrollToSection(e, 'over-ons') : undefined} className={styles.navLink}>Over mij</a>
        </nav>

        <a href="/#contact" onClick={(e) => isHomePage ? scrollToSection(e, 'contact') : undefined} className={styles.cta}>
          Plan een gesprek
        </a>
      </div>
    </header>
  );
};

export default Header;
