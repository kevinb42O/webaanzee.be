import React from 'react';
import styles from './SEOAnalyse.module.css';
import { scrollToSection } from '../utils/scrollToSection';

const SEOAnalyse: React.FC = () => {
  const analyseItems = [
    {
      icon: '🔍',
      title: 'Zichtbaarheids Audit',
      desc: 'Ik analyseer uw huidige positie in de zoekresultaten en vergelijk deze met uw grootste concurrenten.',
    },
    {
      icon: '⚡',
      title: 'Technisch Onderzoek',
      desc: 'Laadtijden, mobile responsiveness en code-structuur worden gewogen tegen de eisen van Google.',
    },
    {
      icon: '📍',
      title: 'Lokale SEO Check',
      desc: 'Google Mijn Bedrijf, maps optimalisatie en lokale zoekwoorden analyse voor uw regio.',
    },
    {
      icon: '📋',
      title: 'Actieplan',
      desc: 'U ontvangt een concreet, begrijpelijk plan om uw digitale positie te versterken.',
    },
  ];

  return (
    <section className={styles.section} id="seo-analyse">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.badge}>Gratis Service</span>
          <h2 className={styles.title}>Waar staat u nu?</h2>
          <p className={styles.description}>
            Vraag een vrijblijvende, diepgaande analyse aan van uw huidige website en ontdek de blinde vlekken.
          </p>
        </div>

        <div className={styles.grid}>
          {analyseItems.map((item, i) => (
            <div key={item.title} className={`${styles.card} reveal-up`} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.cardIcon}>{item.icon}</span>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.cta} reveal-up`} style={{ animationDelay: '0.4s' }}>
          <a
            href="https://wa.me/32494816714?text=Hallo%20Kevin%2C%20ik%20zou%20graag%20een%20gratis%20SEO-analyse%20aanvragen."
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Vraag Analyse Aan
          </a>
          <div className={styles.trustList}>
            <span className={styles.trustItem}>✓ Geen kosten</span>
            <span className={styles.trustItem}>✓ Geen verplichtingen</span>
            <span className={styles.trustItem}>✓ Rapport binnen 48u</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOAnalyse;
