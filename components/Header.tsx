import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Header.module.css';
import Logo from './Logo';

interface HeaderProps {
  light?: boolean;
  opening?: boolean;
}

const Header: React.FC<HeaderProps> = ({ light = false, opening = false }) => {
  const [phase, setPhase] = useState<'hidden' | 'transparent' | 'solid'>(opening ? 'hidden' : 'transparent');
  const [hydrated, setHydrated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = phase === 'solid';

  useEffect(() => {
    setHydrated(true);
    let frame = 0;
    const handleScroll = () => {
      frame = 0;
      if (!opening) { setPhase(window.scrollY > 50 ? 'solid' : 'transparent'); return; }
      const sequence = document.querySelector<HTMLElement>('[data-home-sequence]');
      const stage = sequence?.querySelector<HTMLElement>('[data-home-stage]');
      if (sequence && stage) {
        const travel = sequence.offsetHeight - stage.offsetHeight;
        const time = Math.max(0, -sequence.getBoundingClientRect().top) / Math.max(1, travel) * Number(sequence.dataset.homeTotal);
        setPhase(time < Number(sequence.dataset.navReveal) ? 'hidden' : time < Number(sequence.dataset.navSolid) ? 'transparent' : 'solid');
        return;
      }
      const mobile = document.querySelector<HTMLElement>('[data-mobile-opening]');
      if (mobile?.dataset.mobileOpening === 'pinned') {
        const viewport = mobile.querySelector<HTMLElement>('section')?.offsetHeight ?? window.innerHeight;
        const distance = Number(getComputedStyle(mobile).getPropertyValue('--portal-distance'));
        const time = Math.max(0, -mobile.getBoundingClientRect().top) / viewport;
        setPhase(time < distance ? 'hidden' : time < distance + .5 ? 'transparent' : 'solid');
        return;
      }
      // Static and reduced-motion layouts have no passage to wait for.
      // Keep the initial server frame hidden until the desktop sequence has mounted.
      const enhancedDesktop = window.matchMedia('(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)').matches;
      if (enhancedDesktop && !sequence) { setPhase('hidden'); return; }
      const hero = document.querySelector<HTMLElement>('main #home section, main section#home, [data-mobile-opening] section');
      setPhase(hero && hero.getBoundingClientRect().bottom <= 80 ? 'solid' : 'transparent');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(handleScroll); };
    const observer = new MutationObserver(schedule);
    const main = document.querySelector('main');
    if (opening && main) observer.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-mobile-opening', 'data-nav-reveal', 'data-nav-solid'] });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [opening]);

  useEffect(() => { if (phase === 'hidden') setMenuOpen(false); }, [phase]);

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

  const isHomePage = typeof window === 'undefined' || window.location.pathname === '/' || window.location.pathname === '/index.html';
  const closeMenuAndScroll = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMenuOpen(false);
    if (isHomePage) scrollToSection(event, id);
  };

  return (
    <header data-opening-navigation={opening ? phase : undefined} inert={hydrated && phase === 'hidden' ? true : undefined} aria-hidden={hydrated && phase === 'hidden' ? true : undefined} className={`${styles.header} ${scrolled || light ? styles.scrolled : ''} ${phase === 'hidden' ? styles.openingHidden : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      {opening && <noscript><style>{`[data-opening-navigation] { opacity: 1 !important; visibility: visible !important; transform: none !important; pointer-events: auto !important; }`}</style></noscript>}
      <div className={styles.container}>
        <a href="/#home" onClick={(e) => isHomePage ? scrollToSection(e, 'home') : undefined} className={styles.logo} aria-label="Webaanzee, naar de startpagina">
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Hoofdnavigatie">
          <a href="/diensten/webdesign/" className={styles.navLink}>Diensten</a>
          <a href="/#resultaten" onClick={(e) => isHomePage ? scrollToSection(e, 'resultaten') : undefined} className={styles.navLink}>Projecten</a>
          <a href="/webdesign-belgische-kust/" className={styles.navLink}>Kustregio</a>
          <a href="/inzichten/" className={styles.navLink}>Uitleg en aanpak</a>
        </nav>

        <a href="/#contact" onClick={(e) => isHomePage ? scrollToSection(e, 'contact') : undefined} className={styles.cta}>
          Neem contact op
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
              <a href="/diensten/webdesign/" onClick={() => setMenuOpen(false)}><span>Diensten</span><small>01</small></a>
              <a href="/#resultaten" onClick={(event) => closeMenuAndScroll(event, 'resultaten')}><span>Projecten</span><small>02</small></a>
              <a href="/webdesign-belgische-kust/" onClick={() => setMenuOpen(false)}><span>Kustregio</span><small>03</small></a>
              <a href="/inzichten/" onClick={() => setMenuOpen(false)}><span>Uitleg en aanpak</span><small>04</small></a>
            </div>
          </div>

          <div className={styles.mobileNavFooter}>
            <div className={styles.mobileExplore}>
              <span>Meer ontdekken</span>
              <a href="/klantenkaart.html" onClick={() => setMenuOpen(false)}>Digitale klantenkaart <i aria-hidden="true">↗</i></a>
              <a href="/pwayment.html" onClick={() => setMenuOpen(false)}>PWAYMENT POS <i aria-hidden="true">↗</i></a>
              <a href="/cases/" onClick={() => setMenuOpen(false)}>Alle projecten <i aria-hidden="true">↗</i></a>
            </div>
            <a href="/#contact" className={styles.mobileCta} onClick={(event) => closeMenuAndScroll(event, 'contact')}>
              Neem contact op <span aria-hidden="true">→</span>
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
