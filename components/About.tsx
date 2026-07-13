import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <section className={styles.section} id="over-ons">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={styles.grid}>
          
          <div className={`${styles.imageWrapper} reveal-up parallax-bg`}>
            {/* Replaced selfie with a high-end Unsplash office/design placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
              alt="Design Studio" 
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </div>

          <div className={`${styles.content} reveal-up`} style={{ animationDelay: '0.2s' }}>
            <span className={styles.label}>Zo werk ik</span>
            <h2 className={styles.title}>Eén bouwer.<br/>Direct contact.</h2>
            
            <div className={styles.textBlock}>
              <p>
                Geen accountmanagers, geen support-tickets, geen team dat je vragen doorschuift. Je werkt rechtstreeks met mij — de persoon die je site ontwerpt én bouwt.
              </p>
              <p>
                Ik begin niet met bouwen, maar met luisteren: wie ben je, wat wil je uitstralen, wat moet je site opleveren? Daarna denk ik kritisch mee en blijf ik verfijnen tot elk detail klopt. Niet tot het "goed genoeg" is — tot het écht goed is.
              </p>
            </div>

            <div className={styles.quoteBlock}>
              <p className={styles.quoteText}>
                "Kevin behoort tot die zeldzame mensen die niet stoppen wanneer iets 'goed genoeg' is. Hij blijft verbeteren tot het resultaat écht goed is."
              </p>
              <p className={styles.quoteAuthor}>— Fabrice Goffin, ondernemer & schepen</p>
            </div>

            <div className={styles.trustSignals}>
              <div className={styles.signal}>
                <span className={styles.signalTitle}>Eén aanspreekpunt</span>
                <span className={styles.signalSub}>Van eerste gesprek tot livegang</span>
              </div>
              <div className={styles.signal}>
                <span className={styles.signalTitle}>Regio Kust & Brugge</span>
                <span className={styles.signalSub}>Lokaal verankerd</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
