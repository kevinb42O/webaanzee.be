import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Header.module.css';

interface HeaderProps {
  light?: boolean;
}

const Header: React.FC<HeaderProps> = ({ light = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-menu-open');
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('mobile-menu-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  const closeMenuAndScroll = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMenuOpen(false);
    if (isHomePage) scrollToSection(event, id);
  };

  return (
    <header className={`${styles.header} ${scrolled || light ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="/#home" onClick={(e) => isHomePage ? scrollToSection(e, 'home') : undefined} className={styles.logo}>
          Webaanzee<span className={styles.logoDot}>.</span>
        </a>

        <nav className={styles.nav} aria-label="Hoofdnavigatie">
          <a href="/#werkwijze" onClick={(e) => isHomePage ? scrollToSection(e, 'werkwijze') : undefined} className={styles.navLink}>Visie</a>
          <a href="/#resultaten" onClick={(e) => isHomePage ? scrollToSection(e, 'resultaten') : undefined} className={styles.navLink}>Resultaten</a>
          <a href="/#prijzen" onClick={(e) => isHomePage ? scrollToSection(e, 'prijzen') : undefined} className={styles.navLink}>Samenwerken</a>
          <a href="/#over-ons" onClick={(e) => isHomePage ? scrollToSection(e, 'over-ons') : undefined} className={styles.navLink}>Over mij</a>
        </nav>

        <a href="/#contact" onClick={(e) => isHomePage ? scrollToSection(e, 'contact') : undefined} className={styles.cta}>
          Plan een gesprek
        </a>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Sluit navigatie' : 'Open navigatie'}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="mobile-navigation" className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`} aria-label="Mobiele navigatie" aria-hidden={!menuOpen}>
        <div className={styles.mobileNavInner}>
          <div>
            <p className={styles.mobileNavLabel}>Navigatie</p>
            <div className={styles.mobileLinks}>
              <a href="/#werkwijze" onClick={(event) => closeMenuAndScroll(event, 'werkwijze')}><span>Visie</span><small>01</small></a>
              <a href="/#resultaten" onClick={(event) => closeMenuAndScroll(event, 'resultaten')}><span>Resultaten</span><small>02</small></a>
              <a href="/#prijzen" onClick={(event) => closeMenuAndScroll(event, 'prijzen')}><span>Samenwerken</span><small>03</small></a>
              <a href="/#over-ons" onClick={(event) => closeMenuAndScroll(event, 'over-ons')}><span>Over mij</span><small>04</small></a>
            </div>
          </div>

          <div className={styles.mobileNavFooter}>
            <div className={styles.mobileExplore}>
              <span>Meer ontdekken</span>
              <a href="/klantenkaart.html" onClick={() => setMenuOpen(false)}>Digitale klantenkaart <i aria-hidden="true">↗</i></a>
              <a href="/pwayment.html" onClick={() => setMenuOpen(false)}>PWAYMENT POS <i aria-hidden="true">↗</i></a>
              <a href="/blog/waarom-website-nodig-2026.html" onClick={() => setMenuOpen(false)}>Inzichten &amp; blog <i aria-hidden="true">↗</i></a>
            </div>
            <a href="/#contact" className={styles.mobileCta} onClick={(event) => closeMenuAndScroll(event, 'contact')}>
              Plan een gesprek <span aria-hidden="true">→</span>
            </a>
            <div className={styles.mobileContact}>
              <a href="tel:0494816714">0494 81 67 14</a>
              <a href="mailto:kevin@webaanzee.be">kevin@webaanzee.be</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
