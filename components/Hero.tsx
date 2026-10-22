import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants, type MotionValue } from 'motion/react';
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

const arrowVariants: Variants = {
  visible: { x: 0 },
  hover: { x: 4 },
};

const Hero: React.FC<{ progress?: MotionValue<number>; embedded?: boolean }> = ({ progress, embedded = false }) => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const position = progress ?? scrollYProgress;
  const imageY = useTransform(position, [0, 1], ['0%', '4%']);
  const imageScale = useTransform(position, [0, 1], [1.01, 1.07]);
  const contentY = useTransform(position, [0, .7], [0, -90]);
  const contentOpacity = useTransform(position, [0, .12, .65], [1, 1, 0]);

  return (
    <motion.section ref={heroRef} className={`${styles.hero} ${embedded ? styles.embedded : ''}`} id={embedded ? undefined : 'home'} initial="hidden" animate="visible">
      <motion.div
        className={styles.imageBlock}
        initial={shouldReduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src="/blankenberge-pier-uhd.webp"
          alt=""
          width={3840}
          height={2160}
          fetchPriority="high"
          style={{
            y: shouldReduceMotion ? 0 : imageY,
            scale: shouldReduceMotion ? 1.01 : imageScale,
          }}
        />
      </motion.div>

      <motion.div
        className={styles.container}
        variants={heroVariants}
        style={{ y: shouldReduceMotion ? 0 : contentY, opacity: shouldReduceMotion ? 1 : contentOpacity }}
      >
        <motion.p className={styles.eyebrow} variants={fadeVariants}>
          Webdesign &amp; development <span>Belgische kust</span>
        </motion.p>

        <h1 className={styles.title}>
          <span className={styles.lineMask}>
            <motion.span className={styles.titleLine} variants={revealVariants}>Je beste werk verdient</motion.span>
          </span>
          <span className={styles.lineMask}>
            <motion.span className={`${styles.titleLine} ${styles.accentLine}`} variants={revealVariants}>een website op hetzelfde niveau.</motion.span>
          </span>
        </h1>
        
        <motion.p className={styles.description} variants={fadeVariants}>
          Webaanzee ontwerpt en bouwt onderscheidende websites voor ondernemers die online even sterk willen overkomen als in hun eigen werk.
        </motion.p>

        <motion.div className={styles.ctaGroup} variants={fadeVariants}>
          <motion.a
            href="#resultaten"
            onClick={(event) => scrollToSection(event, 'resultaten')}
            className={styles.primaryCta}
            whileHover={shouldReduceMotion ? undefined : 'hover'}
          >
            <span>Bekijk het werk</span>
            <motion.span className={styles.arrow} variants={arrowVariants} aria-hidden="true">→</motion.span>
          </motion.a>
          <motion.a href="#contact" onClick={(event) => scrollToSection(event, 'contact')} className={styles.secondaryLink}>
            Plan een gesprek <span aria-hidden="true">↗</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
