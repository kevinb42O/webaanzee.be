import React from 'react';
import styles from './ProblemSolution.module.css';

const ProblemSolution: React.FC = () => {
  return (
    <section className={styles.section} id="werkwijze">
      <div className={styles.blob}></div>
      <div className={`${styles.container} animate-on-scroll`}>
        
        <div className={styles.contentLeft}>
          <span className={`${styles.badge} reveal-up`}>Waarom geen bureau?</span>
          <h2 className={`${styles.title} reveal-up`}>
            Bij een bureau betaal je de overhead.<br/>Bij mij betaal je het werk.
          </h2>
          <p className={`${styles.description} reveal-up`}>
            Je kent het verhaal: een accountmanager die je vragen doorgeeft, een junior die het bouwt, en facturen die de tussenlagen betalen. Zo werk ik niet — er is hier niemand anders. Je werkt van het eerste gesprek tot de livegang met de persoon die je site effectief bouwt.
          </p>

          <div className={styles.grid}>
            <div className={`${styles.card} reveal-up`}>
              <span className={styles.cardIcon}>👂</span>
              <h3 className={styles.cardTitle}>Ik luister voor ik bouw</h3>
              <p className={styles.cardText}>
                Eerst begrijpen wie je bent, wat je wil uitstralen en wat je site moet opleveren. Pas dan schrijf ik de eerste regel code.
              </p>
            </div>
            
            <div className={`${styles.card} reveal-up`}>
              <span className={styles.cardIcon}>⚡</span>
              <h3 className={styles.cardTitle}>Sneller schakelen, minder kosten</h3>
              <p className={styles.cardText}>
                Geen vergaderingen over vergaderingen. Eén aanspreekpunt betekent kortere lijnen, snellere oplevering en een prijs zonder verborgen overhead.
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
