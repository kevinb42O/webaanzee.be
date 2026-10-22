import React, { useState } from 'react';
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react';
import { windowProgress } from '../utils/homeChoreography';
import { heroIntroduction, heroStatement } from '../data/heroCopy';
import hero from './Hero.module.css';
import styles from './CoastalPortal.module.css';

/** The headline leaves before the introduction arrives. Every phase follows native scroll. */
export default function PortalHeroCopy({ progress }: { progress: MotionValue<number> }) {
  const [reading, setReading] = useState(progress.get() >= .38);
  const headlineOpacity = useTransform(progress, value => 1 - windowProgress(value, .08, .3));
  const leftX = useTransform(progress, value => `${-44 * windowProgress(value, .03, .34)}vw`);
  const rightX = useTransform(progress, value => `${44 * windowProgress(value, .03, .34)}vw`);
  const statementOpacity = useTransform(progress, value => windowProgress(value, .38, .66));
  const statementY = useTransform(progress, value => 20 * (1 - windowProgress(value, .38, .7)));
  const descriptionOpacity = useTransform(progress, value => windowProgress(value, .52, .8));
  const descriptionY = useTransform(progress, value => 12 * (1 - windowProgress(value, .52, .82)));
  const shadeOpacity = useTransform(progress, value => windowProgress(value, .34, .72));
  useMotionValueEvent(progress, 'change', value => {
    setReading(current => current === (value >= .38) ? current : value >= .38);
  });
  return <>
    <motion.div className={styles.readingShade} style={{ opacity: shadeOpacity }} aria-hidden="true" />
    <h1 className={styles.splitTitle} data-portal-headline>
      <motion.span className={styles.leftTitle} style={{ x: leftX, opacity: headlineOpacity }}>Je kent<span> je vak.</span></motion.span>
      <motion.span className={styles.rightTitle} style={{ x: rightX, opacity: headlineOpacity }}>Laat het<span> online zien.</span></motion.span>
    </h1>
    <div className={`${hero.container} ${styles.supporting}`} aria-hidden={!reading} data-portal-supporting>
      <motion.h2 className={styles.statement} style={{ opacity: statementOpacity, y: statementY }} data-portal-statement>
        <span>{heroStatement[0]}</span><span>{heroStatement[1]}</span>
      </motion.h2>
      <motion.p className={styles.introduction} style={{ opacity: descriptionOpacity, y: descriptionY }} data-portal-description>
        {heroIntroduction}
      </motion.p>
    </div>
  </>;
}
