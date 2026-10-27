import { desktopMotionEnabled, useDesktopMotion } from '../utils/useDesktopMotion';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useTransform, type MotionStyle, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Hero from './Hero';
import DepthShowcase from './DepthShowcase';
import { QualityScene } from './Quality';
import { PricingScene } from './Offer';
import ProblemSolution, { capabilities } from './ProblemSolution';
import type { CaseStudy } from './Proof';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './PortfolioDepth.module.css';
import StickyProjectGrid from './StickyProjectGrid';
import { useHomeScroll } from '../utils/useHomeScroll';
import MobileHomeChoreography, { MobileNoScriptFallback } from './MobileHomeChoreography';
import { mobileMotionQuery, mobileViewportQuery, useMediaQuery } from '../utils/useMediaQuery';
import { preserveHomeReadingPosition, trackHomeReadingPosition } from '../utils/preserveHomeReadingPosition';
import { clamp, createHomeScore, pricePhase, priceMoment, scrollToHomeMoment, serviceReadMoment, windowProgress } from '../utils/homeChoreography';

const palettes = ['#e3ebe7', '#efe1de', '#d9e6eb', '#eae1d3', '#e2e4d8', '#dce5ec', '#ebe3d8', '#dce3ee', '#f0e7da', '#eee6d4', '#e7e4dc'];
const WorkHeading: React.FC = () => <>
  <h2 id="work-title">Ontworpen om op te vallen.<span>Gebouwd om te werken.</span></h2>
  <p>Van lokale handelszaak tot digitaal product: ieder project krijgt een eigen visuele wereld en een technische basis die snel en betrouwbaar blijft.</p>
</>;

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
  const [scene, setScene] = useState({ index: 0, ready: false, heroActive: true, showcaseActive: false, servicesActive: false, qualityActive: false, pricingActive: false });
  const time = useHomeScroll(sequenceRef, score.total, projects.length, capabilities.length);
  const portalProgress = useTransform(time, v => clamp(v / score.portal));
  const heroProgress = useTransform(time, v => windowProgress(v, score.portal, score.hero));
  const backdropOpacity = useTransform(time, v => 1 - windowProgress(v, score.gridReveal - .2, score.gridReveal + .05));
  const backdropDisplay = useTransform(time, v => v < score.gridReveal + .05 ? 'block' : 'none');
  const phase = useTransform(time, v => clamp((v - score.work) / .75, 0, projects.length - 1));
  const surface = useTransform(phase, projects.map((_, i) => i), palettes.slice(0, projects.length));
  const workOpacity = useTransform(time, v => windowProgress(v, score.gridSettle, score.gridExit) * (1 - windowProgress(v, score.handoff + .05, score.handoff + .4)));
  const handoff = useTransform(time, v => windowProgress(v, score.handoff, score.services));
  const handoffMask = useTransform(handoff, v => `inset(${(1 - v) * 100}% 0% 0% 0%)`);
  const servicesVisibility = useTransform(time, v => v < score.handoff ? 'hidden' : 'visible');
  const serviceProgress = useTransform(time, v => v - score.services);
  const qualityProgress = useTransform(time, v => v - score.quality);
  const serviceOpacity = useTransform(qualityProgress, v => v < .5 ? 1 : 0);
  const archiveOpacity = useTransform(time, v => windowProgress(v, score.services - .15, score.services) * (1 - windowProgress(v, score.quality, score.quality + .3)));
  const pricingProgress = useTransform(time, v => v - score.priceEntrance);
  const pricingPhase = useTransform(time, v => pricePhase(v - score.prices));
  const qualityShade = useTransform(pricingProgress, v => 1 - windowProgress(v, .3, .75));

  useLayoutEffect(() => {
    const update = (v: number) => {
      const ready = v >= score.work - .1 && v < score.handoff + .15;
      const showcaseActive = v >= score.gridSettle && v < score.handoff + .4;
      const heroActive = v < score.portal + .45;
      const servicesActive = v >= score.services - .1 && v < score.quality + .25;
      const pricingActive = v >= score.prices - .05;
      const qualityActive = v >= score.quality + .25 && !pricingActive;
      setScene(current => current.ready === ready && current.heroActive === heroActive && current.showcaseActive === showcaseActive && current.servicesActive === servicesActive && current.qualityActive === qualityActive && current.pricingActive === pricingActive ? current : { index: current.index, ready, heroActive, showcaseActive, servicesActive, qualityActive, pricingActive });
    };
    update(time.get());
    return time.on('change', update);
  }, [time, score.portal, score.work, score.gridSettle, score.handoff, score.services, score.quality, score.prices]);

  const navigate = (moment: number) => {
    if (sequenceRef.current) scrollToHomeMoment(sequenceRef.current, moment, score.total);
  };
  const goToProject = (index: number) => navigate(score.work + clamp(index, 0, projects.length - 1) * .75);
  const goToService = (index: number) => navigate(score.services + serviceReadMoment(clamp(index, 0, capabilities.length - 1)));
  const goToPrice = (index: number) => navigate(score.prices + priceMoment(index));
  const anchor = (id: string, moment: number) => <div key={id} id={id} data-home-moment={moment} className={styles.servicesAnchor} style={{ top: `${moment * 100}svh` }} />;

  return <div ref={sequenceRef} id="home" data-home-sequence data-home-total={score.total} data-nav-reveal={score.portal} data-nav-solid={score.gridReveal} className={styles.sequence} style={{ '--scroll-units': score.total } as React.CSSProperties}>
    {anchor('resultaten', score.work)}
    {anchor('projecten', score.work)}
    {anchor('werkwijze', score.services + serviceReadMoment(0))}
    {anchor('prijzen', score.prices)}
    <motion.div data-home-stage className={styles.stage} style={{ '--gallery-surface': surface } as MotionStyle}>
      <motion.div className={styles.heroBackdrop} style={{ opacity: backdropOpacity, display: backdropDisplay }} inert={!scene.heroActive ? true : undefined} aria-hidden={!scene.heroActive}><Hero embedded progress={heroProgress} portalProgress={portalProgress} /></motion.div>
      <StickyProjectGrid projects={projects} time={time} score={score}><WorkHeading /></StickyProjectGrid>
      <motion.div className={styles.depthShowcase} style={{ opacity: workOpacity }} inert={!scene.ready ? true : undefined} aria-hidden={!scene.ready}>
        <DepthShowcase projects={projects} phase={phase} departure={handoff} active={scene.showcaseActive} onIndex={index => setScene(current => current.index === index ? current : { ...current, index })} onNavigate={goToProject} />
      </motion.div>
      <motion.div className={styles.handoff} style={{ clipPath: handoffMask }} aria-hidden="true" />
      <motion.div className={styles.servicesStage} style={{ visibility: servicesVisibility, opacity: serviceOpacity }} inert={!scene.servicesActive ? true : undefined} aria-hidden={!scene.servicesActive}>
        <ProblemSolution progress={serviceProgress} entrance={handoff} onNavigate={goToService} />
      </motion.div>
      <motion.a className={styles.servicesArchive} style={{ opacity: archiveOpacity }} inert={!scene.servicesActive ? true : undefined} aria-hidden={!scene.servicesActive} href="/cases/">Bekijk alle projecten <ArrowUpRight aria-hidden="true" size={16} /></motion.a>
      <motion.div style={{ opacity: qualityShade }} className={styles.qualityLayer} aria-hidden={!scene.qualityActive} inert={!scene.qualityActive ? true : undefined}><QualityScene progress={qualityProgress} /></motion.div>
      <div aria-hidden={!scene.pricingActive} inert={!scene.pricingActive ? true : undefined}><PricingScene progress={pricingProgress} phase={pricingPhase} onNavigate={goToPrice} /></div>
      <a className={styles.skip} href={scene.servicesActive ? '#contact' : '#werkwijze'} hidden={!scene.ready && !scene.servicesActive} onClick={event => scene.servicesActive ? scrollToSection(event, 'contact') : (event.preventDefault(), goToService(0))}>{scene.servicesActive ? 'Vertel over je project' : 'Verder naar diensten'} <ArrowDown aria-hidden="true" size={15} /></a>
    </motion.div>
  </div>;
};

const PortfolioDepth: React.FC<{ projects: CaseStudy[] }> = ({ projects }) => {
  const animated = useDesktopMotion();
  const mobile = useMediaQuery(mobileViewportQuery);
  const mobileAnimated = useMediaQuery(mobileMotionQuery);
  const previousMode = useRef<string | undefined>(undefined);
  const mode = mobile ? (mobileAnimated ? 'mobile' : 'mobile-static') : animated ? 'desktop' : 'static';

  useLayoutEffect(() => {
    if (previousMode.current === undefined) {
      previousMode.current = window.matchMedia(mobileViewportQuery).matches ? (window.matchMedia(mobileMotionQuery).matches ? 'mobile' : 'mobile-static')
        : desktopMotionEnabled() ? 'desktop' : 'static';
      return;
    }
    if (previousMode.current !== mode) preserveHomeReadingPosition(mobile, projects.length, capabilities.length);
    previousMode.current = mode;
  }, [mode, mobile, projects.length]);

  useEffect(() => trackHomeReadingPosition(projects.length, capabilities.length), [projects.length]);

  useEffect(() => {
    let disposed = false, frame = 0;
    const align = () => {
      const id = window.location.hash.slice(1);
      if (['home', 'projecten', 'resultaten', 'werkwijze', 'prijzen', 'prijsdetails', 'over-ons', 'faq', 'contact'].includes(id)) scrollToSection(null, id, 'instant');
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(align); });
    };
    window.addEventListener('hashchange', schedule);
    // Font loading and measured mobile chapters must settle before choosing the reading position.
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener('hashchange', schedule); };
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
