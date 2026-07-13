import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Hero.module.css';

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

const ctaVariants: Variants = {
  visible: { scale: 1 },
  hover: {
    scale: 1.018,
    transition: { type: 'spring', stiffness: 380, damping: 24 },
  },
  tap: {
    scale: 0.985,
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  },
};

const arrowVariants: Variants = {
  visible: { x: 0 },
  hover: { x: 4 },
  tap: { x: 1 },
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <motion.section ref={heroRef} className={styles.hero} id="home" initial="hidden" animate="visible">
      <motion.div
        className={styles.videoBlock}
        initial={shouldReduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
          aria-hidden="true"
          style={{
            y: shouldReduceMotion ? 0 : videoY,
            scale: shouldReduceMotion ? 1.03 : videoScale,
          }}
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </motion.video>
      </motion.div>

      <motion.div
        className={styles.container}
        variants={heroVariants}
        style={{ y: shouldReduceMotion ? 0 : contentY, opacity: shouldReduceMotion ? 1 : contentOpacity }}
      >
        <motion.p className={styles.eyebrow} variants={fadeVariants}>
          Webdesign &amp; development <span>Brugge</span>
        </motion.p>

        <h1 className={styles.title}>
          <span className={styles.lineMask}>
            <motion.span className={styles.titleLine} variants={revealVariants}>Mooi is niet genoeg.</motion.span>
          </span>
          <span className={styles.lineMask}>
            <motion.span className={`${styles.titleLine} ${styles.accentLine}`} variants={revealVariants}>Je website moet werken.</motion.span>
          </span>
        </h1>
        
        <motion.p className={styles.description} variants={fadeVariants}>
          Ik ontwerp en bouw snelle websites en web-apps die je verhaal helder maken en bezoekers overtuigen. Je werkt rechtstreeks met mij, van eerste idee tot livegang.
        </motion.p>

        <motion.div className={styles.ctaGroup} variants={fadeVariants}>
          <motion.a
            href="#resultaten"
            onClick={(event) => scrollToSection(event, 'resultaten')}
            className={styles.primaryCta}
            variants={ctaVariants}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            whileTap={shouldReduceMotion ? undefined : 'tap'}
          >
            <span className={styles.buttonLabel}>Bekijk mijn werk</span>
            <motion.span className={styles.arrow} variants={arrowVariants} aria-hidden="true">→</motion.span>
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(event) => scrollToSection(event, 'contact')}
            className={styles.secondaryCta}
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            Vertel me over je project
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#werkwijze"
        onClick={(event) => scrollToSection(event, 'werkwijze')}
        className={styles.scrollCue}
        aria-label="Scroll naar werkwijze"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.7 }}
      >
        <motion.span
          animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </motion.section>
  );
};

export default Hero;
