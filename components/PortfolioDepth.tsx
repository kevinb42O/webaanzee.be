import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionStyle, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Hero from './Hero';
import DepthShowcase from './DepthShowcase';
import { QualityScene } from './Quality';
import { PricingScene } from './Offer';
import ProblemSolution, { capabilities } from './ProblemSolution';
import type { CaseStudy } from './Proof';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './PortfolioDepth.module.css';
import MobileHomeChoreography, { MobileNoScriptFallback } from './MobileHomeChoreography';
import { mobileViewportQuery, useMediaQuery } from '../utils/useMediaQuery';
import { preserveHomeReadingPosition, trackHomeReadingPosition } from '../utils/preserveHomeReadingPosition';
import { clamp, createHomeScore, desktopMotionQuery, interpolate as at, itemOpacity, itemPhase, scrollToHomeMoment, windowProgress } from '../utils/homeChoreography';

const palettes = ['#e3ebe7', '#efe1de', '#d9e6eb', '#eae1d3', '#e2e4d8', '#dce5ec', '#ebe3d8', '#dce3ee', '#f0e7da', '#eee6d4'];
const WorkHeading: React.FC = () => <>
  <h2 id="work-title">Ontworpen om op te vallen.<span>Gebouwd om te werken.</span></h2>
  <p>Van lokale handelszaak tot digitaal product: ieder project krijgt een eigen visuele wereld en een technische basis die snel en betrouwbaar blijft.</p>
</>;

const GridTile: React.FC<{ project: CaseStudy; index: number; timeline: MotionValue<number>; center: boolean }> = ({ project, index, timeline, center }) => {
  const column = index % 3;
  const row = Math.floor(index / 3);
  const x = useTransform(timeline, v => `${(column - 1) * at(v, [0, .18, .8, 1], [0, 0, 16, 24])}vw`);
  const y = useTransform(timeline, v => `${(row === 0 ? -1 : 1) * at(v, [0, .18, .8, 1], [0, 0, 35, 58])}vh`);
  const scale = useTransform(timeline, v => center ? at(v, [0, .7], [1, .8]) : at(v, [0, 1], [1, 1.08]));
  const opacity = useTransform(timeline, v => 1 - windowProgress(v, center ? .15 : .65, center ? .65 : 1));
  return <motion.div className={styles.gridTile} style={{ x, y, scale, opacity }}>
    <img src={project.previewSrc ?? `/images/cases/previews/${project.id}.jpg`} alt="" width="800" height="451" loading="eager" decoding="async" />
  </motion.div>;
};

const ProjectMedia: React.FC<{ project: CaseStudy; active?: boolean; animated?: boolean }> = ({ project, active = true, animated = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const stop = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlaying(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active) stop();
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    const onVisibility = () => { if (document.hidden) stop(); };
    observer.observe(video);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      video.pause();
    };
  }, [active]);

  const preview = () => {
    const video = videoRef.current;
    if (!video || !active || !animated || !project.videoSrc) return;
    if (!video.getAttribute('src')) video.src = project.videoSrc;
    video.play().catch(() => undefined);
  };

  return (
    <a
      href={project.casePath}
      className={styles.mediaLink}
      aria-label={`Bekijk de case ${project.title}`}
      tabIndex={active ? 0 : -1}
      onMouseEnter={preview}
      onMouseLeave={stop}
      onFocus={preview}
      onBlur={stop}
    >
      <img
        src={project.imageSrc}
        srcSet={`${project.previewSrc ?? `/images/cases/previews/${project.id}.jpg`} 800w, ${project.imageSrc} 1276w`}
        sizes="(min-width: 1000px) 58vw, 100vw"
        alt={`Website van ${project.title}`}
        width="1276" height="720" loading="lazy" decoding="async"
      />
      {animated && project.videoSrc && <video ref={videoRef} muted loop playsInline preload="none" aria-hidden="true" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} style={{ opacity: playing ? 1 : 0 }} />}
      <span className={styles.imageAction} aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.5} /></span>
    </a>
  );
};

const ProjectCopy: React.FC<{ project: CaseStudy }> = ({ project }) => (
  <div className={styles.copy}>
    <h3 className={project.title.length > 22 ? styles.longTitle : undefined}>{project.title}</h3>
    <p className={styles.description}>{project.description}</p>
    <p className={styles.tags}>{project.tags.join(' / ')}</p>
    <a className={styles.caseLink} href={project.casePath}>Bekijk het project <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.5} /></a>
  </div>
);

const AnimatedGallery: React.FC<{ projects: CaseStudy[] }> = ({ projects }) => {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const score = createHomeScore(projects.length, capabilities.length);
  const [scene, setScene] = useState({ index: 0, ready: false, heroActive: true, servicesActive: false, qualityActive: false, pricingActive: false });
  const gridSelection = projects.filter(project => project.showInGrid !== false);
  const gridProjects = gridSelection.slice(1);
  if (gridSelection.length) gridProjects.splice(Math.floor(gridSelection.length / 2), 0, gridSelection[0]);
  const { scrollYProgress } = useScroll({ target: sequenceRef, offset: ['start start', 'end end'] });
  // Native scroll stays native. The smooth curves live in the score, with no delayed spring clock.
  const time = useTransform(scrollYProgress, v => v * score.total);
  const heroProgress = useTransform(time, v => windowProgress(v, 0, score.hero));
  const intro = useTransform(time, v => v - score.hero);
  const gridOpacity = useTransform(time, v => windowProgress(v, .25, score.hero));
  const gridScale = useTransform(time, v => at(v, [.25, score.hero], [.94, 1]));
  const gridY = useTransform(time, v => at(v, [.25, score.hero], [40, 0]));
  const backdropOpacity = useTransform(time, v => 1 - windowProgress(v, .35, score.hero + .25));
  const phase = useTransform(time, v => clamp((v - score.work) / .75, 0, projects.length - 1));
  const surface = useTransform(phase, projects.map((_, i) => i), palettes.slice(0, projects.length));
  const workOpacity = useTransform(time, v => windowProgress(v, score.work - .3, score.work) * (1 - windowProgress(v, score.handoff + .05, score.handoff + .4)));
  const openingOpacity = useTransform(intro, v => at(v, [0, .25, .6, .85], [0, 1, 1, 0]));
  const openingY = useTransform(intro, v => at(v, [0, .25, .6, .85], [18, 0, 0, -18]));
  const handoff = useTransform(time, v => windowProgress(v, score.handoff, score.services));
  const handoffMask = useTransform(handoff, v => `inset(${(1 - v) * 100}% 0% 0% 0%)`);
  const servicesVisibility = useTransform(time, v => v < score.handoff ? 'hidden' : 'visible');
  const serviceProgress = useTransform(time, v => itemPhase(v - score.services, capabilities.length, .6));
  const qualityProgress = useTransform(time, v => v - score.quality);
  const serviceOpacity = useTransform(qualityProgress, v => 1 - windowProgress(v, .1, .5));
  const serviceScale = useTransform(qualityProgress, v => at(v, [0, .5], [1, .98]));
  const archiveOpacity = useTransform(time, v => windowProgress(v, score.services - .15, score.services) * (1 - windowProgress(v, score.quality, score.quality + .3)));
  const pricingProgress = useTransform(time, v => v - score.priceEntrance);
  const pricingPhase = useTransform(time, v => itemPhase(v - score.prices, 4, 1));
  const qualityShade = useTransform(pricingProgress, v => 1 - windowProgress(v, .3, .75));
  const hintOpacity = useTransform(time, v => at(v, [.5, .75, 1.25, 1.55], [0, 1, 1, 0]));

  useMotionValueEvent(time, 'change', v => {

    const ready = v >= score.work - .1 && v < score.handoff + .15;
    const heroActive = v < .45;
    const servicesActive = v >= score.services - .1 && v < score.quality + .25;
    const pricingActive = v >= score.prices - .05;
    const qualityActive = v >= score.quality + .25 && !pricingActive;
    setScene(current => current.ready === ready && current.heroActive === heroActive && current.servicesActive === servicesActive && current.qualityActive === qualityActive && current.pricingActive === pricingActive ? current : { index: current.index, ready, heroActive, servicesActive, qualityActive, pricingActive });
  });

  const navigate = (moment: number) => {
    if (sequenceRef.current) scrollToHomeMoment(sequenceRef.current, moment, score.total);
  };
  const goToProject = (index: number) => navigate(score.work + clamp(index, 0, projects.length - 1) * .75);
  const goToService = (index: number) => navigate(score.services + clamp(index, 0, capabilities.length - 1) * .85 + .3);
  const goToPrice = (index: number) => navigate(score.prices + clamp(index, 0, 3) * 1.25 + .5);
  const anchor = (id: string, moment: number) => <div key={id} id={id} data-home-moment={moment} className={styles.servicesAnchor} style={{ top: `${moment * 100}svh` }} />;

  return <div ref={sequenceRef} id="home" data-home-sequence data-home-total={score.total} className={styles.sequence} style={{ '--scroll-units': score.total } as React.CSSProperties}>
    {anchor('resultaten', score.work)}
    {anchor('projecten', score.work)}
    {anchor('werkwijze', score.services + .3)}
    {anchor('prijzen', score.prices + .5)}
    <motion.div data-home-stage className={styles.stage} style={{ '--gallery-surface': surface } as MotionStyle}>
      <motion.div className={styles.heroBackdrop} style={{ opacity: backdropOpacity }} inert={!scene.heroActive ? true : undefined} aria-hidden={!scene.heroActive}><Hero embedded progress={heroProgress} /></motion.div>
      <motion.div className={styles.openerGrid} style={{ opacity: gridOpacity, scale: gridScale, y: gridY }} aria-hidden="true">
        {gridProjects.map((project, index) => <GridTile key={project.id} project={project} index={index} timeline={intro} center={project.id === gridSelection[0].id} />)}
      </motion.div>
      <motion.div className={styles.opening} style={{ opacity: openingOpacity, y: openingY }}><WorkHeading /></motion.div>
      <motion.div className={styles.depthShowcase} style={{ opacity: workOpacity }} inert={!scene.ready ? true : undefined} aria-hidden={!scene.ready}>
        <DepthShowcase projects={projects} phase={phase} active={scene.ready} onIndex={index => setScene(current => current.index === index ? current : { ...current, index })} onNavigate={goToProject} />
      </motion.div>
      <motion.div className={styles.handoff} style={{ clipPath: handoffMask }} aria-hidden="true" />
      <motion.div className={styles.servicesStage} style={{ visibility: servicesVisibility, scale: serviceScale, opacity: serviceOpacity }} inert={!scene.servicesActive ? true : undefined} aria-hidden={!scene.servicesActive}>
        <ProblemSolution progress={serviceProgress} entrance={handoff} onNavigate={goToService} />
      </motion.div>
      <motion.a className={styles.servicesArchive} style={{ opacity: archiveOpacity }} inert={!scene.servicesActive ? true : undefined} aria-hidden={!scene.servicesActive} href="/cases/">Bekijk alle projecten <ArrowUpRight aria-hidden="true" size={16} /></motion.a>
      <motion.div style={{ opacity: qualityShade }} className={styles.qualityLayer} aria-hidden={!scene.qualityActive} inert={!scene.qualityActive ? true : undefined}><QualityScene progress={qualityProgress} /></motion.div>
      <div aria-hidden={!scene.pricingActive} inert={!scene.pricingActive ? true : undefined}><PricingScene progress={pricingProgress} phase={pricingPhase} onNavigate={goToPrice} /></div>
      <motion.p className={styles.introHint} style={{ opacity: hintOpacity }}>Scroll om het werk te verkennen <ArrowDown aria-hidden="true" size={15} /></motion.p>
      <a className={styles.skip} href={scene.servicesActive ? '#contact' : '#werkwijze'} hidden={!scene.ready && !scene.servicesActive} onClick={event => scene.servicesActive ? scrollToSection(event, 'contact') : (event.preventDefault(), goToService(0))}>{scene.servicesActive ? 'Vertel over je project' : 'Verder naar diensten'} <ArrowDown aria-hidden="true" size={15} /></a>
    </motion.div>
  </div>;
};

const PortfolioDepth: React.FC<{ projects: CaseStudy[] }> = ({ projects }) => {
  const [animated, setAnimated] = useState(false);
  const mobile = useMediaQuery(mobileViewportQuery);
  const previousMobile = useRef<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    if (previousMobile.current === undefined) {
      previousMobile.current = window.matchMedia(mobileViewportQuery).matches;
      return;
    }
    if (previousMobile.current !== mobile) preserveHomeReadingPosition(mobile, projects.length, capabilities.length);
    previousMobile.current = mobile;
  }, [mobile, projects.length]);

  useEffect(() => trackHomeReadingPosition(projects.length, capabilities.length), [projects.length]);

  useEffect(() => {
    const media = window.matchMedia(desktopMotionQuery);
    const update = () => setAnimated(media.matches);
    update();
    media.addEventListener('change', update);
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (['#projecten', '#resultaten', '#werkwijze', '#prijzen'].includes(window.location.hash)) scrollToSection(null, window.location.hash.slice(1), 'instant');
      });
    });
    return () => { cancelAnimationFrame(frame); media.removeEventListener('change', update); };
  }, []);

  return (
    <div className={styles.gallery}>
      <MobileNoScriptFallback />
      {mobile ? <MobileHomeChoreography projects={projects} /> : animated ? <AnimatedGallery projects={projects} /> : (
        <div className={styles.staticGallery}>
          <Hero />
          <div id="resultaten"><div id="projecten" /></div>
          <div className={styles.staticOpening}><WorkHeading /></div>
          {projects.map((project, index) => (
            <article key={project.id} className={styles.staticProject} style={{ '--gallery-surface': palettes[index] } as React.CSSProperties}>
              <ProjectMedia project={project} />
              <ProjectCopy project={project} />
            </article>
          ))}
        </div>
      )}
      {!animated && !mobile && <>
        <div className={styles.archive} style={{ background: palettes[projects.length - 1] }}><a href="/cases/">Bekijk alle projecten <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.5} /></a></div>
        <ProblemSolution />
      </>}
    </div>
  );
};

export default PortfolioDepth;
