import React, { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'motion/react';
import styles from './Proof.module.css';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  website: string;
  videoSrc: string;
  imageSrc: string;
  tags: string[];
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
}

const caseStudies: CaseStudy[] = [
  { 
    id: 'hondaanzee', 
    title: 'Honden aan Zee', 
    description: 'Boekingsplatform op maat met geavanceerde zoekfilters.', 
    website: 'https://www.hondaanzee.be', 
    videoSrc: '/videos/hondaanzee.mp4',
    imageSrc: '/images/cases/hondaanzee.png',
    tags: ['Platform', 'Next.js'],
    testimonial: {
      quote: "Sinds de lancering van het nieuwe platform hebben we een enorme toename in boekingen. Het strakke design sluit perfect aan bij wat we wilden uitstralen naar hondenliefhebbers.",
      author: "Marie",
      role: "Oprichter, Honden aan Zee"
    }
  },
  { 
    id: 'fabrice', 
    title: 'Fabrice Goffin', 
    description: 'Strak en toegankelijk persoonlijk merk voor politieke transparantie.', 
    website: 'https://www.fabricegoffin.be', 
    videoSrc: '/videos/fabrice.mp4',
    imageSrc: '/images/cases/fabrice.png',
    tags: ['Branding', 'Portfolio'],
    testimonial: {
      quote: "Eindelijk een website die mijn politieke visie en realisaties helder en transparant overbrengt naar de burgers. De samenwerking was enorm vlot en professioneel.",
      author: "Fabrice Goffin",
      role: "Schepen van Oostende"
    }
  },
  { 
    id: 'carabus', 
    title: 'Carabus Ads', 
    description: 'High-performance B2B platform ontworpen voor maximale leadgeneratie.', 
    website: 'https://www.carabusads.be', 
    videoSrc: '/videos/carabus.mp4',
    imageSrc: '/images/cases/carabus.png',
    tags: ['Leadgen', 'React'],
    testimonial: {
      quote: "De technische fundering die voor ons is gelegd is ongezien sterk. Onze online leadgeneratie en conversies gingen onmiddellijk door het dak na livegang.",
      author: "Michaël",
      role: "Zaakvoerder, Carabus"
    }
  },
  { 
    id: 'cozy', 
    title: 'COZY Moments', 
    description: 'Digitale merkbeleving die de fysieke sfeer feilloos doortrekt naar online reserveringen.', 
    website: 'https://www.cozy-moments.be', 
    videoSrc: '/videos/cozy.mp4',
    imageSrc: '/images/cases/cozy.png',
    tags: ['Hospitality', 'Design'],
    testimonial: {
      quote: "Onze klanten voelen de unieke sfeer van onze zaak al voordat ze binnenstappen. Het online reserveren gaat nu sneller en makkelijker dan ooit tevoren.",
      author: "Eigenaars",
      role: "COZY Moments"
    }
  },
  { 
    id: 'dailygrind', 
    title: 'Daily Grind', 
    description: 'Naadloze e-commerce ervaring met focus op conversie en street-culture branding.', 
    website: 'https://www.daily-grind.be', 
    videoSrc: '/videos/dailygrind.mp4',
    imageSrc: '/images/cases/dailygrind.png',
    tags: ['E-commerce', 'UX'],
    testimonial: {
      quote: "De webshop weerspiegelt niet alleen 100% de core skate scene, maar converteert ook vele malen beter. We zijn super blij met de snelle laadtijden.",
      author: "Frederic",
      role: "Founder, Daily Grind"
    }
  },
  { 
    id: 'vishandel', 
    title: 'De Wulk', 
    description: 'Moderne digitale etalage voor ambachtelijke zeevruchten, gericht op lokale zichtbaarheid.', 
    website: 'https://www.vishandelolivierenkelly.be', 
    videoSrc: '/videos/vishandel.mp4',
    imageSrc: '/images/cases/vishandel.png',
    tags: ['Local SEO', 'Webdesign'],
    testimonial: {
      quote: "Onze verse, ambachtelijke producten worden nu eindelijk prachtig en digitaal in de kijker gezet. Dit is een grote stap vooruit voor onze lokale zichtbaarheid.",
      author: "Kelly",
      role: "Zaakvoerster, De Wulk"
    }
  },
];

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.1 },
  },
};

const revealVariants: Variants = {
  hidden: { y: '115%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    scale: 0.96,
    rotateX: -4,
    transformPerspective: 1000
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { 
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 1
    }
  }
};

const imageRevealVariants: Variants = {
  hidden: { scale: 1.3, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

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
    <motion.div 
      variants={cardVariants}
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
          <motion.div variants={imageRevealVariants} style={{ width: '100%', height: '100%' }}>
            <img src={caseItem.imageSrc} alt={caseItem.title} className={styles.mobileScreenshot} />
          </motion.div>
        </div>
        <div className={styles.baseContent}>
          <div className={styles.tagsContainer}>
            {caseItem.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <h3 className={styles.caseTitle}>{caseItem.title}</h3>
          <p className={styles.caseDescription}>{caseItem.description}</p>
        </div>
      </a>

      {/* POPOUT CARD (Ultra-wide Video + Testimonial that appears on hover) */}
      <a 
        href={caseItem.website} 
        target="_blank" 
        rel="noreferrer" 
        className={`${styles.popoutCard} ${isHovered ? styles.active : ''}`}
      >
        <div className={styles.popoutContent}>
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
          {caseItem.testimonial && (
            <div className={styles.testimonialWrapper}>
              <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
              <p className={styles.quote}>"{caseItem.testimonial.quote}"</p>
              <div className={styles.author}>
                <strong>{caseItem.testimonial.author}</strong>
                {caseItem.testimonial.role && <span>{caseItem.testimonial.role}</span>}
              </div>
            </div>
          )}
        </div>
      </a>
    </motion.div>
  );
};

const Proof: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section ref={sectionRef} className={styles.section} id="resultaten">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p className={styles.eyebrow} variants={fadeVariants}>
            Onze Cases <span>Bewezen resultaat</span>
          </motion.p>

          <h2 className={styles.title}>
            <span className={styles.lineMask}>
              <motion.span className={styles.titleLine} variants={revealVariants}>What you see is</motion.span>
            </span>
            <span className={styles.lineMask}>
              <motion.span className={`${styles.titleLine} ${styles.accentLine}`} variants={revealVariants}>what you get.</motion.span>
            </span>
          </h2>
          
          <motion.p className={styles.description} variants={fadeVariants}>
            Geen theorie, maar tastbaar bewijs. Ontdek hoe we met doordacht design en sterke techniek de online impact van onze klanten vergroten.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {caseStudies.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Proof;
