import React from 'react';
import { motion, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DepthPortrait } from './About';
import { useMobileChapter } from '../utils/useMobileChapter';
import { clamp, windowProgress } from '../utils/homeChoreography';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './MobileAbout.module.css';
import about from './About.module.css';

export default function MobileAbout() {
  const { root, stage, content, distance, approach, layout } = useMobileChapter(1);
  const progress = useTransform(() => clamp(approach.get() * .4 + distance.get() / layout.entrance * .6));
  const y = useTransform(distance, value => -layout.overflow * clamp((value - layout.entrance - layout.viewport * .15) / Math.max(1, layout.hold - layout.viewport * .35)));
  const surface = useTransform(progress, [0, .45, .72, 1], ['#eee8dc', '#dce8e7', '#efddd1', '#efddd1']);
  const reveal = useTransform(progress, value => .8 + .2 * windowProgress(value, .25, 1));
  return <section aria-labelledby="about-title" className={styles.about}>
    <div ref={root} id="over-ons" data-mobile-moment={layout.entrance + layout.viewport * .15} data-mobile-sequence data-mobile-kind="about" className={styles.sequence}>
      <motion.div ref={stage} className={styles.stage} data-mobile-stage style={{ background: surface }}>
        <motion.div ref={content} className={styles.content} style={{ y }}>
          <DepthPortrait progress={progress} />
          <motion.div style={{ opacity: reveal }}>
            <h2 id="about-title" className={about.title}>Eén aanspreekpunt.<span>Van eerste idee tot werkende website.</span></h2>
            <div className={about.textBlock}>
              <p>Ik ben Kevin, webdesigner en ontwikkelaar in Blankenberge. Ik werk de inhoud, het ontwerp en de techniek van je website uit. Je vragen en feedback komen rechtstreeks bij mij terecht.</p>
              <p>Voor de start spreken we af wat ik bouw, welke inhoud je aanlevert en hoe je feedback geeft. Ook hosting, beheer en wijzigingen na de oplevering staan in je offerte.</p>
            </div>
            <a className={about.contactLink} href="#contact" onClick={event => scrollToSection(event, 'contact')}>Vertel me over je idee <ArrowUpRight aria-hidden="true" size={18} /></a>
            <p className={about.signature}>Kevin — ontwerper &amp; ontwikkelaar bij Webaanzee</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>;
}
