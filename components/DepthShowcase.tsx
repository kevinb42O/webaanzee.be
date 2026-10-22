import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react';
import type { CaseStudy } from './Proof';
import styles from './DepthShowcase.module.css';

// Original demo palettes and alternating world-space positions. Only the images
// and editorial content are replaced with Webaanzee's actual portfolio items.
const moods = [
  { x: -.9, accent: '#feca4f', background: '#fffaf0', blob1: '#ffdf94', blob2: '#fce7c4', ink: '#2e2e2e' },
  { x: .8, accent: '#80455a', background: '#fffaf0', blob1: '#d29a41', blob2: '#bb96af', ink: '#2e2e2e' },
  { x: -.7, accent: '#fa7b71', background: '#5f81ab', blob1: '#f88b8d', blob2: '#cfbbdd', ink: '#f4f4f4' },
  { x: 1, accent: '#3c72c6', background: '#5b9bc2', blob1: '#ffaa00', blob2: '#00e1ff', ink: '#f4f4f4' },
  { x: -.7, accent: '#fdd895', background: '#7d936e', blob1: '#fdd895', blob2: '#a5b599', ink: '#f4f4f4' },
];

export default function DepthShowcase({ projects, phase, active, onIndex, onNavigate, departure }: {
  projects: CaseStudy[];
  phase: MotionValue<number>;
  active: boolean;
  onIndex: (index: number) => void;
  onNavigate: (index: number) => void;
  departure?: MotionValue<number>;
}) {
  const still = useMotionValue(0);
  const departingScale = useTransform(departure ?? still, [0, 1], [1, .86]);
  const departingX = useTransform(departure ?? still, [0, 1], ['0%', '-8%']);
  const departingY = useTransform(departure ?? still, [0, 1], ['0%', '4%']);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<import('./depth-gallery/PortfolioEngine.js').PortfolioEngine | null>(null);
  const activeRef = useRef(active);
  const indexCallback = useRef(onIndex);
  indexCallback.current = onIndex;
  activeRef.current = active;
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let instance: import('./depth-gallery/PortfolioEngine.js').PortfolioEngine | null = null;
    const unsubscribe = phase.on('change', value => engine.current?.setPosition(value));
    const data = projects.map((project, i) => {
      const mood = moods[i % moods.length];
      return { textureSrc: project.imageSrc, fallbackColor: mood.accent, accentColor: mood.accent,
        backgroundColor: mood.background, blob1Color: mood.blob1, blob2Color: mood.blob2,
        position: { x: mood.x, y: 0 }, label: { word: project.title, color: mood.ink } };
    });
    import('./depth-gallery/PortfolioEngine.js').then(async ({ PortfolioEngine }) => {
      if (cancelled || !canvas.current) return;
      instance = new PortfolioEngine(canvas.current, data, next => {
        if (cancelled) return;
        setIndex(next);
        indexCallback.current(next);
      }, () => { if (!cancelled) setFailed(true); });
      engine.current = instance;
      instance.setPosition(phase.get());
      instance.setEnabled(activeRef.current);
      await instance.init();
      if (!cancelled) setReady(true);
    }).catch(() => {
      instance?.dispose();
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
      unsubscribe();
      instance?.dispose();
      engine.current = null;
    };
  }, [projects, phase]);

  useEffect(() => { engine.current?.setEnabled(active); }, [active]);
  const project = projects[index];
  const mood = moods[index % moods.length];
  return <section className={styles.showcase} data-depth-showcase data-depth-ready={ready && !failed} data-depth-index={index} aria-label="Portfolio" style={{ color: mood.ink }}>
    <motion.canvas ref={canvas} className={styles.canvas} aria-hidden="true" style={{ scale: departingScale, x: departingX, y: departingY }} />
    {(!ready || failed) && <motion.a href={project.casePath} className={styles.fallback} style={{ scale: departingScale, x: departingX, y: departingY }}><img src={project.imageSrc} alt={`Website van ${project.title}`} width="1276" height="720" /></motion.a>}
    <div className={styles.identity}>
      <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
      <h3 className={styles.word}>{project.title}</h3>
      <span className={styles.chip} style={{ backgroundColor: mood.accent }} aria-hidden="true" />
    </div>
    <div className={styles.details}>
      <dl>
        <div><dt>Project</dt><dd>{project.title}</dd></div>
        <div><dt>Werk</dt><dd>{project.tags.join(' / ')}</dd></div>
        <div><dt>Case</dt><dd><a href={project.casePath}>Bekijk het project ↗</a></dd></div>
      </dl>
    </div>
    <p className={styles.scrollHint}>Scroll om het werk te verkennen</p>
    <nav className={styles.navigation} aria-label="Portfolio doorlopen">
      <button type="button" disabled={index === 0} aria-label="Vorig project" onClick={() => onNavigate(index - 1)}>←</button>
      <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
      <button type="button" disabled={index === projects.length - 1} aria-label="Volgend project" onClick={() => onNavigate(index + 1)}>→</button>
    </nav>
  </section>;
}
