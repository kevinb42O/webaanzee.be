import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Hero.module.css';

export default function HeroDiscovery() {
  return <>
    <p className={styles.clarification}>Websites op maat. Ontworpen om indruk te maken, gebouwd om resultaat te leveren.</p>
    <a className={styles.discoveryLink} href="#projecten" onClick={event => scrollToSection(event, 'projecten')}>
      Ontdek mijn werk <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
    </a>
  </>;
}
