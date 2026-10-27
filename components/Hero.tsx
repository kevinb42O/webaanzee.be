import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants, type MotionValue } from 'motion/react';
import styles from './Hero.module.css';
import HeroWaveCanvas from './HeroWaveCanvas';
import CoastalPortal from './CoastalPortal';
import PortalHeroCopy from './PortalHeroCopy';
import { heroIntroduction } from '../data/heroCopy';

const heroVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.22, staggerChildren: 0.1 },
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

const Hero: React.FC<{ progress?: MotionValue<number>; portalProgress?: MotionValue<number>; embedded?: boolean; touchEffects?: boolean }> = ({ progress, portalProgress, embedded = false, touchEffects = false }) => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const position = progress ?? scrollYProgress;
  const imageY = useTransform(position, [0, 1], ['0%', '4%']);
  const imageScale = useTransform(position, [0, 1], [1.01, 1.07]);
  const contentY = useTransform(position, [0, .7], [0, -48]);
  const contentOpacity = useTransform(position, [0, .12, .65], [1, 1, 0]);

  return (
    <motion.section ref={heroRef} className={`${styles.hero} ${embedded ? styles.embedded : ''}`} id={embedded ? undefined : 'home'} initial={shouldReduceMotion ? false : 'hidden'} animate="visible">
      <motion.div
        className={styles.imageBlock}
        initial={shouldReduceMotion || portalProgress ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div className={`${styles.imageSurface} ${portalProgress ? styles.portalImageSurface : ''}`} style={{ y: shouldReduceMotion ? 0 : imageY, scale: shouldReduceMotion ? 1.01 : imageScale }}>
          <img
            src="/blankenberge-pier-uhd.webp"
            alt=""
            width={3840}
            height={2160}
            fetchPriority="high"
          />
          <HeroWaveCanvas source="/blankenberge-pier-uhd.webp" reducedMotion={shouldReduceMotion === true} progress={portalProgress} touchReactive={touchEffects} />
        </motion.div>
      </motion.div>

      {portalProgress && <CoastalPortal progress={portalProgress} />}

      {portalProgress ? <motion.div className={styles.portalCopy} style={{ opacity: contentOpacity, y: contentY }}><PortalHeroCopy progress={portalProgress} /></motion.div> : <motion.div
        className={styles.container}
        variants={heroVariants}
        style={{ y: shouldReduceMotion ? 0 : contentY, opacity: shouldReduceMotion ? 1 : contentOpacity }}
      >
        <motion.p className={styles.eyebrow} variants={fadeVariants}>
          Webdesign &amp; development <span>Belgische kust</span>
        </motion.p>

        <h1 className={styles.title}>
          <span className={styles.lineMask}>
            <motion.span className={styles.titleLine} variants={revealVariants}>Je kent je vak.</motion.span>
          </span>
          <span className={styles.lineMask}>
            <motion.span className={`${styles.titleLine} ${styles.accentLine}`} variants={revealVariants}>Laat het<em> online zien.</em></motion.span>
          </span>
        </h1>
        
        <motion.p className={styles.description} variants={fadeVariants}>
          {heroIntroduction}
        </motion.p>

      </motion.div>}
    </motion.section>
  );
};

export default Hero;
