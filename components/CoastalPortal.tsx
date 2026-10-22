import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react';
import { clamp, windowProgress } from '../utils/homeChoreography';
import styles from './CoastalPortal.module.css';

/** A real alpha opening: the existing hero photograph remains behind the wall. */
export default function CoastalPortal({ progress }: { progress?: MotionValue<number> }) {
  const still = useMotionValue(0);
  const position = progress ?? still;
  const scale = useTransform(position, value => 1 / (1 - .86 * windowProgress(value, .04, .86)));
  const opacity = useTransform(position, [.78, .9], [1, 0]);
  const hintOpacity = useTransform(position, value => 1 - clamp(value / .22));
  const visibility = useTransform(position, value => value >= 1 ? 'hidden' : 'visible');
  return <>
    <motion.div className={styles.foreground} style={{ scale, opacity, visibility }} aria-hidden="true" data-coastal-portal>
      <picture>
        <source media="(max-width: 760px)" srcSet="/images/opener/coastal-sunset-pavilion-mobile.webp" width="941" height="1672" />
        <img src="/images/opener/coastal-sunset-pavilion.webp" alt="" width="1536" height="1024" fetchPriority="high" decoding="async" />
      </picture>
    </motion.div>
    <motion.p className={styles.hint} style={{ opacity: hintOpacity, visibility }} aria-hidden="true">
      Scroll en ontdek <ArrowDown size={16} strokeWidth={1.5} />
    </motion.p>
  </>;
}
