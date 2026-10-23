import MobileAbout from './MobileAbout';
import { mobileMotionQuery, useMediaQuery } from '../utils/useMediaQuery';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity, type MotionStyle, type MotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './About.module.css';

export const DepthPortrait: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const rotateX = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const velocity = useVelocity(progress);
  const driftTarget = useTransform(velocity, (value) => Math.max(-16, Math.min(16, value * -35)));
  const drift = useSpring(driftTarget, { stiffness: 100, damping: 25 });
  const portraitZ = useTransform(progress, [0, .45, .92, 1], [-780, -420, 40, 60]);
  const portraitX = useTransform(progress, [0, .45, .92, 1], ['8%', '6%', '0%', '0%']);
  const coastZ = useTransform(progress, [0, .45, .92, 1], [-200, 60, 380, 420]);
  const coastX = useTransform(progress, [0, .45, .92, 1], ['0%', '-4%', '-64%', '-72%']);
  const coastOpacity = useTransform(progress, [0, .54, .88, 1], [1, 1, .12, .08]);
  const horizonZ = useTransform(progress, [0, .85, 1], [-900, -220, -200]);
  const horizonY = useTransform(progress, [0, .85], ['-10%', '-35%']);

  const followPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 8);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * -6);
  };

  return (
    <div className={styles.visual} onPointerMove={followPointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <motion.div className={styles.space} style={{ rotateX, rotateY, y: drift }}>
        <motion.div className={styles.horizonFrame} style={{ z: horizonZ, y: horizonY }} aria-hidden="true">
          <img src="/blankenberge-new.webp" alt="" loading="lazy" decoding="async" width="960" height="462" />
        </motion.div>
        <motion.div className={styles.portraitFrame} style={{ z: portraitZ, x: portraitX }}>
          <img src="/studiofoto.webp" alt="Kevin aan het werk in de studio" loading="lazy" decoding="async" width="800" height="800" />
        </motion.div>
        <motion.div className={styles.coastFrame} style={{ z: coastZ, x: coastX, '--plane-opacity': coastOpacity } as MotionStyle} aria-hidden="true">
          <img src="/blankenberge-new.webp" alt="" loading="lazy" decoding="async" width="960" height="462" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const StaticPortrait: React.FC = () => (
  <div className={`${styles.visual} ${styles.staticVisual}`}>
    <div className={styles.coastFrame} aria-hidden="true">
      <img src="/blankenberge-new.webp" alt="" loading="lazy" decoding="async" width="960" height="462" />
    </div>
    <div className={styles.portraitFrame}>
      <img src="/studiofoto.webp" alt="Kevin aan het werk in de studio" loading="lazy" decoding="async" width="800" height="800" />
    </div>
  </div>
);

const AboutContent: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end end'] });
  const surface = useTransform(scrollYProgress, [0, .45, .72, .98, 1], ['#eee8dc', '#eee8dc', '#dce8e7', '#efddd1', '#efddd1']);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)');
    const update = () => setAnimated(media.matches);
    update();
    media.addEventListener('change', update);
    // Hydration expands the scroll scenes above this section. Keep a direct About link aligned.
    const frame = window.requestAnimationFrame(() => {
      if (window.location.hash === '#over-ons') {
        sceneRef.current?.parentElement?.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener('change', update);
    };
  }, []);

  return (
    <section className={styles.section} id="over-ons" aria-labelledby="about-title">
      <div ref={sceneRef} className={`${styles.sequence} ${animated ? styles.animated : ''}`}>
        <motion.div key={`scene-${animated}`} className={styles.stage} style={animated ? { '--scene-surface': surface } as MotionStyle : undefined}>
          <div className={styles.atmosphere} aria-hidden="true" />
          <div className={styles.sceneGrid}>
            {animated ? <DepthPortrait progress={scrollYProgress} /> : <StaticPortrait />}
            <div className={styles.content}>
              <h2 id="about-title" className={styles.title}>Eén aanspreekpunt.<span>Van eerste idee tot werkende website.</span></h2>
              <div className={styles.textBlock}>
                <p>Ik ben Kevin, webdesigner en ontwikkelaar in Blankenberge. Ik werk de inhoud, het ontwerp en de techniek van je website uit. Je vragen en feedback komen rechtstreeks bij mij terecht.</p>
                <p>Voor de start spreken we af wat ik bouw, welke inhoud je aanlevert en hoe je feedback geeft. Ook hosting, beheer en wijzigingen na de oplevering staan in je offerte.</p>
              </div>
              <a className={styles.contactLink} href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>
                Vertel me over je idee <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
          </div>
          <p className={styles.signature}>Kevin — ontwerper &amp; ontwikkelaar bij Webaanzee</p>
        </motion.div>
      </div>

    </section>
  );
};

const About: React.FC = () => {
  const mobile = useMediaQuery(mobileMotionQuery);
  return mobile ? <MobileAbout /> : <AboutContent />;
};

export default About;
