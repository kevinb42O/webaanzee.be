import React, { useRef, useState } from 'react';
import styles from './Proof.module.css';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  website: string;
  videoSrc: string;
  imageSrc: string;
}

const caseStudies: CaseStudy[] = [
  { 
    id: 'hondaanzee', 
    title: 'Honden aan Zee', 
    description: 'Hét platform voor honden aan de Belgische kust', 
    website: 'https://www.hondaanzee.be', 
    videoSrc: '/videos/hondaanzee.mp4',
    imageSrc: '/images/cases/hondaanzee.png'
  },
  { 
    id: 'fabrice', 
    title: 'Fabrice Goffin', 
    description: 'Schepen van Oostende', 
    website: 'https://www.fabricegoffin.be', 
    videoSrc: '/videos/fabrice.mp4',
    imageSrc: '/images/cases/fabrice.png'
  },
  { 
    id: 'carabus', 
    title: 'Carabus Ads', 
    description: 'Google Ads, Social Ads & Funnels', 
    website: 'https://www.carabusads.be', 
    videoSrc: '/videos/carabus.mp4',
    imageSrc: '/images/cases/carabus.png'
  },
  { 
    id: 'cozy', 
    title: 'COZY Moments', 
    description: 'Koffiebar & Cocktails in Blankenberge', 
    website: 'https://www.cozy-moments.be', 
    videoSrc: '/videos/cozy.mp4',
    imageSrc: '/images/cases/cozy.png'
  },
  { 
    id: 'dailygrind', 
    title: 'Daily Grind', 
    description: 'Core Skateshop Blankenberge', 
    website: 'https://www.daily-grind.be', 
    videoSrc: '/videos/dailygrind.mp4',
    imageSrc: '/images/cases/dailygrind.png'
  },
  { 
    id: 'vishandel', 
    title: 'De Wulk', 
    description: 'Verse Vis & Zeevruchten', 
    website: 'https://www.vishandelolivierenkelly.be', 
    videoSrc: '/videos/vishandel.mp4',
    imageSrc: '/images/cases/vishandel.png'
  },
];

const CaseCard: React.FC<{ caseItem: CaseStudy }> = ({ caseItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    // Add a tiny delay so it doesn't pop instantly if just moving the mouse across
    hoverTimeout = setTimeout(() => {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log('Video play failed:', e));
      }
    }, 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video
    }
  };

  return (
    <div 
      className={styles.caseWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* BASE CARD (Mobile Screenshot) */}
      <a 
        href={caseItem.website} 
        target="_blank" 
        rel="noreferrer" 
        className={styles.baseCard}
      >
        <div className={styles.imageWrapper}>
          <img src={caseItem.imageSrc} alt={caseItem.title} className={styles.mobileScreenshot} />
        </div>
        <div className={styles.baseContent}>
          <h3 className={styles.caseTitle}>{caseItem.title}</h3>
          <p className={styles.caseDescription}>{caseItem.description}</p>
        </div>
      </a>

      {/* POPOUT CARD (16:9 Video that appears on hover) */}
      <a 
        href={caseItem.website} 
        target="_blank" 
        rel="noreferrer" 
        className={`${styles.popoutCard} ${isHovered ? styles.active : ''}`}
      >
        <div className={styles.videoWrapper}>
          <video 
            ref={videoRef}
            src={caseItem.videoSrc} 
            className={styles.video}
            loop 
            muted 
            playsInline
            preload="metadata"
          />
        </div>
      </a>
    </div>
  );
};

const Proof: React.FC = () => {
  return (
    <section className={styles.section} id="resultaten">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.badge}>Onze Cases</span>
          <h2 className={styles.title}>What you see is <br/> <span className={styles.highlight}>what you get.</span></h2>
          <p className={styles.description}>
            Bekijk enkele van onze recente projecten. Hover over een case voor een preview of klik om de live website te bezoeken.
          </p>
        </div>

        <div className={`${styles.grid} reveal-up`}>
          {caseStudies.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proof;
