import React from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.videoBlock}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.container}>
        <h1 className={`${styles.title} reveal-up`} style={{ animationDelay: '0.1s' }}>
          Wij Bouwen
          <span>Digitale Groei.</span>
        </h1>
        
        <p className={`${styles.description} reveal-up`} style={{ animationDelay: '0.2s' }}>
          Een high-end webdesign agency. Wij bouwen schaalbare platformen die de aandacht opeisen en converteren. Geen bandwerk, pure klasse.
        </p>

        <div className={`${styles.ctaGroup} reveal-up`} style={{ animationDelay: '0.3s' }}>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary" style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
            Start Project
          </a>
          <a href="#werkwijze" onClick={(e) => scrollToSection(e, 'werkwijze')} className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-bg-primary)' }}>
            Onze Visie
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
