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
            <span className={styles.label}>De Aanpak</span>
            <h2 className={styles.title}>Boutique Agency.<br/>Direct Contact.</h2>
            
            <div className={styles.textBlock}>
              <p>
                Wij werken niet met accountmanagers of ingewikkelde support-tickets. U krijgt directe toegang tot de ontwikkelaars en ontwerpers die uw platform bouwen.
              </p>
              <p>
                Door onze gespecialiseerde aanpak kunnen wij razendsnel schakelen en leveren we digitale ervaringen die opboksen tegen de grootste bureaus.
              </p>
            </div>

            <div className={styles.quoteBlock}>
              <p className={styles.quoteText}>
                "De snelheid waarmee werd geschakeld en het directe contact maakten het proces extreem efficiënt."
              </p>
              <p className={styles.quoteAuthor}>— Partner, Vishandel B.</p>
            </div>

            <div className={styles.trustSignals}>
              <div className={styles.signal}>
                <span className={styles.signalTitle}>Top Service</span>
                <span className={styles.signalSub}>Persoonlijk en vakkundig</span>
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
