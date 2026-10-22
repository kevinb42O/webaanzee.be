import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './ProblemSolution.module.css';
import { clamp, interpolate, itemOpacity, windowProgress } from '../utils/homeChoreography';
import { mobileMotionQuery, useMediaQuery } from '../utils/useMediaQuery';

export const capabilities = [
  { title: 'Webdesign', text: 'Een website voor je aanbod, met contactmogelijkheden en een ontwerp voor mobiel en desktop.', href: '/diensten/webdesign/', image: '/images/cases/previews/cozy.jpg', project: 'COZY Moments', detail: 'Drankkaart en praktische info voor COZY.', tags: ['Vormgeving', 'Mobiel en desktop'], tone: 'design' },
  { title: 'Webshops', text: 'Een webshop waarin bezoekers producten vinden, hun bestelling samenstellen en online betalen.', href: '/diensten/webshops/', image: '/images/cases/previews/dailygrind.jpg', project: 'Daily Grind', detail: 'Een webshop voor Daily Grind.', tags: ['E-commerce', 'Gebruikservaring'], tone: 'shop' },
  { title: 'Webapplicaties', text: 'Een toepassing voor terugkerend werk: aanvragen verwerken, klanten beheren of gegevens uitwisselen.', href: '/diensten/webapplicaties-en-automatisatie/', image: '/images/cases/pwayment.png', project: 'PWAYMENT POS', detail: 'Kassa en voorraad voor PWAYMENT.', tags: ['Tools op maat', 'Automatisatie'], tone: 'app' },
  { title: 'Eigen dashboard', text: 'Pas zelf teksten en foto’s aan via een eigen beheerscherm, ook wel een CMS. We spreken vooraf af welke inhoud je wilt beheren. Statistieken of andere functies nemen we apart op in je offerte.', href: '#contact', cta: 'Bespreek jouw dashboard', image: '/images/cases/hondaanzee-dashboard.jpg', project: 'Hond aan Zee · Dashboard', detail: 'Teksten en foto’s zelf aanpassen.', tags: ['Foto’s & teksten beheren', 'Beheer op maat'], tone: 'dashboard' },
  { title: 'Lokale vindbaarheid', text: 'Pagina’s over je aanbod en werkgebied, met titels en beschrijvingen voor zoekmachines. Aanvullend SEO-werk spreken we apart af.', href: '/webdesign-belgische-kust/', image: '/images/cases/previews/hondaanzee.jpg', project: 'Hond aan Zee', detail: 'Praktische informatie per kustgemeente.', tags: ['Lokale vindbaarheid', 'Belgische kust'], tone: 'local' },
];

const ServiceScene: React.FC<{ capability: typeof capabilities[number]; index: number; active: number; progress?: MotionValue<number> }> = ({ capability, index, active, progress }) => {
  const fallback = useMotionValue(0);
  const position = progress ?? fallback;
  const opacity = useTransform(position, v => 1 - clamp(Math.abs(v - index)));
  const y = useTransform(position, v => clamp(index - v, -1, 1) * 12);
  return <motion.div className={`${styles.scene} ${styles[capability.tone]} ${active === index ? styles.sceneActive : ''}`} style={progress ? { opacity, y, clipPath: 'inset(0)', visibility: 'visible', transition: 'none' } : undefined}>
    <div className={styles.sceneTop}><span>Voorbeelden van mijn werk</span><ArrowUpRight strokeWidth={1.2} /></div>
    <p className={styles.sceneTitle}>{capability.detail}</p>
    <div className={styles.previewMedia}><div className={styles.imageFrame}>
      <img src={capability.image} alt="" width="800" height="451" loading="lazy" decoding="async" />
    </div></div>
    <div className={styles.sceneBottom}><span>Project</span><span>{capability.project}</span></div>
  </motion.div>;
};

const ServiceHeading: React.FC<{ entrance: MotionValue<number> }> = ({ entrance }) => {
  const opacity = useTransform(entrance, v => windowProgress(v, .35, .8));
  const y = useTransform(entrance, v => interpolate(v, [.35, .8], [20, 0]));
  return <motion.h2 id="services-title" style={{ opacity, y }}>Wat wil je online <span><em>mogelijk maken?</em></span></motion.h2>;
};

const ServicePanel: React.FC<{ capability: typeof capabilities[number]; index: number; active: boolean; progress?: MotionValue<number>; mobile?: boolean; mobileMotion?: boolean }> = ({ capability, index, active, progress, mobile = false, mobileMotion = false }) => {
  const content = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState(0);
  const fallback = useMotionValue(index);
  const position = progress ?? fallback;
  useEffect(() => {
    if (!progress || !content.current) return;
    const node = content.current;
    const measure = () => setMeasured(node.getBoundingClientRect().height);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    measure();
    return () => observer.disconnect();
  }, [progress]);
  const height = useTransform(position, v => measured * (1 - clamp(Math.abs(v - index))));
  const opacity = useTransform(position, v => itemOpacity(v, index));
  return <motion.div id={`service-panel-${index}`} role="region" aria-labelledby={`service-trigger-${index}`} hidden={!progress && !active && !mobileMotion} aria-hidden={!active} inert={!active ? true : undefined} initial={false} animate={mobileMotion ? { height: active ? 'auto' : 0, opacity: active ? 1 : 0 } : undefined} transition={mobileMotion ? { duration: .26, ease: [.16, 1, .3, 1] } : undefined} style={progress ? { height, opacity, overflow: 'clip' } : mobileMotion ? { overflow: 'clip' } : undefined}>
    <div ref={content} className={styles.servicePanel}>
      {mobile && <figure className={`${styles.mobileExample} ${styles[capability.tone]}`}>
        <img src={capability.image} alt={`Voorbeeld: ${capability.project}`} width="800" height="451" loading="lazy" decoding="async" />
        <figcaption><span>{capability.detail}</span><span>{capability.project}</span></figcaption>
      </figure>}
      <p>{capability.text}</p>
      <ul className={styles.tags}>{capability.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <a href={capability.href} onClick={capability.href === '#contact' ? event => scrollToSection(event, 'contact') : undefined}>{capability.cta ?? `Ontdek ${capability.title.toLowerCase()}`} <ArrowUpRight aria-hidden="true" strokeWidth={1.5} /></a>
    </div>
  </motion.div>;
};

const ProblemSolution: React.FC<{ progress?: MotionValue<number>; entrance?: MotionValue<number>; onNavigate?: (index: number) => void; mobile?: boolean }> = ({ progress, entrance, onNavigate, mobile = false }) => {
  const [active, setActive] = useState(0);
  const mobileMotion = useMediaQuery(mobileMotionQuery) && mobile;
  const fallback = useMotionValue(0);
  const contentOpacity = useTransform(entrance ?? fallback, v => windowProgress(v, .65, 1));
  const contentY = useTransform(entrance ?? fallback, v => interpolate(v, [.65, 1], [16, 0]));
  useMotionValueEvent(progress ?? fallback, 'change', value => setActive(Math.max(0, Math.min(capabilities.length - 1, Math.round(value)))));
  const select = (index: number) => { if (onNavigate) onNavigate(index); else setActive(index); };

  return (
    <section className={`${styles.section} ${progress ? styles.embedded : ''} ${mobile ? styles.mobile : ''}`} id={progress ? undefined : 'werkwijze'} aria-labelledby="services-title">
      <div className={styles.container}>
        <header className={styles.header}>
          {entrance ? <ServiceHeading entrance={entrance} /> : <h2 id="services-title">Wat wil je online<br /><span><em>mogelijk maken?</em></span></h2>}
          <div className={styles.intro}>
            <ArrowDown aria-hidden="true" strokeWidth={1} />
            <p>Ik ontwerp én bouw je website. Je bespreekt de inhoud, vormgeving en techniek met dezelfde persoon. Dit kan ik voor je uitwerken.</p>
          </div>
        </header>

        <motion.div className={styles.workbench} style={entrance ? { opacity: contentOpacity, y: contentY } : undefined}>
          {!mobile && <div className={styles.visual} aria-hidden="true">
            {capabilities.map((capability, index) => <ServiceScene key={capability.title} capability={capability} index={index} active={active} progress={progress} />)}
          </div>}

          <div className={styles.capabilities}>
            {capabilities.map((capability, index) => (
              <article key={capability.title} className={`${styles.capability} ${active === index ? styles.active : ''}`} onPointerEnter={(event) => { if (!mobile && !progress && event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) setActive(index); }}>
                <h3>
                  <button type="button" id={`service-trigger-${index}`} aria-expanded={active === index} aria-controls={`service-panel-${index}`} onClick={() => select(index)} onFocus={() => { if (!mobile && active !== index) select(index); }}>
                    <span>{capability.title}</span>
                    {active === index ? <Minus aria-hidden="true" strokeWidth={1.3} /> : <Plus aria-hidden="true" strokeWidth={1.3} />}
                  </button>
                </h3>
                <ServicePanel capability={capability} index={index} active={active === index} progress={progress} mobile={mobile} mobileMotion={mobileMotion} />
              </article>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default ProblemSolution;
