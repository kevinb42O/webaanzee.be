import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <section className={styles.section} id="over-ons">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={styles.grid}>
          
          <div className={`${styles.imageWrapper} reveal-up parallax-bg`}>
            <img 
              src="/studiofoto.webp"
              alt="Aan het werk in de studio"
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </div>

          <div className={`${styles.content} reveal-up`} style={{ animationDelay: '0.2s' }}>
            <span className={styles.label}>Over mij</span>
            <h2 className={styles.title}>Eén aanspreekpunt.<br/>Van eerste idee tot werkende website.</h2>
            
            <div className={styles.textBlock}>
              <p>
                Ik ben Kevin. Je praat vanaf het eerste gesprek rechtstreeks met mij — en ik blijf betrokken tot je website live staat.
              </p>
              <p>
                Strategie, inhoud, ontwerp en ontwikkeling komen zo uit dezelfde handen. Dat maakt beslissingen sneller en het eindresultaat sterker.
              </p>
            </div>

            <div className={styles.quoteBlock}>
              <p className={styles.quoteText}>
                Goed digitaal werk ontstaat wanneer het verhaal, de vorm en de techniek vanaf het begin samen worden bedacht.
              </p>
              <p className={styles.quoteAuthor}>Kevin — ontwerper &amp; developer bij Webaanzee</p>
            </div>

            <div className={styles.trustSignals}>
              <div className={styles.signal}>
                <span className={styles.signalTitle}>Eén aanspreekpunt</span>
                <span className={styles.signalSub}>Van eerste idee tot livegang</span>
              </div>
              <div className={styles.signal}>
                <span className={styles.signalTitle}>Eén geheel</span>
                <span className={styles.signalSub}>Ontwerp en bouw in dezelfde handen</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
