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

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={styles.logo}>
          Webaanzee<span className={styles.logoDot}>.</span>
        </a>

        <nav className={styles.nav}>
          <a href="#werkwijze" onClick={(e) => scrollToSection(e, 'werkwijze')} className={styles.navLink}>Werkwijze</a>
          <a href="#resultaten" onClick={(e) => scrollToSection(e, 'resultaten')} className={styles.navLink}>Resultaten</a>
          <a href="#prijzen" onClick={(e) => scrollToSection(e, 'prijzen')} className={styles.navLink}>Tarieven</a>
          <a href="#klantenkaart" onClick={(e) => scrollToSection(e, 'klantenkaart')} className={styles.navLink}>Klantenkaart</a>
          <a href="#over-ons" onClick={(e) => scrollToSection(e, 'over-ons')} className={styles.navLink}>Over mij</a>
        </nav>

        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={styles.cta}>
          Plan een gesprek
        </a>
      </div>
    </header>
  );
};

export default Header;
