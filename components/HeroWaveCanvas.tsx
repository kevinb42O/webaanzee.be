import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react';
import styles from './Hero.module.css';

const columns = 20;
const rows = 12;

/** Each tile is a cropped piece of the hero photograph and moves as a small cube. */
export default function HeroWaveCanvas({ source, reducedMotion, progress }: { source: string; reducedMotion: boolean; progress?: MotionValue<number> }) {
  const field = useRef<HTMLDivElement>(null);
  const visible = useMotionValue(1);
  const opacity = useTransform(progress ?? visible, [.44, .82], [0, 1]);
  useEffect(() => {
    const root = field.current;
    if (!root || reducedMotion) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('[data-tile]'));
    // Match the photograph's object-fit: cover and 58% horizontal position.
    // Both layers must depict the same pixels while the effect fades in.
    const alignPhoto = () => {
      const width = root.clientWidth, height = root.clientHeight;
      const photoWidth = Math.max(width, height * 16 / 9);
      const photoHeight = photoWidth * 9 / 16;
      const left = (width - photoWidth) * .58, top = (height - photoHeight) / 2;
      tiles.forEach(tile => {
        tile.style.backgroundSize = `${photoWidth}px ${photoHeight}px`;
        tile.style.backgroundPosition = `${left - tile.offsetLeft}px ${top - tile.offsetTop}px`;
      });
    };
    const size = new ResizeObserver(alignPhoto);
    size.observe(root);
    alignPhoto();
    const waves: { x: number; y: number; t: number; power: number }[] = [];
    let pointer = { x: -2, y: -2 }, last = { x: -2, y: -2 }, active = false, raf = 0, start = performance.now();
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const r = root.getBoundingClientRect();
      pointer = { x: (event.clientX-r.left)/r.width, y: (event.clientY-r.top)/r.height };
      active = pointer.x >= 0 && pointer.x <= 1 && pointer.y >= 0 && pointer.y <= 1;
      if (!active) return;
      const distance = Math.hypot(pointer.x-last.x, pointer.y-last.y);
      if (distance > .012) {
        waves.push({ ...pointer, t: (performance.now()-start)/1000, power: Math.min(1.4, .55+distance*5) });
        last = { ...pointer };
        if (waves.length > 8) waves.shift();
      }
    };
    const leave = () => { active = false; last = { x: -2, y: -2 }; };
    const frame = (now: number) => {
      raf = 0;
      if (!active && !waves.length) return;
      const time=(now-start)/1000;
      for(let i=waves.length-1;i>=0;i--) if(time-waves[i].t>2.8) waves.splice(i,1);
      tiles.forEach((tile,index)=>{
        const col=index%columns,row=Math.floor(index/columns),x=(col+.5)/columns,y=(row+.5)/rows;
        let z=Math.sin(x*8-time*1.1)*.7;
        for(const wave of waves){const d=Math.hypot((x-wave.x)*1.65,y-wave.y),age=time-wave.t,radius=age*.72;z+=Math.cos((d-radius)*28)*Math.exp(-(((d-radius)*18)**2))*Math.exp(-age*1.1)*wave.power*42;}
        if(active){const d=Math.hypot((x-pointer.x)*1.65,y-pointer.y);z+=Math.exp(-d*d*95)*13;}
        tile.style.transform=`translate3d(0,0,${z.toFixed(1)}px) rotateX(${(-z*.045).toFixed(2)}deg) scale(${(1+Math.max(0,z)*.0015).toFixed(3)})`;
        tile.style.zIndex=String(Math.round(z+20));
      });
      raf=requestAnimationFrame(frame);
    };
    const startFrame=()=>{if(!raf)raf=requestAnimationFrame(frame);};
    window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointermove',startFrame,{passive:true});
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)startFrame();else if(raf){cancelAnimationFrame(raf);raf=0;}});observer.observe(root);
    return()=>{cancelAnimationFrame(raf);observer.disconnect();size.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('pointermove',startFrame);};
  },[reducedMotion]);
  return <motion.div ref={field} className={styles.waveCanvas} aria-hidden="true" data-scroll-reveal={progress ? '' : undefined} style={{'--hero-photo':`url("${source}")`, opacity} as import('motion/react').MotionStyle}>
    {Array.from({length:columns*rows},(_,i)=>{const col=i%columns,row=Math.floor(i/columns);return <i key={i} data-tile="" style={{backgroundPosition:`${col/(columns-1)*100}% ${row/(rows-1)*100}%`}}/>;})}
  </motion.div>;
}
