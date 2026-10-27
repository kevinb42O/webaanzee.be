import { useMotionState } from '../utils/useMotionState';
import React from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { windowProgress } from '../utils/homeChoreography';
import { heroIntroduction, heroStatement } from '../data/heroCopy';
import hero from './Hero.module.css';
import styles from './CoastalPortal.module.css';

/** The headline leaves before the introduction arrives. Every phase follows native scroll. */
export default function PortalHeroCopy({ progress }: { progress: MotionValue<number> }) {
  const reading = useMotionState(progress, value => value >= .46);
  const headlineOpacity = useTransform(progress, value => 1 - windowProgress(value, .2, .42));
  const headlineY = useTransform(progress, value => -12 * windowProgress(value, .2, .42));
  const statementOpacity = useTransform(progress, value => windowProgress(value, .46, .72));
  const statementY = useTransform(progress, value => 20 * (1 - windowProgress(value, .46, .74)));
  const descriptionOpacity = useTransform(progress, value => windowProgress(value, .58, .84));
  const descriptionY = useTransform(progress, value => 12 * (1 - windowProgress(value, .58, .86)));
  const shadeOpacity = useTransform(progress, value => windowProgress(value, .34, .72));
  return <>
    <motion.div className={styles.readingShade} style={{ opacity: shadeOpacity }} aria-hidden="true" />
    <h1 className={styles.splitTitle} data-portal-headline>
      <motion.span className={styles.leftTitle} style={{ y: headlineY, opacity: headlineOpacity }}><span>Je onderneming</span><em> verdient beter.</em></motion.span>
      <motion.span className={styles.rightTitle} style={{ y: headlineY, opacity: headlineOpacity }}><span>Dan zomaar</span><em> een website.</em></motion.span>
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
