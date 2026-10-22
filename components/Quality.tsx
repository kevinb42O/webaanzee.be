import React, { useEffect, useState } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import styles from './Quality.module.css';

const principles = [
  'Je aanbod en contactgegevens zijn makkelijk te vinden.',
  'Teksten beantwoorden de vragen van je klanten.',
  'Ook op je telefoon kun je lezen en navigeren.',
  'Beelden en techniek mogen het laden niet in de weg zitten.',
  'Bezoekers weten hoe ze contact opnemen of bestellen.',
];

// Each strip contains the same typesetting; only its own vertical slice is visible.
const TitleSlice: React.FC<{ progress: MotionValue<number>; index: number }> = ({ progress, index }) => {
  const delay = index * .075;
  const y = useTransform(progress, [.3 + delay, 1.15 + delay], [index % 2 ? 145 : -145, 0]);
  return <span className={styles.slice} style={{ clipPath: `inset(0 ${100 - (index + 1) * 20}% 0 ${index * 20}%)` }}>
    <motion.span style={{ y }}>Mooi is de<br />ondergrens.</motion.span>
  </span>;
};

const Principle: React.FC<{ progress: MotionValue<number>; index: number; children: React.ReactNode }> = ({ progress, index, children }) => {
  const start = 1.5 + index * .2;
  const reveal = useTransform(progress, [start, start + .45], ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const line = useTransform(progress, [start, start + .45], [0, 1]);
  return <li className={styles.principle}>
    <span className={styles.principleGhost} aria-hidden="true">{children}</span>
    <motion.span className={styles.principleInk} style={{ clipPath: reveal }}>{children}</motion.span>
    <motion.span className={styles.rule} style={{ scaleX: line }} aria-hidden="true" />
  </li>;
};

export const QualityScene: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const mask = useTransform(progress, [0, .12, .75], ['inset(50% 0% 50% 0%)', 'inset(49.8% 0% 49.8% 0%)', 'inset(0% 0% 0% 0%)']);
  const readingOpacity = useTransform(progress, [1.1, 1.5], [0, 1]);
  const seamScale = useTransform(progress, [0, .18], [.08, 1]);
  const seamOpacity = useTransform(progress, [0, .12, .6], [1, 1, 0]);
  const titleScale = useTransform(progress, [.95, 1.65], [1.32, 1]);
  const titleX = useTransform(progress, [.95, 1.65], ['21%', '0%']);
  const titleY = useTransform(progress, [.95, 1.65], ['14vh', '0vh']);
  const baseline = useTransform(progress, [.15, .65, 1.65], [.08, 1, .45]);
  const introMask = useTransform(progress, [1.15, 1.65], ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']);
  const bodyOpacity = useTransform(progress, [2.9, 3.3], [1, 0]);
  const bodyY = useTransform(progress, [2.9, 3.3], [0, -35]);
  const closingMask = useTransform(progress, [3.2, 3.85], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const closingY = useTransform(progress, [3.2, 3.85], [65, 0]);
  return <motion.section className={styles.scene} style={{ clipPath: mask }} aria-labelledby="quality-title">
    <motion.div className={styles.seam} style={{ scaleX: seamScale, opacity: seamOpacity }} aria-hidden="true" />
    <div className={styles.sceneGrid}>
      <motion.div className={styles.titleComposition} style={{ scale: titleScale, x: titleX, y: titleY }}>
        <h2 id="quality-title" className={styles.slicedTitle}>
          <span className={styles.titleMeasure}>Mooi is de<br />ondergrens.</span>
          <span aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <TitleSlice key={index} index={index} progress={progress} />)}</span>
        </h2>
        <motion.div className={styles.baseline} style={{ scaleX: baseline }} aria-hidden="true" />
      </motion.div>
      <motion.div className={styles.reading} style={{ opacity: readingOpacity }}>
        <motion.div className={styles.principlesBlock} style={{ opacity: bodyOpacity, y: bodyY }}>
          <motion.div className={styles.intro} style={{ clipPath: introMask }}>
            <p>Je klanten komen met een vraag: wat bied je aan, wat kost het en hoe kunnen ze bij je terecht?</p>
            <p>Die vragen bepalen de inhoud en opbouw van je website.</p>
          </motion.div>
          <ul className={styles.principles}>{principles.map((text, index) => <Principle key={text} index={index} progress={progress}>{text}</Principle>)}</ul>
        </motion.div>
        <motion.div className={styles.finalStatement} style={{ clipPath: closingMask, y: closingY }}>
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
    const media = window.matchMedia('(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)');
    const update = () => setEmbedded(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
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
