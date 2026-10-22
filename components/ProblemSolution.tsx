import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './ProblemSolution.module.css';

export const capabilities = [
  { title: 'Webdesign', text: 'Een eigen visuele richting, heldere inhoud en een website die op elk scherm overtuigt.', href: '/diensten/webdesign/', image: '/images/cases/previews/cozy.jpg', project: 'COZY Moments', detail: 'Een eigen gezicht. Tot in de details.', tags: ['Visuele identiteit', 'Responsive design'], tone: 'design' },
  { title: 'Webshops', text: 'Een snelle winkelervaring waarin assortiment, vertrouwen en afrekenen logisch samenkomen.', href: '/diensten/webshops/', image: '/images/cases/previews/dailygrind.jpg', project: 'Daily Grind', detail: 'Van eerste indruk tot laatste klik.', tags: ['E-commerce', 'Gebruikservaring'], tone: 'shop' },
  { title: 'Webapplicaties', text: 'Digitale tools, dashboards en automatisaties die terugkerend werk eenvoudiger maken.', href: '/diensten/webapplicaties-en-automatisatie/', image: '/images/cases/pwayment.png', project: 'PWAYMENT POS', detail: 'Slim gebouwd. Voelbaar eenvoudiger.', tags: ['Tools op maat', 'Automatisatie'], tone: 'app' },
  { title: 'Eigen dashboard', text: 'Zelf de touwtjes in handen? Als je dat nodig hebt, krijg je een eigen dashboard op maat. Pas zelf teksten aan, voeg nieuwe foto’s toe en volg je bezoekers en resultaten op. Alles overzichtelijk op één plek.', href: '#contact', cta: 'Bespreek jouw dashboard', image: '/images/cases/hondaanzee-dashboard.jpg', project: 'Hond aan Zee · Dashboard', detail: 'Jouw website. Zelf in handen.', tags: ['Foto’s & teksten beheren', 'Analytics & overzicht'], tone: 'dashboard' },
  { title: 'Lokale groei', text: 'Een sterke technische basis en relevante pagina’s voor ondernemers langs de Belgische kust.', href: '/webdesign-belgische-kust/', image: '/images/cases/previews/hondaanzee.jpg', project: 'Hond aan Zee', detail: 'Dicht bij je zaak. Dicht bij je klant.', tags: ['Lokale vindbaarheid', 'Belgische kust'], tone: 'local' },
];

const ServiceScene: React.FC<{ capability: typeof capabilities[number]; index: number; active: number; progress?: MotionValue<number> }> = ({ capability, index, active, progress }) => {
  const fallback = useMotionValue(0);
  const position = progress ?? fallback;
  const opacity = useTransform(position, [index - .65, index - .15, index + .35, index + .85], [0, 1, 1, 0]);
  const y = useTransform(position, [index - .65, index, index + .85], [35, 0, -35]);
  return <motion.div className={`${styles.scene} ${styles[capability.tone]} ${active === index ? styles.sceneActive : ''}`} style={progress ? { opacity, y, clipPath: 'inset(0)', visibility: 'visible', transition: 'none' } : undefined}>
    <div className={styles.sceneTop}><span>Van idee naar digitaal</span><ArrowUpRight strokeWidth={1.2} /></div>
    <p className={styles.sceneTitle}>{capability.detail}</p>
    <div className={styles.previewMedia}><div className={styles.imageFrame}>
      <img src={capability.image} alt="" width="800" height="451" loading="lazy" decoding="async" />
    </div></div>
    <div className={styles.sceneBottom}><span>Uit de studio</span><span>{capability.project}</span></div>
  </motion.div>;
};

const ServiceHeading: React.FC<{ entrance: MotionValue<number> }> = ({ entrance }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const [metrics, setMetrics] = useState({ width: 340, font: 40, center: 250 });
  useEffect(() => {
    const heading = headingRef.current;
    const first = firstRef.current;
    if (!heading || !first) return;
    const container = heading.closest(`.${styles.container}`)!;
    const measure = () => {
      const font = parseFloat(getComputedStyle(heading).fontSize);
      setMetrics({ width: first.offsetWidth, font, center: Math.max(80, (container.clientHeight - font * 2.2 * 2.15) / 2) });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(first);
    document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, []);
  const scale = useTransform(entrance, [.95, 1.5], [2.15, 1]);
  const y = useTransform(entrance, [.95, 1.5], [metrics.center, 0]);
  // Move the second line beside the first before lifting it onto the baseline.
  // A diagonal interpolation would make the two text lines collide midway.
  const secondX = useTransform(entrance, [.95, 1.18], [0, metrics.width + metrics.font * .3]);
  const secondY = useTransform(entrance, [1.18, 1.5], [metrics.font * 1.1, 0]);
  const firstMask = useTransform(entrance, [.35, .7], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const secondMask = useTransform(entrance, [.46, .82], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  return <motion.h2 ref={headingRef} id="services-title" aria-label="Niet zomaar online. Onmiskenbaar van jou." className={styles.morphHeading} style={{ scale, y, originX: 0, originY: 0 }}>
    <motion.span ref={firstRef} style={{ clipPath: firstMask }}>Niet zomaar online.</motion.span>
    <motion.span className={styles.headingSecond} style={{ x: secondX, y: secondY, clipPath: secondMask }}>Onmiskenbaar <em>van jou.</em></motion.span>
  </motion.h2>;
};

const ProblemSolution: React.FC<{ progress?: MotionValue<number>; entrance?: MotionValue<number>; onNavigate?: (index: number) => void }> = ({ progress, entrance, onNavigate }) => {
  const [active, setActive] = useState(0);
  const fallback = useMotionValue(0);
  const contentMask = useTransform(entrance ?? fallback, [1.4, 1.8], ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']);
  const contentY = useTransform(entrance ?? fallback, [1.4, 1.8], [30, 0]);
  useMotionValueEvent(progress ?? fallback, 'change', value => setActive(Math.max(0, Math.min(capabilities.length - 1, Math.floor(value + .35)))));
  const select = (index: number) => { if (onNavigate) onNavigate(index); else setActive(index); };

  return (
    <section className={`${styles.section} ${progress ? styles.embedded : ''}`} id={progress ? undefined : 'werkwijze'} aria-labelledby="services-title">
      <div className={styles.container}>
        <header className={styles.header}>
          {entrance ? <ServiceHeading entrance={entrance} /> : <h2 id="services-title">Niet zomaar online.<br /><span>Onmiskenbaar <em>van jou.</em></span></h2>}
          <div className={styles.intro}>
            <ArrowDown aria-hidden="true" strokeWidth={1} />
            <p>Strategie, ontwerp en development komen samen in één rechtstreeks traject. Zo blijven het verhaal, de visuele richting en de techniek één digitale ervaring die tot in de details klopt.</p>
          </div>
        </header>

        <motion.div className={styles.workbench} style={entrance ? { clipPath: contentMask, y: contentY } : undefined}>
          <div className={styles.visual} aria-hidden="true">
            {capabilities.map((capability, index) => <ServiceScene key={capability.title} capability={capability} index={index} active={active} progress={progress} />)}
          </div>

          <div className={styles.capabilities}>
            {capabilities.map((capability, index) => (
              <article key={capability.title} className={`${styles.capability} ${active === index ? styles.active : ''}`} onPointerEnter={(event) => { if (!progress && event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) setActive(index); }}>
                <h3>
                  <button type="button" id={`service-trigger-${index}`} aria-expanded={active === index} aria-controls={`service-panel-${index}`} onClick={() => select(index)} onFocus={() => { if (active !== index) select(index); }}>
                    <span>{capability.title}</span>
                    {active === index ? <Minus aria-hidden="true" strokeWidth={1.3} /> : <Plus aria-hidden="true" strokeWidth={1.3} />}
                  </button>
                </h3>
                <div id={`service-panel-${index}`} role="region" aria-labelledby={`service-trigger-${index}`} hidden={active !== index} className={styles.servicePanel}>
                  <p>{capability.text}</p>
                  <ul className={styles.tags}>{capability.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                  <a href={capability.href} onClick={capability.href === '#contact' ? (event) => scrollToSection(event, 'contact') : undefined}>{capability.cta ?? `Ontdek ${capability.title.toLowerCase()}`} <ArrowUpRight aria-hidden="true" strokeWidth={1.5} /></a>
                </div>
              </article>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default ProblemSolution;
