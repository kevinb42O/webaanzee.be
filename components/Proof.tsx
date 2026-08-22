import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import styles from './Proof.module.css';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  website: string;
  videoSrc: string;
  imageSrc: string;
  tags: string[];
  projectNote?: {
    label: string;
    body: string;
    facts: string[];
  };
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
}

export const caseStudies: CaseStudy[] = [
  { 
    id: 'hondaanzee', 
    title: 'Hond aan Zee',
    description: 'Een praktisch kustplatform dat hondenbezitters snel naar de juiste strandregels, losloopzones, wandelingen en adressen leidt.',
    website: 'https://www.hondaanzee.be', 
    videoSrc: '/videos/hondaanzee.mp4',
    imageSrc: '/images/cases/hondaanzee.png',
    tags: ['Kustplatform', 'Praktische gids'],
    projectNote: {
      label: 'Bereik & relevantie',
      body: 'Een herkenbare vaste waarde voor hondeneigenaars die de Belgische kust bezoeken.',
      facts: [
        'Pieken tot 98.000 bezoekers per maand in het seizoen',
        'HondAanZee-stickers bij deelnemende zaken',
        'Opgepikt in krantenartikels'
      ]
    }
  },
  { 
    id: 'fabrice', 
    title: 'Fabrice Goffin', 
    description: 'Een heldere, persoonlijke publieke site voor een Oostends schepen — met standpunten, nieuws en een directe lijn naar inwoners.',
    website: 'https://www.fabricegoffin.be', 
    videoSrc: '/videos/fabrice.mp4',
    imageSrc: '/images/cases/fabrice.png',
    tags: ['Publieke communicatie', 'Oostende'],
    testimonial: {
      quote: "Eindelijk een website die mijn politieke visie en realisaties helder en transparant overbrengt naar de burgers. De samenwerking was enorm vlot en professioneel.",
      author: "Fabrice Goffin",
      role: "Schepen van Oostende"
    }
  },
  { 
    id: 'carabus', 
    title: 'Carabus Ads', 
    description: 'Website voor een performance-marketingbureau dat werkt met Google Ads, social ads en funnels.',
    website: 'https://www.carabusads.be', 
    videoSrc: '/videos/carabus.mp4',
    imageSrc: '/images/cases/carabus.png',
    tags: ['Performance', 'Marketing'],
    testimonial: {
      quote: "De technische fundering die voor ons is gelegd is ongezien sterk. Onze online leadgeneratie en conversies gingen onmiddellijk door het dak na livegang.",
      author: "Michaël",
      role: "Zaakvoerder, Carabus"
    }
  },
  { 
    id: 'cozy', 
    title: 'COZY Moments', 
    description: 'Website voor de koffiebar en cocktailbar aan de Grote Markt in Blankenberge, met drankkaart, praktische info en digitale spaarkaart.',
    website: 'https://www.cozy-moments.be', 
    videoSrc: '/videos/cozy.mp4',
    imageSrc: '/images/cases/cozy.png',
    tags: ['Horeca', 'Loyalty'],
    testimonial: {
      quote: "Onze klanten voelen de unieke sfeer van onze zaak al voordat ze binnenstappen. Het online reserveren gaat nu sneller en makkelijker dan ooit tevoren.",
      author: "Eigenaars",
      role: "COZY Moments"
    }
  },
  { 
    id: 'dailygrind', 
    title: 'Daily Grind', 
    description: 'Webshop en communityplatform voor de Blankenbergse core skateshop, met boards, streetwear, sneakers en een skatepark guide.',
    website: 'https://www.daily-grind.be', 
    videoSrc: '/videos/dailygrind.mp4',
    imageSrc: '/images/cases/dailygrind.png',
    tags: ['E-commerce', 'Community'],
    testimonial: {
      quote: "De webshop weerspiegelt niet alleen 100% de core skate scene, maar converteert ook vele malen beter. We zijn super blij met de snelle laadtijden.",
      author: "Frederic",
      role: "Founder, Daily Grind"
    }
  },
  { 
    id: 'vishandel', 
    title: 'De Wulk', 
    description: 'Website voor de viswinkel van Olivier & Kelly in Blankenberge, met dagverse vis, huisbereide gerechten, zeevruchtenschotels en bestelinformatie.',
    website: 'https://www.vishandelolivierenkelly.be', 
    videoSrc: '/videos/vishandel.mp4',
    imageSrc: '/images/cases/vishandel.png',
    tags: ['Lokale handel', 'Horeca'],
    testimonial: {
      quote: "Onze verse, ambachtelijke producten worden nu eindelijk prachtig en digitaal in de kijker gezet. Dit is een grote stap vooruit voor onze lokale zichtbaarheid.",
      author: "Kelly",
      role: "Zaakvoerster, De Wulk"
    }
  },
  {
    id: 'atelierrembrandt',
    title: 'Atelier Rembrandt',
    description: 'Digitale collectie voor zeldzame boeken, Oude Meesters en historische kunstobjecten, met aandacht voor onderzoek, documentatie en herkomst.',
    website: 'https://www.atelierrembrandt.com/',
    videoSrc: '/videos/atelierrembrandt.mp4',
    imageSrc: '/images/cases/atelierrembrandt.png',
    tags: ['Kunst & antiquariaat', 'Collectie'],
  },
  {
    id: 'pwayment',
    title: 'PWAYMENT POS',
    description: 'Een retailplatform dat kassa, voorraad, klanten, webshop en inzichten samenbrengt voor Belgische winkels.',
    website: 'https://pwayment.vercel.app/',
    videoSrc: '/videos/pwayment.mp4',
    imageSrc: '/images/cases/pwayment.png',
    tags: ['Retailtech', 'POS-systeem'],
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

const CaseCard: React.FC<{ caseItem: CaseStudy; featured?: boolean }> = ({ caseItem, featured = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPreview = () => {
    videoRef.current?.play().catch(() => undefined);
  };

  const stopPreview = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.article
      variants={cardVariants}
      className={`${styles.caseCard} ${featured ? styles.featuredCard : ''} ${caseItem.id === 'pwayment' ? styles.wideCard : ''}`}
    >
      <a
        href={caseItem.website} 
        target="_blank" 
        rel="noreferrer" 
        className={styles.caseLink}
        aria-label={`Bekijk ${caseItem.title}`}
        onMouseEnter={playPreview}
        onMouseLeave={stopPreview}
        onFocus={playPreview}
        onBlur={stopPreview}
      >
        <div className={styles.visual}>
          <img src={caseItem.imageSrc} alt="" className={styles.projectImage} />
          <video
            ref={videoRef}
            className={styles.projectVideo}
            src={caseItem.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className={styles.visualShade} />
          <span className={styles.caseNumber} aria-hidden="true">{String(caseStudies.indexOf(caseItem) + 1).padStart(2, '0')}</span>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.tagsContainer}>
            {caseItem.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.titleRow}>
            <h3 className={styles.caseTitle}>{caseItem.title}</h3>
            <span className={styles.linkIcon} aria-hidden="true"><ArrowUpRight strokeWidth={1.8} /></span>
          </div>
          <p className={styles.caseDescription}>{caseItem.description}</p>
          {featured && caseItem.projectNote && (
            <div className={styles.projectNote}>
              <p className={styles.noteLabel}>{caseItem.projectNote.label}</p>
              <p className={styles.noteBody}>{caseItem.projectNote.body}</p>
              <ul className={styles.noteFacts}>
                {caseItem.projectNote.facts.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
            </div>
          )}
          {featured && !caseItem.projectNote && caseItem.testimonial && (
            <blockquote className={styles.featuredQuote}>
              <p>“{caseItem.testimonial.quote}”</p>
              <footer>{caseItem.testimonial.author}<span>{caseItem.testimonial.role}</span></footer>
            </blockquote>
          )}
        </div>
      </a>
    </motion.article>
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
            Resultaten <span>Echt werk</span>
          </motion.p>

          <h2 className={styles.title}>
            <span className={styles.lineMask}>
            <motion.span className={styles.titleLine} variants={revealVariants}>Werk dat een zaak</motion.span>
            </span>
            <span className={styles.lineMask}>
            <motion.span className={`${styles.titleLine} ${styles.accentLine}`} variants={revealVariants}>merkbaar vooruithelpt.</motion.span>
            </span>
          </h2>
          
          <motion.p className={styles.description} variants={fadeVariants}>
            Een selectie van werk voor zaken met een duidelijke eigenheid — en een website die daar recht aan doet.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <CaseCard caseItem={caseStudies[0]} featured />
          {caseStudies.slice(1).map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Proof;
