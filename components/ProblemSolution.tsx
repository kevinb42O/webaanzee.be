import React from 'react';
import styles from './ProblemSolution.module.css';

const ProblemSolution: React.FC = () => {
  return (
    <section className={styles.section} id="werkwijze">
      <div className={styles.blob}></div>
      <div className={`${styles.container} animate-on-scroll`}>
        
        <div className={styles.contentLeft}>
          <span className={`${styles.badge} reveal-up`}>Onze Visie</span>
          <h2 className={`${styles.title} reveal-up`}>
            Geen bandwerk.<br/>Puur vakmanschap.
          </h2>
          <p className={`${styles.description} reveal-up`}>
            De meeste websites zijn visueel aantrekkelijk, maar falen om bezoekers om te zetten in betalende klanten. Wij bouwen platformen met één doel: meetbare groei voor uw bedrijf.
          </p>

          <div className={styles.grid}>
            <div className={`${styles.card} reveal-up`}>
              <span className={styles.cardIcon}>⚡</span>
              <h3 className={styles.cardTitle}>Razendsnelle Prestaties</h3>
              <p className={styles.cardText}>
                We gebruiken de nieuwste technologieën (React, Vite) om uw site binnen milliseconden te laten laden. Google beloont dit met hogere posities.
              </p>
            </div>
            
            <div className={`${styles.card} reveal-up`}>
              <span className={styles.cardIcon}>🎯</span>
              <h3 className={styles.cardTitle}>Conversie Gericht</h3>
              <p className={styles.cardText}>
                Bezoekers moeten klanten worden. Elke knop, elke tekst en elk beeld is strategisch geplaatst om de bezoeker naar actie te sturen.
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.imageWrapper} reveal-scale parallax-bg`}>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
            alt="Team overleg" 
            className={styles.image}
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;
