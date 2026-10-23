import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from './Proof';
import Hero from './Hero';
import DepthShowcase from './DepthShowcase';
import { Chapter as ServiceChapter, Copy as ServiceCopy, ChapterButton } from './ServiceWorkbench';
import serviceStyles from './ServiceWorkbench.module.css';
import offerStyles from './Offer.module.css';
import { euro } from '../data/pricing.mjs';
import { QualityScene } from './Quality';
import qualityStyles from './Quality.module.css';
import { PriceChapter, offers } from './Offer';
import { capabilities } from '../data/capabilities';
import { clamp, itemPhase, soften, windowProgress } from '../utils/homeChoreography';
import { chapterPosition, chapterStart, mobileReadingOffset, mobileMoment, useMobileChapter, type MobileChapterLayout } from '../utils/useMobileChapter';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './MobileCinematicHome.module.css';

function Anchor({ id, target, moment }: { id?: string; target?: string; moment: number }) {
  return <div id={id} data-mobile-target={target} data-mobile-moment={moment} className={styles.anchor} style={{ top: moment }} />;
}

function useActive(time: MotionValue<number>, getIndex: (value: number) => number) {
  const [active, setActive] = useState(() => getIndex(time.get()));
  useMotionValueEvent(time, 'change', value => setActive(current => {
    const next = getIndex(value);
    return current === next ? current : next;
  }));
  useLayoutEffect(() => setActive(getIndex(time.get())), [getIndex, time]);
  return active;
}

function MobileWork({ projects }: { projects: CaseStudy[] }) {
  const heroRoot = useRef<HTMLDivElement>(null);
  const introRoot = useRef<HTMLDivElement>(null);
  const [heroReading, setHeroReading] = useState({ viewport: 844, overflow: 0, introOverflow: 0 });
  const portalEnd = 1.8 + heroReading.overflow / heroReading.viewport;
  const introRead = heroReading.introOverflow / heroReading.viewport;
  const work = portalEnd + 1.85 + introRead;
  const slot = 1.05;
  const end = work + projects.length * slot;
  const { root, stage, distance, visible, layout } = useMobileChapter(projects.length, end + .45);
  const time = useTransform(distance, value => value / layout.viewport);
  const portal = useTransform(time, value => clamp(value / 1.8));
  const hero = useTransform(time, value => windowProgress(value, portalEnd, portalEnd + .7));
  const heroOpacity = useTransform(time, value => 1 - windowProgress(value, portalEnd + .7, portalEnd + 1.05));
  const heroDisplay = useTransform(time, value => value >= portalEnd + 1.05 ? 'hidden' : 'visible');
  const introY = useTransform(time, value => `${100 * (1 - windowProgress(value, portalEnd + .4, portalEnd + 1.05)) - 100 * windowProgress(value, portalEnd + 1.35 + introRead, work)}%`);
  const introVisible = useTransform(time, value => value < work ? 'visible' : 'hidden');
  const phase = useTransform(time, value => itemPhase(value - work, projects.length, .8));
  const departure = useTransform(time, value => windowProgress(value, end, end + .45));
  const active = useActive(time, value => value >= work - .4 && value <= end + .45 ? 1 : 0);
  const inView = useActive(visible, value => value);
  const index = useActive(phase, value => Math.round(value));
  const heroActive = useActive(time, value => value < portalEnd + .9 ? 1 : 0);
  const heroReadingY = useTransform(time, value => `${-heroReading.overflow * clamp((value - 1.8) / Math.max(.001, portalEnd - 1.8))}px`);
  const introReadingY = useTransform(time, value => -heroReading.introOverflow * clamp((value - portalEnd - 1.05) / Math.max(.001, introRead)));
  useLayoutEffect(() => {
    const supporting = heroRoot.current?.querySelector<HTMLElement>('[data-portal-supporting]');
    const podium = stage.current;
    if (!supporting || !podium) return;
    const measure = () => {
      const css = getComputedStyle(supporting);
      const height = Array.from(supporting.children).reduce((sum, node) => {
        const style = getComputedStyle(node);
        return sum + (node as HTMLElement).offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }, parseFloat(css.paddingTop) + parseFloat(css.paddingBottom));
      const intro = introRoot.current;
      const introCSS = intro?.parentElement ? getComputedStyle(intro.parentElement) : null;
      const introHeight = intro && introCSS ? intro.offsetHeight + parseFloat(introCSS.paddingTop) + parseFloat(introCSS.paddingBottom) : 0;
      const next = { viewport: podium.offsetHeight, overflow: Math.max(0, Math.ceil(height - podium.offsetHeight)), introOverflow: Math.max(0, Math.ceil(introHeight - podium.offsetHeight)) };
      setHeroReading(old => old.viewport === next.viewport && old.overflow === next.overflow && old.introOverflow === next.introOverflow ? old : next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(podium);
    if (introRoot.current) observer.observe(introRoot.current);
    Array.from(supporting.children).forEach(node => observer.observe(node));
    measure();
    return () => observer.disconnect();
  }, [stage]);
  return <div ref={root} id="home" data-mobile-sequence data-mobile-kind="project" data-mobile-index={index} data-mobile-first={work * layout.viewport} data-mobile-slot={slot * layout.viewport} data-mobile-change={.25 * layout.viewport} data-mobile-cinematic-opening data-mobile-opening="pinned" className={styles.sequence} style={{ '--portal-distance': portalEnd } as React.CSSProperties}>
    <Anchor id="resultaten" moment={work * layout.viewport} />
    <Anchor id="projecten" moment={work * layout.viewport} />
    {projects.map((project, i) => <Anchor key={project.id} target={`project:${i}`} moment={(work + i * slot + .15) * layout.viewport} />)}
    <div ref={stage} className={styles.stage} data-mobile-stage>
      <div className={styles.portfolio} inert={!active ? true : undefined} aria-hidden={!active}>
        <DepthShowcase mobile projects={projects} phase={phase} departure={departure} active={!!active && !!inView} onIndex={() => undefined} onNavigate={next => mobileMoment(root.current, (work + clamp(next, 0, projects.length - 1) * slot + .15) * layout.viewport)} />
      </div>
      <motion.div ref={heroRoot} className={styles.hero} style={{ opacity: heroOpacity, visibility: heroDisplay, '--hero-reading-y': heroReadingY } as import('motion/react').MotionStyle} inert={!heroActive ? true : undefined} aria-hidden={!heroActive}>
        <Hero embedded touchEffects progress={hero} portalProgress={portal} />
      </motion.div>
      <motion.div className={styles.workIntro} style={{ y: introY, visibility: introVisible }} aria-hidden={!!active}>
        <motion.div ref={introRoot} className={styles.workIntroReading} style={{ y: introReadingY }}>
        <h2>Ontworpen om op te vallen.<span>Gebouwd om te werken.</span></h2>
        <p>Van lokale handelszaak tot digitaal product: ieder project krijgt een eigen visuele wereld en een technische basis die snel en betrouwbaar blijft.</p>
        <ArrowDown size={24} aria-hidden="true" />
        </motion.div>
      </motion.div>
      {!!active && <a className={styles.skip} href="#werkwijze" onClick={event => scrollToSection(event, 'werkwijze')}>Verder naar diensten <ArrowDown size={16} aria-hidden="true" /></a>}
    </div>
  </div>;
}

/** Each item retains its own reading path while the next masked layer enters. */
function useReadingTrack(count: number, tailUnits = .45) {
  const chapter = useMobileChapter(count, undefined, tailUnits);
  const { distance, approach, layout } = chapter;
  const phase = useTransform(distance, value => {
    const position = chapterPosition(value, layout, count);
    return Math.min(count - 1, position.index + soften(position.changing));
  });
  const index = useActive(phase, value => Math.round(value));
  const readingY = useTransform(distance, value => mobileReadingOffset(value, layout, 0));
  const entrance = useTransform(() => approach.get() * .65 + windowProgress(distance.get(), 0, layout.entrance) * .35);
  const serviceDistance = useTransform(distance, value => {
    const p = chapterPosition(value, layout, count);
    return p.index * .61 + (p.changing > 0 ? .36 + p.changing * .25 : p.reading * .36);
  });
  const qualityProgress = useTransform(() => {
    const value = distance.get();
    if (value < layout.entrance) return entrance.get() * .85;
    const p = chapterPosition(value, layout, 1);
    return .85 + p.reading * .8 + clamp(p.changing / .65) * .6;
  });
  const navigate = (next: number) => mobileMoment(chapter.root.current, chapterStart(layout, clamp(next, 0, count - 1)) + layout.viewport * .15);
  return { ...chapter, index, phase, readingY, entrance, serviceDistance, qualityProgress, navigate };
}

function ReadingPanel({ index, active, distance, phase, layout, children }: {
  index: number; active: number; distance: MotionValue<number>; phase: MotionValue<number>;
  layout: MobileChapterLayout; children: React.ReactNode;
}) {
  const mask = useTransform(phase, value => `inset(${clamp(index - value) * 100}% 0 0 0)`);
  const visibility = useTransform(phase, value => value >= index - 1 && value < index + 1 ? 'visible' : 'hidden');
  const y = useTransform(distance, value => mobileReadingOffset(value, layout, index));
  return <motion.div className={styles.readingLayer} style={{ clipPath: mask, visibility, zIndex: index + 1 }} inert={active !== index ? true : undefined} aria-hidden={active !== index}>
    <motion.div className={styles.readingItem} data-mobile-reading-item={index} style={{ y }}>{children}</motion.div>
  </motion.div>;
}

function MobileServices() {
  const { root, stage, content, distance, layout, index, phase, serviceDistance, navigate } = useReadingTrack(capabilities.length);
  return <div ref={root} data-mobile-sequence data-mobile-kind="service" data-mobile-index={index} data-mobile-first={layout.entrance} data-mobile-slot={layout.hold + layout.change} data-mobile-change={layout.change} data-mobile-starts={JSON.stringify(layout.starts)} data-mobile-holds={JSON.stringify(layout.holds)} className={`${styles.sequence} ${styles.services}`}>
    <Anchor id="werkwijze" moment={layout.entrance + layout.viewport * .15} />
    {capabilities.map((item, i) => <Anchor key={item.title} target={`service:${i}`} moment={chapterStart(layout, i) + layout.viewport * .15} />)}
    <div ref={stage} className={styles.stage} data-mobile-stage>
      <section className={styles.serviceWorkbench} aria-labelledby="services-title" data-service-workbench data-service-index={index}>
        <header className={styles.sceneHeading}><h2 id="services-title">Wat wil je online <em>mogelijk maken?</em></h2><a href="/cases/">Alle projecten <ArrowUpRight size={16} aria-hidden="true" /></a></header>
        <div ref={content} className={styles.readingViewport} data-mobile-reading-viewport>
          {capabilities.map((item, i) => <ReadingPanel key={item.title} index={i} active={index} distance={distance} phase={phase} layout={layout}>
            <div className={serviceStyles.visual}><div className={serviceStyles.visualInner}><ServiceChapter index={i} distance={serviceDistance} phase={phase} active={index} /></div></div>
            <ServiceCopy index={i} phase={phase} active={index} />
          </ReadingPanel>)}
        </div>
        <nav className={`${serviceStyles.chapters} ${styles.sceneNavigation}`} aria-label="Ontdek de vijf diensten">{capabilities.map((item, i) => <ChapterButton key={item.title} index={i} distance={serviceDistance} active={index} onNavigate={navigate} />)}</nav>
      </section>
      <a className={styles.skip} href="#contact" onClick={event => scrollToSection(event, 'contact')}>Vertel over je project <ArrowDown size={16} aria-hidden="true" /></a>
    </div>
  </div>;
}

function MobileQuality() {
  const [closing, setClosing] = useState({ overflow: 0, viewport: 844 });
  const { root, stage, content, distance, layout, readingY, qualityProgress } = useReadingTrack(1, 1.7 + closing.overflow / closing.viewport);
  const closingY = useTransform(distance, value => -closing.overflow * clamp((value - chapterStart(layout, 0) - (layout.holds[0] ?? layout.hold) - layout.viewport * .3) / (closing.overflow + layout.viewport * .6)));
  const y = useTransform(() => readingY.get() * (1 - windowProgress(qualityProgress.get(), 1.65, 1.875)) + closingY.get());
  useLayoutEffect(() => {
    const element = content.current, podium = stage.current;
    const title = element?.querySelector<HTMLElement>(`.${qualityStyles.titleComposition}`);
    const final = element?.querySelector<HTMLElement>(`.${qualityStyles.finalStatement}`);
    const grid = element?.querySelector<HTMLElement>(`.${qualityStyles.sceneGrid}`);
    if (!element || !podium || !title || !final || !grid) return;
    const measure = () => {
      const css = getComputedStyle(element);
      const total = title.offsetHeight + final.offsetHeight + parseFloat(getComputedStyle(grid).rowGap) + parseFloat(css.paddingTop) + parseFloat(css.paddingBottom);
      const next = { viewport: podium.offsetHeight, overflow: Math.max(0, Math.ceil(total - podium.offsetHeight)) };
      setClosing(old => old.viewport === next.viewport && old.overflow === next.overflow ? old : next);
    };
    const observer = new ResizeObserver(measure);
    [podium, title, final].forEach(node => observer.observe(node));
    measure();
    return () => observer.disconnect();
  }, [content, stage]);
  const mask = useTransform(qualityProgress, value => `inset(${(1 - windowProgress(value, 0, .5)) * 50}% 0)`);
  return <div ref={root} data-mobile-sequence data-mobile-kind="quality" className={`${styles.sequence} ${styles.quality}`}>
    <Anchor target="quality" moment={layout.entrance + layout.viewport * .15} />
    <div ref={stage} className={styles.stage} data-mobile-stage>
      <motion.div className={styles.qualityBackdrop} style={{ clipPath: mask }} aria-hidden="true" />
      <motion.div ref={content} className={styles.editorial} style={{ y }}><QualityScene progress={qualityProgress} /></motion.div>
    </div>
  </div>;
}

function MobilePrices() {
  const { root, stage, content, distance, layout, index, phase, navigate } = useReadingTrack(offers.length);
  const paper = useTransform(phase, [0, 1, 2, 3], ['#f3eee4', '#f3eee4', '#a94732', '#24221f']);
  const ink = useTransform(phase, [1, 2], ['#29251f', '#fff5e8']);
  const muted = useTransform(phase, [1, 2, 3], ['#655b50', '#f6ddc8', '#c9beb0']);
  const accent = useTransform(phase, [1, 2, 3], ['#a13d28', '#ffe1ab', '#f0ae91']);
  return <div ref={root} data-mobile-sequence data-mobile-kind="price" data-mobile-index={index} data-mobile-first={layout.entrance} data-mobile-slot={layout.hold + layout.change} data-mobile-change={layout.change} data-mobile-starts={JSON.stringify(layout.starts)} data-mobile-holds={JSON.stringify(layout.holds)} className={`${styles.sequence} ${styles.prices}`}>
    <Anchor id="prijzen" moment={layout.entrance + layout.viewport * .15} />
    {offers.map((offer, i) => <Anchor key={offer.label} target={`price:${i}`} moment={chapterStart(layout, i) + layout.viewport * .15} />)}
    <motion.div ref={stage} className={styles.stage} data-mobile-stage style={{ background: paper, color: ink, '--price-paper': paper, '--price-ink': ink, '--price-muted': muted, '--price-accent': accent } as import('motion/react').MotionStyle}>
      <section className={styles.priceWorkbench} aria-label="Aanbod en prijzen">
        <header className={styles.sceneHeading}><h2>{index < 2 ? <>Wat kost <em>je website?</em></> : <>Webshop of <em>toepassing.</em></>}</h2><p>Bouwprijs en inbegrepen werk.<br />Hosting en beheer staan apart.</p></header>
        <div ref={content} className={styles.readingViewport} data-mobile-reading-viewport>
          {offers.map((offer, i) => <ReadingPanel key={offer.label} index={i} active={index} distance={distance} phase={phase} layout={layout}><PriceChapter index={i} time={phase} active={index === i} masked /></ReadingPanel>)}
        </div>
        <nav className={`${offerStyles.editorialNav} ${styles.sceneNavigation}`} aria-label="Aanbod en prijzen">{offers.map((offer, i) => <button key={offer.label} type="button" aria-current={index === i ? 'step' : undefined} aria-label={`${offer.label}, ${euro(offer.price)}`} onClick={() => navigate(i)}><span className={styles.navIndex} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span className={styles.navLabel}>{offer.label}</span><span className={styles.navAmount}>{euro(offer.price)}</span></button>)}</nav>
      </section>
      <a className={styles.skip} href="#prijsdetails" onClick={event => scrollToSection(event, 'prijsdetails')}>Alle kosten en voorwaarden <ArrowDown size={16} aria-hidden="true" /></a>
    </motion.div>
  </div>;
}

export default function MobileCinematicHome({ projects }: { projects: CaseStudy[] }) {
  useEffect(() => {
    let disposed = false, frame = 0;
    const align = () => { if (window.location.hash) scrollToSection(null, window.location.hash, 'instant'); };
    window.addEventListener('hashchange', align);
    document.fonts.ready.then(() => {
      if (disposed || !window.location.hash) return;
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(align); });
    });
    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener('hashchange', align); };
  }, []);
  return <div data-mobile-cinematic className={styles.mobile}><MobileWork projects={projects} /><MobileServices /><MobileQuality /><MobilePrices /></div>;
}
