import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { windowProgress } from '../utils/homeChoreography';
import styles from './About.module.css';

const copy = <>Eén aanspreekpunt.<span>Van eerste idee tot werkende website.</span></>;
type Line = { text: string; x: number; y: number; width: number; accent: boolean };
type Layout = { host: HTMLElement; x: number; y: number; width: number; height: number; stageWidth: number; stageHeight: number; lines: Line[] };

function TravellingLine({ line, layout, progress, scale }: { line: Line; layout: Layout; progress: MotionValue<number>; scale: number }) {
  const travel = useTransform(progress, value => windowProgress(value, .12, .7));
  const x = useTransform(travel, value => (layout.stageWidth - line.width * scale) / 2 * (1 - value) + (layout.x + line.x) * value);
  const y = useTransform(travel, value => ((layout.stageHeight - layout.height * scale) / 2 + line.y * scale) * (1 - value) + (layout.y + line.y) * value);
  const size = useTransform(travel, [0, 1], [scale, 1]);
  // The photograph has cleared every line before the ink changes to the resting palette.
  const color = useTransform(progress, [.54, .7], ['#ffffff', line.accent ? '#8e402b' : '#20211d']);
  const textShadow = useTransform(progress, [.48, .7], ['0px 3px 24px rgba(0, 0, 0, 0.5)', '0px 0px 0px rgba(0, 0, 0, 0)']);
  return <motion.span className={styles.travellingLine} style={{ x, y, scale: size, color, textShadow }}>{line.text}</motion.span>;
}

/** Measure actual typeset lines, so visual centering and the final handover are exact. */
export default function CoastalTitle({ progress }: { progress: MotionValue<number> }) {
  const target = useRef<HTMLHeadingElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const scale = layout ? Math.min(1.5, layout.stageWidth * .86 / Math.max(...layout.lines.map(line => line.width)), layout.stageHeight * .52 / layout.height) : 1;
  const floatingVisibility = useTransform(progress, value => value >= .7 ? 'hidden' : 'visible');
  const restingVisibility = useTransform(progress, value => value >= .7 ? 'visible' : 'hidden');

  useLayoutEffect(() => {
    const heading = target.current;
    const host = heading?.closest<HTMLElement>('[data-about-stage], [data-mobile-stage]');
    if (!heading || !host) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      let x = 0, y = 0;
      let node: HTMLElement | null = heading;
      while (node && node !== host) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      const bounds = heading.getBoundingClientRect();
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const lines: Line[] = [];
      let text: Node | null;
      let firstTop: number | undefined;
      while ((text = walker.nextNode())) {
        const range = document.createRange();
        const accent = text.parentElement !== heading;
        for (let i = 0; i < text.textContent!.length; i++) {
          range.setStart(text, i);
          range.setEnd(text, i + 1);
          const rect = range.getBoundingClientRect();
          firstTop ??= rect.top;
          const top = rect.top - firstTop;
          const previous = lines[lines.length - 1];
          if (previous && Math.abs(previous.y - top) < 1 && previous.accent === accent) {
            previous.text += text.textContent![i];
            previous.width = rect.right - bounds.left - previous.x;
          } else lines.push({ text: text.textContent![i], x: rect.left - bounds.left, y: top, width: rect.width, accent });
        }
      }
      lines.forEach(line => { line.text = line.text.trimEnd(); });
      setLayout({ host, x, y, width: bounds.width, height: bounds.height, stageWidth: host.clientWidth, stageHeight: host.clientHeight, lines });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    observer.observe(heading);
    measure();
    document.fonts.ready.then(measure);
    return () => { disposed = true; observer.disconnect(); };
  }, []);

  return <>
    <motion.h2 ref={target} id="about-title" className={styles.title} style={layout ? { visibility: restingVisibility } : undefined}>{copy}</motion.h2>
    {layout && createPortal(<motion.div aria-hidden="true" className={`${styles.title} ${styles.travellingTitle}`} style={{ visibility: floatingVisibility }}>
      {layout.lines.map((line, index) => <TravellingLine key={index} line={line} layout={layout} progress={progress} scale={scale} />)}
    </motion.div>, layout.host)}
  </>;
}
