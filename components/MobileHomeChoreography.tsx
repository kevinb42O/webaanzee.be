import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from './Proof';
import ProblemSolution from './ProblemSolution';
import MobileHomepageEffects from './MobileHomepageEffects';
import CoastalPortal from './CoastalPortal';
import MobileCinematicHome from './MobileCinematicHome';
import PortalHeroCopy from './PortalHeroCopy';
import { portalDistance } from '../utils/homeChoreography';
import { scrollToSection } from '../utils/scrollToSection';
import { mobileMotionQuery, useMediaQuery } from '../utils/useMediaQuery';
import hero from './Hero.module.css';
import work from './PortfolioDepth.module.css';
import styles from './MobileHomeChoreography.module.css';

const palettes = ['#e3ebe7', '#efe1de', '#d9e6eb', '#eae1d3', '#e2e4d8', '#dce5ec', '#ebe3d8', '#dce3ee', '#f0e7da', '#eee6d4', '#e7e4dc'];
const ease = [.16, 1, .3, 1] as const;

export function MobileNoScriptFallback() {
  return <noscript><style>{`@media (max-width: 999px) {
    .${hero.imageBlock} { clip-path: none !important; }
    .${hero.titleLine}, .${hero.container}, .${hero.description}, .${hero.eyebrow}, .${hero.ctaGroup} { transform: none !important; opacity: 1 !important; }
  }`}</style></noscript>;
}

function WorkHeading() {
  return <><h2 id="work-title">Ontworpen om op te vallen.<span>Gebouwd om te werken.</span></h2><p>Van lokale handelszaak tot digitaal product: ieder project krijgt een eigen visuele wereld en een technische basis die snel en betrouwbaar blijft.</p></>;
}

function ProjectImage({ project, eager = false }: { project: CaseStudy; eager?: boolean }) {
  return <a href={project.casePath} className={work.mediaLink} aria-label={`Bekijk de case ${project.title}`}>
    <img src={project.imageSrc} srcSet={`${project.previewSrc ?? `/images/cases/previews/${project.id}.jpg`} 800w, ${project.imageSrc} 1276w`} sizes="(min-width: 761px) 680px, calc(100vw - 40px)" alt={`Website van ${project.title}`} width="1276" height="720" loading={eager ? 'eager' : 'lazy'} decoding="async" />
    <span className={work.imageAction} aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.5} /></span>
  </a>;
}

function ProjectCopy({ project }: { project: CaseStudy }) {
  return <div className={work.copy}>
    <h3 className={project.title.length > 22 ? work.longTitle : undefined}>{project.title}</h3>
    <p className={work.description}>{project.description}</p>
    <p className={work.tags}>{project.tags.join(' / ')}</p>
    <a className={work.caseLink} href={project.casePath}>Bekijk het project <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.5} /></a>
  </div>;
}

function MobileHero({ enabled, covered, portalProgress }: { enabled: boolean; covered: boolean; portalProgress?: MotionValue<number> }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!enabled || portalProgress || !ref.current || window.scrollY > 32 || window.location.hash) return;
    // Start from visible server markup. A failed script can never hide the hero.
    const lines = ref.current.querySelectorAll(`.${hero.titleLine}`);
    const controls = animate(lines, { y: ['105%', '0%'] }, { duration: .6, ease, delay: i => i * .07 });
    const image = ref.current.querySelector(`.${hero.imageBlock}`);
    const arrival = image ? animate(image, { scale: [1.02, 1] }, { duration: .7, ease }) : undefined;
    const supporting = animate(ref.current.querySelectorAll(`.${hero.description}, .${hero.ctaGroup}`), { opacity: [.7, 1], y: [8, 0] }, { duration: .45, delay: .14, ease });
    return () => { controls.complete(); arrival?.complete(); supporting.complete(); };
  }, [enabled, portalProgress]);
  return <section ref={ref} className={`${hero.hero} ${styles.hero}`} aria-label="Webaanzee" inert={covered ? true : undefined} aria-hidden={covered ? true : undefined}>
    <div className={hero.imageBlock}><img src="/blankenberge-pier-uhd.webp" alt="" width="3840" height="2160" fetchPriority="high" /></div>
    {portalProgress && <CoastalPortal progress={portalProgress} />}
    {portalProgress ? <PortalHeroCopy progress={portalProgress} /> : <div className={hero.container}>

      <h1 className={hero.title}>
        <span className={hero.lineMask}><span className={hero.titleLine}><span>Je onderneming</span><em> verdient beter.</em></span></span>
        <span className={hero.lineMask}><span className={`${hero.titleLine} ${hero.accentLine}`}><span>Dan zomaar</span><em> een website.</em></span></span>
      </h1>

    </div>}
  </section>;
}

function Opening({ projects, enabled }: { projects: CaseStudy[]; enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(false);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // The passage and reading hold finish before the existing .5-height panel.
  const passageEnd = portalDistance / (portalDistance + .5);
  const portalProgress = useTransform(scrollYProgress, [0, passageEnd], [0, 1]);
  const panelProgress = useTransform(scrollYProgress, [passageEnd, 1], [0, 1]);
  const panelY = useTransform(panelProgress, [0, 1], ['100%', '0%']);
  const leftX = useTransform(panelProgress, [.1, .85], [-16, 0]);
  const rightX = useTransform(panelProgress, [.1, .85], [16, 0]);
  const minisOpacity = useTransform(panelProgress, [0, .35, .8, 1], [0, 1, .7, 0]);
  const imageScale = useTransform(panelProgress, [0, .8, 1], [.98, 1, 1]);
  const pinned = enabled && fits;
  useMotionValueEvent(panelProgress, 'change', value => setReady(current => current === (value >= .97) ? current : value >= .97));

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () => {
      const heroContent = node.querySelector<HTMLElement>(`.${hero.container}`);
      const panel = node.querySelector<HTMLElement>(`.${styles.panelContent}`);
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 64;
      const height = heroContent ? parseFloat(getComputedStyle(heroContent).minHeight) : 0;
      const compositionHeight = panel ? Array.from(panel.children).reduce((sum, child) => sum + (child as HTMLElement).offsetHeight, 0) : Infinity;
      // Both compositions must fit at the user's text size. Browser chrome uses svh.
      setFits(height >= 600 && !!heroContent && heroContent.offsetHeight <= height + 1 && compositionHeight + headerHeight + 48 <= height);
      ref.current?.style.setProperty('--anchor-offset', `${headerHeight + 16}px`);
      ref.current?.style.setProperty('--hero-height', `${heroContent?.offsetHeight ?? height}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    const content = node.querySelector(`.${hero.container}`);
    const panel = node.querySelector(`.${styles.panelContent}`);
    if (content) observer.observe(content);
    if (panel) observer.observe(panel);
    document.fonts.ready.then(measure);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Hydration may change the opening's height; restore explicit destinations afterwards.
    if (!['#resultaten', '#projecten'].includes(window.location.hash)) return;
    const frame = requestAnimationFrame(() => scrollToSection(null, window.location.hash, 'instant'));
    return () => cancelAnimationFrame(frame);
  }, [pinned]);

  return <div ref={ref} id="home" data-mobile-opening={pinned ? 'pinned' : 'flow'} className={`${styles.opening} ${pinned ? styles.pinned : ''}`} style={{ '--portal-distance': portalDistance } as React.CSSProperties}>
    <div className={styles.workAnchor} id="resultaten"><span id="projecten" /></div>
    <div ref={stageRef} className={styles.stage}>
      <MobileHero enabled={enabled} covered={pinned && ready} portalProgress={pinned ? portalProgress : undefined} />
      <motion.div className={styles.panel} style={pinned ? { y: panelY } : undefined} inert={pinned && !ready ? true : undefined}>
        <div className={styles.panelContent}>
          <header className={`${work.staticOpening} ${styles.workHeading}`}><WorkHeading /></header>
          <div className={styles.imageComposition}>
            {pinned && <div className={styles.miniatures} aria-hidden="true">
              {[projects[1], projects[2]].filter(Boolean).map((project, index) => <motion.img key={project.id} src={project.previewSrc ?? `/images/cases/previews/${project.id}.jpg`} alt="" width="800" height="451" loading="lazy" style={{ x: index ? rightX : leftX, opacity: minisOpacity }} />)}
            </div>}
            <motion.div className={styles.firstImage} style={pinned ? { scale: imageScale } : undefined}><ProjectImage project={projects[0]} eager /></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>;
}

function MobileProject({ project, index, enabled }: { project: CaseStudy; index: number; enabled: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start center'] });
  const y = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [.98, 1]);
  return <article ref={ref} data-mobile-project={index} className={`${work.staticProject} ${styles.project}`} style={{ '--gallery-surface': palettes[index] } as React.CSSProperties}>
    <motion.div style={enabled ? { y, scale } : undefined}><ProjectImage project={project} /></motion.div>
    <ProjectCopy project={project} />
  </article>;
}

export default function MobileHomeChoreography({ projects }: { projects: CaseStudy[] }) {
  const enabled = useMediaQuery(mobileMotionQuery);
  if (enabled) return <div data-mobile-home><MobileCinematicHome projects={projects} /></div>;
  return <div className={styles.mobile} data-mobile-home>
    <Opening projects={projects} enabled={enabled} />
    <article data-mobile-project="0" className={`${work.staticProject} ${styles.project} ${styles.firstCopy}`} style={{ '--gallery-surface': palettes[0] } as React.CSSProperties}><ProjectCopy project={projects[0]} /></article>
    {projects.slice(1).map((project, index) => <MobileProject key={project.id} project={project} index={index + 1} enabled={enabled} />)}
    <div className={work.archive} style={{ background: palettes[projects.length - 1] }}><a href="/cases/">Bekijk alle projecten <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.5} /></a></div>
    <ProblemSolution mobile />
    <MobileHomepageEffects enabled={enabled} />
  </div>;
}
