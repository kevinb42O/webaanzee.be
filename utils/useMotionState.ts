import { useLayoutEffect, useRef, useState } from 'react';
import type { MotionValue } from 'motion/react';

/** Keep semantic React state in step with motion without setting child state during a parent render. */
export function useMotionState<T>(value: MotionValue<number>, select: (value: number) => T) {
  const [state, setState] = useState(() => select(value.get()));
  const selectRef = useRef(select);
  const current = useRef(state);
  useLayoutEffect(() => {
    selectRef.current = select;
    const next = select(value.get());
    if (!Object.is(next, current.current)) { current.current = next; setState(next); }
  });
  useLayoutEffect(() => {
    let frame = 0;
    const commit = () => {
      frame = 0;
      const next = selectRef.current(value.get());
      if (!Object.is(next, current.current)) { current.current = next; setState(next); }
    };
    const unsubscribe = value.on('change', () => {
      if (!frame && !Object.is(selectRef.current(value.get()), current.current)) frame = requestAnimationFrame(commit);
    });
    return () => { unsubscribe(); cancelAnimationFrame(frame); };
  }, [value]);
  return state;
}
