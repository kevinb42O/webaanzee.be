import React from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Offer.module.css';

const Offer: React.FC = () => {
  return (
    <section className={styles.section} id="prijzen">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.badge}>Tarieven</span>
          <h2 className={styles.title}>Vaste prijzen.<br/>Vooraf duidelijk.</h2>
          <p className={styles.description}>
            Je weet exact wat je krijgt en wat het kost — geen uurtje-factuurtje achteraf, geen verborgen overhead.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Basis Pakket */}
          <div className={`${styles.card} reveal-up`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Professional</h3>
              <div className={styles.cardPrice}>€950 <span>/eenmalig</span></div>
            </div>
            
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                Volledig custom design
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                Extreem snelle laadtijden (React/Vite)
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                SEO Geoptimaliseerd voor Google
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                Mobile-first responsive layout
              </li>
            </ul>

            <div className={styles.cardAction}>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                Kies Professional
              </a>
            </div>
          </div>

          {/* Premium Pakket */}
          <div className={`${styles.card} reveal-up`} style={{ animationDelay: '0.2s', backgroundColor: 'var(--color-text-primary)' }}>
            <div className={styles.cardHeader} style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <h3 className={styles.cardTitle} style={{ color: 'white' }}>Enterprise</h3>
              <div className={styles.cardPrice} style={{ color: 'var(--color-accent-gold)' }}>€1950 <span>/eenmalig</span></div>
            </div>
            
            <ul className={styles.featureList}>
              <li className={styles.featureItem} style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span className={styles.checkIcon}>✓</span>
                Alles in Professional
              </li>
              <li className={styles.featureItem} style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span className={styles.checkIcon}>✓</span>
                Uitgebreide A/B test mogelijkheden
              </li>
              <li className={styles.featureItem} style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span className={styles.checkIcon}>✓</span>
                E-commerce / Boeking integraties
              </li>
              <li className={styles.featureItem} style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span className={styles.checkIcon}>✓</span>
                Maandelijkse strategische call
              </li>
            </ul>

            <div className={styles.cardAction}>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="btn btn-primary"
                style={{ width: '100%', background: 'var(--color-accent-gold)', color: '#111' }}
              >
                Kies Enterprise
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
