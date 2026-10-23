import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { capabilities } from '../data/capabilities';
import { clamp, itemOpacity, serviceCompletion, serviceDuration, servicePhase, serviceReading, serviceTiming, windowProgress } from '../utils/homeChoreography';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './ServiceWorkbench.module.css';

export const serviceExamples = [
  { image: '/images/cases/cozy.png', detail: '/images/services/cozy-mobile.webp', domain: 'cozy-moments.be', path: '/cases/cozy-moments-blankenberge/', label: 'Een eigen gezicht. Op ieder scherm.', detailLabel: 'Mobiele website', kind: 'mobile' },
  { image: '/images/cases/dailygrind.png', detail: '/images/services/dailygrind-products.webp', domain: 'daily-grind.be', path: '/cases/daily-grind-blankenberge/', label: 'Van je winkel naar je webshop.', detailLabel: 'Het assortiment online', kind: 'products' },
  { image: '/images/services/pwayment-pos.jpg', detail: '', domain: 'PWAYMENT POS', path: '/cases/pwayment-pos/', label: 'Je dagelijkse werk, in één toepassing.', detailLabel: 'Voorbeeldscherm van de kassa', kind: 'pos' },
  { image: '/images/services/atelier-rembrandt-cms.webp', detail: '/images/services/atelier-rembrandt-collectie.webp', domain: 'Atelier Rembrandt · collectiebeheer', path: '/cases/atelier-rembrandt/', label: 'Je collectie. Zelf in beheer.', detailLabel: 'De collectie op de website', kind: 'dashboard' },
  { image: '/images/cases/hondaanzee.png', detail: '/images/services/hondaanzee-de-haan.webp', domain: 'hondaanzee.be', path: '/cases/hond-aan-zee/', label: 'Dicht bij de mensen die je zoeken.', detailLabel: 'Een eigen pagina voor De Haan', kind: 'local' },
];

const number = (index: number) => String(index + 1).padStart(2, '0');

export function ServiceLink({ index }: { index: number }) {
  const item = capabilities[index];
  return <a className={styles.serviceLink} href={item.href} onClick={item.href === '#contact' ? event => scrollToSection(event, 'contact') : undefined}>
    {item.cta ?? `Ontdek ${item.title.toLowerCase()}`} <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.5} />
  </a>;
}

export function Chapter({ index, distance, phase, active }: { index: number; distance: MotionValue<number>; phase: MotionValue<number>; active: number }) {
  const item = capabilities[index];
  const example = serviceExamples[index];
  const near = Math.abs(active - index) <= 1;
  const visible = useTransform(phase, v => Math.abs(v - index) < 1 ? 'visible' : 'hidden');
  const mask = useTransform(phase, v => `inset(${clamp(index - v) * 100}% 0% 0% 0%)`);
  const travel = useTransform(phase, v => clamp(index - v, -1, 1) * 16);
  const y = useTransform(travel, v => `${v}%`);
  const rotation = useTransform(distance, v => (index % 2 ? 2 : -2) * (1 - serviceReading(v, index)));
  const scale = useTransform(distance, v => 1 + serviceReading(v, index) * .035);
  const detailY = useTransform(distance, v => 32 - serviceReading(v, index) * 48);
  const detailScale = useTransform(distance, v => .92 + serviceReading(v, index) * .08);

  return <motion.figure className={`${styles.example} ${styles[item.tone]} ${styles[example.kind]}`} style={{ visibility: visible, clipPath: mask, zIndex: index + 1 }} aria-hidden={active !== index} inert={active !== index ? true : undefined}>
    <motion.div className={styles.exampleTravel} style={{ y }}>
      <div className={styles.exampleTop}><span>{example.domain}</span><span>{number(index)} <span aria-hidden="true">/</span> 05</span></div>
      <div className={styles.mediaSpace}>
        <motion.div className={styles.browserFrame} style={{ rotate: rotation, scale }}>
          <div className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>{example.domain}</span></div>
          <img src={near ? example.image : undefined} data-service-src={example.image} alt={`Voorbeeld van ${item.title.toLowerCase()}: ${item.project}`} width="1276" height="720" decoding="async" />
        </motion.div>
        {example.detail && <motion.div className={styles.detailFrame} style={{ y: detailY, scale: detailScale }} aria-hidden="true">
          <img src={near ? example.detail : undefined} data-service-src={example.detail} alt="" width={example.kind === 'mobile' ? 390 : 1280} height={example.kind === 'mobile' ? 780 : 720} decoding="async" />
          {example.kind !== 'mobile' && <span>{example.kind === 'local' && <MapPin size={13} strokeWidth={1.5} />}{example.detailLabel}</span>}
        </motion.div>}
        {example.kind === 'pos' && <motion.div className={styles.posCaption} style={{ y: detailY }}><span>{example.detailLabel}</span><span>Producten · kassa · voorraad</span></motion.div>}
      </div>
      <figcaption className={styles.exampleCaption}><span>{example.label}</span><a href={example.path}>Bekijk {item.project.replace(' · Dashboard', '')}<ArrowUpRight aria-hidden="true" size={16} /></a></figcaption>
    </motion.div>
  </motion.figure>;
}

export function Copy({ index, phase, active }: { index: number; phase: MotionValue<number>; active: number }) {
  const opacity = useTransform(phase, v => itemOpacity(v, index));
  const y = useTransform(phase, v => clamp(index - v, -1, 1) * 20);
  const visible = useTransform(opacity, v => v > .001 ? 'visible' : 'hidden');
  const item = capabilities[index];
  return <motion.article className={styles.copy} id={`service-panel-${index}`} aria-labelledby={`service-heading-${index}`} aria-hidden={active !== index} inert={active !== index ? true : undefined} style={{ opacity, y, visibility: visible }}>
    <div className={styles.chapterNumber} aria-label={`Dienst ${index + 1} van 5`}><span>{number(index)}</span><span>/ 05</span></div>
    <h3 id={`service-heading-${index}`}>{item.title}</h3>
    <p>{item.text}</p>
    <ul className={styles.tags}>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    <ServiceLink index={index} />
  </motion.article>;
}

export function ChapterButton({ index, distance, active, onNavigate }: { index: number; distance: MotionValue<number>; active: number; onNavigate: (index: number) => void }) {
  const scaleX = useTransform(distance, v => serviceCompletion(v, index, capabilities.length));
  return <button type="button" id={`service-trigger-${index}`} aria-controls={`service-panel-${index}`} aria-current={active === index ? 'step' : undefined} onClick={() => onNavigate(index)}>
    <span className={styles.chapterTrack} aria-hidden="true"><motion.span style={{ scaleX }} /></span>
    <span className={styles.chapterLabel}><span>{number(index)}</span>{capabilities[index].title}<ArrowUpRight aria-hidden="true" size={15} /></span>
  </button>;
}

export default function ServiceWorkbench({ distance, entrance, onNavigate }: { distance: MotionValue<number>; entrance: MotionValue<number>; onNavigate: (index: number) => void }) {
  const phase = useTransform(distance, v => servicePhase(v, capabilities.length));
  const getActive = () => Math.round(phase.get());
  const [active, setActive] = useState(getActive);
  const root = useRef<HTMLElement>(null);
  useMotionValueEvent(phase, 'change', value => {
    const next = Math.round(value);
    setActive(current => current === next ? current : next);
  });
  const headingOpacity = useTransform(entrance, v => windowProgress(v, .75, 1));
  const contentOpacity = useTransform(entrance, v => windowProgress(v, .12, .75));
  const copyOpacity = useTransform(entrance, v => windowProgress(v, .65, .95));
  const entranceY = useTransform(entrance, v => (1 - v) * 100);
  const contentY = useTransform(entranceY, v => `${v}%`);
  const entranceScale = useTransform(entrance, v => .88 + .12 * v);
  const textX = useTransform(entrance, v => (1 - v) * 48);
  const exit = useTransform(distance, v => windowProgress(v, serviceDuration(capabilities.length), serviceDuration(capabilities.length) + serviceTiming.exit));
  const flatten = useTransform(exit, v => 1 - .025 * v);

  useEffect(() => {
    // Fetch/decode the current and next examples before the next masked handover.
    const nodes = root.current?.querySelectorAll<HTMLImageElement>('img[src]');
    nodes?.forEach(img => { img.decode().catch(() => undefined); });
  }, [active]);

  return <section ref={root} className={styles.section} aria-labelledby="services-title" data-service-workbench data-service-index={active}>
    <motion.header className={styles.heading} style={{ opacity: headingOpacity }}>
      <h2 id="services-title">Wat wil je online <em>mogelijk maken?</em></h2>
      <span aria-hidden="true"><ArrowDown size={17} /> Scroll en ontdek</span>
    </motion.header>
    <div className={styles.composition}>
      <motion.div className={styles.visual} style={{ y: contentY, scale: entranceScale, opacity: contentOpacity }}>
        <motion.div className={styles.visualInner} style={{ scaleY: flatten }}>{capabilities.map((item, index) => <Chapter key={item.title} index={index} distance={distance} phase={phase} active={active} />)}</motion.div>
      </motion.div>
      <motion.div className={styles.copySpace} style={{ x: textX, opacity: copyOpacity }}>{capabilities.map((item, index) => <Copy key={item.title} index={index} phase={phase} active={active} />)}</motion.div>
    </div>
    <motion.nav className={styles.chapters} aria-label="Ontdek de vijf diensten" style={{ opacity: contentOpacity }}>{capabilities.map((item, index) => <ChapterButton key={item.title} index={index} distance={distance} active={active} onNavigate={onNavigate} />)}</motion.nav>
  </section>;
}
