import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity, type MotionStyle, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from './Hero';
import ProblemSolution, { capabilities } from './ProblemSolution';
import type { CaseStudy } from './Proof';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './PortfolioDepth.module.css';

const palettes = ['#e3ebe7', '#efe1de', '#d9e6eb', '#eae1d3', '#e2e4d8', '#dce5ec', '#ebe3d8', '#dce3ee', '#f0e7da', '#eee6d4'];
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const introEnd = 2.45;
const heroUnits = 1.25;
const at = (value: number, stops: number[], values: number[]) => {
  if (value <= stops[0]) return values[0];
  for (let index = 1; index < stops.length; index++) {
    if (value <= stops[index]) {
      const progress = (value - stops[index - 1]) / (stops[index] - stops[index - 1]);
      return values[index - 1] + (values[index] - values[index - 1]) * progress;
    }
  }
  return values[values.length - 1];
};

const WorkHeading: React.FC = () => <>
  <h2 id="work-title">Ontworpen om op te vallen.<span>Gebouwd om te werken.</span></h2>
  <p>Van lokale handelszaak tot digitaal product: ieder project krijgt een eigen visuele wereld en een technische basis die snel en betrouwbaar blijft.</p>
</>;

const GridTile: React.FC<{ project: CaseStudy; index: number; timeline: MotionValue<number>; center: boolean }> = ({ project, index, timeline, center }) => {
  const column = index % 3;
  const row = Math.floor(index / 3);
  const x = useTransform(timeline, (value) => center ? '0vw' : `${at(value, [0, .2, .35, 1.5, 1.95, introEnd], [0, 0, 0, (column - 1) * 15, (column - 1) * 17, (column - 1) * 24])}vw`);
  const y = useTransform(timeline, (value) => center
    ? `${at(value, [0, .2], [3, 0])}vh`
    : `${at(value, [0, .2, .35, 1.5, 1.95, introEnd], [column === 1 ? 3 : -3, 0, 0, row === 0 ? -37 : 37, row === 0 ? -42 : 42, row === 0 ? -65 : 65])}vh`);
  const z = useTransform(timeline, (value) => center ? at(value, [0, .35, 1.25], [0, 0, -1100]) : 0);
  const scale = useTransform(timeline, (value) => center ? at(value, [0, .2], [.96, 1]) : at(value, [0, .2, .35, 1.5, 1.95, introEnd], [.96, 1, 1.02, 1.12, 1.14, 1.3]));
  const opacity = useTransform(timeline, (value) => center ? at(value, [0, .35, 1.15], [1, 1, 0]) : at(value, [0, 1.95, introEnd], [1, 1, 0]));
  return <motion.div className={styles.gridTile} style={{ x, y, z, scale, '--tile-opacity': opacity } as MotionStyle}>
    <img src={project.previewSrc ?? `/images/cases/previews/${project.id}.jpg`} alt="" width="800" height="451" loading="lazy" decoding="async" />
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
    {project.projectNote && <p className={styles.impact}>{project.projectNote.facts[0]}</p>}
    <a className={styles.caseLink} href={project.casePath}>Ontdek de case <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.5} /></a>
  </div>
);

const DepthPlane: React.FC<{ project: CaseStudy; index: number; phase: MotionValue<number>; timeline: MotionValue<number>; active: boolean }> = ({ project, index, phase, timeline, active }) => {
  const z = useTransform(() => index === 0 && timeline.get() < introEnd
    ? at(timeline.get(), [1.95, introEnd], [-480, 0])
    : clamp((phase.get() - index) * 680, -2100, 760));
  const x = useTransform(phase, (value) => {
    const distance = index - value;
    return `${distance < 0 ? distance * 55 : clamp(distance, 0, 3) * (index % 2 ? 23 : -19)}%`;
  });
  const y = useTransform(phase, (value) => `${clamp(index - value, -1, 3) * (index % 2 ? -40 : 37)}%`);
  const rotateY = useTransform(phase, (value) => clamp((index - value) * (index % 2 ? -4 : 4), -9, 9));
  const opacity = useTransform(() => {
    const distance = index - phase.get();
    const reveal = at(timeline.get(), [1.95, introEnd], [0, 1]);
    if (distance < 0) return clamp(1 + distance * 1.7, 0, 1) * reveal;
    if (distance > 2.4) return 0;
    return clamp(1 - distance * .42, .12, 1) * reveal;
  });

  return (
    <motion.div
      className={styles.plane}
      style={{ x, y, z, rotateY, '--plane-opacity': opacity, pointerEvents: active ? 'auto' : 'none' } as MotionStyle}
      aria-hidden={!active}
      inert={!active ? true : undefined}
    >
      <ProjectMedia project={project} active={active} animated />
    </motion.div>
  );
};

const AnimatedGallery: React.FC<{ projects: CaseStudy[] }> = ({ projects }) => {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState({ index: 0, ready: false, heroActive: true, servicesActive: false });
  const gridSelection = projects.filter(project => project.showInGrid !== false);
  const gridProjects = gridSelection.slice(1);
  if (gridSelection.length) gridProjects.splice(Math.floor(gridSelection.length / 2), 0, gridSelection[0]);
  const handoffStart = introEnd + projects.length - 1 + .45;
  const servicesStart = handoffStart + 1.8;
  const totalUnits = heroUnits + servicesStart + capabilities.length - 1 + .85;
  const { scrollYProgress } = useScroll({ target: sequenceRef, offset: ['start start', 'end end'] });
  const sequenceTime = useTransform(scrollYProgress, [0, 1], [0, totalUnits]);
  const heroProgress = useTransform(sequenceTime, [0, heroUnits], [0, 1]);
  const timeline = useTransform(sequenceTime, value => value - heroUnits);
  const backdropOpacity = useTransform(timeline, [-heroUnits, .35, 1.35], [1, 1, 0]);
  const gridOpacity = useTransform(sequenceTime, [heroUnits * .4, heroUnits * .92], [0, 1]);
  const gridScale = useTransform(sequenceTime, [heroUnits * .35, heroUnits], [.8, 1]);
  const gridY = useTransform(sequenceTime, [heroUnits * .35, heroUnits], [110, 0]);
  const phase = useTransform(timeline, (value) => clamp(value - introEnd, 0, projects.length - 1));
  const surface = useTransform(timeline, [0, 1.95, ...projects.map((_, index) => introEnd + index), servicesStart], ['#f6f3ec', '#f6f3ec', ...palettes.slice(0, projects.length), '#eae7df']);
  // Keep the departing scene opaque until a physical mask has covered it.
  // Every part of this handoff is scrubbed by the same timeline, in both directions.
  const handoff = useTransform(timeline, value => value - handoffStart);
  const workOpacity = useTransform(handoff, [.62, .63], [1, 0]);
  const workScale = useTransform(handoff, [0, .65], [1, .9]);
  const workY = useTransform(handoff, [0, .65], ['0vh', '-8vh']);
  const copyExit = useTransform(handoff, [0, .32], [1, 0]);
  const copyY = useTransform(handoff, [0, .4], [0, -65]);
  const handoffMask = useTransform(handoff, [0, .3, .65], [
    'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    'polygon(0% 40%, 100% 65%, 100% 100%, 0% 100%)',
    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  ]);
  const servicesVisibility = useTransform(handoff, value => value < .35 ? 'hidden' : 'visible');
  const serviceProgress = useTransform(timeline, value => clamp(value - servicesStart, 0, capabilities.length - 1));
  const openingOpacity = useTransform(timeline, (value) => at(value, [0, .95, 1.45, 1.95, 2.3], [0, 0, 1, 1, 0]));
  const openingY = useTransform(timeline, (value) => at(value, [0, 1.35, 2.3], [24, 0, -30]));
  const detailsOpacity = useTransform(timeline, (value) => at(value, [2.25, introEnd], [0, 1]));
  const navigationOpacity = useTransform(() => detailsOpacity.get() * copyExit.get());
  const projectCopyOpacity = useTransform(() => detailsOpacity.get() * copyExit.get());
  const servicesFooterOpacity = useTransform(handoff, [1.65, 1.8], [0, 1]);
  const hintOpacity = useTransform(timeline, (value) => at(value, [-heroUnits, -.15, 0, 1.95, 2.25], [0, 0, 1, 1, 0]));
  const velocity = useVelocity(phase);
  const drift = useSpring(useTransform(velocity, (value) => clamp(value * -7, -20, 20)), { stiffness: 110, damping: 27 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 85, damping: 24 });
  const rotateX = useSpring(pointerY, { stiffness: 85, damping: 24 });

  useMotionValueEvent(timeline, 'change', (value) => {
    const index = clamp(Math.round(value - introEnd), 0, projects.length - 1);
    const ready = value >= 2.25 && value < handoffStart + .32;
    const heroActive = value < -heroUnits * .35;
    const servicesActive = value >= servicesStart - .15;
    setScene((current) => current.index === index && current.ready === ready && current.heroActive === heroActive && current.servicesActive === servicesActive ? current : { index, ready, heroActive, servicesActive });
  });

  const goToProject = (index: number) => {
    const sequence = sequenceRef.current;
    if (!sequence) return;
    const top = sequence.getBoundingClientRect().top + window.scrollY
      + ((heroUnits + introEnd + index) / totalUnits) * (sequence.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const goToService = (index: number) => {
    const sequence = sequenceRef.current;
    if (!sequence) return;
    const top = sequence.getBoundingClientRect().top + window.scrollY
      + ((heroUnits + servicesStart + index) / totalUnits) * (sequence.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div ref={sequenceRef} id="home" className={styles.sequence} style={{ '--scroll-units': totalUnits } as React.CSSProperties}>
      <div id="resultaten" className={styles.workAnchor}><div id="projecten" /></div>
      <div id="werkwijze" className={styles.servicesAnchor} style={{ top: `${(heroUnits + servicesStart) * 75}svh` }} />
      <motion.div className={styles.stage} style={{ '--gallery-surface': surface } as MotionStyle}>
        <motion.div className={styles.heroBackdrop} style={{ opacity: backdropOpacity }} inert={!scene.heroActive ? true : undefined} aria-hidden={!scene.heroActive}>
          <Hero embedded progress={heroProgress} />
        </motion.div>
        <motion.div className={styles.openerGrid} style={{ opacity: gridOpacity, scale: gridScale, y: gridY }} aria-hidden="true">
          {gridProjects.map((project, index) => <GridTile key={project.id} project={project} index={index} timeline={timeline} center={project.id === gridSelection[0].id} />)}
        </motion.div>
        <motion.div className={styles.opening} style={{ '--opening-opacity': openingOpacity, y: openingY } as MotionStyle}>
          <WorkHeading />
        </motion.div>
        <motion.div className={styles.layout} style={{ opacity: workOpacity, scale: workScale, y: workY }} inert={scene.servicesActive ? true : undefined} aria-hidden={scene.servicesActive}>
          <div
            className={styles.imageScene}
            onPointerMove={(event) => {
              if (!scene.ready || event.pointerType !== 'mouse') return;
              const bounds = event.currentTarget.getBoundingClientRect();
              pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 7);
              pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * -5);
            }}
            onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
          >
            <motion.div className={styles.planes} style={{ rotateX, rotateY, y: drift }}>
              {projects.map((project, index) => <DepthPlane key={project.id} project={project} index={index} phase={phase} timeline={timeline} active={scene.ready && index === scene.index} />)}
            </motion.div>
          </div>
          <motion.div className={styles.projectDetails} style={{ opacity: projectCopyOpacity, y: copyY }} inert={!scene.ready ? true : undefined} aria-hidden={!scene.ready}>
            <motion.div key={projects[scene.index].id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, ease: [.16, 1, .3, 1] }}>
              <ProjectCopy project={projects[scene.index]} />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className={styles.handoff} style={{ clipPath: handoffMask }} aria-hidden="true" />
        <motion.div className={styles.servicesStage} style={{ visibility: servicesVisibility }} inert={!scene.servicesActive ? true : undefined} aria-hidden={!scene.servicesActive}>
          <ProblemSolution progress={serviceProgress} entrance={handoff} onNavigate={goToService} />
        </motion.div>
        <motion.a className={styles.servicesArchive} style={{ opacity: servicesFooterOpacity }} inert={!scene.servicesActive ? true : undefined} aria-hidden={!scene.servicesActive} href="/cases/">Bekijk alle cases <ArrowUpRight aria-hidden="true" size={16} /></motion.a>
        <motion.div className={styles.galleryNav} style={{ opacity: navigationOpacity }} inert={!scene.ready || scene.servicesActive ? true : undefined} aria-hidden={!scene.ready || scene.servicesActive}>
          <div className={styles.counter} aria-live="polite" aria-atomic="true"><span>{String(scene.index + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}</div>
          <div className={styles.steps}>
            {projects.map((project, index) => <button key={project.id} type="button" aria-label={`Toon ${project.title}`} aria-current={index === scene.index ? 'step' : undefined} onClick={() => goToProject(index)}><span /></button>)}
          </div>
          <div className={styles.arrows}>
            <button type="button" aria-label="Vorig project" disabled={scene.index === 0} onClick={() => goToProject(scene.index - 1)}><ArrowLeft size={20} strokeWidth={1.5} /></button>
            <button type="button" aria-label="Volgend project" disabled={scene.index === projects.length - 1} onClick={() => goToProject(scene.index + 1)}><ArrowRight size={20} strokeWidth={1.5} /></button>
          </div>
        </motion.div>
        <motion.p className={styles.introHint} style={{ '--opening-opacity': hintOpacity } as MotionStyle}>Scroll om het werk te verkennen <ArrowDown aria-hidden="true" size={15} /></motion.p>
        <a className={styles.skip} href={scene.servicesActive ? '#contact' : '#werkwijze'} inert={scene.heroActive ? true : undefined} aria-hidden={scene.heroActive} style={{ visibility: scene.heroActive ? 'hidden' : undefined }} onClick={(event) => scene.servicesActive ? scrollToSection(event, 'contact') : (event.preventDefault(), goToService(0))}>{scene.servicesActive ? 'Vertel over je project' : 'Verder naar diensten'} <ArrowDown aria-hidden="true" size={15} /></a>
      </motion.div>
    </div>
  );
};

const PortfolioDepth: React.FC<{ projects: CaseStudy[] }> = ({ projects }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)');
    const update = () => setAnimated(media.matches);
    update();
    media.addEventListener('change', update);
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (['#projecten', '#resultaten'].includes(window.location.hash)) document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    });
    return () => { cancelAnimationFrame(frame); media.removeEventListener('change', update); };
  }, []);

  return (
    <div className={styles.gallery}>
      {animated ? <AnimatedGallery projects={projects} /> : (
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
      {!animated && <>
        <div className={styles.archive} style={{ background: palettes[projects.length - 1] }}><a href="/cases/">Bekijk alle cases <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.5} /></a></div>
        <ProblemSolution />
      </>}
    </div>
  );
};

export default PortfolioDepth;
