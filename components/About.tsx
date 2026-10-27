import { useDesktopMotion } from '../utils/useDesktopMotion';
import MobileAbout from './MobileAbout';
import CoastalTitle from './CoastalTitle';
import { windowProgress } from '../utils/homeChoreography';
import { mobileMotionQuery, useMediaQuery } from '../utils/useMediaQuery';
import React, { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionStyle, type MotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './About.module.css';

export const DepthPortrait: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const rotateX = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const portraitScale = useTransform(progress, [0, .65, .9, 1], [1.18, 1.04, 1, 1]);
  const portraitX = useTransform(progress, [0, .75, 1], ['8%', '0%', '0%']);
  const portraitRotate = useTransform(progress, [0, .85, 1], [-3, 0, 0]);
  const followPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 8);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * -6);
  };

  return (
    <div className={styles.visual} onPointerMove={followPointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <motion.div className={styles.space} style={{ rotateX, rotateY }}>
        <motion.div className={styles.portraitFrame} style={{ scale: portraitScale, x: portraitX, rotate: portraitRotate }}>
          <img src="/studiofoto.webp" alt="Kevin aan het werk in de studio" loading="lazy" decoding="async" width="800" height="800" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export function CoastToStudio({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, value => `${-105 * windowProgress(value, .12, .7)}%`);
  const scale = useTransform(progress, [0, .7, 1], [1.08, 1, 1]);
  const shade = useTransform(progress, [0, .25, .65], [.42, .36, 0]);
  const visibility = useTransform(progress, value => value >= .72 ? 'hidden' : 'visible');
  return <motion.div className={styles.coastalReveal} style={{ x, visibility }} aria-hidden="true">
    <motion.img src="/blankenberge-pier-uhd.webp" alt="" width="3840" height="2160" loading="lazy" decoding="async" style={{ scale }} />
    <motion.div className={styles.coastalShade} style={{ opacity: shade }} />
  </motion.div>;
}

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
  const animated = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start start', 'end end'] });
  const sceneProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: .6 });
  const supportingOpacity = useTransform(sceneProgress, [.58, .76], [0, 1]);
  const surface = useTransform(sceneProgress, [0, .45, .72, .98, 1], ['#eee8dc', '#eee8dc', '#dce8e7', '#efddd1', '#efddd1']);



  return (
    <section className={styles.section} id="over-ons" aria-labelledby="about-title">
      <div ref={sceneRef} data-about-sequence={animated ? '' : undefined} className={`${styles.sequence} ${animated ? styles.animated : ''}`}>
        <motion.div key={`scene-${animated}`} data-about-stage={animated ? '' : undefined} className={styles.stage} style={animated ? { '--scene-surface': surface } as MotionStyle : undefined}>
          <div className={styles.atmosphere} aria-hidden="true" />
          {animated && <CoastToStudio progress={sceneProgress} />}
          <div className={styles.sceneGrid}>
            {animated ? <DepthPortrait progress={sceneProgress} /> : <StaticPortrait />}
            <div className={styles.content}>
              {animated ? <CoastalTitle progress={sceneProgress} /> : <h2 id="about-title" className={styles.title}>Eén aanspreekpunt.<span>Van eerste idee tot werkende website.</span></h2>}
              <motion.div style={animated ? { opacity: supportingOpacity } : undefined}>
              <div className={styles.textBlock}>
                <p>Ik ben Kevin, webdesigner en ontwikkelaar in Blankenberge. Ik werk de inhoud, het ontwerp en de techniek van je website uit. Je vragen en feedback komen rechtstreeks bij mij terecht.</p>
                <p>Voor de start spreken we af wat ik bouw, welke inhoud je aanlevert en hoe je feedback geeft. Ook hosting, beheer en wijzigingen na de oplevering staan in je offerte.</p>
              </div>
              <a className={styles.contactLink} href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>
                Vertel me over je idee <ArrowUpRight aria-hidden="true" size={18} />
              </a>
              </motion.div>
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
