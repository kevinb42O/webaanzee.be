import { mobileMotionQuery } from '../utils/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import styles from './Quality.module.css';
import { desktopMotionQuery, interpolate, windowProgress } from '../utils/homeChoreography';

const principles = [
  'Je aanbod en contactgegevens zijn makkelijk te vinden.',
  'Teksten beantwoorden de vragen van je klanten.',
  'Ook op je telefoon kun je lezen en navigeren.',
  'Beelden en techniek mogen het laden niet in de weg zitten.',
  'Bezoekers weten hoe ze contact opnemen of bestellen.',
];

export const QualityScene: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const mask = useTransform(progress, v => `inset(${(1 - windowProgress(v, 0, .5)) * 50}% 0%)`);
  const titleOpacity = useTransform(progress, v => windowProgress(v, .25, .65));
  const titleY = useTransform(progress, v => interpolate(v, [.25, .85], [24, 0]));
  const readingOpacity = useTransform(progress, v => windowProgress(v, .5, .85));
  const bodyOpacity = useTransform(progress, v => 1 - windowProgress(v, 1.75, 1.875));
  const bodyY = useTransform(progress, v => interpolate(v, [1.75, 1.875], [0, -12]));
  const closingOpacity = useTransform(progress, v => windowProgress(v, 1.875, 2));
  const closingY = useTransform(progress, v => interpolate(v, [1.875, 2], [12, 0]));
  const baseline = useTransform(progress, v => interpolate(v, [.3, .85], [0, 1]));
  return <motion.section className={styles.scene} style={{ clipPath: mask }} aria-labelledby="quality-title">
    <div className={styles.sceneGrid}>
      <motion.div className={styles.titleComposition} style={{ opacity: titleOpacity, y: titleY }}>
        <h2 id="quality-title" className={styles.slicedTitle}>Mooi is de<br />ondergrens.</h2>
        <motion.div className={styles.baseline} style={{ scaleX: baseline }} aria-hidden="true" />
      </motion.div>
      <motion.div className={styles.reading} style={{ opacity: readingOpacity }}>
        <motion.div className={styles.principlesBlock} style={{ opacity: bodyOpacity, y: bodyY }}>
          <div className={styles.intro}>
            <p>Je klanten komen met een vraag: wat bied je aan, wat kost het en hoe kunnen ze bij je terecht?</p>
            <p>Die vragen bepalen de inhoud en opbouw van je website.</p>
          </div>
          <ul className={styles.principles}>{principles.map(text => <li key={text} className={styles.principle}>{text}</li>)}</ul>
        </motion.div>
        <motion.div className={styles.finalStatement} style={{ opacity: closingOpacity, y: closingY }}>
          <p>Daar draait het om:</p>
          <p className={styles.sceneClosing}>Je aanbod begrijpen.<br /><em>De volgende stap vinden.</em></p>
        </motion.div>
      </motion.div>
    </div>
  </motion.section>;
};

const Quality: React.FC = () => {
  const [embedded, setEmbedded] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(desktopMotionQuery);
    const mobileMedia = window.matchMedia(mobileMotionQuery);
    const update = () => setEmbedded(media.matches || mobileMedia.matches);
    update();
    media.addEventListener('change', update);
    mobileMedia.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); mobileMedia.removeEventListener('change', update); };
  }, []);
  if (embedded) return null;
  return <section className={styles.section} aria-labelledby="quality-static-title">
    <div className={styles.container}>
      <div className={styles.grid}>
        <h2 id="quality-static-title" className={styles.title}>Mooi is de ondergrens.</h2>
        <div className={styles.content}>
          <p>Je klanten komen met een vraag: wat bied je aan, wat kost het en hoe kunnen ze bij je terecht?</p>
          <p>Die vragen bepalen de inhoud en opbouw van je website.</p>
          <ul>{principles.map(text => <li key={text}>{text}</li>)}</ul>
          <p>Daar draait het om:</p>
          <p className={styles.closing}>Je aanbod begrijpen. De volgende stap vinden.</p>
        </div>
      </div>
    </div>
  </section>;
};

export default Quality;
