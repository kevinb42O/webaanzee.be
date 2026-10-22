import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { MotionValue } from 'motion/react';
import type { CaseStudy } from './Proof';
import type { createHomeScore } from '../utils/homeChoreography';
import styles from './StickyProjectGrid.module.css';

export default function StickyProjectGrid({ projects, time, score, children }: {
  projects: CaseStudy[];
  time: MotionValue<number>;
  score: ReturnType<typeof createHomeScore>;
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  // Keep the first case in the central position without changing project order downstream.
  const selection = projects.filter(project => project.showInGrid !== false);
  const tiles = selection.slice(1);
  if (selection.length) tiles.splice(Math.floor(selection.length / 2), 0, selection[0]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const grid = element.querySelector<HTMLElement>('[data-sticky-grid]')!;
    const items = Array.from(grid.children) as HTMLElement[];
    const title = element.querySelector('h2');
    const description = element.querySelector('p');
    const entrance = score.portal + .35;
    const at = (moment: number) => moment - entrance;
    let timeline: gsap.core.Timeline;
    let context: gsap.Context;
    const seek = () => {
      const position = time.get();
      timeline?.time(Math.max(0, position - entrance), false);
      const hidden = String(position < entrance || position >= score.work);
      if (element.getAttribute('aria-hidden') !== hidden) element.setAttribute('aria-hidden', hidden);
    };

    const build = () => {
      context?.revert();
      context = gsap.context(() => {
        const height = element.clientHeight;
        const gridHeight = grid.offsetHeight;
        const rowGap = parseFloat(getComputedStyle(grid).rowGap);
        // Every image starts completely outside the clipped viewport, even on tall screens.
        const distance = (height + gridHeight) / 2 + 2;
        const columns = [0, 1, 2].map(column => items.filter((_, index) => index % 3 === column));
        timeline = gsap.timeline({ paused: true });
        timeline.fromTo(element, { y: 0, yPercent: 100 }, { y: 0, yPercent: 0, duration: at(score.gridReveal), ease: 'power1.inOut' }, 0);
        timeline.fromTo(title, { autoAlpha: 0 }, { autoAlpha: 1, duration: .4, ease: 'power1.out' }, .05);
        gsap.set(description, { autoAlpha: 0, y: 18 });
        columns.forEach((column, index) => {
          const fromTop = index % 2 === 0;
          timeline.fromTo(column, { y: distance * (fromTop ? -1 : 1) }, {
            y: 0,
            duration: 1.22,
            stagger: { each: .12, from: fromTop ? 'end' : 'start' },
            ease: 'power1.inOut',
          }, at(score.gridReveal));
        });
        timeline.to(grid, { scale: 2.05, duration: 1.4, ease: 'power3.inOut' }, at(score.gridZoom));
        timeline.to(columns[0], { xPercent: -40, duration: 1.4, ease: 'power3.inOut' }, at(score.gridZoom));
        timeline.to(columns[2], { xPercent: 40, duration: 1.4, ease: 'power3.inOut' }, at(score.gridZoom));
        // With nine landscape previews the middle tile must also clear the title.
        // Measure the destinations so the opening stays clear at every desktop ratio.
        timeline.to(columns[1], {
          y: (index: number, tile: HTMLElement) => {
            const halfTile = tile.offsetHeight / 2;
            const originalCenter = tile.offsetTop + halfTile - gridHeight / 2;
            const destination = index === 0 ? -height / 2 - halfTile * .3
              : height / 2 + halfTile * .3 + (index - 1) * (tile.offsetHeight + rowGap) * 2.05;
            return destination / 2.05 - originalCenter;
          },
          duration: .7,
          ease: 'power1.inOut',
        }, at(score.gridZoom) + .7);
        timeline.to(title, { y: -36, duration: .5, ease: 'power2.inOut' }, at(score.gridContent));
        timeline.to(description, { autoAlpha: 1, y: 0, duration: .45, ease: 'power1.inOut' }, at(score.gridContent) + .05);
        // The settled composition leaves as one scene, exposing the already rendered portfolio.
        timeline.to(element, { yPercent: -100, duration: score.work - score.gridExit, ease: 'power1.inOut' }, at(score.gridExit));
      }, element);
      seek();
    };
    build();
    const unsubscribe = time.on('change', seek);
    const observer = new ResizeObserver(build);
    observer.observe(element);
    observer.observe(grid);
    let disposed = false;
    Promise.allSettled(Array.from(grid.querySelectorAll('img')).map(image => image.decode())).then(() => {
      if (!disposed) element.dataset.imagesReady = 'true';
    });
    return () => { disposed = true; observer.disconnect(); unsubscribe(); context?.revert(); };
  }, [projects, score.portal, score.gridReveal, score.gridZoom, score.gridContent, score.gridExit, score.work, time]);

  return <div ref={root} className={styles.scene} data-sticky-project-scene aria-hidden="true">
    <div className={styles.gallery}>
      <div className={styles.grid} data-sticky-grid aria-hidden="true">
        {tiles.map((project, index) => <div key={project.id} className={styles.tile} data-grid-column={index % 3}>
          <img src={project.previewSrc ?? `/images/cases/previews/${project.id}.jpg`} alt="" width="800" height="451" loading="eager" decoding="async" />
        </div>)}
      </div>
    </div>
    <div className={styles.content}>{children}</div>
  </div>;
}
